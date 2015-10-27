var HmisReport = angular.module('HmisReportCtrl', []);			
			

HmisReport.controller('HmisReportCtrl', ['$scope', 'ElementGroup', function($scope, ElementGroup){
	$scope.hmisTitle = 'DIAGNOSTIC - DOSSIER';
	$scope.elementGroup = ElementGroup.get({elementGrpId:'Utm69ZvS4op'});
}]);