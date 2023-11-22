exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 404:
      res.status(statusCode).json({
        status: "fail",
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 400:
      res.status(statusCode).json({
        status: "fail",
        title: "validation error",
        message: "Validation failed",
        stackTrace: err.stack,
      });
      break;
  }
};
