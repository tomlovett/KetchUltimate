angular.module('Ketch').controller('ratingMode', ['$scope', '$http', function($scope, $http) {

	console.log('ratingMode controller')

	var genQuestions = function() {
		'if I feel like doing this locally'
	}

	var loadNext = function() {
		'get the next question'
	}

	$scope.record = function(score) {
		'store'
		loadNext()
	}

	$scope.pass = function() {
		'go to the next'
	}

	$scope.idk = function() {
		'go to the next'
	}
	
}])