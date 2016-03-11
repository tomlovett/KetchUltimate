angular.module('Ketch').controller('welcomeController', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	console.log('welcomeCtrl')
	$scope.signin = $scope.signin || {}
	var server = 'http://localhost:3000'
	// if (globalData.teams.length < 1) {
	// 	$http.post(server + '/api/loadTeam', {teamID : '56e1e9bf1e32999b39b025be'})
	// 		.then(function(returnData) {
	// 			var team = returnData.data
	// 			globalData.teams[team._id] = team
	// 			if (returnData.data.roster.length > 0) {
	// 				returnData.data.roster.forEach(function(playerObj) {
	// 					console.log(playerObj)
	// 					globalData.friends[playerObj._id] = playerObj
	// 				})
	// 			}
	// 		})
	// }

	$scope.login = function() {
		$http.post(server + '/api/login', $scope.signin)
			.then(function(returnData) {
				console.log('login returnData.data: ', returnData.data)
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

	$scope.initPlayerUser = function() {
		if ( verifyInput() ) return
		$http.post(server + '/api/initPlayerUser', $scope.newUser)
			.then(function(returnData) {
				console.log(returnData)
				globalData.user = returnData.player

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