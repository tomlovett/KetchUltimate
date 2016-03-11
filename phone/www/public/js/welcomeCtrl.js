angular.module('Ketch').controller('welcomeController', ['$scope', '$https', 'globalData', function($scope, $https, globalData) {

	console.log('mainCtrl')
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
		'if email not in database, error message -> email not in DB, '
		'else if password is incorrect, error message -> try again'
		'set player as globalData.user, load teams & friends'
	}

	var verifyInput = function() {
		$scope.errorMessage = ''
		if (!email) { $scope.errorMessage += 'Error: No email address\n'}
		// better regEx? -> \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b.
		if (!newUser.password || !newUser.password2) {
			$scope.errorMessage += 'Error: Missing password'
		} else if (newUser.password !== newUser.password2) {
			$scope.errorMessage += 'Error: Passwords do not match'
		}
		return $scope.errorMessage
	}

	$scope.initPlayerUser = function() {
		if ( verifyInput() ) return
		$https.post(server + '/api/createLogin', newUser)
			.then(function(returnData) {
				globalData.user = returnData.player

			})
		'create new user'
		'check DB for email'
			'if so, send verification email'
		'move to team management'
	}

	$scope.quickMode = function() {
		'globalData.user set to email-less player'
		're-route to team management'
		'create you first; set up user without email'
	}


}])