/*
  ACT-Rules Community
  Site : https://act-rules.github.io/pages/about
  Repository : https://github.com/act-rules/act-rules.github.io
*/

var tanaguruTestsList = []; 

// Accessible Names.

// 97a4e1 - Button has accessible name.

tanaguruTestsList.push({
	lang: 'en',
	name: 'Button has accessible name.',
	query: 'button:not([role]), [role="button"], input[type="reset"], input[type="submit"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	}, 
	tags: ['a11y', 'buttons', 'accessiblename'],
	ressources: { 'act': ['97a4e1'], 'WCAG': ['4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Button has accessible name.',
	query: 'button:not([role]), [role="button"], input[type="reset"], input[type="submit"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'buttons', 'accessiblename'],
	ressources: { 'act': ['97a4e1'], 'WCAG': ['4.1.2'] }
});

// e086e5 Form control has no accessible name.

tanaguruTestsList.push({
	lang: 'en', 
	name: 'Form control has no accessible name.', 
	description: 'This rule checks that each form field element has an accessible name.', 
	query: 'input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]', 
	expectedNbElements: 0, 
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	}, 
	tags: ['a11y', 'forms', 'accessiblename'], 
	ressources: { 'act': ['e086e5'], 'WCAG': ['4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en', 
	name: 'Form control has accessible name.', 
	description: 'This rule checks that each form field element has an accessible name.', 
	query: 'input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]', 
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'forms', 'accessiblename'], 
	ressources: { 'act': ['e086e5'], 'WCAG': ['4.1.2']}
});

// 23a2a8 Heading has accessible name.

tanaguruTestsList.push({
	lang: 'en',
	name: 'Heading has accessible name',
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"][aria-level="1"], [role="heading"][aria-level="2"], [role="heading"][aria-level="3"], [role="heading"][aria-level="4"], [role="heading"][aria-level="5"], [role="heading"][aria-level="6"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	}, 
	tags: ['a11y', 'headings', 'accessiblename'],
	ressources: {'act': ['23a2a8'], 'WCAG': ['1.3.1'], 'WCAG':['2.4.6'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Heading has accessible name',
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"][aria-level="1"], [role="heading"][aria-level="2"], [role="heading"][aria-level="3"], [role="heading"][aria-level="4"], [role="heading"][aria-level="5"], [role="heading"][aria-level="6"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'headings', 'accessiblename'],
	ressources: {'act': ['23a2a8'], 'WCAG': ['1.3.1'], 'WCAG':['2.4.6'] }
});

// 59796f Iframe has accessible name.

tanaguruTestsList.push({
	lang: 'en',
	name: 'Iframe has accessible name',
	query: 'iframe:not([role])',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'frames', 'accessiblename'],
	ressources: {'act': ['cae760'], 'WCAG': ['4.1.2']}
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Iframe has accessible name',
	query: 'iframe:not([role])',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'frames', 'accessiblename'],
	ressources: {'act': ['cae760'], 'WCAG': ['4.1.2']}
});

// 59796f - Image button has accessible name.

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image button has accessible name',
	query: 'input[type="image"]:not([role])',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'buttons','images', 'accessiblename'],
	ressources: {'act': ['59796f'], 'WCAG': ['1.1.1'], 'WCAG':['4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image button has accessible name',
	query: 'input[type="image"]:not([role])',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'buttons','images', 'accessiblename'],
	ressources: {'act': ['59796f'], 'WCAG': ['1.1.1'], 'WCAG':['4.1.2'] }
});

// 23a2a8 - Image has accessible name.

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image has no accessible name.',
	query: 'img:not([role]), [role="img"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && (!item.matches('img[alt]') && !item.hasAccessibleName());
	}, 
	tags: ['a11y', 'images', 'accessiblename'],
	ressources: { 'act': ['23a2a8'], 'WCAG': ['1.1.1'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image has accessible name.',
	query: 'img:not([role]), [role="img"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && (item.matches('img[alt]') || item.hasAccessibleName());
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'images', 'accessiblename'],
	ressources: { 'act': ['23a2a8'], 'WCAG': ['1.1.1'] }
});

