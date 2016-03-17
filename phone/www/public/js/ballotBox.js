angular.module('Ketch').controller('votingController', ['$scope', '$http', function($scope, $http) {

	// variability in the number of unanswered questions adds some unpredictability to the process, which may/will draw in more engagement

	// make it a ballot box that users open on a click
	// putting paper in a ballot box

	var server = 'http://45.55.173.156/'

// style roster items? not super necessary
// pre-routed rating mode; demo-only bullshit

	var ballotModel = [
		// ['self',     'misc'],
		['self',    'style'],
		['self', 'ability',],
		['subj1',  'style',],
		['subj1', 'ability'],
		['subj2',   'style'],
		['subj2', 'ability'],
		['dessert',    null],
	]

	var misc = [
		{prompt: ''},
		{prompt: ''},
		{prompt: ''},
	]

	var style = [
		{prompt: 'How often does this person cut/throw deep?'},
		{prompt: 'How often does this person handle?'},
		{prompt: 'How often does this person make inverted throws? (Hammers, scoobers, etc.)'},
		{prompt: 'How would you rate this person\'s effort level?'},
		{prompt: 'How often does this person slack off?'},
	]

	var ability = [
		{prompt: 'What is this person\'s throwing range?'},
		{prompt: 'How fast is this person?'},
		{prompt: 'How reliable is this person\'s catching?'},
		{prompt: 'How good is this person\'s ups?'},
		{prompt: 'How often does this person break throw?' }
	]

	var dessert = {prompt: 'How often do you hit snooze? (1: Never, 7: Literally always)'}

	var subjs = {
		self : 'id',
		subj1: 'id',
		subj2: 'id'
	}
	var ballot = []

	var callMisc
	var twoStyle   // player
	var twoAbility // player
	var randomSubject // anyone in friends; all teammates into friends

	var rando = function(number) {
		return Math.floor(Math.random() * number)
	}

	var callSubjs = function() {
		// user, call subj1, subj2, dessert?
		// then
	}

	var demoQuests = function() {
		// 
	} // index += 1

	// var callQuest = function(subject, type) {
	// 	$http.post(server + '/api/callQuests', {subj: subject, type: type})
	// 		.then(function(res) {
	// 			if (res.data.question)    ballot.push(res.data.question)
	// 			if (res.data.questionTwo) ballot.push(res.data.questionTwo)
	// 		})
		// shift
		// shift from current to next
	


	// var callAll = function() {
	// 	ballotModel.forEach(function(quest) {
	// 		callQuests(quest[0], quest[1])
	// 	})
	// }

	$scope.question = {
		user : '',
		subject: '',
		type:  'type?',
		question: 'questObj'
	}
	
	// can pull each question one at a time
	// can build up key of how to run questions
		// if question.answered, don't send

	// if next.question -> set, else next
		// registering the end

		// self.misc, (self.style, self.ability)... dessert

}])