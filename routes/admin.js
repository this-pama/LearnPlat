var Admin = require('../model/admin')

//REGISTER ADMIN
exports.regAdmin = function(req,res){
	var fullName= req.body.fullName;
	var email= req.body.email;
	var pass= req.body.pass;

//check if user exist
	Admin.findOne({ fullName: fullName, email: email },function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }
	        else {
	            if(!data){
	                console.log('Registring new admin');

	                var admin_info = new Admin({
				        fullName: fullName,
				        email: email,
				        pass: pass
			    	});

				    admin_info.save(function(err,data){
				        if(err){
				            res.send("Registration Fail"+err);
				        }else{
				            res.send(data);
				        }
				    });

	            }else{
	                console.log("Admin Already Exist");
	                res.send("Admin Already Exist");
	            }

	        }
	    })
}


//Admin LOGIN
exports.adminLogin = function(req,res){

    var email = req.body.email;
    var pass = req.body.pass;
    console.log(email);
    console.log(pass);

    Admin.findOne({ email: email, pass: pass },function(err,data){
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



//ADMIN LIST
exports.adminList = function(req,res){

	Admin.find(function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');
	            res.send('An error has occurred'+err);
	        }
	        else {
	        	res.send(data)
	        	console.log(data)
	        }
	    })
}
