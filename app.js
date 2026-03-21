const express = require("express");
const connectToDatabase = require("./src/config/database");
const User = require("./src/models/user");
const connectionRequest = require("./src/models/connectionRequest");
const logger = require("./src/middleware/log");
const app = express();

connectToDatabase()
  .then(async () => {
    console.log("Mongo db connected succesfully");
    app.listen(3000, () => {
      console.log("Sever is started.");
    });
  })
  .catch(() => {
    console.log("database connection failed");
  });

app.get("/", logger, (req, res) => {
  res.send("This is GETs.");
});

app.get("/test", logger, (req, res) => {
  res.send("This is the test");
});

app.post("/test", logger, (req, res) => {
  res.send("This is the Post API");
});

app.put("/test", logger, (req, res) => {
  res.send("this is put API");
});

app.delete("/test", logger, (req, res) => {
  res.send("this is delete API");
});

app.get("/message", logger, (req, res) => {
  res.send("this is get message");
});

app.post("/message", logger, (req, res) => {
  res.send("this is post message");
});

app.put("/message", logger, (req, res) => {
  res.send("this is put message");
});

app.delete("/message", logger, (req, res) => {
  res.send("this is the delete message");
});
