module.exports = (req, res, next) => {
  function formatError(req) {
    return {
      success: false,
      error: {
        code: req.responseObject.status,
        message: req.responseObject.message,
      },
    };
  }

  function formatSuccess(req) {
    return {
      success: true,
      code: req.responseStatus,
      payload: req.responseObject,
    };
  }

  let response, statusCode;
  if (req.responseObject instanceof Error) {
    response = formatError(req);
    statusCode = response.error.code || 500;
  } else {
    response = formatSuccess(req);
    statusCode = response.code;
  }

  response = JSON.stringify(response);
  res.header("Content-Length", Buffer.byteLength(response));
  res.header("Content-Type", "application/json");
  res.status(statusCode).send(response);
  return next();
};
