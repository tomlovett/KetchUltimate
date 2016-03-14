var mongoose = require('mongoose')

var playerSchema = mongoose.Schema({
	firstName: String,
	lastName : String,
	handle   : String,
	gender   : String,
	email    : String,
	password : String,
	friends  : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	ratings  :  {type: mongoose.Schema.ObjectId, ref: 'Rating'},
	answers  :  {type: mongoose.Schema.ObjectId, ref: 'Answer'},
	gameHistory: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	careerStats: {},
})

var teamSchema = mongoose.Schema({
	name       : String,
	roster     : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	captains   : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	friends    : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	gameHistory: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
	liveGame   :  {type: mongoose.Schema.ObjectId, ref: 'Game'}, 
	misc       : {},
})

var pointSchema = mongoose.Schema({
	playersOn : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	statistics: [{drop: [], throwaway: [], D: [], goldStar: []}],
	result    : Number,
})

var gameSchema = mongoose.Schema({
	team        :  {type: mongoose.Schema.ObjectId, ref: 'Player'},
	score       : [0, 0],
	roster      : [{type: mongoose.Schema.ObjectId, ref: 'Player'}],
	pointHistory: [{type: mongoose.Schema.ObjectId, ref: 'Point'}],
	livePoint   :  {type: mongoose.Schema.ObjectId, ref: 'Point'},
	misc        : {}, 
})

var ratingSchema = mongoose.Schema({
	playerID: {type: mongoose.Schema.ObjectId, ref: 'Player'},
	ratings : {},
})

var voteSchema = mongoose.Schema({
	playerID: {type: mongoose.Schema.ObjectId, ref: 'Player'},
	answers : {},
})

module.exports = {
	Player: mongoose.model('Player', playerSchema),
	Team  : mongoose.model('Team',   teamSchema),
	Game  : mongoose.model('Game',   gameSchema),
	Point : mongoose.model('Point',  pointSchema),
	Rating: mongoose.model('Rating', ratingSchema),
	Vote  : mongoose.model('Vote',   voteSchema),
}