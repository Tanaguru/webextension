var ariaroles = {
	'alert': { type: ['live region', 'standalone ui widget'] },
	'alertdialog': { type: 'standalone ui widget' },
	'application': { type: 'document structure' },
	'article': { type: 'document structure' },
	'banner': { type: 'landmark' },
	'button': { type: 'standalone ui widget', supportNameFromContents: true, supportedStatesProperties: ['aria-expanded', 'aria-pressed'] },
	'cell': { supportNameFromContents: true },
	'checkbox': { type: 'standalone ui widget', supportNameFromContents: true },
	'cell': { type: 'document structure' },
	'columnheader': { type: 'document structure', supportNameFromContents: true },
	'combobox': { type: 'composite ui widget' },
	'command': { type: 'abstract' },
	'complementary': { type: 'landmark' },
	'composite': { type: 'abstract' },
	'contentinfo': { type: 'landmark' },
	'definition': { type: 'document structure' },
	'dialog': { type: 'standalone ui widget' },
	'directory': { type: 'document structure' },
	'document': { type: 'document structure' },
	'feed': { type: 'document structure' },
	'figure': { type: 'document structure' },
	'form': { type: 'landmark' },
	'grid': { type: 'composite ui widget' },
	'gridcell': { type: 'standalone ui widget', supportNameFromContents: true },
	'group': { type: 'document structure' },
	'heading': { type: 'document structure', supportNameFromContents: true, requiredStatesProperties: 'aria-level', supportedStatesProperties: 'aria-expanded' },
	'img': { type: 'document structure' },
	'input': { type: 'abstract' },
	'landmark': { type: 'abstract' },
	'link': { type: 'standalone ui widget', supportNameFromContents: true },
	'list': { type: 'document structure' },
	'listbox': { type: 'composite ui widget' },
	'listitem': { type: 'document structure' },
	'log': { type: ['live region', 'standalone ui widget'] },
	'main': { type: 'landmark' },
	'marquee': { type: ['live region', 'standalone ui widget'] },
	'math': { type: 'document structure' },
	'menu': { type: 'composite ui widget' },
	'menubar': { type: 'composite ui widget' },
	'menuitem': { type: 'standalone ui widget', supportNameFromContents: true },
	'menuitemcheckbox': { type: 'standalone ui widget', supportNameFromContents: true },
	'menuitemradio': { type: 'standalone ui widget', supportNameFromContents: true },
	'navigation': { type: 'landmark' },
	'none': { type: 'document structure', supportNameFromAuthors: false },
	'note': { type: 'document structure' },
	'option': { type: 'standalone ui widget', supportNameFromContents: true },
	'presentation': { type: 'document structure', supportNameFromAuthors: false },
	'progressbar': { type: 'standalone ui widget' },
	'radio': { type: 'standalone ui widget', supportNameFromContents: true },
	'radiogroup': { type: 'composite ui widget' },
	'range': { type: 'abstract' },
	'region': { type: ['landmark', 'document structure'] },
	'roletype': { type: 'abstract' },
	'row': { type: 'document structure', supportNameFromContents: true },
	'rowgroup': { type: 'document structure', supportNameFromContents: true },
	'rowheader': { type: 'document structure', supportNameFromContents: true },
	'scrollbar': { type: 'standalone ui widget' },
	'search': { type: 'landmark' },
	'searchbox': { type: 'standalone ui widget' },
	'section': { type: 'abstract' },
	'sectionhead': { type: 'abstract' },
	'select': { type: 'abstract' },
	'separator': { type: 'document structure' },
	'slider': { type: 'standalone ui widget' },
	'spinbutton': { type: 'standalone ui widget' },
	'status': { type: ['live region', 'standalone ui widget'] },
	'structure': { type: 'abstract' },
	'switch': { type: 'standalone ui widget', supportNameFromContents: true },
	'tab': { type: 'standalone ui widget', supportNameFromContents: true },
	'table': { type: 'document structure' },
	'tablist': { type: 'composite ui widget' },
	'tabpanel': { type: 'standalone ui widget' },
	'term': { type: 'document structure' },
	'textbox': { type: 'standalone ui widget' },
	'timer': { type: ['live region', 'standalone ui widget'] },
	'toolbar': { type: 'document structure' },
	'tooltip': { type: 'standalone ui widget', supportNameFromContents: true },
	'tree': { type: 'composite ui widget', supportNameFromContents: true },
	'treegrid': { type: 'composite ui widget' },
	'treeitem': { type: 'standalone ui widget', supportNameFromContents: true },
	'widget': { type: 'abstract' },
	'window': { type: 'abstract' }
};

