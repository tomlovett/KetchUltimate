var mongoose = require('mongoose')

var answerSchema = mongoose.Schema({
	playerID: { type: String, unique: true },
	answers : { 
		type: Object,
		default: {}
	}
})

module.exports = mongoose.model('answers', answerSchema)

// answers = {
// 	'juhhwqondfsf': [0, 4, 23, 3],
// 	((subjectID)) : [0, 4, 23, 3]
// }