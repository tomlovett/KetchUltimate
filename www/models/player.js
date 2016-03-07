var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
	firstName   : String,
	lastName    : String,
	handle      : String,
	gender      : String,
	email       : { type: String, default: null },
	teams       : { type: Array, default: [] }, // array of team id's
	gameHistory : { type: Array, default: [] },
	pointHistory: { type: Array, default: [] },
})

module.exports = mongoose.model('player', playerSchema)