var mongoose = require('mongoose')

var ratingSchema = mongoose.Schema({
	playerID: String,
	ratings : {
		type: Object,
		default: {}
	}
})

module.exports = mongoose.model('ratings', ratingSchema)

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