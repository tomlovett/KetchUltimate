angular.module('Ketch')
.controller('gameController', ['$scope', '$http',function($scope, $http) {

	var server = 'http://localhost:3000'

	$scope.subMode = true

	$scope.bench = []
	$scope.field = []
	$scope.score = [0, 0]

	$scope.ordered = ['-gender'] 

	var data = {
		game  : '', 	// gameID
		team  : '', 	// teamID
		point : '',  	// pointID
		result: 0,		// 1 or -1
		player: '', 	// playerID
		stat  : '', 	// type
		line  : [],
	}
	var roster = [
		{
			id    : 'playerID',
			handle: 'handle',
			gender: 'gender',
		},
	] // loadPlayers

	$scope.score = function(result) {
		$scope.subMode = true
		data['result'] = result
		$http.post(server + '/api/markScore', data).then(function(res) {
			$scope.score = res.data.score
		})
	}

	$scope.doneSubs = function() {
		$scope.subMode = false
		data.line = []
		$scope.field.forEach(function(playerObj) { 
			data.line.push(playerObj.id)
		})
		$http.post(server + '/api/setLine', data)
	}

	$scope.fire = function(index, from, to) {
		if ($scope.subMode) { sub(index, from, to) }
		else 	            { select(player)  }
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