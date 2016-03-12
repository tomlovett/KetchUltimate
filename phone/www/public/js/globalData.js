angular.module('Ketch').factory('globalData', function() {

	var user = {},
        mainTeam = null,
        teams    = [], // pull from user.teams
		friends  = []

	var setUser = function(player) {
		user = player

	}

	// this will be changed to user.stuff when that's functional, I believe

	return {
		user     : user,
		mainTeam : mainTeam,
		teams    : teams,
		friends  : friends,
		setUser  : setUser
	}

	var primary,
		teams,
		friends

	console.log('user factory spun-up')

	var assign = function(playerObj) {
		console.log('user.assign - playerObj: ', playerObj)
		player = playerObj
		firstName = playerObj.firstName
		teams = playerObj.teams
		setPrimary()
		loadFriends()
		// scaffold out
	}

	var setPrimary = function(teamID) {
		if (player.teams.length == 0) 	return 
		// change to < 2? to prevent shuffling one team around
		var index = player.teams.indexOf(teamID)
		player.teams.unshift(this.teams.splice(index, 1)[0])
		primary = player.teams[0]
	}

	var	loadFriends = function() {
		'go through teams, pull all players'
	}


	return {
 		assign : assign,
 		setPrimary: setPrimary,

		player: player,
		firstName: firstName,
		primary: primary,
		teams: teams,
		friends: friends
	}
})

angular.module('Ketch').factory('user', function() {
	return {}
})

angular.module('Ketch').factory('team', function() {
	return {}
})