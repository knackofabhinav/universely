const { Router } = require("express");
const router = Router();
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");

router.route("/").post(async (req, res) => {
  const { posts: userPosts, following } = await User.findById(
    req.userId
  ).populate("following");
  const followingPosts = following.map((user) => user.posts);
  const postIds = [...userPosts, ...followingPosts].flat();
  const posts = await Post.find({
    _id: {
      $in: postIds,
    },
  }).populate("author");
  const filteredPosts = posts
    .map((post) => ({
      caption: post.caption,
      username: post.author.username,
      _id: post._id,
      userId: post.author._id,
      firstName: post.author.firstName,
      lastName: post.author.lastName,
      createdAt: post.createdAt,
      likes: post.likes,
      comments: post.comments,
    }))
    .sort(function (a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  res.json({ success: true, feed: filteredPosts });
});

module.exports = router;
