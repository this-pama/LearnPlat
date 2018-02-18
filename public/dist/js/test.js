myApp.controller('testController',function($scope,$location,$http){
    var id = sessionStorage.id;
    // var qname = sessionStorage.qname;
    // var instruction = sessionStorage.instruction;
    // var qcode= sessionStorage.qcode;
    $scope.qcode={name:null, code:null}

    if(!id){
        // console.log("Id not found "+id)
        $scope.user_in = false;
        $scope.user_out = true;

    }else{
        // console.log("Id found "+id)
       $scope.user_in = true;
        $scope.user_out = false;
      $scope.checkSendData = function(){
        if($scope.qcode.name != null && $scope.qcode.code != null){

          $scope.error=""
          $http({
            url: "/checkqname",
            data: {q_name: $scope.qcode.name, q_code: $scope.qcode.code},
            method: "POST"
          }).then(function(res){
            if(res.data.q_name){
              // var qtype= res.data.q_name
              var qname= res.data.q_name
              var instruction= res.data.instruction
              var time = res.data.time
              var title = res.data.title
              var randomize = res.data.randomize
              // console.log("Question code and name is correct")
              // sessionStorage.setItem('qtype',qtype);
              sessionStorage.setItem('qname',qname);
              // sessionStorage.setItem('qcode',qcode);
              sessionStorage.setItem('instruction',instruction);
              sessionStorage.setItem('time',time);
              sessionStorage.setItem('title',title);
              sessionStorage.setItem('randomize',randomize);
              // console.log(instruction+"  "+ qname+"  "+qcode)

              $location.path('/load')
            }else{
              $scope.error= "Question name/code is incorrect";
              // console.log('Question name/code is incorrect')
            }
          }), function(res){
            $scope.error= " Error occured"
            // console.log('Error occured')
          }// end of http request
        }else{
          $scope.error= "Please input Question Name and Access Code"
        }

      }// end of checkSenddata

    }
    $scope.message = "Start Test";

    $scope.go = function (path){
        $location.path(path);
    }

});