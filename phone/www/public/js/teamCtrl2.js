angular.module('Ketch').controller('teamController', ['$scope', '$http', function($scope, $http) {

	var server = 'http://localhost:3000'

	var roster = [
		{
			id    : 'playerID',
			handle: 'handle',
			gender: 'gender',
		},
	]

	$scope.editTeam = function(team) {
		if ($scope.editing) { $scope.editing = null }
		else {
			$rootScope.editing = team
			$http.post(server + '/api/rawRoster', {team: team})
				.then(function(res) {
					$rootScope.editing.roster = res.data
				})
		}
	}

	$scope.createTeam = function() {
		$http.post(server + '/api/newTeam', {name: $scope.newTeam.name})
			.then(function(res) {
				console.log('res: ', res)
				$rootScope.teams.push(res.data)
				$scope.newTeam = {}
			})
	}

	$scope.createPlayer = function() {
		$http.post(server + '/api/newPlayer', $scope.player)
	}

	$scope.updatePlayer = function() {
		$http.post(server + '/api/updatePlayer', $scope.editPlayer)
	}

	$scope.editPlayer = function(player) {
		$http.post(server + '/api/fullPlayer', player.id)
			.then(function(res) {
				$scope.editedPlayer = res.data
			})
		// set up editing player infrastructure, not submission
	}

	$scope.addToRoster = function() {
		var data = {
			team  : $rootScope.team,
			player: $rootScope.player.id,
		}
		$http.post(server + '/api/intoRoster', data)
			.then(function() {
				$http.post(server + '/api/rawRoster', {team: session.team})
				.then(function(res) {
					$scope.editing.roster = res.data
				})
		})

	}

	/*
	req.session.team = ID
	req.session.roster = []
	req.session.friends = []
	*/


}])