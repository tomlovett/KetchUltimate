angular.module('Ketch').controller('entry', ['$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {

	var server = 'http://159.203.69.177'

	var handleLogin = function(loginRes) {
		if (!loginRes.data.error) {
			$rootScope.user = loginRes.data.user
			$http.post(server + '/api/playersTeams', {player: loginRes.data.user})
				.then(function(teamsRes) {
					$rootScope.teams = teamsRes.data
					if (teamsRes.data.length) {
						$rootScope.team = teamsRes.data[0]
					}
				})
			$state.go('team.createTeam')
		} else {
			console.log('bad login:', loginRes.data.error)
			// error routing
			$scope.errMsg = 'Error: Incorrect email/password combination.'
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