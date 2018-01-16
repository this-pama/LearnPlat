var mongoose = require('mongoose');
mongoose.connect('mongodb://pama:moronkeji@ds151820.mlab.com:51820/quizapp');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback(){
   console.log("db connected");
});

var userSchema = mongoose.Schema({
	fullName : String,
	email : String,
	pass: String
});

var questionType = mongoose.Schema({
	q_name: String,
	q_code: String
})

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

var resultSchema = mongoose.Schema({
    u_id : String,
    q_name: String,
    userResult: String,
    date:String
});

var User = mongoose.model('Users',userSchema);
var Question = mongoose.model('Questions',questionSchema);
var QuestionType = mongoose.model('QuestionType',questionType);
var Result = mongoose.model('Results',resultSchema);

//REGISTER USERS
exports.regUser = function(req,res){
	var fullName= req.body.fullName;
	var email= req.body.email;
	var pass= req.body.pass;

//check if user exist
	User.findOne({ fullName: fullName, email: email },function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }
	        else {
	            if(!data){
	                console.log('Trying to register new user');

	                var user_info = new User({
				        fullName: fullName,
				        email: email,
				        pass: pass
			    	});

				    user_info.save(function(err,data){
				        if(err){
				            res.send("Registration Fail"+err);
				        }else{
				            res.send("Registrated"+data);
				        }
				    });

	            }else{
	                console.log("User Already Exist");
	                res.send("User Already Exist");
	            }

	        }
	    })
}


//USER LOGIN
exports.studentLogin = function(req,res){

    var email = req.body.email;
    var pass = req.body.pass;
    console.log(email);
    console.log(pass);

    User.findOne({ email: email, pass: pass },function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.send("error");

            }else{
                console.log("data == "+data);
                res.send(data);
            }//else  for data forward

        }

    })
};


//get user details
exports.getUserInfo = function(req,res){
    var u_id = req.body.u_id;
    User.findOne({ _id: u_id },function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.send("error");

            }else{
                console.log("data == "+data);
                res.send(data);
            }//else  for data forward

        }//Main else

    })//FindOne funtionx

}


//ADD QUESTION NAME AND CODE
exports.addQname = function(req,res){
	var q_name= req.body.q_name;
	var q_code= req.body.q_code;

//check if question type already exist
	QuestionType.findOne({ q_name: q_name, q_code: q_code },function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }
	        else {
	            if(!data){
	                console.log('Trying to add new question type');

	                var q_type = new QuestionType({
				        q_name: q_name,
						q_code: q_code
			    	});

				    q_type.save(function(err,data){
				        if(err){
				            res.send("Failed "+err);
				        }else{
				            res.send(data);
				        }
				    });

	            }else{
	                console.log("Question Name/Type Already Exist");
	                res.send("Question Name/Type Already Exist");
	            }

	        }
	    })
}


//ADD QUESTIONS TO DATABASE
exports.addQuestion = function(req,res){
	var data = req.body.question;
	var q_name = data.q_name;
    var question= data.q;
    var a_1 =data.a1;
    var a_2 = data.a2;
    var a_3= data.a3;
    var a_4= data.a4;
    var r_a= data.r_a;
    // var number= req.body.number;
    // var test= req.body.test;

    QuestionType.findOne({q_name:q_name}, function(err,data){
    	if(err){
    		console.log("error occurred");
    		res.send("error occurred")
    	}else{
    		if(!data){
    			console.log("Please input correct Question Type")
    			res.send("Please input correct Question Type")
    		}else{
					  // var data = req.body.question;
					    var question_info = new Question({
					        question: question,
					        a_1: a_1,
					        a_2: a_2,
					        a_3: a_3,
					        a_4: a_4,
					        r_a: r_a,
					        q_name:q_name
					    });

				    question_info.save(function(err,data){
				        if(err){
				            res.send("Upload Fail "+err);
				        }else{
				            res.send(data);
				            console.log(data)
				        }
				    });//>save
				    // console.log(question_info)
				    // res.send("Successful");
    		}
    	}
    })

}

//LOAD QUESTIONS BY QUESTION NAME
exports.loadQuestion= function(req, res){
	var	q_name= req.body.q_name;
	var q_code = req.body.q_code;

	QuestionType.findOne({q_name: q_name, q_code: q_code}, function(err, data){
		if(err){
			console.log("Error occured")
			res.send("Error occured")
		}else{
			if(!data){
				console.log("Incorrect Question name or code");
				res.send("Incorrect Question name or code")
			}else{
				// return q_name
				// res.send(q_name)
				Question.find({ q_name: q_name },function(err,data){
			        if (err) {// ...
			            console.log('An error has occurred');
			            res.send('An error has occurred'+err);

			        }
			        else {
			            if(!data){
			                console.log('record not found');

			                res.send("error");

			            }else{
			                res.send(data);
			                console.log("This are the questions")
			            }

			        }

			    })
			}
		}
	})

}


exports.index= function(req,res){
	res.render('index', {title: 'LearnPlat'});
}