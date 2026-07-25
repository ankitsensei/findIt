import express from "express";
import * as db from "./queries.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/lostItems", db.getLostItems);
app.get("/foundItems", db.getFoundItems);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
