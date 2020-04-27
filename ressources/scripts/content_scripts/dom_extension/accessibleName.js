/*
    Accessible Name and Description Computation 1.1
    W3C Recommendation 18 December 2018
    https://www.w3.org/TR/accname-1.1/
*/

/*
    Current Missing Implementations :
    * CSS Visibility Property.
    * Multiple-Selection Listboxes.
    Current Imperfect Implementations :
    * Replaced Elements (+ CSS Content).
    * Control Embedded in Label.
    * Labels for Native Controls (Multiple Labels + Labels for Some Controls like Buttons).
    * Aria-owns Property (Partially Supported - Only for Custom Listboxes).
    * Data (Separated Files).
*/

if (!HTMLElement.prototype.hasOwnProperty('accessibleName')) {
	Object.defineProperty(HTMLElement.prototype, 'accessibleName', {
		get: function () {
            // Data.
            var ARIA = {
                nameFromContentSupported: '[role="button"], [role="cell"], [role="checkbox"], [role="columnheader"], [role="gridcell"], [role="heading"], [role="link"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="radio"], [role="row"], [role="rowgroup"], [role="rowheader"], [role="switch"], [role="tab"], [role="tooltip"], [role="treeitem"]'
            };
            var controls = {
                nativetextboxes: 'input:not([type]), input[type="email"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], textarea',
                customtextboxes: '[contenteditable="true"], [role="textbox"]',
                nativebuttons: 'button, input[type="button"], input[type="image"], input[type="reset"], input[type="submit"]',
                custombuttons: '[role="button"]',
                customcomboboxes: '[role="combobox"]',
                nativelistboxes: 'select',
                customlistboxes: '[role="listbox"]',
                nativeranges: 'input[type="number"], input[type="range"], meter, progress',
                customranges: '[role="progressbar"], [role="scrollbar"], [role="slider"], [role="spinbutton"]'
            };
            var replacedElements = ['audio', 'canvas', 'embed', 'iframe', 'img', 'input', 'object', 'video'];        
            // Step 1 : Initialize - Set the total accumulated text to the empty string ("").
            var result = '';
            // Step 2 : Compute the text alternative for the current node.
            var accessibleNameWithAriaLabelledBy = false;
            if (this.hasAttribute('data-labelbytraversal') || this.isNotExposedDueTo.length == 0) {
                // 2-A (condition failed) : The current node is not hidden or is directly referenced by aria-labelledby.
                if (this.hasAttribute('aria-labelledby') && !this.hasAttribute('data-labelbytraversal') && !this.hasAttribute('data-controlembeddedinlabel')) {
                    /*
                        2-B :
                        * The current node has an aria-labelledby attribute that contains at least one valid IDREF.
                        * The current node is not already part of an aria-labelledby traversal.
                    */
                    var labelledby = this.getAttribute('aria-labelledby');
					if (labelledby.trim().length > 0) {
                        labelledby = labelledby.split(' ');
                        var nodes = [];
						for (var l = 0; l < labelledby.length; l++) {
							var labelledbyitem = document.getElementById(labelledby[l]);
							if (labelledbyitem) {
								nodes.push(labelledbyitem);
							}
						}
						if (nodes.length > 0) {
                            accessibleNameWithAriaLabelledBy = true;
                            var controlsselectors = [];
                            for (var specificcontrols in controls) {
                                controlsselectors.push(controls[specificcontrols]);
                            }
                            controlsselectors = controlsselectors.join(',');
							for (var i = 0; i < nodes.length; i++) {
                                if (nodes[i].matches(controlsselectors)) {
                                    nodes[i].setAttribute('data-controlembeddedinlabel', 'true');
                                }
                                nodes[i].setAttribute('data-labelbytraversal', 'true');
                                var an = nodes[i].accessibleName;
								result += (result != '' && an != '' ? ' ' : '') + an;
							}
						}
					}
                }
            }
            if ((result == '' || accessibleNameWithAriaLabelledBy == false) && this.isNotExposedDueTo.length == 0 || this.hasAttribute('data-labelbytraversal')) {
                var accessibleNameWithAriaLabel = false;
                if (!this.hasAttribute('data-controlembeddedinlabel')) {
                    if (this.hasAttribute('aria-label')) {
                        /*
                            2-C (condition success) :
                            * The current node has an aria-label attribute whose value is not the empty string (when trimmed of white space or not).
                            * If traversal of the current node is due to recursion and the current node is an embedded control as defined in step 2E, ignore aria-label and skip to rule 2E.
                        */
                        var label = this.getAttribute('aria-label');
                        if (label.trim() != '') {
                            accessibleNameWithAriaLabel = true;
                            result = label;
                        }
                    }
                }
                if (accessibleNameWithAriaLabel == false) {
                    if (this.hasAttribute('data-controlembeddedinlabel')) {
                        /*
                            2-C (condition failed) : The traversal of the current node is due to recursion and the current node is an embedded control.
                            2-E : The current node is a control embedded within the label (e.g. the label element in HTML or any element directly referenced by aria-labelledby) for another widget.
                        */
                        this.removeAttribute('data-controlembeddedinlabel');
                        if (this.matches(controls.nativetextboxes)) {
                            // If the embedded control has role textbox, return its value.
                            result = this.value;
                        }
                        else if (this.matches(controls.customtextboxes)) {
                            // If the embedded control has role textbox, return its value.
                            result = this.textContent;
                        }
                        else if (this.matches(controls.nativebuttons + ',' + controls.custombuttons)) {
                            // If the embedded control has role menu button, return the text alternative of the button.
                            result = this.accessibleName;
                        }
                        else if (this.matches(controls.customcomboboxes)) {
                            // If the embedded control has role combobox or listbox, return the text alternative of the chosen option.
                            result = this.matches(controls.nativetextboxes) ? this.value : this.textContent;
                        }
                        else if (this.matches(controls.nativelistboxes)) {
                            // If the embedded control has role combobox or listbox, return the text alternative of the chosen option.
                            if (this.hasAttribute('multiple')) {
                                
                            }
                            else {
                                if (this.selectedIndex > -1) {
                                    result = this.options[this.selectedIndex].accessibleName;
                                }
                            }
                        }
                        else if (this.matches(controls.customlistboxes)) {
                            // If the embedded control has role combobox or listbox, return the text alternative of the chosen option.
                            if (this.getAttribute('aria-multiselectable') == 'true') {
                                
                            }
                            else {
                                var option = this.querySelector('[role="option"][aria-selected]');
                                if (!option && this.hasAttribute('aria-owns')) {
                                    var owns = this.getAttribute('aria-owns');
                                    if (owns.trim().length > 0) {
                                        owns = owns.split(' ');
                                        var nodes = [];
                                        for (var o = 0; o < owns.length; o++) {
                                            var ownsitem = document.getElementById(owns[o]);
                                            if (ownsitem) {
                                                nodes.push(ownsitem);
                                            }
                                        }
                                        if (nodes.length > 0) {
                                            for (var i = 0; i < nodes.length; i++) {
                                                if (nodes[i].matches('[role="option"][aria-selected]')) {
                                                    option = nodes[i];
                                                }
                                                else {
                                                    option = nodes[i].querySelector('[role="option"][aria-selected]');
                                                }
                                                if (option) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (option) {
                                    result = option.accessibleName;
                                }
                            }
                        }
                        else if (this.matches(controls.nativeranges + ',' + controls.customranges)) {
                            // If the embedded control has role range (e.g., a spinbutton or slider).
                            if (this.hasAttribute('aria-valuetext')) {
                                result = this.getAttribute('aria-valuetext');
                            }
                            else if (this.hasAttribute('aria-valuenow')) {
                                result = this.getAttribute('aria-valuenow');
                            }
                            else if (this.matches(controls.nativeranges)) {
                                result = this.value;
                            }
                        }
                    }
                    else {
                        /*
                            D : Otherwise, if the current node's native markup provides an attribute (e.g. title) or element (e.g. HTML label) 
                            that defines a text alternative, return that alternative in the form of a flat string as defined by the host language, 
                            unless the element is marked as presentational (role="presentation" or role="none").
                            Comment: For example, in HTML, the img element's alt attribute defines a text alternative string, and the label element provides text for the referenced form element. In SVG2, the desc and title elements provide a description of their parent element.  
                        */
                        if (this.matches('area, img') && !this.matches('[role="none"], [role="presentation"]')) { // COMMENT : Not allowed on area & img with alt="text". 
                            if (this.hasAttribute('alt')) {
                                result = this.getAttribute('alt');
                            }
                            else if (this.hasAttribute('title')) {
                                /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                                result = this.getAttribute('title');
                            }
						}
                        else if (this.matches(controls.nativebuttons) && !this.matches('[role="none"], [role="presentation"]')) { // COMMENT : Not allowed on button, input[type="button"], input[type="image"], input[type="reset"], input[type="submit"].
                            if (this.matches('input[type="image"]')) {
                                if (this.hasAttribute('alt')) {
                                    result = this.getAttribute('alt');
                                }
                                else if (this.hasAttribute('title')) {
                                    /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                                    result = this.getAttribute('title');
                                }
                            }
                            else {
                                var parentcssbeforecontent = '';
                                var parentcssaftercontent = '';
                                if (replacedElements.indexOf(this.tagName.toLowerCase()) == -1) {
                                    parentcssbeforecontent = window.getComputedStyle(this, '::before').getPropertyValue('content');
                                    parentcssbeforecontent = parentcssbeforecontent == 'none' ? '' : parentcssbeforecontent.substring(1, parentcssbeforecontent.length - 1);
                                    parentcssaftercontent = window.getComputedStyle(this, '::after').getPropertyValue('content');
                                    parentcssaftercontent = parentcssaftercontent == 'none' ? '' : parentcssaftercontent.substring(1, parentcssaftercontent.length - 1);
                                }
                                result = parentcssbeforecontent;
                                if (this.matches('button')) {
                                    var nodes = this.childNodes;
                                    for (var i = 0; i < nodes.length; i++) {
                                        if (nodes[i].nodeType == Node.TEXT_NODE) {
                                            // 2-G : The current node is a Text node, return its textual contents.
                                            result += nodes[i].nodeValue;
                                        }
                                        else if (nodes[i].nodeType == Node.ELEMENT_NODE && nodes[i].isNotExposedDueTo.length == 0) {
                                            // 2-H : The current node is a descendant of an element whose Accessible Name is being computed, and contains descendants, proceed to 2F.i.
                                            var cssbeforecontent = '';
                                            var cssaftercontent = '';
                                            if (replacedElements.indexOf(nodes[i].tagName.toLowerCase()) == -1) {
                                                cssbeforecontent = window.getComputedStyle(nodes[i], '::before').getPropertyValue('content');
                                                cssbeforecontent = cssbeforecontent == 'none' ? '' : cssbeforecontent.substring(1, cssbeforecontent.length - 1);
                                                cssaftercontent = window.getComputedStyle(nodes[i], '::after').getPropertyValue('content');
                                                cssaftercontent = cssaftercontent == 'none' ? '' : cssaftercontent.substring(1, cssaftercontent.length - 1);
                                            }
                                            nodes[i].setAttribute('data-labelbytraversal', 'true');
                                            result += cssbeforecontent + nodes[i].accessibleName + cssaftercontent;
                                        }
                                    }
                                }
                                else {
                                    result += this.value;
                                }
                                result += parentcssaftercontent;
                                if (result == '' && this.hasAttribute('title')) {
                                    /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                                    result = this.getAttribute('title');
                                }
                            }
                        }
                        else if (this.matches(controls.nativelistboxes + ',' + controls.nativeranges + ',' + controls.nativetextboxes) && !this.matches('[role="none"], [role="presentation"]')) { // COMMENT : Not allowed on...
                            var labels = this.labels;
                            for (var i = 0; i < labels.length; i++) {
                                if (!labels[i].matches('[role="none"], [role="presentation"]')) {
                                    result += labels[i].accessibleName;
                                }
                            }
                        }
                        else if (this.matches('fieldset, table') && !this.matches('[role="none"], [role="presentation"]')) {
                            var elementname = this.firstElementChild;
                            if (elementname && !elementname.matches('[role="none"], [role="presentation"]')) {
                                if (elementname.matches('fieldset legend, table caption')) {
                                    result = elementname.accessibleName;
                                }
                            }
                            if (result == '' && this.hasAttribute('title')) {
                                /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                                result = this.getAttribute('title');
                            }
                        }
                        else if (this.matches('iframe[title]') && !this.matches('[role="none"], [role="presentation"]')) {
                            result = this.getAttribute('title');
						}
                        else if (!this.hasAttribute('role') || this.matches(ARIA.nameFromContentSupported)) { // Name from Content (TODO : implement it in ARIA).
                            var controlsselectors = [];
                            for (var specificcontrols in controls) {
                                controlsselectors.push(controls[specificcontrols]);
                            }
                            controlsselectors = controlsselectors.join(',');
                            var nodes = this.childNodes;
                            var parentcssbeforecontent = '';
                            var parentcssaftercontent = '';
                            if (replacedElements.indexOf(this.tagName.toLowerCase()) == -1) {
                                parentcssbeforecontent = window.getComputedStyle(this, '::before').getPropertyValue('content');
                                parentcssbeforecontent = parentcssbeforecontent == 'none' ? '' : parentcssbeforecontent.substring(1, parentcssbeforecontent.length - 1);
                                parentcssaftercontent = window.getComputedStyle(this, '::after').getPropertyValue('content');
                                parentcssaftercontent = parentcssaftercontent == 'none' ? '' : parentcssaftercontent.substring(1, parentcssaftercontent.length - 1);
                            }
                            result = parentcssbeforecontent;
                            for (var i = 0; i < nodes.length; i++) {
                                if (nodes[i].nodeType == Node.TEXT_NODE) {
                                    // 2-G : The current node is a Text node, return its textual contents.
                                    result += nodes[i].nodeValue;
                                }
                                else if (nodes[i].nodeType == Node.ELEMENT_NODE && nodes[i].isNotExposedDueTo.length == 0) {
                                    // 2-H : The current node is a descendant of an element whose Accessible Name is being computed, and contains descendants, proceed to 2F.i.
                                    var cssbeforecontent = '';
                                    var cssaftercontent = '';
                                    if (replacedElements.indexOf(nodes[i].tagName.toLowerCase()) == -1) {
                                        cssbeforecontent = window.getComputedStyle(nodes[i], '::before').getPropertyValue('content');
                                        cssbeforecontent = cssbeforecontent == 'none' ? '' : cssbeforecontent.substring(1, cssbeforecontent.length - 1);
                                        cssaftercontent = window.getComputedStyle(nodes[i], '::after').getPropertyValue('content');
                                        cssaftercontent = cssaftercontent == 'none' ? '' : cssaftercontent.substring(1, cssaftercontent.length - 1);
                                    }
                                    if (nodes[i].matches(controlsselectors)) {
                                        nodes[i].setAttribute('data-controlembeddedinlabel', 'true');
                                    }
                                    nodes[i].setAttribute('data-labelbytraversal', 'true');
                                    result += cssbeforecontent + nodes[i].accessibleName + cssaftercontent;
                                }
                            }
                            result += parentcssaftercontent;
                            if (result == '' && this.matches('a[href][title]')) {
                                /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                                result = this.getAttribute('title');
                            }
                        }
                    }
                }
            }
            this.removeAttribute('data-labelbytraversal');
            this.removeAttribute('data-controlembeddedinlabel');
            // 2-A (condition success) : The current node is hidden and is not directly referenced by aria-labelledby.
            // 2-B, 2-C, 2-D, 2-E, 2-F, 2-G, 2-H and 2-I : Otherwise...
			return result.trim();
		}
	});
}

if (!('hasAccessibleName' in HTMLElement.prototype)) {
    HTMLElement.prototype.hasAccessibleName = function () { return this.accessibleName != ''; };
}

if (!('getAccessibleNameImplementation' in HTMLElement.prototype)) {
    HTMLElement.prototype.getAccessibleNameImplementation = function () {};
}