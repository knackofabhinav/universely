const mongoose = require("mongoose");
import * as yup from "yup";

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.ObjectId, ref: "User", required },
    caption: yup.string(),
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
