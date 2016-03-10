angular.module('Ketch').controller('mainCtrl', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	console.log('mainCtrl')

	var loadPlayer = function(player) {
		globalData.user = player // from DB
		
	}

	var loadFriends = function(player) {
		
	}

	$scope.login = function() {
		'if email not in database, error message -> email not in DB, '
		'else if password is incorrect, error message -> try again'
		'set player as globalData.user, load teams & friends'
	}

	$scope.register = function() {
		'create new user'
		'check DB for email'
			'if so, send verification email'
		'set as globalData.user'
		'move to team management'
	}

	$scope.quickMode = function() {
		'globalData.user set to email-less player'
		're-route to team management'
		'create you first'
	}

}])