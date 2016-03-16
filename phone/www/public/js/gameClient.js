angular.module('Ketch')
.controller('game', ['$scope', '$http',function($scope, $http) {

	var server = 'http://localhost:3000'

	var session
	$http.get(server + '/api/session')
		.then(function(res) {
			session = res.data
			console.log('session: ', session)
		})

	$rootScope.subMode = true

	$rootScope.bench = []
	$rootScope.field = []
	$rootScope.score = [0, 0]

	$scope.ordered = ['-gender'] 

	var data = {
		user  : 'playerID'
		game  : 'gameID', 	// gameID
		team  : 'teamID', 	// teamID
		roster: ['playerID', 'playerID'],
		point : 'pointID',  	// pointID
		result: 0,		// 1 or -1
		player: 'playerID', 	// playerID
		stat  : 'string', 	// type
		line  : [],
	}

	// user : 
	// My functions are built around the idea of keep

	var roster = [
		{
			id    : 'playerID',
			handle: 'handle',
			gender: 'gender',
		},
	] // loadPlayers

	$scope.score = function(result) {
		$rootScope.subMode = true
		$http.post(server + '/api/markScore', {
			result: result,
			game  : $rootScope.game,
			point : $rootScope.point
		}).then(function(res) {
			$scope.score = res.data.score
			$scope.point
		})
	}

	$scope.doneSubs = function() {
		$rootScope.subMode = false
		$rootScope.line = []
		$rootScope.field.forEach(function(playerObj) { 
			$rootScope.line.push(playerObj.id)
		})
		$http.post(server + '/api/setLine', {
			line: $rootScope.line,
			point: $rootScope.point,
		})
	}

	$scope.fire = function(index, from, to) {
		if ($rootScope.subMode) { sub(index, from, to) }
		else 	                { select(player)       }
	}

	var sub = function(player, from, to) {
		var index = from.indexOf(player)
		to.push(from.splice(index, 1)[0])
		to = _.sortBy(line, 'handle')
	}

	var select = function(player) {
		if (data.player) { data.player = '' }
		else {
			data.player = player
			if (data.metric) {
				recordStat()
			}
		}
	}
	// can combine these two functions, but alas, bigger fish to fry at the moment
	$scope.bonusStat = function(metric) {
		if (data.metric) { data.metric = '' }
		else {
			data.metric = metric
			if (data.player) {
				recordStat()
			}
		}
	}

	var recordStat = function() {
		$http.post(server + '/api/markStat', data)
		data.player = ''
		data.metric = ''
	}

	$scope.clearLine = function() {
		while ($scope.field.length > 0) {
			sub(0, $scope.field, $scope.bench)
		}
	}

	$scope.closeGame = function() {
		$http.post(server + '/api/closeGame', data)
		// other local bullshit
	}

	$scope.undo = function() {
		// stop something you just did
		// later, bro
	}
}])