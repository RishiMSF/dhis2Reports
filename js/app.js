var HmisReport = angular.module("HmisReport",['ngRoute','HmisReportcontrollers','hmisReportServices']);


HmisReport.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/service',{
				templateUrl: 'services.html',
        		controller: 'ServiceController'
			})
			otherwise({
        		redirectTo: '/services'
      		});
	}
]);

// $(document).ready(function(){
// 	$('#dossierTabs a').click(function (e) {
// 	  e.preventDefault()
// 	  $(this).tab('show')
// 	})
// });
