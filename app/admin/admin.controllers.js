/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

adminModule.controller('adminMainController', ['$scope', '$translate', 'adminFactory', function($scope, $translate, adminFactory) {
    ping();

    $('#admin').tab('show');
    $scope.loaded = false;

    startLoadingState(false);

    endLoadingState();

}]);
