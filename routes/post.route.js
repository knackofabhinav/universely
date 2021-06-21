const { Router } = require("express");

const router = Router();

router.route("/").get(async (req, res) => {
  try {
    res.send("post hai nahi abhi");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
