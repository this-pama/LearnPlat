myApp.controller('signinController',function($scope,$location,userLogin,$http){
    $scope.message = "Sign In";
    $scope.login = userLogin.UserLogin();

    $scope.$watch('login.email+ login.pass',getData)
    $scope.go = function (path){
        $location.path(path);
    }

});