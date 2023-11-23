const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config();

const connectDB = require("./config/connectDb");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
connectDB();

const app = express();
app.use(helmet());

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use("/api/v1/users", userRoutes);
app.use(errorHandler);
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
