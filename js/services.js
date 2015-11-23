var qryElementGrps = 'http://localhost:8989/dhis/api/dataElementGroups.json?paging=false&fields=[name,id]';
var qryElements = 'http://localhost:8989/dhis/api/dataElementGroups/:elementGrpId.json';
var qryDataSets = 'http://localhost:8989/dhis/api//dataSets.json?fields=id,displayName&paging=false&translate=true';
var qryDataSet = 'http://localhost:8989/dhis/api/dataSets/:dataSetId.json';
var qryDataElemenetsInSection = 'http://localhost:8989/dhis/api/sections/:dataSectionId.json';


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

/* 
1. Get datasection names and show in a list
2. For each datasection show the elements
3. Add data section for long text.

*/