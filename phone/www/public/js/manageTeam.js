angular.module('Ketch').controller('manageTeam', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	$scope.globalData = globalData
	$scope.errorMessage = ''

	console.log(globalData)

	$scope.changeMode = function(mode) {
		$scope.view = {
			players    : false,
			editTeams   : false,
			createTeam : false
		}
		$scope.view[mode] = true
		console.log('$scope.editing: ', $scope.editing)
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
		$http.post('http://localhost:3000/api/newPlayer', $scope.player)
			.then(function(returnData) {
				// success message
				// cut out if returnData != 200/player
				console.log(returnData)
			})
		$scope.player = {}
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
		console.log('globalData.teams = ', globalData.teams)
		if ($scope.editing == teamObj) { $scope.editing = null    }
		else						   { $scope.editing = teamObj }
	} 

	$scope.createTeam = function() {
		$http.post('http://localhost:3000/api/createTeam', $scope.newTeam)
			.then(function(returnData) {
				globalData.teams.push(returnData.data)
				$scope.newTeam = {}
				$scope.createdMessage = 'Team created!'
				console.log('globalData.teams: ', globalData.teams)
 			})
	}

	// addToRoster

	// removeFromRoster

	// makeCaptain
		// authenticate captainhood
	
}])