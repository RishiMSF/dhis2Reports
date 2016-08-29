/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

searchModule.controller('searchAllObjectsController', ['$scope', 'searchAllDataElementsFactory', 'searchAllIndicatorsFactory', function($scope, searchAllDataElementsFactory, searchAllIndicatorsFactory) {
    $('#search').tab('show');

    concatObjects = function(tablesList) {
        var temp = [];
        tablesList.forEach(function(table) {
            table.a.forEach(function(elem) {
                elem.type = table.t;
                temp.push(elem);
            });
        });
        return temp;
    }

    $scope.getAllObjects = function() {
        $scope.allObjects = [];
        startLoadingState(false);
        $scope.allDataElements = searchAllDataElementsFactory.get(function() {
            $scope.allIndicators = searchAllIndicatorsFactory.get(function() {
                $scope.allObjects = concatObjects([{
                    a: $scope.allDataElements.dataElements,
                    t: 'Data Element'
                }, {
                    a: $scope.allIndicators.indicators,
                    t: 'Indicator'
                }]);
                endLoadingState();
            });
        });
    }

    $scope.getAllDataElements = function() {
        $scope.allObjects = [];
        startLoadingState(false);
        $scope.allDataElements = searchAllDataElementsFactory.get(function() {
            $scope.allObjects = concatObjects([{
                a: $scope.allDataElements.dataElements,
                t: 'Data Element'
            }]);
            endLoadingState();
        });
    }

    $scope.getAllIndicators = function() {
        $scope.allObjects = [];
        startLoadingState(false);
        $scope.allIndicators = searchAllIndicatorsFactory.get(function() {
            $scope.allObjects = concatObjects([{
                a: $scope.allIndicators.indicators,
                t: 'Indicator'
            }]);
            endLoadingState();
        });
    }

    $scope.getDescription = function(indicator) {
        var re = /(.*)(NUM:)/;
        var result = re.exec(indicator.displayDescription);
        if (result !== null) {
            return result[1];
        } else {
            return indicator.displayDescription;
        }
    }

}]);
