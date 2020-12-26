const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve("src", "environment", process.env.NODE_ENV + ".env"),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
};
