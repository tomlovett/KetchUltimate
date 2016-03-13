angular.module('Ketch').controller('teamController', ['$scope', '$http', 'globalData', 'user', 'team', function($scope, $http, globalData, user, team) {

	console.log('team controller')
	console.log('team: ', team)

	var server = 'http://localhost:3000'
	globalData.teams.forEach(function(teamObj) {
		console.log('forEach team: ', teamObj)
	})

	$scope.globalData = globalData
	$scope.populated  = globalData.populated
	$scope.errMsg = ''
	$scope.player = $scope.player || {}
	$scope.addTo  = $scope.addTo  || {}

	var populatePlayer = function(playerID) {
		var player
		$http.post(server + '/api/loadPlayer', {playerID: playerID})
			.then(function(serverResponse) {
				player = serverResponse.data
				globalData.populated[playerID] = player
				console.log('gData.populated: ', globalData.populated)
				return player
			})
	}

	var populateRoster = function(teamObj) {
		teamObj.roster.forEach(function(playerID) {
			if (!globalData.populated[playerID])
				populatePlayer(playerID)
		})
		console.log('$scope.populated: ', $scope.populated)
	}

	var FC
	var loadFC = function(team) {
		$http.post(server+'/api/loadTeam', {teamID : "56e4c591cb0602d0489bfea0"})
			.then(function(serverResponse) {
				if (globalData.teams.length > 0)  return
				team = serverResponse.data  // not working. why???
				FC = serverResponse.data
				globalData.teams.push(FC)
				$scope.team = serverResponse.data
				console.log('FC: ', FC)
				console.log('team: ', team)
				console.log('globalData.teams.length: ', globalData.teams.length)
				populateRoster(FC)
			})
	}
	// loadFC(team)
// Create Player
	var checkErrors = function() {
		$scope.errMsg = ''
		if (!$scope.player.firstName)
			$scope.errMsg += 'Error: No first name.\n'
		if (!$scope.player.lastName)
			$scope.errMsg += 'Error: No last name.\n'
		return $scope.errMsg
	}

	$scope.submitPlayer = function(gender) {
		if ( checkErrors() )   { return }
		// checkDBforPlayer()
		$scope.player.gender = gender
		$http.post(server + '/api/createPlayer', $scope.player)
			.then(function(serverResponse) {
				var player = serverResponse.data
				globalData.friends.push(player)
				addToTeams(player._id)
				$scope.player = {}
			})
		// add functionality: print/display confirmation, or created player
	}

	var addToTeams = function(playerID) {
		for (teamID in $scope.addTo) { 
			if ($scope.addTo[teamID]) { $scope.addToRoster(playerID, teamID) }
		}
	}

	$scope.saveEdits = function(player) {
		if (checkErrors())   { return }
		$http.post(server + '/api/editPlayer', $scope.player)
			.then(function(serverResponse) {
				player = serverResponse.data // modify the thing holding it/?
				console.log(serverResponse.data)
			})
	}

// Edit Roster
	$scope.editTeam = function(teamObj) {
		console.log('team: ', team)
		$scope.team = teamObj
		if ($scope.editing) $scope.editing = false
		else                $scope.editing = true
	}

	$scope.addToRoster = function(playerID, teamID) {
		// if (!teamID)  { return }
		var idObj = { playerID: playerID, teamID: teamID }
		$http.post(server + '/api/addToRoster', idObj)
			.then(function(serverResponse) {
				team.roster.push(serverResponse.data)
			})
	}

	$scope.removeFromRoster = function(player, teamID) {
		var idObj = { playerID: player, teamID: teamID }
		$http.post(server + '/api/dropPlayer', idObj)
			.then(function(serverResponse) {
				console.log('player removed!')
			})		
	}
// Create Team
	$scope.createTeam = function() {
		// needs error handling
		$http.post(server + '/api/createTeam', $scope.newTeam)
			.then(function(serverResponse) {
				globalData.teams.push(serverResponse.data)
				team = serverResponse.data
				$scope.newTeam = {}
				$scope.createdMessage = 'Team created!'
 			})
	}

	$scope.friendFilter = function(playerID) {
		return (playerID in editing.roster)
	}

}])