angular.module('updater', [])
	.controller('updaterController', ['$scope', '$http', function ($scope, $http){

		$scope.today = new Date();
		$scope.dd = $scope.today.getDate();
		$scope.mm = $scope.today.getMonth()+1;
		$scope.yyyy = $scope.today.getFullYear();
		$scope.apikey = "42cbece91ba48a52679069d8e3aa9462%3A12%3A70689096";
		$scope.result = {};
		$scope.tlt = {};
		$scope.abstract = {};
		$scope.leadP = {};
		$scope.url = {};
		var counter = 0;

		$scope.printDay = function() {
			console.log($scope.dd);
		};
		$scope.printMonth = function() {
			console.log($scope.mm);
		};
		$scope.printYear = function() {
			console.log($scope.yyyy);
		};

		//get the date 10 years ago today in yyyymmdd format
		$scope.get10YearsAgo = function(){
			if($scope.dd < 10){
				newDay = '0' + $scope.dd;
			}
			else {
				newDay = $scope.dd;
			}

			if ($scope.mm<10){
				newMonth = '0' + $scope.mm;
			}
			else{
				newMonth = $scope.mm;
			}

			var newYear = $scope.yyyy-10;

			return (newYear + newMonth + newDay);
		};

		$scope.lookup = function(){
			$http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=' + $scope.get10YearsAgo() + '&end_date=' + $scope.get10YearsAgo() + '&sort=newest&api-key=' + $scope.apikey)
				.then(function (rsponse){
					$scope.result = rsponse.data;
					$scope.tlt = $scope.result.response.docs[counter].headline.main;
					$scope.abstract = $scope.result.response.docs[counter].abstract;
					$scope.leadP = $scope.result.response.docs[counter].lead_paragraph;
					$scope.url = $scope.result.response.docs[counter].web_url;
				})
				.catch(function (){
					console.log("something went wrong with info retrieval");
				});
		};

		$scope.nextArticle = function(){
			counter++;
			$scope.tlt = $scope.result.response.docs[counter].headline.main;
			$scope.abstract = $scope.result.response.docs[counter].abstract;
			$scope.leadP = $scope.result.response.docs[counter].lead_paragraph;
			$scope.url = $scope.result.response.docs[counter].web_url;
		};

		$scope.lastArticle = function() {
			counter--;
			$scope.tlt = $scope.result.response.docs[counter].headline.main;
			$scope.abstract = $scope.result.response.docs[counter].abstract;
			$scope.leadP = $scope.result.response.docs[counter].lead_paragraph;
			$scope.url = $scope.result.response.docs[counter].web_url;

		};

		/*$scope.getResult = function(){
			$scope.lookup();
			$scope.answer = $scope.result.response.meta;
		};*/



	}]);