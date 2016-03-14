var Models = require('../models/model.js')
var Team   = Models['Team'],
	Player = Models['Player'],
	Rating = Models['Rating'],
	Answer = Models['Answer']

var mod = {}

mod.newPlayer = function() {
	// {first/last/handle/gender}
	// create & save Player
		// no rating/answer
	}
}

mod.newUser = function() {
	// {first/last/handle/gender/email/pass}
	// create Player with assigned password/email, Vote/Rating
	// return playerID
}

mod.newTeam = function() {

}

mod.userize = function() {
	// turns a created player into a full user
}

var attachRatingAnswer = function(playerObj) {
	// init's answer/rating on a user/obj
}

var merge = function() {
	// way future
	// combines data from locally created players into one Player in the database
}

// all below are adding a player to a specific collection of player ID's
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
	// add a player to user's friend list
	// userID, friendID
}

return mod