var getAvailableARIASemantics = function () {
    var selectors = [];
    switch (this.tagName.toLowerCase()) {
        case 'a':
            if (this.hasAttribute('href')) {
                selectors.push('[role="button"]', '[role="checkbox"]', '[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]', '[role="option"]', '[role="radio"]', '[role="switch"]', '[role="tab"]', '[role="treeitem"]');
            }
            else {

                for(let i = 0; i < ariaroles.length; i++) {
                    selectors.push('[role="' + ariaroles[i] + '"]');
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
            for(let i = 0; i < ariaroles.length; i++) {
                selectors.push('[role="' + ariaroles[i] + '"]');
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
                for(let i = 0; i < ariaroles.length; i++) {
                    selectors.push('[role="' + ariaroles[i] + '"]');
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

var getHTMLElementImplicitARIASemantic = function () {
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

var getUnknowElementImplicitARIASemantic = function () {
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

var getElementImplicitARIASemantic = function () {
    var selector = undefined;
    switch (this.tagName.toLowerCase()) {
        case 'math':
            selector = '[role="math"]';
            break;
    }
    return selector;
}
