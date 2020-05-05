var isNotExposedDueTo = function () {
	var result = [];
	if (this.getAttribute('aria-hidden') == 'true') {
		result.push('aria:hidden');
	}
	else {
		var ariahiddenfound = false;
		var pt = this.parentNode;
		while (pt && pt.nodeType == 1) {
			if (pt.getAttribute('aria-hidden') == 'true') {
				ariahiddenfound = true;
				break;
			}
			pt = pt.parentNode;
		}
		if (ariahiddenfound) {
			result.push('parent-aria:hidden');
		}
	}
	if (!this.matches('area')) {
		if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
			result.push('css:display');
		}
		if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
			result.push('css:visibility');
		}
	}
	else {
		var pt = this.parentNode;
		if (pt && pt.matches('map')) {
			var ptexposition = pt.isNotExposedDueTo;
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

if (!SVGElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(SVGElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });
if (!HTMLElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(HTMLElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });