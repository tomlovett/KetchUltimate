var mongoose = require('mongoose')

var teamSchema = mongoose.Schema({
	name        : String,
	roster      : Array, // array of player id's
	captains    : Array,
	gameHistory : { type: Array, default: [] }
	liveGame    : Object
	// misc : Object,
})

module.exports = mongoose.model('team', teamSchema)

/*
misc = {
	teamType : club/hat/college/tournament
	averageAge : 
	ageVariation :
	location :
	colorOne : #000000
	colorTwo : #ffffff
}
*/