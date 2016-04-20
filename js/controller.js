var HmisReportcontrollers = angular.module('HmisReportcontrollers',['ngSanitize','pascalprecht.translate','ui.tinymce']);

HmisReportcontrollers.controller('HmisReportCtrl', ['$scope','$translate','$route', '$location', '$anchorScroll', '$routeParams', function($scope, $translate,$route, $location, $anchorScroll, $routeParams){
	// master controler, does not do much but when multiple tabs  are enabled again then it will have a function
	this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

      // $scope.toc={
      //   entries : []
      // };

		
    addtoTOC = function(toc,items,parent, type){
		var index = toc.entries.push({
			'parent':parent,
			 'children': items
		})
	};

	$scope.scrollTo = function (id) {
  		$anchorScroll(id);  
	}

}]);

HmisReportcontrollers.controller('ServiceController',['$scope','$translate','Services','ServiceDataSets','Dossier', 'IndicatorGroups', function($scope,$translate,Services,ServiceDataSets,Dossier,IndicatorGroups){
	//initService = function(){
		$scope.services = Services.get();
		$scope.serviceDataSets = {};
		 
	//};

	//initService();

	
	$scope.getServiceData = function(){
		$scope.toc={
        	entries : []
      	};

		$scope.indicatorGroups =  IndicatorGroups.get({serviceCode:$scope.selectedService.code});
		$scope.serviceDataSets = ServiceDataSets.get({serviceCode:$scope.selectedService.code}); 
		$scope.dossier = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.selectedService.code});
	
	//	initService();
	};

	// $scope.filterByDataSet = function(sc){
	// 	var inDataSet = false;
	// 	//console.log($scope.sections.length);	
	// 	angular.forEach($scope.dataset.sections, function(dsSection){
	// 		if (sc.id === dsSection.id) {
	// 			inDataSet = true;
	// 		}
	// 	});
	// 	return inDataSet;	
	// }

}]);


HmisReportcontrollers.controller('DataSetController', ['$scope', '$translate','ServiceDataSets', function($scope, $translate, ServiceDataSets){
	$scope.dataSets = ServiceDataSets.get();
	$scope.dropdownChanged = false;
	
	$scope.resetToc = function(){
		$scope.toc={
        	entries : []
    	};
	};

}]);


HmisReportcontrollers.controller('SectionController', ['$scope','Sections', function($scope, Sections){
	$scope.$watch('selectedSet',function(){
		console.log("changed");
		$scope.sections = Sections.get({datasetId:$scope.$parent.selectedSet.id},function(){
				addtoTOC($scope.toc,$scope.sections.sections,$scope.$parent.selectedSet,"dataset");	
			});
	});
}]);


HmisReportcontrollers.controller('ElementsTableController',['$scope','Elements',function($scope,Elements){
	$scope.getElementsInSection = function(section){
		var elementIds;

		$scope.dataElements = {};

		angular.forEach(section.dataElements, function(element,key){
			if (key!=0){			
				elementIds += "," + element.id;
			}else{
				elementIds = element.id;
			}
		});

		$scope.dataElements = Elements.get({IdList:"[" + elementIds + "]"});	
	}
}])

HmisReportcontrollers.controller('IndicatorController',['$scope','IndicatorGroup',function($scope,IndicatorGroup){
	$scope.getIndicators = function(indicatorGrp){
		$scope.indicatorGrpParent4Toc = {displayName:"indicatorGroup "+indicatorGrp.displayName,id:indicatorGrp.id}
		$scope.indicatorGroup = IndicatorGroup.get({indicatorGrpId:indicatorGrp.id}, function(){
			addtoTOC($scope.toc,null,$scope.indicatorGrpParent4Toc,"indicatorGroup");
		}); 
	};

	// numinator and denominator description is in indicator description
	//(translatation doesn't work for denom and num columns) so have be extracted
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
}])

HmisReportcontrollers.config(function ($translateProvider) {
	  
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