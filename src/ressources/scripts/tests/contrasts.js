if(!document.body.style.backgroundColor && !document.body.style.background) {
	document.body.style.backgroundColor = '#fff';
}
var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
var textNodeList = [];

// create a table by status
var invalid45 = ['failed', 'Ces éléments doivent respecter un ratio de contraste de 4.5:1', 'Invalidé', []];
var invalid3 = ['failed', 'Ces éléments doivent respecter un ratio de contraste de 3:1', 'Invalidé', []];
var valid345 = ['passed', 'Ces éléments ont un ratio de contraste valide', 'Validé', []];
var cantTell45 = ['cantTell', 'Vérifier que ces éléments respectent un ratio de contraste de 4.5:1', 'Indéterminé', []];
var cantTell3 = ['cantTell', 'Vérifier que ces éléments respectent un ratio de contraste de 3:1', 'Indéterminé', []];

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
 * @param {array} textColor 
 * @param {array} bgColor 
 * @returns 
 */
function getRatio(textColor, bgColor) {

	if(textColor && bgColor) {
		var minRatio = 21;

		bgColor.forEach(bg => {
			textColor.forEach(fg => {
				// the lighter of the colors
				var lum1 = Math.max(getLuminance(fg), getLuminance(bg));
				// the darker of the colors
				var lum2 = Math.min(getLuminance(fg), getLuminance(bg));

				// current ratio
				var currentRatio = ((lum1 + 0.05) / (lum2 + 0.05));

				// change minRatio if the current ratio < previously min ratio
				minRatio = (currentRatio < minRatio) ? currentRatio : minRatio;
			})
		});
		
		// returns the contrast ratio rounded to 2 decimal
		return minRatio.toFixed(2);
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
	var valid = {
		target: null,
		status: 0 // 0: cant tell - 1: invalid - 2: valid
	}

	if(size && weight) {
		// console.log(size, weight);
		size = parseFloat(size.split('px')[0]);

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
 * Get colors on property
 * @param {string} value 
 * @returns 
 */
function getColors(value) {
	if(value.match(/rgb\(/)) {
		var regex = /rgb\((?:\d+, ?\d+, ?\d+\))/g; // rgb(numbers, numbers, numbers) -> global
		return value.match(regex);
	} else if(value.match(/rgba\(/)) {
		var regex = /rgba\((?:\d+, ?\d+, ?\d+, ?\d?[,.]?\d*\))/g; // rgba(numbers, numbers, numbers, numbers) -> global
		var results = value.match(regex);
		var matches = [];

		results.forEach(result => {
			// table of red, green, blue and alpha values
			var colorValues = result.substr(5, result.length - 1).split(',');

			var R = parseInt(colorValues[0].trim());
			var G = parseInt(colorValues[1].trim());
			var B = parseInt(colorValues[2].trim());
			var a = parseFloat(colorValues[3].trim());
			
			// translate RGBA to RGB
			var red = Math.round(255 * (1 - a) + R/10);
			var green = Math.round(255 * (1 - a) + G/10);
			var blue = Math.round(255 * (1 - a) + B/10);

			var rgbColor = 'rgb('+red+', '+green+', '+blue+')';
			matches.push(rgbColor);
		});

		return matches;
	}
}

/**
 * Get the background of the element
 * @param {node} element 
 * @returns 
 */
function getBgColor(element) {

	if(window.getComputedStyle(element, null).getPropertyValue('background-image').match(/url\(/)) {
		// if has bg image
		return null; //TODO process the images
	} else if(window.getComputedStyle(element, null).getPropertyValue('background-image').match(/rgba?\(/g)) {
		// if there are colors like linear-gradient, get it
		return getColors(window.getComputedStyle(element, null).getPropertyValue('background-image'));
	} else if(window.getComputedStyle(element, null).getPropertyValue('background-color').match(/rgba?\(/g)) {
		return getColors(window.getComputedStyle(element, null).getPropertyValue('background-color'));
	} else {
		// get the parent node
		var parent = element.parentNode;
		
		while(parent) {
			if(window.getComputedStyle(parent, null).getPropertyValue('background-image').match(/url\(/)) {
				return null;
			} else if(window.getComputedStyle(parent, null).getPropertyValue('background-image').match(/rgba?\(/g)) {
				return getColors(window.getComputedStyle(parent, null).getPropertyValue('background-image'));
			} else if(window.getComputedStyle(parent, null).getPropertyValue('background-color').match(/rgba?\(/g)) {
				return getColors(window.getComputedStyle(parent, null).getPropertyValue('background-color'));
			} else {
				parent = parent.parentNode;
			}
		}

		return null;
	}
}

// get datas for each text node
while (tw.nextNode()) {
	var cn = tw.currentNode;
	if(cn.nodeValue.trim().length > 0) {
		var element = cn.parentNode;

		var size = window.getComputedStyle(element, null).getPropertyValue('font-size');
		var weight = window.getComputedStyle(element, null).getPropertyValue('font-weight');
		var textColor = getColors(window.getComputedStyle(element, null).getPropertyValue('color'));
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

		if (['noscript', 'script', 'style'].indexOf(o.tag) == -1) {
			if(o.valid.target == 4.5) {
				if(o.valid.status == 2) {
					valid345[3].push(o);
				} else if(o.valid.status == 1) {
					invalid45[3].push(o);
				} else {
					cantTell45[3].push(o);
				}
			} else {
				if(o.valid.status == 2) {
					valid345[3].push(o);
				} else if(o.valid.status == 1) {
					invalid3[3].push(o);
				} else {
					cantTell3[3].push(o);
				}
			}
		}
	}
}

textNodeList.push(invalid45, invalid3, cantTell45, cantTell3, valid345);
textNodeList;