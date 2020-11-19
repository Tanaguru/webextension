var isNotVisibleDueTo = function () {
    var result = [];
    if (!(!!(this.offsetWidth || this.offsetHeight || this.getClientRects().length))) {
        result.push('css:other');
    }
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
    if (window.getComputedStyle(this, null).getPropertyValue('opacity') == '0') {
        result.push('css:opacity');
    }
    if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
        result.push('css:visibility');
    }
    return result;
};

if (!HTMLElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(HTMLElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });
if (MathMLElement && !MathMLElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(MathMLElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });
if (!SVGElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(SVGElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });