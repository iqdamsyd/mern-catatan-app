const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();
const noteController = require("../../controllers/noteController");
const secretKey = require("../../configs/config").SECRET_KEY;

router.get(
  "/",
  jwt({ secret: secretKey, algorithms: ["HS256"] }),
  (req, res, next) => noteController.getNotes(req, res, next)
);

router.post(
  "/",
  jwt({ secret: secretKey, algorithms: ["HS256"] }),
  (req, res, next) => noteController.createNote(req, res, next)
);

router.put(
  "/:id",
  jwt({ secret: secretKey, algorithms: ["HS256"] }),
  (req, res, next) => noteController.updateNote(req, res, next)
);

router.delete(
  "/:id",
  jwt({ secret: secretKey, algorithms: ["HS256"] }),
  (req, res, next) => noteController.deleteNote(req, res, next)
);

module.exports = router;
