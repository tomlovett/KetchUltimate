angular.module('Ketch').controller('entry', ['$scope', '$http', function($scope, $http) {

	$scope.toTeam = false

	$scope.createUser = function() {
		$http.post(server + '/api/createUser', $scope.newUser)
			.then(function(res) {
				badSignUp(res)
				console.log('we assume you followed the rules!')
				console.log('how do we move you to the next step?')
				$scope.toTeam = true
			}
	}

	var badSignUp = function(res) {
		'parse response'
		// pre-existing email
	}

	$scope.login = function() {
		$http.post(server + '/api/login', $scope.signin)
			.then(function(res) {
				if (res.status !== 200) {
					handleBadLogin(res)
				} else {
					$scope.toTeam = true
				}
			})
	}

	var badLogin = function(res) {
		console.log('handleBadLogin.res: ', res)
		// incorrect password
		// "email not in DB"
			// work off res.status
	}

}])