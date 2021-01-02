const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const accessTokenSecret = require("./config").ACCESS_TOKEN_SECRET;

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const secret = accessTokenSecret;
      const options = {
        expiresIn: "1m",
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
};
