angular.module('Ketch')
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Phone-specific stuff in here
        })
    })
	.config(function($stateProvider, $urlRouterProvider){

		$stateProvider	
		// Login
			.state('login', {
				url         : '/login',
				templateUrl : '/public/views/login.html',
				controller  : 'entry'
			})
			.state('login.signIn', {
				url         : '/signIn',
				templateUrl : '/public/views/snippets/login/signIn.html',
				controller  : 'entry'
			})
			.state('login.signUp', {
				url         : '/signUp',
				templateUrl : '/public/views/snippets/login/signUp.html',
				controller  : 'entry'
			})
		// Game
			.state('game', {
				url         : '/game',
				templateUrl : '/public/views/game.html',
				controller  : 'game'
			})
			// .state('game.scoreSummary', {
			// 	url         : '/scoreSummary',
			// 	templateUrl : '/public/views/snippets/game/scoreSummary.html',
			// 	controller  : 'game'
			// })
		// Team management
			.state('team' , {
				url         : '/team',
				templateUrl : '/public/views/team.html',
				controller  : 'teamController'
			})
			// .state('team.attachEmails', {
			// 	url         : '/attachEmails',
			// 	templateUrl : '/public/views/snippets/team/attachEmails.html',
			// 	controller  : 'teamController'
			// }) // one snippet for emails and roster management?
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
		$urlRouterProvider.otherwise('/login')
	})