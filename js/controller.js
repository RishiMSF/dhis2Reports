var HmisReport = angular.module('HmisReportCtrl', []);			
			

HmisReport.controller('HmisReportCtrl', ['$scope', 'Elements', function($scope, Elements){
	$scope.hmisTitle = 'DIAGNOSTIC - DOSSIER';
	$scope.elements = Elements.get({elementGrpId:'Utm69ZvS4op'});
}]);

HmisReport.controller('HmisReportCtrl', ['$scope', 'ElementsGrps', function($scope, ElementsGrps){
	$scope.hmisTitle = 'DIAGNOSTIC - DOSSIER';
	$scope.elementGroups = ElementsGrps.query();
}]);