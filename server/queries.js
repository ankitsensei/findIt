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

export { getLostItems, getLostItemById, getFoundItems, getFoundItemById };
