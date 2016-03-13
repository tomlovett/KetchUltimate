angular.module('Ketch').factory('globalData', function() {
	return {
		friends  : [],
		teams    : [],
		populated: {}
	}
})

/* 
These factories are solely for global data storage and manipulation.
"user" and "team" are assigned locally by controllers as direct pipes to "player" and "team" objects, respectively.  :)
*/
angular.module('Ketch').factory('user', function() {
	return {}	
})

angular.module('Ketch').factory('team', function() {
	return {}
})