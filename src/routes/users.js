const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const logger = require("../middleware/log");
const token = require("../middleware/token");
const usersRouter = express.Router();
const filteredFields = "firstName lastName age gender email skills about";

// fetch all the users.
usersRouter.get("/users", logger, token, async (req, res) => {
  try {
    const resposne = await User.find({ isDelete: false }).select(
      filteredFields,
    );
    res.status(200).send(resposne);
    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// fetch user by emailId.
usersRouter.get("/findUserByEmail", logger, token, async (req, res) => {
  try {
    const { email } = req.body;
    const resposne = await User.findOne({ email, isDelete: false }).select(
      filteredFields,
    );
    res.status(200).send(resposne);
    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// fetch user by userId.
usersRouter.get("/findUserById", logger, token, async (req, res) => {
  try {
    const { _id } = req.body;
    const resposne = await User.findOne({ _id, isDelete: false }).select(
      filteredFields,
    );
    if (resposne === "") {
      res.status(200).send("No users found based on given information");
    }
    res.status(200).send(resposne);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update the user info.
usersRouter.patch("/users", logger, token, async (req, res) => {
  try {
    const { _id } = req.body;
    const data = req.body;
    const response = await User.findByIdAndUpdate({ _id }, data, {
      returnDocument: "before",
    });
    res.status(200).send("User updated Succesfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete the user.
usersRouter.delete("/users", logger, token, async (req, res) => {
  try {
    const { _id } = req.body;
    const response = await User.findByIdAndDelete({ _id });
    res.status(200).send("User deleted Succesfully!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = usersRouter;
