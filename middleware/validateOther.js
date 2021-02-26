const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {
	validateEmail: function(data) {
	  let errors = {};
	  
	  // Convert empty fields to an empty string so we can use validator functions
	  data.email = !isEmpty(data.email) ? data.email : "";
	  // Email checks
	  if (Validator.isEmpty(data.email)) {
		errors.email = "Email is required";
	  } else if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	  }
	  
	  return {
		errors,
		isValid: isEmpty(errors)
	  };
	},

	validatePassword: function(data) {
	  let errors = {};
  
	  // Convert empty fields to an empty string so we can use validator functions
	  data.password = !isEmpty(data.password) ? data.password : "";
	  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";
	  // Password checks
	  if (Validator.isEmpty(data.password)) {
		errors.password = "Password is required";
	  }
	  if (Validator.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = "Confirm password is required";
	  }
	  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
		errors.password = "Password must be between 8 and 32 characters";
	  }
	  if (!Validator.equals(data.password, data.confirmPassword)) {
		errors.confirmPassword = "Passwords must match";
	  }

	  return {
		errors,
		isValid: isEmpty(errors)
	  };
	}
}