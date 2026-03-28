const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, email, gender, age } = req.body;
  if (firstName === "") {
    throw new Error("FirstName should not be empty");
  } else if (lastName === "") {
    throw new Error("LastName should not be empty");
  } else if (email === "" || !validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (age === null) {
    throw new Error("age should not be null");
  } else if (
    gender.toLowerCase() === "" ||
    gender.toLowerCase() !== "male" ||
    gender.toLowerCase() !== "female"
  ) {
    throw new Error("gender is not valid");
  }
};

module.exports = validateSignup;
