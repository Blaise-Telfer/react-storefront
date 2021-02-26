const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  
  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
  
  // username checks
  if (Validator.isEmpty(data.username)) {
    errors.message = "Username is required";
  }
  if (!Validator.isLength(data.username, { min: 8, max: 32 })) {
    errors.message = "Username must be between 8 and 32 characters";
  }
  
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.message = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }
  
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.message = "Password is required";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.message = "Confirm password is required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    errors.message = "Password must be between 8 and 32 characters";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.message = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};