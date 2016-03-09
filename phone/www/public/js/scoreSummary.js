angular.module('Ketch').controller('scoreSummary', ['$scope', '$http', function($scope, $http) {

	$scope.expand = function(index) {
		if ($scope.show[index]) { $scope.show[index] = false }
		else                    { $scope.show[index] = true  }
	}	
}])