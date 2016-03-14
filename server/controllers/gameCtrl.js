var Models = require('../models/model.js')
var Game   = Models['Game'],
	Point  = Models['Point'],
	Team   = Models['Team'],
	Player = Models['Player'],

var passData = function(product) {
	res.send(product)
}

var mod = {}

mod.newGame = function(data) {
	// {teamID : teamID}
	// mod.game = new Game({team: data.teamID})
	// pass team! team.liveGame with new Point
}

mod.closeGame = function(data) {
	// {game: gameObj, teamID?}
	// liveGame to team.gameHistory, liveGame = {}
	// data manipulation
	// res.send('all good! data received')
}
//
mod.markScore = function(data) {
	// {game: gameObj/ID, point: pointObj}
	// data.game.pointHistory.push(data.point)
	// data.game.save().send
	// res.send(new Point()) before handling back-end data with recordPoint
}

mod.markStat = function(data) {
	// {pointObj: pointObj, stat: 'type', player: playerID}
	// point.statistics.stat.push(playerID)
	// add to game.livePoint
}

mod.recordPoint = function(data) {
	// {game: gameID, pointObj: pointObj}
	// set point.result; push point to gameHistory
	// point.playersOn.foreach(if not in Game.roster: add)
}

mod.sendMisc = function(data) {
	// later functionality; storing game data like location, opponent, conditions
}