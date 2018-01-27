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
             },function(res){ alert("Internal Error occurred");  })//http request to find all user


     // set the number of admin
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


    //list  all user
      $scope.findAllUser= function(){
        $scope.allUser= true;
        $scope.allAdmin= false;
        $scope.adminHeader = false
        $scope.search= true;
        $scope.register= false;
        $scope.addquestion=false
        $scope.qList= false
        $scope.user = false;
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
        $scope.allAdmin= true;
        $scope.allUser= false;
        $scope.adminHeader = false
        $scope.search= false;
        $scope.register= false;
        $scope.addquestion=false
        $scope.qList= false
        $scope.user = false;
        $http({
             url:"/adminList",
             data:{},
             method:"POST"
         }).then(function(res){
                 // console.log(res.data);
                 if(res.data){
                  $scope.allAdmin = res.data
                  }else{
                  $scope.error = "No Admin Found"
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
                    //   $scope.user = true;
                    // $scope.allUser = false;
                    //   $scope.errorMessage = "No user found"
                      $http({
                         url:"/findUser",
                         data:{fullName: $scope.searchUser},
                         method:"POST"
                     }).then(function(res){
                             console.log(res.data);
                             if(res.data[0]){
                              $scope.searchResult = res.data
                                console.log($scope.searchResult);
                                $scope.user = true;
                                $scope.allUser = false;
                              }else{
                                $scope.user = true;
                              $scope.allUser = false;
                              $scope.errorMessage = "No User Found"
                              }
                         },function(res){ alert("Internal Error occurred");  })

                    }
               },function(res){ console.log("Internal Error occurred");  })//http request to find user
        // }else{
        //   $scope.user = true;
        //   $scope.allUser = false;
        //   $scope.errorMessage = "Please search by Name or Email"
        // }

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
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.qList= false
}

//show Qtype session
$scope.showQtype= function(){
      $scope.qType= true;
      $scope.addquestion= false;
      $scope.register= false;
      $scope.search= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.qList= false
}

//show add question session
//show Qtype session
$scope.showAddQuestion= function(){
    $scope.addquestion= true;
      $scope.qType= false;
      $scope.register= false;
      $scope.search= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
      $scope.qList= false
}

$scope.showQuestionList= function(){
      $scope.qList= true;
     $scope.addquestion= false;
      $scope.qType= false;
      $scope.register= false;
      $scope.search= false;
      $scope.user= false;
      $scope.allUser= false;
      $scope.allAdmin= false;
      $scope.adminHeader= false
      $scope.user = false;
}
$scope.registerAdmin = function(){
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
                  $scope.success = "New Admin Register Successfully";
                  $scope.admin={name:null, email:null, pass:null, re_pass:null}

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
             $scope.qList= true;
             $scope.addquestion= false;
              $scope.qType= false;
              $scope.register= false;
              $scope.search= false;
              $scope.user= false;
              $scope.allUser= false;
              $scope.allAdmin= false;
              $scope.adminHeader= false
              $scope.user = false;
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
             },function(res){ alert("Internal Error occurred");  })//http request to find all user
          } //end of getQuestionList function
      // }

//delete user
$scope.deleteUser = function(){
  var u_id = $scope.$watch.gt
  console.log(u_id)
        $http({
             url:"/deleteUser",
             data:{id: u_id},
             method:"POST"
         }).then(function(res){
                 if(res.data){
                  console.log(res.data)
                  $scope.findAllUser()
                  }else{
                  $scope.qListError = "No Question Found"
                  }
             },function(res){ alert("Internal Error occurred");  })//http request to delete user
}// end of delete user

//load page again
$scope.loadPage = function(){
location.reload();
}// end load page again

  $scope.go = function (path){
      $location.path(path);
  }

})//adminhomeController

