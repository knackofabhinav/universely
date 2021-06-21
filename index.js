const express = require("express");
const { connectDB } = require("./db/db.connect");
const app = express();
const user = require("./routes/user.route");
const auth = require("./middleware/auth");
const post = require("./routes/post.route");
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB();

app.use("/", user);
app.use("/posts", auth, post);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
