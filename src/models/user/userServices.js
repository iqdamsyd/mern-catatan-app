const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { userSchema } = require("../../libs/validateSchema");
const { signAccessToken } = require("../../libs/jwtHelper");
const secretKey = require("../../libs/config").SECRET_KEY;

class UserService {
  async getAllUser() {
    try {
      const Users = mongoose.model("Users");
      const users = await Users.find({});

      return users;
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
      return { accessToken };
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
      return { accessToken };
    } catch (e) {
      throw createError.Unauthorized();
    }
  }

  async logoutUser(body) {}
}

module.exports = new UserService();
