const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/userModel");
const keys = require("./config");

module.exports = passport => {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = keys.JWT_SECRET;
	
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
		.then(user => {
			if (user) {
				return done(null, user)
			}
			return done(null, false)
		})
        .catch(err => console.log(err))
    }))
}

