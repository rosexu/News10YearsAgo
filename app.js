angular.module('updater', [])
	.controller('updaterController', ['$scope', '$http', function ($scope, $http){

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		var apikey = "42cbece91ba48a52679069d8e3aa9462%3A12%3A70689096";
		$scope.result = {};
		$scope.tlt = {};
		$scope.abstract = {};
		$scope.leadP = {};
		$scope.url = {};
		var numArticles = 0;
		var counter = 0;

		$scope.printDay = function() {
			console.log(dd);
		};
		$scope.printMonth = function() {
			console.log(mm);
		};
		$scope.printYear = function() {
			console.log(yyyy);
		};

		//get the date 10 years ago today in yyyymmdd format
		$scope.get10YearsAgo = function(){
			if(dd < 10){
				newDay = '0' + dd;
			}
			else {
				newDay = dd;
			}

			if (mm<10){
				newMonth = '0' + mm;
			}
			else{
				newMonth = mm;
			}

			var newYear = yyyy-10;

			return (newYear + newMonth + newDay);
		};

		$scope.lookup = function(){
			$http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=' + $scope.get10YearsAgo() + '&end_date=' + $scope.get10YearsAgo() + '&sort=newest&api-key=' + apikey)
				.then(function (rsponse){
					$scope.result = rsponse.data;
					$scope.tlt = $scope.result.response.docs[counter].headline.main;
					$scope.abstract = $scope.result.response.docs[counter].abstract;
					$scope.leadP = $scope.result.response.docs[counter].lead_paragraph;
					$scope.url = $scope.result.response.docs[counter].web_url;
					numArticles = $scope.result.response.docs.length;
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

		$scope.isFirstArt = function() {
			return (counter === 0);
		};

		$scope.isLastArt = function() {
			return (counter >= (numArticles - 1));
		};

		$scope.lookup();

	}]);