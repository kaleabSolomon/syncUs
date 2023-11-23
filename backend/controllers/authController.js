const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.signUp = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    console.log("missing");
    res.status(400);
    throw new Error("all fields are required");
  }
  res.status(201).json({
    status: "success",
    name: name,
    password: password,
    email: email,
    message: "user created",
  });
});
