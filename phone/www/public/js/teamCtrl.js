angular.module('Ketch').controller('teamController', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	console.log(globalData)

	if (globalData.teams.length < 1) {
		console.log('running team loading')
		$http.post('http://localhost:3000/api/loadTeam', {teamID : '56e1e9bf1e32999b39b025be'})
			.then(function(returnData) {
				var team = returnData.data
				globalData.teams.push(team)
				console.log('globalData.teams: ', globalData.teams)
				if (returnData.data.roster.length > 0) {
					returnData.data.roster.forEach(function(playerObj) {
						globalData.friends[playerObj._id] = playerObj
					})
				}
			})
	}

	$scope.globalData = globalData
	$scope.errorMessage = ''

	$scope.changeMode = function(mode) {
		$scope.view = {
			players   : false,
			editTeams : false,
			createTeam: false
		}
		$scope.view[mode] = true
	}

	var checkErrors = function() {
		$scope.errorMessage = ''
		if (!$scope.player.firstName) { 
			$scope.errorMessage += 'Error: No first name.\n'
		}
		if (!$scope.player.lastName) {
			$scope.errorMessage += 'Error: No last name.\n'
		}
		return $scope.errorMessage
	}

	$scope.submitPlayer = function(gender) {
		if ( checkErrors() )   { return }
		$scope.player.gender = gender
		console.log('$scope.addTo: ', $scope.addTo)
		$http.post('http://localhost:3000/api/newPlayer', $scope.player)
			.then(function(returnData) {
				console.log(returnData)
				var player = returnData.data
				globalData.friends[player._id] = player
				console.log('gData.friends: ', globalData.friends)
			})

		// print/display confirmation, or created player
		$scope.player = {}
		$scope.addTo  = {}
		// WANT: check email address, names even
	}

	$scope.editPlayer = function(player) {
		if (checkErrors())   { return }
		$http.post(host + '/api/editPlayer', $scope.player)
			.then(function(returnData) {
				console.log(returnData)
			})
	}

	$scope.edit = function(teamObj) {
		if ($scope.editing == teamObj) $scope.editing = null
		else                           $scope.editing = teamObj
		console.log('team roster: ', teamObj.roster)
	} 

	$scope.createTeam = function() {
		// needs error handling
		$http.post('http://localhost:3000/api/createTeam', $scope.newTeam)
			.then(function(returnData) {
				globalData.teams[returnData.data._id] = returnData.data
				$scope.newTeam = {}
				$scope.createdMessage = 'Team created!'
 			})
	}

	$scope.editFocus = function(player) {
		console.log('Fuck this fucking fuck: ', player.name)
	}
	$scope.addToRoster = function(player, team) {
		var idObj = { teamID: team._id, playerID: player._id }
		$http.post('http://localhost:3000/api/addToRoster', idObj)
			.then(function(returnData) {
				console.log('returnData: ', returnData)
				$http.post('http://localhost:3000/api/loadTeam', idObj )
					.then(function(returnedTeam) {
						team = returnedTeam
					})				// add this fuck to local roster
			})
	}



	// removeFromRoster

	// makeCaptain
		// authenticate captainhood
	
}])