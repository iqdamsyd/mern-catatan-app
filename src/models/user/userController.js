class UserController {
  constructor(userServices) {
    this.userServices = require("../user/userServices");
  }

  async getAllUser(req, res, next) {
    try {
      const result = await this.userServices.getAllUser();
      res.locals = result;
    } catch (e) {
      return next(e);
    }
    return next();
  }

  async registerUser(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.registerUser(body);
      res.locals = result;
    } catch (e) {
      return next(e);
    }
    return next();
  }

  async loginUser(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.loginUser(body);
      res.locals = result;
    } catch (e) {
      return next(e);
    }
    return next();
  }

  async refreshToken(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.refreshToken(body);
      res.locals = result;
    } catch (e) {
      return next(e);
    }
    return next();
  }

  async logoutUser() {}
}

module.exports = new UserController();
