const { Router } = require("express");
const router = Router();
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");

router.route("/").post(async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("following")
      .populate({
        path: "posts",
        populate: { path: "comments" },
      });

    const followingPosts = user.following.map((user) => user.posts);
    const postIds = [...user.posts, ...followingPosts].flat();
    const posts = await Post.find({
      _id: {
        $in: postIds,
      },
    })
      .populate("author")
      .populate("comments");

    posts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.json({ success: true, feed: posts });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
