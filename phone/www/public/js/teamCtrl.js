angular.module('Ketch').controller('teamController', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	var server = 'http://localhost:3000'

	globalData.friends = globalData.friends || []

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

	$scope.globalData = globalData
	$scope.errorMessage = ''
	$scope.player = $scope.player || {}
	$scope.player.teams = [] // careful. be wary of toggle box.
	// ideally, look for a way to tie toggle boxes to a true/false value

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

	$scope.select = function(team) {
		$scope.player.teams.push(team)
	}

	$scope.submitPlayer = function(gender) {
		if ( checkErrors() )   { return }
		$scope.player.gender = gender
		$http.post(server + '/api/newPlayer', $scope.player)
			.then(function(returnData) {
				var player = returnData.data
				globalData.friends.push(player)
				if ($scope.player.teams) {
					$scope.player.teams.forEach(function(team) {
						$scope.addToRoster(player, team)
					})
				} // want to take out "if", but wary of toggle issues
				$scope.player = {
					firstName: '',
					lastName : '',
					handle   : '',
					email    : ''
				}
				// $scope.player.teams = [team]
				// workaround for $s.p.teams resetting but toggle icon remaining checked
			})

		// print/display confirmation, or created player
		// WANT: check email address, names even
	}

	$scope.editPlayer = function(player) {
		if (checkErrors())   { return }
		$http.post(server + '/api/editPlayer', $scope.player)
			.then(function(returnData) {
				player = returnData.data // modify the thing holding it/?
				console.log(returnData)
			})
	}

	$scope.edit = function(team) {
		if ($scope.editing == team) $scope.editing = null
		else                        $scope.editing = team
	} 

	$scope.createTeam = function() {
		// needs error handling
		$http.post(server + '/api/createTeam', $scope.newTeam)
			.then(function(returnData) {
				globalData.teams.push(returnData.data)
				$scope.newTeam = {}
				$scope.createdMessage = 'Team created!'
 			})
	}

	$scope.addToRoster = function(player, team) {
		if (!team)  { return }
		var idObj = { teamID: team._id, player: player }
		$http.post(server + '/api/addToRoster', idObj)
			.then(function(returnData) {
				team.roster.push(player)
			})
	}

}])