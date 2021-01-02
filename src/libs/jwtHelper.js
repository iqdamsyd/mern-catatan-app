const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const accessTokenSecret = require("./config").ACCESS_TOKEN_SECRET;
const refreshTokenSecret = require("./config").REFRESH_TOKEN_SECRET;

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const secret = accessTokenSecret;
      const options = {
        expiresIn: "15s",
        issuer: "catatan.com",
        audience: userId.toString(),
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const secret = refreshTokenSecret;
      const options = {
        expiresIn: "1y",
        issuer: "catatan.com",
        audience: userId.toString(),
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, refreshTokenSecret, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;

        resolve(userId);
      });
    });
  },
};
