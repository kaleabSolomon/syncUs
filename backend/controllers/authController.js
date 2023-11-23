const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.signUp = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  res.status(201).json({
    status: "success",
    message: "user created",
  });
});
