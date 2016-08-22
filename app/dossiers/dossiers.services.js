/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

var qryServiceSections = dhisUrl + 'sections.json?fields=displayName,id,dataElements[id]&paging=false&filter=dataSet.id\\:eq\\::datasetId';
var qryServices = dhisUrl + 'organisationUnitGroupSets/BtFXTpKRl6n.json?fields=organisationUnitGroups[id,code,displayName]';
var qryServiceDataSets = dhisUrl + 'dataSets.json?fields=id,displayName,sections[id]&paging=false&filter=attributeValues.value\\:like\\::serviceCode';
var qryDossier = dhisUrl + 'organisationUnitGroups/:serviceId.json?fields=displayDescription&paging=false&locale=:languageCode';
var qryServiceIndicatorGrps = dhisUrl + 'indicatorGroups.json?fields=id,displayName&paging=false&filter=attributeValues.value\\:like\\::serviceCode';
var qryDataElements = dhisUrl + 'dataElements.json?fields=displayName,displayFormName,displayDescription,id,section[id]&paging=false&filter=id\\:in::IdList';
var qryIndicatorGrp = dhisUrl + 'indicators.json?fields=displayName,id,displayFormName,displayDescription&filter=indicatorGroups.id\\:eq\\::indicatorGrpId&paging=false';


dossiersModule.factory('dossiersServicesFactory', ['$resource',
    function($resource) {
        return $resource(qryServices, {}, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);

dossiersModule.factory('dossiersServiceDataSetsFactory', ['$resource',
    function($resource) {
        return $resource(qryServiceDataSets, {
            serviceCode: '@serviceCode'
        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);

dossiersModule.factory('dossiersDossierFactory', ['$resource',
    function($resource) {
        return $resource(qryDossier, {
            languageCode: '@languageCode',
            serviceId: '@serviceId'
        }, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
]);

dossiersModule.factory('dossiersServiceIndicatorGrpsFactory', ['$resource',
    function($resource) {
        return $resource(qryServiceIndicatorGrps, {
            serviceCode: '@serviceCode'
        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);

dossiersModule.factory('dossiersElementsFactory', ['$resource',
    function($resource) {
        return $resource(qryDataElements, {
            IdList: '@IdList'
        }, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
]);

dossiersModule.factory('dossiersSectionsFactory', ['$resource',
    function($resource) {
        return $resource(qryServiceSections, {
            datasetId: '@datasetId'
        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);

dossiersModule.factory('dossiersIndicatorGroupFactory', ['$resource',
    function($resource) {
        return $resource(qryIndicatorGrp, {
            indicatorGrpId: '@indicatorGrpId'
        }, {
            query: {
                method: 'GET',
                isArray: false
            }
        });
    }
]);
