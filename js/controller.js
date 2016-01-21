var HmisReport = angular.module('HmisReportCtrl',['ngSanitize']);

HmisReport.controller('HmisReportCtrl', ['$scope','Element', 'DataSets', 'DataSet', 'ElementsInSection', 'DossierValue', 'Indicators', 'IndicatorGrps','IndicatorGrp', function($scope, Element, DataSets, DataSet, ElementsInSection, DossierValue, Indicators, IndicatorGrps, IndicatorGrp){
	$scope.hmisTitle = '';
	//$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();
	$scope.indicatorGrps = IndicatorGrps.get();
	//console.log($scope.indicatorGrps.indicatorGroups.length);

	$scope.getDataSectionsAndDossierText = function(){
		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
		$scope.dataSetCodeWithoutNumber = removeLevelOfDataSetCode($scope.selectedSet.code);
		$scope.dossierRow = DossierValue.get({dataSetCode:$scope.dataSetCodeWithoutNumber});	
		//$scope.indicators = Indicators.get({dataSetName:$scope.selectedSet.displayName});
		$("#IndicatorGrpContrainer").show();

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
	};

	$scope.getElement = function(elementId){
		return $scope.element = Element.get({elementId:elementId});
	}

	$scope.getIndicatorGrp = function(){
		console.log("grp id : " + $scope.selectedGrp.id);
		return $scope.indicatorGrp = IndicatorGrp.get({indicatorGrpId:$scope.selectedGrp.id});  
		//console.log("number of indicators: " + $scope.indicatorsGrp..length);
	}
}]);

// HmisReport.config(function ($translateProvider) {
	  
// 	  $translateProvider.useStaticFilesLoader({
//         prefix: 'languages/',
//         suffix: '.json'
//     });
	  
// 	  $translateProvider.registerAvailableLanguageKeys(
// 			    ['es', 'fr', 'en', 'pt'],
// 			    {
// 			        'en*': 'en',
// 			        'es*': 'es',
// 					'fr*': 'fr',
// 					'pt*': 'pt',
// 			        '*': 'en' // must be last!
// 			    }
// 			);
	  
// 	  $translateProvider.fallbackLanguage(['en']);

// 	  jQuery.ajax({ url: ApiUrl + '/userSettings/keyUiLocale/', contentType: 'text/plain', method: 'GET', dataType: 'text', async: false}).success(function (uiLocale) {
// 		  if (uiLocale == ''){
// 			  $translateProvider.determinePreferredLanguage();
// 		  }
// 		  else{
// 			  $translateProvider.use(uiLocale);
// 		  }
//     }).fail(function () {
//   	  $translateProvider.determinePreferredLanguage();
// 	  });
	  
// });


//TO DO this week
// 
// Data Indicator groups show all in different page
// use description and split it up in two coulmns for nominator and denominator

//To do adter this week
// Adding ZZDossier for each language  -- means that I have to read the language selected and query the related data element
//Select dataset with most elements  -- How to show Services in  drop down, based on what (minus level text ?)
