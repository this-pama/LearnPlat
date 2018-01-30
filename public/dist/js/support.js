myApp.controller('supportController',function($scope,$location,$http){
      // $scope.qcode = {instruction:null, name:null,code:null}
      $scope.sendMail = function(){
        if($scope.name != null && $scope.email != null && $scope.message != null){
          var name = $scope.name;
          var email = $scope.email;
          var message= $scope.message;

          $scope.msg=""
          $http({
            url: "/support",
            data: {email:email, name: name, message: message},
            method: "POST"
          }).then(function(res){

              location.reload()
              // console.log(res.data)
          }, function(res){
            $scope.error= " Error occured"
            // console.log('Error occured')
          })// end of http request
        }else{
          $scope.msg= "Please fill the form"
        }

      }// end of checkSenddata
      $scope.go = function (path){
            $location.path(path);
        }

})