var Models = require('../models/models.js')
var Team   = Models['Team'],
	Player = Models['Player'],
	Rating = Models['Rating'],
	Answer = Models['Answer']

var mod = {}

// req.session.user?, req.session.team, req.session.players
// {id: '', handle: '', gender: ''}

// Sign in, Create User

var toShallow = function(playerDoc) {
	return {
		id    : playerDoc._id,
		handle: playerDoc.handle,
		gender: playerDob.gender,
	}
}

mod.newPlayer = function(req, res) {
	var data = req.body
	var player = new Player({
		firstName: data.firstName,
		lastName : data.lastName,
		handle   : data.handle,
		gender   : data.gender,
	})
	player.save().exec(function(playerDoc) {
		res.send(toShallow(playerDoc))
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
	req.session.user = player._id
	player.save().then(function(playerDoc) {
		res.send(toShallow(playerDoc))
	})
}

mod.newTeam = function(req, res) {
	var data = req.body
	var team = new Team({
		name: data.name,
	})
	team.save().then(function(teamDoc) {
		res.send({id: teamDoc._id, name: teamDoc.name})
	})
}

mod.intoRoster = function(req, res) {
	var data = req.body
	var team = Team.findById(data.team).then(function(teamDoc) {
		teamDoc.roster.push(data.player)
		team.save().then(function() { 
			res.send({id: teamDoc._id, name: teamDoc.name})
			})
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
		// not sure if this will work, not great with DB's
	})
}

mod.rawRoster = function(req, res) {
	Team.findById(req.body.team).then(function(teamDoc) {
		res.send(teamDoc.roster)
	})
}

mod.playerDetails = function(req, res) {
	Player.findById(req.body.player).then(function(playerDoc) {
		res.send(toShallow(playerDoc))
	})
}

mod.fullPlayer = function(req, res) {
	Player.findById(req.body.player).then(function(playerDoc) {
		playerDoc.password = ''
		res.send(playerDoc)
	})
}

mod.updatePlayer = function(req, res) {
	var player = req.body
	Player.update({_id: player.ID}, player).then(function(playerDoc) {
		res.send(toShallow(playerDoc))
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