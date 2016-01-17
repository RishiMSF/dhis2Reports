var HmisReport = angular.module('HmisReportCtrl',['ngSanitize']);

HmisReport.controller('HmisReportCtrl', ['$scope','$sce','Elements', 'ElementsGrps','DataSets', 'DataSet', 'ElementsInSection', 'DossierValue', function($scope, $sce, Elements, ElementsGrps, DataSets, DataSet, ElementsInSection, DossierValue){
	$scope.hmisTitle = '';
	$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();

	$scope.getElement = function(){
		$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	$scope.getDataSections = function(){
		$scope.dossierRow = {};

		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
		$scope.dossierRow = DossierValue.get({dataSetId:$scope.selectedSet.code});		
		//console.log("selected set" + $("#drpBoxDataSet").val());
		console.log("selected code " + $scope.selectedSet.code);
	};

	$scope.getElementsSection = function(sectionId){
		return $scope.sectionElements = ElementsInSection.get({sectionId:sectionId});
		//$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};
}]);
