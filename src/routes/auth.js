const express = require("express");
const User = require("../models/user");
const logger = require("../middleware/log");
const validateSignup = require("../utils/validateSignup");
const authRouter = express.Router();

authRouter.post("/auth", logger, async (req, res) => {
  try {
    validateSignup(req);
    const user = new User(req.body);

    const savedUser = await user.save();
    res.status(200).send("User added successfully");
    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
