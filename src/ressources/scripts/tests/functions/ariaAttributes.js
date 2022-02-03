/**
 ** use [ariaDatas.js, ariaRoles.js]
 */
var hasInvalidAriaAttributes = function () {
    var result = false;
    for (var i = 0; i < this.attributes.length; i++) {
        var name = this.attributes[i].name;
        if (name.match(/^aria-/)) {
            var sp = new ARIA.StateProperty(name);
            if (!sp.isValid()) {
                result = true;
                break;
            }
        }
    }
    return result;
};

var hasAriaAttributesWithInvalidValues = function () {
    var errors = [];
    var result = false;
    for (var i = 0; i < this.attributes.length; i++) {
        var attribute = this.attributes[i];
        var name = attribute.name;
        if (name.match(/^aria-.*$/)) {
            var sp = new ARIA.StateProperty(name);
            var isValidValue = sp.isValidValue(attribute.value);
            if (isValidValue) {
                var values = sp.getValues();
                if (values.constructor == Object) {
                    if (values.hasOwnProperty('type')) {
                        if (values.type == 'integer' || values.type == 'number') {
                            var isOk = values.type == 'integer' ? /^(-|\+)?(0|[1-9]\d*)$/ : /^(-|\+)?\d+(\.(\d+))*$/;
                            if (values.hasOwnProperty('min') && values.min.constructor == String) {
                                if (this.hasAttribute(values.min)) {
                                    var min = this.getAttribute(values.min);
                                    if (isOk.test(min)) {
                                        min = values.type == 'integer' ? parseInt(min) : parseFloat(min);
                                        var value = values.type == 'integer' ? parseInt(attribute.value) : parseFloat(attribute.value);
                                        var minResult = !(min <= value);
                                        if (minResult) {
                                            var error = ARIA.Errors.ValueLowerThanMin;
                                            error = error.replace('{{attribute}}', attribute.name);
                                            error = error.replace('{{min}}', values.min);
                                            errors.push(error);
                                        }
                                    }
                                }
                            }
                            if (values.hasOwnProperty('max') && values.max.constructor == String) {
                                if (this.hasAttribute(values.max)) {
                                    var max = this.getAttribute(values.max);
                                    if (isOk.test(max)) {
                                        max = values.type == 'integer' ? parseInt(max) : parseFloat(max);
                                        var value = values.type == 'integer' ? parseInt(attribute.value) : parseFloat(attribute.value);
                                        var maxResult = !(max >= value);
                                        if (maxResult) {
                                            var error = ARIA.Errors.ValueGreaterThanMax;
                                            error = error.replace('{{attribute}}', attribute.name);
                                            error = error.replace('{{max}}', values.max);
                                            errors.push(error);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (values.hasOwnProperty('attribute')) {
                        if (values.attribute == 'id') {
                            if (values.multiple) {
                                var mode = 'strict';
                                if (arguments.length == 1 && arguments[0].constructor == Object) {
                                    if (arguments[0].permissive) {
                                        mode = 'permissive';
                                    }
                                }
                                var ids = attribute.value.split(' ');
                                if (mode == 'strict') {
                                    var notFoundElements = [];
                                    for (var j = 0; j < ids.length; j++) {
                                        if (!document.getElementById(ids[j])) {
                                            notFoundElements.push(ids[j]);
                                        }
                                    }
                                    if (notFoundElements.length > 0) {
                                        errors.push(ARIA.Errors.TokensIdValueElements.replace('{{attribute}}', attribute.name));
                                    }
                                }
                                else {
                                    var foundElement = false;
                                    for (var j = 0; j < ids.length; j++) {
                                        if (document.getElementById(ids[j])) {
                                            foundElement = true;
                                            break;
                                        }
                                    }
                                    if (!foundElement) {
                                        errors.push(ARIA.Errors.TokensIdValueElements.replace('{{attribute}}', attribute.name));
                                    }
                                }
                            }
                            else {
                                if (!document.getElementById(attribute.value)) {
                                    errors.push(ARIA.Errors.SingleIdValueElement.replace('{{attribute}}', attribute.name));
                                }
                            }
                        }
                    }
                }
            }
            else if (isValidValue == undefined) {
                errors.push(ARIA.Errors.InvalidStateProperty.replace('{{attribute}}', attribute.name));
            }
            else {
                result = true;
            }
        }
    }
    if (!result && errors.length > 0) {
        result = true;
    }
    return result;
};

var hasProhibitedAriaAttributes = function () {
    var result = false;
    for (var i = 0; i < this.attributes.length; i++) {
        var attribute = this.attributes[i];
        var name = attribute.name;
        if (name.match(/^aria-/)) {
            var sp = new ARIA.StateProperty(name);
            result = sp.isAllowedInRole(this.getComputedAriaRole());
            result = result == undefined ? false : !result;
            if (result) {
                break;
            }
        }
    }
    return result;
};