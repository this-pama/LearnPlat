var mongoose = require('mongoose');
var questionType = mongoose.Schema({
	instruction: String,
	title: String,
	q_name: String,
	q_code: String
})

module.exports = mongoose.model('QuestionType',questionType);