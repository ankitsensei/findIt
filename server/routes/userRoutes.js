import "dotenv/config";
import bcrypt from "bcrypt";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get Users
const getUsers = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM users`);
    return res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a user
const getUser = async (req, res) => {
  const userId = req.params.id;
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
      `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *`,
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
  console.log(id);
  const { username, email, password } = req.body;
  try {
    const results = await pool.query(
      `UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *`,
      [username, email, password, id],
    );
    if (results.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(`Item modified with ID: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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

export { getUsers, getUser, createUser, updateUser, deleteUser };
