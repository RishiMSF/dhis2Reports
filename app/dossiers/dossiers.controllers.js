/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

dossiersModule.controller('dossiersMainController', ['$scope', '$translate', '$anchorScroll', 'dossiersServicesFactory', 'dossiersServiceDataSetsFactory', 'dossiersDossierFactory', 'dossiersServiceIndicatorGrpsFactory', function($scope, $translate, $anchorScroll, dossiersServicesFactory, dossiersServiceDataSetsFactory, dossiersDossierFactory, dossiersServiceIndicatorGrpsFactory) {
    $('#dossiers').tab('show');

    /*
     * 	@alias appModule.controller~addtoTOC
     * 	@type {Function}
     * 	@description Add an element (section or indicator group) to the Dossier Table Of Content (TOC)
     *	@todo Move to dossier controller
     */
    addtoTOC = function(toc, items, parent, type) {
        var index = toc.entries.push({
            'parent': parent,
            'children': items
        });
    };

    /*
     * 	@alias appModule.controller~scrollTo
     * 	@type {Function}
     * 	@description Scroll to an element when clicking on the Dossier Table Of Content (TOC)
     *	@todo Move to dossier controller
     *	@todo Take header into accounts
     */
    $scope.scrollTo = function(id) {
        $anchorScroll.yOffset = 66;
        $anchorScroll(id);
    };

    startLoadingState(true);
    $scope.services = dossiersServicesFactory.get(function() {
        endLoadingState();
    });

    $scope.serviceDataSets = {};

    $scope.$watch('selectedService', function() {
        ping();
        $scope.toc = {
            entries: []
        };

        if ($scope.selectedService) {

            startLoadingState(false);
            $scope.indicatorGroups = dossiersServiceIndicatorGrpsFactory.get({
                serviceCode: '_' + $scope.selectedService.code.split('_')[2]
            });
            $scope.serviceDataSets = dossiersServiceDataSetsFactory.get({
                serviceCode: '_' + $scope.selectedService.code.split('_')[2]
            });
            $scope.dossier = dossiersDossierFactory.get({
                languageCode: $translate.use(),
                serviceId: $scope.selectedService.id
            });
        }
    });
}]);

dossiersModule.controller('dossiersSectionController', ['$scope', '$translate', 'dossiersSectionsFactory', 'Ping', function($scope, $translate, dossiersSectionsFactory, Ping) {

    // Added by BRaimbault, 2016-08-03
    // Quick filtering of "Comments" sections
    // ----------------------------------------------------------
    filterSections = function(sections, filterDisplayName) {
        var sectionsFiltered = {
            sections: []
        };
        if (sections) {
            sections.sections.forEach(function(section) {
                if (section.displayName != $translate.instant(filterDisplayName)) {
                    sectionsFiltered.sections.push(section);
                }
            });
        }
        return sectionsFiltered;
    };
    // ----------------------------------------------------------

    $scope.$watch('selectedSet', function() {
        $scope.sections = dossiersSectionsFactory.get({
            datasetId: $scope.$parent.selectedSet.id
        }, function() {
            $scope.sections = filterSections($scope.sections, "Comments");
            addtoTOC($scope.toc, $scope.sections.sections, $scope.$parent.selectedSet, "dataset");
            startLoadingState(false);
        });
    });
}]);

dossiersModule.controller('dossiersElementsTableController', ['$scope', 'dossiersElementsFactory', function($scope, dossiersElementsFactory) {

    $scope.getElementsInSection = function(section) {
        var elementIds;

        $scope.dataElements = {};

        angular.forEach(section.dataElements, function(element, key) {
            if (key != 0) {
                elementIds += "," + element.id;
            } else {
                elementIds = element.id;
            }
        });

        $scope.dataElements = dossiersElementsFactory.get({
            IdList: "[" + elementIds + "]"
        }, function() {
            endLoadingState();
        });
    }
}]);

dossiersModule.controller('dossiersIndicatorController', ['$scope', 'dossiersIndicatorGroupFactory', function($scope, dossiersIndicatorGroupFactory) {

    $scope.$watch('selectedGrp', function() {
        ping();
        if ($scope.$parent.selectedGrp) {
            $scope.indicatorGrpParent4Toc = {
                displayName: "…Indicator Group " + $scope.$parent.selectedGrp.displayName,
                id: $scope.$parent.selectedGrp.id
            }
            $scope.indicatorGroup = dossiersIndicatorGroupFactory.get({
                indicatorGrpId: $scope.$parent.selectedGrp.id
            }, function() {
                addtoTOC($scope.toc, null, $scope.indicatorGrpParent4Toc, "…Indicator Group");
                endLoadingState();
            });
        }
    });

    // numinator and denominator description is in indicator description
    //(translatation doesn't work for denom and num columns) so have be extracted
    $scope.getNuminator = function(indicator) {
        var re = /(NUM:)(.*)(DENOM:)/;
        var result = re.exec(indicator.displayDescription);
        if (result !== null) {
            return result.length > 1 ? result[2] : "x";
        }
    }

    $scope.getDenominator = function(indicator) {
        var re = /(DENOM:)(.*)/;
        var result = re.exec(indicator.displayDescription);
        if (result !== null) {
            return result.length > 1 ? result[2] : "x";
        }
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

    $scope.getIndicatorGroupNames = function(indicator) {
        var indicatorGroupNames;

        angular.forEach(indicator.indicatorGroups, function(indicatorGroup, key) {
            if (key != 0) {
                indicatorGroupNames += "," + indicatorGroup.displayName;
            } else {
                indicatorGroupNames = indicatorGroup.displayName;
            }
        });
        return indicatorGroupNames;
    }
}]);
