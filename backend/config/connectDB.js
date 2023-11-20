const mongoose = require("mongoose");

const connectDB = async () => {
  const DB = await process.env.DATABASE_URL.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );
  console.log(DB);
};

module.exports = connectDB;
