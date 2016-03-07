angular.module('Ketch').controller('gameController', ['$scope', '$http', 'utility', function($scope, $http, utility) {

	// Team.importTeam
	// a local player._id -> handle/representation

	$scope.subMode = true

	$scope.selected = ''
	$scope.metric   = ''

	$scope.score = function(result) {
		$scope.game.recordPoint(result)
		$scope.subMode = true
	}

	$scope.setLine = function() {
		$scope.subMode = false
		$scope.logOnField()
	}

	$scope.startPoint = function() {
		$scope.game.currentPoint.time = Date.now()
	}

	$scope.setAndStart = function() {
		$scope.setLine()
		$scope.startPoint()
	}

	$scope.logOnField = function() {
		$scope.team.m.field.forEach(function(player) {
			$scope.game.currentPoint.playersOn.push(player)
		})
		$scope.team.w.field.forEach(function(player) {
			$scope.game.currentPoint.playersOn.push(player)
		})
	}

	$scope.fire = function(index, from, to) {
		if ($scope.subMode) {
			sub(index, from, to)
		} else {
			select(index, from)
		}
	}

	var sub = function(index, from, to) {
		var player = from.splice(index, 1)
		to.push(player[0])
		$scope.team.sort()
	}

	var select = function(index, group) {
		if ($scope.selected) {
			$scope.selected = ''  // un-selects player
		} else {
			$scope.selected = group[index]
			if ($scope.metric) {
				recordStat($scope.selected, $scope.metric)
			}
		}
	}

	$scope.bonusStat = function(metric) {
		if ($scope.metric) {
			$scope.metric = ''
		} else {
			$scope.metric = metric
			if ($scope.selected) {
				recordStat($scope.selected, $scope.metric)
			}
		}
	}

	var recordStat = function(player, metric) {
		$scope.game.currentPoint.addMetric(player, metric)
		$scope.selected = ''
		$scope.metric   = ''
	}

	$scope.clearLine = function() {
		while ($scope.team.m.field.length > 0) {
			sub(0, $scope.team.m.field, $scope.team.m.bench)
		}
		while ($scope.team.w.field.length > 0) {
			sub(0, $scope.team.w.field, $scope.team.w.bench)
		}
	}
	
}])

angular.module('Ketch').factory('utility', ['$http'], function($http) {

	function Team(teamObj) {
		this.m = { bench: [], field: [] }
		this.w = { bench: [], field: [] }
	}

	Team.prototype = {
		constructor: Team,
		import: function(player) {
			if (player.gender == 'm') {
				this.m.bench.push(player)
			} else {
				this.w.bench.push(player)
			}
			this.sort()
		},
		importTeam: function(teamObj) {
			teamObj.roster.forEach(function(player){
				this.import(player)
			})
		}
		addToRoster: function(player) {
			$http.post('/api/addToRoster', player)
				.then(function(returnData) {
					this.import(player)
				})
		},
		sort: function() {
			this.men.bench   = _.sortBy(this.m.bench, 'handle')
			this.men.field   = _.sortBy(this.m.field, 'handle')
			this.women.bench = _.sortBy(this.w.bench, 'handle')
			this.women.field = _.sortBy(this.w.field, 'handle')
		},
	}

	function Point(pulling) {
		this.pulling   = pulling	// 1 or -1
		this.startTime = Date.now()
		this.time      = undefined // init in browser
		this.playersOn = []
		this.result    = undefined	// 1 or -1
		this.stats	   = []
	}

	Point.prototype = {
		constructor: Point,
		recordResult: function(result) {
			this.result = result
			this.time = Date.now() - this.time
		},
		addMetric: function(player, metric) {
			this.stats.push(new Metric(player, metric))
		}
	}

	function Metric(player, type) = {
		this.player = player
		this.type   = type
	}

	function Game() = {
		this.score = [0, 0]
		this.pointHistory = []
		this.currentPoint = Point(1)
	}

	Game.prototype = {
		constructor: Game,
		recordPoint: function(result) {
			this.updateScore(result)
			this.currentPoint.recordResult(result)
			this.currentPoint.score = this.score.slice()
			this.pointHistory.push(this.currentPoint)
			this.updatePlayerPoints(this.currentPoint)
			this.currentPoint = new Point(result)
		},
		updateScore = function(result) {
			if (result === 1)  { this.score[0] += 1 }
			else			   { this.score[1] += 1 }
		}
	}

	return {
		Team  : Team,
		Point : Point,
		Metric: Metric,
		Game  : Game,
	}

})