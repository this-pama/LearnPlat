myApp.controller('resultController',function($scope,$location,$http){
    var id = sessionStorage.id;

    if(!id){
        // console.log("not found "+id)
        $scope.msg = "Please Sign In "
    }else{
        // console.log("found "+id)

        $http({
            url:"/showResult",
            data:{u_id:id},
            method:"POST"
        }).then(function(res){
                $scope.resultData = res.data;
                // console.log(res.data);
            },function(res){alert("Error");}
        )//Error
    }


    $scope.message = "Results";
});