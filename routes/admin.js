import express from "express";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  getAdminOrders,
  getAdminStats,
  getAdminUsers,
  processOrder,
} from "../controllers/admin.js";

const router = express.Router();

// Admin Middleware

router.get("/orders", isAuthenticated, authorizeAdmin, getAdminOrders);
router.get("/order/:id", isAuthenticated, authorizeAdmin, processOrder);
router.get("/users", isAuthenticated, authorizeAdmin, getAdminUsers);
router.get("/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default router;
