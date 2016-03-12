angular.module('Ketch').controller('welcomeController', ['$scope', '$http', 'globalData', 'user', 'team', function($scope, $http, globalData, user, team) {

	var preloadID = '56e23a1d9de24cc03efc5555'

	console.log('welcomeCtrl')
	$scope.signin = $scope.signin || {}

	var server = 'http://localhost:3000'
	if (globalData.teams.length < 1) {
		$http.post(server + '/api/loadTeam', {teamID : preloadID})
			.then(function(returnData) {
				team = returnData.data
				console.log('team: ', team)
				globalData.teams[team._id] = team
				if (team.roster.length > 0) {
					team.roster.forEach(function(playerObj) {
						globalData.friends[playerObj._id] = playerObj
					})
					user = globalData.teams[preloadID].roster[0]
					console.log('user: ', user)
				}
			})
	}


	$scope.login = function() {
		$http.post(server + '/api/login', $scope.signin)
			.then(function(returnData) {
				// incorrect password handling
				// "email not in DB" handling
				console.log('login returnData.data: ', returnData.data)
				user = returnData.data
				// returns full Player object
				// assign to globalData.user
				console.log('user: ', user)
			})
		'if email not in database, error message -> email not in DB, '
		'else if password is incorrect, error message -> try again'
		'set player as globalData.user, load teams & friends'
	}

	var verifyInput = function() {
		$scope.errorMessage = ''
		if (!$scope.newUser.email) { 
			$scope.errorMessage += 'Error: No email address\n'
		}
		// better regEx? -> \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b.
		if (!$scope.newUser.password || !$scope.newUser.password2) {
			$scope.errorMessage += 'Error: Missing password'
		} else if ($scope.newUser.password !== $scope.newUser.password2) {
			$scope.errorMessage += 'Error: Passwords do not match'
		}
		return $scope.errorMessage
	}

	$scope.initUser = function() {
		if ( verifyInput() ) return
		$http.post(server + '/api/initPlayerUser', $scope.newUser)
			.then(function(returnData) {
				console.log(returnData)
				user = returnData.player

			})
		'check DB for email'
			'if so, send verification email'
		'move to team management'
		$scope.newUser = {}
	}

	$scope.quickMode = function() {
		'globalData.user set to email-less player'
		're-route to team management'
		'create you first; set up user without email'
	}


}])