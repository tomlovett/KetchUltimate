angular.module('Ketch')
	.config(['$routeProvider', function($routeProvider){

		$routeProvider
			.when('/game', {
				templateUrl : '/views/game.html',
				controller  : 'gameController'
			})
			.when('/manageTeam' , {
				templateUrl : 'views/manageTeam.html',
				controller  : 'manageTeam'
			})
			.when('/teamHistory/:team' , {
				templateUrl : 'views/teamHistory.html',
				controller  : 'teamHistory'
			})
			.when('/playerHistory/:player' , {
				templateUrl : 'views/playerHistory.html',
				controller  : 'playerHistory'
			})
			.when('/scoreSummary/:game' , {
				templateUrl : 'views/scoreSummary',
				controller  : 'scoreSummary'
			})
			.when('/teamStats/:team/:game' , {
				templateUrl : 'views/teamStats.html',
				controller  : 'teamStats'
			})
			.when('/playerStats/:player/:game' , {
				templateUrl : 'views/playerStats',
				controller  : 'playerStats'
			})
			.when('/ratingMode' , {
				templateUrl : 'views/ratingMode',
				controller  : 'ratingMode'
			})
	}])