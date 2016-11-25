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

searchModule.filter('filterOR', function() {
    return function(data, phrases){

        var temp = (data || []).filter(function(row) {
            //console.log(row);
            var keys = Object.keys(phrases);
            var cols = Object.keys(row);
            cols = cols.filter(function(item) {
                return item !== "$$hashKey";
            });
            var temp1 = true;
            var temp2 = false;
            //console.log(phrases, keys);
            keys.forEach(function(key) {
                var mots = phrases[key].split('||');
                mots = mots.map(function(s) { return s.trim() });
                //console.log(mots);
                mots.forEach(function(mot) {
                    if(key !== '$'){
                        //console.log(key);
                        if(!(row[key] && (row[key].toLowerCase().search(mot.toLowerCase()) !== -1))){
                            //console.log(key, mot, row[key]);
                            temp1 = temp1 && false;
                        }
                    }else{
                        cols.forEach(function(col) {
                            if(row[col] && (row[col].toLowerCase().search(mot.toLowerCase()) !== -1)){
                                //console.log(col, mot, row[col]);
                                temp2 = true;
                            }
                        });
                    }
                });
            });
            return temp1 && (temp2 || phrases.$ == undefined);
        });
        //console.log(temp1);
        return temp;
    };
});
