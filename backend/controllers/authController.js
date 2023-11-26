const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const sendCookie = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      id: user._id,
      email: user.email,
    },
  });
};
exports.signUp = asyncHandler(async (req, res) => {
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

  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      profileImage: req.body.profileImage,
      role: req.body.role,
    });

    sendCookie(newUser, 201, res);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(40);
    throw new Error("email and password are required");
  }

  const user = await User.findOne({ email: email }).select("+password");
  const passwordIsCorrect = await user.correctPassword(password, user.password);
  if (!user || !passwordIsCorrect) {
    res.status(401);
    throw new Error("email or password are incorrect");
  }

  sendCookie(user, 200, res);
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "", { expires: new Date(Date.now() + 1) });
  res.status(200).json({
    status: "success",
  });
};

exports.verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  // check if token exists(if user is logged in)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = await req.headers.authorization.split(" ")[1];
  }
  // if user is not logged in, return error
  if (!token) {
    res.status(401);
    throw new Error("You are not logged in");
  }

  // validate the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.status(401);
    throw new Error("user belonging to this token does not exist");
  }

  req.user = currentUser;
  next();
});

exports.restrictAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("You do not have permission to access this action");
    }
  };
};
