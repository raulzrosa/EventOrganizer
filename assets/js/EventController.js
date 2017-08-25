app.controller ('EventController', function ($scope, $http, $location, $route) {
	$scope.createEvent = function () {
		$http.post ('/createEvent', {initTime: $scope.initTime, endTime: $scope.endTime, description: $scope.description}).then (function (res) {
			console.log (res.data);
			if (res.data.error) {
				alert ('Register Error: ' + res.data.error);
			} 
			else {
				$scope.user.events.push (res.data.event);
				$scope.initTime = '';
				$scope.endTime = '';
				$scope.description = '';
			}
		})
	}
	$scope.deleteEvent = function (event, index) {
		$http.post ('/deleteEvent', {id: event}).then (function (res) {
			if (res.data.error) {
				alert ('Error: ' + res.data.error);
			}
			else {
				$route.reload();
			}
		})	
	}
	$scope.loadEvent = function (event) {
		$scope.addButton = false;
		$scope.editButton = true;
		$http.post ('/loadEvent', {id: event}).then (function (res) {
			if (res.data.erro){
				alert ('Erro: ' + res.data.erro);
			}
			else {			
				$scope.initTime = res.data.event.initTime;
				$scope.endTime = res.data.event.endTime;
				$scope.description = res.data.event.description;
				$scope.eventEdit = res.data.event;
			}
		})
	}
	$scope.editEvent = function () {
		$http.post ('/editEvent', {id: $scope.eventEdit.id, initTime: $scope.initTime, endTime: $scope.endTime,
		 							description: $scope.description}).then (function (res) {
		 	if (res.data.error) {
		 		alert ('Error: ' + res.data.error);
		 	}
		 	else {
		 		$route.reload();
		 	}

		})
	}

	$scope.shareEvent = function (event, login_share) {
		$http.post ('/shareEvent', {id: event, login: login_share}).then (function (res) {
			if (res.data.error) {
				alert('Error:' + res.data.error);
			}
			else {
				$scope.login_share = ' ';
				alert('Event successfully shared!');
			}
		})
	}
	$scope.deleteShareEvent = function (event, index) {
		$http.post ('/deleteShareEvent', {id: event}).then (function (res) {
			if(res.data.error) {
				alert('Error:' + res.data.error);
			}
			else {
				$route.reload();
			}
		})
	}
})