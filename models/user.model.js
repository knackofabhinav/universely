const { Schema, model } = require("mongoose");
const yup = require("yup");

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    firstName: { type: String, default: "Unknown" },
    lastName: { type: String, default: "" },
    bio: { type: String, default: "Hey! I am new to this Universe!" },
    password: yup.string(),
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    email: yup.string().email(),
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = { User };
