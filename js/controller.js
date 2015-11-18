var HmisReport = angular.module('HmisReportCtrl', []);	
//var elementGrpId =  'DZmppihKF1V';

			

HmisReport.controller('HmisReportCtrl', ['$scope', 'Elements', 'ElementsGrps',function($scope, Elements, ElementsGrps){
	$scope.hmisTitle = 'DIAGNOSTIC - DOSSIER';
	$scope.elementGroups = ElementsGrps.get();

	$scope.getElement = function(){
		$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	$scope.setTitle = function(elementGroupName){
		$scope.hmisTitle = elementGroupName;
		alert(elementGroupName);
	};

}]);

/*
HmisReport.controller('HmisReportCtrl', ['$scope', 'ElementsGrps', function($scope, ElementsGrps){
	$scope.elementGroups = ElementsGrps.get();
}]);

*/