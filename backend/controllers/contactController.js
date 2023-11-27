const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

exports.getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  res.status(200).json({
    status: "success",
    results: contacts.length,
    data: {
      contacts,
    },
  });
});
exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({
    user_id: req.user.id,
    _id: req.params.id,
  });

  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});
