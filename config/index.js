module.exports= function(app){
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://pama:moronkeji@ds151820.mlab.com:51820/quizapp');
	var db = mongoose.connection;
	db.on('error',console.error.bind(console,'connection error'));
	db.once('open',function callback(){
	   console.log("db now connected");
	});
}