var canBeReachedUsingKeyboardWith = function () {
    var result = [];
    if(this instanceof HTMLElement) {
        if (!this.matches('[tabindex="-1"]')) {
            switch (this.tagName.toLowerCase()) {
                case 'a':
                case 'area':
                    if (this.hasAttribute('href')) {
                        result.push('html:' + this.tagName.toLowerCase());
                    }
                    break;
                case 'input':
                case 'select':
                case 'textarea':
                case 'summary': 
                case 'button':
                    if (!this.hasAttribute('disabled')) {
                        result.push('html:' + this.tagName.toLowerCase());
                    }
                    break;
                case 'iframe':
                    result.push('html:' + this.tagName.toLowerCase());
                    break;
            }
            if (this.hasAttribute('contenteditable') && this.getAttribute('contenteditable') == 'true') {
                result.push('html:contenteditable');
            }
            if (this.hasAttribute('tabindex') && parseInt(this.getAttribute('tabindex')) >= 0) {
                result.push('aria:tabindex');
            }
        }
    }
    else {
        if (this.hasAttribute('focusable')) {
            if (this.getAttribute('focusable') == 'true') {
                result.push('svg:focusable');
            }
        }
        if (!this.matches('[focusable="false"]') && this.hasAttribute('tabindex') && parseInt(this.getAttribute('tabindex')) >= 0) {
            result.push('aria:tabindex');
        }
    }
    
    return result;
}