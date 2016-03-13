angular.module('Ketch').controller('welcomeController', ['$scope', '$http', 'globalData', 'user', 'team', function($scope, $http, globalData, user, team) {

	console.log('team: ', team)
	console.log('welcomeController')

	var server    = 'http://localhost:3000'
	$scope.signin  = $scope.signin  || {}
	$scope.newUser = $scope.newUser || {}

	var preloadID = '56e4c591cb0602d0489bfea0'
	var RaviID    = '56e23a279de24cc03efc5556'

	var loadFC = function() {
		$http.post(server + '/api/loadTeam', {teamID : preloadID})
			.then(function(serverResponse) {
				team = serverResponse.data
				console.log('team: ', team)
				globalData.teams[team._id] = team
				if (team.roster.length > 0) {
					team.roster.forEach(function(playerObj) {
						globalData.friends.push(playerObj)
					})
					console.log('user: ', user)
				}
			})
	}
	loadFC()


	$scope.login = function() {
		$http.post(server + '/api/login', $scope.signin)
			.then(function(serverResponse) {
				if (serverResponse.status !== 200) {
					handleBadLogin(serverResponse)
				} else {
					console.log('login serverResponse: ', serverResponse)
					user = serverResponse.data
					console.log(user)
				}
			})
	}

	var dummyLogin = function(email, password) {
		$scope.signin = {
			username: email,
			password: password
		}
		$scope.login()
	}
	// dummyLogin('buttface', 'pass')

	var handleBadLogin = function(serverResponse) {
		console.log('handleBadLogin.serverResponse: ', serverResponse)
		// incorrect password
		// "email not in DB"
			// work off serverResponse.status
	}

	var verifyInput = function() {
		console.log('team: ', team)
		$scope.errMsg = ''
		if (!$scope.newUser.email) { 
			$scope.errMsg += 'Error: No email address\n'
		} // better regEx? -> \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b.
		if (!$scope.newUser.password || !$scope.newUser.password2) {
			$scope.errMsg += 'Error: Missing password'
		} else if ($scope.newUser.password !== $scope.newUser.password2) {
			$scope.errMsg += 'Error: Passwords do not match'
		}
		return $scope.errMsg
	}

	$scope.initUser = function() {
		if ( verifyInput() ) return
		$http.post(server + '/api/initUser', $scope.newUser)
			.then(function(serverResponse) {
				console.log(serverResponse)
				user = serverResponse.data
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

	var loadUser = function(playerObj) {
		user = playerObj
		$http.post(server + '/api/playersTeams', playerObj)
			.then(function(returnData) {
				teams = returnData.data
				console.log('teams: ', returnData.data)
			})
		// loadUserFriends()
	}
	var loadUserFriends = function() {
		'tell yo frendzz'
	}

	var Ravi
	var loadRavi = function() {
		$http.post(server + '/api/loadPlayer', {playerID : RaviID})
			.then(function(serverResponse) {
				Ravi = serverResponse.data
				user = Ravi
				console.log('Ravi: ', Ravi)
				console.log('user: ', user)
				loadUser(Ravi)
			})		
	}
	// loadRavi()
}])