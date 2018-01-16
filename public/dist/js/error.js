myApp.controller('errorController',function($scope,$location){
    $scope.checkSendData = function(){
    	 window.location = '/'
    }// end of checkSenddata
   


    $scope.go = function (path){
        $location.path(path);
    }

});
