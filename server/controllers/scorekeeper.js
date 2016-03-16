var Models = require('../models/models.js')
var _      = require('underscore')
var Game   = Models['Game'],
	Point  = Models['Point'],
	Team   = Models['Team'],
	Player = Models['Player']

var mod = {}

// Functionality
mod.newGame = function(req, res) {
	var game = new Game({team: req.body.team, score: [0, 0]})
	var point = new Point()
	point.save().then(function(pointDoc) {
		game.livePoint = pointDoc._id
		game.save(function(err, gameDoc) { 
			res.send({
				game: gameDoc._id,
				point: pointDoc._id,
			})
		})
	})
}

mod.markScore = function(req, res) {
    Game.findById(req.body.game, function(err, gameDoc) {
    	// gameDoc.score reverting to [0,0] every time
		Point.findById(req.body.point, function(err, pointDoc) {
			console.log('gameDoc.score: ', gameDoc.score)
			pointDoc.result = req.body.result
			gameDoc.roster = _.union(gameDoc.roster, pointDoc.playersOn)
			// union just appending
			gameDoc.pointHistory.push(pointDoc)
			var stats = {drop: [], throwaway: [], D: [], goldStar: []} 
			var newPoint = new Point({statistics: stats})
			gameDoc.livePoint = newPoint._id
			newPoint.save()
			console.log('gameDoc: ', gameDoc)
			console.log('pointDoc: ', pointDoc)
			pointDoc.save(function(err, pointTwo) {
				if (req.body.result == 1) { gameDoc.score[0] += 1 }
				else                      { gameDoc.score[1] += 1 }
				gameDoc.save(function() {
					console.log('gameDoc.score: ', gameDoc.score)
					res.send({
						score: gameDoc.score,
						point: gameDoc.livePoint,
					})
				})
			})
    	})
	})
}

mod.markStat = function(req, res) {
    Point.findById(req.body.point, function(err, pointDoc) {
    	// neither functioning nor throwing an error
    	var stat = req.body.stat
		pointDoc.statistics.stat.push(req.body.player)
		pointDoc.save().then(res.send(200))
	})
}

mod.setLine = function(req, res) {
    Point.findById(req.body.point)
    	.then(function(pointDoc) {
    		pointDoc.playersOn = req.body.line
    		pointDoc.save()
    			.then(function() { res.send() })
    	})
}

mod.closeGame = function(req, res) {
	// needs re-tooling
	var team = req.body.team
	team.gameHistory.push(team.liveGame)
	team.liveGame    = null
	team.save().then(function() { res.send(200) })
}

// mod.sendMisc = function(req, res) {
	// later functionality; storing game data like location, opponent, conditions
// }

module.exports = mod