const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const config = require("./libs/config");
const jsonFormatter = require("./libs/jsonFormatter");
const userRoutes = require("./routes/api/userRoutes");
// const noteRoutes = require("./routes/api/noteRoutes");

const app = express();

// Initialize the database
const Database = require("./libs/database");
new Database(config.MONGODB_URI);

// BodyParser middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.get("/", (req, res, next) => {
  res.send("Hello from express");
});
app.use("/api/users", userRoutes, jsonFormatter);
// app.use("/api/notes", noteRoutes, jsonFormatter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
