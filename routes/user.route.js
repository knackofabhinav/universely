const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
const { User } = require("../models/user.model");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    savedUser.password = undefined;
    res.json(savedUser);
  } catch (e) {
    console.log(e);
  }
});

router.route("/login").post(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).json({ success: false, message: "user not found" });
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET
    );
    user.password = undefined;
    if (match) {
      res.json({ accessToken: accessToken, user });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.route("/users/:id").get(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("posts");
    console.log(user);
    user.password = undefined;
    res.json({ user });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
