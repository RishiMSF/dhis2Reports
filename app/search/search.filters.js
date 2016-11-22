/*------------------------------------------------------------------------------------
    List of contributors: https://github.com/MSFOCBA
    Please refer to the LICENSE.md and LICENSES-DEP.md for complete licenses.
------------------------------------------------------------------------------------*/

searchModule.filter('highlight', function($sce) {
    return function(text, phrase_glo, phrase_col, name) {
        if ((phrase_glo || (phrase_col && name )) && text) {
            text = text.replace(new RegExp('(' + phrase_glo + '|' + phrase_col[name] + ')', 'gi'), '<span class="highlighted">$&</span>');
        }
        return $sce.trustAsHtml(text);
    }
});
