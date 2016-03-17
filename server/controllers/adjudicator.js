var Models = require('../models/models.js')
var	Rating = Models['Rating'],
	Ballot = Models['Ballot']

$scope.question = {
	prompt: 'How fast is Bobby?',
	6     : 'Usually the fastest person on the field.'
	4     : 'Of average speed.'
	2     : 'Bobby follows a cardio-free lifestyle.'
}

// var Questions = '' // require('./something') <-- JSON file

// var mod = {}

// var question {
// 	id : Number,
// 	prompt: 'string',
// 	two   : 'string',
// 	four  : 'string',
// 	six   : 'string',
// }

// // length = x.length
// // index1 = Math.random() * length

// // master list??

// mod.randomSubject = function(req, res) {
// 	// req.user.friends -> random pick, res.send
// }

// var genIndex = function(req, res) {
// 	var index1 = Math.random * Questions[reqsection]length
// 	var index2 = Math.random * Questions[section]length
// 	return [index1, index2]
// }

// var checkAnswered = function(user, player, section, index) {
// 	return 'user.answers[player][section][index]'
// 	Ballot.findById(user, function(ballotDoc) {
// 		console.log('ballotDoc[player][section][index]: ', ballotDoc[player][section][index])
// 		if (ballotDoc[player][section][index]) { return false }
// 		else                                   { return true  } 
// 	}
// }

// var callQuest = function(req, res) {

// }

// var tryAgain = function(req, res, count) {
// 	if (count == 2) { res.send('error, brah') }
// 	var x = 'call again'
// 	if (x)  return x
// 	else    tryAgain(req, res, count+1)
// }

// mod.recordVote = function(req, res) {
// 	Rating.findById(req.body.subject, function(err, ratingDoc) {
// 		ratingDoc.ratings[req.body.questNum].push(req.body.answer)
// 		rating.save().then(function() {
// 			Ballot.findById(req.body.user, function(err, ballotDoc) {
// 				ballotDoc.answers[req.body.questNum] = true
// 				res.send() 
// 			})
// 		})
// 	})
// }

// pull question
	// {type, person}
	// not previously answered

module.exports = mod