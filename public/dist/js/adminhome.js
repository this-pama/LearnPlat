myApp.controller('adminhomeController',function($scope,$location,$http,$timeout,Upload,$window){
var admin_id= sessionStorage.admin_id;
// $scope.noOfUser = sessionStorage.noOfUser;
// var searching = sessionStorage.searching;

  if(!admin_id){
    $location.path('/adminlogin')
  }else{
    var email = $scope.email
    var pass = $scope.pass
    var u_id= $scope.u_id
    var fullName = $scope.fullName
    $scope.adminHeader = true


// set the number of users
    var numberOfUser= function(){
            $http({
             url:"/findAllUser",
             data:{},
             method:"POST"
         }).then(function(res){
                 // console.log(res.data);
                 if(res.data){
                  $scope.noOfUser = res.data.length
                  }else{
                  $scope.error = "User number is undefined"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to find all user
    }

     // set the number of admin
     var numberOfAdmin= function(){
          $http({
         url:"/adminList",
         data:{},
         method:"POST"
     }).then(function(res){
             // console.log(res.data);
             if(res.data){
              $scope.noOfAdmin = res.data.length
              }else{
              $scope.error = "Admin number is undefined"
              }
         },function(res){ console.log("Internal Error occurred");  })//http request to find all admin
     }


    numberOfUser();
    numberOfAdmin()

    //list  all user
      $scope.findAllUser= function(){
         $scope.register= false;
        $scope.qType= false;
        $scope.addquestion= false;
        $scope.search= true;
        $scope.adminSearch= false;
        $scope.user= false;
        $scope.allUser= true;
        $scope.allAdmin= false;
        $scope.adminHeader= false
        $scope.user = false;
        $scope.admin = false;
        $scope.qList= false
        $http({
             url:"/findAllUser",
             data:{},
             method:"POST"
         }).then(function(res){
                 // console.log(res.data);
                 if(res.data){
                  $scope.allUser = res.data
                  // var searching = $scope.allUser;
                   // console.log($scope.allUser);
                  // sessionStorage.setItem('searching',$scope.allUser);
                  // console.log(searching);
                  }else{
                  $scope.error = "No User Found"
                  }
             },function(res){ alert("Internal Error occurred");  })//http request to find all user
          } //end of findAllUser function
      }

//list  all Admin
      $scope.findAllAdmin= function(){
         $scope.register= false;
        $scope.qType= false;
        $scope.addquestion= false;
        $scope.search= false;
        $scope.adminSearch= true;
        $scope.user= false;
        $scope.allUser= false;
        $scope.allAdmin= true;
        $scope.adminHeader= false
        $scope.user = false;
        $scope.admin = false;
        $scope.qList= false

        $http({
             url:"/adminList",
             data:{},
             method:"POST"
         }).then(function(res){
                 // console.log(res.data);
                 if(res.data){
                  $scope.allAdmin = res.data
                  }else{
                  $scope.error = "No Admin Found."
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to find all user
          } //end of findAllAdmin function
      // }



      //find a user
      $scope.findUser= function(){
        // if($scope.searchUser != null){
          $scope.searchResult = null
          // $scope.searchUser= null
          $scope.errorMessage= ''
          $http({
               url:"/findUser",
               data:{email: $scope.searchUser},
               method:"POST"
           }).then(function(res){
                   console.log(res.data);
                   if(res.data[0]){
                    // console.log(res.data);
                    $scope.searchResult = res.data
                    console.log($scope.searchResult);
                    $scope.user = true;
                    $scope.allUser = false;
                    }else{
                      $scope.user = true;
                    $scope.allUser = false;
                      $scope.errorMessage = "No user found. Please search by Emai"
                    }
               },function(res){ console.log("Internal Error occurred");  })//http request to find user


      } //end of findUser function



      //find one admin
      $scope.findAdmin= function(){
        // if($scope.searchUser != null){
          $scope.searchResultAdmin = null
          // $scope.searchUser= null
          $scope.errorMessage= ''
          $http({
               url:"/findAdmin",
               data:{email: $scope.searchAdmin},
               method:"POST"
           }).then(function(res){
                   console.log(res.data);
                   if(res.data[0]){
                    // console.log(res.data);
                    $scope.searchResultAdmin = res.data
                    console.log($scope.searchResultAdmin);
                    $scope.admin = true;
                    $scope.allAdmin = false;
                    }else{
                      $scope.admin = true;
                    $scope.allAdmin = false;
                      $scope.errorMessage = "No user found. Please search by Emai"
                    }
               },function(res){ console.log("Internal Error occurred");  })//http request to find user


      } //end of findUser function


// //search for a user througn the search form
// $scope.searchUser = function(){
//      for (var i = 0; i < searching.length; i++) {
//       if(searching[i].email ==$scope.searching || searching[i].fullName ==$scope.searching){
//         $scope.searchResult = searching[i]
//         console.log($scope.searchResult)
//         $scope.user = true;
//         $scope.allUser = false;
//       }
//     }
// }

//show register admin page
$scope.showRegAdmin= function(){
        $scope.register= true;
        $scope.qType= false;
      $scope.addquestion= false;
      $scope.search= false;
      $scope.adminSearch= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.admin = false;
      $scope.qList= false
}

//show Qtype session
$scope.showQtype= function(){
       $scope.register= false;
        $scope.qType= true;
      $scope.addquestion= false;
      $scope.search= false;
      $scope.adminSearch= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.admin = false;
      $scope.qList= false
}
//show add question session
//show Qtype session
$scope.showAddQuestion= function(){
     $scope.register= false;
        $scope.qType= false;
      $scope.addquestion= true;
      $scope.search= false;
      $scope.adminSearch= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.admin = false;
      $scope.qList= false
}

$scope.showQuestionList= function(){
      $scope.register= false;
      $scope.qType= false;
      $scope.addquestion= false;
      $scope.search= false;
      $scope.adminSearch= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.admin = false;
      $scope.qList= true
}
$scope.registerAdmin = function(){
      var email = $scope.email;
      var pass= $scope.pass;
      var fullName= $scope.fullName;
      var re_pass= $scope.re_pass;
      var address= $scope.address
      var phoneNumber= $scope.phoneNumber
      console.log(email +" "+ pass +" "+ name +" "+re_pass)
     if(!email){
        $scope.error = "Email cannot be empty ";
        console.log("Email cannot be empty ");
    }else if(!pass || pass != re_pass){
         $scope.error = "Password/Confirm Password must be the same and must be more than 4 characters ";
         console.log("Password cannot be empty ");
    }else if(!fullName){
         $scope.error = "Name cannot be empty ";
         console.log("Name cannot be empty  ");
    }
    else {$scope.error = "";

            $http({
            url:"/registerAdmin",
            data:{fullName:fullName,email:email,pass:pass, address:address, fullName:fullName},
            method:"POST"

        }).then(function(res){
                if(res.data.fullName){
                  $scope.showRegAdmin()
                  numberOfAdmin()
                  $scope.success = "New Admin Registered Successfully";
                  $scope.fullName=null; $scope.email=null; $scope.pass=null; $scope.re_pass=null; $scope.address=null;
                  $scope.phoneNumber=null;

                }else{
                    $scope.error= "User already Exist"
                    console.log("User already Exist")
                }
                 }, function(res){
                // $scope.message = "error"
                    $scope.error= "Error occurred"
                    console.log("Error")
            })
    }
    // }
}//registerNewAdmin


//create question username and access code
$scope.createQtype= function(){
  var qtype = sessionStorage.qtype;
        if($scope.qcode.name != null || $scope.qcode.code != null){
          var qcode = $scope.qcode.code;
          var qname = $scope.qcode.name;
          var title= $scope.qcode.title;
          var instruction = $scope.qcode.instruction;

          $scope.error=""
          $http({
            url: "/addqname",
            data: {instruction:instruction,title:title, q_name: qname, q_code: qcode},
            method: "POST"
          }).then(function(res){
            if(res.data.q_name){
              var qtype= res.data.q_name
              console.log("Question added successfully")
              sessionStorage.setItem('qtype',qtype);
              sessionStorage.setItem('title',title);
              // console.log('is the qtype returned ' +qtype)

              // $location.path('/addquestion')
              $scope.addquestion= true;
              $scope.qType= false;
            }else{
              $scope.error= "Question name Already exist. Please try a different Question name";
              console.log('Question name Already exist. Please try a different Question name')
            }
          }), function(res){
            $scope.error= " Error occured"
            console.log('Error occured')
          }// end of http request
        }else{
          $scope.error= "Please create a Question name and access code"
        }

}


//Add question session
$scope.addQuestion = function(){
      var q_name= sessionStorage.qtype
      var title= sessionStorage.title
      if(q_name != null){
         if($scope.question.r_a != null){
             var question = $scope.question;
             $scope.error = "";
             console.log(question);
             $http({
                 url:"/addquestion",
                 data:{question:question},
                 method:"POST"
             }).then(function(res){
                     // console.log(res.data.q_name);
                     if(res.data.q_name){
                      $scope.addQsuccess = "Question successfully added."
                      $scope.question = {q:null,a1:null,a2:null,a3:null,a4:null,r_a:null, q_name:q_name}
                      $scope.question.title= title;
                     }else{
                      $scope.addQerror = "Upload failed"
                     }

                 },function(res){ alert("Internal Error occurred");  })//http request to send data to server to save in db

             }else{
                 $scope.addQerror = "Please Select the correct answer."
                 console.log("Please Select the correct answer.")
             }

             //take care of image upload to local folder
               $scope.uploadPic = function(file) {
                  file.upload = Upload.upload({
                    url: '/upload',
                    data: {file: file},
                  });
                  file.upload.then(function (resp) {
                    if(resp.data.error_code === 0){ //validate success
                          $window.alert('Success ' + resp.config.data.file.name + ' uploaded. Response: ');
                          /* returns a file which will be uploaded with the newName instead of original file name */
                          // Upload.rename(file, $scope.q_name)
                      } else {
                          $window.alert('an error occured');
                      }
                  }, function (response) {
                    if (response.status > 0)
                      $scope.errorMsg = response.status + ': ' + response.data;
                  }, function (evt) {
                    console.log(evt)
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    console.log(file.progress)
                  });
                  }
        }else{
          $scope.addQerror= "Question cannot be added"
          console.log("Question cannot be added")
          $location.path('/adminhome')
        }
}


      //Get list of Questions
      $scope.getQuestionList= function(){
          $scope.register= false;
            $scope.qType= false;
          $scope.addquestion= false;
          $scope.search= false;
          $scope.adminSearch= false;
          $scope.user= false;
          $scope.allUser= false;
          $scope.allAdmin= false;
          $scope.adminHeader= false
          $scope.user = false;
          $scope.admin = false;
          $scope.qList= true
        $http({
             url:"/getQuestionType",
             data:{},
             method:"POST"
         }).then(function(res){
                 if(res.data){
                  $scope.questionList = res.data
                  }else{
                  $scope.qListError = "No Question Found"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to find all user
          } //end of getQuestionList function
      // }

//delete user
$scope.deleteUser = function(){
  var email = $scope.deleteUserEmail
  $scope.deleteUserSuccess = ""
  $scope.deleteUserError = ""
        $http({
             url:"/deleteUser",
             data:{email: email},
             method:"POST"
         }).then(function(res){
                 if(res.data.n == 1){
                  // console.log(res.data)
                  $scope.deleteUserSuccess = "Successfully Deleted"
                  $scope.findAllUser()
                  numberOfUser()
                  }else{
                  $scope.deleteUserError = "No User Found"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to delete user
}// end of delete user


//delete Admin
$scope.deleteAdmin = function(){
  var email = $scope.deleteAdminEmail
  $scope.deleteSuccess = ""
  $scope.deleteError = ""
        $http({
             url:"/deleteAdmin",
             data:{email: email},
             method:"POST"
         }).then(function(res){
                 if(res.data.n == 1){
                  // console.log(res.data)
                  $scope.deleteSuccess = "Successfully Deleted"
                  $scope.findAllAdmin()
                  numberOfAdmin()
                  }else{
                  $scope.deleteError = "No User Found"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to delete admin
}// end of delete Admin


//delete Qtype
$scope.deleteQtype = function(){
  var qname = $scope.deleteQname
  $scope.deleteQtypeSuccess = ""
  $scope.deleteQtypeError = ""
        $http({
             url:"/deleteQtype",
             data:{q_name: qname},
             method:"POST"
         }).then(function(res){
                 if(res.data.n == 1){
                  // console.log(res.data)
                  $scope.deleteQtypeSuccess = "Successfully Deleted"
                  $scope.getQuestionList()
                  }else{
                  $scope.deleteQtypeError = "No Record Found"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to delete user
}// end of delete Qtype


//Update Admin
$scope.updateAdmin = function(){
  var email = $scope.email
  var address = $scope.address
  var phoneNumber= $scope.phoneNumber
  var pass = $scope.pass
  var fullName= $scope.fullName
  $scope.updateAdminSuccess = ""
  $scope.updateAdminError = ""
        $http({
             url:"/updateAdmin",
             data:{email: email, address: address, pass: pass, fullName: fullName, phoneNumber: phoneNumber},
             method:"POST"
         }).then(function(res){
          console.log(res.data)
                 if(res.data.email){
                  
                  $scope.updateAdminSuccess = "Successfully Updated"
                  $scope.findAllAdmin()
                  }else{
                  $scope.updateAdminError = "No Record Found"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to Update admin
}// end of Update Admin


//Update User
$scope.updateUser = function(){
  var email = $scope.email
  var address = $scope.address
  var phoneNumber= $scope.phoneNumber
  var pass = $scope.pass
  var fullName= $scope.fullName
  $scope.updateUserSuccess = ""
  $scope.updateUserError = ""
        $http({
             url:"/updateUser",
             data:{email: email, address: address, pass: pass, fullName: fullName, phoneNumber: phoneNumber},
             method:"POST"
         }).then(function(res){
          console.log(res.data)
                 if(res.data.email){
                  
                  $scope.updateUserSuccess = "Successfully Updated"
                  $scope.findAllUser()
                  }else{
                  $scope.updateUserError = "No Record Found"
                  }
             },function(res){ console.log("Internal Error occurred");  })//http request to Update User
}// end of Update User


//load page again
$scope.loadPage = function(){
location.reload();
}// end load page again

  $scope.go = function (path){
      $location.path(path);
  }

})//adminhomeController

