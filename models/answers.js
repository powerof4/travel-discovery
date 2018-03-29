var mongoose = require("mongoose");
var Question = require("./questions");

// / ANSWER SCHEMA
var answerSchema = new mongoose.Schema({
	response: [],
	_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'} // adding the id of the question so it can be referenced

});

var Answer = mongoose.model("Answer", answerSchema);

// EXPORTS
module.exports = Answer;
