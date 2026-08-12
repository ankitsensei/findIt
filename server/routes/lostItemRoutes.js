import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadImage = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Lost Items
const getLostItems = async (req, res) => {
  const { page = 1, search } = req.query;
  const limit = 20;
  const offset = (page - 1) * limit;
  try {
    if (search) {
      const countResult = await pool.query(
        `SELECT COUNT(*) FROM lostitems WHERE (name ILIKE $1 OR description ILIKE $1) AND status = 'active'`,
        [`%${search}%`],
      );
      const totalItems = Number(countResult.rows[0].count);
      const results = await pool.query(
        `SELECT * from lostitems WHERE (name ILIKE $1 OR description ILIKE $1) AND status = 'active' ORDER BY created_at DESC LIMIT $2 OFFSET $3`,
        [`%${search}%`, limit, offset],
      );
      return res.status(200).json({
        items: results.rows,
        totalItems,
        currentPage: Number(page),
        totalPages: Math.ceil(totalItems / limit),
      });
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM lostitems WHERE status = 'active'`,
    );
    const totalItems = Number(countResult.rows[0].count);
    const results = await pool.query(
      "SELECT * FROM lostitems WHERE status = 'active' ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset],
    );
    res.status(200).json({
      items: results.rows,
      totalItems,
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyLostItems = async (req, res) => {
  const { page = 1, search } = req.query;
  const limit = 20;
  const offset = (page - 1) * limit;
  const userId = req.user.id;

  try {
    if (search) {
      const searchPattern = `%${search}%`;
      const countResult = await pool.query(
        `SELECT COUNT(*) FROM lostitems WHERE (name ILIKE $1 OR description ILIKE $1) AND user_id=$2`,
        [searchPattern, userId],
      );
      const totalItems = Number(countResult.rows[0].count);
      const results = await pool.query(
        `SELECT * FROM lostitems WHERE (name ILIKE $1 OR description ILIKE $1) AND user_id=$2 ORDER BY created_at DESC LIMIT $3 OFFSET $4`,
        [searchPattern, userId, limit, offset],
      );
      return res.status(200).json({
        items: results.rows,
        totalItems,
        currentPage: Number(page),
        totalPages: Math.ceil(totalItems / limit),
      });
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM lostitems WHERE user_id=$1`,
      [userId],
    );
    const totalItems = Number(countResult.rows[0].count);
    const results = await pool.query(
      "SELECT * FROM lostitems WHERE user_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
      [userId, limit, offset],
    );
    res.status(200).json({
      items: results.rows,
      totalItems,
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
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
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createLostItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const { name, description, location } = req.body;
    const latitude = req.body.latitude ? Number(req.body.latitude) : null;
    const longitude = req.body.longitude ? Number(req.body.longitude) : null;

    if (!name || !description || !location) {
      return res
        .status(400)
        .json({ message: "Name, description, and location are required." });
    }

    const image = await uploadImage(req.file.buffer, "findit/lost-items");

    const results = await pool.query(
      "INSERT INTO lostitems (name, description, image_url, image_public_id, location, latitude, longitude, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        description,
        image.secure_url,
        image.public_id,
        location,
        latitude,
        longitude,
        req.user.id,
      ],
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateLostItem = async (req, res) => {
  const id = req.params.id;
  const { name, description, image_url, image_public_id, location } = req.body;
  const latitude = req.body.latitude ? Number(req.body.latitude) : null;
  const longitude = req.body.longitude ? Number(req.body.longitude) : null;

  try {
    const result = await pool.query(
      `UPDATE lostitems SET name = $1, description = $2, image_url = $3, image_public_id = $4, location = $5, latitude = $6, longitude = $7, updated_at = NOW() WHERE id = $8 RETURNING *`,
      [
        name,
        description,
        image_url,
        image_public_id,
        location,
        latitude,
        longitude,
        id,
      ],
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

const resolvedLostItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE lostitems SET status = 'resolved', updated_at = NOW() WHERE id = $1 AND user_id = $2 AND status = 'active' RETURNING *`,
      [id, userId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Item not found or you are not the owner",
      });
    }
    return res.status(200).json({
      message: "Item marked as resolved",
      item: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const softDeleteLostItem = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("UPDATE lostitems SET deleted_at = NOW() WHERE id = $1", [
      id,
    ]);
    res.status(200).send(`Lost Item updated with id: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteLostItem = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM lostitems WHERE id = $1", [id]);
    res.status(200).send(`Lost item deleted with id: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getLostItems,
  getMyLostItems,
  getLostItemById,
  createLostItem,
  updateLostItem,
  resolvedLostItem,
  softDeleteLostItem,
  deleteLostItem,
};
