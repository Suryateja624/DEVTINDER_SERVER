const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is not valid!");
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  password: {
    type: String,
    required: true,
    validate(val) {
      if (!validator.isStrongPassword(val)) {
        throw new Error("Please Enter Strong Password!");
      }
    },
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.getjwt = async () => {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "", { expiresIn: "1d" });
  return token;
};

mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
