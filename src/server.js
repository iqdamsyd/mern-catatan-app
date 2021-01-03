const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

require("./libs/redis");
const config = require("./libs/config");
const jsonFormatter = require("./libs/jsonFormatter");
const errorHandler = require("./libs/errorHandler");
const userRoutes = require("./routes/api/userRoutes");

// Initialize the database
const Database = require("./libs/database");
new Database(config.MONGODB_URI);

const app = express();

// BodyParser middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

// App Routes
app.get("/", (req, res) => {
  res.send("Hello from express");
});
app.use("/api/users", userRoutes, jsonFormatter);
// app.use("/api/notes", noteRoutes, jsonFormatter);

// Log Errors
// Client Errors
// Error Handler
app.use(errorHandler);

// Start listen
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
