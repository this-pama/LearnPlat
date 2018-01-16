myApp.controller('registerController',function($scope,$location,$http,userRegister){
    $scope.message = "Register";
       $scope.register = userRegister.UserRegister();

    $scope.$watch('register.u_name + register.email+ register.pass + register.re_pass',getData)
    $scope.go = function (path){
        $location.path(path);
    }

});
