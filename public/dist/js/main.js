var myApp = angular.module("myApp",["ui.bootstrap",'ngRoute','ngFileUpload'])
	.config(function($routeProvider){

		$routeProvider
		//HOME ROUTE
			.when('/',{
				templateUrl: 'views/main.html',
				controller: 'mainController'
			})

			// SUPPORT ROUTE
			.when('/support',{
				templateUrl: 'views/support.html',
				controller: 'supportController'
			})

			// LOAD TEST ROUTE
			.when('/load',{
				templateUrl: 'views/load.html',
				controller: 'loadController'
			})

			// SHOW RESULT ROUTE
			.when('/result',{
				templateUrl: 'views/result.html',
				controller: 'resultController'
			})

			// USER SIGN IN AND SIGN OUT ROUTE
			.when('/signin',{
				templateUrl: 'views/signin.html',
				controller: 'signinController'
			})

			.when('/signout',{
				templateUrl: 'views/signout.html',
				controller: 'signoutController'
			})

			//USER REGISTER ROUTE
			.when('/register',{
				templateUrl: 'views/register.html',
				controller: 'registerController'
			})

			//LIVE STREAMING ROUTE
			.when('/live',{
				templateUrl: 'views/live.html',
				controller: 'liveController'
			})


			// .when('/qcode',{
			// 	templateUrl: 'views/qcode.html',
			// 	controller: 'qcodeController'
			// })

			// .when('/addquestion',{
			// 	templateUrl: 'views/addquestion.html',
			// 	controller: 'addqController'
			// })

			//USER TAKE TEST ROUTE
			.when('/test',{
				templateUrl: 'views/test.html',
				controller: 'testController'
			})

			//ADMIN ROUTES
			.when('/admin',{
				templateUrl: 'views/adminlogin.html',
				controller: 'adminLogin'
			})

			// .when('/adminregister',{
			// 	templateUrl: 'views/adminregister.html',
			// 	controller: 'adminRegister'
			// })
			.when('/adminsignout',{
				templateUrl: 'views/adminsignout.html',
				controller: 'adminSignout'
			})

			// SUPER ADMIN ROUTE
			// .when('/superadmin',{
			// 	templateUrl: 'views/superadminlogin.html',
			// 	controller: 'superAdminLogin'
			// })

			.when('/superadminhome',{
				templateUrl: 'views/superadminhome.html',
				controller: 'superAdminHomeController'
			})


			//ERROR AND REDIRECT ROUTE
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
    var superAdmin_id = sessionStorage.superAdmin_id;
    var admin_id = sessionStorage.admin_id;
    if(!id){
       // console.log("not found"+id)
       $scope.inBtn = true;
       $scope.regBtn = true;
        $scope.outBtn = false;
        $scope.message = "";
    }else{
        // console.log("found"+id)
        $scope.inBtn = false;
        $scope.regBtn = false;
        $scope.outBtn = true;
        $http({
            url:"/getUserInfo",
            data:{u_id:id},
            method:"POST"
        }).then(function successCallback(res){
        	$scope.message=res.data.fullName
            },function errorCallback(res){ 
            	console.log("Error")
        	})//Error
    }

    $scope.go = function (path){
        $location.path(path);
    }

});