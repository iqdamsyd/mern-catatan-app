const createStatus = require("http-status");
const createError = require("http-errors");
const mongoose = require("mongoose");
const Users = require("../models/userModel");

const get = async (req, res, next) => {
  try {
    const { aud } = req.payload;
    const _id = mongoose.mongo.ObjectId(aud);
    const notes = await Users.findById({ _id }, { notes: 1 });
    res.locals.code = createStatus.OK;
    res.locals.result = notes;
  } catch (e) {
    return next(createError.InternalServerError(e.message));
  }
  next();
};

const create = async (req, res, next) => {
  try {
    const { aud } = req.payload;
    const { title, content } = req.body;
    const _id = mongoose.mongo.ObjectId(aud);
    const result = await Users.findOneAndUpdate(
      { _id },
      {
        // push new note
        $push: { notes: { title, content } },
      },
      {
        new: true,
        projection: { username: 0, password: 0, notes: { $slice: -1 } },
      }
    );
    res.locals.code = createStatus.CREATED;
    res.locals.result = result;
  } catch (e) {
    console.log(e);
    return next(createError.InternalServerError(e.message));
  }
  next();
};

const update = async (req, res, next) => {
  try {
    const { aud } = req.payload;
    const { title, content } = req.body;
    const _id = mongoose.mongo.ObjectId(aud);
    const note_id = mongoose.mongo.ObjectId(req.params.noteId);

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

    res.locals.code = createStatus.OK;
    res.locals.result = result;
  } catch (e) {
    console.log(e);
    return next(createError.InternalServerError(e.message));
  }
  next();
};

const remove = async (req, res, next) => {
  try {
    const { aud } = req.payload;
    const _id = mongoose.mongo.ObjectId(aud);
    const note_id = mongoose.mongo.ObjectId(req.params.noteId);
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

    res.locals.code = createStatus.OK;
    res.locals.result = { note_id };
  } catch (e) {
    console.log(e);
    return next(createError.InternalServerError(e.message));
  }
  next();
};

module.exports = {
  get,
  create,
  update,
  remove,
};
