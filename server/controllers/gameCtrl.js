var Models = require('../models/model.js')
var Game   = Models['Game']
	Team   = Models['Team'],
	Player = Models['Player']

var newGame = function() {
	// {team : [id], }
	// teamID
	}
}

var closeGame = function() {
	// {game: gameObj}
	// liveGame to team.gameHistory, liveGame = {}
	// res.send('all good! data received')
	// heavy data lifting after response sent
}
//
var markScore = function() {
	// {game: gameObj/ID, point: pointObj/ID}
	// res.send('received') before handling back-end data with recordPoint
	// res.send([new Point])
}

var markStat = function () {
	// {point: pointObj/ID, stat: 'type', player: playerID}
	// add to game.livePoint
}

var recordPoint = function () {
	// {game: gameObj/ID, }
	// set point.result; push point to gameHistory
	// point.playersOn.foreach(if not in Game.roster: add)
}

var sendMisc = function () {
	'later functionality; storing game data like location, opponent, conditions'
}

// don't worry so much about errors