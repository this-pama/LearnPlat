var myApp = angular.module("myApp",["ui.bootstrap",'ngRoute'])
	.config(function($routeProvider){

		$routeProvider
			.when('/',{
				templateUrl: 'views/main.html',
				// controller: 'mainController'
			})

			.when('/signin',{
				templateUrl: 'views/signin.html',
				controller: 'signinController'
			})

			.when('/signout',{
				templateUrl: 'views/signout.html',
				controller: 'signoutController'
			})

			.when('/register',{
				templateUrl: 'views/register.html',
				controller: 'registerController'
			})

			.when('/qcode',{
				templateUrl: 'views/qcode.html',
				controller: 'qcodeController'
			})

			.when('/addquestion',{
				templateUrl: 'views/addquestion.html',
				controller: 'addqController'
			})

			// .when('/test',{
			// 	templateUrl: 'views/test.html',
			// 	controller: 'testController'
			// })

			.when('/adminuser',{
				templateUrl: 'views/adminlogin.html',
				controller: 'adminLogin'
			})

			.when('/adminregister',{
				templateUrl: 'views/adminregister.html',
				controller: 'adminRegister'
			})
			.when('/adminsignout',{
				templateUrl: 'views/adminsignout.html',
				controller: 'adminSignout'
			})

			.when('/error',{
                templateUrl:'views/error.html',
                controller: 'errorController'
             })
            .otherwise({
                redirectTo:"/"
             })
	})


	myApp.controller('navController',function($scope,$location,$http){
    var id = sessionStorage.id;
    if(!id){
       console.log("not found"+id)
       $scope.inBtn = true;
       $scope.regBtn = true;
        $scope.outBtn = false;
        $scope.message = "";
    }else{
        console.log("found"+id)
        $scope.inBtn = false;
        $scope.regBtn = false;
        $scope.outBtn = true;
        $http({
            url:"/getUserInfo",
            data:{u_id:id},
            method:"POST"
        }).then(function successCallback(res){
        	// console.log(res.data)
        	// if(!res.data._id){
        		$scope.message=res.data.fullName
        		// $scope.inBtn = true;
        		// $scope.outBtn = false;
        		console.log('login successful')
        	// }else{
        	//     $scope.message = res.data.fullName;
         //        console.log($scope.message)
         //        sessionStorage.clear();
         //        // console.log('getUserInfo url')
        	// }


            },function errorCallback(res){ 
            	console.log("Error")
        	})//Error
    }

    $scope.go = function (path){
        $location.path(path);
    }

});