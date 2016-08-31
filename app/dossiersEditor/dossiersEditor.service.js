/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

var qryTranslation = dhisUrl + 'organisationUnitGroups/:serviceId.json?fields=translations&filter=translations.property\\:eq\\:DESCRIPTION&locale=:languageCode';
var qryTranslationOLD = dhisUrl + 'translations.json?fields=id,[className,locale,objectId,property]&filter=className\\:eq\\:OrganisationUnitGroup&filter=property\\:eq\\:description&filter=locale\\:eq\\::languageCode&filter=objectId\\:eq\\::serviceId&paging=false';
var qryUpdateDescription = dhisUrl + 'organisationUnitGroups/:serviceId/translations';
var qryUpdateDescriptionOLD = dhisUrl + 'translations/:translationId';
var qryCreateDescription = dhisUrl + 'translations/';

dossiersEditorModule.factory('dossiersEditorTranslationFactory', ['$resource',
    function($resource) {
        return $resource(qryTranslation, {
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

dossiersEditorModule.factory('dossiersEditorTranslationFactoryOLD', ['$resource',
    function($resource) {
        return $resource(qryTranslationOLD, {
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

dossiersEditorModule.factory('dossiersEditorUpdateDescriptionFactory', ['$resource',
    function($resource) {
        return $resource(qryUpdateDescription, {
            serviceId: '@serviceId'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

dossiersEditorModule.factory('dossiersEditorUpdateDescriptionFactoryOLD', ['$resource',
    function($resource) {
        return $resource(qryUpdateDescriptionOLD, {
            translationId: '@translationId'
        }, {
            update: {
                method: 'PATCH'
            }
        });
    }
]);

dossiersEditorModule.factory('dossiersEditorCreateDescriptionFactory', ['$resource',
    function($resource) {
        return $resource(qryCreateDescription, {
        }, {
            create: {
                method: 'POST'
            }
        });
    }
]);
