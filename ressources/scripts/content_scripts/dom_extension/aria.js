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
				return this.canBeUsedInRole(role.role) || prohibitedStatesProperties.indexOf(this.stateProperty) > -1;
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
		if (arguments.length == 2 && arguments[1].constructor == Object) {
			if (arguments[1].hasOwnProperty('getData')) {
				if (this.isValid()) {
					this.setUsedInRoles();
					this.setValues();
				}
			}
		}
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
				return computedRole != null ? computedRole : this.getImplicitAriaRole();
			}
			else {
				role = new ARIA.Role(role);
				return role.isValid() ? role.role : this.getImplicitAriaRole();
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
		if (name.match(/^aria-/)) {
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
								var notFoundElements = [];
								var ids = attribute.value.split(' ');
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