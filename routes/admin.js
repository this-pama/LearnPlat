var Admin = require('../model/admin')

//REGISTER ADMIN
exports.regAdmin = function(req,res){
	var fullName= req.body.fullName;
	var email= req.body.email;
	var pass= req.body.pass;
	var phoneNumber= req.body.phoneNumber
	var address= req.body.address

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
				        pass: pass,
				        phoneNumber: phoneNumber,
				        address:address
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
                // console.log("data == "+data);
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
	        	// console.log(data)
	        }
	    })
}


//FIND AN ADMIN
exports.findAdmin= function(req,res){
	var email = req.body.email || req.body.u_name || req.body.u_id
        //search by email
    	 Admin.find({ email: email },function(err,data){
        if (err) {// ...
            console.log('An error has occurred when searching by email');
            res.send('An error has occurred when searching by email '+err);
        }else {
            if(!data){
                console.log('no data found when search')
                res.send('no data found when search')
            }else{
                // console.log("data search by email== "+data);
                res.send(data);
            }

        }

   		 })//Find by email
}

    //delete user
    exports.deleteAdmin= function(req,res){
    	var u_id = req.body.u_id
    	var email = req.body.email;
		Admin.remove({email:email},function (err, data) {
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
		}

    //Update Admin details
    exports.updateAdmin= function(req,res){
    	var email = req.body.email;
		var fullName = req.body.fullName;
	    var u_id = req.body.u_id;
	    var pass = req.body.pass;
        var phoneNumber = req.body.phoneNumber
        var address = req.body.address

	    // if(email){
	    	Admin.findOneAndUpdate({ email: email },{email: email, address: address, pass: pass, fullName: fullName, phoneNumber: phoneNumber},
	    		function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }else {
	            if(!data){
	                console.log('record not found');
	                res.send("record not found");
	            }else{
	                // console.log("data == "+data);
	             	res.send(data)

	            }

	        }

   		 })//Find by email
	    }