angular.module('Ketch').controller('entry', ['$scope', '$http', '$state', function($scope, $http, $state) {

	var server = 'http://localhost:3000'

	$scope.signUp = function() {
		$http.post(server + '/api/signUp', $scope.newUser)
			.then(function(res) {
				badSignUp(res)
				console.log('we assume you followed the rules!')
				console.log('how do we move you to the next step?')
				goodLogin(res.data)
			})
	}

	var badSignUp = function(res) {
		'parse response'
		// pre-existing email
	}

	$scope.signIn = function() {
		$http.post(server + '/api/signIn', $scope.signin)
			.then(function(res) {
				if (res.status !== 200) {
					handleBadLogin(res)
				} else {
					goodLogin(res.data)
				}
			})
	}

	var signIn = function(res) {
		console.log('handleBadLogin.res: ', res)
		// incorrect password
		// "email not in DB"
			// work off res.status
	}

	var goodLogin = function(user) {
		console.log('goodLogin -> user: ', user)
		$http.post(server + '/api/setSession', {user: user})
			.then($state.go('team'))
	}

}])