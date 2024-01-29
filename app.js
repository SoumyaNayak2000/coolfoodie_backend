import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

const apiV = "/api/v1";

const app = express();
export default app;
dotenv.config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

//importing routes

import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import adminRoute from "./routes/admin.js";

app.use(`${apiV}/user`, userRoute);
app.use(`${apiV}/order`, orderRoute);
app.use(`${apiV}/admin`, adminRoute);

// using error middleware

app.use(errorMiddleware);
