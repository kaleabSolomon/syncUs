const express = require("express");
const helmet = require("helmet");

const app = express();

// set  http security headers
app.use(helmet);

app.use(
  express.json({
    limit: "10kb",
  })
);

module.exports = app;
