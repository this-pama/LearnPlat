var User = require('../model/user')
// find user by email, name or id
exports.findUser= function(req,res){
var email = req.body.email || req.body.u_name || req.body.u_id
 // console.log('email value is '+ email)
        //search by email
    	 User.find({ email: email },function(err,data){
        if (err) {// ...
            // console.log('An error has occurred when searching by email');
            res.send('An error has occurred when searching by email '+err);
        }else {
            if(!data){
                // console.log('no data found when search')
                res.send('no data found when search')
            }else{
                // console.log("data search by email== "+data);
                res.send(data);
            }

        }

   		 })//Find by email
}


//list of all user
exports.findAllUser= function(req,res){

    	 User.find(function(err,data){
        if (err) {// ...
            // console.log('An error has occurred');
            res.send('An error has occurred'+err);

        }else {
            if(!data){
                // console.log('record not found');
                res.send("record not found");
            }else{
                // console.log("data == "+data);
                res.send(data);
            }

        }

   		 })//Find all user
    }


    //Update user details
    exports.updateUser= function(req,res){
    	var email = req.body.email;
		var fullName = req.body.fullName;
	    var u_id = req.body.u_id;
	    var pass = req.body.pass;
        var phoneNumber = req.body.phoneNumber
        var address = req.body.address
	    // if(email){
	    	User.findOneAndUpdate({ email: email },{email: email, address: address, pass: pass, fullName: fullName, phoneNumber: phoneNumber},
                function(err,data){
	        if (err) {// ...
	            // console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }else {
	            if(!data){
	                // console.log('record not found');
	                res.send("record not found");
	            }else{
	                // console.log("data == "+data);
                    res.send(data)

	            }

	        }

   		 })//Find by email
	    }



    //delete user
    exports.deleteUser= function(req,res){
    	var u_id = req.body.u_id
    	var email = req.body.email;
		User.remove({email:email},function (err, data) {
		      if (err) {// ...
                // console.log('An error has occurred');
                res.send('An error has occurred'+err);
            }else {
                if(!data){
                    // console.log('record not found');
                    res.send("record not found");
                }else{
                    // console.log(data)
                    res.send(data);
                    }

                }

            })
		}