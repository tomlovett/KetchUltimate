angular.module('Ketch').controller('ratingController', ['$scope', '$http', 'globalData', function($scope, $http, globalData) {

	var format = []
	// self              - 2 height, bday, etc.
	// self-style        - 2
	// self-abilities    - 2
	// subject1-style     - 2 
	// subject1-abilities - 2
	// subject2-style     - 2 
	// subject2-abilities - 2
	// dessert
		// ideally

	$scope.question = {
		num   : 33,
		prompt: 'How dope is your dope?',
		2     : 'Not very dope.',
		4     : 'Of average dopeness.',
		6     : 'The dopest dope in the room.'
	}

	var loadQuestions = function() {
		// findTwoTeammates()
		http.post('http://localhost:3000/api/recordRating')
		// ping database for unanswered question
			// post user_id
		'yippee'
	}

	$scope.record = function(score) {
		var answerObj = {
			questionNum : $scope.question[num],
			rating      : score,
			judgeID     : globalData.user._id,
			subjectID   : subjectID  //garbage, how do I get this?
		}
		$http.post('http://localhost:3000/api/recordRating', answerObj)
			.then(function(ratingReturn) {
				$http.post('http://localhost:3000/api/recordAnswer', answerObj)
					.then(function(answerReturn) {
						'yippee'
					})
			})
		loadNext()
	}

	$scope.pass = function() {
		'go to the next'
	}

	$scope.idk = function() {
		'go to the next'
	}
	
}])