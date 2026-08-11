import "dotenv/config";
import bcrypt from "bcrypt";
import generateOTP from "../utils/generateOTP.js";
import transporter from "../config/mailer.js";
import jwt from "jsonwebtoken";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = rows[0];

    // Check email verification
    if (!user.email_verified) {
      return res.status(403).json({
        message: "Please verify your email before signing in",
      });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get Users
const getUsers = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT id, username, email, created_at FROM users`,
    );
    return res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a user
const getMe = async (req, res) => {
  const userId = req.user.id;
  try {
    const results = await pool.query(
      `SELECT id, username, email, created_at FROM users WHERE id=$1`,
      [userId],
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const result = await pool.query(
      `SELECT id, username, email FROM users WHERE id=$1`,
      [userId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create users
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // 1. check whether email already exists
    const existingUser = await pool.query(
      `SELECT id, email_verified FROM users WHERE email = $1`,
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // 2. Check username
    const existingUsername = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [username],
    );
    if (existingUsername.rows.length > 0) {
      return res.status(409).json({
        message: "Username already taken",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    const results = await pool.query(
      `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING id, username, email, created_at`,
      [username, email, hashedPassword],
    );
    const user = results.rows[0];

    // 5. Generate OTP
    const otp = generateOTP();

    // 6. Hash OTP
    const otpHash = await bcrypt.hash(otp, 10);

    // 7. Set expiry to 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 8. Store OTP
    await pool.query(
      `INSERT INTO email_verifications
        (user_id, otp_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [user.id, otpHash, expiresAt],
    );

    // 9. Send email
    await transporter.sendMail({
      from: `"FindIt" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your FindIt account",
      text: `Your FindIt verification code is ${otp}. It expires in 10 minutes.`,
      html: `
        <h2>Verify your FindIt account</h2>
        <p>Your verification code is:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>
      `,
    });

    return res.status(201).json({
      message: "Verification OTP sent to your email",
      userId: user.id,
    });

    // res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const result = await pool.query(
      `SELECT *
       FROM email_verifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Verification code not found",
      });
    }

    const verification = result.rows[0];

    // Check expiry
    if (new Date() > new Date(verification.expires_at)) {
      return res.status(400).json({
        message: "Verification code expired",
      });
    }

    // Compare OTP
    const isValid = await bcrypt.compare(otp, verification.otp_hash);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    // Mark email as verified
    await pool.query(
      `UPDATE users
       SET email_verified = true
       WHERE id = $1`,
      [userId],
    );

    // Delete used OTP
    await pool.query(
      `DELETE FROM email_verifications
       WHERE user_id = $1`,
      [userId],
    );

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Resend verification OTP
const resendOtp = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await pool.query(
      `SELECT id, email, email_verified FROM users WHERE id = $1`,
      [userId],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.rows[0].email_verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Store new OTP (replaces any previous unverified code)
    await pool.query(
      `DELETE FROM email_verifications WHERE user_id = $1`,
      [userId],
    );
    await pool.query(
      `INSERT INTO email_verifications
        (user_id, otp_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [userId, otpHash, expiresAt],
    );

    // Send email
    await transporter.sendMail({
      from: `"FindIt" <${process.env.EMAIL_USER}>`,
      to: user.rows[0].email,
      subject: "Verify your FindIt account",
      text: `Your FindIt verification code is ${otp}. It expires in 10 minutes.`,
      html: `
        <h2>Verify your FindIt account</h2>
        <p>Your verification code is:</p>

        <h1>${otp}</h1>

        <p>This code expires in 10 minutes.</p>
      `,
    });

    return res.status(200).json({
      message: "Verification OTP sent to your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update users
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const updates = [];
    const values = [];

    if (username !== undefined && username !== null) {
      if (username.trim().length < 5 || username.trim().length > 30) {
        return res
          .status(400)
          .json({ message: "Username must be 5-30 characters" });
      }
      updates.push(`username=$${values.length + 1}`);
      values.push(username.trim());
    }
    if (email !== undefined && email !== null) {
      updates.push(`email=$${values.length + 1}`);
      values.push(email);
    }
    if (password !== undefined && password !== null) {
      updates.push(`password=$${values.length + 1}`);
      values.push(await bcrypt.hash(password, 10));
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    values.push(id);
    const results = await pool.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id=$${values.length}
       RETURNING id, username, email, created_at`,
      values,
    );
    if (results.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete users
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    res.status(200).send(`User deleted with id: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  login,
  getUsers,
  getMe,
  getUser,
  createUser,
  verifyEmail,
  resendOtp,
  updateUser,
  deleteUser,
};
