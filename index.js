const express = require("express");
const { connectDB } = require("./db/db.connect");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
