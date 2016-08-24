/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

/*
 * 	@alias appModule.controller
 * 	@type {Controller}
 * 	@description Configures the appModule so it manages translations
 *	@todo
 */
appModule.controller('appSharedController', ['$scope', '$translate', '$state', '$location', '$stateParams', '$http', '$window', function($scope, $translate, $state, $location, $anchorScroll, $stateParams, $http, $window) {

    this.$route = $state;
    this.$location = $location;
    this.$routeParams = $stateParams;

    /*
     * 	@alias appModule.controller~ping
     * 	@type {Function}
     * 	@description Checks if session is not expired, if expired response is login-page(so then reload)
     * 	@todo
     */
    ping = function() {
        $.ajax({
                url: qryPing,
                dataType: "html",
                cache: false
            })
            .done(function(data) {
                if (data !== "pong") {
                    document.location;
                    document.location.reload(true);
                }
            });
    };

    /*
     * 	@alias appModule.controller~tabSwitch
     * 	@type {Function}
     * 	@description Triggers ping and startLoadingState functions
     * 	@todo
     */
    tabSwitch = function() {
        ping();
        startLoadingState(true);
    };

    /*
     * 	@alias appModule.controller~startLoadingState
     * 	@type {Function}
     * 	@description To make sure all emelemnts and indicators are loaded before printing
     * 	@todo
     */
    startLoadingState = function(onlyprint) {
        $(".printButton").prop("disabled", true);
        if (!onlyprint === true) {
            $(".loading").show();
        }
    };

    /*
     * 	@alias appModule.controller~endLoadingState
     * 	@type {Function}
     * 	@description To make sure all emelemnts and indicators are loaded before printing
     * 	@todo
     */
    endLoadingState = function(disableprint) {
        if (disableprint === true) {
            setTimeout(function() {
                $(".printButton").prop("disabled", false)
            }, 1000);
        }
        $(".loading").hide();
    };

}]);
