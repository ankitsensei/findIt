import express from "express";
import * as db from "./queries.js";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/lostItems", db.getLostItems);
app.get("/lostItems/:id", db.getLostItemById);
app.post("/lostItems", db.createLostItem);
app.put("/lostItems/:id", db.updateLostItem);
app.patch("/lostItems/:id", db.softDeleteLostItem);
app.delete("/lostItems/:id", db.deleteLostItem);
app.get("/foundItems", db.getFoundItems);
app.get("/foundItems/:id", db.getFoundItemById);
app.post("/foundItems", db.createFoundItem);
app.put("/foundItems/:id", db.updateFoundItem);
app.put("/foundItems/:id", db.softDeleteFoundItem);
app.delete("/foundItems/:id", db.deleteFoundItem);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
