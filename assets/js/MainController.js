var app = angular.module ('myapp', ['ngRoute']);

//Essa é a rota do angular
app.config (function ($routeProvider) {
		$routeProvider.when ('/', {
			templateUrl: '/templates/index.html'
			
		});	
		$routeProvider.when ('/login', {
			templateUrl: '/templates/login.html'
		});
		$routeProvider.when ('/register', {
			templateUrl: '/templates/register.html'
		});
})

