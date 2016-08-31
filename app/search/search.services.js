/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

var qryAllDataElements = dhisUrl + 'dataElements.json?fields=displayName,id,displayFormName,displayDescription,section[id]&paging=false';
var qryAllIndicators = dhisUrl + 'indicators.json?fields=displayName,id,displayFormName,displayDescription,indicatorGroups[displayName]&paging=false';

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
