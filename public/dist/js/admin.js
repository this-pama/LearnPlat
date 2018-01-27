myApp.controller('adminLogin',function($http,$location,$scope){

        // $scope.admin = {email:null,pass:null}
 
        $scope.checkSendData = function(){
            // console.log(email +" 2 "+ pass)
                    var email = $scope.admin.email;
                    var pass= $scope.admin.pass;
                    console.log(email +" "+ pass)
             if(!email){
                $scope.error = "Email cannot be empty ";
                console.log("Email cannot be empty ");
            }else if(!pass){
                 $scope.error = "Password cannot be empty ";
                 console.log("Password cannot be empty ");
            }else {$scope.error = "";

                    $http({
                    url:"/adminLogin",
                    data:{email:email,pass:pass},
                    method:"POST"

                }).then(function(res){
                        if(res.data._id){
                        var admin_id =  res.data._id;
                        console.log(res.data)

                        sessionStorage.setItem('admin_id',admin_id);

                        // window.location = '/'
                        $location.path("/adminhome")

                        }else{
                            $scope.error= "Your Email or Password is wrong"
                            console.log("record not found")
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


