import "dotenv/config";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Lost Items
const getLostItems = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM lostitems");
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getLostItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query("SELECT * FROM lostitems WHERE id=$1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const createLostItem = async (req, res) => {
  const { name, description, image_url, image_public_id, location } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO lostitems (name, description, image_url, image_public_id, location) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, image_url, image_public_id, location],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    throw error;
  }
};

const updateLostItem = async (req, res) => {
  const id = req.params.id;
  const { name, description, image_url, image_public_id, location } = req.body;

  try {
    const result = await pool.query(
      `UPDATE lostitems SET name = $1, description = $2, image_url = $3, image_public_id = $4, location = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
      [name, description, image_url, image_public_id, location, id],
    );
    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Item not found." });
    }
    res.status(200).send(`Item modified with ID: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Found Items
const getFoundItems = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM founditems");
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getFoundItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query("SELECT * FROM founditems WHERE id=$1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const createFoundItem = async (req, res) => {
  const { name, description, image_url, image_public_id, location } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO founditems (name, description, image_url, image_public_id, location) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, image_url, image_public_id, location],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    throw error;
  }
};

export {
  getLostItems,
  getLostItemById,
  createLostItem,
  updateLostItem,
  getFoundItems,
  getFoundItemById,
  createFoundItem,
};
