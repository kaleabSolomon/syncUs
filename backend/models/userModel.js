const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, ["please enter a valid email"]],
  },
  profileImage: String,
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "you can only have a role of user or admin",
    },
    default: "user",
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "Password is mandatory"],
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, "password confirmation is mandatory"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "the password and password confirmation cannot be different",
    },
  },
});

const User = mongoose.model("User", userSchema);
