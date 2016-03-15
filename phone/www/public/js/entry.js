angular.module('Ketch').controller('entry', ['$scope', '$http', '$state', function($scope, $http, $state) {

	var server = 'http://localhost:3000'

	var handleLogin = function(res) {
		if (!res.data.error) {
			console.log('handleLogin -> res: ', res)
			// console.log('goodLogin -> user: ', user)
			$http.post(server + '/api/setSession', {
				user: res.data.user
			})
				.then($state.go('team'))
		} else {
			console.log('bad login:', res.data.error)
			$http.post(server + '/api/setSession', {user: res.data.user})
				.then(function() {$http.get(server + '/api/session')} )
				.then($state.go('team'))
		}
	}

	$scope.signUp = function() {
		$http.post(server + '/api/signUp', $scope.newUser)
			.then(handleLogin)
	}

	$scope.signIn = function() {
		console.log('$scope.signin: ', $scope.signin)
		$http.post(server + '/api/signIn', $scope.signin)
			.then(handleLogin)
	}

}])