module.exports = function (err, req, res, next) {
  console.log("You hit the error handler middleware");
  const response = {
    success: false,
    error: {
      code: err.status,
      message: err.message,
    },
  };
  res.status(err.status).send(response);
};
