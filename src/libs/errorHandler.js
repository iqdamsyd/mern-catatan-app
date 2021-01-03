module.exports = function (err, req, res, next) {
  const response = {
    success: false,
    error: {
      code: err.status,
      message: err.message,
    },
  };
  res.status(err.status).send(response);
};
