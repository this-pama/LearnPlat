var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
    question : String,
    a_1: String,
    a_2: String,
    a_3: String,
    a_4: String,
    r_a: String,
    q_name: String,
    // number: Number,
    // test: Boolean
})

module.exports = mongoose.model('Questions',questionSchema);