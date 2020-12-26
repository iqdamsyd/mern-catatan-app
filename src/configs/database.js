class Database {
  constructor(uri) {
    this.mongoose = require("mongoose");
    this._connect(uri);
  }

  _connect(uri) {
    this.mongoose.Promise = global.Promise;
    this.mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    const { connection } = this.mongoose;

    connection.on("connected", () => {
      console.log("Database connection was successfull");
    });

    connection.on("error", (err) => {
      console.log("Database connection failed." + err);
    });

    connection.on("disconnected", () => {
      console.log("Database connection disconnected");
    });

    process.on("SIGINT", () => {
      connection.close();
      console.log(
        "Database Connection closed due to NodeJS process termination"
      );
      process.exit(0);
    });

    require("../models/userModel");
  }
}

module.exports = Database;
