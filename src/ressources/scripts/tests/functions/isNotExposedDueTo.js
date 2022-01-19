var isNotExposedDueTo = function () {
    var result = [];
    if (this.getAttribute('aria-hidden') == 'true') {
        result.push('aria:hidden');
    }
    else {
        var pt = this.parentNode;
        while (pt && pt.nodeType == 1) {
            if (pt.getAttribute('aria-hidden') == 'true') {
                result.push('parent-aria:hidden');
                break;
            }
            pt = pt.parentNode;
        }
    }
    if (!this.matches('area')) {
        if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
            result.push('css:display');
        }
        else {
            var parent = this.parentNode;
            while (parent && parent.nodeType == 1) {
                if (window.getComputedStyle(parent, null).getPropertyValue('display') == 'none') {
                    result.push('css:display');
                    break;
                }
                parent = parent.parentNode;
            }
        }
    }
    
    if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
        result.push('css:visibility');
    }
    if (this.matches('area')) {
        var pt = this.parentNode;
        if (pt && pt.matches('map')) {
            if (pt.hasAttribute('name')) {
                var img = document.querySelector('img[usemap="#' + pt.getAttribute('name') + '"]');
                if (img) {
                    if (img.isNotExposedDueTo.length > 0) {
                        result.push('html:imagenotexposed');
                    }
                }
                else {
                    result.push('parent-html:noimage');
                }
            }
            else {
                result.push('parent-html:noname');
            }
        }
        else {
            result.push('parent-html:unknown');
        }
    }
    
    return result;
};