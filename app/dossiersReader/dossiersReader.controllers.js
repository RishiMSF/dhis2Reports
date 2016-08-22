/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

dossiersReaderModule.controller('dossiersReaderMainController', ['$scope', '$translate', 'dossiersDossierFactory', function($scope, $translate, dossiersDossierFactory) {
    ping();
    $scope.dossier = dossiersDossierFactory.get({
        languageCode: $translate.use(),
        serviceId: $scope.selectedService.id
    });
}]);
