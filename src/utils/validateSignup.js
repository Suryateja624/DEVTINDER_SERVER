const validator = require("validator");

const validateSignup = (req) => {
  const { firstName, lastName, emailId, password } =
    req.body;
  if (firstName === "") {
    throw new Error("FirstName should not be empty");
  } else if (lastName === "") {
    throw new Error("LastName should not be empty");
  } else if (emailId === "" || !validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (password === "" || !validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password!");
  }
};

module.exports = validateSignup;
