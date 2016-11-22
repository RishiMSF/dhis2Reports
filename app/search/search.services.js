/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

//dataElements - 255 KB as of 20/11/2106
var qry_dataElements = dhisUrl + 'dataElements.json?fields=id,code,displayName,displayFormName&paging=false&filter=domainType\\:eq\\:AGGREGATE';


//descriptions - 286 KB as of 20/11/2106
var qry_dataElementsDescriptions = dhisUrl + 'dataElements.json?fields=id,displayDescription&paging=false&filter=domainType\\:eq\\:AGGREGATE';

//dataSets - 258 KB as of 20/11/2106
var qry_dataElementsGroups = dhisUrl + 'dataElements.json?fields=id,dataSetElements[dataSet[displayName,id,code,attributeValues[value]]]&paging=false&filter=domainType\\:eq\\:AGGREGATE';


//indicators - 55 KB as of 20/11/2106
var qry_indicators = dhisUrl + 'indicators.json?fields=id,code,displayName&paging=false';

//indicators - 254 KB as of 20/11/2106
var qry_indicatorsDescriptions = dhisUrl + 'indicators.json?fields=id,displayDescription,numerator,denominator&paging=false';

//indicators - 80 KB as of 20/11/2106
var qry_indicatorGroups = dhisUrl + 'indicators.json?fields=id,indicatorGroups[id,code,displayName,attributeValues[value]]&paging=false';


//organisationUnitGroupSets - 231 B as of 20/11/2106
var qry_organisationUnitGroupSets = dhisUrl + 'organisationUnitGroupSets/BtFXTpKRl6n?fields=organisationUnitGroups[id,code,displayName]&paging=false';


searchModule.factory('searchAllFactory', ['$resource',function($resource) {
    return {

        //dataElements
        get_dataElements:               $resource(qry_dataElements,             {}, { query: {    method: 'GET',  isArray: false  }   }),
        get_dataElementsDescriptions:   $resource(qry_dataElementsDescriptions, {}, { query: {    method: 'GET',  isArray: false  }   }),
        get_dataElementsGroups:         $resource(qry_dataElementsGroups,       {}, { query: {    method: 'GET',  isArray: false  }   }),

        //indicators
        get_indicators:                 $resource(qry_indicators,               {}, { query: {    method: 'GET',  isArray: false  }   }),
        get_indicatorsDescriptions:     $resource(qry_indicatorsDescriptions,   {}, { query: {    method: 'GET',  isArray: false  }   }),
        get_indicatorGroups:            $resource(qry_indicatorGroups,          {}, { query: {    method: 'GET',  isArray: false  }   }),

        //organisationUnitGroupSet
        get_organisationUnitGroupSets:  $resource(qry_organisationUnitGroupSets,{}, { query: {    method: 'GET',  isArray: false  }   }),
    };
}]);


var qryAllDataElements = dhisUrl + 'dataElements.json?fields=code,displayName,id,displayFormName,displayDescription,sections[displayName,id],dataSets[displayName,id]&paging=false';

searchModule.factory('searchAllDataElementsFactory', ['$resource',
    function($resource) {
        return $resource(qryAllDataElements, {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);


var qryAllIndicators = dhisUrl + 'indicators.json?fields=displayName,id,displayFormName,displayDescription,indicatorGroups[displayName]&paging=false';

searchModule.factory('searchAllIndicatorsFactory', ['$resource',
    function($resource) {
        return $resource(qryAllIndicators, {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);


var qryAllDataElementsBis = dhisUrl + 'dataSets.json?fields=id,code,displayName,sections[id,displayName,dataElements[code,displayName,id,displayDescription]]&paging=false';
//var qryAllDataElementsBis = dhisUrl + 'dataSets.json?fields=id,code,displayName,sections[id,displayName,dataElements[code,displayName,id,displayDescription]],organisationUnits[parent[parent[parent[name,id,level],name,id,level],name,id,level],name,id,level]&paging=false';

searchModule.factory('searchAllDataElementsBisFactory', ['$resource',
    function($resource) {
        return $resource(qryAllDataElementsBis, {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);
