const server = require("../src/server");
const Users = require("../src/models/userModel");

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

const registerUrl = "/api/users/register";
const loginUrl = "/api/users/login";
const refreshTokenUrl = "/api/users/refresh-token";
const logoutUrl = "/api/users/logout";

const usernameTest = "USERTEST";
const passwordTest = "123";

describe("Users", () => {
  let refreshToken = "";
  Users.deleteMany({}, (err) => {
    if (err) done(err);
  });
  /*
   * Test the /GET route
   */
  describe("GET /api/users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.payload.should.be.a("array");
          res.body.payload.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   * Test the /POST route register
   */
  describe("POST /api/users/register", () => {
    it("it should not POST a user without username field", (done) => {
      let user = { password: passwordTest };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql(`"username" is required`);
          done();
        });
    });
  });
  describe("POST /api/users/register", () => {
    it("it should not POST a user without password field", (done) => {
      let user = { username: usernameTest };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql(`"password" is required`);
          done();
        });
    });
  });
  describe("POST /api/users/register", () => {
    it("it should not POST a user with username length less than 4 character", (done) => {
      let user = { username: "abc", password: passwordTest };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql(
            `"username" length must be at least 4 characters long`
          );
          done();
        });
    });
  });
  describe("POST /api/users/register", () => {
    it("it should not POST a user with password length less than 3 character", (done) => {
      let user = { username: usernameTest, password: "12" };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql(
            `"password" length must be at least 3 characters long`
          );
          done();
        });
    });
  });
  describe("POST /api/users/register", () => {
    it("it should POST a user", (done) => {
      let user = { username: usernameTest, password: passwordTest };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.success.should.be.eql(true);
          res.body.payload.should.be.a("object");
          res.body.payload.should.have.property("accessToken");
          res.body.payload.should.have.property("refreshToken");
          done();
        });
    });
  });
  describe("POST /api/users/register", () => {
    it("it should not POST a user that already exists", (done) => {
      let user = { username: usernameTest, password: passwordTest };
      chai
        .request(server)
        .post(registerUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql("User already exists");
          done();
        });
    });
  });
  /*
   * Test the /POST route login
   */
  describe("POST /api/users/login", () => {
    it("it should NOT login a user that is not registered", (done) => {
      let user = { username: "abc", password: "123" };
      chai
        .request(server)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql(`User does not exists`);
          done();
        });
    });
  });
  describe("POST /api/users/login", () => {
    it("it should NOT login a user that is not match the password", (done) => {
      let user = { username: usernameTest.toLowerCase(), password: "12" };
      chai
        .request(server)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.success.should.be.eql(false);
          res.body.error.message.should.be.eql(
            `Username/password is incorrect`
          );
          done();
        });
    });
  });
  describe("POST /api/users/login", () => {
    it("it should login a user", (done) => {
      let user = {
        username: usernameTest.toLowerCase(),
        password: passwordTest,
      };
      chai
        .request(server)
        .post(loginUrl)
        .send(user)
        .end((err, res) => {
          accessToken = res.body.payload.accessToken;
          refreshToken = res.body.payload.refreshToken;
          res.should.have.status(200);
          res.body.success.should.be.eql(true);
          res.body.payload.should.have.property("accessToken");
          res.body.payload.should.have.property("refreshToken");
          done();
        });
    });
  });
  /*
   * Test the /POST route refresh-token
   */
  describe("POST /api/users/refresh-token", () => {
    it("it should NOT generate new acess token and refresh token, and response with 404 NotFound", (done) => {
      let payload = {
        refreshToken: "",
      };
      chai
        .request(server)
        .post(refreshTokenUrl)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe("POST /api/users/refresh-token", () => {
    it("it should NOT generate new access token and refresh token, and response with 401 Unauthorized", (done) => {
      let payload = {
        refreshToken: refreshToken + "cc",
      };
      chai
        .request(server)
        .post(refreshTokenUrl)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe("POST /api/users/refresh-token", () => {
    it("it should generate new access token and refresh token", (done) => {
      let payload = {
        refreshToken,
      };
      chai
        .request(server)
        .post(refreshTokenUrl)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.be.eql(true);
          res.body.payload.should.have.property("accessToken");
          res.body.payload.should.have.property("refreshToken");
          done();
        });
    });
  });
  /*
   * Test the /DELETE route logout
   */
  describe("DELETE /api/users/logout", () => {
    it("it should NOT logout a user and NOT blacklist refreshToken because the payload is empty, and response with 404 NotFound", (done) => {
      let payload = {
        refreshToken: "",
      };
      chai
        .request(server)
        .delete(logoutUrl)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe("DELETE /api/users/logout", () => {
    it("it should NOT logout a user and NOT blacklist refreshToken because redis could not find the userId key, and response with 401 Unauthorized", (done) => {
      let payload = {
        refreshToken: refreshToken + "cc",
      };
      chai
        .request(server)
        .delete(logoutUrl)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });
  describe("DELETE /api/users/logout", () => {
    it("it should logout a user and blacklist the refreshToken", (done) => {
      let payload = {
        refreshToken,
      };
      chai
        .request(server)
        .delete(logoutUrl)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
