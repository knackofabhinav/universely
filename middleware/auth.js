const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken._id;
    console.log(userId, req.body.userId);
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: e,
    });
  }
};
