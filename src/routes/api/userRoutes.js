const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();
const userController = require("../../controllers/userController");
const secretKey = require("../../configs/config").SECRET_KEY;

router.get("/", (req, res, next) => userController.getAllUser(req, res, next));
router.post("/", (req, res, next) =>
  userController.registerUser(req, res, next)
);
router.post("/login", (req, res, next) =>
  userController.authenticateUser(req, res, next)
);

module.exports = router;
