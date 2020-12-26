const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const secretKey = require("../configs/config").SECRET_KEY;

class NoteServices {
  async getNotes(user_id) {
    const _id = mongoose.mongo.ObjectId(user_id);
    const Users = mongoose.model("Users");
    const user = await Users.findById({ _id });
    const notes = user.notes;
    return notes;
  }

  async createNote(user_id, body) {
    const _id = mongoose.mongo.ObjectId(user_id);
    const Users = mongoose.model("Users");
    const user = await Users.findById({ _id });

    try {
      const { title, content } = body;

      user.notes.push({
        title,
        content,
      });

      return user.save();
    } catch (err) {
      throw createError(500, "Internal server error");
    }
  }

  async updateNote(user_id, note_id, body) {
    const _id = mongoose.mongo.ObjectId(user_id);
    note_id = mongoose.mongo.ObjectId(note_id);
    const { title, content } = body;
    const Users = mongoose.model("Users");

    try {
      const result = await Users.findOneAndUpdate(
        { _id, "notes._id": note_id },
        {
          $set: {
            "notes.$[elem].title": title,
            "notes.$[elem].content": content,
          },
        },
        {
          arrayFilters: [{ "elem._id": note_id }],
          new: true,
          projection: { _id: 0, notes: { $elemMatch: { _id: note_id } } },
        }
      );

      return result;
    } catch (err) {
      throw createError(500, err.message);
    }
  }

  async deleteNote(user_id, note_id) {
    const _id = mongoose.mongo.ObjectId(user_id);
    note_id = mongoose.mongo.ObjectId(note_id);
    const Users = mongoose.model("Users");

    try {
      const result = await Users.findOneAndUpdate(
        { _id, "notes._id": note_id },
        {
          $pull: { notes: { _id: note_id } },
        },
        {
          new: false,
          projection: { _id: 0, notes: { $elemMatch: { _id: note_id } } },
        }
      );

      return result;
    } catch (err) {
      throw createError(500, err.message);
    }
  }
}

module.exports = new NoteServices();
