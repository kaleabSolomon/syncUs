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
exports.createContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    res.status(400);
    throw new Error("name and phone are mandatory.");
  }

  const contact = await Contact.create({
    name,
    phone,
    address: req.body.address,
    relationship: req.body.relationship,
    user_id: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      contact,
    },
  });
});
exports.updateContact = asyncHandler(async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedContact) {
    res.status(404);
    throw new Error("no tour with given id exists");
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedContact,
    },
  });
});
