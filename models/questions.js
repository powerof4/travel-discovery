var mongoose = require("mongoose");
var Answer = require("./answers");

// QUESTION SCHEMA
var questionSchema = new mongoose.Schema({
	title: String,
	image: String,
	_answer: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}] // changed to an array of answer ids since there will be multiple
});

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;
