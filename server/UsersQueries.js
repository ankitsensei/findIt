import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Users
const getUsers = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM users`);
    return res.status(200).json(results.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create users
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const results = await pool.query(
      `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *`,
      [username, email, password],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

// Update users

// Delete users

export { getUsers, createUser };
