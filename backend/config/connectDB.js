const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.DATABASE_URL.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    await mongoose.connect(DB);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
