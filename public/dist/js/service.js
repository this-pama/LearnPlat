myApp.factory('userLogin',function($http,$location){
    var Login = {};

    Login.UserLogin= function(){
        var u_name,email,pass,re_pass;
        var login_data = {email:null,pass:null};

        //Checking Fields
        getData = function(){
            console.log("nameDisplayOfGetDAta")

            email =  login_data.email;
            pass =  login_data.pass;

            // console.log(u_name+email+pass+re_pass);
            return email,pass;
        }//getData()
        login_data.checkSendData = function(){
             if(!email){
                login_data.error = "Email is incorrect ";
            }else if(!pass){
                 login_data.error = "Password is less than 5 character ";
            }else {login_data.error = "";

                            $http({
                    url:"/login",
                    data:{email:email,pass:pass},
                    method:"POST"

                }).then(function(res){
                        if(res.data._id){
                        var u_id =  res.data._id;

                        sessionStorage.setItem('id',u_id);

                        window.location = '/'

                        }else{
                            login_data.error= "Your Email or Password is wrong"
                            console.log("record not found")
                        }

                        console.log(sessionStorage.id);
                         }, function(res){
                        // $scope.message = "error"
                            login_data.error= "Error occurred"
                            console.log("Error")
                    })
            }
            // }
        }//checkSendData

        return login_data;
    }//UserLogin
    return Login;

});//userLogin Factory



myApp.factory('userRegister',function($http,$location){
    var register = {};

    register.UserRegister= function(){
        var u_name,email,pass,re_pass;
        var register_data = {u_name:null,email:null,pass:null,re_pass:null,phoneNumber: null, address:null};

        //Checking Fields
            getData = function(){
                console.log("displayRegisterName")
                 u_name =  register_data.u_name;
                 email =  register_data.email;
                 pass =  register_data.pass;
                 re_pass =  register_data.re_pass;
                 phoneNumber =  register_data.phoneNumber;
                 address =  register_data.address;
               // console.log(u_name+email+pass+re_pass);
               return u_name,email,pass,re_pass ;
                }//getData()


        register_data.checkSendData = function(){
                        if(!u_name){
                            register_data.error = "Username is less than 5 character";
                        }else if(!email){
                            register_data.error = "Email is incorrect ";
                        }else if(!pass){
                            register_data.error = "Password is less than 5 character ";
                        }else if((!re_pass) || (pass != re_pass)){
                            register_data.error = "Both Password are not same or less than 5 character ";
                        }else{register_data.error = "";
                                $http({
                                url:"/register",
                                data:{fullName:u_name,pass:pass,email:email, phoneNumber:phoneNumber,address:address},
                                method:"POST"

                                }).then(function(res){
                                        console.log(res.data);
                                         register_data.message = "Congratulation!! You are Successfully Registered  "

                                       $location.path('/signin');
                                       // window.location = '/'
                                        console.log("registered")

                                    }, function(res){ console.log('Error')})
                            }
        }//checkSendData


        return register_data;
    }//UserRegister
          return register;

});//userRegister Factory