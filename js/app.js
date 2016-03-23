var HmisReport = angular.module('HmisReport',['ngRoute','ngAnimate','HmisReportcontrollers','hmisReportServices']);

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
			when('/main',{
				templateUrl: 'app/dossierApp.html',
        		controller: 'HmisReportCtrl'
			}).when('/services',{
				templateUrl: 'app/services.html',
        		controller: 'ServiceController'
			});
	$locationProvider.html5Mode(true);		
}]);

// $(document).ready(function(){
// 	$('#dossierTabs a').click(function (e) {
// 	  e.preventDefault()
// 	  $(this).tab('show')
// 	})
// });
