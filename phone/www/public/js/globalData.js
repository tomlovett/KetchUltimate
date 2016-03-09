angular.module('Ketch').factory('globalData', function() {

	user     = {}
	mainTeam = {}
	teams    = [] // pull from user.teams
	players  = {}

	// preloaded team

	return {
		user     : user,
		mainTeam : mainTeam,
		teams    : teams,
		players  : players
		// FC   : FC // Flaming Croissants
	}

})