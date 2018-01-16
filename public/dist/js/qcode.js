myApp.controller('qcodeController',function($scope,$location,$http){
  var admin_id= sessionStorage.admin_id;
  if(!admin_id){
    $location.path('/')
  }else{
    var qtype = sessionStorage.qtype;
    console.log(qtype+" "+ admin_id)
      $scope.qcode = {name:null,code:null}
      $scope.adminLogin = false;
       $scope.adminReg = false;
       $scope.outBtn = true;

      $scope.checkSendData = function(){
        if($scope.qcode.name != null || $scope.qcode.code != nul){
          var qcode = $scope.qcode.code;
          var qname = $scope.qcode.name;

          $scope.error=""
          $http({
            url: "/addqname",
            data: {q_name: qname, q_code: qcode},
            method: "POST"
          }).then(function(res){
            if(res.data.q_name){
              var qtype= res.data.q_name
              console.log("Question added successfully")
              sessionStorage.setItem('qtype',qtype);
              // console.log('is the qtype returned ' +qtype)

              $location.path('/addquestion')
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

      }// end of checkSenddata
      $scope.go = function (path){
            $location.path(path);
        }

      $scope.title = "Welcome Admin!!! "
      $scope.info = " Please create Question category with Username and Access code to proceed with adding questions to the database.";
  }

})