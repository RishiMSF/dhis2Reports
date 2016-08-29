/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

var dhisroot = window.location.href.split('/api/')[0]
var dhisUrl = dhisroot + '/api/';

var qryPing = dhisUrl + 'system/ping';

appModule.factory('Ping', ['$resource',
    function($resource) {
        return $resource(qryPing, {}, {
            query: {
                method: 'GET',
                transformResponse: function(data, headers) {
                    //if no data return so no warnings
                    if (data == '') {
                        return;
                    }

                    return {
                        data: $.extend({}, eval("{" + data + '}'))
                    };
                }
            }
        });
    }
]);
