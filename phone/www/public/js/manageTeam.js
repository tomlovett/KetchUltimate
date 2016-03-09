angular.module('Ketch').controller('manageTeam', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	var host = 'http:localhost:3000'

	$scope.createPlayer = true
	$scope.errorMessage = ''
	$scope.editPlayer = true

	$scope.team = globalData.team

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
		if (checkErrors())   { return }
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
				// success message
				// cut out if returnData != 200/player
				console.log(returnData)
			})
	}

	$scope.createTeam = function() {

	}

	// set globalData.team

	// addToRoster

	// removeFromRoster

	// makeCaptain
		// authenticate captainhood
	
}])