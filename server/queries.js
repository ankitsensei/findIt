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
    res.status(200).json({ message: "hey" });
  } catch (error) {
    throw error;
  }
};

// Found Items
const getFoundItems = async (req, res) => {
  console.log("Get all found items");
  res.send("Get all found items");
};

export { getLostItems, getFoundItems };
