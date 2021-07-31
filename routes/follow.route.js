const { Router } = require("express");
const router = Router();
const { User } = require("../models/user.model");

router
  .route("/")
  .post(async (req, res) => {
    try {
      const followUser = await User.findOne({ username: req.body.username });
      const user = await User.findById(req.userId);
      const userFound = followUser.followers.some(
        (userId) => userId.toString() === user._id.toString()
      );
      if (userFound) {
        res.status(400).json({
          success: false,
          message: "You are already following this user",
        });
      } else {
        user.following.push(followUser._id);
        followUser.followers.push(user._id);
        await user.save();
        await followUser.save();
        res.json({
          success: true,
          message: "New follower added",
          following: user.following,
        });
      }
    } catch (err) {
      res.json({ success: false, message: "Failed to add user", err });
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      const unfollowUser = await User.findOne({ username: req.body.username });
      const userFound = unfollowUser.followers.some(
        (userId) => userId.toString() === user._id.toString()
      );
      if (userFound) {
        const updatedFollowing = user.following.filter(
          (userId) => userId.toString() !== unfollowUser._id.toString()
        );
        const updatedFollowers = unfollowUser.followers.filter(
          (userId) => userId.toString() !== user._id.toString()
        );
        user.following = updatedFollowing;
        unfollowUser.followers = updatedFollowers;
        await user.save();
        await unfollowUser.save();
        res.json({
          success: true,
          message: "User unfollowed",
          following: user.following,
        });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (err) {
      res.json({ success: false, message: "Failed to unfollow user", err });
      console.log(err);
    }
  });

module.exports = router;
