angular.module('Ketch')
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Phone-specific stuff in here
        })
    })
	.config(function($stateProvider, $urlRouterProvider){

		$stateProvider	
		// Login
			.state('welcome', {
				url         : '/welcome',
				templateUrl : '/public/views/welcome.html',
				controller  : 'welcomeController'
			})
			.state('welcome.login', {
				url         : '/login',
				templateUrl : '/public/views/snippets/welcome/login.html',
				controller  : 'welcomeController'
			})
			.state('welcome.createSelf', {
				url         : '/createSelf',
				templateUrl : '/public/views/snippets/welcome/createSelf.html',
				controller  : 'welcomeController'
			})

		// Game
			.state('game', {
				url         : '/game',
				templateUrl : '/public/views/game.html',
				controller  : 'gameController'
			})
			.state('game.scoreSummary', {
				url         : '/scoreSummary',
				templateUrl : '/public/views/snippets/game/scoreSummary.html',
				controller  : 'gameController'
			})
		// Team management
			.state('team' , {
				url         : '/team',
				templateUrl : '/public/views/team.html',
				controller  : 'teamController'
			})
			.state('team.attachEmails', {
				url         : '/attachEmails',
				templateUrl : '/public/views/snippets/team/attachEmails.html',
				controller  : 'teamController'
			}) // one snippet for emails and roster management?
			.state('team.createPlayer', {
				url         : '/createPlayer',
				templateUrl : '/public/views/snippets/team/createPlayer.html',
				controller  : 'teamController'
			})
			.state('team.createTeam', {
				url         : '/createTeam',
				templateUrl : '/public/views/snippets/team/createTeam.html',
				controller  : 'teamController'
			})
			.state('team.editRoster', {
				url         : '/editRoster',
				templateUrl : '/public/views/snippets/team/editRoster.html',
				controller  : 'teamController'
			})
		// Rating
			.state('ratingMode' , {
				url         : '/rating',
				templateUrl : '/public/views/ratings.html',
				controller  : 'ratingController'
			})
		$urlRouterProvider.otherwise('/welcome')
	})