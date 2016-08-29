/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

dossiersEditorModule.controller('dossiersEditorMainController', ['$scope', 'dossiersServicesFactory', 'dossiersDossierFactory', 'dossiersEditorTranslationFactory', 'dossiersEditorUpdateDescriptionFactory', function($scope, dossiersServicesFactory, dossiersDossierFactory, dossiersEditorTranslationFactory, dossiersEditorUpdateDescriptionFactory) {
    startLoadingState();

    $scope.tinymceOptions = {
        menu: {},
        plugins: 'link image table textcolor preview wordcount',
        toolbar: 'insertfile undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table | preview',
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        //statusbar: false,
        content_css: 'app/app.css.css, assets/fonts/rajdhani.css',
        resize: true,
        setup: function(ed) {
            ed.on('change', function(e) {
                $('#saveButton').removeClass('btn-default');
                $('#saveButton').addClass('btn-warning');
            });
        }
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
        endLoadingState(false);
    });

    $scope.$watchGroup(['selectedService', 'selectedLanguage'], function(newValues, oldValues) {
        ping();

        $('#saveButton').removeClass('btn-success');
        $('#saveButton').removeClass('btn-warning');
        $('#saveButton').removeClass('btn-danger');
        $('#saveButton').addClass('btn-default');
        $('#saveButton').addClass('disabled');
        $('#saveIcon').removeClass('glyphicon-floppy-disk');
        $('#saveIcon').addClass('glyphicon-time');

        if (!angular.isUndefined($scope.selectedLanguage) && !angular.isUndefined($scope.selectedService)) {
            startLoadingState();

            $scope.dossier = dossiersDossierFactory.get({
                languageCode: $scope.selectedLanguage.code,
                serviceId: $scope.selectedService.id
            }, function() {
                $scope.tinymceModel = $scope.dossier.displayDescription;

                setTimeout(function(){
                    $('#saveButton').removeClass('btn-success');
                    $('#saveButton').removeClass('btn-warning');
                    $('#saveButton').removeClass('btn-danger');
                    $('#saveButton').addClass('btn-default');
                    $('#saveButton').removeClass('disabled');
                    $('#saveIcon').removeClass('glyphicon-time');
                    $('#saveIcon').addClass('glyphicon-floppy-disk');

                    endLoadingState(false);
                }, 500);
            });
        }
    });

    $scope.saveDescription = function() {
        if (!angular.isUndefined($scope.selectedLanguage) && !angular.isUndefined($scope.selectedService)) {
            startLoadingState(false);
            $scope.translation = dossiersEditorTranslationFactory.get({
                languageCode: $scope.selectedLanguage.code,
                serviceId: $scope.selectedService.id
            }, function() {
                if ($scope.translation.translations.length == 1) {

                    console.log($scope.tinymceModel);

                    dossiersEditorUpdateDescriptionFactory.update({
                        translationId: $scope.translation.translations[0].id
                    },{
                        value: $scope.tinymceModel
                    }, function() {
                        $('#saveButton').removeClass('btn-warning');
                        $('#saveButton').removeClass('btn-danger');
                        $('#saveButton').addClass('btn-success');
                        endLoadingState();
                    });
                } else {
                    $('#saveButton').removeClass('btn-warning');
                    $('#saveButton').addClass('btn-danger');
                    console.log('dossiersEditor: Exactly one result expected from "qryTranslation"!');
                    endLoadingState();

                }
            });
        }
    };
}]);
