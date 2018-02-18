var SuperAdmin = require('../model/super')


//REGISTER SUPER ADMIN
exports.regSuperAdmin = function(req,res){
	var fullName= req.body.fullName;
	var email= req.body.email;
	var pass= req.body.pass;
	var phoneNumber= req.body.phoneNumber
	var address= req.body.address

//check if user exist
	SuperAdmin.findOne({ fullName: fullName, email: email },function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }
	        else {
	            if(!data){
	                console.log('Registring new admin');

	                var superadmin_info = new SuperAdmin({
				        fullName: fullName,
				        email: email,
				        pass: pass,
				        phoneNumber: phoneNumber,
				        address:address
			    	});

				    superadmin_info.save(function(err,data){
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



//Super Admin LOGIN
exports.superAdminLogin = function(req,res){

    var email = req.body.email;
    var pass = req.body.pass;
    console.log(email);
    console.log(pass);

    SuperAdmin.findOne({ email: email, pass: pass },function(err,data){
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



//SUPER ADMIN LIST
exports.superAdminList = function(req,res){

	SuperAdmin.find(function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');
	            res.send('An error has occurred'+err);
	        }
	        else {
	        	res.send(data)
	        	// console.log(data)
	        }
	    })
}