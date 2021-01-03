const createStatus = require("http-status");
const createError = require("http-errors");
const Users = require("../models/userModel");
const { userSchema } = require("../libs/validateSchema");
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../libs/jwtHelper");
const client = require("../libs/redis");

const getAllUser = async (req, res, next) => {
  try {
    const users = await Users.find({});
    res.locals.code = createStatus.OK;
    res.locals.result = users;
  } catch (e) {
    return next(createError.InternalServerError());
  }
  next();
};

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await userSchema.validateAsync(body);
    const userExists = await Users.findOne({ username: result.username });

    if (userExists) throw Error;

    const newUser = new Users(result);
    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(savedUser._id);
    const refreshToken = await signRefreshToken(savedUser._id);
    res.locals.code = createStatus.CREATED;
    res.locals.result = { accessToken, refreshToken };
  } catch (e) {
    return next(createError.BadRequest());
  }
  next();
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await userSchema.validateAsync(body);
    const user = await Users.findOne({ username: result.username });

    if (!user) throw Error;

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw Error;

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);
    res.locals.code = createStatus.OK;
    res.locals.result = { accessToken, refreshToken };
  } catch (e) {
    return next(createError.InternalServerError());
  }
  next();
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw Error("Refresh token not found");

    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.locals.code = createStatus.OK;
    res.locals.result = { accessToken, refreshToken: refToken };
  } catch (e) {
    console.log(e.message);
    return next(createError.Unauthorized());
  }
  next();
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw Error;

    const userId = await verifyRefreshToken(refreshToken);
    client.DEL(userId, (err, value) => {
      if (err) {
        console.log(err);
        throw Error;
      }
    });

    res.locals.code = createStatus.NO_CONTENT;
    res.locals.result = "";
  } catch (e) {
    console.log(e.message);
    return next(createError.InternalServerError());
  }
  next();
};

module.exports = {
  getAllUser,
  register,
  login,
  refreshToken,
  logout,
};
