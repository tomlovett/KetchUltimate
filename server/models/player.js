var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
	firstName   : String,
	lastName    : String,
	handle      : String,
	gender      : String,
	email       : { type: String, unique: true, default: '' },
	password    : String,
	teams       : { type: Array,  default: [] }, // array of team id's
	// gameHistory : { type: Array,  default: [] },
	// pointHistory: { type: Array,  default: [] },
	// careerStats : { type: Object, default: {} },
})

module.exports = mongoose.model('player', playerSchema)