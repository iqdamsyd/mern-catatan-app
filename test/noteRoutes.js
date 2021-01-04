const server = require("../src/server");
const Users = require("../src/models/userModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

const registerUrl = "/api/users/register";
const url = "/api/notes";

const username = "usertest";
const password = "123";
const title = "JUDUL";
const content = "ISI CATATAN";

describe("Notes", () => {
  let accessToken = "";
  let refreshToken = "";
  let _id = "";
  let note_id = "";
  Users.deleteMany({}, (err) => {
    if (err) done(err);
  });
  describe("POST /api/users/register", () => {
    it("it should REGISTER the user", (done) => {
      let user = { username, password };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.success.should.be.eql(true);
          res.body.payload.should.have.property("accessToken");
          res.body.payload.should.have.property("refreshToken");
          accessToken = res.body.payload.accessToken;
          refreshToken = res.body.payload.refreshToken;
          done();
        });
    });
  });
  describe("GET /api/notes", () => {
    it("it should return 0 notes", (done) => {
      chai
        .request(server)
        .get(url)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.payload.should.have.property("notes");
          res.body.payload.notes.should.be.a("array");
          res.body.payload.notes.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("POST /api/notes", () => {
    it("it should CREATE a new note", (done) => {
      let note = { title, content };
      chai
        .request(server)
        .post(url)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.payload.should.have.property("notes");
          res.body.payload.notes.length.should.be.eql(1);
          res.body.payload.notes[0].title.should.be.eql(title);
          res.body.payload.notes[0].content.should.be.eql(content);
          note_id = res.body.payload.notes[0]._id;
          done();
        });
    });
  });
  describe("GET /api/notes", () => {
    it("it should return 1 notes", (done) => {
      chai
        .request(server)
        .get(url)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.payload.should.have.property("notes");
          res.body.payload.notes.should.be.a("array");
          res.body.payload.notes.length.should.be.eql(1);
          done();
        });
    });
  });
  describe("PUT /api/notes", () => {
    it("it should UPDATE a note", (done) => {
      let note = { title: "UPDATED", content };
      chai
        .request(server)
        .put(url + `/${note_id}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(note)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.payload.should.have.property("notes");
          res.body.payload.notes[0].title.should.be.eql("UPDATED");
          done();
        });
    });
  });
  describe("DELETE /api/notes", () => {
    it("it should DELETE a note", (done) => {
      chai
        .request(server)
        .delete(url + `/${note_id}`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.payload.note_id.should.be.eql(note_id);
          done();
        });
    });
  });
  describe("GET /api/notes", () => {
    it("it should return 0 notes", (done) => {
      chai
        .request(server)
        .get(url)
        .set({ Authorization: `Bearer ${accessToken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.payload.should.have.property("notes");
          res.body.payload.notes.should.be.a("array");
          res.body.payload.notes.length.should.be.eql(0);
          done();
        });
    });
  });
});
