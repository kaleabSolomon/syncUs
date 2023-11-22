const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config();

const connectDB = require("./config/connectDb");
connectDB();

const app = express();
app.use(helmet);

app.use(
  express.json({
    limit: "10kb",
  })
);
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception");
  console.log(err.name, err.message);
  process.exit(1);
});
app.use("/api/v1/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
