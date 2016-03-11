angular.module('Ketch').factory('globalData', function() {

	user     = {}
	mainTeam = null
	teams    = [] // pull from user.teams
	friends  = []

	// preloaded team

	return {
		user     : user,
		mainTeam : mainTeam,
		teams    : teams,
		friends  : friends
		// FC   : FC // Flaming Croissants
	}

})