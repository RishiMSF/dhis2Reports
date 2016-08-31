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

            var translationsArray = [];

            $scope.translation = dossiersEditorTranslationFactory.get({
                languageCode: $scope.selectedLanguage.code,
                serviceId: $scope.selectedService.id
            }, function() {
                console.log($scope.translation);
                translationsArray.push({
                    "property": "DESCRIPTION",
                    "locale": $scope.selectedLanguage.code,
                    "value": $scope.tinymceModel
                });
            });

            $scope.languages.languages.forEach(function(lang) {
                if(lang.code != $scope.selectedLanguage.code){
                    dossiersEditorTranslationFactory.get({
                        languageCode: lang.code,
                        serviceId: $scope.selectedService.id
                    }, function(temp) {
                        console.log(temp);
                        if(temp.translations){
                            tempValue = temp.translations[0].value;
                        }else{
                            tempValue = " ";
                        }
                        translationsArray.push({
                            "property": "DESCRIPTION",
                            "locale": lang.code,
                            "value": tempValue
                        });

                        if (translationsArray.length == $scope.languages.languages.length) {
                            console.log(translationsArray);
                            dossiersEditorUpdateDescriptionFactory.update({
                                serviceId: $scope.selectedService.id
                            },{
                              "translations": translationsArray
                            }, function() {
                                $('#saveButton').removeClass('btn-warning');
                                $('#saveButton').removeClass('btn-danger');
                                $('#saveButton').addClass('btn-success');
                                endLoadingState();
                            });

                        }
                    });
                }
            });
        }
    };
}]);
