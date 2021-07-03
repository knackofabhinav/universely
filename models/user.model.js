const { Schema, model } = require("mongoose");
const yup = require("yup");

const userSchema = new Schema(
  {
    username: yup.string().required(),
    firstName: { type: String, default: "Unknown" },
    lastName: { type: String, default: "" },
    password: yup.string(),
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", unique: true }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    email: yup.string().email(),
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = { User };
