import mongoose from "mongoose";

const schema = new mongoose.Schema({
  sNo: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  role: {
    type: "String",
    enum: ["admin", "user"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema);
