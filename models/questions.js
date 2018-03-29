var mongoose = require("mongoose");
var Answer = require("./answers");

// QUESTION SCHEMA
var questionSchema = new mongoose.Schema({
	title: String,
	image: String,
	_answer: [
		 // changed to an array of answer ids since there will be multiple
		{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}		
	]
});

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
