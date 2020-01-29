/* Extension du DOM. */
var ariaroles = {
	'alert': { type: ['live region', 'standalone ui widget'] },
	'alertdialog': { type: 'standalone ui widget' },
	'application': { type: 'document structure' },
	'article': { type: 'document structure' },
	'banner': { type: 'landmark' },
	'button': { type: 'standalone ui widget', supportNameFromContents: true, supportedStatesProperties: ['aria-expanded', 'aria-pressed'] },
	'checkbox': { type: 'standalone ui widget', supportNameFromContents: true },
	'cell': { type: 'document structure', supportNameFromContents: true },
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

if (!HTMLElement.prototype.hasOwnProperty('availableARIASemantics')) {
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
}

if (!HTMLElement.prototype.hasOwnProperty('implicitARIASemantic')) {
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
}

if (!HTMLUnknownElement.prototype.hasOwnProperty('implicitARIASemantic')) {
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
}

if (!Element.prototype.hasOwnProperty('implicitARIASemantic')) {
	Object.defineProperty(Element.prototype, 'implicitARIASemantic', { get: function () {
		var selector = undefined;
		switch (this.tagName.toLowerCase()) {
			case 'math':
				selector = '[role="math"]';
				break;
		}
		return selector;
	} });
}

if (!HTMLElement.prototype.hasOwnProperty('explicitARIASemantic')) {
	Object.defineProperty(HTMLElement.prototype, 'explicitARIASemantic', { get: function () { return ''; } });
}

HTMLUnknownElement.prototype.isARIARoleAllowedOnMe = function (role) { return ''; };
HTMLUnknownElement.prototype.isARIAStatePropertyAllowedOnMe = function (stateproperty) { return ''; };
Element.prototype.isARIARoleAllowedOnMe = function (role) { return ''; };
Element.prototype.isARIAStatePropertyAllowedOnMe = function (stateproperty) { return ''; };
HTMLElement.prototype.isARIARoleAllowedOnMe = function (role) { return this.availableARIASemantics.indexOf('[role="' + role + '"]') > -1; };
HTMLElement.prototype.isARIAStatePropertyAllowedOnMe = function (stateproperty) { return ''; };

if (!HTMLElement.prototype.hasOwnProperty('accessibleName')) {
	Object.defineProperty(HTMLElement.prototype, 'accessibleName', { get: function () {
		var result = null; // NULL
		if (this.isNotExposedDueTo.length == 0) {
			if (this.hasAttribute('aria-labelledby')) {
				var labelledby = this.getAttribute('aria-labelledby');
				if (labelledby.trim().length > 0) {
					labelledby = labelledby.split(' ');
					labelledby.forEach(function (item) {
						item = '#' + item;
					});
					var nodes = document.querySelectorAll(labelledby.join(','));
					if (nodes.length) {
						result = 'aria-labelledby';
						for (var i = 0; i < nodes.length; i++) {
							result += (i > 0 ? ' ' : '') + nodes[i].accessibleName;
						}
					}
				}
			}
			if (result == null) {
				if (this.hasAttribute('aria-label') && this.getAttribute('aria-label').trim() != '') {
					result = 'aria-label:' + this.getAttribute('aria-label');
				}
				else if (!this.matches('[role="none"], [role="presentation"]')) {
					if (this.matches('a, button')) {
						var clonedThis = this.cloneNode(true);
						var clonedImages = clonedThis.querySelectorAll('img');
						for (var i = 0; i < clonedImages.length; i++) {
							var an = clonedImages.accessibleName;
							an = an == null ? '' : an;
							clonedImages[i].parentNode.replaceChild(document.createTextNode(an), clonedImages[i]);
						}
						result = 'content:' + clonedThis.textContent; // A décomposer dans l'UI.
					}
					else if (this.matches('area, img') && this.hasAttribute('alt')) {
						result = 'alt:' + this.getAttribute('alt');
					}
					else if (this.matches('iframe') && this.hasAttribute('title')) {
						result = 'title:' + this.getAttribute('title');
					}
					else if (this.matches('input[type="button"], input[type="image"], input[type="reset"], input[type="submit"]')) {
						var anattribute = this.getAttribute('type') == 'image' ? 'alt' : 'value';
						result = this.hasAttribute(anattribute) ? anattribute + ':' + this.getAttribute(anattribute) : null; // NULL
					}
					else if (this.matches('input, select')) {
						var label = this.hasAttribute('id') ? document.querySelector('label[for="' + this.getAttribute('id') + '"]') : null; // NULL
						if (label) {
							var clonedLabel = label.cloneNode(true);
							var clonedImages = clonedLabel.querySelectorAll('img');
							for (var i = 0; i < clonedImages.length; i++) {
								var an = clonedImages.accessibleName;
								an = an == null ? '' : an;
								clonedImages[i].parentNode.replaceChild(document.createTextNode(an), clonedImages[i]);
							}
							result = 'label[for]:' + clonedLabel.textContent;
						}
						else if (this.matches('label input, label select')) {
							label = this.closest('label');
							var clonedLabel = label.cloneNode(true);
							var clonedImages = clonedLabel.querySelectorAll('img');
							for (var i = 0; i < clonedImages.length; i++) {
								var an = clonedImages.accessibleName;
								an = an == null ? '' : an;
								clonedImages[i].parentNode.replaceChild(document.createTextNode(an), clonedImages[i]);
							}
							result = 'label[for]:' + clonedLabel.textContent;
						}
						else if (this.hasAttribute('title')) {
							result = 'title:' + this.getAttribute('title');
						}
					}
					else if (this.matches('fieldset')) {
						var legend = this.firstElementChild;
						if (legend && legend.matches('legend')) {
							var clonedLegend = legend.cloneNode(true);
							var clonedImages = clonedLegend.querySelectorAll('img');
							for (var i = 0; i < clonedImages.length; i++) {
								var an = clonedImages.accessibleName;
								an = an == null ? '' : an;
								clonedImages[i].parentNode.replaceChild(document.createTextNode(an), clonedImages[i]);
							}
							result = 'legend:' + clonedLegend.textContent;
						}
					}
				}
				else {
					result = '';
				}
			}
		}
		else {
			result = '';
		}
		return result;
	} });
}

if (!SVGElement.prototype.hasOwnProperty('isNotVisibleDueTo')) {
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
}

if (!HTMLElement.prototype.hasOwnProperty('isNotVisibleDueTo')) {
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
}

if (!SVGElement.prototype.hasOwnProperty('isNotExposedDueTo')) {
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
}

if (!HTMLElement.prototype.hasOwnProperty('isNotExposedDueTo')) {
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
}

if (!SVGElement.prototype.hasOwnProperty('canBeReachedUsingKeyboardWith')) {
	Object.defineProperty(SVGElement.prototype, 'canBeReachedUsingKeyboardWith', { get: function () {
		var result = [];
		if (this.hasAttribute('tabindex') && ['0','-1'].indexOf(this.getAttribute('tabindex')) > -1) {
			result.push('aria:tabindex');
		}
		return result;
	} });
}

if (!HTMLElement.prototype.hasOwnProperty('canBeReachedUsingKeyboardWith')) {
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
}

/* Gestion des tests. */
function getXPath(element) {
	var position = 0;
	if (element.parentNode && element.parentNode.nodeType == 1) {
		var children = element.parentNode.children;
		for (var i = 0; i < children.length; i++) {
			if (children[i].tagName.toLowerCase() == element.tagName.toLowerCase()) {
				position++;
			}
			if (children[i] == element) {
				break;
			}
		}
	}
	return (element.parentNode.nodeType == 1 ? getXPath(element.parentNode) : '') + '/' + element.tagName.toLowerCase() + '[' + (position ? position : '1') + ']' + (element.hasAttribute('id') ? '[@id="' + element.getAttribute('id') + '"]' : '') + (element.hasAttribute('class') ? '[@class="' + element.getAttribute('class') + '"]' : '');
}

function addBooleanResult(name, data) {
	/*
		addBooleanResult(browser.i18n.getMessage("msgHeadings"), {
			name: { 'passed': 'Intitulé si C', 'failed': 'Intitulé si NC' },
			data: document.querySelectorAll('h1').length > 1
		});
	*/
}


function initTanaguru() {
	if (!window.tanaguru) {
		window.tanaguru = {};
		window.tanaguru.tags = new Array();
		window.tanaguru.tests = new Array();
	}
}

function addResultSet(name, data) {
	initTanaguru();
	/*
	*** OLD VERSION ***
	if (data.type == 'failed') {
		var datacount = data.data.length;
	}
	else {
		var datacount = 0; // 'passed', 'cantTell', 'inapplicable', 'untested'
	}
	if (window.tanaguru.tests[name]) {
		window.tanaguru.tests[name].datacount += datacount;
	}
	else {
		window.tanaguru.tests[name] = {
			data: [],
			datacount: datacount
		}	
	}
	//if (data.data.length > 0) {
		window.tanaguru.tests[name].data.push(data);	
	//}
	*/
	/* Nouvelle version */
	window.tanaguru.tests.push(data);
}

function loadTanaguruTests() {
	initTanaguru();
	var tags = [];
	for (var tag in window.tanaguru.tags) {
		tags.push(window.tanaguru.tags[tag]);
	}
	tags = tags.sort(function(a, b) {
		return a.name.localeCompare(b.name);
	});
	var result = { tags: tags, tests: window.tanaguru.tests };
	window.tanaguru = undefined;
	return result;
}

function manageOutput(element) {
	var status = element.status ? element.status : 'cantTell';
	element.status = undefined;
	var accessibleName = element.accessibleName;
	var implicitARIASemantic = element.implicitARIASemantic;
	var explicitARIASemantic = element.explicitARIASemantic;
	var canBeReachedUsingKeyboardWith = element.canBeReachedUsingKeyboardWith;
	var isNotVisibleDueTo = element.isNotVisibleDueTo;
	var isNotExposedDueTo = element.isNotExposedDueTo;
	var fakeelement = element.cloneNode(true);
	var e = document.createElement(fakeelement.tagName.toLowerCase());
	if (e.outerHTML.indexOf("/") != -1) {
		if (fakeelement.innerHTML.length > 512) {
			fakeelement.innerHTML = '[...]';
		}	
	}
	return { status: status, outer: fakeelement.outerHTML, xpath: getXPath(element), role: { implicit: implicitARIASemantic, explicit: explicitARIASemantic }, accessibleName: accessibleName, canBeReachedUsingKeyboardWith: canBeReachedUsingKeyboardWith, isNotVisibleDueTo: isNotVisibleDueTo, isNotExposedDueTo: isNotExposedDueTo };
}








function createTanaguruTest(test) {
	if (test.hasOwnProperty('query') && test.query.constructor == String) {
	 	// Sélection des éléments.
	 	var elements = document.querySelectorAll(test.query);
	 	if (elements) {
	 		// Statut du test par défaut.
	 		var status = 'cantTell';
	 		// Initialisation des tags.
	 		initTanaguru();
	 		if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
	 			for (var i = 0; i < test.tags.length; i++) {
		 			if (!window.tanaguru.tags[test.tags[i]]) {
		 				window.tanaguru.tags[test.tags[i]] = { id: test.tags[i], name: browser.i18n.getMessage('tag' + test.tags[i].charAt(0).toUpperCase() + test.tags[i].slice(1)), status: status, nbfailures: 0 };
			 		}
		 		}
		 	}
	 		else {
		 		if (!window.tanaguru.tags['others']) {
		 			window.tanaguru.tags['others'] = { id: 'others', name: browser.i18n.getMessage('tagOthers'), status: status, nbfailures: 0 };
		 		}
		 	}
	 		
	 		
	 		
	 		// Filtre additionnel sur la sélection d'éléments.
	 		if (test.hasOwnProperty('filter')) {
	 			if (test.filter.constructor == Function) {
					elements = Array.from(elements);
					elements = elements.filter(test.filter);
	 			}
	 			else {
	 				// Erreur : valeur de la propriété filter.
	 			}
 			}
	 		// Calcul du statut du test.
			if (test.hasOwnProperty('expectedNbElements')) {
	 			if (Number.isInteger(test.expectedNbElements)) {
					status = elements.length == test.expectedNbElements ? 'passed' : 'failed';
					for (var i = 0; i < elements.length; i++) {
						elements[i].status = status;
					}
	 			}
	 			else if (test.expectedNbElements.constructor == Object && (test.expectedNbElements.hasOwnProperty('min') || test.expectedNbElements.hasOwnProperty('max'))) {
					var min = test.expectedNbElements.hasOwnProperty('min') && Number.isInteger(test.expectedNbElements.min) ? test.expectedNbElements.min : 0;
 					var max = test.expectedNbElements.hasOwnProperty('max') && Number.isInteger(test.expectedNbElements.max) ? test.expectedNbElements.max : null;
					status = elements.length >= min && (max == null || elements.length <= max) ? 'passed' : 'failed';
					for (var i = 0; i < elements.length; i++) {
						elements[i].status = status;
					}
	 			}
	 			else {
	 				// Erreur : valeur de la propriété expectedNbElements.
	 			}
	 		}
	 		else {
	 			if (elements.length == 0) {
	 				status = 'inapplicable'; // Voir si le statut "Non applicable" n'est possible que dans le cas d'un nombre d'éléments à vérifier.
	 			}
			 }




			var statuspriority = {
				failed: 4,
				passed: 3,
				cantTell: 2,
				inapplicable: 1,
				untested: 0
			};
			// Traitement par collection.
			var failedincollection = null;
			if (test.hasOwnProperty('analyzeElements')) {
				if (test.analyzeElements.constructor == Function) {
					test.analyzeElements(elements);
					// On modifie le statut du test selon les statuts d'items.
					for (var e = 0; e < elements.length; e++) {
						if (elements[e].status == 'failed') {
							failedincollection = failedincollection == null ? 0 : failedincollection;
							failedincollection += 1;
						}
						if (statuspriority[status] < statuspriority[elements[e].status]) {
							status = elements[e].status;
						}
					}
				}
			}
	 		
	 		
	 		
	 		// Mises à jour des tags (statut du tag et nombre de résultats en erreur).
	 		if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
	 			for (var i = 0; i < test.tags.length; i++) {
	 				if (statuspriority[window.tanaguru.tags[test.tags[i]].status] < statuspriority[status]) {
 						window.tanaguru.tags[test.tags[i]].status = status;
 					}
 					if (status == 'failed') {
 						window.tanaguru.tags[test.tags[i]].nbfailures += elements.length > 0 ? elements.length : 1;
 					}
	 			}
	 		}
	 		else {
	 			if (statuspriority[window.tanaguru.tags['others'].status] < statuspriority[status]) {
	 				window.tanaguru.tags['others'].status = status;
	 			}
	 			if (status == 'failed') {
	 				window.tanaguru.tags['others'].nbfailures += elements.length > 0 ? elements.length : 1;
	 			}
	 		}
	 		
	 		
	 		
	 		// Chargement du résultat.
	 		var outputelements = [];
	 		for (var i = 0; i < elements.length; i++) {
		 		outputelements.push(manageOutput(elements[i]));
		 	}
	 		var result = {
 				name: test.name,
 				type: status,
 				data: outputelements,
	 			tags: []
 			};
			if (test.hasOwnProperty('id')) {
				result.id = test.id;
			}
	 		if (test.hasOwnProperty('lang')) {
	 			result.lang = test.lang;
	 		}
	 		if (test.hasOwnProperty('description')) {
	 			result.description = test.description;
	 		}
	 		if (test.hasOwnProperty('explanations') && test.explanations.hasOwnProperty(status)) {
	 			result.explanation = test.explanations[status];
	 		}
	 		if (test.hasOwnProperty('mark')) {
	 			result.mark = test.mark;
	 		}
	 		result.tags = test.hasOwnProperty('tags') ? test.tags : ['others'];
	 		if (test.hasOwnProperty('ressources')) {
	 			result.ressources = test.ressources;
	 		}
			if (failedincollection) {
				result.failedincollection = failedincollection;
			}
	 		addResultSet("Nouvelle syntaxe d'écriture des tests", result);
	 		
	 		
	 		
	 		// Intégrer chaque résultat dans window.tanaguru.tests.
	 		


	 	}
	 	else {
	 		// Erreur : valeur de la propriété query.
	 	}
	}
}

// Type à prévoir ? Conseil, obligation...
// Ajouter description.
