var Team   = require('../models/team.js')

// Abstractions
var loadFromDB = function(req, res, func) {
	Team.findById(req.body.teamID, function(err, team) {
		if (err) res.send(err)
		else 	 func(team)
	})
}

var saveToDB = function(req, res, team) {
	team.save(function(err, savedTeam) {
		if (err)  	res.send(err)
		else 		res.send(savedTeam)
	})
}

// API Functionality
var createTeam = function(req, res) {
	console.log('createTeam -> req.body: ', req.body)
	var team = new Team({
		name : req.body.name
	})
	saveToDB(req, res, team)
}

var loadTeam = function(req, res) {
	loadFromDB(req, res, function(team) {
		res.send(team)
	})
}

var playersTeams = function(req, res) {
	Team.find({roster: {$in: [req.body] } }, function(foundTeams) {
		console.log('foundTeams: ', foundTeams)
		res.send(foundTeams)
	})
}

var addToRoster = function(req, res) {
	loadFromDB(req, res, function(team){
		// doesn't add teams to that player
		team.roster.push(req.body.playerID)
		saveToDB(req, res, team)
	})	
}

var dropPlayer = function(req, res) {
	loadFromDB(req, res, function(team) {
		var index = team.roster.indexOf(req.player._id)
		team.roster.splice(index, 1)
		saveToDB(req, res, team)
	})
}

var makeCaptain = function(req, res) {
	team = loadFromDB(req, res, function(team) {
		team.captains.push(req.body.playerID)
		saveToDB(req, res, team)
	})
}

module.exports = {
	createTeam  : createTeam,
	loadTeam    : loadTeam,
	playersTeams: playersTeams,
	addToRoster : addToRoster,
	dropPlayer  : dropPlayer, // cutting down the name, looks weird
	makeCaptain : makeCaptain
}