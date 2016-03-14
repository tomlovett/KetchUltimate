var Models = require('../models/model.js')
var Team   = Models['Team'],
	Player = Models['Player'],
	Rating = Models['Rating'],
	Answer = Models['Answer']

var mod = {}

// req.session.user?, req.session.team, req.session.players
// {id: '', handle: '', gender: ''}

//Sign in, Create User
mod.newPlayer = function(req, res) {
	var data = req.body.data
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
	var data = req.body.data
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
	var data = req.body.data
	var team = new Team({
		name: data.name,
	})
	team.save().then(function(teamDoc) {
		req.session.teams.push(teamDoc._id)
		req.session.team = teamDoc
		res.send(200)
	})
}

mod.intoRoster = function(req, res) {
	var data = req.body.data
	var team = Team.findById(data.team).then(function(teamDoc) {
		teamDoc.roster.push(data.player)
		team.save.then(function() { res.send(200) })
	})	
}

mod.pushTeamColl = function(req, res) {
	var data = req.body.data
	var team = Team.findById(data.team).then(function(teamDoc) {
		teamDoc[data.coll].push(data.player)
		team.save.then(function() { res.send(200) })
	})	
}

mod.popTeamColl = function(req, res) {
	var data = req.body.data
	var team = Team.findById(data.team).then(function(teamDoc) {
		var index = team.coll.indexOf(data.player)
		team.coll.splice(index, 1)
		team.save.then(function() { res.send(200) })
	})

// future stuff to do
// var attachRatingAnswer = function(playerObj) {
// 	// new rating/vote models: {playerID: playerID}
// }

// var merge = function() {
// 	// in the way, way future
// 	// combines data from locally created players into one Player in the database
// }

// save: passSaved = function(err, savedData) { res.send(savedData) }

module.exports = mod