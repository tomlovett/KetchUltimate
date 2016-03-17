var Models = require('../models/models.js')
var Team   = Models['Team'],
	Player = Models['Player'],
	Rating = Models['Rating'],
	Answer = Models['Answer']

var mod = {}

var basicPlayer = function(playerDoc) {
	return {
		id    : playerDoc._id,
		handle: playerDoc.handle,
		gender: playerDoc.gender,
	}
}

var basicTeam = function(teamDoc) {
	return {
		id    : teamDoc._id,
		name  : teamDoc.name,
		roster: teamDoc.roster,
	}
}

mod.newPlayer = function(req, res) {
	var data = req.body
	var player = new Player({
		firstName: data.firstName,
		lastName : data.lastName,
		handle   : data.handle || data.firstName,
		gender   : data.gender,
	})
	player.save(function(err, playerDoc) {
		res.send(basicPlayer(playerDoc))
	})
}

mod.newUser = function(req, res) {
	var data = req.body
	var player = new Player({
		firstName: data.firstName,
		lastName : data.lastName,
		handle   : data.handle || data.firstName,
		gender   : data.gender,
		email    : data.email,
		password : data.password,
	})
	player.save(function(err, playerDoc) {
		res.send(basicPlayer(playerDoc))
	})
}

mod.newTeam = function(req, res) {
	var team = new Team({
		name: req.body.name,
	})
	team.save().then(function(teamDoc) {
		res.send(basicTeam(teamDoc))
	})
}

mod.intoRoster = function(req, res) {
	Team.findById(req.body.team).then(function(teamDoc) {
		teamDoc.roster.push(req.body.player.id)
		teamDoc.save().then(function() { res.send(basicTeam(teamDoc)) })
	})	
}

mod.pushTeamColl = function(req, res) {
	Team.findById(req.body.team).then(function(teamDoc) {
		teamDoc[req.body.coll].push(req.body.player)
		teamDoc.save().then(function(teamDocTwo) { 
			res.send(basicTeam(teamDocTwo))
		})
	})	
}

mod.popTeamColl = function(req, res) {
	Team.findById(req.body.team).then(function(teamDoc) {
		var index = teamDoc.coll.indexOf(req.body.player)
		teamDoc.coll.splice(index, 1)
		teamDoc.save().then(function(teamDocTwo) { 
			res.send(basicTeam(teamDocTwo))
		})
	})
}

mod.playersTeams = function(req, res) {
	Team.find({roster: {$in: req.body.player}}).then(function(teamDocs) {
		console.log('teamDocs: ', teamDocs)
		res.send(teamDocs) // team id's
		// not sure if this will work, not great with DB's
	})
}

mod.rawRoster = function(req, res) {
	Team.findById(req.body.team).then(function(teamDoc) {
		console.log('teamDoc: ', teamDoc)
		res.send(teamDoc.roster)
	})
}

mod.deepRoster = function(req, res) {
	var deep = []
	Team.findById(req.body.team)
		.exec(function(err, teamDoc) {
			teamDoc.roster.forEach(function(playerID) {
				Player.findById(playerID)
					.then(function(playerDoc) {
						deep.push(basicPlayer(playerDoc))
						if (teamDoc.roster.indexOf(playerID) == teamDoc.roster.length-1 ) { res.send(deep) }
				})
			})
		})
}

mod.playerDetails = function(req, res) {
	Player.findById(req.body.player).then(function(playerDoc) {
		res.send(basicPlayer(playerDoc))
	})
}

mod.fullPlayer = function(req, res) {
	Player.findById(req.body.player).then(function(playerDoc) {
		if (playerDoc.password)    { delete playerDoc.password }
		res.send(playerDoc)
	})
}

mod.updatePlayer = function(req, res) {
	var player = req.body
	Player.update({_id: player.ID}, player).then(function(playerDoc) {
		res.send(basicPlayer(playerDoc))
	})
}

// future stuff to do
// var attachRatingAnswer = function(playerObj) {
// 	// new rating/vote models: {playerID: playerID}
// }

// var merge = function() {
// 	// in the way, way future
// 	// combines data from locally created players into one Player in the database
// }

module.exports = mod