//partial implementaiton: circle tag
tanaguruTestsList.push({
	lang: 'en',
	name: 'svg element with explicit role has accessible name',
	query: 'svg[role="img"], svg[role="graphic-document"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'images','svg'],
	ressources: {'act': ['7d6734'], 'WCAG': ['1.1.1'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'svg element with explicit role has accessible name',
	query: 'svg[role="img"], svg[role="graphic-document"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'images','svg'],
	ressources: {'act': ['7d6734'], 'WCAG': ['1.1.1'] }
});

// c487ae - Link has accessible name.

tanaguruTestsList.push({
	lang: 'en',
	name: 'Link has accessible name.',
	query: 'a:not([role]), [role="link"], area:not([role])',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'links', 'accessiblename'],
	ressources: { 'act': ['c487ae'], 'WCAG': ['1.1.1'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Link has accessible name.',
	query: 'a:not([role]), [role="link"], area:not([role])',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'links', 'accessiblename'],
	ressources: { 'act': ['c487ae'], 'WCAG': ['4.1.2']}
});

// 3ea0c8 id attribute value is unique.

tanaguruTestsList.push({
	lang: 'en',
	name: 'id attribute value is unique.',
	description: 'This rule checks that all id attribute values on a single page are unique.',
	query: '[id]:not([id=""])',
	analyzeElements: function (elements) {
		var ids = {};
		for (var e = 0; e < elements.length; e++) {
			var id = elements[e].getAttribute('id');
			if (id.trim().length > 0) {
				if (!ids[id]) {
					ids[id] = [];
				}
				elements[e].status = 'passed';
				ids[id].push(elements[e]);
			}
		}
		for (var i in ids) {
			if (ids[i].length > 1) {
				for (var j = 0; j < ids[i].length; j++) {
					ids[i][j].status = 'failed';
				}
			}
		}
  },
  tags: ['a11y'],
	ressources: { 'act' : ['3ea0c8'], 'WCAG': ['4.1.1']}
});

// c487ae - HTML page has lang attribute.


tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page has no lang attribute.',
	query: 'html',
	filter: function(item) {
		var langAttr = item.getAttribute('lang');
		if ((langAttr==null)||(langAttr=='')||(langAttr==' ')){
			return true;
		}
	},
	expectedNbElements: 0,
	mark: { attrs: ['lang'] },
	tags: ['a11y', 'Mandatory'],
	ressources: { 'act': ['c487ae'], 'WCAG': ['4.1.2']}
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page has lang attribute.',
	query: 'html[lang]',
	filter: function (item) {
		var langAttr = item.getAttribute('lang');
		if ((!langAttr=='')||(!langAttr==' ')){
			return true;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	mark: { attrs: ['lang'] },
	tags: ['a11y', 'Mandatory'],
	ressources: { 'act': ['c487ae'], 'WCAG': ['4.1.2']}
});

// 5b7ae0 - lang and xml:lang attributes have the same primary language subtag

tanaguruTestsList.push({
	lang: 'en',
	name: 'lang and xml:lang attributes havent the same primary language subtag',
	query: 'html[lang][xml\\:lang]',
	filter: function(item) {
		var langAttr = item.getAttribute('lang');
		var xmlLangAttr = item.getAttribute('xml:lang');
		if ((langAttr.substring(0, 2)) != (xmlLangAttr.substring(0, 2))){
			return true;
		}
	},
	expectedNbElements: 0,
	mark: { attrs: ['lang', 'xml:lang']},
	tags: ['a11y', 'Mandatory'],
	ressources: { 'act': ['5b7ae0'], 'WCAG': ['3.1.1']}
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'lang and xml:lang attributes have the same primary language subtag',
	query: 'html[lang][xml\\:lang]',
	filter: function(item) {
		var langAttr = item.getAttribute('lang');
		var xmlLangAttr = item.getAttribute('xml:lang');
		if ((langAttr.substring(0, 2)) == (xmlLangAttr.substring(0, 2))){
			return true;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
		collection[i].status = 'passed';
		}
	},
	mark: { attrs: ['lang', 'xml:lang']},
	tags: ['a11y', 'Mandatory'],
	ressources: { 'act': ['5b7ae0'], 'WCAG': ['3.1.1']}
});


// bf051a - HTML page language is valid - incomplete
tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page language is invalid',
	query: 'html[lang]',
	filter: function(item) {
		var langAttr = item.getAttribute('lang');
		var langAttr = langAttr.split('-')
		var isoRegex = /[^en$|^fr$]/g;
		if (langAttr[0].match(isoRegex)){
			return true;
		}
	},
	mark: { attrs: ['lang']},
	tags: ['a11y', 'Mandatory'],
	ressources: { 'act': ['bf051a'], 'WCAG': ['3.1.1']}
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page language is valid',
	query: 'html[lang]',
	filter: function(item) {
		var langAttr = item.getAttribute('lang');
		var langAttr = langAttr.split('-')
		var isoRegex = /[^en$|^fr$]/g;
		if (!langAttr[0].match(isoRegex)){
			return true;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
		collection[i].status = 'passed';
		}
	},
	mark: { attrs: ['lang']},
	tags: ['a11y', 'Mandatory'],
	ressources: { 'act': ['bf051a'], 'WCAG': ['3.1.1']}
});

