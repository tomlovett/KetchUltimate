var Player = require('../models/player.js')

// Abstractions
var loadFromDB = function(req, res, func) {
	Player.findById(req.body.playerID, function(err, player) {
		if (err)  res.send(err)
		else	  func(player)
	})
}

var saveToDB = function(req, res, player) {
	player.save(function(err, savedPlayer) {
		if (err)  res.send(err)
		else      res.send(200)
	})
}

// API functionality
var newPlayer = function(req, res) {
	var player = new Player({
		firstName : req.body.firstName,
		lastName  : req.body.lastName,
		handle    : req.body.handle,
		gender    : req.body.gender,
		email     : req.body.email || null,
	})
	player.save(function(err, storedPlayer) {
		res.send(storedPlayer)
	})
}

var editPlayer = function(req, res) {
	loadFromDB(req, res, function(player) {
		player[firstName] = req.body.firstName,
		player[lastName]  = req.body.lastName,
		player[handle]    = req.body.handle,
		player[gender]    = req.body.gender
		player[email]     = req.body.email || null,
		saveToDB(req, res, player)
	})
}

var loadPlayer = function(req, res) {
	loadFromDB(req, res, function(player) {
		res.send(player)
	})
}

module.exports = {
	newPlayer  : newPlayer,
	editPlayer : editPlayer,
	loadPlayer : loadPlayer
}