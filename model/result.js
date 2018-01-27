var mongoose = require('mongoose');

var resultSchema = mongoose.Schema({
    u_id : String,
    q_name: String,
    userResult: String,
    date:String
});

module.exports = mongoose.model('Results',resultSchema);