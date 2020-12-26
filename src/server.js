const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const config = require("./configs/config");
const jsonFormatter = require("./middlewares/jsonFormatter");
const userRoutes = require("./routes/api/userRoutes");
const noteRoutes = require("./routes/api/noteRoutes");

const app = express();

// Initialize the database
const Database = require("./configs/database");
new Database(config.MONGODB_URI);

// BodyParser middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/users", userRoutes, jsonFormatter);
app.use("/api/notes", noteRoutes, jsonFormatter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
