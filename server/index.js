import express from "express";
import passport from "passport";
import "./config/passport.js";
import * as lostItemRoutes from "./routes/lostItemRoutes.js";
import * as foundItemRoutes from "./routes/foundItemRoutes.js";
import * as userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import auth from "./middleware/auth.js";
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

app.post("/login", userRoutes.login);

// Auth route
app.use("/auth", authRoutes);

// Users routing
app.get("/users", userRoutes.getUsers);
app.get("/users/:id", userRoutes.getUser);
app.get("/me", auth, userRoutes.getMe);
app.get("/me/stats", auth, userRoutes.getUserStats);
app.post("/createuser", userRoutes.createUser);
app.post("/verify-email", userRoutes.verifyEmail);
app.post("/resend-otp", userRoutes.resendOtp);
app.post("/contact-owner", auth, userRoutes.contactOwner);
app.put("/updateuser/:id", auth, userRoutes.updateUser);
app.delete("/deleteuser/:id", auth, userRoutes.deleteUser);

// Lost Items routing
app.get("/lostItems", lostItemRoutes.getLostItems);
app.get("/lostItems/:id", lostItemRoutes.getLostItemById);
app.post(
  "/lostItems",
  auth,
  upload.single("image"),
  lostItemRoutes.createLostItem,
);
app.put("/lostItems/:id", auth, lostItemRoutes.updateLostItem);
app.patch("/lostItems/:id/resolve", auth, lostItemRoutes.resolvedLostItem);
app.patch("/lostItems/:id", auth, lostItemRoutes.softDeleteLostItem);
app.delete("/lostItems/:id", auth, lostItemRoutes.deleteLostItem);

// Found Items routing
app.get("/foundItems", foundItemRoutes.getFoundItems);
app.get("/foundItems/:id", foundItemRoutes.getFoundItemById);
app.post(
  "/foundItems",
  auth,
  upload.single("image"),
  foundItemRoutes.createFoundItem,
);
app.put("/foundItems/:id", auth, foundItemRoutes.updateFoundItem);
app.patch("/foundItems/:id/resolve", auth, foundItemRoutes.resolvedFoundItem);
app.patch("/foundItems/:id", auth, foundItemRoutes.softDeleteFoundItem);
app.delete("/foundItems/:id", auth, foundItemRoutes.deleteFoundItem);

app.listen(PORT, () => {
  console.log("App running on PORT: ", PORT);
});
