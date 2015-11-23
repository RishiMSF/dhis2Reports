var HmisReport = angular.module('HmisReportCtrl', []);	
//var elementGrpId =  'DZmppihKF1V';

			

HmisReport.controller('HmisReportCtrl', ['$scope', 'Elements', 'ElementsGrps','DataSets', 'DataSet', function($scope, Elements, ElementsGrps, DataSets, DataSet){
	$scope.hmisTitle = 'DIAGNOSTIC - DOSSIER';
	$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();

	$scope.getElement = function(){
		$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	$scope.getDataSections = function(){
		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
		//$scope.sections = $scope.dataSet.sections;
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