/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

var qryTranslation = dhisUrl + 'translations.json?fields=id,[className,locale,objectId,property]&filter=className\\:eq\\:OrganisationUnitGroup&filter=property\\:eq\\:description&filter=locale\\:eq\\::languageCode&filter=objectId\\:eq\\::serviceId&paging=false';
var qryUpdateDescription = dhisUrl + 'translations/:translationId';

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

dossiersEditorModule.factory('dossiersEditorUpdateDescriptionFactory', ['$resource',
    function($resource) {
        return $resource(qryUpdateDescription, {
            translationId: '@translationId'
        }, {
            update: {
                method: 'PATCH'
            }
        });
    }
]);
