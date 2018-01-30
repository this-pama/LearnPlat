myApp.controller('addqController',function($scope,$location,$http,$timeout,Upload,$window){
var admin_id= sessionStorage.admin_id;
  if(!admin_id){
    $location.path('/')
  }else{
      var q_name= sessionStorage.qtype
      console.log(q_name)
      $scope.adminLogin = false;
       $scope.adminReg = false;
       $scope.outBtn = true;
      $scope.question = {q:null,a1:null,a2:null,a3:null,a4:null,r_a:null, q_name:q_name}
      if(q_name != null){
            $scope.checkSendData = function(){
             if($scope.question.r_a != null){
                 var question = $scope.question;
                 $scope.error = "";
                 console.log(question);
                 $http({
                     url:"/addquestion",
                     data:{question:question},
                     method:"POST"

                 }).then(function(res){
                         console.log(res.data.q_name);
                         if(res.data.q_name){
                          // location.reload();
                          // console.log(res.data);
                          $scope.success = "Question successfully added."
                         }else{
                          $scope.error = "Upload failed"
                         }

                     },function(res){ console.log("Internal Error occurred");  })//http request to send data to server to save in db




             }else{
                 $scope.error = "Please Select the correct answer."
                 console.log("Please Select the correct answer.")
             }
          }


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
          $scope.error= "Question cannot be added"
          console.log("Question cannot be added")
          $location.path('/adminuser')
        }
        $scope.go = function (path){
            $location.path(path);
        }

          $scope.title = "Welcome Admin!!! You can add Question Here. " 
          $scope.info = "Question Type is " +q_name;
  }
})//addQuest_pg()

