angular.module('Ketch')
.controller('game', ['$rootScope', '$scope', '$http',function($rootScope, $scope, $http) {

	var server = 'http://localhost:3000'

	var verifyGameReadiness = function() {
		http.post(server + '/api/newGame')
			.then(function(res) { $rootScope.game = res.data }) // gameID
		$rootScope.bench = $rootScope.team.roster
	}

	// console.log('$rootScope: ', $rootScope)

	var loadGame = function() {
		$http.post(server + '/api/deepRoster', {team: $rootScope.team})
			.then(function(res) {
				$rootScope.roster = res.data
				$rootScope.roster.forEach(function(player) {
					$rootScope.bench.push(player)
				})
				$http.post(server + '/api/newGame', {team: $rootScope.team})
					.then(function(nextRes) {
						$rootScope.point = nextRes.data.point
						$rootScope.game  = nextRes.data.game
					})
			})
	}

	if (!$rootScope.bench) {
		$rootScope.bench = []
		$rootScope.field = []
		$rootScope.score = [0, 0]
		$rootScope.subMode = true
		if (!$rootScope.team) {
			$rootScope.team = '56e8f88ae89c9b5208b8f211' // Dark Side
			loadGame()
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

	$scope.score = function(result) {
		$rootScope.subMode = true
		$http.post(server + '/api/markScore', {
			result: result,
			game  : $rootScope.game,
			point : $rootScope.point
		})
			.then(function(res) {
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

	$scope.fire = function(player, from, to) {
		if ($rootScope.subMode) { sub(player, from, to) }
		else 	                { select(player)       }
	}

	var sub = function(player, from, to) {
		var index = from.indexOf(player)
		to.push(from.splice(index, 1)[0])
		to = _.sortBy(to, 'handle')
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

	var select = function(player) {
		if ($scope.player) { $scope.player = '' }
		else {
			$scope.player = player
			if ($scope.metric) {
				recordStat()
			}
		}
	}
	
	$scope.bonusStat = function(metric) {
		if ($scope.metric) { $scope.metric = '' }
		else {
			$scope.metric = metric
			if ($scope.player) {
				recordStat()
			}
		}
	}

	$scope.clearLine = function() {
		while ($rootScope.field.length > 0) {
			sub(0, $rootScope.field, $rootScope.bench)
		}
	}

	$scope.closeGame = function() {
		$http.post(server + '/api/closeGame')
		// local management
			// 
	}

	// $scope.undo = function() {
	// 	stop something you just did
	// 	later, bro
	// }
}])