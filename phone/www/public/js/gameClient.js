angular.module('Ketch')
.controller('game', ['$rootScope', '$scope', '$http',function($rootScope, $scope, $http) {

	var server = 'http://localhost:3000'

	if (!$rootScope.bench) {
		$rootScope.bench = []
		$rootScope.field = []
		$rootScope.score = [0, 0]
		$rootScope.subMode = true
		if (!$rootScope.team) {

			// load pre-stored team for game run
			// push to bench - functionality
		}
	}

	var rootScope = {
		user  : 'playerID',
		game  : 'gameID', 	// gameID
		team  : 'teamID', 	// teamID
		teams : [],
		roster: ['playerID', 'playerID'],
		point : 'pointID',  	// pointID
		result: 0,		// 1 or -1
		player: 'playerID', 	// playerID
		stat  : 'string', 	// type
		line  : [],
	}

	var roster = [
		{
			id    : 'playerID',
			handle: 'handle',
			gender: 'gender',
		},
	]

	var loadGame = function() {
		$http.post(server + '/api/rawRoster', {team: $rootScope.team})
			.then(function(res) {
				$rootScope.roster = res.data
				console.log('loadGame -> $rs.roster: ', $rootScope.roster)
			})
	}

	$scope.score = function(result) {
		$rootScope.subMode = true
		$http.post(server + '/api/markScore', {
			result: result,
			game  : $rootScope.game,
			point : $rootScope.point
		}).then(function(res) {
			$rootScope.score = res.data.score
			$rootScope.point = res.data.point
		})
	}

	$scope.doneSubs = function() {
		$rootScope.subMode = false
		$rootScope.line = []
		$rootScope.field.forEach(function(player) { 
			$rootScope.line.push(player.id)
		})
		$http.post(server + '/api/setLine', {
			line : $rootScope.line,
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
		// verify that this works; the splice-y bullshit
	}

	var select = function(player) {
		if ($scope.player) { $scope.player = '' }
		else {
			$scope.player = player
			if ($scope.metric) {
				recordStat()
			}
		}
	}
	// can combine these two functions, but alas, bigger fish to fry at the moment
	$scope.bonusStat = function(metric) {
		if ($scope.metric) { $scope.metric = '' }
		else {
			$scope.metric = metric
			if ($scope.player) {
				recordStat()
			}
		}
	}

	var recordStat = function() {
		var data = {
			point  : $rootScope.point,
			player : $scope.player,
			stat   : $scope.metric,
		}
		$http.post(server + '/api/markStat', data)
		$scope.player = ''
		$scope.metric = ''
	}

	$scope.clearLine = function() {
		while ($rootScope.field.length > 0) {
			sub(0, $rootScope.field, $rootScope.bench)
		}
	}

	$scope.closeGame = function() {
		$http.post(server + '/api/closeGame')
		// local stuff
	}

	// $scope.undo = function() {
	// 	stop something you just did
	// 	later, bro
	// }
}])