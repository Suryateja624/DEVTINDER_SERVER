const express = require("express");
const logger = require("../middleware/log");

const testRouter = express.Router();

testRouter.get("/", logger, (req, res) => {
  res.send("This is GETs.");
});

testRouter.get("/test", logger, (req, res) => {
  res.send("This is the test");
});

testRouter.post("/test", logger, (req, res) => {
  res.send("This is the Post API");
});

testRouter.put("/test", logger, (req, res) => {
  res.send("this is put API");
});

testRouter.delete("/test", logger, (req, res) => {
  res.send("this is delete API");
});

module.exports = testRouter;
