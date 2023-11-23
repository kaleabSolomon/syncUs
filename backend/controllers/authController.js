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

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      profileImage: req.body.profileImage,
      role: req.body.role,
    });
    res.status(201).json({
      status: "success",
      name: newUser.name,
      _id: newUser.id,
    });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
