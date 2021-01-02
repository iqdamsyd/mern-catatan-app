const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const createStatus = require("http-status");

const { userSchema } = require("../../libs/validateSchema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../libs/jwtHelper");

class UserService {
  async getAllUser() {
    try {
      const Users = mongoose.model("Users");
      const users = await Users.find({});
      return { code: createStatus.OK, result: users };
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  async registerUser(body) {
    try {
      const Users = mongoose.model("Users");
      const result = await userSchema.validateAsync(body);
      const userExists = await Users.findOne({ username: result.username });

      if (userExists) throw Error;

      const newUser = new Users(result);
      const savedUser = await newUser.save();
      const accessToken = await signAccessToken(savedUser._id);
      const refreshToken = await signRefreshToken(savedUser._id);
      return { code: createStatus.OK, result: { accessToken, refreshToken } };
    } catch (e) {
      throw createError.BadRequest();
    }
  }

  async loginUser(body) {
    try {
      const Users = mongoose.model("Users");
      const result = await userSchema.validateAsync(body);
      const user = await Users.findOne({ username: result.username });

      if (!user) throw Error;

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch) throw Error;

      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
      return { code: createStatus.OK, result: { accessToken, refreshToken } };
    } catch (e) {
      throw createError.Unauthorized();
    }
  }

  async refreshToken(body) {
    try {
      const { refreshToken } = body;
      if (!refreshToken) throw Error;
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      return {
        code: createStatus.OK,
        result: { accessToken, refreshToken: refToken },
      };
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  async logoutUser(body) {}
}

module.exports = new UserService();
