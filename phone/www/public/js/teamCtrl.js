angular.module('Ketch').controller('teamController', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	var server = 'http://localhost:3000'

	globalData.friends = globalData.friends || []

	// Auto-loading Flaming Croissants
	if (globalData.teams.length == 0) {
	$http.post(server + '/api/loadTeam', {teamID : '56e23a1d9de24cc03efc5555'})
		.then(function(returnData) {
			var team = returnData.data
			if (globalData.teams.length == 0 && team !== '') { 
				globalData.teams.push(team) 
				returnData.data.roster.forEach(function(playerObj) {
					globalData.friends.push(playerObj)
				})
			}
		})
	}

	$scope.globalData   = globalData
	$scope.errorMessage = ''
	$scope.player       = $scope.player || {} // data persistence across views
	$scope.addTo        = $scope.addTo  || {} 

// Create Player
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
		// checkDBforPlayer()
		$scope.player.gender = gender
		$http.post(server + '/api/newPlayer', $scope.player)
			.then(function(returnData) {
				var player = returnData.data
				globalData.friends.push(player)
				addToTeams(player)
				$scope.player = {}
			})
		// add functionality: print/display confirmation, or created player
	}

	var addToTeams = function(player) {
		for (teamID in $scope.addTo) { 
			if ($scope.addTo[teamID]) { $scope.addToRoster(player, teamID) }
		}
	}

	$scope.saveEdits = function(player) {
		if (checkErrors())   { return }
		$http.post(server + '/api/editPlayer', $scope.player)
			.then(function(returnData) {
				player = returnData.data // modify the thing holding it/?
				console.log(returnData.data)
			})
	}

// Edit Roster
	$scope.editTeam = function(team) {
		if ($scope.editing == team) $scope.editing = null
		else                        $scope.editing = team
	}

	$scope.addToRoster = function(player, teamID) {
		if (!teamID)  { return }
		var idObj = { player: player, teamID: teamID }
		$http.post(server + '/api/addToRoster', idObj)
			.then(function(returnData) {
				team.roster.push(player)
			})
	}

	$scope.removeFromRoster= function(player, teamID) {
		var idObj = { player: player, teamID: teamID }
		$http.post(server + '/api/removeFromRoster', idObj)
			.then(function(returnData) {
				console.log('player removed!')
			})		
	}
// Create Team
	$scope.createTeam = function() {
		// needs error handling
		$http.post(server + '/api/createTeam', $scope.newTeam)
			.then(function(returnData) {
				globalData.teams.push(returnData.data)
				$scope.newTeam = {}
				$scope.createdMessage = 'Team created!'
 			})
	}

}])