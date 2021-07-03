const { Router } = require("express");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");
const router = Router();

router.route("/").post(async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const post = new Post({
      author: req.body.userId,
      caption: req.body.caption,
    });
    const savedPost = await post.save();
    user.posts.push(savedPost._id);
    await user.save();
    const populatedUser = await User.findById(req.body.userId).populate({
      path: "posts",
    });
    res.json({ success: true, posts: populatedUser.posts });
  } catch (e) {
    console.log(e);
    res.json({ success: false, errMessage: e });
  }
});

router.route("/likes").post(async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await Post.findById(postId);
    post.likes.push(userId);
    await post.save();
    res.json({ success: true, post });
  } catch (e) {
    console.log(e);
    res.json({ success: false, errMessage: e });
  }
});

router.route("/comments").post(async (req, res) => {
  const { userId, postId, comment } = req.body;
  try {
    const post = await Post.findById(postId);
    const newComment = new Comment({
      userId,
      commentText: comment,
      post: postId,
    });
    await newComment.save();
    post.comments.push(newComment._id);
    await post.save();
    console.log(post);
    const populatedPost = await Post.findById(postId).populate({
      path: "comments",
    });
    console.log(populatedPost.comments);
    res.json({ success: true, comments: populatedPost.comments });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
