var mongoose = require('mongoose')

var ratingSchema = mongoose.Schema({
	playerID: { type: String, unique: true },
	ratings : {
		type: Object,
		default: {}
	}
})

module.exports = mongoose.model('ratings', ratingSchema)

// have to account for asynchronous request for ratings & answers

// ratings = {
//  	playerID : 'isaindoinas' <- players collection ID
// 		questionNum : { 
// 			avg    : 5,
// 			scores : [4,6,5]
// 		},
// 		11 : { 
// 			avg    : 4,
// 			scores : [2,4,3,4]
// 		}	
// }