import "dotenv/config";
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

const DEFAULT_CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://find-it-rho.vercel.app"
    : "http://localhost:5173";

const CLIENT_URL = (process.env.CLIENT_URL || DEFAULT_CLIENT_URL).replace(
  /\/$/,
  "",
);

const getCallbackURL = (req) =>
  process.env.GOOGLE_CALLBACK_URL ||
  `${req.protocol}://${req.get("host")}/auth/google/callback`;

router.get(
  "/google",
  (req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      callbackURL: getCallbackURL(req),
    })(req, res, next);
  },
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate(
      "google",
      {
        session: false,
        callbackURL: getCallbackURL(req),
      },
      (error, user) => {
        if (error || !user) {
          return res.redirect(
            `${CLIENT_URL}/signin?error=google_auth_failed`,
          );
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          },
        );

        const params = new URLSearchParams({
          token,
          user: user.id,
        });

        return res.redirect(`${CLIENT_URL}/oauth-success?${params.toString()}`);
      },
    )(req, res, next);
  },
);

export default router;
