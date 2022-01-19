if (!HTMLElement.prototype.hasOwnProperty('availableARIASemantics')) Object.defineProperty(HTMLElement.prototype, 'availableARIASemantics', { get: getAvailableARIASemantics });

var isARIARoleAllowedOnMe = function () { return this.availableARIASemantics.indexOf('[role="' + role + '"]') > -1; };
if (!('isARIARoleAllowedOnMe' in HTMLElement.prototype)) HTMLElement.prototype.isARIARoleAllowedOnMe = isARIARoleAllowedOnMe;

if (!SVGElement.prototype.hasOwnProperty('fullAccessibleName')) Object.defineProperty(SVGElement.prototype, 'fullAccessibleName', { get: getAccessibleName });
if (!HTMLElement.prototype.hasOwnProperty('fullAccessibleName')) Object.defineProperty(HTMLElement.prototype, 'fullAccessibleName', { get: getAccessibleName });

var accessibleName = function () { return this.fullAccessibleName[0]; };
if (!('accessibleName' in SVGElement.prototype)) SVGElement.prototype.accessibleName = accessibleName;
if (!('accessibleName' in HTMLElement.prototype)) HTMLElement.prototype.accessibleName = accessibleName;

// hasAccessibleName.
var hasAccessibleName = function () { return this.fullAccessibleName[0].length > 0; };
if (!('hasAccessibleName' in SVGElement.prototype)) SVGElement.prototype.hasAccessibleName = hasAccessibleName;
if (!('hasAccessibleName' in HTMLElement.prototype)) HTMLElement.prototype.hasAccessibleName = hasAccessibleName;

if (!('getImplicitAriaRole' in HTMLElement.prototype)) HTMLElement.prototype.getImplicitAriaRole = getImplicitAriaRole;
if (!('getImplicitAriaRole' in SVGElement.prototype)) SVGElement.prototype.getImplicitAriaRole = getImplicitAriaRole;
if (!('getImplicitAriaRoleCategory' in HTMLElement.prototype)) HTMLElement.prototype.getImplicitAriaRoleCategory = getImplicitAriaRoleCategory;
if (!('getImplicitAriaRoleCategory' in SVGElement.prototype)) SVGElement.prototype.getImplicitAriaRoleCategory = getImplicitAriaRoleCategory;

if (!('hasValidLanguageCode' in SVGElement.prototype)) SVGElement.prototype.hasValidLanguageCode = hasValidLanguageCode;
if (!('hasValidLanguageCode' in HTMLElement.prototype)) HTMLElement.prototype.hasValidLanguageCode = hasValidLanguageCode;

if (!('getComputedAriaRole' in HTMLElement.prototype)) HTMLElement.prototype.getComputedAriaRole = getComputedAriaRole;
if (!('getComputedAriaRole' in SVGElement.prototype)) SVGElement.prototype.getComputedAriaRole = getComputedAriaRole;
if (!('hasValidRole' in HTMLElement.prototype)) HTMLElement.prototype.hasValidRole = hasValidRole;
if (!('hasValidRole' in SVGElement.prototype)) SVGElement.prototype.hasValidRole = hasValidRole;

if (!('hasInvalidAriaAttributes' in HTMLElement.prototype)) HTMLElement.prototype.hasInvalidAriaAttributes = hasInvalidAriaAttributes;
if (!('hasInvalidAriaAttributes' in SVGElement.prototype)) SVGElement.prototype.hasInvalidAriaAttributes = hasInvalidAriaAttributes;
if (!('hasAriaAttributesWithInvalidValues' in HTMLElement.prototype)) HTMLElement.prototype.hasAriaAttributesWithInvalidValues = hasAriaAttributesWithInvalidValues;
if (!('hasAriaAttributesWithInvalidValues' in SVGElement.prototype)) SVGElement.prototype.hasAriaAttributesWithInvalidValues = hasAriaAttributesWithInvalidValues;
if (!('hasProhibitedAriaAttributes' in HTMLElement.prototype)) HTMLElement.prototype.hasProhibitedAriaAttributes = hasProhibitedAriaAttributes;
if (!('hasProhibitedAriaAttributes' in SVGElement.prototype)) SVGElement.prototype.hasProhibitedAriaAttributes = hasProhibitedAriaAttributes;

if (!HTMLElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(HTMLElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });
//if (MathMLElement && !MathMLElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(MathMLElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });
if (!SVGElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(SVGElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });

var isVisible = function () {
    return getVisibility(this);
};

if (!HTMLElement.prototype.hasOwnProperty('isVisible')) Object.defineProperty(HTMLElement.prototype, 'isVisible', { get: isVisible });
//if (MathMLElement && !MathMLElement.prototype.hasOwnProperty('isVisible')) Object.defineProperty(MathMLElement.prototype, 'isVisible', { get: isVisible });
if (!SVGElement.prototype.hasOwnProperty('isVisible')) Object.defineProperty(SVGElement.prototype, 'isVisible', { get: isVisible });

if (!SVGElement.prototype.hasOwnProperty('canBeReachedUsingKeyboardWith')) {
    Object.defineProperty(SVGElement.prototype, 'canBeReachedUsingKeyboardWith', {
        get: function () {
            var result = [];
            if (this.hasAttribute('focusable')) {
                if (this.getAttribute('focusable') == 'true') {
                    result.push('svg:focusable');
                }
            }
            if (!this.matches('[focusable="false"]') && this.hasAttribute('tabindex') && parseInt(this.getAttribute('tabindex')) >= 0) {
                result.push('aria:tabindex');
            }
            return result;
        }
    });
}

if (!HTMLElement.prototype.hasOwnProperty('canBeReachedUsingKeyboardWith')) {
    Object.defineProperty(HTMLElement.prototype, 'canBeReachedUsingKeyboardWith', {
        get: function () {
            var result = [];
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
            return result;
        }
    });
}

if (!('isString1MatchString2' in HTMLElement.prototype)) HTMLElement.prototype.isString1MatchString2 = isString1MatchString2;
if (!('isString1MatchString2' in SVGElement.prototype)) SVGElement.prototype.isString1MatchString2 = isString1MatchString2;