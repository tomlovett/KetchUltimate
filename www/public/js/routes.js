angular.module('Ketch')
	.config(['$routeProvider', function($routeProvider){

		$routeProvider
			.when('/game', {
				templateUrl : '/html/liveGame.html',
				controller  : 'gameController'
			})

	}])