import express from "express";
import * as lostItemRoutes from "./routes/lostItemRoutes.js";
import * as foundItemRoutes from "./routes/foundItemRoutes.js";
import * as userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import upload from "./middleware/upload.js";

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Users routing
app.get("/users", userRoutes.getUsers);
app.post("/createuser", userRoutes.createUser);
app.put("/updateuser/:id", userRoutes.updateUser);
app.delete("/deleteuser/:id", userRoutes.deleteUser);

// Lost Items routing
app.get("/lostItems", lostItemRoutes.getLostItems);
app.get("/lostItems/:id", lostItemRoutes.getLostItemById);
app.post("/lostItems", upload.single("image"), lostItemRoutes.createLostItem);
app.put("/lostItems/:id", lostItemRoutes.updateLostItem);
app.patch("/lostItems/:id", lostItemRoutes.softDeleteLostItem);
app.delete("/lostItems/:id", lostItemRoutes.deleteLostItem);

// Found Items routing
app.get("/foundItems", foundItemRoutes.getFoundItems);
app.get("/foundItems/:id", foundItemRoutes.getFoundItemById);
app.post(
  "/foundItems",
  upload.single("image"),
  foundItemRoutes.createFoundItem,
);
app.put("/foundItems/:id", foundItemRoutes.updateFoundItem);
app.patch("/foundItems/:id", foundItemRoutes.softDeleteFoundItem);
app.delete("/foundItems/:id", foundItemRoutes.deleteFoundItem);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
