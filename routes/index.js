var User = require('../model/user')
var Question = require('../model/question')
var QuestionType = require('../model/qtype')
var Result= require('../model/result')

//REGISTER USERS
exports.regUser = function(req,res){
	var fullName= req.body.fullName;
	var email= req.body.email;
	var pass= req.body.pass;
	var phoneNumber= req.body.phoneNumber
	var address= req.body.address

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
				        pass: pass,
				        phoneNumber: phoneNumber,
				        address: address
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
                // console.log("data == "+data);
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
                // console.log("data == "+data);
                res.send(data);
            }//else  for data forward

        }//Main else

    })//FindOne funtionx

}


//ADD QUESTION NAME AND CODE
exports.addQname = function(req,res){
	var q_name= req.body.q_name;
	var q_code= req.body.q_code;
	var time= req.body.time;
	var title= req.body.title;
	var randomize= req.body.randomize;
	var instruction= req.body.instruction;

//check if question type already exist
	QuestionType.findOne({ q_name: q_name, q_code: q_code},function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }
	        else {
	            if(!data){
	                console.log('Trying to add new question type');

	                var q_type = new QuestionType({
				        instruction:instruction,
				        q_name: q_name,
						q_code: q_code,
						time:time,
						title: title,
						randomize: randomize
			    	});

				    q_type.save(function(err,data){
				        if(err){
				            res.send("Failed "+err);
				        }else{
				            res.send(data);
				        }
				    });

	            }else{
	                // console.log("Question Name/Type Already Exist");
	                res.send("Question Name/Type Already Exist");
	            }

	        }
	    })
}



//Check QUESTION NAME AND CODE
exports.checkQname = function(req,res){
	var q_name= req.body.q_name;
	var q_code= req.body.q_code;

//check if question type already exist
	QuestionType.findOne({ q_name: q_name, q_code: q_code },function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }
	        else {
	            if(data){
	                console.log('Checking for questiontype and code');
				    res.send(data);
	            }else{
	                // console.log("Question Name/Type does not Exist");
	                res.send("Question Name/Type does not Exist");
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
    var imgName = req.body.imgName
    // var imgPath = data.imgPath
    // var img ={}
    // img.data = fs.readFileSync(imgPath);
    // img.contentType = 'image/*';
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
					        q_name:q_name,
					        imgName: imgName
					    });

				    question_info.save(function(err,data){
				        if(err){
				            res.send("Upload Fail "+err);
				        }else{
				            res.send(data);
				            // console.log(data)
				        }
				    });//>save
				    // console.log(question_info)
				    // res.send("Successful");
    		}
    	}
    })

}


//GET LIST OF ALL QUESTIONS
exports.getQuestionType = function(req,res){

    QuestionType.find(function(err,data){
    	if(err){
    		console.log("error occurred");
    		res.send("error occurred")
    	}else{
    		if(!data){
    			res.send("No Question in Db")
    		}else{
    			res.send(data)
    			// console.log(data)
    		}
    	}
    })

}

//LOAD QUESTIONS BY QUESTION NAME
exports.loadQuestion= function(req, res){
	var	q_name= req.body.q_name;
	var q_code = req.body.q_code;


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
			                // console.log("These are the questions")
			            }

			        }

			    })
	

}


exports.showResult = function(req, res){

    var u_id = req.body.u_id;
    Result.find({ u_id: u_id },function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }
        else {
            if(!data){
                console.log('record not found');

                res.send("error");

            }else{
                //     console.log("data == "+data);
                res.send(data);
            }//else  for data forward

        }//Main else

    })//FindOne funtionx;
};


exports.saveResult = function(req,res){
  var user_result = req.body.riteans_perc;
  var u_id = req.body.u_id;
  var q_name = req.body.q_name;
    // console.log(u_id+"=="+user_result);
    var myDate=new Date();

    //make a new collection results were all result will be saves {user_id,quiz_name,Result,date}, When result will be shown
    //through id we will get all the info of user from users collection.
    var result_info = new Result({
        u_id : u_id,
        q_name: q_name,
        userResult: user_result,
        date:myDate
    });

    result_info.save(function(err,data){
        if(err){
            res.send("Upload Fail"+err);
        }else{
            res.send(data);
        }
    });//>save
    // res.send("Result Received");
};


exports.support= function(req,res){
var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'adedapopaul@gmail.com',
	    pass: 'moronkeji'
	  }
	});

	var email= req.body.email;
	var name = req.body.name
	var message = req.body.message
	// console.log(message+"  "+ email+" name "+name)
	var mailOptions = {
	  from: 'LearnPlat',
	  to: email,
	  subject: "LearnPlat Spport",
	  html: 'Dear User, <br /><p>Thank you for submitting your request. We will get in touch with you soon.</p><br/><p>Kind regards,</p><p>From all of us at LearnPlat</p>'
	};

	var mailToMe = {
	  from: email,
	  to: 'adedapopaul@gmail.com' ,
	  subject: "LearnPlat Spport",
	  text: message +"   "+ name+"   " + email,
	  	};
	transporter.sendMail(mailToMe, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    // console.log('Email sent: ' + info.response);
	    // res.send(info.response)
	  }
	});

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    // console.log('Email sent: ' + info.response);
	    res.send(info.response)
	  }
	});

}


//Delete Question Type
exports.deleteQtype= function(req,res){
	var q_name= req.body.q_name;
	QuestionType.remove({q_name:q_name},function (err, data) {
	      if (err) {// ...
	        console.log('An error has occurred');
	        res.send('An error has occurred'+err);
	    }else {
	        if(!data){
	            console.log('record not found');
	            res.send("record not found");
	        }else{
	            // console.log(data)
	            res.send(data);
	            }

	        }

	    })
}//End Delete Question Type


//Update Question Type
exports.updateQtype= function(req,res){
	var oldQname= req.body.oldQname;
	var q_name= req.body.q_name;
	var q_code= req.body.q_code;
	var time= req.body.time;
	var title= req.body.title;
	var randomize= req.body.randomize;
	var instruction= req.body.instruction;
    // find by qname
    	QuestionType.findOneAndUpdate({ q_name: oldQname },{q_name:q_name,q_code:q_code,title:title, time:time, instruction:instruction},
            function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }else {
            if(!data){
                console.log('record not found');
                res.send("record not found");
            }else{
                console.log("data == ",data);
                res.send(data)

            }

        }

		 })//findOneAndUpdate
}//updateQype

exports.index= function(req,res){
	res.render('index', {title: 'LearnPlat'});
}