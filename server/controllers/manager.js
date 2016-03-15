var Models = require('../models/models.js')
var Team   = Models['Team'],
	Player = Models['Player'],
	Rating = Models['Rating'],
	Answer = Models['Answer']

var mod = {}

// req.session.user?, req.session.team, req.session.players
// {id: '', handle: '', gender: ''}

// Sign in, Create User
mod.newPlayer = function(req, res) {
	var data = req.body
	var player = new Player({
		firstName: data.firstName,
		lastName : data.lastName,
		handle   : data.handle,
		gender   : data.gender,
	})
	player.save().exec(function(playerDoc) {
		res.send(playerDoc)
	})
}

mod.newUser = function(req, res) {
	var data = req.body
	var player = new Player({
		firstName: data.firstName,
		lastName : data.lastName,
		handle   : data.handle,
		gender   : data.gender,
		email    : data.email,
		password : data.password,
	})
	player.save().then(function(playerDoc) {
		res.send(playerDoc)
	})
}

mod.newTeam = function(req, res) {
	var data = req.body
	var team = new Team({
		name: data.name,
	})
	team.save().then(function(teamDoc) {
		console.log(req.session)
		if (!req.sessions.teams) { req.session.teams = [teamDoc._id]   }
		else  		             { req.session.teams.push(teamDoc._id) }
		req.session.team = teamDoc._id
		console.log('gonna send')
		res.send(200)
	})
}

mod.intoRoster = function(req, res) {
	var data = req.body
	var team = Team.findById(data.team).then(function(teamDoc) {
		teamDoc.roster.push(data.player)
		team.save().then(function() { res.send(200) })
	})	
}

mod.pushTeamColl = function(req, res) {
	var data = req.body
	Team.findById(data.team).then(function(teamDoc) {
		teamDoc[data.coll].push(data.player)
		teamDoc.save().then(function() { res.send(200) })
	})	
}

mod.popTeamColl = function(req, res) {
	var data = req.body
	var team = Team.findById(data.team).then(function(teamDoc) {
		var index = team.coll.indexOf(data.player)
		team.coll.splice(index, 1)
		team.save().then(function() { res.send(200) })
	})
}

mod.playersTeams = function(req, res) {
	Team.find({roster: {$in: req.body.player}}).then(function(teamDocs) {
		console.log('teamDocs: ', teamDocs)
		res.send(teamDocs) // team id's
	})
}

mod.rawRoster = function(req, res) {
	Team.findById(req.body.team).then(function(teamDoc) {
		res.send(teamDoc.roster)
	})
}

mod.playerDetails = function(req, res) {
	Player.findById(req.body.player).then(function(playerDoc) {
		res.send({
			id    : playerDoc._id,
			handle: playerDoc.handle,
			gender: playerDoc.gender,
		})
	})
}

mod.fullPlayer = function(req, res) {
	Player.findById(req.body.player).then(function(playerDoc) {
		res.send(playerDoc)
	})
}

mod.updatePlayer = function(req, res) {
	var player = req.body
	Player.update({_id: player.ID}, player).then(function(playerDoc) {
		res.send({
			id    : playerDoc._id,
			handle: playerDoc.handle,
			gender: playerDoc.gender,
		})
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