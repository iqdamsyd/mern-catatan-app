class UserController {
  constructor(userServices) {
    this.userServices = require("../user/userServices");
  }

  async getAllUser(req, res, next) {
    try {
      const result = await this.userServices.getAllUser();
      req.responseObject = result;
      req.responseStatus = 200;
    } catch (e) {
      req.responseObject = e;
    }
    return next();
  }

  async registerUser(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.registerUser(body);
      req.responseObject = result;
      req.responseStatus = 201;
    } catch (e) {
      req.responseObject = e;
    }
    return next();
  }

  async loginUser(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.loginUser(body);
      req.responseObject = result;
      req.responseStatus = 200;
    } catch (e) {
      req.responseObject = e;
    }
    return next();
  }

  async logoutUser() {}
}

module.exports = new UserController();
