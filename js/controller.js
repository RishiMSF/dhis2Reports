var HmisReport = angular.module('HmisReportCtrl',['ngSanitize']);

HmisReport.controller('HmisReportCtrl', ['$scope','Elements', 'ElementsGrps','DataSets', 'DataSet', 'ElementsInSection', 'DossierValue', function($scope, Elements, ElementsGrps, DataSets, DataSet, ElementsInSection, DossierValue){
	$scope.hmisTitle = '';
	$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();

	$scope.getElement = function(){
		$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	$scope.getDataSectionsAndDossierText = function(){
		$scope.dossierRow = {};

		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
		$scope.dossierRow = DossierValue.get({dataSetCode:$scope.selectedSet.code});		
		//console.log("selected set" + $("#drpBoxDataSet").val());
	};

	$scope.getElementsSection = function(sectionId){
		return $scope.sectionElements = ElementsInSection.get({sectionId:sectionId});
		//$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};
}]);
