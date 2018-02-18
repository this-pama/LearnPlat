var mongoose = require('mongoose');

var superAdminSchema = mongoose.Schema({
	fullName : String,
	email : String,
	pass: String,
	phoneNumber: Number,
	address: String
});

module.exports = mongoose.model('SuperAdmins',superAdminSchema);