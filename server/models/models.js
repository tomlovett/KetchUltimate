var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
	firstName: String,
	lastName : String,
	handle   : String,
	gender   : String,
	email    : String,
	password : String,
	// friends  : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	ratings  :  {type: mongoose.Schema.ObjectId, ref: 'Rating'},
	answers  :  {type: mongoose.Schema.ObjectId, ref: 'Answer'},
	gameHistory: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	careerStats: {},
})

var teamSchema = mongoose.Schema({
	name       : String,
	roster     : [{type: mongoose.Schema.ObjectId, ref: 'Player', default: []}],
	captains   : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	friends    : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	gameHistory: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	liveGame   :  {type: mongoose.Schema.ObjectId, ref: 'Game'}, 
	misc       : {},
})

var pointSchema = mongoose.Schema({
	line  : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	stats : {type: Object, default: {drop: [], throwaway: [], D: [], goldStar: []} } ,
	result: Number,
	score : Array,
})

var gameSchema = mongoose.Schema({
	team        : {type: mongoose.Schema.ObjectId, ref: 'Team'},
	opponent	: String,
	score       : Array,
	roster      : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	pointHistory: [{type: mongoose.Schema.ObjectId, ref: 'Point'}],
	livePoint   :  {type: mongoose.Schema.ObjectId, ref: 'Point'},
	misc        : {}, 
})

var ratingSchema = mongoose.Schema({ // ratings of player by others
	playerID: {type: mongoose.Schema.ObjectId, ref: 'Player'},
	ratings : {},
})

var ballotSchema = mongoose.Schema({ // votes cast by player
	playerID: {type: mongoose.Schema.ObjectId, ref: 'Player'},
	answers : {}, // type -> num -> val
})

module.exports = {
	Player: mongoose.model('Player', playerSchema),
	Team  : mongoose.model('Team',   teamSchema),
	Game  : mongoose.model('Game',   gameSchema),
	Point : mongoose.model('Point',  pointSchema),
	Rating: mongoose.model('Rating', ratingSchema),
	Ballot: mongoose.model('Ballot', ballotSchema),
}