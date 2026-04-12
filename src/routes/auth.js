const express = require("express");
const User = require("../models/user");
const logger = require("../middleware/log");
const validateSignup = require("../utils/validateSignup");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const validator = require("validator");

authRouter.post("/auth", logger, async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, lastName, gender, age, email, password, about, skills } =
      req.body;
    //lowercase the gender
    const gen = gender.toLowerCase();
    //encrypt the password
    const encryptPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      gender: gen,
      age,
      email,
      password: encryptPassword,
      about,
      skills,
    });

    const savedUser = await user.save();
    const token = await savedUser.getjwt();
    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

    res.status(200).send("User added successfully");
    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/login", logger, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req", req.body);

    if (email === "" || !validator.isEmail(email)) {
      throw new Error("please enter a valid email");
    }
    const response = await User.findOne({ email, isDelete: false });
    console.log("email response", response);

    if (!response) {
      throw new Error("unable to find the user!");
    }
    const isValid = await bcrypt.compare(password, response.password);
    console.log("isValid", isValid);

    if (isValid) {
      res.status(200).send("User Login Successfully!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
