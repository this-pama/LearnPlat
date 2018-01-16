myApp.controller('adminRegister',function($http,$location,$scope){

        // $scope.admin = {email:null,pass:null}
       $scope.adminLogin = true;
       $scope.adminReg = false;
        $scope.checkSendData = function(){
            // console.log(email +" 2 "+ pass)
                    var email = $scope.admin.email;
                    var pass= $scope.admin.pass;
                    var name= $scope.admin.name;
                    var re_pass= $scope.admin.re_pass;
                    console.log(email +" "+ pass +" "+ name +" "+re_pass)
             if(!email){
                $scope.error = "Email cannot be empty ";
                console.log("Email cannot be empty ");
            }else if(!pass && pass == re_pass){
                 $scope.error = "Password/Confirm Password must be the same and must be more than 4 characters ";
                 console.log("Password cannot be empty ");
            }else if(!name){
                 $scope.error = "Name cannot be empty ";
                 console.log("Name cannot be empty  ");
            }
            else {$scope.error = "";

                    $http({
                    url:"/registerAdmin",
                    data:{fullName:name,email:email,pass:pass},
                    method:"POST"

                }).then(function(res){
                        if(res.data.fullName){
                        // var admin_id =  res.data._id;
                        console.log(res.data)
                        $scope.adminLogin = true;
                        $scope.adminReg = false;

                        // sessionStorage.setItem('adminId',admin_id);

                        // window.location = '/'
                        $location.path("/adminuser")

                        }else{
                            $scope.error= "User already Exist"
                            console.log("User already Exist")
                        }

                        console.log(sessionStorage.id);
                         }, function(res){
                        // $scope.message = "error"
                            $scope.error= "Error occurred"
                            console.log("Error")
                    })
            }
            // }
        }//checkSendData


         $scope.go = function (path){
            $location.path(path);
        }

    })


