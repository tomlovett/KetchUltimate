var mongoose = require('mongoose')

var teamSchema = mongoose.Schema({
	roster      : Array, // array of player id's
	gameHistory : Array,
	liveGame    : Object,
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