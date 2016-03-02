var HmisReport = angular.module('HmisReportCtrl',['ngSanitize','pascalprecht.translate','ui.tinymce']);

HmisReport.controller('HmisReportCtrl', ['$scope','Services', function($scope, Services){
	
	//$scope.services = Services.get();	

}]);

HmisReport.controller('ServiceController',['$scope','Services','ServiceDataSets','Dossier', '$translate', 'Services', 'ServiceSections', function($scope,Services,ServiceDataSets,Dossier,$translate, ServiceSections){
	$scope.services = Services.get();
	//$scope.sections = Sections.get();

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


HmisReport.controller('SectionController', ['$scope','ServiceSections',function($scope, ServiceSections){
    $scope.getSections = function(id){
		$scope.sections = ServiceSections.get({datasetId:id});
		console.log("test");
		//return $scope.serviceSections;
	}

 //    $scope.getElementsInSection = function(section){
	// 	var elementIds;

	// 	$scope.dataElements = {};

	// 	angular.forEach(section.dataElements, function(element,key){
	// 		if (key!=0){			
	// 			elementIds = elementIds + "," + element.id;
	// 		}else{
	// 			elementIds = element.id;
	// 		}
	// 	});

	// 	$scope.dataElements = Elements.get({IdList:"[" + elementIds + "]"});	
	// }
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