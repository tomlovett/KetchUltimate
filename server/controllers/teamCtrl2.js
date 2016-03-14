var Models = require('../models/model.js')
var Team   = Models['Team'],
	Player = Models['Player'],
	Rating = Models['Rating'],
	Answer = Models['Answer']

var mod = {}

var passSaved = function(product) {
	res.send(product)
} // will this work? will this function understand res?

mod.newPlayer = function() {
	// {first/last/handle/gender}
	// create & save Player
		// no rating/answer
}

mod.newUser = function() {
	// {first/last/handle/gender/email/pass}
	// create Player with assigned password/email, Vote/Rating
	// return playerID
}

mod.newTeam = function() {
	// {name: 'name'}
	// create team, save, pass
}

mod.userize = function() {
	// {email : email, password: password}
	// turns a created player into a full user
}

var attachRatingAnswer = function(playerObj) {
	// new rating/vote models: {playerID: playerID}
}

var merge = function() {
	// in the way, way future
	// combines data from locally created players into one Player in the database
}

mod.pushColl = function () {
	// {team: teamID, coll: collection, player: playerID }
	// add a player to a specifc collection: (captains, friends, roster)
	// team.coll.push(playerID)
}

mod.popColl = function() {
	// {team: teamID, coll: collection, player: playerID }
	// remove a player from a collection: (captains, friends, roster)
	// var index = team.coll.indexOf(player)
	// team.coll.splice(index, 0)

mod.userFriend = function() {
	// {player: playerID, friend: playerID }
	// add a player to user's friend list
}

// save: passSaved = function(err, savedData) { res.send(savedData) }

return mod