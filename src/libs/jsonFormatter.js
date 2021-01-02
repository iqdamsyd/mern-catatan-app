module.exports = (req, res, next) => {
  let object = res.locals;
  let response, statusCode;
  response = { success: true, code: object.code, payload: object.result };
  statusCode = response.code;

  response = JSON.stringify(response);
  res.header("Content-Length", Buffer.byteLength(response));
  res.header("Content-Type", "application/json");
  res.status(statusCode).send(response);
  return next();
};
