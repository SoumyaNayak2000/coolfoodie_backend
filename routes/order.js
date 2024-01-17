import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderDetails,
  placeOrderOnline,
  paymentVerification,
} from "../controllers/order.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createorder", isAuthenticated, placeOrder);

router.post("/createorderonline", isAuthenticated, placeOrderOnline);

router.post("/paymentverification", isAuthenticated, paymentVerification);

router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/:id", isAuthenticated, getOrderDetails);

export default router;
