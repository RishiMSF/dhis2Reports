var dhisUrl = window.location.href.split('/api/')[0] + '/api/';

//http://localhost:8989/dhis/api/system/info   , contextPath

var qryPing = dhisUrl + 'system/ping';

//var qryElementGrps = dhisUrl + 'dataElementGroups.json?paging=false&fields=[name,id]&paging=false&translate=true';
//var qryElements = dhisUrl + 'dataElementGroups/:elementGrpId.json&paging=false&translate=true';
var qryDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,code&paging=false&translate=true';
var qryDataSet = dhisUrl + 'dataSets/:dataSetId.json?paging=false&translate=true';
 var qrySections = dhisUrl + 'sections.json?fields=displayName,id, dataElements&paging=false'; 
//var qryDataElemenetsInSection = dhisUrl + 'dataElements.json?fields=dataSets[id,sections],displayName,displayFormName,id,displayDescription&filter=dataSets.sections.id\\:eq::sectionId&filter=dataSets.id\\:eq::dataSetId&paging=false&translate=true';
var qryDataElements = dhisUrl + 'dataElements.json?fields=displayName,displayFormName,displayDescription,id&paging=false&filter=id\\:in::IdList';

var qryServices = dhisUrl +  'dataElements.json?fields=id,displayDescription,code&paging=false&filter=name\\:like\\:ZZD';
var qryDossier  = dhisUrl + 'sqlViews/ehqwjoIcBmn/data.json?var=languageCode::languageCode&var=serviceCode::serviceCode';
var qryServiceDataSets = dhisUrl + 'dataSets?fields=name,id,[attributeValues]&filter=attributeValues.value\\:eq\\::serviceCode';

var qryIndicators = dhisUrl + 'sqlViews/d5JlCcexwOE/data?criteria=grpname::dataSetName&translate=true';
var qryIndicatorGrps= dhisUrl + 'indicatorGroups.json?fields=id,displayName&paging=false';
var qryIndicatorGrp= dhisUrl + 'indicators.json?fields=displayName,displayFormName,displayDescription&filter=indicatorGroups.id\\:eq::indicatorGrpId&paging=false';

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


hmisReportServices.factory('Elements', ['$resource',
function($resource){
	return $resource(qryDataElements, {IdList:'@IdList'}, {
      query: {method:'GET',  isArray:true}
    });
}]);

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


// hmisReportServices.factory('IndicatorGrpId', ['$resource',
// function($resource){
//   return $resource(qryIndicatorGrpId, {dataSetName:'@dataSetName'}, {
//       query: {method:'GET',  isArray:false}
//     });
// }]);

