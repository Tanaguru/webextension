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
 *TODO
 * text-shadow
 * image
 * element positionned off screen
 ** rgba bg on rgba parent
 */

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
 ** Get ratio target and check if contrast is valid
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
 ** Get RGB values
 * @param {string} value 
 * @returns 
 */
function getRGB(value) {
	// rgb(numbers, numbers, numbers) -> global
	var regex = /rgb\((?:\d+, ?\d+, ?\d+\))/g;
	return value.match(regex);
}

/**
 ** Translate RGBA values in RGB
 * @param {string} value 
 * @param {string} parent 
 * @returns 
 */
function getRGBA(value, parent, opacity) {
	// rgba(numbers, numbers, numbers, numbers) -> global
	var regex = /rgba\((?:\d+, ?\d+, ?\d+, ?\d?[,.]?\d*\))/g;
	var results = value.match(regex);
	var matches = [];

	results.forEach(result => {
		// table of red, green, blue and alpha values
		var colorValues = result.substr(5, result.length - 1).split(',');
		var R = parseInt(colorValues[0].trim());
		var G = parseInt(colorValues[1].trim());
		var B = parseInt(colorValues[2].trim());
		var a = parseFloat(colorValues[3].trim()) * opacity;

		// if opacity is 100%, its useless to translate
		if(a !== 1) {
			// for each color applied on the parent, calculate RGB values for the element's current RGBA color
			parent.forEach(el => {
				// table of red, green and blue values of the parent
				var parentValues = el.substr(4, el.length - 1).split(',');
				var Rp = parseInt(parentValues[0].trim());
				var Gp = parseInt(parentValues[1].trim());
				var Bp = parseInt(parentValues[2].trim());

				// translate RGBA to RGB
				var red = R === Rp ? R : Math.round(Rp * (1 - a) + R * a);
				var green = G === Gp ? G : Math.round(Gp * (1 - a) + G * a);
				var blue = B === Bp ? B : Math.round(Bp * (1 - a) + B * a);

				var rgbColor = 'rgb('+red+', '+green+', '+blue+')';
				matches.push(rgbColor);
			})
		} else {
			var rgbColor = 'rgb('+R+', '+G+', '+B+')';
			matches.push(rgbColor);
		}
	});

	return matches;
}

/**
 ** Get the background of the element
 * @param {node} element
 * @param {number} opacity
 * @param pbg
 * @returns 
 */
