const { Schema, model } = require("mongoose");
const yup = require("yup");

const postSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    caption: yup.string(),
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = { Post };
