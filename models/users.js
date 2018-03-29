var mongoose = require("mongoose");

// USER SCHEMA
var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String
});

var User = mongoose.model("User", userSchema);

// EXPORTS
module.exports = User;