var getImplicitAriaRole = function () {
    if (htmlData.elements.hasOwnProperty(this.tagName.toLowerCase())) {
        var elementData = htmlData.elements[this.tagName.toLowerCase()];
        if (elementData.hasOwnProperty('implicitAriaRole')) {
            var result = null;
            var implicitAriaRole = elementData.implicitAriaRole;
            switch (implicitAriaRole.constructor) {
                case String:
                    result = implicitAriaRole;
                    break;
                case Object:
                    for (var selector in implicitAriaRole) {
                        if (this.matches(selector)) {
                            if (implicitAriaRole[selector].constructor == Object) {
                                if (implicitAriaRole[selector].type == 'integer' && implicitAriaRole[selector].hasOwnProperty('greaterthan')) {
                                    var attributeValue = this.getAttribute(implicitAriaRole[selector].attribute);
                                    if (/^(0|[1-9]\d*)$/.test(attributeValue)) {
                                        result = parseInt(attributeValue) > implicitAriaRole[selector].greaterthan;
                                        result = implicitAriaRole[selector].role[result ? 1 : 0];
                                    }
                                    else {
                                        result = implicitAriaRole[selector].role[0];
                                    }
                                }
                            }
                            else {
                                result = implicitAriaRole[selector];
                            }
                            break;
                        }
                    }
                    break;
            }
            return result;
        }
        else {
            return null;
        }
    }
    else {
        return undefined;
    }
};

var getImplicitAriaRoleCategory = function () {
    if (htmlData.elements.hasOwnProperty(this.tagName.toLowerCase())) {
        var elementData = htmlData.elements[this.tagName.toLowerCase()];
        if (elementData.hasOwnProperty('category')) {
            return elementData.category;
        }
        else {
            return null;
        }
    }
    else {
        return undefined;
    }
};