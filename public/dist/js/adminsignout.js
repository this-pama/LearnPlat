myApp.controller('adminSignout',function($scope,$location){
    sessionStorage.clear();
    $location.path("/adminuser")
    console.log('sign out')


    $scope.go = function (path){
        $location.path(path);
    }

});