function getBgColor(element, opacity, pbg) {
	var bgColors = [];
	var bgImage = window.getComputedStyle(element, null).getPropertyValue('background-image');
	var bgColor = window.getComputedStyle(element, null).getPropertyValue('background-color');

	if(bgImage.match(/url\(/) || (opacity < 1 && !pbg) || (bgImage.match(/rgba\(/) && !pbg) || (bgColor.match(/rgba\(/) && !pbg)) {
		// if has bg image
		return null; //TODO process the images
	} else if(bgImage.match(/rgba?\(/g)) {
		// if there are colors like linear-gradient, get it
		if(bgImage.match(/rgba\(/)) {
			getRGBA(bgImage, pbg, opacity).forEach(result => {
				bgColors.push(result);
			});
		}

		if(bgImage.match(/rgb\(/)) {
			getRGB(bgImage).forEach(result => {
				if(opacity < 1) {
					var colorValues = result.substr(4, result.length - 1).split(',');
					var R = parseInt(colorValues[0].trim());
					var G = parseInt(colorValues[1].trim());
					var B = parseInt(colorValues[2].trim());
					var RGBA = 'rgba('+R+','+G+','+B+','+1+')';

					getRGBA(RGBA, pbg, opacity).forEach(el => {
						bgColors.push(el);
					});
				} else {
					bgColors.push(result);
				}
			});
		}
	} else if(bgColor.match(/rgba?\(/g)) {
		if(bgColor.match(/rgba\(/)) {
			getRGBA(bgColor, pbg, opacity).forEach(result => {
				bgColors.push(result);
			});
		} else if(bgColor.match(/rgb\(/)) {
			getRGB(bgColor).forEach(result => {
				if(opacity < 1) {
					var colorValues = result.substr(4, result.length - 1).split(',');
					var R = parseInt(colorValues[0].trim());
					var G = parseInt(colorValues[1].trim());
					var B = parseInt(colorValues[2].trim());
					var RGBA = 'rgba('+R+','+G+','+B+','+1+')';

					getRGBA(RGBA, pbg, opacity).forEach(el => {
						bgColors.push(el);
					});
				} else {
					bgColors.push(result);
				}
			});
		}
	} else {
		return null;
	}

	return bgColors;
}

/**
 ** Get element's opacity
 * @param {node} element 
 * @returns 
 */
function getOpacity(element) {
	var opacity = 1;

	while(element && element.tagName != 'HTML') {
		if(window.getComputedStyle(element, null).getPropertyValue('opacity') < opacity) {
			opacity = window.getComputedStyle(element, null).getPropertyValue('opacity');
		} else {
			element = element.parentNode;
		}
	}

	return opacity;
}

/**
 ** Get element's visibility
 * @param {node} element 
 * @returns 
 */
 function getVisibility(element) {

	while(element && element.tagName != 'HTML') {
		if(element.hasAttribute('hidden') || window.getComputedStyle(element, null).getPropertyValue('display') === 'none') {
			return false;
		} else {
			element = element.parentNode;
		}
	}

	return true;
}

/**
 ** Get element's position
 * @param {node} element 
 * @returns 
 */
 function getPosition(element) {
	var x = 1;
	while(element && element.tagName != 'HTML') {
		var position = window.getComputedStyle(element, null).getPropertyValue('position');
		if(position !== 'static' && position !== 'relative') {
			return {
				level: x,
				element: element
			};
		} else {
			x++;
			element = element.parentNode;
		}
	}

	return false;
}

function getBgLevel(element) {
	var x = 1;

	while(element && element.tagName != 'HTML') {
		if(window.getComputedStyle(element, null).getPropertyValue('background-image') !== 'none' || window.getComputedStyle(element, null).getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
			return {
				level: x,
				element: element
			}
		} else {
			x++;
			element = element.parentNode;
		}
	}

	return null;
}

/**
 ** Get final results (foreground, background, ratio)
 * @param {node} element 
 * @returns 
 */
function getResults(element, opacity) {
	var bg = getBgLevel(element);
	var bgP = getPosition(element);
	var position = (!bgP || bgP.level > bg.level) ? null : bgP;
	var bgOpacity = getOpacity(bg.element);

	if(!position && (bgOpacity < 1 || window.getComputedStyle(bg.element, null).getPropertyValue('background-image').match(/rgba\(/) || window.getComputedStyle(bg.element, null).getPropertyValue('background-color').match(/rgba\(/))) {
		var parent = getBgLevel(bg.element.parentNode);

		if(parent) {
			var parentP = getPosition(bg.element.parentNode);
			var pPosition = (!parentP || parentP.level > parent.level) ? null : parentP;
	
			if(!pPosition && getOpacity(parent.element) === 1 && !window.getComputedStyle(parent.element, null).getPropertyValue('background-image').match(/rgba\(/) && !window.getComputedStyle(parent.element, null).getPropertyValue('background-color').match(/rgba\(/)) {
				var pbg = getBgColor(parent.element, 1, null);
				var bgColors = getBgColor(bg.element, bgOpacity, pbg);
			} else {
				var bgColors = null;
			}
		} else {
			var bgColors = null;
		}
		
	} else if(!position) {
		// if the element isn't repositioned, get the background color
		var bgColors = getBgColor(bg.element, bgOpacity, null);
	}

	if(bgColors) {
		var textColor = window.getComputedStyle(element, null).getPropertyValue('color');
		var colors = null;

		// get RGB text color
		if(textColor.match(/rgb\(/)) {
			if(opacity < 1) {
				var colorValues = textColor.substr(4, textColor.length - 1).split(',');
				var R = parseInt(colorValues[0].trim());
				var G = parseInt(colorValues[1].trim());
				var B = parseInt(colorValues[2].trim());
				textColor = 'rgba('+R+','+G+','+B+','+1+')';
				colors = getRGBA(textColor, bgColors, opacity);
			} else {
				colors = getRGB(textColor);
			}
		} else if(textColor.match(/rgba\(/)) {
			colors = getRGBA(textColor, bgColors, opacity);
		} else {
			return null;
		}

		return {
			background: bgColors[0],
			ratio: getRatio(colors, bgColors)
		}
	} else {
		return null;
	}
}

// get datas for each text node
while (tw.nextNode()) {
	var cn = tw.currentNode;
	var element = cn.parentNode;

	// we don't process empty strings, nor script/noscript/style tags.
	if(cn.nodeValue.trim().length > 0 && ['noscript', 'script', 'style'].indexOf(element.tagName.toLowerCase()) == -1) {
		var opacity = getOpacity(element);
		// we exclude the hidden elements
		if(getVisibility(element) && window.getComputedStyle(element, null).getPropertyValue('visibility') !== 'hidden' && opacity > 0) {
			var size = window.getComputedStyle(element, null).getPropertyValue('font-size');
			var weight = window.getComputedStyle(element, null).getPropertyValue('font-weight');
			var results = getResults(element, opacity);
	
			var o = {
				tag: element.tagName.toLowerCase(),
				text: cn.nodeValue,
				size: size,
				weight: weight,
				foreground: window.getComputedStyle(element, null).getPropertyValue('color'),
				background: results ? results.background : null,
				ratio: results ? results.ratio : null,
				xpath: getXPath(element),
				valid: validContrast(size, weight, results ? results.ratio : null)
			};

			// we exclude elements with same foreground & background colors
			if(o.foreground !== o.background) {
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
}

textNodeList.push(invalid45, invalid3, cantTell45, cantTell3, valid345);
textNodeList;