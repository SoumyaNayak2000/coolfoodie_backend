import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

console.log("====================================");
console.log(process.env.GOOGLE_CLIENT_ID);
console.log("====================================");

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({
            googleId: profile.id,
          });

          if (!user) {
            const newUser = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              photo: profile.photos[0].value,
            });

            return done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (error) {
          console.error("Error during Google authentication:", error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
