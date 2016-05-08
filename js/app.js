var HmisReport = angular.module('HmisReport',['ngRoute','HmisReportcontrollers','hmisReportServices','d2Menu']);

HmisReport.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider.
			when('/dataSets',{
				templateUrl: 'app/dossierDataSets.html',
        		controller: 'DataSetController'
			}).when('/services',{
				templateUrl: 'app/dossierServices.html',
        		controller: 'ServiceController'
        	}).when('/indictorGroups',{
				templateUrl: 'app/indicatorGroups.html',
        		controller: 'IndicatorGrpController'
        	}).when('/indicators',{
				templateUrl: 'app/indicators.html',
        		controller: 'IndicatorsWithoutGrpController'
			}).otherwise({
        		redirectTo: '/services'
      		});
	//$locationProvider.html5Mode(true);		
}]);
