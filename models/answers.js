var mongoose = require("mongoose");
// / ANSWER SCHEMA
var answerSchema = new mongoose.Schema({
	response: [String],
	_question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'} // adding the id of the question so it can be referenced

});

var Answer = mongoose.model("Answer", answerSchema);

// EXPORTS
module.exports = Answer;
