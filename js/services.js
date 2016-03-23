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

var qryIndicatorGrps= dhisUrl + 'indicatorGroups.json?fields=id,displayName&paging=false&filter=attributeValues.value\\:eq\\::serviceCode';
var qryIndicatorGrp= dhisUrl + 'indicators.json?fields=displayName,displayFormName,displayDescription&filter=indicatorGroups.id\\:eq\\::indicatorGrpId&paging=false';

var qryDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,sections[id]&paging=false&translate=true';
//var qryDataSet = dhisUrl + 'dataSets/:dataSetId.json?paging=false&translate=true';

var hmisReportServices = angular.module('hmisReportServices', ['ngResource']);

hmisReportServices.factory('Dossier', ['$resource',
function($resource){
  return $resource(qryDossier, {languageCode:'@languageCode',serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:true}
    });
}]);

hmisReportServices.factory('IndicatorGroup', ['$resource',
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

hmisReportServices.factory('IndicatorGroups', ['$resource',
function($resource){
  return $resource(qryIndicatorGrps, {serviceCode:'@serviceCode'}, {
      query: {method:'GET',  isArray:false}
    });
}]);
//qryIndicatorGrps

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

/* DATA SET */

hmisReportServices.factory('DataSets', ['$resource',
function($resource){
  return $resource(qryDataSets, {}, {
      query: {method:'GET',  isArray:true}
    });
}]);
