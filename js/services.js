var qryElementGrps = 'http://localhost:8989/dhis/api/dataElementGroups.json?paging=false&fields=[name,id]';
var qryElements = 'http://localhost:8989/dhis/api/dataElementGroups/:elementGrpId.json?fields=dataElements[name,description]';
var hmisReportServices = angular.module('hmisReportServices', ['ngResource']);
var elementGrpId =  'Utm69ZvS4op';

hmisReportServices.factory('Elements', ['$resource',
function($resource){
	return $resource(qryElements,{elementGrpId:'@elementGrpId'},{
		query: {method:'GET', isArray:true}
	});
}]);

hmisReportServices.factory('ElementsGrps', ['$resource',
function($resource){
	return $resource(qryElementGrps);
}]);

