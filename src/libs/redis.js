const redis = require("redis");

let client;

if (process.env.NODE_ENV === "development" || "test") {
  client = redis.createClient({
    port: 6379,
    host: "127.0.0.1",
  });
}

if (process.env.NODE_ENV === "production") {
  client = redis.createClient(process.env.REDIS_URL);
}

client.on("connect", () => {
  console.log("Client connected to redis..");
});

client.on("connect", () => {
  console.log("Client connected to redis and ready to use..");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGNINT", () => {
  client.quit();
});

module.exports = client;
