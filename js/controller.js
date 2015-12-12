var HmisReport = angular.module('HmisReportCtrl', []);	

			

HmisReport.controller('HmisReportCtrl', ['$scope', 'Elements', 'ElementsGrps','DataSets', 'DataSet', 'ElementsInSection', function($scope, Elements, ElementsGrps, DataSets, DataSet, ElementsInSection){
	$scope.hmisTitle = '';
	$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();

	$scope.getElement = function(){
		$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	$scope.getDataSections = function(){
		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
	};

	$scope.getElementsSection = function(sectionId){
		return $scope.sectionElements = ElementsInSection.get({sectionId:sectionId});
	};

}]);

/*
HmisReport.controller('HmisReportCtrl', ['$scope', 'ElementsGrps', function($scope, ElementsGrps){
	$scope.elementGroups = ElementsGrps.get();
}]);

*/