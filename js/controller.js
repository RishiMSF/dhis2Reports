var HmisReport = angular.module('HmisReportCtrl', []);	
var elementGrpId =  'DZmppihKF1V';

			

HmisReport.controller('HmisReportCtrl', ['$scope', 'Elements', 'ElementsGrps',function($scope, Elements, ElementsGrps){
	$scope.hmisTitle = 'DIAGNOSTIC - DOSSIER';
	$scope.elements = Elements.get({elementGrpId:elementGrpId});
	$scope.elementGroups = ElementsGrps.get();
}]);

/*
HmisReport.controller('HmisReportCtrl', ['$scope', 'ElementsGrps', function($scope, ElementsGrps){
	$scope.elementGroups = ElementsGrps.get();
}]);

*/