angular.module('Ketch')
	.config(['$routeProvider', function($routeProvider){
// can take out $rP dependency
		$routeProvider
		
			// .when('/', {
			// 	templateURL : '/public/views/index.html',
			// 	controller  : 'mainCtrl'
			// })
		
			.when('/game', {
				templateUrl : '/public/views/game.html',
				controller  : 'gameController'
			})
			.when('/manageTeam' , {
				templateUrl : '/public/views/manageTeam.html',
				controller  : 'manageTeam'
			})
			.when('/teamHistory/:team' , {
				templateUrl : '/public/views/teamHistory.html',
				controller  : 'teamHistory'
			})
			.when('/playerHistory/:player' , {
				templateUrl : '/public/views/playerHistory.html',
				controller  : 'playerHistory'
			})
			.when('/scoreSummary/:game' , {
				templateUrl : '/public/views/scoreSummary',
				controller  : 'scoreSummary'
			})
			.when('/teamStats/:team/:game' , {
				templateUrl : '/public/views/teamStats.html',
				controller  : 'teamStats'
			})
			.when('/playerStats/:player/:game' , {
				templateUrl : '/public/views/playerStats',
				controller  : 'playerStats'
			})
			.when('/ratingMode' , {
				templateUrl : '/public/views/ratingMode',
				controller  : 'ratingMode'
			})

	}])