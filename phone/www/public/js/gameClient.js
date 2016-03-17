angular.module('Ketch')
.controller('game', ['$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {

	var server = 'http://localhost:3000'
	$scope.opponent = 'SPAM'

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

	$scope.score = function(result) {
		$rootScope.subMode = true
		if (result === 1)    { $rootScope.score[0] += 1 }
		else                 { $rootScope.score[1] += 1 }
		$http.post(server + '/api/markScore', {
			result: result,
			game  : $rootScope.game,
			point : $rootScope.point,
			score : $rootScope.score
		})
			.then(function(res) {
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
		// _sortBy not firing properly
		to = _.sortBy(to, 'handle')
	}

	var recordStat = function() {
		var data = {
			point : $rootScope.point,
			player: $scope.player,
			stat  : $scope.metric,
		}
		$http.post(server + '/api/markStat', data)
		$scope.player = ''
		$scope.metric = ''
	}

	var select = function(player) {
		if ($scope.player) { $scope.player = '' }
		else {
			$scope.player = player.id
			if ($scope.metric) { recordStat() }
		}
	}
	
	$scope.bonusStat = function(metric) {
		if ($scope.metric) { $scope.metric = '' }
		else {
			$scope.metric = metric
			if ($scope.player) { recordStat() }
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

	$scope.loadScoreSummary = function() {
		$state.go('game.scoreSummary')
		$http.post(server + '/api/callHistory', {game: $rootScope.game})
			.then(function(res) {
				$rootScope.gameSummary = res.data
				$rootScope.gameSummary.forEach(function(pointID) {
					$http.post(server + '/api/pointDetails', {point: pointID})
						.then(function(pointRes) {
							var index = $rootScope.gameSummary.indexOf(pointID)
							$rootScope.gameSummary[index] = pointRes.data
							console.log($rootScope.gameSummary)
							$rootScope.gameSummary.forEach(function(point) {
								point.line.forEach(function(playerID) {
									$http.post(server + '/api/playerDetails', 
										{player: playerID})
										.then(function(playerRes) {
											var index = point.line.indexOf(playerID)
											point.line[index] = playerRes.data
										})
								})
							})
							// {line, stats, result, score}
						})
				})
			})
	}

	// $scope.undo = function() {
	// 	stop something you just did
	// 	later, bro
	// }
}])