var ariastatesproperties = {
	'aria-activedescendant': { type: 'relationship' }, // id reference
	'aria-atomic': { type: 'live region', global: true, default: 'false', values: ['false', 'true'] },
	'aria-autocomplete': { type: 'widget', default: 'none', values: ['both', 'inline', 'list', 'none'] },
	'aria-busy': { type: 'live region', global: true, default: 'false', values: ['false', 'true'] },
	'aria-checked': { type: 'widget', default: 'undefined', values: ['false', 'mixed', 'true', 'undefined'] },
	'aria-colcount': { type: 'relationship' }, // integer
	'aria-colindex': { type: 'relationship' }, // integer
	'aria-colspan': { type: 'relationship' }, // integer
	'aria-controls': { type: 'relationship', global: true }, // id reference list
	'aria-current': { global: true, default: 'false', values: ['date', 'false', 'location', 'page', 'step', 'time', 'true'] },
	'aria-describedby': { type: 'relationship', global: true }, // id reference list
	'aria-details': { type: 'relationship', global: true }, // id reference
	'aria-disabled': { type: 'widget', global: true, default: 'false', values: ['false', 'true'] },
	'aria-dropeffect': { type: 'drag-and-drop', global: true, default: 'none', values: ['copy', 'execute', 'link', 'move', 'none', 'popup'] },
	'aria-errormessage': { type: ['relationship', 'widget'], global: true }, // id reference
	'aria-expanded': { type: 'widget', default: 'undefined', values: ['false', 'true', 'undefined'] },
	'aria-flowto': { type: 'relationship',global: true }, // id reference list
	'aria-grabbed': { type: 'drag-and-drop', global: true, default: 'undefined', values: ['false', 'true', 'undefined'], deprecated: true },
	'aria-haspopup': { type: 'widget', global: true, default: 'false', values: ['dialog', 'false', 'grid', 'listbox', 'menu', 'tree', 'true'] },
	'aria-hidden': { type: 'widget', global: true, default: 'undefined', values: ['false', 'true', 'undefined'] },
	'aria-invalid': { type: 'widget', global: true, default: 'false', values: ['false', 'grammar', 'spelling', 'true'] },
	'aria-keyshortcuts': { global: true }, // string
	'aria-label': { type: 'widget', global: true }, // string
	'aria-labelledby': { type: 'relationship', global: true }, // id reference list
	'aria-level': { type: 'widget' }, // integer (1 or +)
	'aria-live': { type: 'live region', global: true, default: 'off', values: ['assertive', 'off', 'polite'] },
	'aria-modal': { type: 'widget', default: 'false', values: ['false', 'true'] },
	'aria-multiline': { type: 'widget', default: 'false', values: ['false', 'true'] },
	'aria-multiselectable': { type: 'widget', default: 'false', values: ['false', 'true'] },
	'aria-orientation': { type: 'widget', default: 'undefined', values: ['horizontal', 'undefined', 'vertical'] },
	'aria-owns': { type: 'relationship', global: true }, // id reference list
	'aria-placeholder': { type: 'widget' }, // string
	'aria-posinset': { type: 'relationship' }, // integer
	'aria-pressed': { type: 'widget', default: 'undefined', values: ['false', 'mixed', 'true', 'undefined'] },
	'aria-readonly': { type: 'widget', default: 'false', values: ['false', 'true'] },
	'aria-relevant': { type: 'live region', global: true, values: ['additions', 'all', 'removals', 'text'], tokenlist: true },
	'aria-required': { type: 'widget', default: 'false', values: ['false', 'true'] },
	'aria-roledescription': { global: true }, // string
	'aria-rowcount': { type: 'relationship' }, // integer
	'aria-rowindex': { type: 'relationship' }, // integer
	'aria-rowspan': { type: 'relationship' }, // integer
	'aria-selected': { type: 'widget', default: 'undefined', values: ['false', 'true', 'undefined'] },
	'aria-setsize': { type: 'relationship' }, // integer
	'aria-sort': { type: 'widget', default: 'none', values: ['ascending', 'descending', 'other', 'none'] },
	'aria-valuemax': { type: 'widget' }, // number
	'aria-valuemin': { type: 'widget' }, // number
	'aria-valuenow': { type: 'widget' }, // number
	'aria-valuetext': { type: 'widget' } // string
};

