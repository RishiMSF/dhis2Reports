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

// HmisReport.run(function($rootScope, $location, $anchorScroll, $routeParams) {
//   $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
//     $location.hash($routeParams.scrollTo);
//     $anchorScroll();  
//   });
// })


HmisReport.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider){
		$routeProvider.
			when('/dataSets',{
				templateUrl: 'app/dossierDataSets.html',
        		controller: 'DataSetController'
			}).when('/services',{
				templateUrl: 'app/dossierServices.html',
        		controller: 'ServiceController'
			}).otherwise({
        		redirectTo: '/services'
      		});
	//$locationProvider.html5Mode(true);		
}]);

// $(document).ready(function(){
// 	$('#dossierTabs a').click(function (e) {
// 	  e.preventDefault()
// 	  $(this).tab('show')
// 	})
// });
