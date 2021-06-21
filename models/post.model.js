const { Schema, model } = require("mongoose");
import * as yup from "yup";

const postSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User", required },
    caption: yup.string(),
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps }
);

const Post = model("Post", postSchema);

module.exports = { Post };
