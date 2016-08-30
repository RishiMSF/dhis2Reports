/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

searchModule.filter('highlight', function($sce) {
    return function(text, phrase) {
        if (phrase && text) {
            text = text.replace(new RegExp('[' + phrase + ']+', 'gi'), '<span class="highlighted">$&</span>');
        }
        return $sce.trustAsHtml(text);
    }
});
