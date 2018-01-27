var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
	fullName : String,
	email : String,
	pass: String
});

module.exports = mongoose.model('Admins',adminSchema);