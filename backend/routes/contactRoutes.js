const express = require("express");
const contactController = require("../controllers/contactController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.verifyToken, contactController.getAllContacts);

module.exports = router;
