class UserController {
  constructor(userServices) {
    this.userServices = require("../services/userServices");
  }

  async getAllUser(req, res, next) {
    try {
      const result = await this.userServices.getAllUser();
      req.responseObject = result;
      req.responseStatus = 200;
    } catch (err) {
      req.responseObject = err;
      req.responseStatus = 400;
    }
    return next();
  }

  async registerUser(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.registerUser(body);
      req.responseObject = result;
      req.responseStatus = 201;
    } catch (err) {
      req.responseObject = err;
    }
    return next();
  }

  async authenticateUser(req, res, next) {
    try {
      const { body } = req;
      const result = await this.userServices.authenticateUser(body);
      req.responseObject = result;
      req.responseStatus = 200;
    } catch (err) {
      req.responseObject = err;
    }
    return next();
  }
}

module.exports = new UserController();
