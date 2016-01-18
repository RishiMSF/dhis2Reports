var HmisReport = angular.module('HmisReportCtrl',['ngSanitize']);

HmisReport.controller('HmisReportCtrl', ['$scope','Elements', 'ElementsGrps','DataSets', 'DataSet', 'ElementsInSection', 'DossierValue', 'Indicators', function($scope, Elements, ElementsGrps, DataSets, DataSet, ElementsInSection, DossierValue, Indicators){
	$scope.hmisTitle = '';
	$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();

	$scope.getElement = function(){
		$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	$scope.getDataSectionsAndDossierText = function(){
		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
		$scope.dataSetCodeWithoutNumber = removeLevelOfDataSetCode($scope.selectedSet.code);
		$scope.dossierRow = DossierValue.get({dataSetCode:$scope.dataSetCodeWithoutNumber});	
		$scope.indicators = Indicators.get({dataSetName:$scope.selectedSet.displayName});
		$("#IndicatorGrpContrainer").show();
		//$scope.indicatorgrpId = IndicatorGrpId.get({dataSetName:$scope.selectedSet.displayName}).indicatorGroups.IndicatorGroup;
	};

	removeLevelOfDataSetCode = function(datasetCode){
		if (datasetCode.match(".*\\d$")){
			return datasetCode.slice(0,-1);
		}else{
			return datasetCode;
		}
	};

	$scope.getElementsSection = function(sectionId){
		return $scope.sectionElements = ElementsInSection.get({sectionId:sectionId});
		//$scope.elements = Elements.get({elementGrpId:$scope.selected.id});
	};

	// $scope.getIndicatorGrp = function(){
	// 	var dsCode = $("#drpBoxDataSet").val();
	// 	$scope.indicatorgrpId = IndicatorGrpId.get({dataSetName:dsCode});
	// 	console.log("DAASET CODE " + dsCode);
	// };

}]);
