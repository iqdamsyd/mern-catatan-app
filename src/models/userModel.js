const mongoose = require("mongoose");
const NoteSchema = require("./noteModel");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    notes: [NoteSchema],
  },
  { timestamps: true }
);

// Mongoose middleware to run before "save"
UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(this.password, salt);
    this.password = hasedPassword;
    next();
  } catch (e) {
    next(e);
  }
});

// Mongoose method to validate password
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    throw e;
  }
};

module.exports = mongoose.model("Users", UserSchema);
