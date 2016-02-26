var HmisReport = angular.module('HmisReportCtrl',['ngSanitize','pascalprecht.translate','ui.tinymce']);

HmisReport.controller('HmisReportCtrl', ['$scope', '$rootScope', '$translate', '$q', 'DataSets', 'DataSet', 'Elements', 'Dossier', 'Indicators', 'IndicatorGrps','IndicatorGrp', 'Sections', 'Services','ServiceDataSets', function($scope, $rootScope, $translate, $q, DataSets, DataSet, Elements, Dossier, Indicators, IndicatorGrps, IndicatorGrp, Sections, Services,ServiceDataSets){
	
	$scope.hmisTitle = '';
	//$scope.elementGroups = ElementsGrps.get();
	$scope.dataSets = DataSets.get();
	$scope.indicatorGrps = IndicatorGrps.get();
	$scope.services = Services.get();	
	// $scope.DossierLanguageOUId = function(){
	// 	 $scope.DossierLanguageId = OrgUnitLanguage.get({languageCode:$translate.use()});
		 
	// 	 $scope.DossierLanguageId.$promise.then(function (result) {
 //    		$scope.DossierLanguageId = result;

	// 	 	return $scope.DossierLanguageId.organisationUnits[0].id;
	// 	 });
	// };

	//console.log($scope.indicatorGrps.indicatorGroups.length);

	$scope.getDataSectionsAndDossierText = function(){
		$scope.dataset = DataSet.get({dataSetId:$scope.selectedSet.id});
		$scope.sections = Sections.get();
		$scope.dataSetCodeWithoutNumber = removeLevelOfDataSetCode($scope.selectedSet.code);
		console.log("service code: " + $scope.dataSetCodeWithoutNumber);

		$scope.dossierRow = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.dataSetCodeWithoutNumber});	
		//console.log("Dossier language id: " + $scope.DossierLanguageOUId());
	};



	removeLevelOfDataSetCode = function(datasetCode){
		var re= /([A-Z]+)(_)([A-Z]+)([wm]*)(_)([\d]+)$/
		var result = re.exec(datasetCode);
		
		return result == null ? datasetCode : result[1]+result[2]+result[3];
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
		$scope.indicatorGrp = IndicatorGrp.get({indicatorGrpId:$scope.selectedGrp.id}); 
		$("#IndicatorGrpContainer").show(); 
	}

	$scope.getNuminator = function(indicator){
		var re = /(NUM:)(.*)(DENOM:)/;
		var result = re.exec(indicator.displayDescription);
		if (result!== null){
			return result.length > 1 ? result[2] : "x";
		}
	}

	$scope.getDenominator = function(indicator){
		var re = /(DENOM:)(.*)/;
		var result = re.exec(indicator.displayDescription);
		if (result!== null){
			return result.length > 1 ? result[2] : "x";
		}
	}

	$scope.getDescription = function(indicator){
		var re = /(.*)(NUM:)/;
		var result = re.exec(indicator.displayDescription);
		if (result!== null){
			return result[1];
		}
		else{
			return indicator.displayDescription;
		}
	}


}]);


HmisReport.controller('ServiceController',['$scope','Services','ServiceDataSets','Dossier', '$translate', 'Sections', function($scope,Services,ServiceDataSets,Dossier,$translate, Sections){
	$scope.services = Services.get();
	$scope.sections = Sections.get();

	$scope.getServiceData = function(){
		$scope.serviceDataSets = ServiceDataSets.get({serviceCode:$scope.selectedService.code}, function(serviceDataSets){
			$scope.numberOfSections = countSections($scope.serviceDataSets);	
			$scope.dossier = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.selectedService.code});

			//$scope.dossier = Dossier.get({languageCode:})
		}); 
	}

	countSections = function(serviceDataSets){
		var count = 0;

		angular.forEach(serviceDataSets.dataSets, function(dset){
			count += dset.sections.length;
		});

		return count;
	}

// foreach dataset foreach section ....
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

HmisReport.config(function ($translateProvider) {
	  
	  $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
	  
	  $translateProvider.registerAvailableLanguageKeys(
			    ['es', 'fr', 'en', 'pt'],
			    {
			        'en*': 'en',
			        'es*': 'es',
					'fr*': 'fr',
					'pt*': 'pt',
			        '*': 'en' // must be last!
			    }
			);
	  
	  $translateProvider.fallbackLanguage(['en']);

	  jQuery.ajax({ url: dhisUrl + 'userSettings/keyUiLocale/', contentType: 'text/plain', method: 'GET', dataType: 'text', async: false}).success(function (uiLocale) {
		  if (uiLocale == ''){
			 $translateProvider.determinePreferredLanguage();
		  }
		  else{
			 $translateProvider.use(uiLocale);
		  }
    }).fail(function () {
  	  $translateProvider.determinePreferredLanguage();
	  });
	  
});


//TO DO:
// 
//Dossier Elements will contain service  code, the dataset with the most amount of elements will have this service code as well 
// if service code refers to more than one dataset all these datasets elements will have to be added to the dossier
// indicatorgroup will have service code as well, if the same service code belongs to more than one indicatorgroup then these indicagtor groups have to be added to the dossier.
//dropdown will show form name  of dossier data elements as service
//for title in service tab the description will be used.