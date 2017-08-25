app.controller ('UserController', function ($scope, $http, $location) {
	$http.get ('/getUserInfo').then (function (res) {
		if (res.data.error) {
			alert ('Error: ' + res.data.error);
		}
		else {
			$scope.user = res.data.user;
		}
	})
	$scope.logout = function (){	
		$http.post ("/logout").then (function (res){
			$location.path("/login");
		})
	}
	$scope.addButton = true;
	$scope.editButton = false;
});