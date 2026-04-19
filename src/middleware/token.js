const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // Validate the token that is not empty
    if (!token) {
      return res.status(401).send("Please login or Signup first");
    }

    const decodedObj = await jwt.verify(token, "DevTinder@1");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = userToken;