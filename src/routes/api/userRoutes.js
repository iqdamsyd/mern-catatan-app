const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.get("/", userController.getAllUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh-token", userController.refreshToken);
router.delete("/logout", userController.logout);

module.exports = router;
