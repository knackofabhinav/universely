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
    res.json(savedUser);
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.TOKEN_SECRET
    );
    if (match) {
      res.json({ accessToken: accessToken });
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
