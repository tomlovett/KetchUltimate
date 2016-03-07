angular.module('Ketch').controller('gameController', ['$scope', '$http', 'utility', function($scope, $http, utility) {

	$scope.team = 
	
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
		},
		importTeam: function(teamObj) {
			teamObj.roster.forEach(function(player){
				this.import(player)
			})
			this.sort()

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
		this.totalTime = undefined
		this.playersOn = []
		this.result    = undefined	// 1 or -1
		this.stats	   = []
	}

	Point.prototype = {
		constructor: Point,
		recordResult: function(result) {
			this.result = result
			this.totalTime = Date.now() - this.totalTime
		}
	}

	function Game() {
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
		Team : Team,
		Point : Point,
		Game : Game
	}

})