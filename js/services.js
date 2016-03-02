var dhisUrl = window.location.href.split('/api/')[0] + '/api/';

//http://localhost:8989/dhis/api/system/info   , contextPath

var qryPing = dhisUrl + 'system/ping';

//Health Service tab
var qryServiceSections = dhisUrl + 'sections.json?fields=displayName,id,dataElements[id]&paging=false&filter=dataSet.id\\:eq\\::datasetId'; 
var qryServices = dhisUrl +  'dataElements.json?fields=id,displayDescription,code&paging=false&filter=name\\:like\\:ZZD';
var qryDossier  = dhisUrl + 'sqlViews/ehqwjoIcBmn/data.json?var=languageCode::languageCode&var=serviceCode::serviceCode';
//only id because section Displynames are not transleted in these datasets(childeren aren't translated) (otherwise could have done all in one call :/ )
var qryServiceDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,sections[id]&paging=false&filter=attributeValues.value\\:eq\\::serviceCode';

var qryDataElements = dhisUrl + 'dataElements.json?fields=displayName,displayFormName,displayDescription,id,section[id]&paging=false&filter=id\\:in::IdList';


//var qryIndicatorGrpId = 'http://localhost:8989/dhis/api/indicatorGroups.json?fields=id&paging=false&translate=true&filter=name:eq::dataSetName';
var hmisReportServices = angular.module('hmisReportServices', ['ngResource']);



// hmisReportServices.factory('Elements', ['$resource',
// function($resource){
// 	return $resource(qryElements,{elementGrpId:'@elementGrpId'},{
// 		query: {method:'GET', isArray:true}
// 	});
// }]);

// hmisReportServices.factory('ElementsGrps', ['$resource',
// function($resource){
// 	//return $resource(qryElementGrps);
// 	return $resource(qryElementGrps, {}, {
//       query: {method:'GET',  isArray:false}
//     });
// }]);

hmisReportServices.factory('DataSets', ['$resource',
function($resource){
	return $resource(qryDataSets, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);

hmisReportServices.factory('DataSet', ['$resource',
function($resource){
	return $resource(qryDataSet, {dataSetId:'@dataSetId'}, {
      query: {method:'GET',  isArray:true}
    });
}]);

hmisReportServices.factory('Sections', ['$resource',
function($resource){
  return $resource(qrySections, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);


// hmisReportServices.factory('Elements', ['$resource',
// function($resource){
// 	return $resource(qryDataElements, {IdList:'@IdList'}, {
//       query: {method:'GET',  isArray:true}
//     });
// }]);

// hmisReportServices.factory('Element', ['$resource',
// function($resource){
//   return $resource(qryElement, {elementId:'@elementId'}, {
//       query: {method:'GET',  isArray:false}
//     });
// }]);


/*
hmisReportServices.factory('OrgUnitLanguage', ['$resource',
function($resource){
  return $resource(qryOrgUnitLanguage, {languageCode:'@languageCode'}, {
      query: {method:'GET',  isArray:true}
    });
}]);
*/

hmisReportServices.factory('Dossier', ['$resource',
function($resource){
  return $resource(qryDossier, {languageCode:'@languageCode',serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:true}
    });
}]);

hmisReportServices.factory('Indicators', ['$resource',
function($resource){
  return $resource(qryIndicators, {dataSetName:'@dataSetName'}, {
      query: {method:'GET',  isArray:false}
    });
}]);

hmisReportServices.factory('IndicatorGrps', ['$resource',
function($resource){
  return $resource(qryIndicatorGrps, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);

hmisReportServices.factory('IndicatorGrp', ['$resource',
function($resource){
  return $resource(qryIndicatorGrp, {indicatorGrpId:'@indicatorGrpId'}, {
      query: {method:'GET',  isArray:false}
    });
}]);


hmisReportServices.factory('ServiceDataSets', ['$resource',
function($resource){
  return $resource(qryServiceDataSets, {serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:false}
    });
}]);


hmisReportServices.factory('Services', ['$resource',
function($resource){
  return $resource(qryServices, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);

hmisReportServices.factory('ServiceSections', ['$resource',
function($resource){
  return $resource(qryServiceSections, {datasetId:'@datasetId'}, {
      query: {method:'GET',  isArray:false}
    });
}]);

hmisReportServices.factory('Elements', ['$resource',
function($resource){
  return $resource(qryDataElements, {IdList:'@IdList'}, {
      query: {method:'GET',  isArray:true}
    });
}]);

// hmisReportServices.factory('IndicatorGrpId', ['$resource',
// function($resource){
//   return $resource(qryIndicatorGrpId, {dataSetName:'@dataSetName'}, {
//       query: {method:'GET',  isArray:false}
//     });
// }]);

