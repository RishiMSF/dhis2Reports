var HmisReportcontrollers = angular.module('HmisReportcontrollers',['ngSanitize','pascalprecht.translate']); 
/*'ui.tinymce' has to be added to angular.module for editor functionality*/

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
	    $.ajax({
		  url: qryPing,
		  dataType:"html",
		  cache: false
		})
		.done(function( data ) {
		    if (data!=="pong"){
             	document.location;
             	document.location.reload(true);
            }
		});
	}

	tabSwitch =function(){
		ping();
		startLoadingState(true);
	}

	loadIndicatorTab = function(){
		//will trigger loading gif otherwise :(
		if($('.nav-tabs .active').attr('id') !== "indicators"){
			startLoadingState(false);
		}else{
			endLoadingState();
		}
	}

	endLoadingState = function(){
		// to make sure all emelemnts and indicators are loaded before printing
		setTimeout( function(){$(".printButton").prop("disabled",false)}, 1000);
		$(".loading").hide();
	}

	startLoadingState = function(onlyprint){ 
		$(".printButton").prop("disabled",true);
		if(!onlyprint===true){
			$(".loading").show();
		}
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
      		startLoadingState(false);
			$scope.indicatorGroups =  ServiceIndicatorGrps.get({serviceCode:$scope.selectedService.code});
			$scope.serviceDataSets = ServiceDataSets.get({serviceCode:$scope.selectedService.code}); 
			$scope.dossier = Dossier.get({languageCode:$translate.use(),serviceCode:$scope.selectedService.code});
		}
	});
}]);


HmisReportcontrollers.controller('DataSetController', ['$scope', '$translate','DataSets', function($scope, $translate, DataSets){
	$scope.dataSets = DataSets.get();
	$('#dataSets').tab('show');  //only needed after a page refresh or url with tab# included
	
	
	$scope.resetToc = function(){
		ping();
		$scope.toc={
        	entries : []
    	};
	};

}]);

HmisReportcontrollers.controller('IndicatorGrpController', ['$scope', '$translate','IndicatorGroups', function($scope, $translate, IndicatorGroups){
	$('#indictorGroups').tab('show'); //only needed after a page refresh or url with tab# included


	$scope.toc={
        	entries : []
      	};

    $scope.doLayout = function(){
    	startLoadingState(false);
    }

    $scope.serviceCode = null;  
	$scope.indicatorGrps = IndicatorGroups.get({serviceCode:$scope.serviceCode});
}]);


HmisReportcontrollers.controller('SectionController', ['$scope','Sections', 'Ping', function($scope, Sections, Ping){
	$scope.$watch('selectedSet',function(){
		$scope.sections = Sections.get({datasetId:$scope.$parent.selectedSet.id},function(){
				addtoTOC($scope.toc,$scope.sections.sections,$scope.$parent.selectedSet,"dataset");	
				startLoadingState(false);
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

		$scope.dataElements = Elements.get({IdList:"[" + elementIds + "]"}, function(){
			endLoadingState();
		});	
	}
}])

HmisReportcontrollers.controller('IndicatorController',['$scope','IndicatorGroup','AllIndicators',function($scope,IndicatorGroup,AllIndicators){
	
	$scope.$watch('selectedGrp',function(){
		ping();
		if ($scope.$parent.selectedGrp){
			$scope.indicatorGrpParent4Toc = {displayName:"…Indicator Group "+$scope.$parent.selectedGrp.displayName,id:$scope.$parent.selectedGrp.id}
			$scope.indicatorGroup = IndicatorGroup.get({indicatorGrpId:$scope.$parent.selectedGrp.id}, function(){
				addtoTOC($scope.toc,null,$scope.indicatorGrpParent4Toc,"…Indicator Group");
				endLoadingState();
			});
		}else{
			$('#indicators').tab('show'); //only needed after a page refresh or url with tab# included
		}
	});

	$scope.getAllIndicators = function(){
		$scope.indicators = AllIndicators.get(function(){
			endLoadingState();
		});
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

	  $translateProvider.useSanitizeValueStrategy(null);
	  
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
