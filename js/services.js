var qryElementGrps = 'http://localhost:8989/dhis/api/dataElementGroups/:elementGrpId.json?fields=dataElements[name,description]';
var hmisReportServices = angular.module('hmisReportServices', ['ngResource']);
var elementGrpId =  'Utm69ZvS4op';

hmisReportServices.factory('ElementGroup', ['$resource',
function($resource){
	return $resource(qryElementGrps,{elementGrpId:'@elementGrpId'},{
		query: {method:'GET', isArray:true}
	});
}]);



