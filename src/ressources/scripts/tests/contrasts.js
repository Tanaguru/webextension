//? CONTRAST SCRIPT
var bgBody = true;
if(!window.getComputedStyle(document.body, null).getPropertyValue('background-color') && !window.getComputedStyle(document.body, null).getPropertyValue('background')) {
	document.body.style.backgroundColor = '#fff';
	bgBody = false;
}

var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

var textNodeList = {
	//? 'invalid', 'valid', 'cantTell' = contrast ratio status
	//? '45' = minimum contrast ratio : 4.5:1
	//? '3' = minimum contrast ratio : 3:1
	//? 'V' = non visible elements
	//? 'G' = font weight >= 700
	// 3.2.1
	invalid_45: [],
	invalid_45V: [],
	valid_45: [],
	valid_45V: [],
	cantTell_45: [],
	cantTell_45V: [],

	// 3.2.2
	invalid_45G: [],
	invalid_45GV: [],
	valid_45G: [],
	valid_45GV: [],
	cantTell_45G: [],
	cantTell_45GV: [],

	// 3.2.3
	invalid_3: [],
	invalid_3V: [],
	valid_3: [],
	valid_3V: [],
	cantTell_3: [],
	cantTell_3V: [],

	// 3.2.4
	invalid_3G: [],
	invalid_3GV: [],
	valid_3G: [],
	valid_3GV: [],
	cantTell_3G: [],
	cantTell_3GV: []
};

/**
 *TODO
 * text-shadow
 * image
 * positions (outside its parent)
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

	if(bgImage.match(/url\(/)) {
		return 'image';
	}

	if((opacity < 1 && !pbg) || (bgImage.match(/rgba\(/) && !pbg) || (bgColor.match(/rgba\(/) && !pbg)) {
		return null;
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
	var regexFilter = /opacity\( ?\d?.?\d+ ?\)/; // opacity(value)

	// we look for the lowest opacity value on the element & its parents
	while(element && element.tagName != 'HTML') {
		if(window.getComputedStyle(element, null).getPropertyValue('filter').match(regexFilter)) {
			var filterO = window.getComputedStyle(element, null).getPropertyValue('filter').match(regexFilter)[0];
			var value = filterO.substr(8, filterO.length - 9).trim();
			opacity = (value < opacity) ? value : opacity;
		}

		if(window.getComputedStyle(element, null).getPropertyValue('opacity') < opacity) {
			opacity = window.getComputedStyle(element, null).getPropertyValue('opacity');
		}
		
		element = element.parentNode;
	}

	return opacity;
}

/**
 ** Get element's visibility
 * @param {node} element 
 * @returns 
 */
 function getVisibility(element, opacity) {
	/**
	 ** checks if the element is hidden with :
	 * visibility: hidden
	 * opacity: 0
	 */
	if(window.getComputedStyle(element, null).getPropertyValue('visibility') === 'hidden' || opacity == 0) {
		return false;
	}

	// get DOMRect of element (size & position)
	var rect = element.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	// x - y positions
	var pos = { top: rect.top + scrollTop, left: rect.left + scrollLeft };

	/**
	 ** Checks if the element has a null width & not overflow its container
	 * display: none
	 * hidden attribute
	 * transform: scale(0)
	 */
	if(rect.width === 0 && !(element.scrollWidth > element.offsetWidth)) {
		return false;
	}

	// element positioned offscreen
	if((pos.top + rect.height <= 0) || (pos.left + rect.width <= 0)) {
		return false;
	}

	var regexClipP = /.{6,7}\(0px|.{6,7}\(.+[, ]0px/g; // circle(0) || ellipse(0)
	var regexClip = /rect\(0px,0px,0px,0px\)/; // rect(0)
	
	/**
	 ** checks if the element is hidden with :
	 * clip-path: circle(0) || ellipse(0)
	 * clip: rect(0,0,0,0) && position: absolute
	 * width: 0 && overflow: hidden
	 * height: 0 && overflow: hidden
	 */
	while(element && element.tagName != 'HTML') {

		if(
			window.getComputedStyle(element, null).getPropertyValue('clip-path').match(regexClipP)
			|| (window.getComputedStyle(element, null).getPropertyValue('clip').replace(/ /g, '').match(regexClip) && window.getComputedStyle(element, null).getPropertyValue('position').trim() === 'absolute')
			|| (element.offsetWidth === 0 && window.getComputedStyle(element, null).getPropertyValue('overflow').trim() === 'hidden')
			|| (element.offsetHeight === 0 && window.getComputedStyle(element, null).getPropertyValue('overflow').trim() === 'hidden')
		) {
			return false;
		} else {
			element = element.parentNode;
		}
	}
	
	return true;
}

/**
 ** Checks if the element is fully positioned inside its closest parent with a bgcolor
 * @param {node} element 
 * @returns 
 */
 function checkStacking(element, parent) {
	var position = window.getComputedStyle(element, null).getPropertyValue('position');

	if(position !== 'static') {
		if(getPosition(parent).top <= getPosition(element).top 
		&& getPosition(parent).left <= getPosition(element).left 
		&& getPosition(parent).bottom >= getPosition(element).bottom 
		&& getPosition(parent).right >= getPosition(element).right) {
			return true;
		}

		return false;
	}

	return true;
}

/**
 ** Get the closest node with a bg propertie
 * @param {node} element 
 * @returns 
 */
function getBg(element) {

	while(element && element.tagName != 'HTML') {
		if(window.getComputedStyle(element, null).getPropertyValue('background-image') !== 'none' 
		|| window.getComputedStyle(element, null).getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)') {
			return element;
		}

		element = element.parentNode;
	}

	return null;
}

/**
 ** Get element's position
 * @param {node} element 
 * @returns 
 */
function getPosition(element) {
	// get DOMRect of element (size & position)
	var rect = element.getBoundingClientRect(),
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft,
		bottom: rect.top + scrollTop + rect.height,
		right: rect.left + scrollLeft + rect.width
	};
}

