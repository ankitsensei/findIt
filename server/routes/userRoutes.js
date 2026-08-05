import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: rows[0].id, email: rows[0].email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.json({
      token,
      user: {
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const results = await pool.query(
      `SELECT id, username, email FROM users WHERE id=$1`,
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

// Create users
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await pool.query(
      `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING id, username, email, created_at`,
      [username, email, hashedPassword],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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

export { login, getUsers, getUser, createUser, updateUser, deleteUser };
