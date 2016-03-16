angular.module('Ketch').controller('entry', ['$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {

	var server = 'http://localhost:3000'

	var handleLogin = function(res) {
		if (!res.data.error) {
			$rootScope.user = res.data.user
			console.log($rootScope)
			$state.go('team')
		} else {
			console.log('bad login:', res.data.error)
			console.log('try again')
			$scope.signin.password = ''
		}
	}

	$scope.signUp = function() {
		$http.post(server + '/api/signUp', $scope.newUser)
			.then(handleLogin)
	}

	$scope.signIn = function() {
		$http.post(server + '/api/signIn', $scope.signin)
			.then(handleLogin)
	}

}])