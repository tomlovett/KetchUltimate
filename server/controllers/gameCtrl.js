var Models = require('../models/models.js')
var _      = require('underscore')
var Game   = Models['Game'],
	Point  = Models['Point'],
	Team   = Models['Team'],
	Player = Models['Player']

var mod = {}

// every request sent in needs to access these objects, so I'm abstracting them to cut down on code/clutter
// var team  = req.session.team  || null,
// 	game  = req.session.game  || null,
// 	point = req.session.point || null,
//     data  = req.body.data

console.log('game controller')

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
	if (!game || game._id !== data.game) {
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
	res.send(loadRoster(team))
}

// useful for multiple modules
var loadRoster = function(team) {
	var roster = []
	// team.roster.forEach(function(player) {
	// 	roster.push(Player.findById(player).exec(processPlayer))
	// })
	return roster // async issues? almost surely
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
	point.stats[data.stat].push(data.player)
	point.save().then(function() { res.send(200) })
}

mod.setLine = function(req, res) {
	var point = req.session.point
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

console.log('mod: ', mod)

module.exports = mod