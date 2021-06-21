const { Schema, model } = require("mongoose");
import * as yup from "yup";

const userSchema = new Schema(
  {
    username: yup.string().required(),
    firstName: yup.string(),
    lastName: yup.string(),
    password: yup.string(),
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    email: yup.string().email(),
  },
  { timestamps }
);

const User = model("User", userSchema);

module.exports = { User };
