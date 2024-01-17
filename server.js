import app from "./app.js";
import mongoose from "mongoose";
import Razorpay from "razorpay";

const uri = process.env.MONGO_URI;
const port = process.env.PORT;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port no ${port} and db is connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res, next) => {
  res.send(`<h1>Server is running on port ${process.env.PORT}</h1>`);
  next();
});
