var Team   = require('../models/team.js')

// abstracting Team.findById

var createTeam = function(req, res) {
	var team = new Team({
		name : req.body.name
	})
	Team.save(function(err, storedTeam) {
		if (err) {
			res.send(err)
		} else {
			console.log('team saved!')
			res.send(storedTeam._id)
		}
	})
}

var loadTeam = function(req, res) {
	Team.findById(req.body.teamID, function(err, team) {
		if (err) {
			res.send(err)
		} else {
			res.send(team)
		}
	})
}

// making a multi-add function?
var addToRoster = function(req, res) {
	Team.findById(req.body.teamID, function(err, team) {
		if (err) {
			res.send(err)
		} else {
			team.roster.push(req.body.playerID)
			res.send(200)
		}
	})
}

var removeFromRoster = function(req, res) {
	Team.findById(req.body.teamID, function(err, team) {
		if (err) { 
			res.send(err)
		} else {
			var index = team.roster.indexOf(req.playerID)
			team.roster.splice(index, 1)
			res.send(200)
		}
	})
}

var makeCaptain = function(req, res) {
	Team.findById(req.body.teamID, function(err, team) {
		if (err) {
			res.send(err)
		} else {
			team.captains.push(req.body.playerID)
		}
	})
}

module.exports = {
	createTeam       : createTeam,
	loadTeam         : loadTeam,
	addToRoster      : addToRoster,
	removeFromRoster : removeFromRoster,
	makeCaptain      : makeCaptain
}