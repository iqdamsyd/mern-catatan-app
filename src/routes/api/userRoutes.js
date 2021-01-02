const express = require("express");
const jwt = require("express-jwt");

const router = express.Router();
const userController = require("../../models/user/userController");
const secretKey = require("../../libs/config").SECRET_KEY;

router.get("/", (req, res, next) => {
  userController.getAllUser(req, res, next);
});
router.post("/register", (req, res, next) => {
  userController.registerUser(req, res, next);
});
router.post("/login", (req, res, next) => {
  userController.loginUser(req, res, next);
});
router.post("/refresh-token", (req, res, next) => {
  userController.refreshToken(req, res, next);
});
router.delete("/logout", (req, res, next) => {
  res.send("Logout User");
});

module.exports = router;
