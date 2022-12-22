/**
 ** use [htmlDatas.js, ariaDatas.js, implicitAriaRoles.js]
 */
var getComputedAriaRole = function () {
    if (this.hasAttribute('role')) {
        var role = this.getAttribute('role');
        if (role.trim().length > 0) {
            var roles = role.split(' ');
            var computedRole = null;
            if (roles.length > 1) {
                for (var i = 0; i < roles.length; i++) {
                    role = new ARIA.Role(roles[i]);
                    if (role.isValid()) {
                        computedRole = role.role;
                        break;
                    }
                }
                if (computedRole) {
                    if (computedRole == 'presentation' || computedRole == 'none') {
                        if (this.matches(focusableSelector.getFocusableElementsSelector())) {
                            return this.getImplicitAriaRole();
                        }
                    }
                    return computedRole;
                }
                else {
                    return this.getImplicitAriaRole();
                }
            }
            else {
                role = new ARIA.Role(role);
                if (role.isValid()) {
                    if (role.role == 'presentation' || role.role == 'none') {
                        if (this.matches(focusableSelector.getFocusableElementsSelector())) {
                            return this.getImplicitAriaRole();
                        }
                    }
                    return role.role;
                }
                else {
                    return this.getImplicitAriaRole();
                }
            }
        }
        else {
            return this.getImplicitAriaRole();
        }
    }
    else {
        return this.getImplicitAriaRole();
    }
};

var hasValidRole = function () {
    var role = this.getAttribute('role');
    if (role.trim().length > 0) {
        role = role.split(' ');
        if (role.length > 1) {
            var result = false;
            for (var i = 0; i < role.length; i++) {
                var token = new ARIA.Role(role[i]);
                if (token.isValid()) {
                    result = true;
                    break;
                }
            }
            return result;
        }
        else {
            role = new ARIA.Role(role);
            return role.isValid();
        }
    }
    else {
        return false;
    }
};