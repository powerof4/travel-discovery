var mongoose = require("mongoose");
// / ANSWER SCHEMA
var answerSchema = new mongoose.Schema({
	response: [String],
});

var Answer = mongoose.model("Answer", answerSchema);

// EXPORTS
module.exports = Answer;
