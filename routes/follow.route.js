const { Router } = require("express");
const router = Router();
const { User } = require("../models/user.model");

router.route("/").post(async (req, res) => {
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId);
    console.log("I m" + user);
    res.json({ success: true, message: "New follower added" });
  } catch (err) {
    res.json({ success: false, message: "Failed" });
    console.log(err);
  }
});

module.exports = router;
