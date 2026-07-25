import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getLostItems = async (req, res) => {
  console.log("Get all lost items");
  res.send("Get all lost items");
};

const getFoundItems = async (req, res) => {
  console.log("Get all found items");
  res.send("Get all found items");
};

export { getLostItems, getFoundItems };