// ff89c9 - ARIA required context role

// d0f69e - All table header cells have assigned data cells

// bc4a75 - ARIA required owned elements

// 6a7281 - ARIA state or property has valid value

// 5c01ea - ARIA state or property is permitted

// 5f99a7 - aria-* attribute is defined in WAI-ARIA

// e6952f - Attribute is not duplicated

// e7aa44 - audio element content has text alternative

// 2eb176 - audio element content has transcript

// afb423 - audio element content is media alternative for text

// 80f0bf - audio or video avoids automatically playing audio

// 4c31df - audio or video that plays automatically has a control mechanism

// aaa1bf - Audio or video that plays automatically has no audio that lasts more than 3 seconds

// 73f2c2 - autocomplete attribute has valid value

// 6cfa84 - Element with aria-hidden has no focusable content

// 4e8ab6 - Element with role attribute has required states and properties

// 36b590 - Error message describes invalid form field value

// 80af7b - Focusable element has no keyboard trap

// ebe86a - Focusable element has no keyboard trap via non-standard navigation

// a1b64e - Focusable element has no keyboard trap via standard navigation

// cc0f0a - Form control label is descriptive

// a25f45 - Headers attribute specified on a cell refers to cells in the same table element

// b49b2e - Heading is descriptive

// c4a8a4 - HTML page title is descriptive

// e88epe - Image not in the accessibility tree is decorative

// 5effbb - Link in context is descriptive

// fd3a94 - Links with identical accessible names and context serve equivalent purpose

// b20e66 - Links with identical accessible names have equivalent purpose

// bc659a - meta element has no refresh delay

// b4f0c3 - meta viewport does not prevent zoom

// b33eff - Orientation of the page is not restricted using CSS transform property

// 674b10 - role attribute has valid value

// 0ssw9k - Scrollable element is keyboard accessible

// efbfc7 - Text content that changes automatically can be paused, stopped or hidden

// afw4f7 - Text has minimum contrast

// eac66b - video element auditory content has accessible alternative

// f51b46 - video element auditory content has captions

// ab4d13 - video element content is media alternative for text

// c5a4ea - video element visual content has accessible alternative

// 1ea59c - video element visual content has audio description

// f196ce - video element visual content has description track

// 1ec09b - video element visual content has strict accessible alternative

// 1a02b0 - video element visual content has transcript

// c3232f - video element visual-only content has accessible alternative

// d7ba54 - video element visual-only content has audio track alternative

// ee13b5 - video element visual-only content has transcript

// fd26cf - video element visual-only content is media alternative for text

// 2ee8b8 - Visible label is part of accessible name

// 59br37 - Zoomed text node is not clipped with CSS overflow
