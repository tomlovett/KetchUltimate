angular.module('Ketch').controller('manageTeam', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	$scope.createPlayer = true
	$scope.editPlayer = true

	$scope.submitPlayer = function(gender) {
		// verify input
			// display error if crappy
		// submit new player to database
		// WANT: check email address, names even
	}

	$scope.editPlayer = function(player) {

	}

	$scope.createTeam = function() {

	}

	// set globalData.team

	// addToRoster

	// removeFromRoster

	// makeCaptain
		// authenticate captainhood
	
}])