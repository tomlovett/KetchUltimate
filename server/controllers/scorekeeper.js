var _      = require('underscore')
var Models = require('../models/models.js')
var	Game   = Models['Game'],
	Point  = Models['Point'],
	Team   = Models['Team'],
	Player = Models['Player']

var mod = {}

// Functionality
mod.newGame = function(req, res) {
	var game = new Game({team: req.body.team, opponent: req.body.opponent, score: [0, 0]})
	var stats = {drop: [], throwaway: [], D: [], goldStar: []} 
	var newPoint = new Point({stats: stats, score: [0, 0]})
	newPoint.save().then(function(pointDoc) {
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
	// could re-organize but don't want to risk breaking things
    Game.findById(req.body.game, function(err, gameDoc) {
		Point.findById(req.body.point, function(err, pointDoc) {
			pointDoc.result = req.body.result
			gameDoc.pointHistory.push(pointDoc)
			var stats = {drop: [], throwaway: [], D: [], goldStar: []} 
			var newPoint = new Point({stats: stats, score: req.body.score})
			gameDoc.livePoint = newPoint._id
			newPoint.save()
			gameDoc.score = req.body.score
			pointDoc.save(function(err, pointTwo) {
				gameDoc.save(function() {
					res.send({ point: gameDoc.livePoint })
				})
			})
    	})
	})
}

mod.markStat = function(req, res) {
    Point.findById(req.body.point, function(err, pointDoc) {
    	var stat = req.body.stat.toString()
		pointDoc.stats[stat].push(req.body.player)
    	console.log('point: ', pointDoc)
		pointDoc.save().then(res.send())
	})
}

mod.setLine = function(req, res) {
    Point.findById(req.body.point)
    	.then(function(pointDoc) {
    		pointDoc.line = req.body.line
    		pointDoc.save()
    			.then(function() { res.send() })
    	})
}

mod.closeGame = function(req, res) {
	// needs re-tooling
	// adding all players in to game.roster
	Game.findById(req.body.game, function(err, gameDoc) {
		gameDoc.save().then(function() {
			Team.findById(req.body.team, function(err, teamDoc) {
				teamDoc.gameHistory.push(gameDoc)
				teamDoc.liveGame = null
				teamDoc.save().then(function() { res.send() })
			})
		})
	})
}

mod.callHistory = function(req, res) {
	Game.findById(req.body.game, function(err, gameDoc) {
		res.send(gameDoc.pointHistory)
	})
}

mod.pointDetails = function(req, res) {
	Point.findById(req.body.point, function(err, pointDoc) {
		res.send(pointDoc)
	})
}

// mod.sendMisc = function(req, res) {
	// later functionality; storing game data like location, opponent, conditions
// }

module.exports = mod