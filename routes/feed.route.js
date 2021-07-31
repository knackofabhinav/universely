const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");

router.route("/").post(async (req, res) => {
  const { posts: userPosts, following } = await User.findById(
    req.userId
  ).populate("following");
  const followingPosts = following.map((user) => user.posts);
  const postIds = [...userPosts, ...followingPosts].flat();
  const posts = await Post.find(
    {
      _id: {
        $in: postIds,
      },
    },
    function (err, docs) {
      console.log(docs);
    }
  ).populate("author");
  const filteredPosts = posts.map((post) => ({
    caption: post.caption,
    username: post.author.username,
    firstName: post.author.firstName,
    lastName: post.author.lastName,
    createdAt: post.createdAt,
    likes: post.likes,
    comments: post.comments,
  }));
  console.log(posts);
  res.json({ success: true, feed: filteredPosts });
});

module.exports = router;
