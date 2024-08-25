const errorHandler = (err, req, res, next) => {
  const statusCode = 200;

  res.status(statusCode);

  res.json({
    status: "failed",
    // message: message,
    error_message: err.message || "",
    error: true,
  });
};

module.exports = {
  errorHandler,
};
