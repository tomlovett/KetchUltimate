angular.module('Ketch').factory('globalData', function() {

	user = {}
	team = {}

	return {
		user : user,
		team : team,
	}

})