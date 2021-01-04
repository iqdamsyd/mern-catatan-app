const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/noteController");

router.get("/", noteController.get);
router.post("/", noteController.create);
router.put("/:noteId", noteController.update);
router.delete("/:noteId", noteController.remove);

module.exports = router;
