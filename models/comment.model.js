const { Schema, model } = require("mongoose");
import * as yup from "yup";

const commentSchema = new Schema(
  {
    username: yup.string().required(),
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    upvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps }
);

const Comment = model("Comment", commentSchema);

module.exports = { Comment };
