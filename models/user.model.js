const mongoose = require("mongoose");
import * as yup from "yup";

const userSchema = new mongoose.Schema(
  {
    username: yup.string().required(),
    firstName: yup.string(),
    lastName: yup.string(),
    password: yup.string(),
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    email: yup.string().email(),
  },
  { timestamps }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
