/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

dossiersEditorModule.controller('dossiersEditorMainController', ['$scope', 'dossiersServicesFactory', 'dossiersDossierFactory', 'dossiersEditorTranslationFactory', 'dossiersEditorUpdateDescriptionFactory', function($scope, dossiersServicesFactory, dossiersDossierFactory, dossiersEditorTranslationFactory, dossiersEditorUpdateDescriptionFactory) {
    startLoadingState();

    $scope.tinymceModel = '-';

    $scope.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function() {
        $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.disableTinyEditor = function() {
        $scope.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            readonly: 1
        };

    };

    $scope.enableTinyEditor = function() {
        tinymce.activeEditor.setMode('design');
    };

    $scope.languages = {
        "languages": [{
            "language": "EN",
            "code": "en"
        }, {
            "language": "FR",
            "code": "fr"
        }, {
            "language": "ES",
            "code": "es"
        }, {
            "language": "PT",
            "code": "pt"
        }]
    };

    $scope.services = dossiersServicesFactory.get(function() {
        endLoadingState();
    });

    $scope.$watchGroup(['selectedService', 'selectedLanguage'], function(newValues, oldValues) {
        ping();

        if (!angular.isUndefined($scope.selectedLanguage) && !angular.isUndefined($scope.selectedService)) {
            startLoadingState();

            $scope.dossier = dossiersDossierFactory.get({
                languageCode: $scope.selectedLanguage.code,
                serviceId: $scope.selectedService.id
            }, function() {
                $scope.tinymceModel = $scope.dossier.displayDescription;
                endLoadingState();
            });

        }
    });

    $scope.saveDescription = function() {
        if (!angular.isUndefined($scope.selectedLanguage) && !angular.isUndefined($scope.selectedService)) {
            startLoadingState(false);

            console.log($scope.selectedLanguage.code);
            console.log($scope.selectedService.id);

            $scope.translation = dossiersEditorTranslationFactory.get({
                languageCode: $scope.selectedLanguage.code,
                serviceId: $scope.selectedService.id
            }, function() {

                console.log($scope.translation.translations[0]);
                if ($scope.translation.translations.length == 1) {

                    dossiersEditorUpdateDescriptionFactory.update({
                        translationId: $scope.translation.translations[0].id
                    },{
                        value: $scope.tinymceModel
                    }, function() {
                        console.log('ok',$scope.tinymceModel);
                        endLoadingState();
                    });
                } else {
                    console.log('dossiersEditor: Only one result expected!');
                }
            });
        }
    };
}]);
