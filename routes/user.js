import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    scope: ["profile"],
  })
);
router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);

export default router;
