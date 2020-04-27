var isNotVisibleDueTo = function () {
    var result = [];
    if (!(!!(this.offsetWidth || this.offsetHeight || this.getClientRects().length))) {
        result.push('css:other');
    }
    if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
        result.push('css:display');
    }
    if (window.getComputedStyle(this, null).getPropertyValue('opacity') == '0') {
        result.push('css:opacity');
    }
    if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
        result.push('css:visibility');
    }
    return result;
};

if (!SVGElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(SVGElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });
if (!HTMLElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(HTMLElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });