angular.module('Ketch')
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Phone-specific stuff in here
        })
    })
	.config(function($stateProvider, $urlRouterProvider){

		$stateProvider	
			.state('home', {
				url         : '/',
				templateUrl : './public/views/welcome.html',
				controller  : 'mainCtrl'
			})
			.state('welcome', {
				templateUrl : '/public/views/welcome.html',
				controller  : 'mainCtrl'
			})	// choose entry method; login, create, quickStart; execute
			.state('game', {
				url         : '/game',
				templateUrl : '/public/views/game.html',
				controller  : 'gameController'
			}) // edit liveRoster, sub/live views?
			.state('ratingMode' , {
				url         : '/rating',
				templateUrl : '/public/views/ratingMode.html',
				controller  : 'ratingMode'
			})
			.state('manageTeam' , {
				url         : '/manageTeam',
				templateUrl : '/public/views/manageTeam.html',
				controller  : 'manageTeam'
			})  // create player, attachEmail
			// .state('teamHistory/:team' , {
			// 	templateUrl : '/public/views/teamHistory.html',
			// 	controller  : 'teamHistory'
			// })
			// .state('playerHistory/:player' , {
			// 	templateUrl : '/public/views/playerHistory.html',
			// 	controller  : 'playerHistory'
			// })
			// .state('scoreSummary/:game' , {
			// 	templateUrl : '/public/views/scoreSummary.html',
			// 	controller  : 'scoreSummary'
			// })
			// .state('teamStats/:team/:game' , {
			// 	templateUrl : '/public/views/teamStats.html',
			// 	controller  : 'teamStats'
			// })
			// .state('playerStats/:player/:game' , {
			// 	templateUrl : '/public/views/playerStats.html',
			// 	controller  : 'playerStats'
			// })

		$urlRouterProvider.otherwise('/')
	})