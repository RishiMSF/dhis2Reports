var HmisReportcontrollers = angular.module('HmisReportcontrollers',['ngSanitize','pascalprecht.translate','ui.tinymce']);

HmisReportcontrollers.controller('HmisReportCtrl', ['$scope','$translate','$route', '$location', '$anchorScroll', '$routeParams', '$http', '$window', function($scope, $translate,$route, $location, $anchorScroll, $routeParams, $http, $window){
	this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
		
    addtoTOC = function(toc,items,parent, type){
		var index = toc.entries.push({
			'parent':parent,
			 'children': items
		})
	};

	$scope.scrollTo = function (id) {
  		$anchorScroll(id);  
	}

	//checking if session is not expired, if expired response is login-page(so then reload)
	ping = function(){
		$http.get(qryPing).success(function(data, status, headers, config) {
     		if (headers()['login-page']){
     			document.location.reload(true);
     		}
  		}).error(function(data, status, headers, config) {});
	}

}]);

HmisReportcontrollers.controller('ServiceController',['$scope','$translate','Services','ServiceDataSets','Dossier', 'ServiceIndicatorGrps', function($scope,$translate,Services,ServiceDataSets,Dossier,ServiceIndicatorGrps){
		$scope.services = Services.get();
		$scope.serviceDataSets = {};

	$scope.$watch('selectedService',function(){	 	
		ping();
		$scope.toc={
        	entries : []
      	};
      	if ($scope.selectedService){
			$scope.indicatorGroups =  ServiceIndicatorGrps.get({serviceCode:$scope.selectedService.code});
			$scope.serviceDataSets = ServiceDataSets.get({serviceCode:$scope.selectedService.code}); 
			$scope.dossier = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.selectedService.code});
		}
	});

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


HmisReportcontrollers.controller('DataSetController', ['$scope', '$translate','DataSets', function($scope, $translate, DataSets){
	$scope.dataSets = DataSets.get();
	
	$scope.resetToc = function(){
		ping();
		$scope.toc={
        	entries : []
    	};
	};

}]);

HmisReportcontrollers.controller('IndicatorGrpController', ['$scope', '$translate','IndicatorGroups', function($scope, $translate, IndicatorGroups){
	$scope.toc={
        	entries : []
      	};

    $scope.serviceCode = null;  
	$scope.indicatorGrps = IndicatorGroups.get({serviceCode:$scope.serviceCode});
}]);


HmisReportcontrollers.controller('SectionController', ['$scope','Sections', 'Ping', function($scope, Sections, Ping){
	$scope.$watch('selectedSet',function(){
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

HmisReportcontrollers.controller('IndicatorController',['$scope','IndicatorGroup','AllIndicators',function($scope,IndicatorGroup,AllIndicators){
	
	$scope.$watch('selectedGrp',function(){
		ping();
		if ($scope.$parent.selectedGrp){
			$scope.indicatorGrpParent4Toc = {displayName:"indicatorGroup "+$scope.$parent.selectedGrp.displayName,id:$scope.$parent.selectedGrp.id}
			$scope.indicatorGroup = IndicatorGroup.get({indicatorGrpId:$scope.$parent.selectedGrp.id}, function(){
				addtoTOC($scope.toc,null,$scope.indicatorGrpParent4Toc,"indicatorGroup");
			});
		}
	});

	$scope.getAllIndicators = function(){
		$scope.indicators = AllIndicators.get();
		console.log("Hola");
	}

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

	$scope.getIndicatorGroupNames = function(indicator){
		var indicatorGroupNames;

		angular.forEach(indicator.indicatorGroups, function(indicatorGroup,key){
			if (key!=0){			
				indicatorGroupNames += "," + indicatorGroup.displayName;
			}else{
				indicatorGroupNames = indicatorGroup.displayName;
			}
		});		
		return indicatorGroupNames;
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
