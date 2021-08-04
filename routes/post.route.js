const { Router } = require("express");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");
const router = Router();

router.route("/create").post(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const post = new Post({
      author: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      caption: req.body.caption,
    });
    const savedPost = await post.save();
    user.posts.push(savedPost._id);
    await user.save();
    res.json({ success: true, post });
  } catch (e) {
    console.log(e);
    res.json({ success: false, errMessage: e });
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
