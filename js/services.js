var qryElementGrps = 'http://localhost:8989/dhis/api/dataElementGroups.json?paging=false&fields=[name,id]';
var qryElements = 'http://localhost:8989/dhis/api/dataElementGroups/:elementGrpId.json';
var qryDataSets = 'http://localhost:8989/dhis/api//dataSets.json?fields=id,displayName,code&paging=false&translate=true';
var qryDataSet = 'http://localhost:8989/dhis/api/dataSets/:dataSetId.json';
var qryDataElemenetsInSection = 'http://localhost:8989/dhis/api/sections/:sectionId/dataElements.json';
var qryDossierValue = 'http://localhost:8989/dhis/api/sqlViews/FbUqezq7Aqp/data?criteria=code::dataSetCode';
var qryIndicators = 'http://localhost:8989/dhis/api/sqlViews/d5JlCcexwOE/data?criteria=grpname::dataSetName';

//var qryIndicatorGrpId = 'http://localhost:8989/dhis/api/indicatorGroups.json?fields=id&paging=false&translate=true&filter=name:eq::dataSetName';


var hmisReportServices = angular.module('hmisReportServices', ['ngResource']);

hmisReportServices.factory('Elements', ['$resource',
function($resource){
	return $resource(qryElements,{elementGrpId:'@elementGrpId'},{
		query: {method:'GET', isArray:true}
	});
}]);

hmisReportServices.factory('ElementsGrps', ['$resource',
function($resource){
	//return $resource(qryElementGrps);
	return $resource(qryElementGrps, {}, {
      query: {method:'GET',  isArray:false}
    });
}]);

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

hmisReportServices.factory('ElementsInSection', ['$resource',
function($resource){
	return $resource(qryDataElemenetsInSection, {sectionId:'@sectionId'}, {
      query: {method:'GET',  isArray:false}
    });
}]);

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


// hmisReportServices.factory('IndicatorGrpId', ['$resource',
// function($resource){
//   return $resource(qryIndicatorGrpId, {dataSetName:'@dataSetName'}, {
//       query: {method:'GET',  isArray:false}
//     });
// }]);

