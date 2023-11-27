const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, password, email, passwordConfirmation } = req.body;
  if (!name || !password || !passwordConfirmation || !email) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    res.status(404);
    throw new Error("user not found, invalid id given");
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
