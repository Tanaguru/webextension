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
	name: 'Image has accessible name.',
	query: 'img:not([role]), [role="img"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	}, 
	tags: ['a11y', 'images', 'accessiblename'],
	ressources: { 'act': ['23a2a8'], 'WCAG': ['1.1.1'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image has accessible name.',
	query: 'img:not([role]), [role="img"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
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
		console.log(item);
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

// Id Attributes.

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
  tags: ['a11y', 'id'],
	ressources: { 'act' : ['3ea0c8'], 'WCAG': ['4.1.1']}
});

// c487ae


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
		console.log(langAttr);
		if ((!langAttr=='')||(!langAttr==' ')){
			console.log('toto');
			return true;
		}
		else return true;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	mark: { attrs: ['lang'] },
	tags: ['a11y', 'Mandatory', 'lang'],
	ressources: { 'act': ['c487ae'], 'WCAG': ['4.1.2']}
});