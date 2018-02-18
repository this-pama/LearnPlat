var mongoose = require('mongoose');
var questionType = mongoose.Schema({
	instruction: String,
	title: String,
	q_name: String,
	q_code: String,
	time: Number,
	randomize: Boolean
})

module.exports = mongoose.model('QuestionType',questionType);