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

appModule.factory('csv_to_json', [
    function(csv) {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }
]);
