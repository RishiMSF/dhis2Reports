/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

dossiersEditorModule.controller('dossiersEditorMainController', ['$scope', 'dossiersReaderMeFactory', 'dossiersServicesFactory', 'dossiersDossierFactory', 'dossiersEditorTranslationFactory', 'dossiersEditorUpdateDescriptionFactory', 'dossiersEditorCreateDescriptionFactory', function($scope, dossiersReaderMeFactory, dossiersServicesFactory, dossiersDossierFactory, dossiersEditorTranslationFactory, dossiersEditorUpdateDescriptionFactory, dossiersEditorCreateDescriptionFactory) {
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

    var me = dossiersReaderMeFactory.get({},function() {
        $scope.autho = me.userGroups[0].name == 'Administrators';
        console.log('dossiersEditor: User authorised to edit: ' + $scope.autho);
    });

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

                } else if ($scope.translation.translations.length == 0) {
                    dossiersEditorCreateDescriptionFactory.create({
                    },{
                        className: "OrganisationUnitGroup",
                        locale: $scope.selectedLanguage.code,
                        externalAccess: false,
                        property: "description",
                        value: $scope.tinymceModel,
                        objectId: $scope.selectedService.id,
                        access: {
                            read: true,
                            update: true,
                            externalize: false,
                            delete: true,
                            write: true,
                            manage: false
                        },
                        userGroupAccesses: []
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
