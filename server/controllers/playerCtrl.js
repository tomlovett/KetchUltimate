var Player = require('../models/player.js')
var Ratings = require('../models/ratings.js')
var Answers = require('../models/answers.js')

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
		else      res.send(savedPlayer)
	})
}

var ratingsAnswers = function(req, res, player) {
	console.log('ratingsAnswers fired')
	var ratings = new Ratings({ playerID : player._id })
	ratings.save(function(err, storedRatings) {
		var answers = new Answers({ playerID : player._id })
		answers.save(function(err, storedAnswers) {
			res.send(player)				
		})
	})
}

// API functionality
var createPlayer = function(req, res) {
	var player = new Player({
		firstName : req.body.firstName,
		lastName  : req.body.lastName,
		handle    : req.body.handle || req.body.firstName,
		gender    : req.body.gender,
	})
	if (req.body.email) { player.email = req.body.email }
	console.log('player: ', player)
	player.save(function(err, storedPlayer) {
		console.log('error: ', err)
		console.log('player saved: ', storedPlayer)
		res.send(storedPlayer)
	})
}

var attachEmail = function(req, res) {
	loadFromDB(req, res, function(player) {
		player.email = req.body.email
		ratingsAnswers(req, res, player)
	})
}

var updatePlayer = function(req, res) {
	loadFromDB(req, res, function(player) {
		player[firstName] = req.body.firstName,
		player[lastName]  = req.body.lastName,
		player[handle]    = req.body.handle || req.body.firstName,
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
	createPlayer: createPlayer,
	updatePlayer: updatePlayer,
	attachEmail : attachEmail,
	loadPlayer  : loadPlayer
}