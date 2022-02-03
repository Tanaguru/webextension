// hasValidLanguageCode.
var hasValidLanguageCode = function () {
    var r = /^[a-z]{2,}(-[a-z]{2,})*$/i;
    var lang1 = this.hasAttribute('lang') ? this.getAttribute('lang') : null;
    var lang2 = this.hasAttribute('xml:lang') ? this.getAttribute('xml:lang') : null;

    if(lang1 !== null && lang2 !== null) {
        var langA = lang1.includes('-') ? lang1.split('-')[0] : lang1;
        var langB = lang2.includes('-') ? lang2.split('-')[0] : lang2;
        
        if(langA != langB) {
            return false;
        } else {
            var lang = lang1;
        }
    } else if(lang1) {
        var lang = lang1;
    } else if(lang2) {
        var lang = lang2;
    }

    if (lang && r.test(lang)) {
        var computedlang = lang;
        if (lang.includes('-')) {
            computedlang = lang.split('-');
            computedlang = computedlang[0];
        }
        return languages.data.hasOwnProperty(computedlang);
    }
    else {
        return false;
    }
};