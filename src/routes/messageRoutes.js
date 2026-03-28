const express = require("express");
const logger = require("../middleware/log");
const messageRouter = express.Router();


messageRouter.get("/message", logger, (req, res) => {
  res.send("this is get message");
});

messageRouter.post("/message", logger, (req, res) => {
  res.send("this is post message");
});

messageRouter.put("/message", logger, (req, res) => {
  res.send("this is put message");
});

messageRouter.delete("/message", logger, (req, res) => {
  res.send("this is the delete message");
});

module.exports= messageRouter;
