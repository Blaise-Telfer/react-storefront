const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/config");
const User = require("../models/userModel");
const validateRegisterInput = require("../middleware/validateRegister");
const validateLoginInput = require("../middleware/validateLogin");
const moment = require("moment");
moment().format();


//register handler
router.post("/register", async (req, res) => {
  //check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  let user = await User.findOne({email: req.body.email});
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }
  user = await User.findOne({username: req.body.username});
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }

	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		location: req.body.location,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname
	});
	
	// Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) { throw err };
          newUser.password = hash;
		  newUser.save()
          .then(user => {
			res.json({ message: "You have registered successfully and can now log in" });
		  })
		  .catch(error => res.json(error));
		});
	});
});


//login handler
router.post('/login', (req, res) => {
  //validation check
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
	
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT Payload
        const payload = {
          id: user.id,
		  username: user.username,
		  email: user.email,
		  role: user.role
        };
		
        // Sign token, expires in 3hrs
        jwt.sign(payload, keys.JWT_SECRET, { expiresIn: 10800 }, (err, token) => {
			res.json({success: true, token: "Bearer " + token});
		});
		} else {
			return res.status(400).json({ message: "Password incorrect" });
		}
    });
  });
});


module.exports = router;