Object.defineProperty(HTMLElement.prototype, 'availableARIASemantics', { get: function () {
	var selectors = [];
	switch (this.tagName.toLowerCase()) {
		case 'a':
			if (this.hasAttribute('href')) {
				selectors.push('[role="button"]', '[role="checkbox"]', '[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="option"]', '[role="radio"]', '[role="switch"]', '[role="tab"]', '[role="treeitem"]');
			}
			else {
				for (var ariarole in ariaroles) {
					selectors.push('[role="' + ariarole + '"]');
				}
			}
			break;
		case 'abbr':
		case 'address':
		case 'b':
		case 'bdi':
		case 'bdo':
		case 'blockquote':
		case 'br':
		case 'canvas':
		case 'cite':
		case 'code':
		case 'del':
		case 'dfn':
		case 'div':
		case 'em':
		case 'i':
		case 'ins':
		case 'kbd':
		case 'mark':
		case 'output':
		case 'p':
		case 'pre':
		case 'q':
		case 'rp':
		case 'rt':
		case 'ruby':
		case 's':
		case 'samp':
		case 'small':
		case 'span':
		case 'strong':
		case 'sub':
		case 'sup':
		case 'table':
		case 'tbody':
		case 'td':
		case 'tfoot':
		case 'th':
		case 'thead':
		case 'time':
		case 'tr':
		case 'u':
		case 'var':
		case 'wbr':
			for (var ariarole in ariaroles) {
				selectors.push('[role="' + ariarole + '"]');
			}
			break;
		case 'article':
			selectors.push('[role="application"]', '[role="document"]', '[role="feed"]', '[role="main"]', '[role="presentation"]', '[role="region"]');
			break;
		case 'aside':
			selectors.push('[role="feed"]', '[role="note"]', '[role="presentation"]', '[role="region"]', '[role="search"]');
			break;
		case 'audio':
		case 'video':
			selectors.push('[role="application"]');
			break;
		case 'button':
			if (this.getAttribute('type') == 'menu') { // Invalid Type.
				selectors.push('[role="link"]', '[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="radio"]');
			}
			else {
				selectors.push('[role="checkbox"]', '[role="link"]', '[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="radio"]', '[role="switch"]', '[role="tab"]');
			}
			break;
		case 'dialog':
			selectors.push('[role="alertdialog"]');
			break;
		case 'dl':
		case 'figcaption':
		case 'fieldset':
		case 'figure':
		case 'footer':
		case 'header':
			selectors.push('[role="group"]', '[role="presentation"]');
		case 'embed':
			selectors.push('[role="application"]', '[role="document"]', '[role="img"]', '[role="presentation"]');
			break;
		case 'form':
			selectors.push('[role="search"]', '[role="presentation"]');
			break;
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
			selectors.push('[role="presentation"]', '[role="tab"]');
			break;
		case 'iframe':
		case 'object':
		case 'svg':
			selectors.push('[role="application"]', '[role="document"]', '[role="img"]');
			break;
		case 'hr':
			selectors.push('[role="presentation"]');
			break;
		case 'img':
			if (this.getAttribute('alt') == '') {
				selectors.push('[role="none"]', '[role="presentation"]');
			}
			else {
				for (var ariarole in ariaroles) {
					selectors.push('[role="' + ariarole + '"]');
				}
			}
			break;
		case 'input':
			switch (this.getAttribute('type')) {
				case 'button':
					selectors.push('[role="link"]', '[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="radio"]', '[role="switch"]', '[role="tab"]');
					break;
				case 'checkbox':
					selectors.push('[role="button"][aria-pressed="' + (this.checked ? 'true' : 'false') + '"]', '[role="menuitemcheckbox"]', '[role="option"]', '[role="switch"]');
					break;
				case 'image':
					selectors.push('[role="link"]', '[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="radio"]', '[role="switch"]');
					break;
				case 'radio':
					selectors.push('[role="menuitemradio"]');
					break;
			}
			break;
		case 'li':
			if (['ol', 'ul'].indexOf(this.parentNode.tagName.toLowerCase()) > -1) {
				selectors.push('[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="option"]', '[role="presentation"]', '[role="radio"]', '[role="separator"]', '[role="tab"]', '[role="treeitem"]');
			}
			break;
		case 'ol':
		case 'ul':
			selectors.push('[role="directory"]', '[role="group"]', '[role="listbox"]', '[role="menu"]', '[role="menubar"]', '[role="presentation"]', '[role="radiogroup"]', '[role="tablist"]', '[role="toolbar"]', '[role="tree"]');
			break;
		case 'section':
			selectors.push('[role="alert"]', '[role="alertdialog"]', '[role="application"]', '[role="banner"]', '[role="complementary"]', '[role="contentinfo"]', '[role="dialog"]', '[role="document"]', '[role="feed"]', '[role="log"]', '[role="main"]', '[role="marquee"]', '[role="navigation"]', '[role="search"]', '[role="status"]', '[role="tabpanel"]');
			break;
		case 'select':
			selectors.push('[role="menu"]');
			break;
		case 'summary':
			var parent = this.parentNode;
			if (parent.tagName.toLowerCase() == 'details') {
				selectors.push('[role="button"][aria-expanded="' + (parent.open ? 'true' : 'false') + '"]');	
			}
			break;
	}
	return selectors;
} });

