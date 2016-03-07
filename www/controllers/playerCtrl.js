var Player = require('../models/player.js')

var newPlayer = function(req, res) {
	var player = new Player({
		firstName : req.body.firstName,
		lastName  : req.body.lastName,
		handle    : req.body.handle,
		email     : req.body.email || null,
		teams     : req.body.teams,
	})
	player.save(function(err, storedPlayer) {
		console.log('new player created: ', storedPlayer)
		res.send(storedPlayer._id)
	})
}

var editPlayer = function(req, res) {
	Player.findById(req.body.playerID, function(err, player) {
		if (err) {
			res.send(err)
		} else {
			player[firstName] = req.body.firstName,
			player[lastName]  = req.body.lastName,
			player[handle]    = req.body.handle,
			player[email]     = req.body.email || null,
			res.send(200)
		}
	})
}

var loadPlayers = function(req, res) {
	var playerDocs = {}
	req.body.players.forEach(function(playerID) {
		Player.findById(playerID, function(err, doc) {
			if (doc) {
				playerDocs[playerID] = doc
			}
		})
	})
	res.send(playerDocs)
}

module.exports = {
	newPlayer   : newPlayer,
	editPlayer  : editPlayer,
	loadPlayers : loadPlayers
}