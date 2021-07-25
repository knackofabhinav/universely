const express = require("express");
const { connectDB } = require("./db/db.connect");
const app = express();
const user = require("./routes/user.route");
const auth = require("./middleware/auth");
const post = require("./routes/post.route");
const follow = require("./routes/follow.route");
const upload = require("./routes/upload.route");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

connectDB();

app.use("/", user);
app.use("/posts", auth, post);
app.use("/upload", auth, upload);
app.use("/follow", auth, follow);

//  404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Express App is Listening at http://localhost:${PORT}`);
});
