const { Router } = require("express");
const router = Router();
const { User } = require("../models/user.model");

router.route("/").post(async (req, res) => {
  try {
    const followUser = await User.findOne({ username: req.body.username });
    const user = await User.findById(req.userId);
    const userFound = followUser.followers.some(
      (userId) => userId.toString() === user._id.toString()
    );
    if (userFound) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }
    user.following.push(followUser._id);
    followUser.followers.push(user._id);
    await user.save();
    await followUser.save();
    const followers = await User.findById(followUser._id).populate("followers");
    const following = await User.findById(user._id).populate("following");
    res.json({
      success: true,
      message: "New follower added",
      rootUserFollowing: user.following,
      // rootUserFollowing: following,
      // profileUserFollowers: following,
      profileUserFollowers: followUser.followers,
    });
  } catch (err) {
    res.json({ success: false, message: "Failed to add user", err });
    console.log(err);
  }
});

router.route("/:username").delete(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const unfollowUser = await User.findOne({ username: req.params.username });
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
      const followers = await User.findById(unfollowUser._id).populate(
        "followers"
      );
      const following = await User.findById(user._id).populate("following");
      res.json({
        success: true,
        message: "User unfollowed",
        // rootUserFollowing: following,
        rootUserFollowing: user.following,

        // profileUserFollowers: followers,
        profileUserFollowers: unfollowUser.followers,
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
