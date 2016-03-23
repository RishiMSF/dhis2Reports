var HmisReport = angular.module('HmisReport',['ngRoute','HmisReportcontrollers','hmisReportServices']);

/*
HmisReport.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/services',{
				templateUrl: 'services.html',
        		controller: 'ServiceController'
			})
			.
			otherwise({
        		redirectTo: '/services'
      		});
	}
]);
*/

HmisReport.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider.
			when('/dataSets',{
				templateUrl: 'app/dossierDataSets.html',
        		controller: 'HmisReportCtrl'
			}).when('/services',{
				templateUrl: 'app/dossierServices.html',
        		controller: 'ServiceController'
			});
	//$locationProvider.html5Mode(true);		
}]);

// $(document).ready(function(){
// 	$('#dossierTabs a').click(function (e) {
// 	  e.preventDefault()
// 	  $(this).tab('show')
// 	})
// });