/**
 ** Get final results (foreground, background, ratio, visibility)
 * @param {node} element 
 * @returns 
 */
function getResults(element, opacity) {
	var bg = getBg(element);
	var position = bg ? checkStacking(element, bg) : null;
	var bgOpacity = getOpacity(bg);

	// if the bg isn't opaque
	if(position && (bgOpacity < 1 || window.getComputedStyle(bg, null).getPropertyValue('background-image').match(/rgba\(/) || window.getComputedStyle(bg, null).getPropertyValue('background-color').match(/rgba\(/))) {
		var parent = getBg(bg.parentNode);

		// get its parent to calculate its RGB color
		if(parent) {
			var pPosition = checkStacking(bg, parent);
	
			// if the parent's bg is opaque, calculate the color
			if(pPosition && getOpacity(parent) === 1 && !window.getComputedStyle(parent, null).getPropertyValue('background-image').match(/rgba\(/) && !window.getComputedStyle(parent, null).getPropertyValue('background-color').match(/rgba\(/)) {
				var pbg = getBgColor(parent, 1, null);
				pbg = (pbg === 'image') ? null : pbg;
				var bgColors = getBgColor(bg, bgOpacity, pbg);
			} else {
				var bgColors = null;
			}
		} else {
			var bgColors = null;
		}
		
	} else if(position) {
		var bgColors = getBgColor(bg, bgOpacity, null);
	}

	if(bgColors && bgColors !== 'image') {
		var textColor = window.getComputedStyle(element, null).getPropertyValue('color');
		var colors = null;

		if(window.getComputedStyle(element, null).getPropertyValue('text-shadow') === 'none') {
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

			var ratio = getRatio(colors, bgColors);

			return {
				background: bgColors[0],
				ratio: ratio,
				visible: (getVisibility(element, opacity) && ratio > 1) ? true : false
			}
		} else {
			return {
				background: bgColors[0],
				ratio: null,
				visible: getVisibility(element, opacity)
			}
		}
		
	} else {
		return {
			background: bgColors,
			ratio: null,
			visible: getVisibility(element, opacity)
		}
	}
}

let textStart = new Date().getTime() / 1000;
// get datas for each text node
while(tw.nextNode()) {
	var cn = tw.currentNode;
	var element = cn.parentNode;

	// we don't process empty strings, nor script/noscript/style tags.
	if(cn.nodeValue.trim().length > 0 && ['noscript', 'script', 'style'].indexOf(element.tagName.toLowerCase()) == -1) {
		var disabledElements = ['button', 'fieldset', 'input', 'optgroup', 'option', 'select', 'textarea'];
		var size = window.getComputedStyle(element, null).getPropertyValue('font-size');
		var weight = window.getComputedStyle(element, null).getPropertyValue('font-weight');
		var opacity = getOpacity(element);
		var results = getResults(element, opacity);
		var isDisabled = (disabledElements.includes(element.tagName.toLowerCase()) && element.hasAttribute('disabled')) ? true : false;

		var o = {
			node: element,
			tag: element.tagName.toLowerCase(),
			text: cn.nodeValue,
			size: size,
			weight: weight,
			foreground: window.getComputedStyle(element, null).getPropertyValue('color'),
			background: results.background,
			ratio: results.ratio,
			xpath: getXPath(element),
			valid: validContrast(size, weight, results.ratio),
			role: {},
			isVisible: results.visible
		};

		if(o.valid.target == 4.5) {
			if(results.visible && !isDisabled && o.weight < 700) {
				if(o.valid.status == 2) {
					textNodeList.valid_45.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_45.push(o);
				} else {
					textNodeList.cantTell_45.push(o);
				}
			} else if(results.visible && !isDisabled) {
				if(o.valid.status == 2) {
					textNodeList.valid_45G.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_45G.push(o);
				} else {
					textNodeList.cantTell_45G.push(o);
				}
			} else if(o.weight < 700) {
				if(o.valid.status == 2) {
					textNodeList.valid_45V.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_45V.push(o);
				} else {
					textNodeList.cantTell_45V.push(o);
				}
			} else {
				if(o.valid.status == 2) {
					textNodeList.valid_45GV.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_45GV.push(o);
				} else {
					textNodeList.cantTell_45GV.push(o);
				}
			}
		} else {
			if(results.visible && !isDisabled && o.weight < 700) {
				if(o.valid.status == 2) {
					textNodeList.valid_3.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_3.push(o);
				} else {
					textNodeList.cantTell_3.push(o);
				}
			} else if(results.visible && !isDisabled) {
				if(o.valid.status == 2) {
					textNodeList.valid_3G.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_3G.push(o);
				} else {
					textNodeList.cantTell_3G.push(o);
				}
			} else if(o.weight < 700) {
				if(o.valid.status == 2) {
					textNodeList.valid_3V.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_3V.push(o);
				} else {
					textNodeList.cantTell_3V.push(o);
				}
			} else {
				if(o.valid.status == 2) {
					textNodeList.valid_3GV.push(o);
				} else if(o.valid.status == 1) {
					textNodeList.invalid_3GV.push(o);
				} else {
					textNodeList.cantTell_3GV.push(o);
				}
			}
		}
	}
}

let textEnd = new Date().getTime() / 1000;
console.log('Parcours des noeuds texte : ', textEnd - textStart);

if(!bgBody) document.body.style.backgroundColor = 'unset';

textNodeList;