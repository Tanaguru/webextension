// content script
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
    'aria-flowto': { type: 'relationship', global: true }, // id reference list
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
    Object.defineProperty(HTMLElement.prototype, 'availableARIASemantics', {
        get: function () {
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
        }
    });
}

if (!HTMLElement.prototype.hasOwnProperty('implicitARIASemantic')) {
    Object.defineProperty(HTMLElement.prototype, 'implicitARIASemantic', {
        get: function () {
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
                    else if (this.hasAttribute('id')) { }
                    break;
                case 'tr':
                    selector = '[role="row"]';
                    break;
            }
            return selector;
        }
    });
}

if (!HTMLUnknownElement.prototype.hasOwnProperty('implicitARIASemantic')) {
    Object.defineProperty(HTMLUnknownElement.prototype, 'implicitARIASemantic', {
        get: function () {
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
        }
    });
}

if (!Element.prototype.hasOwnProperty('implicitARIASemantic')) {
    Object.defineProperty(Element.prototype, 'implicitARIASemantic', {
        get: function () {
            var selector = undefined;
            switch (this.tagName.toLowerCase()) {
                case 'math':
                    selector = '[role="math"]';
                    break;
            }
            return selector;
        }
    });
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

/* ARIA */

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
* Control Embedded in Label (+ Checkboxes & Radios Embedded in Label).
* Checkbox & Radio in Native Textboxes...
* SVG (multiple titles & use elements).
* Output (in native "textboxes").
* Native Password Controls (i.e. (Incorrectly) Used as Custom Checkbox Controls).
* Labels for Native Controls (Multiple Labels + Labels for Some Controls like Buttons).
* Aria-owns Property (Partially Supported - Only for Custom Listboxes).
* Data (Separated Files).
*/

// accessibleName.
var getAccessibleName = function () {
// Data.
    var ARIA = {
        nameFromContentSupported: '[role="button"], [role="cell"], [role="checkbox"], [role="columnheader"], [role="gridcell"], [role="heading"], [role="link"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"], [role="radio"], [role="row"], [role="rowgroup"], [role="rowheader"], [role="switch"], [role="tab"], [role="tooltip"], [role="treeitem"]'
    };
    var controls = {
        nativetextboxes: 'input:not([type]), input[type="checkbox"], input[type="email"], input[type="password"], input[type="radio"], input[type="search"], input[type="text"], input[type="tel"], input[type="url"], output, textarea',
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
                    if (this.matches('input[type="password"]')) {
                        var value = this.value;
                        var resulttmp = [];
                        for (var i = 0; i < value.length; i++) {
                            resulttmp.push('\u2022');
                        }
                        result = resulttmp.join('\u00AD');
                    }
                    else {
                        result = this.value;
                    }
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
                    if (this.matches(controls.nativetextboxes)) {
                        if (this.matches('input[type="password"]')) {
                            var value = this.value;
                            var resulttmp = [];
                            for (var i = 0; i < value.length; i++) {
                                resulttmp.push('\u2022');
                            }
                            result = resulttmp.join('\u00AD');
                        }
                        else {
                            result = this.value;
                        }
                    }
                    else {
                        result = this.textContent;
                    }
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
                        if (this.value) {
                            result = this.value;
                        }
                        else {
                            result = '';
                        }
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
                if (this.matches('area, img')) {
                    if (!this.matches('[role="none"], [role="presentation"]')) { // COMMENT : Not allowed on area & img with alt="text".
                        if (this.hasAttribute('alt')) {
                            result = this.getAttribute('alt');
                        }
                        else if (this.hasAttribute('title')) {
                            /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                            result = this.getAttribute('title');
                        }
                    }
                }
                else if (this.matches('svg') && !this.matches('[role="none"], [role="presentation"]')) {
                    var title = this.querySelector('title');
                    if (title && title.parentNode == this) {
                        result = title.textContent;
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
                            if (!(/^url\(/.test(parentcssbeforecontent))) {
                                parentcssbeforecontent = parentcssbeforecontent == 'none' ? '' : parentcssbeforecontent.substring(1, parentcssbeforecontent.length - 1);
                            }
                            else {
                                parentcssbeforecontent = '';
                            }
                            parentcssaftercontent = window.getComputedStyle(this, '::after').getPropertyValue('content');
                            if (!(/^url\(/.test(parentcssaftercontent))) {
                                parentcssaftercontent = parentcssaftercontent == 'none' ? '' : parentcssaftercontent.substring(1, parentcssaftercontent.length - 1);
                            }
                            else {
                                parentcssaftercontent = '';
                            }
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
                                        if (!(/^url\(/.test(cssbeforecontent))) {
                                            cssbeforecontent = cssbeforecontent == 'none' ? '' : cssbeforecontent.substring(1, cssbeforecontent.length - 1);
                                        }
                                        else {
                                            cssbeforecontent = '';
                                        }
                                        cssaftercontent = window.getComputedStyle(nodes[i], '::after').getPropertyValue('content');
                                        if (!(/^url\(/.test(cssaftercontent))) {
                                            cssaftercontent += cssaftercontent == 'none' ? '' : cssaftercontent.substring(1, cssaftercontent.length - 1);
                                        }
                                        else {
                                            cssaftercontent = '';
                                        }
                                    }
                                    if (this.matches('[data-labelbytraversal="true"]')) {
                                        nodes[i].setAttribute('data-labelbytraversal', 'true');
                                    }
                                    result += cssbeforecontent + nodes[i].accessibleName + cssaftercontent;
                                }
                            }
                        }
                        else {
                            result += this.value;
                        }
                        result += parentcssaftercontent;
                        if (result.trim() == '' && this.hasAttribute('title')) {
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
                    if (result.trim() == '' && this.hasAttribute('title')) {
                        /* 2-I : Otherwise, if the current node has a Tooltip attribute, return its value. */
                        result = this.getAttribute('title');
                    }
                }
                else if (this.matches('iframe[title]') && !this.matches('[role="none"], [role="presentation"]')) {
                    result = this.getAttribute('title');
                }
                else if ((!this.hasAttribute('role') || this.matches('[role="none"], [role="presentation"]')) || this.matches(ARIA.nameFromContentSupported)) { // Name from Content (TODO : implement it in ARIA).
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
                        if (!(/^url\(/.test(parentcssbeforecontent))) {
                            parentcssbeforecontent = parentcssbeforecontent == 'none' ? '' : parentcssbeforecontent.substring(1, parentcssbeforecontent.length - 1);
                        }
                        else {
                            parentcssbeforecontent = '';
                        }
                        parentcssaftercontent = window.getComputedStyle(this, '::after').getPropertyValue('content');
                        if (!(/^url\(/.test(parentcssaftercontent))) {
                            parentcssaftercontent = parentcssaftercontent == 'none' ? '' : parentcssaftercontent.substring(1, parentcssaftercontent.length - 1);
                        }
                        else {
                            parentcssaftercontent = '';
                        }
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
                                if (!(/^url\(/.test(cssbeforecontent))) {
                                    cssbeforecontent = cssbeforecontent == 'none' ? '' : cssbeforecontent.substring(1, cssbeforecontent.length - 1);
                                }
                                else {
                                    cssbeforecontent = '';
                                }
                                cssaftercontent = window.getComputedStyle(nodes[i], '::after').getPropertyValue('content');
                                if (!(/^url\(/.test(cssaftercontent))) {
                                    cssaftercontent = cssaftercontent == 'none' ? '' : cssaftercontent.substring(1, cssaftercontent.length - 1);
                                }
                                else {
                                    cssaftercontent = '';
                                }
                            }
                            if (nodes[i].matches(controlsselectors)) {
                                nodes[i].setAttribute('data-controlembeddedinlabel', 'true');
                            }
                            if (this.matches('[data-labelbytraversal="true"]')) {
                                nodes[i].setAttribute('data-labelbytraversal', 'true');
                            }
                            result += cssbeforecontent + nodes[i].accessibleName + cssaftercontent;
                        }
                    }
                    result += parentcssaftercontent;
                    if (result.trim() == '' && this.matches('a[href][title]')) {
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
};
if (!SVGElement.prototype.hasOwnProperty('accessibleName')) Object.defineProperty(SVGElement.prototype, 'accessibleName', { get: getAccessibleName });
if (!HTMLElement.prototype.hasOwnProperty('accessibleName')) Object.defineProperty(HTMLElement.prototype, 'accessibleName', { get: getAccessibleName });

// hasAccessibleName.
var hasAccessibleName = function () { return this.accessibleName != ''; };
if (!('hasAccessibleName' in SVGElement.prototype)) SVGElement.prototype.hasAccessibleName = hasAccessibleName;
if (!('hasAccessibleName' in HTMLElement.prototype)) HTMLElement.prototype.hasAccessibleName = hasAccessibleName;

// getAccessibleNameImplementation.
var getAccessibleNameImplementation = function () {};
if (!('getAccessibleNameImplementation' in SVGElement.prototype)) SVGElement.prototype.getAccessibleNameImplementation = getAccessibleNameImplementation;
if (!('getAccessibleNameImplementation' in HTMLElement.prototype)) HTMLElement.prototype.getAccessibleNameImplementation = getAccessibleNameImplementation;

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
    tags = tags.sort(function (a, b) {
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

    if(element.nodeType === 10) {
        var fakeelement = "<!DOCTYPE "+(element.name ? element.name : '')+(element.publicId ? ' PUBLIC "' + element.publicId + '"' : '')+(!element.publicId && element.systemId ? ' SYSTEM' : '')+(element.systemId ? ' "' + element.systemId + '"' : '')+'>';
    } else {
        var fakeelement = element.cloneNode(true);
    }

    var e = element.nodeType !== 10 ? document.createElement(fakeelement.tagName.toLowerCase()) : null;
    if (e && e.outerHTML.indexOf("/") != -1) {
        if (fakeelement.innerHTML.length > 512) {
            fakeelement.innerHTML = '[...]';
        }
    }
    return { status: status, outer: e ? fakeelement.outerHTML : fakeelement, xpath: e ? getXPath(element) : null, role: { implicit: implicitARIASemantic, explicit: explicitARIASemantic }, accessibleName: accessibleName, canBeReachedUsingKeyboardWith: e ? canBeReachedUsingKeyboardWith : [], isNotVisibleDueTo: e ? isNotVisibleDueTo : ['doctype'], isNotExposedDueTo: e ? isNotExposedDueTo : '' };
}

function createTanaguruTag(tag, status) {
    if (!window.tanaguru.tags[tag]) {
        window.tanaguru.tags[tag] = { id: tag, name: chrome.i18n.getMessage('tag' + tag.charAt(0).toUpperCase() + tag.slice(1)), status: status, nbfailures: 0 };
    }
}

function createTanaguruTest(test) {
    if (test.hasOwnProperty('status') && test.status == 'untested') { // Non testés mais référencés.
        // Initialisation des tags.
        initTanaguru();
        if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
            for (var i = 0; i < test.tags.length; i++) {
                createTanaguruTag(test.tags[i], test.status);
            }
        }
        else {
            createTanaguruTag('others', test.status);
        }
        // Chargement du résultat.
        var result = {
            name: test.name,
            type: test.status,
            data: [],
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
        if (test.hasOwnProperty('explanations') && test.explanations.hasOwnProperty(test.status)) {
            result.explanation = test.explanations[test.status];
        }
        result.tags = test.hasOwnProperty('tags') ? test.tags : ['others'];
        if (test.hasOwnProperty('ressources')) {
            result.ressources = test.ressources;
        }
        addResultSet("Nouvelle syntaxe d'écriture des tests", result);
        // Intégrer chaque résultat dans window.tanaguru.tests.
    }
    else if ((test.hasOwnProperty('query') && test.query.constructor == String) || test.hasOwnProperty('contrast') || test.hasOwnProperty('code') || test.hasOwnProperty('node')) {
        // Sélection des éléments.
        if(test.hasOwnProperty('contrast')) {
            var elements = textNodeList[test.contrast];
        } else if(test.hasOwnProperty('code')) {
            var elements = getDuplicateID();
        } else if(test.hasOwnProperty('node')) {
            var elements = test.node ? [test.node] : [];
        } else {
            var elements = document.querySelectorAll(test.query);
        }

        if (elements/* && elements.length > 0*/) {
            // Statut du test par défaut.
            var status = 'cantTell';

            // Initialisation des tags.
            initTanaguru();
            if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
                for (var i = 0; i < test.tags.length; i++) {
                    createTanaguruTag(test.tags[i], status);
                }
            }
            else {
                createTanaguruTag('others', status);
            }

            // Gestion du compteur d'éléments testés (avant filtre).
            var counter = null;
            if (test.hasOwnProperty('counter') && test.counter == 'beforefilter') {
                counter = elements.length;
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

            // Gestion du compteur d'éléments testés (après filtre).
            if (test.hasOwnProperty('counter') && test.counter == 'afterfilter') {
                counter = elements.length;
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
                inapplicable: 2,
                cantTell: 1,
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
                        window.tanaguru.tags[test.tags[i]].nbfailures += failedincollection ? failedincollection : (elements.length > 0 ? elements.length : 1);
                    }
                }
            }
            else {
                if (statuspriority[window.tanaguru.tags['others'].status] < statuspriority[status]) {
                    window.tanaguru.tags['others'].status = status;
                }
                if (status == 'failed') {
                    window.tanaguru.tags['others'].nbfailures += failedincollection ? failedincollection : (elements.length > 0 ? elements.length : 1);
                }
            }

            // Chargement du résultat.
            var outputelements = [];
            if(!test.hasOwnProperty('contrast')) {
                for (var i = 0; i < elements.length; i++) {
                    outputelements.push(manageOutput(elements[i]));
                }
            }
            
            if(test.hasOwnProperty('contrast')) {
                for (var i = 0; i < elements.length; i++) {
                    var node = elements[i].node;
                    var accessibleName = node.accessibleName;
                    var implicitARIASemantic = node.implicitARIASemantic;
                    var explicitARIASemantic = node.explicitARIASemantic;
                    var canBeReachedUsingKeyboardWith = node.canBeReachedUsingKeyboardWith;
                    var isNotExposedDueTo = node.isNotExposedDueTo;

                    elements[i].role.implicit = implicitARIASemantic;
                    elements[i].role.explicit = explicitARIASemantic;
                    elements[i].accessibleName = accessibleName;
                    elements[i].canBeReachedUsingKeyboardWith = canBeReachedUsingKeyboardWith;
                    elements[i].isNotExposedDueTo = isNotExposedDueTo;
                    delete elements[i].node;
                }
                
                outputelements = elements;
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
            if (counter) {
                result.counter = counter;
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

// TODO: début HTML.

/*
	HTML 5.3
	W3C Working Draft, 18 October 2018
    https://www.w3.org/TR/html53/

    ARIA in HTML
    W3C Working Draft 20 May 2020
    https://www.w3.org/TR/html-aria/

    Note, file updated with :
    - ARIA 1.2, new roles :
    * paragraph (p);
    * blockquote (blockquote);
    * caption (figcaption);
    * generic (div and span);
    * emphasis (em);
    * strong (strong);
    * term (dfn);
    * time (time);
    * code (code);
    * subscript (sub);
    * superscript (sup);
    * insertion (ins);
    * deletion (del);
    * caption (caption).
    - ARIA 1.2, current associations :
    * term is not associated with dt (removed here);
    * definition is not associated with dd (removed here);
    * link is not associated with area[href] (ignored here - href not involved in HTML spec);
    * grid is associated with table (ignored here);
    * gridcell is associated with td (ignored here);
    * columnheader is associated with th[scope="col"] (added here);
    * rowheader is associated with th[scope="row"] (added here).
    - ARIA in HTML :
    * spinbutton is not associated with input[type="text|search"] (removed here).
    * textarea is associated with textbox & no mention of aria-multiline (aria-multiline ignored here too).
    * button is associated with summary (added here).
    * area is associated with link (added here).
*/

var htmlData = {
    version: 5.3,
    status: 'Working Draft (WD)',
    date: 20181018,
    url: 'https://www.w3.org/TR/html53/',
    elementsCategorization: {
        'the document element': { id: 'the-root-element', url: 'https://www.w3.org/TR/html53/semantics.html' },
        'document metadata': { id: 'document-metadata', url: 'https://www.w3.org/TR/html53/document-metadata.html' },
        'sections': { id: 'sections', url: 'https://www.w3.org/TR/html53/sections.html' },
        'grouping content': { id:'grouping-content', url: 'https://www.w3.org/TR/html53/grouping-content.html' },
        'text-level semantics': { id: 'textlevel-semantics', url: 'https://www.w3.org/TR/html53/textlevel-semantics.html' },
        'edits': { id: 'edits', url: 'https://www.w3.org/TR/html53/edits.html' },
        'embedded content': { id: 'semantics-embedded-content', url: 'https://www.w3.org/TR/html53/semantics-embedded-content.html' },
        'tabular data': { id: 'tabular-data', url: 'https://www.w3.org/TR/html53/tabular-data.html' },
        'forms': { id: 'sec-forms', url: 'https://www.w3.org/TR/html53/sec-forms.html' },
        'interactive elements': { id: 'interactive-elements', url: 'https://www.w3.org/TR/html53/interactive-elements.html' },
        'scripting': { id: 'semantics-scripting', url: 'https://www.w3.org/TR/html53/semantics-scripting.html' }
    },
    elements: {
        'html': { id: 'the-html-element', category: 'the document element', DOMInterface: 'HTMLHtmlElement' },
        'head': { id: 'the-head-element', category: 'document metadata', DOMInterface: 'HTMLHeadElement' },
        'title': { id: 'the-title-element', category: 'document metadata', DOMInterface: 'HTMLTitleElement' },
        'base': { id: 'the-base-element', category: 'document metadata', DOMInterface: 'HTMLBaseElement' },
        'link': { id: 'the-link-element', category: 'document metadata', implicitAriaRole: 'link', DOMInterface: 'HTMLLinkElement' },
        'meta': { id: 'the-meta-element', category: 'document metadata', DOMInterface: 'HTMLMetaElement' },
        'style': { id: 'the-style-element', category: 'document metadata', DOMInterface: 'HTMLStyleElement' },
        'body': { id: 'the-body-element', category: 'sections', implicitAriaRole: 'document', DOMInterface: 'HTMLBodyElement' },
        'article': { id: 'the-article-element', category: 'sections', implicitAriaRole: 'article', DOMInterface: 'HTMLElement' },
        'section': { id: 'the-section-element', category: 'sections', implicitAriaRole: 'region', DOMInterface: 'HTMLElement' },
        'nav': { id: 'the-nav-element', category: 'sections', implicitAriaRole: 'navigation', DOMInterface: 'HTMLElement' },
        'aside': { id: 'the-aside-element', category: 'sections', implicitAriaRole: 'complementary', DOMInterface: 'HTMLElement' },
        'h1': { id: 'the-h1-h2-h3-h4-h5-and-h6-elements', category: 'sections', implicitAriaRole: 'heading', DOMInterface: 'HTMLHeadingElement' },
        'h2': { id: 'the-h1-h2-h3-h4-h5-and-h6-elements', category: 'sections', implicitAriaRole: 'heading', DOMInterface: 'HTMLHeadingElement' },
        'h3': { id: 'the-h1-h2-h3-h4-h5-and-h6-elements', category: 'sections', implicitAriaRole: 'heading', DOMInterface: 'HTMLHeadingElement' },
        'h4': { id: 'the-h1-h2-h3-h4-h5-and-h6-elements', category: 'sections', implicitAriaRole: 'heading', DOMInterface: 'HTMLHeadingElement' },
        'h5': { id: 'the-h1-h2-h3-h4-h5-and-h6-elements', category: 'sections', implicitAriaRole: 'heading', DOMInterface: 'HTMLHeadingElement' },
        'h6': { id: 'the-h1-h2-h3-h4-h5-and-h6-elements', category: 'sections', implicitAriaRole: 'heading', DOMInterface: 'HTMLHeadingElement' },
        'header': { id: 'the-header-element', category: 'sections', implicitAriaRole: 'banner', DOMInterface: 'HTMLElement' },
        'footer': { id: 'the-footer-element', category: 'sections', implicitAriaRole: 'contentinfo', DOMInterface: 'HTMLElement' },
        'p': { id: 'the-p-element', category: 'grouping content', implicitAriaRole: 'paragraph', DOMInterface: 'HTMLParagraphElement' },
        'address': { id: 'the-address-element', category: 'grouping content', DOMInterface: 'HTMLElement' },
        'hr': { id: 'the-hr-element', category: 'grouping content', implicitAriaRole: 'separator', DOMInterface: 'HTMLHRElement' },
        'pre': { id: 'the-pre-element', category: 'grouping content', DOMInterface: 'HTMLPreElement' },
        'blockquote': { id: 'the-blockquote-element', category: 'grouping content', implicitAriaRole: 'blockquote', DOMInterface: 'HTMLQuoteElement' },
        'ol': { id: 'the-ol-element', category: 'grouping content', implicitAriaRole: 'list', DOMInterface: 'HTMLOListElement' },
        'ul': { id: 'the-ul-element', category: 'grouping content', implicitAriaRole: 'list', DOMInterface: 'HTMLUListElement' },
        'li': { id: 'the-li-element', category: 'grouping content', implicitAriaRole: 'listitem', DOMInterface: 'HTMLLIElement' },
        'dl': { id: 'the-dl-element', category: 'grouping content', DOMInterface: 'HTMLDListElement' },
        'dt': { id: 'the-dt-element', category: 'grouping content', DOMInterface: 'HTMLElement' },
        'dd': { id: 'the-dd-element', category: 'grouping content', DOMInterface: 'HTMLElement' },
        'figure': { id: 'the-figure-element', category: 'grouping content', implicitAriaRole: 'figure', DOMInterface: 'HTMLElement' },
        'figcaption': { id: 'the-figcaption-element', category: 'grouping content', implicitAriaRole: 'caption', DOMInterface: 'HTMLElement' },
        'main': { id: 'the-main-element', category: 'grouping content', implicitAriaRole: 'main', DOMInterface: 'HTMLElement' },
        'div': { id: 'the-div-element', category: 'grouping content', implicitAriaRole: 'generic', DOMInterface: 'HTMLDivElement' },
        'a': { id: 'the-a-element', category: 'text-level semantics', focusable: 'a[href]', implicitAriaRole: { '[href]': 'link' }, DOMInterface: 'HTMLAnchorElement' },
        'em': { id: 'the-em-element', category: 'text-level semantics', implicitAriaRole: 'emphasis', DOMInterface: 'HTMLElement' },
        'strong': { id: 'the-strong-element', category: 'text-level semantics', implicitAriaRole: 'strong', DOMInterface: 'HTMLElement' },
        'small': { id: 'the-small-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        's': { id: 'the-s-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'cite': { id: 'the-cite-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'q': { id: 'the-q-element', category: 'text-level semantics', DOMInterface: 'HTMLQuoteElement' },
        'dfn': { id: 'the-dfn-element', category: 'text-level semantics', implicitAriaRole: 'term', DOMInterface: 'HTMLElement' },
        'abbr': { id: 'the-abbr-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'ruby': { id: 'the-ruby-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'rb': { id: 'the-rb-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'rt': { id: 'the-rt-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'rtc': { id: 'the-rtc-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'rp': { id: 'the-rp-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'data': { id: 'the-data-element', category: 'text-level semantics', DOMInterface: 'HTMLDataElement' },
        'time': { id: 'the-time-element', category: 'text-level semantics', implicitAriaRole: 'time', DOMInterface: 'HTMLTimeElement' },
        'code': { id: 'the-code-element', category: 'text-level semantics', implicitAriaRole: 'code', DOMInterface: 'HTMLElement' },
        'var': { id: 'the-var-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'samp': { id: 'the-samp-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'kbd': { id: 'the-kbd-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'sub': { id: 'the-sub-and-sup-elements', category: 'text-level semantics', implicitAriaRole: 'subscript', DOMInterface: 'HTMLElement' },
        'sup': { id: 'the-sub-and-sup-elements', category: 'text-level semantics', implicitAriaRole: 'superscript', DOMInterface: 'HTMLElement' },
        'i': { id: 'the-i-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'b': { id: 'the-b-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'u': { id: 'the-u-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'mark': { id: 'the-mark-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'bdi': { id: 'the-bdi-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'bdo': { id: 'the-bdo-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'span': { id: 'the-span-element', category: 'text-level semantics', implicitAriaRole: 'generic', DOMInterface: 'HTMLSpanElement' },
        'br': { id: 'the-br-element', category: 'text-level semantics', DOMInterface: 'HTMLBRElement' },
        'wbr': { id: 'the-wbr-element', category: 'text-level semantics', DOMInterface: 'HTMLElement' },
        'ins': { id: 'the-ins-element', category: 'edits', implicitAriaRole: 'insertion', DOMInterface: 'HTMLModElement' },
        'del': { id: 'the-del-element', category: 'edits', implicitAriaRole: 'deletion', DOMInterface: 'HTMLModElement' },
        'picture': { id: 'the-picture-element', category: 'embedded content', DOMInterface: 'HTMLPictureElement' },
        'source': { id: 'the-source-element', category: 'embedded content', DOMInterface: 'HTMLSourceElement' },
        'img': { id: 'the-img-element', category: 'embedded content', implicitAriaRole: { '[alt=""]': ['none', 'presentation'], '[alt]:not([alt=""])': 'img' }, DOMInterface: 'HTMLImageElement' },
        'iframe': { id: 'the-iframe-element', category: 'embedded content', focusable: true, DOMInterface: 'HTMLIFrameElement' },
        'embed': { id: 'the-embed-element', category: 'embedded content', focusable: true, DOMInterface: 'HTMLEmbedElement' },
        'object': { id: 'the-object-element', category: 'embedded content', focusable: true, DOMInterface: 'HTMLObjectElement' },
        'param': { id: 'the-param-element', category: 'embedded content', DOMInterface: 'HTMLParamElement' },
        'video': { id: 'the-video-element', category: 'embedded content', focusable: true, DOMInterface: 'HTMLVideoElement' },
        'audio': { id: 'the-audio-element', category: 'embedded content', focusable: true, DOMInterface: 'HTMLAudioElement' },
        'track': { id: 'the-track-element', category: 'embedded content', DOMInterface: 'HTMLTrackElement' },
        'map': { id: 'the-map-element', category: 'embedded content', DOMInterface: 'HTMLMapElement' },
        'area': { id: 'the-area-element', category: 'embedded content', focusable: 'area[href]', implicitAriaRole: { 'href': 'link' }, DOMInterface: 'HTMLAreaElement' },
        'table': { id: 'the-table-element', category: 'tabular data', implicitAriaRole: 'table', DOMInterface: 'HTMLTableElement' },
        'caption': { id: 'the-caption-element', category: 'tabular data', implicitAriaRole: 'caption', DOMInterface: 'HTMLTableCaptionElement' },
        'colgroup': { id: 'the-colgroup-element', category: 'tabular data', DOMInterface: 'HTMLTableColElement' },
        'col': { id: 'the-col-element', category: 'tabular data', DOMInterface: 'HTMLTableColElement' },
        'tbody': { id: 'the-tbody-element', category: 'tabular data', implicitAriaRole: 'rowgroup', DOMInterface: 'HTMLTableSectionElement' },
        'thead': { id: 'the-thead-element', category: 'tabular data', implicitAriaRole: 'rowgroup', DOMInterface: 'HTMLTableSectionElement' },
        'tfoot': { id: 'the-tfoot-element', category: 'tabular data', implicitAriaRole: 'rowgroup', DOMInterface: 'HTMLTableSectionElement' },
        'tr': { id: 'the-tr-element', category: 'tabular data', implicitAriaRole: 'row', DOMInterface: 'HTMLTableRowElement' },
        'td': { id: 'the-td-element', category: 'tabular data', implicitAriaRole: 'cell', DOMInterface: 'HTMLTableDataCellElement' },
        'th': { id: 'the-th-element', category: 'tabular data', implicitAriaRole: { '[scope="col"]': 'columnheader', '[scope="row"]': 'rowheader', 'th:not([scope])': ['columnheader', 'rowheader'] }, DOMInterface: 'HTMLTableHeaderCellElement' },
        'form': { id: 'the-form-element', category: 'forms', implicitAriaRole: 'form', DOMInterface: 'HTMLFormElement' },
        'label': { id: 'the-label-element', category: 'forms', DOMInterface: 'HTMLLabelElement' },
        'input': { id: 'the-input-element', category: 'forms', focusable: 'input:not([disabled])', implicitAriaRole: {
                'input:not([type]):not([list])': 'textbox',
                '[type="text"]:not([list])': 'textbox',
                'input[list]:not([type])': 'combobox',
                '[type="text"][list]': 'combobox',
                '[type="search"]:not([list])': 'searchbox',
                '[type="search"][list]': 'combobox',
                '[type="tel"]:not([list])': 'textbox',
                '[type="tel"][list]': 'combobox',
                '[type="url"]:not([list])': 'textbox',
                '[type="url"][list]': 'combobox',
                '[type="email"]:not([list])': 'textbox',
                '[type="email"][list]': 'combobox',
                '[type="number"]': 'spinbutton',
                '[type="range"]': 'slider',
                '[type="checkbox"]': 'checkbox',
                '[type="radio"]': 'radio',
                '[type="submit"]': 'button',
                '[type="image"]': 'button',
                '[type="reset"]': 'button',
                '[type="button"]': 'button'
            }, DOMInterface: 'HTMLInputElement' },
        'button': { id: 'the-button-element', category: 'forms', focusable: 'button:not([disabled])', implicitAriaRole: 'button', DOMInterface: 'HTMLButtonElement' },
        'select': { id: 'the-select-element', category: 'forms', focusable: 'select:not([disabled])', implicitAriaRole: {
                'select:not([multiple]):not([size])': 'combobox',
                'select[multiple]': 'listbox',
                'select[size]:not([multiple])': { type: 'integer', attribute: 'size', greaterthan: 1, role: ['combobox', 'listbox'] }
            }, DOMInterface: 'HTMLSelectElement' },
        'datalist': { id: 'the-datalist-element', category: 'forms', implicitAriaRole: 'listbox', DOMInterface: 'HTMLDataListElement' },
        'optgroup': { id: 'the-optgroup-element', category: 'forms', implicitAriaRole: 'group', DOMInterface: 'HTMLOptGroupElement' },
        'option': { id: 'the-option-element', category: 'forms', implicitAriaRole: 'option', DOMInterface: 'HTMLOptionElement' },
        'textarea': { id: 'the-textarea-element', category: 'forms', focusable: 'textarea:not([disabled])', implicitAriaRole: 'textbox', DOMInterface: 'HTMLTextAreaElement' },
        'output': { id: 'the-output-element', category: 'forms', implicitAriaRole: 'status', DOMInterface: 'HTMLOutputElement' },
        'progress': { id: 'the-progress-element', category: 'forms', implicitAriaRole: 'progressbar', DOMInterface: 'HTMLProgressElement' },
        'meter': { id: 'the-meter-element', category: 'forms', DOMInterface: 'HTMLMeterElement' },
        'fieldset': { id: 'the-fieldset-element', category: 'forms', implicitAriaRole: 'group', DOMInterface: 'HTMLFieldSetElement' },
        'legend': { id: 'the-legend-element', category: 'forms', DOMInterface: 'HTMLLegendElement' },
        'details': { id: 'the-details-element', category: 'interactive elements', implicitAriaRole: 'group', DOMInterface: 'HTMLDetailsElement' },
        'summary': { id: 'the-summary-element', category: 'interactive elements', implicitAriaRole: 'button', DOMInterface: 'HTMLElement' },
        'dialog': { id: 'the-dialog-element', category: 'interactive elements', implicitAriaRole: 'dialog', DOMInterface: 'HTMLDialogElement' },
        'script': { id: 'the-script-element', category: 'scripting', DOMInterface: 'HTMLScriptElement' },
        'noscript': { id: 'the-noscript-element', category: 'scripting', DOMInterface: 'HTMLElement' },
        'template': { id: 'the-template-element', category: 'scripting', DOMInterface: 'HTMLTemplateElement' },
        'canvas': { id: 'the-canvas-element', category: 'scripting', DOMInterface: 'HTMLCanvasElement' }
    }
};

var HTML = {
    getFocusableElementsSelector: function () {
        var elements = [];
        for (var element in htmlData.elements) {
            if (htmlData.elements[element].hasOwnProperty('focusable')) {
                var focusable = htmlData.elements[element].focusable;
                elements.push((focusable.constructor == String ? focusable : element) + ':not([tabindex="-1"])');
            }
        }
        elements.push('[contenteditable="true"]', '[tabindex="0"]');
        return elements.join(', ');
    }
};

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
if (!('getImplicitAriaRole' in HTMLElement.prototype)) HTMLElement.prototype.getImplicitAriaRole = getImplicitAriaRole;
if (!('getImplicitAriaRole' in SVGElement.prototype)) SVGElement.prototype.getImplicitAriaRole = getImplicitAriaRole;

// TODO: fin HTML.

// TODO: début Language.

/*
    IANA Language Subtag Registry
    https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
    Note : only the 30 main languages in the world.
*/
var languages = {
    fileDate: '2020-05-12',
    data: {
        'en': { description: 'English', added:'2005-10-16', suppressScript: 'Latn' },
        'cmn': { description: 'Mandarin Chinese', added:'2009-07-29', macrolanguage: 'zh' },
        'hi': { description: 'Hindi', added:'2005-10-16', suppressScript: 'Deva' },
        'es': { description: ['Spanish', 'Castilian'], added:'2005-10-16', suppressScript: 'Latn' },
        'fr': { description: 'French', added:'2005-10-16', suppressScript: 'Latn' },
        'ar': { description: 'Arabic', added:'2005-10-16', suppressScript: 'Arab', scope: 'macrolanguage' },
        'bn': { description: ['Bengali', 'Bangla'], added:'2005-10-16', suppressScript: 'Beng' },
        'ru': { description: 'Russian', added:'2005-10-16', suppressScript: 'Cyrl' },
        'pt': { description: 'Portuguese', added:'2005-10-16', suppressScript: 'Latn' },
        'id': { description: 'Indonesian', added:'2005-10-16', suppressScript: 'Latn', macrolanguage: 'ms' },
        'ur': { description: 'Urdu', added:'2005-10-16', suppressScript: 'Arab' },
        'de': { description: 'German', added:'2005-10-16', suppressScript: 'Latn' },
        'ja': { description: 'Japanese', added:'2005-10-16', suppressScript: 'Jpan' },
        'sw': { description: 'Swahili (macrolanguage)', added:'2005-10-16', suppressScript: 'Latn', scope: 'macrolanguage' },
        'mr': { description: 'Marathi', added:'2005-10-16', suppressScript: 'Deva' },
        'te': { description: 'Telugu', added:'2005-10-16', suppressScript: 'Telu' },
        'tr': { description: 'Turkish', added:'2005-10-16', suppressScript: 'Latn' },
        'yue': { description: ['Yue Chinese', 'Cantonese'], added:'2009-07-29', macrolanguage: 'zh' },
        'ta': { description: 'Tamil', added:'2005-10-16', suppressScript: 'Taml' },
        'pa': { description: ['Panjabi', 'Punjabi'], added:'2005-10-16', suppressScript: 'Guru' },
        'wuu': { description: 'Wu Chinese', added:'2009-07-29', macrolanguage: 'zh' },
        'ko': { description: 'Korean', added:'2005-10-16', suppressScript: 'Kore' },
        'vi': { description: 'Vietnamese', added:'2005-10-16', suppressScript: 'Latn' },
        'ha': { description: 'Hausa', added:'2005-10-16' },
        'jv': { description: 'Javanese', added:'2005-10-16' },
        'arz': { description: 'Egyptian Arabic', added:'2009-07-29', preferredValue: 'arz', prefix: 'ar', macrolanguage: 'ar' },
        'it': { description: 'Italian', added:'2005-10-16', suppressScript: 'Latn' },
        'th': { description: 'Thai', added:'2005-10-16', suppressScript: 'Thai' },
        'gu': { description: 'Gujarati', added:'2005-10-16', suppressScript: 'Gujr' },
        'kn': { description: 'Kannada', added:'2005-10-16', suppressScript: 'Knda' }
    }
};

// hasValidLanguageCode.
var hasValidLanguageCode = function () {
    var r = /^[a-z]{2,}(-[a-z]{2,})*$/i;
    var lang1 = this.hasAttribute('lang') ? this.getAttribute('lang') : null;
    var lang2 = this.hasAttribute('xml:lang') ? this.getAttribute('xml:lang') : null;

    if(lang1 !== null && lang2 !== null) {
        var langA = lang1.includes('-') ? lang1.split('-')[0] : lang1;
        var langB = lang2.includes('-') ? lang2.split('-')[0] : lang2;
        
        if(langA != langB) {
            return false;
        } else {
            var lang = lang1;
        }
    } else if(lang1) {
        var lang = lang1;
    } else if(lang2) {
        var lang = lang2;
    }

    if (lang && r.test(lang)) {
        var computedlang = lang;
        if (lang.includes('-')) {
            computedlang = lang.split('-');
            computedlang = computedlang[0];
        }
        return languages.data.hasOwnProperty(computedlang);
    }
    else {
        return false;
    }
};
if (!('hasValidLanguageCode' in SVGElement.prototype)) SVGElement.prototype.hasValidLanguageCode = hasValidLanguageCode;
if (!('hasValidLanguageCode' in HTMLElement.prototype)) HTMLElement.prototype.hasValidLanguageCode = hasValidLanguageCode;

// TODO: fin Language.

// TODO: début ARIA.

/*
	Accessible Rich Internet Applications (WAI-ARIA) 1.2
	W3C Working Draft 18 December 2019
	https://www.w3.org/TR/wai-aria-1.2/
*/

var ariaData = {
    version: 1.2,
    status: 'Working Draft (WD)',
    date: 20191218,
    url: {
        rolesCategorization: 'https://www.w3.org/TR/wai-aria-1.2/#{{category}}',
        attributesCategorization: 'https://www.w3.org/TR/wai-aria-1.2/#{{category}}',
        roles: 'https://www.w3.org/TR/wai-aria-1.2/#{{role}}',
        properties: 'https://www.w3.org/TR/wai-aria-1.2/#{{property}}',
        states: 'https://www.w3.org/TR/wai-aria-1.2/#{{state}}'
    },
    rolesCategorization: {
        'abstract roles': { id: 'abstract_roles', name: 'Abstract Roles' },
        'widget roles': { id: 'widget_roles', name: 'Widget Roles' },
        'document structure roles': { id: 'document_structure_roles', name: 'Document Structure Roles' },
        'landmark roles': { id: 'landmark_roles', name: 'Landmark Roles' },
        'live region roles': { id: 'live_region_roles', name: 'Live Region Roles' },
        'window roles': { id: 'window_roles', name: 'Window Roles' }
    },
    attributesCategorization: {
        'widget attributes': { id: 'attrs_widgets', name: 'Widget Attributes' },
        'live region attributes': { id: 'attrs_liveregions', name: 'Live Region Attributes' },
        'drag-and-drop attributes': { id: 'attrs_dragdrop', name: 'Drag-and-Drop Attributes' },
        'relationship attributes': { id: 'attrs_relationships', name: 'Relationship Attributes' }
    },
    roles: {
        'alert': {
            category: 'live region roles',
            description: 'A type of live region with important, and usually time-sensitive, information. See related alertdialog and status.',
            superclassRoles: 'section',
            subclassRoles: 'alertdialog',
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-live': 'assertive', 'aria-atomic': 'true' }]
        },
        'alertdialog': {
            category: 'window roles',
            description: 'A type of dialog that contains an alert message, where initial focus goes to an element within the dialog. See related alert and dialog.',
            superclassRoles: ['alert', 'dialog'],
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'application': {
            category: 'document structure roles',
            description: 'A structure containing one or more focusable elements requiring user input, such as keyboard or gesture events, that do not follow a standard interaction pattern supported by a widget role.',
            superclassRoles: 'structure',
            supportedStatesProperties: ['aria-activedescendant', 'aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-invalid'],
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'article': {
            category: 'document structure roles',
            description: 'A section of a page that consists of a composition that forms an independent part of a document, page, or site.',
            superclassRoles: 'document',
            relatedHTMLConcepts: '<article>',
            suportedStatesProperties: ['aria-posinset', 'aria-setsize'],
            nameFrom: 'author'
        },
        'banner': {
            category: 'landmark roles',
            description: 'A landmark that contains mostly site-oriented content, rather than page-specific content.',
            superclassRoles: 'landmark',
            nameFrom: 'author'
        },
        'blockquote': {
            category: 'document structure roles',
            description: 'A section of content that is quoted from another source.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<blockquote>',
            nameFrom: 'author'
        },
        'button': {
            category: 'widget roles',
            description: 'An input that allows for user-triggered actions when clicked or pressed. See related link.',
            superclassRoles: 'command',
            baseHTMLConcept: '<button>',
            relatedConcepts: 'link',
            supportedStatesProperties: ['aria-disabled', 'aria-haspopup', 'aria-expanded', 'aria-pressed'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'caption': {
            category: 'document structure roles',
            description: 'Visible content that names, and may also describe, a figure, table, or grid.',
            superclassRoles: 'section',
            relatedHTMLConcepts: ['<caption>', '<figcaption>'],
            requiredContextRole: ['figure', 'grid', 'table'],
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'cell': {
            category: 'document structure roles',
            description: 'A cell in a tabular container. See related gridcell.',
            superclassRoles: 'section',
            subclassRoles: ['columnheader', 'gridcell', 'rowheader'],
            baseHTMLConcept: '<td>',
            requiredContextRole: 'row',
            supportedStatesProperties: ['aria-colindex', 'aria-colspan', 'aria-rowindex', 'aria-rowspan'],
            nameFrom: ['contents', 'author']
        },
        'checkbox': {
            category: 'widget roles',
            description: 'A checkable input that has three possible values: true, false, or mixed.',
            superclassRoles: 'input',
            subclassRoles: ['menuitemcheckbox', 'switch'],
            relatedHTMLConcepts: '<input type="checkbox">',
            relatedConcepts: 'option',
            requiredStatesProperties: ['aria-checked'],
            supportedStatesProperties: ['aria-errormessage', 'aria-expanded', 'aria-invalid', 'aria-readonly', 'aria-required'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'code': {
            category: 'document structure roles',
            description: 'A section whose content represents a fragment of computer code.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<code>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'columnheader': {
            category: 'document structure roles',
            description: 'A cell containing header information for a column.',
            superclassRoles: ['cell', 'gridcell', 'sectionhead'],
            baseHTMLConcept: '<th scope="col">',
            requiredContextRole: 'row',
            supportedStatesProperties: ['aria-sort'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true
        },
        'combobox': {
            category: 'widget roles',
            description: 'An input that controls another element, such as a listbox or grid, that can dynamically pop up to help the user set the value of the input.',
            superclassRoles: 'input',
            relatedHTMLConcepts: '<select>',
            requiredStatesProperties: ['aria-controls', 'aria-expanded'],
            supportedStatesProperties: ['aria-activedescendant', 'aria-autocomplete', 'aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-readonly', 'aria-required'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            implicitValueForRole: [{ 'aria-expanded': 'false' }, { 'aria-haspopup': 'listbox' }]
        },
        'command': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A form of widget that performs an action but does not receive input data.',
            superclassRoles: 'widget',
            subclassRoles: ['button', 'link', 'menuitem'],
            relatedHTMLConcepts: '<menuitem>',
            nameFrom: 'author'
        },
        'complementary': {
            category: 'landmark roles',
            description: 'A landmark that is designed to be complementary to the main content at a similar level in the DOM hierarchy, but remaining meaningful when separated from the main content.',
            superclassRoles: 'landmark',
            nameFrom: 'author'
        },
        'composite': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A widget that may contain navigable descendants or owned children.',
            superclassRoles: 'widget',
            subclassRoles: ['grid', 'select', 'spinbutton', 'tablist'],
            supportedStatesProperties: ['aria-activedescendant', 'aria-disabled'],
            nameFrom: 'author'
        },
        'contentinfo': {
            category: 'landmark roles',
            description: 'A landmark that contains information about the parent document.',
            superclassRoles: 'landmark',
            nameFrom: 'author'
        },
        'definition': {
            category: 'document structure roles',
            description: 'A definition of a term or concept. See related term.',
            superclassRoles: 'section',
            nameFrom: 'author'
        },
        'deletion': {
            category: 'document structure',
            description: 'A deletion contains content that is marked as removed or content that is being suggested for removal. See related insertion.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<del>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'dialog': {
            category: 'live region roles',
            description: 'A dialog is a descendant window of the primary window of a web application. For HTML pages, the primary application window is the entire web document, i.e., the body element.',
            superclassRoles: 'window',
            subclassRoles: 'alertdialog',
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'directory': {
            isDeprecated: true,
            category: 'document structure roles',
            description: 'A list of references to members of a group, such as a static table of contents.',
            superclassRoles: 'list',
            nameFrom: 'author'
        },
        'document': {
            category: 'document structure roles',
            description: 'An element containing content that assistive technology users may want to browse in a reading mode.',
            superclassRoles: 'structure',
            subclassRoles: 'article',
            nameFrom: 'author',
            accessibleNameRequired: false
        },
        'emphasis': {
            category: 'document structure',
            description: 'One or more emphasized characters. See related strong.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<em>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'feed': {
            category: 'document structure roles',
            description: 'A scrollable list of articles where scrolling may cause articles to be added to or removed from either end of the list.',
            superclassRoles: 'list',
            requiredOwnedElements: 'article',
            nameFrom: 'author',
            accessibleNameRequired: false
        },
        'figure': {
            category: 'document structure roles',
            description: 'A perceivable section of content that typically contains a graphical document, images, code snippets, or example text. The parts of a figure MAY be user-navigable.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<figure>',
            nameFrom: 'author',
            accessibleNameRequired: false
        },
        'form': {
            category: 'landmark roles',
            description: 'A landmark region that contains a collection of items and objects that, as a whole, combine to create a form. See related search.',
            superclassRoles: 'landmark',
            baseHTMLConcept: '<form>',
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'generic': {
            category: 'document structure',
            description: 'A nameless container element that has no semantic meaning on its own.',
            superclassRoles: 'structure',
            relatedHTMLConcepts: ['<div>', '<span>'],
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'grid': {
            category: 'widget roles',
            description: 'A composite widget containing a collection of one or more rows with one or more cells where some or all cells in the grid are focusable by using methods of two-dimensional navigation, such as directional arrow keys.',
            superclassRoles: ['composite', 'table'],
            subclassRoles: 'treegrid',
            baseHTMLConcept: '<table>',
            requiredOwnedElements: ['row', 'rowgroup > row'],
            supportedStatesProperties: ['aria-multiselectable', 'aria-readonly'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            focusable: true
        },
        'gridcell': {
            category: 'widget roles',
            description: 'A cell in a grid or treegrid.',
            superclassRoles: ['cell', 'widget'],
            subclassRoles: ['columnheader', 'rowheader'],
            baseHTMLConcept: '<td>',
            requiredContextRole: 'row',
            supportedStatesProperties: ['aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 'aria-readonly', 'aria-required', 'aria-selected'],
            nameFrom: ['contents', 'author']
        },
        'group': {
            category: 'document structure roles',
            description: 'A set of user interface objects that is not intended to be included in a page summary or table of contents by assistive technologies.',
            superclassRoles: 'section',
            subclassRoles: ['row', 'select', 'toolbar'],
            relatedHTMLConcepts: '<fieldset>',
            supportedStatesProperties: ['aria-activedescendant', 'aria-disabled'],
            nameFrom: 'author'
        },
        'heading': {
            category: 'document structure roles',
            description: 'A heading for a section of the page.',
            superclassRoles: 'sectionhead',
            relatedHTMLConcepts: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            requiredStatesProperties: ['aria-level'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            implicitValueForRole: [{ 'aria-level': '2' }]
        },
        'img': {
            category: 'document structure roles',
            description: 'A container for a collection of elements that form an image.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<img>',
            nameFrom: 'author',
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'input': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A generic type of widget that allows user input.',
            superclassRoles: 'widget',
            subclassRoles: ['checkbox', 'combobox', 'option', 'radio', 'slider', 'spinbutton', 'textbox'],
            supportedStatesProperties: 'aria-disabled',
            nameFrom: 'author'
        },
        'insertion': {
            category: 'document structure',
            description: 'An insertion contains content that is marked as added or content that is being suggested for addition. See related deletion.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<ins>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'landmark': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A perceivable section containing content that is relevant to a specific, author-specified purpose and sufficiently important that users will likely want to be able to navigate to the section easily and to have it listed in a summary of the page. Such a page summary could be generated dynamically by a user agent or assistive technology.',
            superclassRoles: 'section',
            subclassRoles: ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search'],
            nameFrom: 'author',
            accessibleNameRequired: false
        },
        'link': {
            category: 'widget roles',
            description: 'An interactive reference to an internal or external resource that, when activated, causes the user agent to navigate to that resource. See related button.',
            superclassRoles: 'command',
            relatedHTMLConcepts: ['<a>', '<link>'],
            supportedStatesProperties: ['aria-disabled', 'aria-expanded'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true
        },
        'list': {
            category: 'document structure roles',
            description: 'A section containing listitem elements. See related listbox.',
            superclassRoles: 'section',
            subclassRoles: ['directory', 'feed'],
            baseHTMLConcept: ['<ol>', '<ul>'],
            requiredOwnedElements: 'listitem',
            nameFrom: 'author'
        },
        'listbox': {
            category: 'widget roles',
            description: 'A widget that allows the user to select one or more items from a list of choices. See related combobox and list.',
            superclassRoles: 'select',
            relatedHTMLConcepts: '<select>',
            relatedConcepts: 'list',
            requiredOwnedElements: ['group > option', 'option'],
            supportedStatesProperties: ['aria-errormessage', 'aria-expanded', 'aria-invalid', 'aria-multiselectable', 'aria-readonly', 'aria-required'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            implicitValueForRole: [{ 'aria-orientation': 'vertical' }],
            focusable: true
        },
        'listitem': {
            category: 'document structure roles',
            description: 'A single item in a list or directory.',
            superclassRoles: 'section',
            subclassRoles: 'treeitem',
            baseHTMLConcept: '<li>',
            requiredContextRole: ['directory', 'list'],
            supportedStatesProperties: ['aria-level', 'aria-posinset', 'aria-setsize'],
            nameFrom: 'author'
        },
        'log': {
            category: 'live region roles',
            description: 'A type of live region where new information is added in meaningful order and old information may disappear. See related marquee.',
            superclassRoles: 'section',
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-live': 'polite' }]
        },
        'main': {
            category: 'landmark roles',
            description: 'A landmark containing the main content of a document.',
            superclassRoles: 'landmark',
            nameFrom: 'author'
        },
        'marquee': {
            category: 'live region roles',
            description: 'A type of live region where non-essential information changes frequently. See related log.',
            superclassRoles: 'section',
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'math': {
            category: 'document structure roles',
            description: 'Content that represents a mathematical expression.',
            superclassRoles: 'section',
            nameFrom: 'author',
            childrenPresentational: false
        },
        'menu': {
            category: 'widget roles',
            description: 'A type of widget that offers a list of choices to the user.',
            superclassRoles: 'select',
            subclassRoles: 'menubar',
            relatedConcepts: 'list',
            requiredOwnedElements: ['group > menuitem', 'group > menuitemradio', 'group > menuitemcheckbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio'],
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-orientation': 'vertical' }],
            focusable: true
        },
        'menubar': {
            category: 'widget roles',
            description: 'A presentation of menu that usually remains visible and is usually presented horizontally.',
            superclassRoles: 'menu',
            subclassRoles: 'toolbar',
            requiredOwnedElements: ['group > menuitem', 'group > menuitemradio', 'group > menuitemcheckbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio'],
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-orientation': 'horizontal' }],
            focusable: true
        },
        'menuitem': {
            category: 'widget roles',
            description: 'An option in a set of choices contained by a menu or menubar.',
            superclassRoles: 'command',
            subclassRoles: 'menuitemcheckbox',
            relatedHTMLConcepts: '<menuitem>',
            relatedConcepts: ['listitem', 'option'],
            requiredContextRole: ['group', 'menu', 'menubar'],
            supportedStatesProperties: ['aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-posinset', 'aria-setsize'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true
        },
        'menuitemcheckbox': {
            category: 'widget roles',
            description: 'A menuitem with a checkable state whose possible values are true, false, or mixed.',
            superclassRoles: ['checkbox', 'menuitem'],
            subclassRoles: 'menuitemradio',
            relatedConcepts: 'menuitem',
            requiredContextRole: ['group', 'menu', 'menubar'],
            requiredStatesProperties: ['aria-checked'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'menuitemradio': {
            category: 'widget roles',
            description: 'A checkable menuitem in a set of elements with the same role, only one of which can be checked at a time.',
            superclassRoles: ['menuitemcheckbox', 'radio'],
            relatedConcepts: 'menuitem',
            requiredContextRole: ['group', 'menu', 'menubar'],
            requiredStatesProperties: ['aria-checked'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'meter': {
            category: 'document structure',
            description: 'An element that represents a scalar measurement within a known range, or a fractional value. See related progressbar.',
            superclassRoles: 'range',
            relatedHTMLConcepts: '<meter>',
            requiredStatesProperties: ['aria-valuemax', 'aria-valuemin', 'aria-valuenow'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'navigation': {
            category: 'landmark roles',
            description: 'A landmark containing a collection of navigational elements (usually links) for navigating the document or related documents.',
            superclassRoles: 'landmark',
            relatedHTMLConcepts: '<nav>',
            nameFrom: 'author'
        },
        'none': {
            category: 'document structure roles',
            description: 'An element whose implicit native role semantics will not be mapped to the accessibility API. See synonym presentation.',
            superclassRoles: 'structure',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited',
            synonym: 'presentation'
        },
        'note': {
            category: 'document structure roles',
            description: 'A section whose content is parenthetic or ancillary to the main content of the resource.',
            superclassRoles: 'section',
            nameFrom: 'author'
        },
        'option': {
            category: 'widget roles',
            description: 'A selectable item in a listbox.',
            superclassRoles: 'input',
            subclassRoles: 'treeitem',
            baseHTMLConcept: '<option>',
            relatedConcepts: 'listitem',
            requiredContextRole: ['group', 'listbox'],
            requiredStatesProperties: ['aria-selected'],
            supportedStatesProperties: ['aria-checked', 'aria-posinset', 'aria-setsize'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true,
            implicitValueForRole: [{ 'aria-selected': 'false' }]
        },
        'paragraph': {
            category: 'document structure roles',
            description: 'A paragraph of content.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<p>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'presentation': {
            category: 'document structure roles',
            description: 'An element whose implicit native role semantics will not be mapped to the accessibility API. See synonym none.',
            superclassRoles: 'structure',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited',
            synonym: 'none'
        },
        'progressbar': {
            category: 'widget roles',
            description: 'An element that displays the progress status for tasks that take a long time.',
            superclassRoles: ['range', 'widget'],
            relatedConcepts: 'status',
            nameFrom: 'author',
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'radio': {
            category: 'widget roles',
            description: 'A checkable input in a group of elements with the same role, only one of which can be checked at a time.',
            superclassRoles: 'input',
            subclassRoles: 'menuitemradio',
            relatedHTMLConcepts: '<input type="radio">',
            requiredStatesProperties: ['aria-checked'],
            supportedStatesProperties: ['aria-posinset', 'aria-setsize'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'radiogroup': {
            category: 'widget roles',
            description: 'A group of radio buttons.',
            superclassRoles: 'select',
            relatedConcepts: 'list',
            requiredOwnedElements: 'radio',
            supportedStatesProperties: ['aria-errormessage', 'aria-invalid', 'aria-readonly', 'aria-required'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            focusable: true
        },
        'range': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'An element representing a range of values.',
            superclassRoles: 'structure',
            subclassRoles: ['meter', 'progressbar', 'scrollbar', 'slider', 'spinbutton'],
            supportedStatesProperties: ['aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'],
            nameFrom: 'author',
            comment: 'Seems incorrectly categorized as structure in ARIA 1.2. See Class Diagram (range is associated with widget).'
        },
        'region': {
            category: 'landmark roles',
            description: 'A landmark containing content that is relevant to a specific, author-specified purpose and sufficiently important that users will likely want to be able to navigate to the section easily and to have it listed in a summary of the page. Such a page summary could be generated dynamically by a user agent or assistive technology.',
            superclassRoles: 'landmark',
            relatedConcepts: 'section',
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'roletype': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'The base role from which all other roles inherit.',
            subclassRoles: ['structure', 'widget', 'window'],
            supportedStatesProperties: ['aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription']
        },
        'row': {
            category: 'document structure roles',
            description: 'A row of cells in a tabular container.',
            superclassRoles: ['group', 'widget'],
            baseHTMLConcept: '<tr>',
            requiredContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
            requiredOwnedElements: ['cell', 'columnheader', 'gridcell', 'rowheader'],
            supportedStatesProperties: ['aria-colindex', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-rowindex', 'aria-setsize', 'aria-selected'],
            nameFrom: ['contents', 'author']
        },
        'rowgroup': {
            category: 'document structure roles',
            description: 'A structure containing one or more row elements in a tabular container.',
            superclassRoles: 'structure',
            baseHTMLConcept: ['<tbody>', '<tfoot>', '<thead>'],
            requiredContextRole: ['grid', 'table', 'treegrid'],
            requiredOwnedElements: 'row',
            nameFrom: ['contents', 'author']
        },
        'rowheader': {
            category: 'document structure roles',
            description: 'A cell containing header information for a row.',
            superclassRoles: ['cell', 'gridcell', 'sectionhead'],
            baseHTMLConcept: '<th scope="row">',
            requiredContextRole: 'row',
            supportedStatesProperties: ['aria-expanded', 'aria-sort'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true
        },
        'scrollbar': {
            category: 'widget roles',
            description: 'A graphical object that controls the scrolling of content within a viewing area, regardless of whether the content is fully displayed within the viewing area.',
            superclassRoles: ['range', 'widget'],
            requiredStatesProperties: ['aria-controls', 'aria-valuenow'],
            supportedStatesProperties: ['aria-disabled', 'aria-orientation', 'aria-valuemax', 'aria-valuemin'],
            nameFrom: 'author',
            accessibleNameRequired: false,
            childrenPresentational: true,
            implicitValueForRole: [{ 'aria-orientation': 'vertical' }, { 'aria-valuemin': '0' }, { 'aria-valuemax': '100' }]
        },
        'search': {
            category: 'landmark roles',
            description: 'A landmark region that contains a collection of items and objects that, as a whole, combine to create a search facility. See related form and searchbox.',
            superclassRoles: 'landmark',
            nameFrom: 'author'
        },
        'searchbox': {
            category: 'widget roles',
            description: 'A type of textbox intended for specifying search criteria. See related textbox and search.',
            superclassRoles: 'textbox',
            baseHTMLConcept: '<input type="search">',
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'section': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A renderable structural containment unit in a document or application.',
            superclassRoles: 'structure',
            subclassRoles: ['alert', 'blockquote', 'caption', 'cell', 'code', 'definition', 'deletion', 'emphasis', 'figure', 'group', 'img', 'insertion', 'landmark', 'list', 'listitem', 'log', 'marquee', 'math', 'note', 'paragraph', 'status', 'strong', 'subscript', 'superscript', 'table', 'tabpanel', 'term', 'time', 'tooltip']
        },
        'sectionhead': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A structure that labels or summarizes the topic of its related section.',
            superclassRoles: 'structure',
            subclassRoles: ['columnheader', 'heading', 'rowheader', 'tab'],
            nameFrom: ['contents', 'author']
        },
        'select': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A form widget that allows the user to make selections from a set of choices.',
            superclassRoles: ['composite', 'group'],
            subclassRoles: ['listbox', 'menu', 'radiogroup', 'tree'],
            supportedStatesProperties: 'aria-orientation',
            nameFrom: 'author'
        },
        'separator': {
            description: 'A divider that separates and distinguishes sections of content or groups of menuitems.',
            focusable: [
                {
                    category: 'document structure roles',
                    superclassRoles: 'structure',
                    relatedHTMLConcepts: '<hr>',
                    supportedStatesProperties: 'aria-orientation',
                    nameFrom: 'author',
                    childrenPresentational: true,
                    implicitValueForRole: [{ 'aria-orientation': 'horizontal' }]
                }, {
                    category: 'widget roles',
                    superclassRoles: 'widget',
                    requiredStatesProperties: ['aria-valuenow'],
                    supportedStatesProperties: ['aria-disabled', 'aria-orientation', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext'],
                    nameFrom: 'author',
                    childrenPresentational: true,
                    implicitValueForRole: [{ 'aria-orientation': 'horizontal' }, { 'aria-valuemin': '0' }, { 'aria-valuemax': '100' }]
                }
            ]
        },
        'slider': {
            category: 'widget roles',
            description: 'An input where the user selects a value from within a given range.',
            superclassRoles: ['input', 'range'],
            requiredStatesProperties: ['aria-valuenow'],
            supportedStatesProperties: ['aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-orientation', 'aria-readonly', 'aria-valuemax', 'aria-valuemin'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            childrenPresentational: true,
            implicitValueForRole: [{ 'aria-orientation': 'horizontal' }, { 'aria-valuemin': '0' }, { 'aria-valuemax': '100' }]
        },
        'spinbutton': {
            category: 'widget roles',
            description: 'A form of range that expects the user to select from among discrete choices.',
            superclassRoles: ['composite', 'input', 'range'],
            supportedStatesProperties: ['aria-errormessage', 'aria-invalid', 'aria-readonly', 'aria-required', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            implicitValueForRole: [{ 'aria-valuenow': '0' }]
        },
        'status': {
            category: 'live region roles',
            description: 'A type of live region whose content is advisory information for the user but is not important enough to justify an alert, often but not necessarily presented as a status bar.',
            superclassRoles: 'section',
            subclassRoles: ['progressbar', 'timer'],
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-live': 'polite' }, { 'aria-atomic': 'true' }]
        },
        'strong': {
            category: 'document structure',
            description: 'Content which is important, serious, or urgent. See related emphasis.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<strong>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'structure': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A document structural element.',
            superclassRoles: 'roletype',
            subclassRoles: ['application', 'document', 'generic', 'presentation', 'range', 'rowgroup', 'section', 'sectionhead', 'separator']
        },
        'subscript': {
            category: 'document structure',
            description: 'One or more subscripted characters. See related superscript.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<sub>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'superscript': {
            category: 'document structure',
            description: 'One or more superscripted characters. See related subscript.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<sup>',
            prohibitedStatesProperties: ['aria-label', 'aria-labelledby'],
            nameFrom: 'prohibited'
        },
        'switch': {
            category: 'widget roles',
            description: 'A type of checkbox that represents on/off values, as opposed to checked/unchecked values. See related checkbox.',
            superclassRoles: 'checkbox',
            relatedConcepts: 'button',
            requiredStatesProperties: ['aria-checked'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true,
            childrenPresentational: true
        },
        'tab': {
            category: 'widget roles',
            description: 'A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.',
            superclassRoles: ['sectionhead', 'widget'],
            requiredContextRole: 'tablist',
            supportedStatesProperties: ['aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-posinset', 'aria-selected', 'aria-setsize'],
            nameFrom: ['contents', 'author'],
            childrenPresentational: true,
            implicitValueForRole: [{ 'aria-selected': 'false' }]
        },
        'table': {
            category: 'document structure roles',
            description: 'A section containing data arranged in rows and columns. See related grid.',
            superclassRoles: 'section',
            subclassRoles: 'grid',
            baseHTMLConcept: '<table>',
            requiredOwnedElements: ['row', 'rowgroup > row'],
            supportedStatesProperties: ['aria-colcount', 'aria-rowcount'],
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'tablist': {
            category: 'widget roles',
            description: 'A list of tab elements, which are references to tabpanel elements.',
            superclassRoles: 'composite',
            requiredOwnedElements: 'tab',
            supportedStatesProperties: ['aria-level', 'aria-multiselectable', 'aria-orientation'],
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-orientation': 'horizontal' }],
            focusable: true
        },
        'tabpanel': {
            category: 'widget roles',
            description: 'A container for the resources associated with a tab, where each tab is contained in a tablist.',
            superclassRoles: 'section',
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'term': {
            category: 'document structure roles',
            description: 'A word or phrase with a corresponding definition. See related definition.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<dfn>',
            nameFrom: 'author'
        },
        'textbox': {
            category: 'widget roles',
            description: 'A type of input that allows free-form text as its value.',
            superclassRoles: 'input',
            subclassRoles: 'searchbox',
            relatedHTMLConcepts: ['<textarea>', '<input type="text">'],
            supportedStatesProperties: ['aria-activedescendant', 'aria-autocomplete', 'aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-multiline', 'aria-placeholder', 'aria-readonly', 'aria-required'],
            nameFrom: 'author',
            accessibleNameRequired: true
        },
        'time': {
            category: 'document structure',
            description: 'An element that represents a specific point in time.',
            superclassRoles: 'section',
            relatedHTMLConcepts: '<time>',
            nameFrom: 'author'
        },
        'timer': {
            category: 'live region roles',
            description: 'A type of live region containing a numerical counter which indicates an amount of elapsed time from a start point, or the time remaining until an end point.',
            superclassRoles: 'status',
            nameFrom: 'author'
        },
        'toolbar': {
            category: 'document structure roles',
            description: 'A collection of commonly used function buttons or controls represented in compact visual form.',
            superclassRoles: 'group',
            relatedConcepts: 'menubar',
            supportedStatesProperties: 'aria-orientation',
            nameFrom: 'author',
            implicitValueForRole: [{ 'aria-orientation': 'horizontal' }]
        },
        'tooltip': {
            category: 'document structure roles',
            description: 'A contextual popup that displays a description for an element.',
            superclassRoles: 'section',
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true
        },
        'tree': {
            category: 'widget roles',
            description: 'A widget that allows the user to select one or more items from a hierarchically organized collection.',
            superclassRoles: 'select',
            subclassRoles: 'treegrid',
            requiredOwnedElements: ['group > treeitem', 'treeitem'],
            supportedStatesProperties: ['aria-errormessage', 'aria-invalid', 'aria-multiselectable', 'aria-required'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            implicitValueForRole: [{ 'aria-orientation': 'vertical' }],
            focusable: true
        },
        'treegrid': {
            category: 'widget roles',
            description: 'A grid whose rows can be expanded and collapsed in the same manner as for a tree.',
            superclassRoles: ['grid', 'tree'],
            requiredOwnedElements: ['row', 'rowgroup > row'],
            nameFrom: 'author',
            accessibleNameRequired: true,
            focusable: true
        },
        'treeitem': {
            category: 'widget roles',
            description: 'An option item of a tree. This is an element within a tree that may be expanded or collapsed if it contains a sub-level group of tree item elements.',
            superclassRoles: ['listitem', 'option'],
            requiredContextRole: ['group', 'tree'],
            requiredStatesProperties: ['aria-selected'],
            supportedStatesProperties: ['aria-expanded', 'aria-haspopup'],
            nameFrom: ['contents', 'author'],
            accessibleNameRequired: true
        },
        'widget': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'An interactive component of a graphical user interface (GUI).',
            superclassRoles: 'roletype',
            subclassRoles: ['command', 'composite', 'gridcell', 'input', 'progressbar', 'row', 'scrollbar', 'separator', 'tab']
        },
        'window': {
            isAbstract: true,
            category: 'abstract roles',
            description: 'A browser or application window.',
            superclassRoles: 'roletype',
            subclassRoles: 'dialog',
            supportedStatesProperties: 'aria-modal',
            nameFrom: 'author'
        }
    },
    properties: {
        'aria-activedescendant': {
            category: 'relationship attributes',
            description: 'Identifies the currently active element when DOM focus is on a composite widget, combobox, textbox, group, or application.',
            usedInRoles: ['application', 'combobox', 'composite', 'group', 'textbox'],
            inheritsIntoRoles: ['grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'row', 'searchbox', 'select', 'spinbutton', 'tablist', 'toolbar', 'tree', 'treegrid'],
            value: { attribute: 'id' }
        },
        'aria-atomic': {
            global: true,
            category: 'live region attributes',
            description: 'Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.',
            usedInRoles: '*',
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-autocomplete': {
            category: 'widget attributes',
            description: "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for a combobox, searchbox, or textbox and specifies how predictions would be presented if they were made.",
            usedInRoles: ['combobox', 'textbox'],
            inheritsIntoRoles: 'searchbox',
            defaultValue: 'none',
            value: ['inline', 'list', 'both', 'none']
        },
        'aria-colcount': {
            category: 'relationship attributes',
            description: 'Defines the total number of columns in a table, grid, or treegrid. See related aria-colindex.',
            usedInRoles: ['table'],
            inheritsIntoRoles: ['grid', 'treegrid'],
            value: { type: 'integer' }
        },
        'aria-colindex': {
            category: 'relationship attributes',
            description: "Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. See related aria-colcount and aria-colspan.",
            usedInRoles: ['cell', 'row'],
            inheritsIntoRoles: ['columnheader', 'gridcell', 'rowheader'],
            value: { type: 'integer' }
        },
        'aria-colspan': {
            category: 'relationship attributes',
            description: 'Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-colindex and aria-rowspan.',
            usedInRoles: ['cell'],
            inheritsIntoRoles: ['columnheader', 'gridcell', 'rowheader'],
            value: { type: 'integer' }
        },
        'aria-controls': {
            global: true,
            category: 'relationship attributes',
            description: 'Identifies the element (or elements) whose contents or presence are controlled by the current element. See related aria-owns.',
            usedInRoles: '*',
            value: { attribute: 'id', multiple: true }
        },
        'aria-describedby': {
            global: true,
            category: 'relationship attributes',
            description: 'Identifies the element (or elements) that describes the object. See related aria-labelledby.',
            relatedHTMLConcepts: ['<label>', '<th headers="id">', '<th scope="col">', '<th scope="row">', '<td headers="id">'],
            usedInRoles: '*',
            value: { attribute: 'id', multiple: true }
        },
        'aria-details': {
            global: true,
            category: 'relationship attributes',
            description: 'Identifies the element that provides a detailed, extended description for the object. See related aria-describedby.',
            usedInRoles: '*',
            value: { attribute: 'id' }
        },
        'aria-dropeffect': {
            isDeprecated: true,
            global: true,
            category: 'drag-an-drop attributes',
            description: 'Indicates what functions can be performed when a dragged object is released on the drop target.',
            usedInRoles: '*',
            defaultValue: 'none',
            multipleValues: true,
            value: ['copy', 'execute', 'link', 'move', 'none', 'popup']
        },
        'aria-errormessage': {
            category: ['widget attributes', 'relationship attributes'],
            description: 'Identifies the element that provides an error message for an object. See related aria-invalid and aria-describedby.',
            usedInRoles: ['application', 'checkbox', 'combobox', 'gridcell', 'listbox', 'radiogroup', 'slider', 'spinbutton', 'textbox', 'tree'],
            inheritsIntoRoles: ['columnheader', 'menuitemcheckbox', 'menuitemradio', 'rowheader', 'searchbox', 'switch', 'treegrid'],
            value: { attribute: 'id' }
        },
        'aria-flowto': {
            global: true,
            category: 'relationship attributes',
            description: "Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.",
            usedInRoles: '*',
            value: { attribute: 'id', multiple: true }
        },
        'aria-haspopup': {
            category: 'widget attributes',
            description: 'Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.',
            relatedConcepts: 'aria-controls',
            usedInRoles: ['application', 'button', 'combobox', 'gridcell', 'menuitem', 'slider', 'tab', 'textbox', 'treeitem'],
            inheritsIntoRoles: ['columnheader', 'menuitemcheckbox', 'menuitemradio', 'rowheader', 'searchbox'],
            defaultValue: 'false',
            value: ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog']
        },
        'aria-keyshortcuts': {
            global: true,
            description: 'Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.',
            usedInRoles: '*',
            value: { type: 'string' }
        },
        'aria-label': {
            global: true,
            translatable: true,
            category: 'widget attributes',
            description: 'Defines a string value that labels the current element. See related aria-labelledby.',
            relatedHTMLConcepts: '@title',
            usedInRoles: '*',
            value: { type: 'string' }
        },
        'aria-labelledby': {
            global: true,
            category: 'relationship attributes',
            description: 'Identifies the element (or elements) that labels the current element. See related aria-describedby.',
            relatedHTMLConcepts: '<label>',
            usedInRoles: '*',
            value: { attribute: 'id', multiple: true }
        },
        'aria-level': {
            category: 'widget attributes',
            description: 'Defines the hierarchical level of an element within a structure.',
            usedInRoles: ['heading', 'listitem', 'row', 'tablist'],
            inheritsIntoRoles: 'treeitem',
            value: { type: 'integer', min: 1 }
        },
        'aria-live': {
            global: true,
            category: 'live region attributes',
            description: 'Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.',
            usedInRoles: '*',
            defaultValue: 'off',
            value: ['assertive', 'polite', 'off']
        },
        'aria-modal': {
            category: 'widget attributes',
            description: 'Indicates whether an element is modal when displayed.',
            usedInRoles: ['window'],
            inheritsIntoRoles: ['alertdialog', 'dialog'],
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-multiline': {
            category: 'widget attributes',
            description: 'Indicates whether a text box accepts multiple lines of input or only a single line.',
            usedInRoles: ['textbox'],
            inheritsIntoRoles: 'searchbox',
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-multiselectable': {
            category: 'widget attributes',
            description: 'Indicates that the user may select more than one item from the current selectable descendants.',
            usedInRoles: ['grid', 'listbox', 'tablist', 'tree'],
            inheritsIntoRoles: 'treegrid',
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-orientation': {
            category: 'widget attributes',
            description: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.",
            usedInRoles: ['scrollbar', 'select', 'separator', 'slider', 'tablist', 'toolbar'],
            inheritsIntoRoles: ['listbox', 'menu', 'menubar', 'radiogroup', 'tree', 'treegrid'],
            defaultValue: 'undefined',
            value: ['horizontal', 'vertical', 'undefined']
        },
        'aria-owns': {
            global: true,
            category: 'relationship attributes',
            usedInRoles: '*',
            value: { attribute: 'id', multiple: true }
        },
        'aria-placeholder': {
            translatable: true,
            category: 'widget attributes',
            description: 'Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.',
            relatedHTMLConcepts: '@placeholder',
            usedInRoles: ['textbox'],
            inheritsIntoRoles: 'searchbox',
            value: { type: 'string' }
        },
        'aria-posinset': {
            category: 'relationship attributes',
            description: "Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-setsize.",
            usedInRoles: ['article', 'listitem', 'menuitem', 'option', 'radio', 'row', 'tab'],
            inheritsIntoRoles: ['menuitemcheckbox', 'menuitemradio', 'treeitem'],
            value: { type: 'integer', min: 1, max: 'aria-setsize' }
        },
        'aria-readonly': {
            category: 'widget attributes',
            description: 'Indicates that the element is not editable, but is otherwise operable. See related aria-disabled.',
            relatedHTMLConcepts: '@readonly',
            usedInRoles: ['checkbox', 'combobox', 'grid', 'gridcell', 'listbox', 'radiogroup', 'slider', 'spinbutton', 'textbox'],
            inheritsIntoRoles: ['columnheader', 'menuitemcheckbox', 'menuitemradio', 'rowheader', 'searchbox', 'switch', 'treegrid'],
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-relevant': {
            global: true,
            category: 'live region attributes',
            description: 'Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related aria-atomic.',
            usedInRoles: '*',
            multipleValues: true,
            defaultValue: 'aditions text',
            value: ['all', 'additions', 'removals', 'text']
        },
        'aria-required': {
            category: 'widget attributes',
            description: 'Indicates that user input is required on the element before a form may be submitted.',
            relatedHTMLConcepts: '@required',
            usedInRoles: ['checkbox', 'combobox', 'gridcell', 'listbox', 'radiogroup', 'spinbutton', 'textbox', 'tree'],
            inheritsIntoRoles: ['columnheader', 'menuitemcheckbox', 'menuitemradio', 'rowheader', 'searchbox', 'switch', 'treegrid'],
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-roledescription': {
            global: true,
            translatable: true,
            description: 'Defines a human-readable, author-localized description for the role of an element.',
            usedInRoles: '*',
            value: { type: 'string' }
        },
        'aria-rowcount': {
            category: 'relationship attributes',
            description: 'Defines the total number of rows in a table, grid, or treegrid. See related aria-rowindex.',
            usedInRoles: ['table'],
            inheritsIntoRoles: ['grid', 'treegrid'],
            value: { type: 'integer', unknown: -1 }
        },
        'aria-rowindex': {
            category: 'relationship attributes',
            description: "Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. See related aria-rowcount and aria-rowspan.",
            usedInRoles: ['cell', 'row'],
            inheritsIntoRoles: ['columnheader', 'gridcell', 'rowheader'],
            value: { type: 'integer', min: 1 }
        },
        'aria-rowspan': {
            category: 'relationship attributes',
            description: 'Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-rowindex and aria-colspan.',
            usedInRoles: ['cell'],
            inheritsIntoRoles: ['columnheader', 'gridcell', 'rowheader'],
            value: { type: 'integer', min: 0 }
        },
        'aria-setsize': {
            category: 'relationship attributes',
            description: 'Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-posinset.',
            usedInRoles: ['article', 'listitem', 'menuitem', 'option', 'radio', 'row', 'tab'],
            inheritsIntoRoles: ['menuitemcheckbox', 'menuitemradio', 'treeitem'],
            value: { type: 'integer', unknown: -1 }
        },
        'aria-sort': {
            category: 'widget attributes',
            description: 'Indicates if items in a table or grid are sorted in ascending or descending order.',
            usedInRoles: ['columnheader', 'rowheader'],
            defaultValue: 'none',
            value: ['ascending', 'descending', 'other', 'none']
        },
        'aria-valuemax': {
            category: 'widget attributes',
            description: 'Defines the maximum allowed value for a range widget.',
            relatedHTMLConcepts: '<input type="range" max="number">',
            usedInRoles: ['meter', 'range', 'scrollbar', 'separator', 'slider', 'spinbutton'],
            inheritsIntoRoles: 'progressbar',
            value: { type: 'number' }
        },
        'aria-valuemin': {
            category: 'widget attributes',
            description: 'Defines the minimum allowed value for a range widget.',
            relatedHTMLConcepts: '<input type="range" min="number">',
            usedInRoles: ['meter', 'range', 'scrollbar', 'separator', 'slider', 'spinbutton'],
            inheritsIntoRoles: 'progressbar',
            value: { type: 'number' }
        },
        'aria-valuenow': {
            category: 'widget attributes',
            description: 'Defines the current value for a range widget. See related aria-valuetext.',
            relatedHTMLConcepts: '<input type="range" value="number">',
            usedInRoles: ['meter', 'range', 'scrollbar', 'separator', 'slider', 'spinbutton'],
            inheritsIntoRoles: 'progressbar',
            value: { type: 'number', min: 'aria-valuemin', max: 'aria-valuemax' }
        },
        'aria-valuetext': {
            translatable: true,
            category: 'widget attributes',
            description: 'Defines the human readable text alternative of aria-valuenow for a range widget.',
            usedInRoles: ['range', 'separator', 'spinbutton'],
            inheritsIntoRoles: ['meter', 'progressbar', 'scrollbar', 'slider'],
            value: { type: 'string' }
        }
    },
    states: {
        'aria-busy': {
            global: true,
            category: 'live region attributes',
            description: 'Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.',
            usedInRoles: '*',
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-checked': {
            category: 'widget attributes',
            description: 'Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. See related aria-pressed and aria-selected.',
            usedInRoles: ['checkbox', 'option', 'radio', 'switch'],
            inheritsIntoRoles: ['menuitemcheckbox', 'menuitemradio', 'treeitem'],
            defaultValue: 'undefined',
            value: ['true', 'mixed', 'false', 'undefined']
        },
        'aria-current': {
            global: true,
            description: 'Indicates the element that represents the current item within a container or set of related elements.',
            usedInRoles: '*',
            defaultValue: 'false',
            value: ['page', 'step', 'location', 'date', 'time', 'true', 'false']
        },
        'aria-disabled': {
            category: 'widget attributes',
            description: 'Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. See related aria-hidden and aria-readonly.',
            usedInRoles: ['application', 'button', 'composite', 'gridcell', 'group', 'input', 'link', 'menuitem', 'scrollbar', 'separator', 'tab'],
            inheritsIntoRoles: ['checkbox', 'columnheader', 'combobox', 'grid', 'listbox', 'menu', 'menubar', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'radiogroup', 'row', 'rowheader', 'searchbox', 'select', 'slider', 'spinbutton', 'switch', 'tablist', 'textbox', 'toolbar', 'tree', 'treegrid', 'treeitem'],
            defaultValue: 'false',
            value: ['true', 'false']
        },
        'aria-expanded': {
            category: 'widget attributes',
            description: 'Indicates whether a grouping element owned or controlled by this element is expanded or collapsed.',
            usedInRoles: ['application', 'button', 'checkbox', 'combobox', 'gridcell', 'link', 'listbox', 'menuitem', 'row', 'rowheader', 'tab', 'treeitem'],
            inheritsIntoRoles: ['columnheader', 'menuitemcheckbox', 'menuitemradio', 'switch'],
            defaultValue: 'undefined',
            value: ['true', 'false', 'undefined']
        },
        'aria-grabbed': {
            isDeprecated: true,
            global: true,
            category: 'drag-an-drop attributes',
            description: 'Indicates an element\'s "grabbed" state in a drag-and-drop operation.',
            usedInRoles: '*',
            defaultValue: 'undefined',
            value: ['true', 'false', 'undefined']
        },
        'aria-hidden': {
            global: true,
            category: 'widget attributes',
            description: 'Indicates whether the element is exposed to an accessibility API. See related aria-disabled.',
            usedInRoles: '*',
            defaultValue: 'undefined',
            value: ['true', 'false', 'undefined']
        },
        'aria-invalid': {
            category: 'widget attributes',
            description: 'Indicates the entered value does not conform to the format expected by the application. See related aria-errormessage.',
            usedInRoles: ['application', 'checkbox', 'combobox', 'gridcell', 'listbox', 'radiogroup', 'slider', 'spinbutton', 'textbox', 'tree'],
            inheritsIntoRoles: ['columnheader', 'menuitemcheckbox', 'menuitemradio', 'rowheader', 'searchbox', 'switch', 'treegrid'],
            defaultValue: 'false',
            value: ['true', 'false', 'grammar', 'spelling']
        },
        'aria-pressed': {
            category: 'widget attributes',
            description: 'Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.',
            usedInRoles: ['button'],
            defaultValue: 'undefined',
            value: ['true', 'mixed', 'false', 'undefined']
        },
        'aria-selected': {
            category: 'widget attributes',
            description: 'Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.',
            usedInRoles: ['gridcell', 'option', 'row', 'tab'],
            inheritsIntoRoles: ['columnheader', 'rowheader', 'treeitem'],
            defaultValue: 'undefined',
            value: ['true', 'false', 'undefined']
        }
    }
};

var ARIA = {
    Errors: {
        EmptyValueNotAllowed: "La valeur de l'attribut {{attribute}} ne peut être vide.",
        InvalidStateProperty: "L'attribut {{attribute}} n'est pas défini dans WAI-ARIA.",
        IsNaN: "La valeur de l'attribut {{attribute}} n'est pas un nombre.",
        IsNotAnInteger: "La valeur de l'attribut {{attribute}} n'est pas un entier.",
        SingleValueSyntax: "La valeur de l'attribut {{attribute}} doit correspondre à une des valeurs définies ({{values}}).",
        SingleIdValueElement: "L'identifiant indiqué dans l'attribut {{attribute}} doit correspondre à un élément présent dans la page.",
        SingleIdValueSyntax: "La valeur de l'attribut {{attribute}} doit correspondre à un identifiant (sans aucun espace).",
        TokensValueSyntax: "La valeur de l'attribut {{attribute}} doit correspondre à une ou plusieurs des valeurs définies ({{values}}) séparées par des espaces.",
        TokensIdValueElements: "Au moins un identifiant indiqué dans l'attribut {{attribute}} ne correspond pas à un élément présent dans la page.",
        TokensIdValueSyntax: "La valeur de l'attribut {{attribute}} doit correspondre à une liste d'identifiants séparés par des espaces.",
        UnknownSingleValue: "La valeur de l'attribut {{attribute}} doit correspondre à une des valeurs définies ({{values}}).",
        UnknownTokensValue: "Au moins une composante de la valeur de l'attribut {{attribute}} ne correspond pas à une des valeurs définies ({{values}}).",
        ValueGreaterThanMax: "La valeur de l'attribut {{attribute}} ne peut être supérieure à {{max}}.",
        ValueLowerThanMin: "La valeur de l'attribut {{attribute}} ne peut être inférieure à {{min}}."
    },
    Role: function (role) {
        this.role = role;
        this.isAbstract = null;
        this.isValidResult = null;
        this.focusable = null;
        this.requiredContextRoles = null;
        this.statesProperties = null;
        this.prohibitedStatesProperties = null;
        this.isValid = function () {
            if (this.isValidResult == null) {
                this.isValidResult = ariaData.roles.hasOwnProperty(this.role);
                if (this.isValidResult) {
                    this.isAbstract = ariaData.roles[this.role].hasOwnProperty('isAbstract');
                }
            }
            var manageAbstract = null;
            if (arguments.length == 2 && arguments[1].constructor == Object) {
                manageAbstract = arguments[1].hasOwnProperty('ignoreAbstract');
                if (manageAbstract) {
                    manageAbstract = arguments[1].ignoreAbstract;
                }
            }
            if (manageAbstract == null) {
                manageAbstract = this.isAbstract ? false : true;
            }
            return this.isValidResult && manageAbstract;
        };
        this.setRequiredContextRoles = function () {
            if (this.requiredContextRoles == null) {
                this.requiredContextRoles = [];
                var roleData = ariaData.roles[this.role];
                if (roleData.hasOwnProperty('focusable') && roleData.focusable.constructor == Array) {
                    roleData = roleData.focusable[this.focusable == true ? 1 : 0];
                }
                if (roleData.hasOwnProperty('requiredContextRole')) {
                    for (var i = 0; i < roleData.requiredContextRole.length; i++) {
                        this.requiredContextRoles.push(new ARIA.Role(roleData.requiredContextRole[i], { getData: true }));
                    }
                }
            }
        };
        this.getRequiredContextRoles = function () {
            if (this.isValid({ ignoreAbstract: true })) {
                this.setRequiredContextRoles();
                return this.requiredContextRoles;
            }
            else {
                return undefined;
            }
        };
        this.setRequiredStatesProperties = function () {
            if (this.statesProperties == null) {
                this.statesProperties = [];
                var roleData = ariaData.roles[this.role];
                if (roleData.hasOwnProperty('focusable') && roleData.focusable.constructor == Array) {
                    roleData = roleData.focusable[this.focusable == true ? 1 : 0];
                }
                if (roleData.hasOwnProperty('requiredStatesProperties')) {
                    for (var i = 0; i < roleData.requiredStatesProperties.length; i++) {
                        this.statesProperties.push(new ARIA.StateProperty(roleData.requiredStatesProperties[i], { getData: true }));
                    }
                }
            }
        };
        this.getRequiredStatesProperties = function () {
            if (this.isValid({ ignoreAbstract: true })) {
                this.setRequiredStatesProperties();
                return this.statesProperties;
            }
            else {
                return undefined;
            }
        };
        this.setProhibitedStatesProperties = function () {
            if (this.prohibitedStatesProperties == null) {
                this.prohibitedStatesProperties = [];
                var roleData = ariaData.roles[this.role];
                if (roleData.hasOwnProperty('focusable') && roleData.focusable.constructor == Array) {
                    roleData = roleData.focusable[this.focusable == true ? 1 : 0];
                }
                if (roleData.hasOwnProperty('prohibitedStatesProperties')) {
                    for (var i = 0; i < roleData.prohibitedStatesProperties.length; i++) {
                        this.prohibitedStatesProperties.push(new ARIA.StateProperty(roleData.prohibitedStatesProperties[i], { getData: true }));
                    }
                }
            }
        };
        this.getProhibitedStatesProperties = function () {
            if (this.isValid({ ignoreAbstract: true })) {
                this.setProhibitedStatesProperties();
                return this.prohibitedStatesProperties;
            }
            else {
                return undefined;
            }
        };
        if (arguments.length == 2 && arguments[1].constructor == Object) {
            if (arguments[1].hasOwnProperty('focusable') && arguments[1].focusable) {
                this.focusable = arguments[1].focusable;
            }
            if (arguments[1].hasOwnProperty('getData') && this.isValid({ ignoreAbstract: true })) {
                this.setRequiredContextRoles();
                this.setRequiredStatesProperties();
                this.setProhibitedStatesProperties();
            }
        }
    },
    StateProperty: function (stateProperty) {
        this.stateProperty = stateProperty;
        this.usedInRoles = null;
        this.values = null;
        this.multipleValues = null;
        this.isValidResult = null;
        this.isValid = function () {
            if (this.isValidResult == null) {
                this.isValidResult = ariaData.properties.hasOwnProperty(this.stateProperty) || ariaData.states.hasOwnProperty(this.stateProperty);
            }
            return this.isValidResult;
        };
        this.isAllowedInRole = function (role) {
            if (this.isValid()) {
                var role = new ARIA.Role(role, { getData: true });
                var prohibitedStatesProperties = role.getProhibitedStatesProperties();
                return this.canBeUsedInRole(role.role) || (prohibitedStatesProperties && prohibitedStatesProperties.indexOf(this.stateProperty) > -1);
            }
            else {
                return undefined;
            }
        },
            this.setUsedInRoles = function () {
                if (this.usedInRoles == null) {
                    var statePropertyData = ariaData.properties[this.stateProperty] || ariaData.states[this.stateProperty];
                    this.usedInRoles = statePropertyData.usedInRoles;
                }
            };
        this.canBeUsedInRole = function (role) {
            if (this.isValid()) {
                this.setUsedInRoles();
                return this.usedInRoles == '*' || this.usedInRoles.includes(role);
            }
            else {
                return undefined;
            }
        };
        this.setValues = function () {
            if (this.values == null) {
                var statePropertyData = ariaData.properties[this.stateProperty] || ariaData.states[this.stateProperty];
                this.values = statePropertyData.value;
                this.multipleValues = statePropertyData.multipleValues;
            }
        };
        this.getValues = function () {
            if (this.values == null) {
                this.setValues();
            }
            return this.values;
        };
        this.isValidValue = function (value) {
            if (this.isValid()) {
                this.setValues();
                var result = false;
                var errors = [];
                if (value.trim().length > 0) {
                    if (this.values.constructor == Array) {
                        if (this.multipleValues) {
                            result = /^[a-z]+(\s[a-z]+)*$/.test(value);
                            if (result) {
                                value = value.split(' ');
                                value = value.filter(function (currentvalue) {
                                    return !this.values.includes(currentvalue);
                                }.bind(this));
                                result = value.length == 0;
                                if (!result) {
                                    var error = ARIA.Errors.UnknownTokensValue;
                                    error = error.replace('{{attribute}}', this.stateProperty);
                                    error = error.replace('{{values}}', this.values.join(' / '));
                                    errors.push(error);
                                }
                            }
                            else {
                                var error = ARIA.Errors.TokensValueSyntax;
                                error = error.replace('{{attribute}}', this.stateProperty);
                                error = error.replace('{{values}}', this.values.join(' / '));
                                errors.push(error);
                            }
                        }
                        else {
                            result = /^[a-z]+$/.test(value);
                            if (result) {
                                result = this.values.includes(value);
                                if (!result) {
                                    var error = ARIA.Errors.UnknownSingleValue;
                                    error = error.replace('{{attribute}}', this.stateProperty);
                                    error = error.replace('{{values}}', this.values.join(' / '));
                                    errors.push(error);
                                }
                            }
                            else {
                                var error = ARIA.Errors.SingleValueSyntax;
                                error = error.replace('{{attribute}}', this.stateProperty);
                                error = error.replace('{{values}}', this.values.join(' / '));
                                errors.push(error);
                            }
                        }
                    }
                    else if (this.values.hasOwnProperty('attribute') && this.values.attribute == 'id') {
                        if (this.values.multiple) {
                            result = /^\S+(\s\S+)*$/.test(value);
                            if (!result) {
                                var error = ARIA.Errors.TokensIdValueSyntax;
                                error = error.replace('{{attribute}}', this.stateProperty);
                                errors.push(error);
                            }
                        }
                        else {
                            result = /^\S+$/.test(value);
                            if (!result) {
                                var error = ARIA.Errors.SingleIdValueSyntax;
                                error = error.replace('{{attribute}}', this.stateProperty);
                                errors.push(error);
                            }
                        }
                    }
                    else {
                        switch (this.values.type) {
                            case 'integer':
                                if (/^(-|\+)?(0|[1-9]\d*)$/.test(value)) {
                                    result = true;
                                    var integerValue = Number.parseInt(value);
                                    if (this.values.hasOwnProperty('min') && /^(-|\+)?(0|[1-9]\d*)$/.test(this.values.min)) {
                                        result = this.values.min <= integerValue;
                                        if (!result) {
                                            var error = ARIA.Errors.ValueLowerThanMin;
                                            error = error.replace('{{attribute}}', this.stateProperty);
                                            error = error.replace('{{min}}', this.values.min);
                                            errors.push(error);
                                        }
                                    }
                                    if (this.values.hasOwnProperty('max') && /^(-|\+)?(0|[1-9]\d*)$/.test(this.values.max)) {
                                        if (result) {
                                            result = this.values.max >= integerValue;
                                            if (!result) {
                                                var error = ARIA.Errors.ValueGreaterThanMax;
                                                error = error.replace('{{attribute}}', this.stateProperty);
                                                error = error.replace('{{max}}', this.values.max);
                                                errors.push(error);
                                            }
                                        }
                                    }
                                }
                                else {
                                    var error = ARIA.Errors.IsNotAnInteger;
                                    error = error.replace('{{attribute}}', this.stateProperty);
                                    errors.push(error);
                                }
                                break;
                            case 'number':
                                if (/^(-|\+)?\d+(\.(\d+))*$/.test(value)) {
                                    result = true;
                                    var numberValue = Number.parseFloat(value);
                                    if (this.values.hasOwnProperty('min') && /^(-|\+)?\d+(\.(\d+))*$/.test(this.values.min)) {
                                        result = this.values.min <= numberValue;
                                        if (!result) {
                                            var error = ARIA.Errors.ValueLowerThanMin;
                                            error = error.replace('{{attribute}}', this.stateProperty);
                                            error = error.replace('{{min}}', this.values.min);
                                            errors.push(error);
                                        }
                                    }
                                    if (this.values.hasOwnProperty('max') && /^(-|\+)?\d+(\.(\d+))*$/.test(this.values.max)) {
                                        if (result) {
                                            result = this.values.max >= numberValue;
                                            if (!result) {
                                                var error = ARIA.Errors.ValueGreaterThanMax;
                                                error = error.replace('{{attribute}}', this.stateProperty);
                                                error = error.replace('{{max}}', this.values.max);
                                                errors.push(error);
                                            }
                                        }
                                    }
                                }
                                else {
                                    var error = ARIA.Errors.IsNaN;
                                    error = error.replace('{{attribute}}', this.stateProperty);
                                    errors.push(error);
                                }
                                break;
                            case 'string':
                                result = true;
                                break;
                        }
                    }
                }
                else {
                    errors.push(ARIA.Errors.EmptyValueNotAllowed.replace('{{attribute}}', this.stateProperty));
                }
                if (errors.length > 0) {
                    // console.log('Méthode ARIA : ' + errors);
                }
                return result;
            }
            else {
                return undefined;
            }
        };
        this.getComputedValue = function (value) {
            // empty or unspecified : return default value.
        };
        if (arguments.length == 2 && arguments[1].constructor == Object) {
            if (arguments[1].hasOwnProperty('getData')) {
                if (this.isValid()) {
                    this.setUsedInRoles();
                    this.setValues();
                }
            }
        }
    },
    getAllStatesProperties: function (format) {
        var statesData = ariaData.states;
        var propertiesData = ariaData.properties;
        var statesProperties = null;
        switch (format) {
            case 'js':
                statesProperties = [];
                for (var state in statesData) {
                    statesProperties.push(state);
                }
                for (var property in propertiesData) {
                    statesProperties.push(property);
                }
                break;
        }
        return statesProperties;
    }
};

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
                        if (this.matches(HTML.getFocusableElementsSelector())) {
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
                        if (this.matches(HTML.getFocusableElementsSelector())) {
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
if (!('getComputedAriaRole' in HTMLElement.prototype)) HTMLElement.prototype.getComputedAriaRole = getComputedAriaRole;
if (!('getComputedAriaRole' in SVGElement.prototype)) SVGElement.prototype.getComputedAriaRole = getComputedAriaRole;

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
if (!('hasValidRole' in HTMLElement.prototype)) HTMLElement.prototype.hasValidRole = hasValidRole;
if (!('hasValidRole' in SVGElement.prototype)) SVGElement.prototype.hasValidRole = hasValidRole;

var hasInvalidAriaAttributes = function () {
    var result = false;
    for (var i = 0; i < this.attributes.length; i++) {
        var name = this.attributes[i].name;
        if (name.match(/^aria-/)) {
            var sp = new ARIA.StateProperty(name);
            if (!sp.isValid()) {
                result = true;
                break;
            }
        }
    }
    return result;
};
if (!('hasInvalidAriaAttributes' in HTMLElement.prototype)) HTMLElement.prototype.hasInvalidAriaAttributes = hasInvalidAriaAttributes;
if (!('hasInvalidAriaAttributes' in SVGElement.prototype)) SVGElement.prototype.hasInvalidAriaAttributes = hasInvalidAriaAttributes;

var hasAriaAttributesWithInvalidValues = function () {
    var errors = [];
    var result = false;
    for (var i = 0; i < this.attributes.length; i++) {
        var attribute = this.attributes[i];
        var name = attribute.name;
        if (name.match(/^aria-.*$/)) {
            var sp = new ARIA.StateProperty(name);
            var isValidValue = sp.isValidValue(attribute.value);
            if (isValidValue) {
                var values = sp.getValues();
                if (values.constructor == Object) {
                    if (values.hasOwnProperty('type')) {
                        if (values.type == 'integer' || values.type == 'number') {
                            var isOk = values.type == 'integer' ? /^(-|\+)?(0|[1-9]\d*)$/ : /^(-|\+)?\d+(\.(\d+))*$/;
                            if (values.hasOwnProperty('min') && values.min.constructor == String) {
                                if (this.hasAttribute(values.min)) {
                                    var min = this.getAttribute(values.min);
                                    if (isOk.test(min)) {
                                        min = values.type == 'integer' ? parseInt(min) : parseFloat(min);
                                        var value = values.type == 'integer' ? parseInt(attribute.value) : parseFloat(attribute.value);
                                        var minResult = !(min <= value);
                                        if (minResult) {
                                            var error = ARIA.Errors.ValueLowerThanMin;
                                            error = error.replace('{{attribute}}', attribute.name);
                                            error = error.replace('{{min}}', values.min);
                                            errors.push(error);
                                        }
                                    }
                                }
                            }
                            if (values.hasOwnProperty('max') && values.max.constructor == String) {
                                if (this.hasAttribute(values.max)) {
                                    var max = this.getAttribute(values.max);
                                    if (isOk.test(max)) {
                                        max = values.type == 'integer' ? parseInt(max) : parseFloat(max);
                                        var value = values.type == 'integer' ? parseInt(attribute.value) : parseFloat(attribute.value);
                                        var maxResult = !(max >= value);
                                        if (maxResult) {
                                            var error = ARIA.Errors.ValueGreaterThanMax;
                                            error = error.replace('{{attribute}}', attribute.name);
                                            error = error.replace('{{max}}', values.max);
                                            errors.push(error);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (values.hasOwnProperty('attribute')) {
                        if (values.attribute == 'id') {
                            if (values.multiple) {
                                var mode = 'strict';
                                if (arguments.length == 1 && arguments[0].constructor == Object) {
                                    if (arguments[0].permissive) {
                                        mode = 'permissive';
                                    }
                                }
                                var ids = attribute.value.split(' ');
                                if (mode == 'strict') {
                                    var notFoundElements = [];
                                    for (var j = 0; j < ids.length; j++) {
                                        if (!document.getElementById(ids[j])) {
                                            notFoundElements.push(ids[j]);
                                        }
                                    }
                                    if (notFoundElements.length > 0) {
                                        errors.push(ARIA.Errors.TokensIdValueElements.replace('{{attribute}}', attribute.name));
                                    }
                                }
                                else {
                                    var foundElement = false;
                                    for (var j = 0; j < ids.length; j++) {
                                        if (document.getElementById(ids[j])) {
                                            foundElement = true;
                                            break;
                                        }
                                    }
                                    if (!foundElement) {
                                        errors.push(ARIA.Errors.TokensIdValueElements.replace('{{attribute}}', attribute.name));
                                    }
                                }
                            }
                            else {
                                if (!document.getElementById(attribute.value)) {
                                    errors.push(ARIA.Errors.SingleIdValueElement.replace('{{attribute}}', attribute.name));
                                }
                            }
                        }
                    }
                }
            }
            else if (isValidValue == undefined) {
                errors.push(ARIA.Errors.InvalidStateProperty.replace('{{attribute}}', attribute.name));
            }
            else {
                result = true;
            }
        }
    }
    if (!result && errors.length > 0) {
        result = true;
    }
    return result;
};
if (!('hasAriaAttributesWithInvalidValues' in HTMLElement.prototype)) HTMLElement.prototype.hasAriaAttributesWithInvalidValues = hasAriaAttributesWithInvalidValues;
if (!('hasAriaAttributesWithInvalidValues' in SVGElement.prototype)) SVGElement.prototype.hasAriaAttributesWithInvalidValues = hasAriaAttributesWithInvalidValues;

var hasProhibitedAriaAttributes = function () {
    var result = false;
    for (var i = 0; i < this.attributes.length; i++) {
        var attribute = this.attributes[i];
        var name = attribute.name;
        if (name.match(/^aria-/)) {
            var sp = new ARIA.StateProperty(name);
            result = sp.isAllowedInRole(this.getComputedAriaRole());
            result = result == undefined ? false : !result;
            if (result) {
                break;
            }
        }
    }
    return result;
};
if (!('hasProhibitedAriaAttributes' in HTMLElement.prototype)) HTMLElement.prototype.hasProhibitedAriaAttributes = hasProhibitedAriaAttributes;
if (!('hasProhibitedAriaAttributes' in SVGElement.prototype)) SVGElement.prototype.hasProhibitedAriaAttributes = hasProhibitedAriaAttributes;

// TODO: fin ARIA.

// TODO: début DOM Extension.

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
    var visible = this.isNotVisibleDueTo;
    if (visible.indexOf('css:display') > -1 || visible.indexOf('css:visibility') > -1) {
        result.push('css:other');
    }
    return result;
};

if (!HTMLElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(HTMLElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });
//if (MathMLElement && !MathMLElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(MathMLElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });
if (!SVGElement.prototype.hasOwnProperty('isNotExposedDueTo')) Object.defineProperty(SVGElement.prototype, 'isNotExposedDueTo', { get: isNotExposedDueTo });

var isNotVisibleDueTo = function () {
    var result = [];
    if (!(!!(this.offsetWidth || this.offsetHeight || this.getClientRects().length))) {
        result.push('css:other');
    }
    if (window.getComputedStyle(this, null).getPropertyValue('display') == 'none') {
        result.push('css:display');
    }
    else {
        var parent = this.parentNode;
        while (parent && parent.nodeType == 1) {
            if (window.getComputedStyle(parent, null).getPropertyValue('display') == 'none') {
                result.push('css:display');
                break;
            }
            parent = parent.parentNode;
        }
    }
    if (window.getComputedStyle(this, null).getPropertyValue('opacity') == '0') {
        result.push('css:opacity');
    }
    if (window.getComputedStyle(this, null).getPropertyValue('visibility') == 'hidden') {
        result.push('css:visibility');
    }
    return result;
};

if (!HTMLElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(HTMLElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });
//if (MathMLElement && !MathMLElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(MathMLElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });
if (!SVGElement.prototype.hasOwnProperty('isNotVisibleDueTo')) Object.defineProperty(SVGElement.prototype, 'isNotVisibleDueTo', { get: isNotVisibleDueTo });

if (!SVGElement.prototype.hasOwnProperty('canBeReachedUsingKeyboardWith')) {
    Object.defineProperty(SVGElement.prototype, 'canBeReachedUsingKeyboardWith', {
        get: function () {
            var result = [];
            if (this.hasAttribute('focusable')) {
                if (this.getAttribute('focusable') == 'true') {
                    result.push('svg:focusable');
                }
            }
            if (!this.matches('[focusable="false"]') && this.hasAttribute('tabindex') && parseInt(this.getAttribute('tabindex')) >= 0) {
                result.push('aria:tabindex');
            }
            return result;
        }
    });
}

if (!HTMLElement.prototype.hasOwnProperty('canBeReachedUsingKeyboardWith')) {
    Object.defineProperty(HTMLElement.prototype, 'canBeReachedUsingKeyboardWith', {
        get: function () {
            var result = [];
            if (!this.matches('[tabindex="-1"]')) {
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
                if (this.hasAttribute('tabindex') && parseInt(this.getAttribute('tabindex')) >= 0) {
                    result.push('aria:tabindex');
                }
            }
            return result;
        }
    });
}

// TODO: fin DOM Extension.

var testsRessources = {
    'act': {
        lang: 'en',
        name: 'ACT Rules Community Group',
        description: 'The ACT Rules Community Group (previously known as Auto-WCAG), is an open forum set up to document and harmonize the interpretation of W3C accessibility standards, such as WCAG and WAI-ARIA, for testing purposes.',
        mainUrl: 'https://act-rules.github.io/pages/about',
        testUrl: 'https://act-rules.github.io/rules/{{id}}'
    },
    'wcag21': {
        lang: 'en',
        name: 'Web Content Accessibility Guidelines (WCAG) 2.1',
        description: 'Web Content Accessibility Guidelines (WCAG) 2.1 covers a wide range of recommendations for making Web content more accessible. Following these guidelines will make content more accessible to a wider range of people with disabilities, including accommodations for blindness and low vision, deafness and hearing loss, limited movement, speech disabilities, photosensitivity, and combinations of these, and some accommodation for learning disabilities and cognitive limitations; but will not address every user need for people with these disabilities. These guidelines address accessibility of web content on desktops, laptops, tablets, and mobile devices. Following these guidelines will also often make Web content more usable to users in general.',
        mainUrl: 'https://www.w3.org/TR/WCAG21/',
        testUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/{{technology}}/{{id}}'
    }
};

function getDuplicateID() {
    var nodelist = document.querySelectorAll('[id]:not([id=""])');
    var ids = [];
    var query = null;
    nodelist.forEach(node => {
        if (node.id.trim().length > 0) {
            if(ids[node.id] && ids[node.id] < 2) {
                var startDigit = /^\d/;
                var id = node.id;

                if(id.match(startDigit)) {
                    id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                } else {
                    id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                }

                query = query === null ? '' : query;
                query += '[id='+id+'],'
            }

            if (!ids[node.id]) {
                ids[node.id] = 0;
            }

            ids[node.id]++;
        }
    });

    query = query === null ? query : query.slice(0, -1);
    return document.querySelectorAll(query);
}