Object.defineProperty(HTMLElement.prototype, 'implicitARIASemantic', { get: function () {
	var selector = undefined;
	switch (this.tagName.toLowerCase()) {
		case 'a':
		case 'area':
			selector = this.hasAttribute('href') ? '[role="link"]' : undefined; // Tester la bonne implémentation (map ok) ???
			break;
		case 'article':
			selector = '[role="article"]';
			break;
		case 'aside':
			selector = '[role="complementary"]';
			break;
		case 'body':
			selector = '[role="document"]';
			break;
		case 'button':
			selector = '[role="button"]';
			break;
		case 'datalist':
			selector = '[role="listbox"]';
			break;
		case 'dd':
			selector = '[role="definition"]';
			break;
		case 'details':
			selector = '[role="group"]';
			break;
		case 'dialog':
			selector = '[role="dialog"]';
			break;
		case 'dl':
			selector = '[role="list"]';
			break;
		case 'dt':
			selector = '[role="listitem"]';
			break;
		case 'figure':
			selector = '[role="figure"]';
			break;
		case 'footer':
		case 'header':
			selector = this.tagName.toLowerCase() == 'footer' ? '[role="contentinfo"]' : '[role="banner"]';
			var deleteid = false;
			if (!this.hasAttribute('id')) {
				this.setAttribute('id', 'is-contentinfo_or_banner');
				deleteid = true;
			}
			var elementref = this.tagName.toLowerCase() + '#' + this.getAttribute('id');
			var hasparent = ['article', 'aside', 'main', 'nav', 'section'];
			if (this == document.querySelector(hasparent.join(' ' + elementref + ', ') + ' ' + elementref)) {
				selector = undefined;
			}
			if (deleteid) {
				this.removeAttribute('id');
			}
			break;
		case 'form':
			selector = '[role="form"]';
			break;
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
			selector = '[role="heading"][aria-level="' + this.tagName.substr(1) + '"]';
			break;
		case 'hr':
			selector = '[role="separator"]';
			break;
		case 'img':
			selector = this.getAttribute('alt') == '' ? undefined : '[role="img"]';
			break;
		case 'input':
			var inputtype = this.hasAttribute('type') ? (['button', 'checkbox', 'color', 'date', 'datetime', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week'].indexOf(this.getAttribute('type')) > -1 ? this.getAttribute('type') : 'text') : 'text'; 
			if (['button', 'image', 'reset', 'submit'].indexOf(inputtype) > -1) {
				selector = '[role="button"]';
			}
			else if (inputtype == 'checkbox') {
				selector = '[role="checkbox"]';
			}
			else if (['email', 'tel', 'text', 'url'].indexOf(inputtype) > -1) {
				if (!this.hasAttribute('list')) {
					selector = '[role="textbox"]';
				}
				else {
					selector = '[role="combobox"]';
				}
			}
			else if (inputtype == 'number') {
				selector = '[role="spinbutton"]';
			}
			else if (inputtype == 'radio') {
				selector = '[role="radio"]';
			}
			else if (inputtype == 'range') {
				selector = '[role="slider"]';
			}
			else if (inputtype == 'search') {
				if (!this.hasAttribute('list')) {
					selector = '[role="searchbox"]';
				}
				else {
					selector = '[role="combobox"]';
				}
			}
			break;
		case 'li':
			if (['ol', 'ul'].indexOf(this.parentNode.tagName.toLowerCase()) > -1) {
				selector = '[role="listitem"]';
			}
			break;
		case 'link':
			if (this.hasAttribute('href')) {
				selector = '[role="link"]';
			}
			break;
		case 'main':
			selector = '[role="main"]';
			break;
		case 'menu':
			if (this.getAttribute('type') == 'context') {
				selector = '[role="menu"]';
			}
			break;
		case 'menuitem':
			switch (this.getAttribute('type')) {
				case 'checkbox':
					selector = '[role="menuitemcheckbox"]';
					break;
				case 'command':
					selector = '[role="menuitem"]';
					break;
				case 'radio':
					selector = '[role="menuitemradio"]';
					break;
			}
			break;
		case 'nav':
			selector = '[role="navigation"]';
			break;
		case 'ol':
		case 'ul':
			selector = '[role="list"]';
			break;
		case 'optgroup':
			selector = '[role="group"]';
			break;
		case 'option':
			if (['datalist', 'select'].indexOf(this.parentNode.tagName.toLowerCase()) > -1) {
				selector = '[role="option"]';
			}
			break;
		case 'output':
			selector = '[role="status"]';
			break;
		case 'progress':
			selector = '[role="progressbar"]';
			break;
		case 'section':
			selector = '[role="region"]';
			break;
		case 'select':
			selector = '[role="listbox"]';
			break;
		case 'summary':
			var parent = this.parentNode;
			if (parent.tagName.toLowerCase() == 'details') {
				selector = '[role="button"][aria-expanded="' + (parent.hasAttribute('open') ? 'true' : 'false') + '"]';	
			}
			break;
		case 'table':
			selector = '[role="table"]';
			break;
		case 'textarea':
			selector = '[role="textbox"]';
			break;
		case 'tbody':
		case 'thead':
		case 'tfoot':
			selector = '[role="rowgroup"]';
			break;
		case 'td':
			selector = '[role="cell"]';
			break;
		case 'th':
			if (this.getAttribute('scope') == 'col') {
				selector = '[role="columnheader"]';
			}
			else if (this.getAttribute('scope') == 'row') {
				selector = '[role="rowheader"];'
			}
			else if (this.hasAttribute('id')) {}
			break;
		case 'tr':
			selector = '[role="row"]';
			break;
	}
	return selector;
} });

Object.defineProperty(HTMLUnknownElement.prototype, 'implicitARIASemantic', { get: function () {
	var selector = undefined;
	switch (this.tagName.toLowerCase()) {
		case 'bdi': /* Firefox */
			break;
		case 'datalist': /* Safari */
			selector = '[role="listbox"]';
			break;
		case 'dialog': /* Firefox & Safari */
			selector = '[role="dialog"]';
			break;
		case 'menuitem': /* Safari */
			switch (this.getAttribute('type')) {
				case 'checkbox':
					selector = '[role="menuitemcheckbox"]';
					break;
				case 'command':
					selector = '[role="menuitem"]';
					break;
				case 'radio':
					selector = '[role="menuitemradio"]';
					break;
			}
			break;
	}
	return selector;
} });

Object.defineProperty(Element.prototype, 'implicitARIASemantic', { get: function () {
	var selector = undefined;
	switch (this.tagName.toLowerCase()) {
		case 'math':
			selector = '[role="math"]';
			break;
	}
	return selector;
} });

Object.defineProperty(HTMLElement.prototype, 'explicitARIASemantic', { get: function () { return ''; } });

HTMLUnknownElement.prototype.isARIARoleAllowedOnMe = function (role) { return ''; };
HTMLUnknownElement.prototype.isARIAStatePropertyAllowedOnMe = function (stateproperty) { return ''; };
Element.prototype.isARIARoleAllowedOnMe = function (role) { return ''; };
Element.prototype.isARIAStatePropertyAllowedOnMe = function (stateproperty) { return ''; };
HTMLElement.prototype.isARIARoleAllowedOnMe = function (role) { return this.availableARIASemantics.indexOf('[role="' + role + '"]') > -1; };
HTMLElement.prototype.isARIAStatePropertyAllowedOnMe = function (stateproperty) { return ''; };

Object.defineProperty(SVGElement.prototype, 'isNotVisibleDueTo', { get: function () {
	var result = [];
	if (!(!!(this.offsetWidth || this.offsetHeight || this.getClientRects().length))) {
		result.push('css:other');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
		result.push('css:display');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('opacity') == '0') {
		result.push('css:opacity');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
		result.push('css:visibility');
	}
	return result;
} });

Object.defineProperty(HTMLElement.prototype, 'isNotVisibleDueTo', { get: function () {
	var result = [];
	if (!(!!(this.offsetWidth || this.offsetHeight || this.getClientRects().length))) {
		result.push('css:other');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
		result.push('css:display');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('opacity') == '0') {
		result.push('css:opacity');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
		result.push('css:visibility');
	}
	return result;
} });


Object.defineProperty(SVGElement.prototype, 'isNotExposedDueTo', { get: function () {
	var result = [];
	if (this.getAttribute('aria-hidden') == 'true') {
		result.push('aria:hidden');
	}
	else {
		var ariahiddenfound = false;
		var pt = this.parentNode;
		while (pt.nodeType == 1) {
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
	if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
		result.push('css:display');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
		result.push('css:visibility');
	}
	return result;
} });

Object.defineProperty(HTMLElement.prototype, 'isNotExposedDueTo', { get: function () {
	var result = [];
	if (this.getAttribute('aria-hidden') == 'true') {
		result.push('aria:hidden');
	}
	else {
		var ariahiddenfound = false;
		var pt = this.parentNode;
		while (pt.nodeType == 1) {
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
	if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
		result.push('css:display');
	}
	if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
		result.push('css:visibility');
	}
	return result;
} });

Object.defineProperty(SVGElement.prototype, 'canBeReachedUsingKeyboardWith', { get: function () {
	var result = [];
	if (this.hasAttribute('tabindex') && ['0','-1'].indexOf(this.getAttribute('tabindex')) > -1) {
		result.push('aria:tabindex');
	}
	return result;
} });

Object.defineProperty(HTMLElement.prototype, 'canBeReachedUsingKeyboardWith', { get: function () { 
	var result = [];
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
	
	if (this.hasAttribute('tabindex') && ['0','-1'].indexOf(this.getAttribute('tabindex')) > -1) {
		result.push('aria:tabindex');
	}
	return result;
} });