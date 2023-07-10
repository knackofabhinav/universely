const { connect } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDB() {
  const uri = process.env.NODE_ENV_DB;
  try {
    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then(() => console.log("db connected successfully"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectDB };
