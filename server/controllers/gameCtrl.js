var Models = require('../models/model.js')
var _      = require('underscore')
var Game   = Models['Game'],
	Point  = Models['Point'],
	Team   = Models['Team'],
	Player = Models['Player'],

var mod = {}

// every request sent in needs to access these objects, so I'm abstracting them to cut down on code/clutter
var team  = req.session.team  || null,
	game  = req.session.game  || null,
	point = req.session.point || null,
    data  = req.body.data

// Middleware
mod.callTeam = function(req, res, next) {
	if (!team || team._id !== data.team) {
		Team.findById(team, function(teamDoc) {
			req.session.team = teamDoc
			next()
		})
	} else { next()	}
}

mod.callGame = function(req, res, next) {
	// data does not have a game when it initially calls to create a game
	if (data.game && (!game || game._id !== data.game)) {
		Game.findById(game, function(gameDoc) {
			req.session.game = gameDoc
			next()
		})
	} else { next() }
}

// Functionality
mod.newGame = function(data) {
	var game = new Game({team: data.team})
	game.save()
	req.session.game = game
	var roster = whereMyKillaTeamAt(team)
	res.send(roster)
}

// useful for multiple modules
var whereMyKillaTeamAt = function(team) {
	var roster = []
	team.roster.forEach(function(player) {
		roster.push(Player.findById(player).exec(processPlayer))
	})
	return roster // async issues? almost surely
}

var processPlayer = function(playerObj) {
	return {
		id    : playerObj._id,
		handle: playerObj.handle,
		gender: playerObj.gender,
	}
}

mod.closeGame = function(req, res) {
	team.gameHistory.push(team.liveGame)
	team.liveGame = null
	team.save().then(function() { res.send(200) })
}

mod.markScore = function(req, res) {
	if (data.result == 1) { game.score[0] += 1 }
	else                   { game.score[1] += 1 }
	point.result = data.result
	point.save()
	game.roster = _.union(game.roster, point.playersOn)
	// point.playersOn.forEach(function(player) {
	// 	if (!(player in game.roster)) { game.roster.push(player) }
	// })
	game.pointHistory.push(point)
	req.session.point = new Point()
	game.save().then(function() { res.send(game.score)	})

mod.markStat = function(req, res) {
	point.stats[data.stat].push(data.player)
	point.save().then(function() { res.send(200) })
}

mod.sendMisc = function(req, res) {
	// later functionality; storing game data like location, opponent, conditions
}

return mod