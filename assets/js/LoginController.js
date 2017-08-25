app.controller ('LoginController', function ($scope, $http, $location) {
	$scope.login = function (user, pass) {
		$http.post ("/login", {login: user, password: pass}).then (function (res) {
			if (res.data.error) {
				alert ("Error: " + res.data.error);
			}
			else {		
				$location.path('/');
			}
		})		
	}
	$scope.register = function(name, user, pass) {
		$http.post ("/register", {name: name, login: user, password:pass}).then (function (res) {
			if (res.data.error) {
				alert ("Register Error: " + res.data.error);
			}
			else {
				//confirma cadastro
				$location.path('/login');
			}
		})
	}
	$scope.getRegister = function() {
		$location.path('/register');
	} 
})