const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = NoteSchema;
