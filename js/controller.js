var HmisReport = angular.module('HmisReportCtrl',['ngSanitize']);

HmisReport.controller('HmisReportCtrl', ['$scope', '$rootScope','DataSets', 'DataSet', 'Elements', 'DossierValue', 'Indicators', 'IndicatorGrps','IndicatorGrp', 'Sections', function($scope, $rootScope, DataSets, DataSet, Elements, DossierValue, Indicators, IndicatorGrps, IndicatorGrp, Sections){
	$scope.hmisTitle = '';
	//$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();
	$scope.indicatorGrps = IndicatorGrps.get();
	$scope.sections = Sections.get();
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

	// $scope.setCurrentSection = function(section){
	// 	console.log($scope.currentSection.displayName);
	// }

	$scope.filterByDataSet = function(sc){
		var inDataSet = false;
		//console.log($scope.sections.length);	
		angular.forEach($scope.dataset.sections, function(dsSection){
			if (sc.id === dsSection.id) {
				inDataSet = true;
			}
		});
		return inDataSet;
		//return dataElement.id && .indexOf(dataElement.id) !== -1;		
	}

	$scope.getIndicatorGrp = function(){
		//console.log("grp id : " + $scope.selectedGrp.id);
		return $scope.indicatorGrp = IndicatorGrp.get({indicatorGrpId:$scope.selectedGrp.id});  
		//console.log("number of indicators: " + $scope.indicatorsGrp..length);
	}
}]);

HmisReport.controller('SectionController', ['$scope', 'Elements',function($scope,Elements){
    $scope.getElementsInSection = function(section){
		var elementIds;

		$scope.dataElements = {};

		angular.forEach(section.dataElements, function(element,key){
			if (key!=0){			
				elementIds = elementIds + "," + element.id;
			}else{
				elementIds = element.id;
			}
		});

		$scope.dataElements = Elements.get({IdList:"[" + elementIds + "]"});
		
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
