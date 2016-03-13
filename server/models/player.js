var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
	firstName: String,
	lastName : String,
	handle   : String,
	gender   : String,
	email    : String,
	password : String,
	friends  : { type: Array,  default: [] },
	ratings  : Object,
	answers  : Object
	// gameHistory : { type: Array,  default: [] },
	// pointHistory: { type: Array,  default: [] },
	// careerStats : { type: Object, default: {} },
})

/*
Player.email has to be unique. However, not every created Player has an email. Email defaults to "undefined" which means multiple Players would have the same email, which would lead to errors.
Thus, email is not required to be unique in the Player model. That is handled in playerCtrl.
*/

module.exports = mongoose.model('player', playerSchema)