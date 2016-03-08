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
		else 		res.send(200)
	})
}

// API Functionality
var createTeam = function(req, res) {
	var team = new Team({
		name : req.body.name
	})
	team.save(function(err, savedTeam) {
		res.send(savedTeam._id)
	})
}

var loadTeam = function(req, res) {
	loadFromDB(req, res, function(team) {
		res.send(team)
	})
}

var addToRoster = function(req, res) {
	loadFromDB(req, res, function(team){
		team.roster.push(req.body.playerID)
		saveToDB(req, res, team)
	})	
}

var removeFromRoster = function(req, res) {
	loadFromDB(req, res, function(team) {
		var index = team.roster.indexOf(req.playerID)
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
	createTeam       : createTeam,
	loadTeam         : loadTeam,
	addToRoster      : addToRoster,
	removeFromRoster : removeFromRoster,
	makeCaptain      : makeCaptain
}