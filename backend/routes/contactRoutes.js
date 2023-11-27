const express = require("express");
const contactController = require("../controllers/contactController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.verifyToken, contactController.getAllContacts);

router
  .route("/:id")
  .get(authController.verifyToken, contactController.getContact);
module.exports = router;
