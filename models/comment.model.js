const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    commentText: String,
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    upvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = { Comment };
