var dhisUrl = window.location.href.split('/api/')[0] + '/api/';

//var qryElementGrps = dhisUrl + 'dataElementGroups.json?paging=false&fields=[name,id]&paging=false&translate=true';
//var qryElements = dhisUrl + 'dataElementGroups/:elementGrpId.json&paging=false&translate=true';
var qryDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,code&paging=false&translate=true';
var qryDataSet = dhisUrl + 'dataSets/:dataSetId.json?paging=false&translate=true';
 var qrySections = dhisUrl + 'sections.json?fields=displayName,id, dataElements&paging=false'; 
//var qryDataElemenetsInSection = dhisUrl + 'dataElements.json?fields=dataSets[id,sections],displayName,displayFormName,id,displayDescription&filter=dataSets.sections.id\\:eq::sectionId&filter=dataSets.id\\:eq::dataSetId&paging=false&translate=true';
var qryDataElements = dhisUrl + 'dataElements.json?fields=displayName,displayFormName,displayDescription,id&paging=false&filter=id\\:in::IdList';

//var qryElement = dhisUrl + 'dataElements/:elementId.json?paging=false&translate=true'//

var qryDossierValue = dhisUrl + 'sqlViews/FbUqezq7Aqp/data?criteria=code::dataSetCode&translate=true';

var qryIndicators = dhisUrl + 'sqlViews/d5JlCcexwOE/data?criteria=grpname::dataSetName&translate=true';
var qryIndicatorGrps= dhisUrl + 'indicatorGroups.json?paging=false';
var qryIndicatorGrp= dhisUrl + 'indicators.json?fields=displayName,displayFormName,description&filter=indicatorGroups.id\\:eq::indicatorGrpId&paging=false';

//var qryIndicatorGrpId = 'http://localhost:8989/dhis/api/indicatorGroups.json?fields=id&paging=false&translate=true&filter=name:eq::dataSetName';
var hmisReportServices = angular.module('hmisReportServices', ['ngResource']);

// nerd challange use http://localhost:8989/dhis/api/dataElements?fields=dataSets[sections],id,displayName  to make calls more efficient.



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

hmisReportServices.factory('DossierValue', ['$resource',
function($resource){
  return $resource(qryDossierValue, {dataSetCode:'@dataSetCode'}, {
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


// hmisReportServices.factory('IndicatorGrpId', ['$resource',
// function($resource){
//   return $resource(qryIndicatorGrpId, {dataSetName:'@dataSetName'}, {
//       query: {method:'GET',  isArray:false}
//     });
// }]);

