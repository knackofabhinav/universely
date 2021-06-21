const mongoose = require("mongoose");
import * as yup from "yup";

const commentSchema = new mongoose.Schema(
  {
    username: yup.string().required(),
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    upvote: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
