var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
var textNodeList = [];

/**
 ** Get the relative luminance of an RGB color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * @param {string} color 
 * @returns 
 */
function getLuminance(color) {
	// table of red, green and blue values in 8bit
	var colorValues = color.substr(4, color.length - 1).split(',');

	// translate each color in sRGB
	var RsRGB = parseInt(colorValues[0].trim()) / 255;
	var GsRGB = parseInt(colorValues[1].trim()) / 255;
	var BsRGB = parseInt(colorValues[2].trim()) / 255;

	/**
	 ** define the RGB values to calculate the brightness
	 * @param {number} sRGB 
	 * @returns
	 */
	function getColor(sRGB) {
		return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow(((sRGB + 0.055) / 1.055), 2.4);
	}

	// calculation of the relative luminance
	return 0.2126 * getColor(RsRGB) + 0.7152 * getColor(GsRGB) + 0.0722 * getColor(BsRGB);
}

/**
 ** Get the contrast ratio
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 * @param {string} textColor 
 * @param {string} bgColor 
 * @returns 
 */
function getRatio(textColor, bgColor) {

	if(textColor && bgColor) {
		// the lighter of the colors
		var lum1 = Math.max(getLuminance(textColor), getLuminance(bgColor));
		// the darker of the colors
		var lum2 = Math.min(getLuminance(textColor), getLuminance(bgColor));

		// returns the contrast ratio rounded to 2 decimal
		return ((lum1 + 0.05) / (lum2 + 0.05)).toFixed(2);
	}

	return null;
}

/**
 * Get ratio target and check if contrast is valid
 * @param {string} size 
 * @param {number} weight 
 * @param {number} ratio 
 * @returns 
 */
function validContrast(size, weight, ratio) {
	var valid = [['target'], ['status']];
	valid.status = 0; // 0: cant tell - 1: invalid - 2: valid

	if(size && weight) {
		size = parseInt(size.split('px')[0]);

		// bold text
		if(weight >= 700) {
			// font-size < 18.5px
			if(size < 18.5) {
				valid.target = 4.5;
				if(ratio) {
					valid.status = (ratio >= 4.5) ? 2 : 1;
				}
			// font-size >= 18.5px
			} else {
				valid.target = 3;
				if(ratio) {
					valid.status = (ratio >= 3) ? 2 : 1;
				}
			}
		// normal text
		} else {
			// font-size < 24px
			if(size < 24) {
				valid.target = 4.5;
				if(ratio) {
					valid.status = (ratio >= 4.5) ? 2 : 1;
				}
			// font-size >= 24px
			} else {
				valid.target = 3;
				if(ratio) {
					valid.status = (ratio >= 3.1) ? 2 : 1;
				}
			}
		}
	}

	return valid;
}

/**
 * Get the background of the element
 * @param {node} element 
 * @returns 
 */
function getBgColor(element) {

	// if the element don't have a background color
	if(!window.getComputedStyle(element, null).getPropertyValue('background-color').match(/^rgb\(/)) {
		// check if he has a background image
		if(window.getComputedStyle(element, null).getPropertyValue('background-image') !== 'none') {
			return null; //TODO process the images
		} else {
			// get the parent node
			var parent = element.parentNode;
			// and check if he has a background image
			if(window.getComputedStyle(parent, null).getPropertyValue('background-image') !== 'none') {
				return null;
			// else, search bg color on each parent until find one
			} else {
				while(parent) {
					if(window.getComputedStyle(parent, null).getPropertyValue('background-color').match(/^rgb\(/)) {
						return window.getComputedStyle(parent, null).getPropertyValue('background-color');
					} else {
						parent = parent.parentNode;
					}
				}
			}
		}
	} else {
		// if the lement has a bg color, return it
		return window.getComputedStyle(element, null).getPropertyValue('background-color');
	}

	return null;
}

// get datas for each text node
while (tw.nextNode()) {
	var cn = tw.currentNode;
	var element = cn.parentNode;

	var size = window.getComputedStyle(element, null).getPropertyValue('font-size');
	var weight = window.getComputedStyle(element, null).getPropertyValue('font-weight');
	var textColor = window.getComputedStyle(element, null).getPropertyValue('color');
	var bgColor = getBgColor(element);
	var ratio = getRatio(textColor, bgColor);
	
	

	var o = {
		tag: element.tagName.toLowerCase(),
		text: cn.nodeValue,
		size: size,
		weight: weight,
		foreground: textColor,
		background: bgColor,
		ratio: ratio,
		xpath: getXPath(element),
		valid: validContrast(size, weight, ratio)
	};

	if (['noscript', 'script', 'style'].indexOf(o.tag) == -1 && o.text.trim().length > 0) {
		textNodeList.push(o);
	}
}

textNodeList;