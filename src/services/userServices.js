const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const secretKey = require("../configs/config").SECRET_KEY;

class UserService {
  async getAllUser() {
    const Users = mongoose.model("Users");
    const users = await Users.find({});

    return users;
    // throw createError(404, "Not Found");
  }

  async registerUser(body) {
    const Users = mongoose.model("Users");
    const { username, password } = body;
    const user = await Users.findOne({ username });

    if (user) {
      let err = createError(
        409,
        `User with username - ${username} already exists`
      );
      throw err;
    }

    const newUser = new Users({ username, password, role: "USER" });
    newUser.password = await this.hashPassword(password);
    let result = await newUser.save();

    return result;
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  }

  async authenticateUser(body) {
    const Users = mongoose.model("Users");
    const { username, password } = body;
    const user = await Users.findOne({ username });

    if (!user) {
      let err = createError(401, `Authentication failed`);
      throw err;
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      // Create JWT
      const token = jwt.sign(user.toJSON(), secretKey, {
        expiresIn: "1d",
      });

      const { iat, exp } = jwt.decode(token);
      const result = {
        token,
        iat,
        exp,
      };

      return result;
    } else {
      let err = createError(401, `Authentication failed`);
      throw err;
    }
  }

  async getNotes(user_id) {
    const _id = mongoose.mongo.ObjectId(user_id);
    const Users = mongoose.model("Users");
    const user = await Users.findById({ _id });
    const notes = user.notes;
    return notes;
  }
}

module.exports = new UserService();
