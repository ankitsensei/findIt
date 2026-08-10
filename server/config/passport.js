import "dotenv/config";
import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;

        const result = await pool.query(
          `SELECT id, username, email, google_id
           FROM users
           WHERE google_id = $1 OR email = $2`,
          [googleId, email],
        );

        if (result.rows.length > 0) {
          const user = result.rows[0];

          // Existing account doesn't have google_id yet
          if (!user.google_id) {
            await pool.query(
              `UPDATE users
               SET google_id = $1
               WHERE id = $2`,
              [googleId, user.id],
            );
          }

          return done(null, user);
        }

        // Create a new user
        const username = email.split("@")[0];

        const newUser = await pool.query(
          `INSERT INTO users
            (username, email, google_id)
           VALUES ($1, $2, $3)
           RETURNING id, username, email, google_id`,
          [username, email, googleId],
        );

        return done(null, newUser.rows[0]);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
