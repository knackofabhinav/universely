const { Schema, model } = require("mongoose");
const yup = require("yup");

const postSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User", required: true },
    caption: yup.string(),
    likes: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = { Post };
