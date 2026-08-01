import express from "express";
import * as itemsDb from "./ItemsQueries.js";
import * as usersDb from "./UsersQueries.js";
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
app.get("/users", usersDb.getUsers);

// Items routing
app.get("/lostItems", itemsDb.getLostItems);
app.get("/lostItems/:id", itemsDb.getLostItemById);
app.post("/lostItems", upload.single("image"), itemsDb.createLostItem);
app.put("/lostItems/:id", itemsDb.updateLostItem);
app.patch("/lostItems/:id", itemsDb.softDeleteLostItem);
app.delete("/lostItems/:id", itemsDb.deleteLostItem);
app.get("/foundItems", itemsDb.getFoundItems);
app.get("/foundItems/:id", itemsDb.getFoundItemById);
app.post("/foundItems", upload.single("image"), itemsDb.createFoundItem);
app.put("/foundItems/:id", itemsDb.updateFoundItem);
app.patch("/foundItems/:id", itemsDb.softDeleteFoundItem);
app.delete("/foundItems/:id", itemsDb.deleteFoundItem);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
