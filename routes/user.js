var User = require('../model/user')
// find user by email, name or id
exports.findUser= function(req,res){
	var email = req.body.email || req.body.u_name || req.body.u_id
	// var name = req.body.u_name;
 //    var u_id = req.body.u_id;
 console.log('email value is '+ email)
        //search by email
    	 User.find({ email: email },function(err,data){
        if (err) {// ...
            console.log('An error has occurred when searching by email');
            res.send('An error has occurred when searching by email '+err);
        }else {
            if(!data){
                console.log('no data found when search')
                res.send('no data found when search')
            }else{
                console.log("data search by email== "+data);
                res.send(data);
            }

        }

   		 })//Find by email
}


//list of all user
exports.findAllUser= function(req,res){

    	 User.find(function(err,data){
        if (err) {// ...
            console.log('An error has occurred');

            res.send('An error has occurred'+err);

        }else {
            if(!data){
                console.log('record not found');
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
		var name = req.body.u_name;
	    var u_id = req.body.u_id;
	    var pass = req.body.pass;
	    // if(email){
	    	User.findOne({ email: email },function(err,data){
	        if (err) {// ...
	            console.log('An error has occurred');

	            res.send('An error has occurred'+err);

	        }else {
	            if(!data){
	                console.log('record not found');
	                res.send("record not found");
	            }else{
	                console.log("data == "+data);
	                user.email = email;
	                user.fullName= name;
	                user.pass= pass;
				  	user.save(function (err, updatedUser) {
				    if (err) return handleError(err);
				    res.send(updatedUser);
					})

	            }

	        }

   		 })//Find by email
	    }
	   //  else if(name){
	   //  	User.findOne({ fullName: name },function(err,data){
	   //      if (err) {// ...
	   //          console.log('An error has occurred');

	   //          res.send('An error has occurred'+err);

	   //      }else {
			 //    user.fullName = name;
			 //  	user.save(function (err, updatedUser) {
			 //    if (err) return handleError(err);
			 //    res.send(updatedUser);
				// })

	   //      }

	   // 		 })//Find by name
	   //  }else if(pass){
	   //  	User.findOne({ u_id: u_id },function(err,data){
	   //      if (err) {// ...
	   //          console.log('An error has occurred');

	   //          res.send('An error has occurred'+err);

	   //      }else {
			 //    user.pass = pass;
			 //  	user.save(function (err, updatedUser) {
			 //    if (err) return handleError(err);
			 //    res.send(updatedUser);
				// })

	   //      }

	   // 		 })//Find by u_id
	   //  }
	    // else{
	    // 	res.send("No Data");
	    // }
    // }


    //delete user
    exports.deleteUser= function(req,res){
    	var u_id = req.body.u_id
    	var email = req.body.email;
		User.findByIdAndRemove({id:u_id},function (err, data) {
		      if (err) {// ...
                console.log('An error has occurred');
                res.send('An error has occurred'+err);
            }else {
                if(!data){
                    console.log('record not found');
                    res.send("record not found");
                }else{
                    res.send(data);
                    }

                }

            })
		}