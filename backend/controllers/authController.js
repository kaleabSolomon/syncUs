exports.signUp = async (req, res) => {
  res.status(201).json({
    status: "success",
    message: "user created",
  });
};
