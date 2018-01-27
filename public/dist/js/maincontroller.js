myApp.controller('mainController',function($scope,$location){
 

    $scope.go = function (path){
        $location.path(path);
    }

});