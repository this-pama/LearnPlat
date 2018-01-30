myApp.controller('resultController',function($scope,$location,$http){
    var id = sessionStorage.id;

    if(!id){
        $scope.msg = "Please Sign In "
    }else{

        $http({
            url:"/showResult",
            data:{u_id:id},
            method:"POST"
        }).then(function(res){
            $scope.resultData = res.data;
            },function(res){console.log("Error");}
        )//Error
    }


    $scope.message = "Results";
});