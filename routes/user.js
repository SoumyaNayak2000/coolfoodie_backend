import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config({
  path: "./config/config.env",
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
const frontend = process.env.FRONTEND_URL;

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: frontend,
    scope: ["profile"],
  })
);
router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);

export default router;
