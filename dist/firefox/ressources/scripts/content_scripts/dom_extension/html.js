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