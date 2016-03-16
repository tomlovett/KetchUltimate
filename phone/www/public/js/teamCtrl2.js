angular.module('Ketch').controller('teamController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

	var server = 'http://localhost:3000'

	var roster = [
		{
			id    : 'playerID',
			handle: 'handle',
			gender: 'gender',
		},
	]

	var teeeems = [
		{
			id  : 'teamID',
			name: 'teamName',
			roster: []
		}
	]
	$scope.addTo = {}

	if (!$rootScope.teams) {
		$rootScope.team  = ''
		$rootScope.teams = []
		$rootScope.players = []
	}

	// var rosterTo = function() {
	// 	$scope.editing.roster.forEach(function(playerID) {
	// 		var index = $scope.editing.roster.indexOf(playerID)
	// 		$http.post(server + '/api/fullPlayer', {player: playerID})
	// 			.then(function(res) { 
	// 				$scope.editing.roster[index] = res.data
	// 			})
	// 	})
	// 	console.log('$scope.editing.roster: ', $scope.editing.roster)
	// }

	$scope.editTeam = function(team) {
		if ($scope.editing) { $scope.editing = false }
		else {
			$scope.editing = team
			$http.post(server + '/api/deepRoster', {team: team.id})
				.then(function(res) {
					$scope.editing.roster = res.data
					console.log('$scope.editing.roster: ', $scope.editing.roster)
				})
		}
	}

	$scope.createTeam = function() {
		$http.post(server + '/api/newTeam', {name: $scope.newTeam.name})
			.then(function(res) {
				$rootScope.teams.push(res.data) // {id, name, roster}
				$scope.newTeam = {}
			})
	}

	var verifyInput = function() {
		// error checking for createPlayer
		// print out errors on html
	}

	$scope.createPlayer = function(gender) {
		if (verifyInput())   return
		$scope.player.gender = gender
		$http.post(server + '/api/newPlayer', $scope.player)
			.then(function(res) {
				$rootScope.player = {
					id    : res.data.id,
					handle: res.data.handle,
					gender: res.data.gender
				}
				$rootScope.players.push($rootScope.player)
				$scope.player = {}
				pushToRosters($rootScope.player)
			})
	}


	var pushToRosters = function(player) {
		console.log('addTo: ', $scope.addTo)
		$rootScope.teams.forEach(function(team) {
			if ($scope.addTo[team.name]) {
				$http.post(server + '/api/intoRoster', {
					player: $rootScope.player,
					team  : team.id
				})
				.then(function(res) {
					var index = $rootScope.teams.indexOf(team)
					$rootScope.teams[index].roster = res.data.roster
				})
			}
		})
	}

	$scope.updatePlayer = function() {
		$http.post(server + '/api/updatePlayer', $scope.editPlayer)
			.then(function(res) {
				$rootScope.players.push({
					id    : res.data.id,
					handle: res.data.handle,
					gender: res.data.gender
				})
			})
	}

	$scope.editPlayer = function(player) {
		$http.post(server + '/api/fullPlayer', player.id)
			.then(function(res) {
				$scope.editedPlayer = res.data
			}) // set up editing player infrastructure, not submission
	}

	$scope.addToRoster = function() {
		var data = {
			team  : $rootScope.team,
			player: $rootScope.player.id,
		}
		$http.post(server + '/api/intoRoster', data)
			.then(function() {
				$http.post(server + '/api/rawRoster', {team: $rootScope.team})
				.then(function(res) {
					$scope.editing.roster = res.data
				})
		})
	}

}])