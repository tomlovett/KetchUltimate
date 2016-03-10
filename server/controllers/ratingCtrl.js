var Ratings = require('../models/ratings.js')
var Answers = require('../models/answers.js')
// var questionsObj = require('../questions.json')
// JSON parse
// Abstractions
var loadRatings = function(req, res, func) {
	Ratings.findOne({ playerID: req.body.subjectID }, function(err, doc) {
		if (err)  res.send(err)
		else	  func(doc[req.body.questionNum])
	})
}

var loadAnswers = function(req, res, func) {
	Answers.findOne({ playerID: req.body.judgeID }, function(err, doc) {
		if (err)  res.send(err)
		else	  func(doc[req.body.questionNum])
	})
}

var updateAvg = function(avg, scores, newRating) {
	avg = ((avg * scores.length) + rating) / (scores.length + 1)
	return avg
}

// API functionality
var loadQuestions = function(req, res) {
	// receives two player ID's

	'butts'
}

var recordRating = function(req, res) {
	loadRatings(req, res, function(doc) {
		doc[avg] = updateAvg(doc[avg], doc[scores], req.body.rating)
		doc[scores].push(req.body.newRating)
		res.send(200)
	})
}

var recordAnswer = function(req, res) {
	loadAnswers(req, res, function(doc) {
		doc[req.body.questionNum] = true
		res.send(200)
	})
}

module.exports = {
	loadQuestions: loadQuestions,
	recordRating : recordRating,
	recordAnswer : recordAnswer
}

// passed: judgeID, subjectID, questionNum, rating

// saving
// this is so ugly!!!!

// loadQuestions
	// send 2 random from their teammates
	// (random() * questions.style.length)
	// check not in user.answers
	// send down