var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
	firstName   : String,
	lastName    : String,
	handle      : String,
	email       : String,
	teams       : Array, // array of team id's
	gameHistory : Array
})

module.exports = mongoose.model('player', playerSchema)