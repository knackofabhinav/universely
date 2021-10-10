const { Router } = require("express");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");
const router = Router();

router.route("/:postId/comments").get(async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "userId" },
    });
    res.json({ success: true, comments: post.comments });
  } catch (err) {
    console.log(err);
  }
});

router.route("/:postId/:commentId").delete(async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "userId" },
    });
    const comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId.toString()
    );
    post.comments = comments;
    await post.save();
    res.json({ success: true, comments: post.comments });
  } catch (err) {
    console.log(err);
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const post = new Post({
      author: user._id,
      caption: req.body.caption,
    });
    const savedPost = await post.save();
    const newPost = await Post.findById(savedPost._id).populate("author");
    user.posts.push(savedPost._id);
    await user.save();
    res.json({ success: true, post: newPost });
  } catch (e) {
    console.log(e);
    res.json({ success: false, errMessage: e });
  }
});

router.route("/delete").post(async (req, res) => {
  const { postId } = req.body;
  const userId = req.userId;
  try {
    const post = await Post.findById(postId);
    await Post.findById(postId).remove().exec();
    const user = await User.findById(userId);
    const updatedPosts = user.posts.filter(
      (id) => id.toString() !== postId.toString()
    );
    user.posts = updatedPosts;
    await user.save();
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.route("/liked").post(async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await Post.findById(postId);
    const alreadyLiked = post.likes.some((id) => id == userId);
    if (alreadyLiked) {
      const updatedLikes = post.likes.filter((id) => id != userId);
      post.likes = updatedLikes;
      await post.save();
      return res.json({
        success: true,
        message: "Disliked Successfully",
        post,
      });
    }
    post.likes.push(userId);
    await post.save();
    res.json({ success: true, post });
  } catch (e) {
    console.log(e);
    res.json({ success: false, errMessage: e });
  }
});

router.route("/comment").post(async (req, res) => {
  const { postId, comment } = req.body;
  const userId = req.userId;
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
    const populatedPost = await Post.findById(postId).populate({
      path: "comments",
      populate: { path: "userId" },
    });
    res.json({ success: true, comments: populatedPost.comments });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
