class UserController {
  constructor(noteServices) {
    this.noteServices = require("../note/noteServices");
  }

  async getNotes(req, res, next) {
    try {
      const user_id = req.user._id;
      const result = await this.noteServices.getNotes(user_id);

      req.responseObject = result;
      req.responseStatus = 200;
    } catch (err) {
      req.responseObject = err;
    }

    return next();
  }

  async createNote(req, res, next) {
    try {
      const user_id = req.user._id;
      const body = req.body;
      const result = await this.noteServices.createNote(user_id, body);

      req.responseObject = result;
      req.responseStatus = 200;
    } catch (err) {
      req.responseObject = err;
    }

    return next();
  }

  async updateNote(req, res, next) {
    try {
      const user_id = req.user._id;
      const note_id = req.params.id;
      const body = req.body;
      const result = await this.noteServices.updateNote(user_id, note_id, body);

      req.responseObject = result;
      req.responseStatus = 200;
    } catch (err) {
      req.responseObject = err;
    }

    return next();
  }

  async deleteNote(req, res, next) {
    try {
      const user_id = req.user._id;
      const note_id = req.params.id;
      const result = await this.noteServices.deleteNote(user_id, note_id);

      req.responseObject = result;
      req.responseStatus = 200;
    } catch (err) {
      console.log(err);
      req.responseObject = err;
    }

    return next();
  }
}

module.exports = new UserController();
