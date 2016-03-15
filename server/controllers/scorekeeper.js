var Models = require('../models/models.js')
var _      = require('underscore')
var Game   = Models['Game'],
	Point  = Models['Point'],
	Team   = Models['Team'],
	Player = Models['Player']

var mod = {}

// Middleware
mod.callTeam = function(req, res, next) {
	var data  = req.body.data
	if (!req.session.team || req.session.team._id !== data.team) {
		Team.findById(team, function(teamDoc) {
			req.session.team = teamDoc
			next()
		})
	} else { next()	}
}

mod.callGame = function(req, res, next) {
    var data  = req.body.data
	if (!req.session.game || req.sessiob.game._id !== data.game) {
		Game.findById(game, function(gameDoc) {
			req.session.game = gameDoc
			next()
		})
	} else { next() }
}

// Functionality
mod.newGame = function(req, res) {
    var data  = req.body.data
	var game = new Game({team: data.team})
	game.save()
	req.session.game = game
	res.send(loadRoster(team))
}

// useful for multiple modules
var loadRoster = function(team) {
	var roster = []
	var index = 0
	while (index < team.roster.length) {
		Player.findById(team.roster[index])
			.then(function(playerDoc) {
				roster.push(processPlayer(playerDoc))
				index += 1
			})
	} // chained function to avoid async issues
	return roster
}

var processPlayer = function(playerObj) {
	return {
		id    : playerObj._id,
		handle: playerObj.handle,
		gender: playerObj.gender,
	}
}

mod.markScore = function(req, res) {
	var game  = req.session.game
	var point = req.session.point
    var data  = req.body.data
	if (data.result == 1) { game.score[0] += 1 }
	else                  { game.score[1] += 1 }
	point.result = data.result
	point.save()
	game.roster = _.union(game.roster, point.playersOn)
	game.pointHistory.push(point)
	req.session.point = new Point()
	game.save().then(function() { res.send(game.score)	})
}

mod.markStat = function(req, res) {
	var point = req.session.point
    var data  = req.body.data
	point.stats[data.stat].push(data.player)
	point.save().then(function() { res.send(200) })
}

mod.setLine = function(req, res) {
	var point = req.session.point
    var data  = req.body.data
	point.playersOn = data.line
	point.save().then(function() { res.send(200) })
}

mod.closeGame = function(req, res) {
	var team = req.body.team
	team.gameHistory.push(team.liveGame)
	team.liveGame    = null
	req.session.game = null
	team.save().then(function() { res.send(200) })
}

// mod.sendMisc = function(req, res) {
// 	'burp'
// 	// later functionality; storing game data like location, opponent, conditions
// }

module.exports = mod