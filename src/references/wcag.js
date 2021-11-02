// TODO: début ACT.
var tanaguruTestsList = [];
var webextVersion = "1.4.0";

/* ACT */

// Accessible Names.

// Accessible Names: Buttons.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Button has an empty accessible name.',
	description: 'This rule checks that each button element has a non-empty accessible name.',
	query: 'button:not([role]), [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0 && !item.matches('input[type="reset"]:not([aria-labelledby]):not([aria-label]):not([value]):not([title]), input[type="reset"]:not([aria-labelledby]):not([aria-label]):not([value]):not([title])')) {
			return !item.hasAccessibleName();
		}
		return false;
	},
	tags: ['a11y', 'buttons'],
	ressources: { 'act': ['97a4e1'], 'wcag20': ['4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Button has a non-empty accessible name.',
	description: 'This rule checks that each button element has a non-empty accessible name.',
	query: 'button:not([role]), [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (item.matches('input[type="reset"]:not([aria-labelledby]):not([aria-label]):not([value]):not([title]), input[type="reset"]:not([aria-labelledby]):not([aria-label]):not([value]):not([title])')) {
				return true;
			}
			return item.hasAccessibleName();
		}
		return false;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'buttons'],
	ressources: { 'act': ['97a4e1'], 'wcag20': ['4.1.2'] }
});

// Accessible Names: Form Controls.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Form control has an empty accessible name.',
	description: 'This rule checks that each form field element has a non-empty accessible name.',
	query: 'input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'forms'],
	ressources: { 'act': ['e086e5'], 'wcag20': ['4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Form control has a non-empty accessible name.',
	description: 'This rule checks that each form field element has a non-empty accessible name.',
	query: 'input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'forms'],
	ressources: { 'act': ['e086e5'], 'wcag20': ['4.1.2'] }
});

// Accessible Names: Headings.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Heading has an empty accessible name.',
	description: 'This rule checks that each heading has a non-empty accessible name.',
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'headings'],
	ressources: { 'act': ['ffd0e9'], 'wcag20': ['1.3.1', '2.4.6'] },
	comments: [
		'Failed example 1: passed, not failed - https://act-rules.github.io/rules/ffd0e9#failed-example-1'
	]
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Heading has a non-empty accessible name.',
	description: 'This rule checks that each heading has a non-empty accessible name.',
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'headings'],
	ressources: { 'act': ['ffd0e9'], 'wcag20': ['1.3.1', '2.4.6'] },
	comments: [
		'Failed example 1: passed, not failed - https://act-rules.github.io/rules/ffd0e9#failed-example-1'
	]
});

// Accessible Names: Iframes.
tanaguruTestsList.push({
	lang: 'en',
	name: 'iframe element has an empty accessible name.',
	description: 'This rule checks that each iframe element has a non-empty accessible name.',
	query: 'iframe',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (!item.matches('[role]')) {
				return !item.hasAccessibleName();
			}
			else if (item.matches('[role="none"][tabindex="0"], [role="presentation"][tabindex="0"]')) {
				var role = item.getAttribute('role');
				item.removeAttribute('role');
				var result = !item.hasAccessibleName();
				item.setAttribute('role', role);
				return result;
			}
		}
		return false;
	},
	tags: ['a11y', 'frames'],
	ressources: { 'act': ['cae760'], 'wcag20': ['4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'iframe element has a non-empty accessible name',
	description: 'This rule checks that each iframe element has a non-empty accessible name.',
	query: 'iframe',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (!item.matches('[role]')) {
				return item.hasAccessibleName();
			}
			else if (item.matches('[role="none"][tabindex="0"], [role="presentation"][tabindex="0"]')) {
				var role = item.getAttribute('role');
				item.removeAttribute('role');
				var result = item.hasAccessibleName();
				item.setAttribute('role', role);
				return result;
			}
		}
		return false;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'frames'],
	ressources: { 'act': ['cae760'], 'wcag20': ['4.1.2'] }
});

// Accessible Names: Image Buttons.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Image button has an empty accessible name.',
	description: 'This rule checks that each image button element has a non-empty accessible name.',
	query: 'input[type="image"]:not([role]), input[type="image"][role="button"]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
	},
	tags: ['a11y', 'buttons', 'images'],
	ressources: { 'act': ['59796f'], 'wcag20': ['1.1.1', '4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image button has a non-empty accessible name.',
	description: 'This rule checks that each image button element has a non-empty accessible name.',
	query: 'input[type="image"]:not([role]), input[type="image"][role="button"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'buttons', 'images'],
	ressources: { 'act': ['59796f'], 'wcag20': ['1.1.1', '4.1.2'] }
});

// Accessible Names: Images.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Image has an empty accessible name.',
	description: 'This rule checks that each image either has a non-empty accessible name or is marked up as decorative.',
	query: 'img:not([role]), img[role="none"][tabindex], img[role="presentation"][tabindex], [role="img"]',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (item.matches('img[role="none"][tabindex], img[role="presentation"][tabindex]')) {
				var tabindex = item.getAttribute('tabindex');
				if (tabindex != '-1' && tabindex.match(/^(0|[1-9]?[0-9]*)$/)) {
					var role = item.getAttribute('role');
					item.removeAttribute('role');
					var result = !item.hasAccessibleName();
					item.setAttribute('role', role);
					return result;
				}
			}
			else if (item.matches('img:not([alt])') || (item.matches('img[alt]') && item.getAttribute('alt').length > 0) || !item.matches('img')) {
				return !item.hasAccessibleName();
			}
		}
		return false;
	},
	tags: ['a11y', 'images'],
	ressources: { 'act': ['23a2a8'], 'wcag20': ['1.1.1'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image has a non-empty accessible name.',
	description: 'This rule checks that each image either has a non-empty accessible name or is marked up as decorative.',
	query: 'img:not([role]), img[role="none"]:not([tabindex]), img[role="presentation"]:not([tabindex]), [role="img"]',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (item.matches('[role="none"], [role="presentation"]') || item.matches('img[alt=""]')) {
				return true;
			}
			else {
				return item.hasAccessibleName();
			}
		}
		return false;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'images'],
	ressources: { 'act': ['23a2a8'], 'wcag20': ['1.1.1'] }
});

// Accessible Names: SVG.
tanaguruTestsList.push({
	lang: 'en',
	name: "svg element with explicit role has a non-empty accessible name.",
	description: 'This rule checks that each SVG image element that is explicitly included in the accessibility tree has a non-empty accessible name.',
	query: 'svg[role="img"]',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			return item.hasAccessibleName();
		}
		return false;
	},
	tags: ['a11y', 'svg'],
	ressources: { 'act': ['7d6734'], 'wcag20': ['1.1.1'] },
	comments: 'Partially Implemented. See https://www.w3.org/TR/svg-aam-1.0/.'
});

// Accessible Names: Links.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Link has an empty accessible name.',
	description: 'This rule checks that each link has a non-empty accessible name.',
	query: 'a[href]:not([role]), a[href][role="none"]:not([tabindex="-1"]), a[href][role="presentation"]:not([tabindex="-1"]), [role="link"], map[name]:not([role]) > area[href]:not([role])',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (item.matches(':not([role]), [role="link"]')) {
				return !item.hasAccessibleName();
			}
			else if (item.matches('[role="none"], [role="presentation"]')) {
				if (!item.hasAttribute('tabindex') || item.getAttribute('tabindex').match(/^(0|[1-9]?[0-9]*)$/)) {
					var role = item.getAttribute('role');
					item.removeAttribute('role');
					var result = !item.hasAccessibleName();
					item.setAttribute('role', role);
					return result;
				}
			}
		}
		return false;
	},
	tags: ['a11y', 'links'],
	ressources: { 'act': ['c487ae'], 'wcag20': ['2.4.4', '2.4.9', '4.1.2'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Link has a non-empty accessible name.',
	description: 'This rule checks that each link has a non-empty accessible name.',
	query: 'a[href]:not([role]), a[href][role="none"]:not([tabindex="-1"]), a[href][role="presentation"]:not([tabindex="-1"]), [role="link"], map[name]:not([role]) > area[href]:not([role])',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (item.matches(':not([role]), [role="link"]')) {
				return item.hasAccessibleName();
			}
			else if (item.matches('[role="none"], [role="presentation"]')) {
				if (!item.hasAttribute('tabindex') || item.getAttribute('tabindex').match(/^(0|[1-9]?[0-9]*)$/)) {
					var role = item.getAttribute('role');
					item.removeAttribute('role');
					var result = item.hasAccessibleName();
					item.setAttribute('role', role);
					return result;
				}
			}
		}
		return false;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'links'],
	ressources: { 'act': ['c487ae'], 'wcag20': ['2.4.4', '2.4.9', '4.1.2'] }
});

// Code.
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
	ressources: { 'act' : ['3ea0c8'], 'wcag20': ['4.1.1'] },
	tags: ['a11y', 'code']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Attribute is not duplicated.',
	description: 'This rule checks that HTML and SVG starting tags do not contain duplicated attributes.',
	status: 'untested',
	ressources: { 'act': ['e6952f'], 'wcag20': ['4.1.1'] },
	tags: ['a11y', 'code'],
	comment: 'Duplicated attributes are removed by the user agent.'
});

// ARIA.
tanaguruTestsList.push({
	lang: 'en',
	name: 'role attribute has an invalid value.',
	description: 'This rule checks that each role attribute has a valid value.',
	query: '[role]',
	expectedNbElements: 0,
	filter: function (item) {
		//if (item instanceof MathMLElement) {
		//return false;
		//}
		if (item.isNotExposedDueTo.length == 0) {
			if (item.getAttribute('role').trim() == 0) {
				return false;
			}
			return !item.hasValidRole();
		}
		return false;
	},
	ressources: { 'act': ['674b10'] },
	tags: ['a11y', 'aria']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'role attribute has a valid value.',
	description: 'This rule checks that each role attribute has a valid value.',
	query: '[role]',
	filter: function (item) {
		//if (item instanceof MathMLElement) {
		//return false;
		//}
		return item.isNotExposedDueTo.length == 0 ? item.hasValidRole() : false;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	ressources: { 'act': ['674b10'] },
	tags: ['a11y', 'aria']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'aria-* attribute is defined in WAI-ARIA.',
	description: 'This rule checks that each aria-* attribute specified is defined in ARIA 1.2.',
	query: '*',
	filter: function (item) {
		//if (item instanceof MathMLElement) {
		//return false;
		//}
		if (item.isNotExposedDueTo.length == 0) {
			return Array.from(item.attributes).filter(function(attributeNode) {
				return /^aria-.*$/.test(attributeNode.nodeName);
			}).length > 0;
		}
		return false;
	},
	analyzeElements: function (collection) {
		var definedStatesProperties = ARIA.getAllStatesProperties('js');
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
			var attributes = Array.from(collection[i].attributes);
			for (var a = 0; a < attributes.length; a++) {
				if (/^aria-.*$/.test(attributes[a].nodeName)) {
					if (definedStatesProperties.indexOf(attributes[a].nodeName) == -1) {
						collection[i].status = 'failed';
						break;
					}
				}
			}
		}
	},
	ressources: { 'act': ['5f99a7'] },
	tags: ['a11y', 'aria']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'ARIA state or property has an invalid value.',
	description: 'This rule checks that each ARIA state or property has a valid value.',
	query: '*',
	expectedNbElements: 0,
	filter: function (item) {
		//if (item instanceof MathMLElement) {
		//return false;
		//}
		if (item.isNotExposedDueTo.length == 0) {
			if (Array.from(item.attributes).filter(function(attributeNode) { return /^aria-.*$/.test(attributeNode.nodeName); }).length > 0) {
				return item.hasAriaAttributesWithInvalidValues({ permissive: true });
			}
		}
		return false;
	},
	ressources: { 'act': ['6a7281'] },
	tags: ['a11y', 'aria']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'ARIA state or property is not permitted.',
	description: 'This rule checks that WAI-ARIA states or properties are allowed for the element they are specified on.',
	query: '*',
	expectedNbElements: 0,
	filter: function (item) {
		//if (item instanceof MathMLElement) {
		//return false;
		//}
		if (item.isNotExposedDueTo.length == 0) {
			if (Array.from(item.attributes).filter(function(attributeNode) { return /^aria-.*$/.test(attributeNode.nodeName); }).length > 0) {
				return item.hasProhibitedAriaAttributes();
			}
		}
		return false;
	},
	ressources: { 'act': ['5c01ea'] },
	tags: ['a11y', 'aria']
});

// Languages.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Element with lang attribute has an invalid language tag.',
	description: 'This rule checks that a non-empty lang attribute of an element in the page body has a language tag with a known primary language subtag.',
	query: 'body [lang]',
	expectedNbElements: 0,
	filter: function (item) {
		var lang = item.getAttribute('lang');
		if (lang != '') {
			return lang.trim().length == 0 ? true : !item.hasValidLanguageCode();
		}
		else {
			return false;
		}
	},
	ressources: { 'act': ['de46e4'], 'wcag20': ['3.1.2'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Element with lang attribute has a valid language tag.',
	description: 'This rule checks that a non-empty lang attribute of an element in the page body has a language tag with a known primary language subtag.',
	query: 'body [lang]',
	filter: function (item) {
		var lang = item.getAttribute('lang');
		if (lang != '') {
			return lang.trim().length > 0 ? item.hasValidLanguageCode() : false;
		}
		else {
			return false;
		}
	},
	ressources: { 'act': ['de46e4'], 'wcag20': ['3.1.2'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: "HTML page doesn't have a lang attribute.",
	description: 'This rule checks that an HTML page has a non-empty lang attribute.',
	expectedNbElements: 0,
	query: 'html:not([lang])',
	ressources: { 'act': ['b5c3f8'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page has an empty lang attribute.',
	description: 'This rule checks that an HTML page has a non-empty lang attribute.',
	query: 'html[lang]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.getAttribute('lang').trim().length == 0;
	},
	ressources: { 'act': ['b5c3f8'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page has a non-empty lang attribute.',
	description: 'This rule checks that an HTML page has a non-empty lang attribute.',
	query: 'html[lang]',
	filter: function (item) {
		return item.getAttribute('lang').trim().length > 0;
	},
	ressources: { 'act': ['b5c3f8'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: "HTML page lang and xml:lang attributes don't have matching values.",
	description: 'This rule checks that both lang and xml:lang attributes on the root element of a non-embedded HTML page, have the same primary language subtag.',
	query: 'html[lang][xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
		return !item.hasValidLanguageCode || (item.getAttribute('xml:lang').trim().length > 0 && item.getAttribute('lang') != item.getAttribute('xml:lang'));
	},
	ressources: { 'act': ['5b7ae0'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page lang and xml:lang attributes have matching values.',
	description: 'This rule checks that both lang and xml:lang attributes on the root element of a non-embedded HTML page, have the same primary language subtag.',
	query: 'html[lang][xml\\:lang]',
	filter: function (item) {
		return item.hasValidLanguageCode && item.getAttribute('lang') == item.getAttribute('xml:lang');
	},
	analyzeElements: function (collection) {
		if (collection.length == 1) {
			collection[0].status = 'passed';
		}
	},
	ressources: { 'act': ['5b7ae0'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page language is invalid.',
	description: 'This rule checks that the lang attribute of the root element of a non-embedded HTML page has a language tag with a known primary language subtag.',
	query: 'html[lang]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.getAttribute('lang').trim().length > 0 && !item.hasValidLanguageCode();
	},
	ressources: { 'act': ['bf051a'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page language is valid.',
	description: 'This rule checks that the lang attribute of the root element of a non-embedded HTML page has a language tag with a known primary language subtag.',
	query: 'html[lang]',
	filter: function (item) {
		return item.getAttribute('lang').trim().length > 0 && item.hasValidLanguageCode();
	},
	ressources: { 'act': ['bf051a'], 'wcag20': ['3.1.1'] },
	tags: ['a11y', 'languages']
});

// Document Title.
tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page has an non-empty title.',
	description: 'This rule checks that a non-embedded HTML page has a title.',
	query: 'title',
	filter: function (item) {
		return !item.matches('svg title');
	},
	analyzeElements: function (collection) {
		if (collection.length > 0) {
			for (var i = 0; i < collection.length; i++) {
				collection[i].status = 'untested';
			}
			collection[0].status = document.title.trim().length == 0 ? 'failed' : 'passed';
		}
	},
	ressources: { 'act': ['2779a5'], 'wcag20': ['2.4.2'] },
	tags: ['a11y', 'pageTitle']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page has a title.',
	description: 'This rule checks that a non-embedded HTML page has a title.',
	query: 'title',
	filter: function (item) {
		return !item.matches('svg title');
	},
	expectedNbElements: { min: 1 },
	ressources: { 'act': ['2779a5'], 'wcag20': ['2.4.2'] },
	tags: ['a11y', 'pageTitle']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'HTML page title is descriptive.',
	description: 'This rule checks that the first title in an HTML page describes the topic or purpose of that page.',
	query: 'title',
	filter: function (item) {
		return !item.matches('svg title');
	},
	analyzeElements: function (collection) {
		if (collection.length > 0) {
			for (var i = 0; i < collection.length; i++) {
				collection[i].status = 'untested';
			}
			collection[0].status = document.title.trim().length == 0 ? 'failed' : 'untested';
		}
	},
	ressources: { 'act': ['c4a8a4'], 'wcag20': ['2.4.2'] },
	tags: ['a11y', 'pageTitle']
});

// Meta.
tanaguruTestsList.push({
	lang: 'en',
	name: 'meta element has no refresh delay.',
	description: 'This rule checks that the meta element is not used for delayed redirecting or refreshing.',
	query: 'meta[http-equiv="refresh"][content]',
	filter: function (item) {
		var content = item.getAttribute('content').trim();
		if (content.length > 0) {
			return /^(\s*\d+\s*){1}(;|;(url=)?(.)+)?$/i.test(content);
		}
		else {
			return false;
		}
	},
	analyzeElements: function (collection) {
		var alreadyTested = false;
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'untested';
			if (!alreadyTested) {
				var content = collection[i].getAttribute('content').trim();
				if (content.indexOf(';') > -1) {
					content = content.split(/;(.+)/);
					content = content[0];
				}
				content = parseInt(content.trim());
				collection[i].status = content == 0 || content >= 72000 ? 'passed' : 'failed';
				alreadyTested = true;
			}
		}
	},
	ressources: { 'act': ['bc659a'], 'wcag20': ['2.2.1', '2.2.4', '3.2.5'] },
	tags: ['a11y', 'meta']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'meta viewport does not prevent zoom.',
	description: 'This rule checks that the meta element retains the user agent ability to zoom.',
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		var content = item.getAttribute('content').trim();
		if (content.length > 0) {
			return /^\s*[^,=]+\s*=\s*[^,=]+\s*(,\s*[^,=]+\s*=\s*[^,=]+\s*)*$/i.test(content);
		}
		else {
			return false;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
			var content = collection[i].getAttribute('content').trim();
			content = content.indexOf(',') > -1 ? content.split(',') : content = [content];
			for (var j = 0; j < content.length; j++) {
				var property = content[j].split('=');
				var propertyName = property[0].trim().toLowerCase();
				var propertyValue = property[1].trim().toLowerCase();
				if (propertyName == 'user-scalable') {
					collection[i].status = propertyValue == 'no' ? 'failed' : 'passed';
				}
				else if (propertyName == 'maximum-scale' && /^\d+(\.\d+)?$/.test(propertyValue)) { // TODO : cas 1. / +1. / .1 / +.1
					propertyValue = parseFloat(propertyValue);
					collection[i].status = propertyValue < 2 ? 'failed' : 'passed';
				}
			}
		}
	},
	ressources: { 'act': ['b4f0c3'], 'wcag20': ['1.4.4', '1.4.10'] },
	tags: ['a11y', 'meta']
});

// Orientation.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Orientation of the page is not restricted using CSS transform property.',
	description: 'This rule checks that page content is not restricted to either landscape or portrait orientation using CSS transform property.',
	status: 'untested',
	ressources: { 'act': ['b33eff'], 'wcag20': ['1.3.4'] },
	tags: ['a11y'],
	comments: "Computed styles are not useful/relevant for this test + need to 'identify' some 'root' elements. Require a special UI & a new method of execution ?"
});

// Focus.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Element with aria-hidden has no focusable content.',
	description: 'This rule checks that elements with an aria-hidden attribute do not contain focusable elements.',
	query: '[aria-hidden="true"]',
	expectedNbElements: 0,
	filter: function (item) {
		var exposedState = item.isNotExposedDueTo;
		if (exposedState.indexOf('css:display') == -1 && exposedState.indexOf('css:visibility') == -1) {
			var focusables = item.querySelectorAll(HTML.getFocusableElementsSelector());
			if (focusables.length == 0) {
				focusables = [];
				var elementsWithTabindex = item.querySelectorAll('[tabindex]');
				for (var i = 0; i < elementsWithTabindex.length; i++) {
					if (/^[1-9]{1}\d*$/.test(elementsWithTabindex[i].getAttribute('tabindex'))) {
						focusables.push(elementsWithTabindex[i]);
						break;
					}
				}
			}
			return focusables.length > 0;
		}
		else {
			return false;
		}
	},
	ressources: { 'act': ['6cfa84'], 'wcag20': ['1.3.1', '4.1.2'] },
	tags: ['a11y', 'keyboard']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Focusable element has no keyboard trap.',
	description: 'This rule checks for keyboard traps. This includes use of both standard and non-standard keyboard navigation to navigate through all content without becoming trapped.',
	query: '[onblur]',
	ressources: { 'act': ['80af7b'], 'wcag20': ['2.1.2'] },
	tags: ['a11y', 'keyboard'],
	comments: "Can detect onblur attribute (maybe event too) but is not really a proof that is a keyboard trap..."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Focusable element has no keyboard trap via non-standard navigation.',
	description: 'This rule checks if it is possible to use non-standard keyboard navigation to navigate through content where focus is trapped when using standard ways of keyboard navigation.',
	status: 'untested',
	ressources: { 'act': ['ebe86a'] },
	tags: ['a11y', 'keyboard'],
	comments: "Can detect onblur/onkeydown attribute (maybe event too) but is not really a proof that is a keyboard trap..."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Focusable element has no keyboard trap via standard navigation.',
	description: 'This rule checks if it is possible to use standard keyboard navigation to navigate through all content on a web page without becoming trapped in any element.',
	status: 'untested',
	ressources: { 'act': ['a1b64e'] },
	tags: ['a11y', 'keyboard'],
	comments: "Can detect onblur attribute (maybe event too) but is not really a proof that is a keyboard trap..."
});

// Contrasts.
tanaguruTestsList.push({
	ui: 'contrast',
	lang: 'en',
	name: 'Text has minimum contrast.',
	description: 'This rule checks that the highest possible contrast of every text character with its background meets the minimal contrast requirement.',
	status: 'untested',
	ressources: { 'act': ['afw4f7'], 'wcag20': ['1.4.3', '1.4.6'] },
	tags: ['a11y', 'contrast', 'colors'],
	comments: "Require a special UI & a new method of execution."
});

// Links.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Link in context is descriptive.',
	description: 'This rule checks that the accessible name of a link together with its context describe its purpose.',
	query: 'a[href], [role="link"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	ressources: { 'act': ['5effbb'], 'wcag20': ['2.4.4', '2.4.9'] },
	tags: ['a11y', 'links'],
	comments: "Partially Implemented."
});

// Tables.
tanaguruTestsList.push({
	lang: 'en',
	name: "Headers attribute specified on a cell doesn't refer to cells in the same table element.",
	description: 'This rule checks that the headers attribute on a cell refer to other cells in the same table element.',
	query: 'table td[headers]',
	expectedNbElements: 0,
	filter: function (item) {
		var headers = item.getAttribute('headers');
		if (/^.+(\s.+)*$/.test(headers)) {
			headers = headers.split(' ');
			if (headers.length > 1) {
				var result = false;
				for (var i = 0; i < headers.length; i++) {
					var th = document.querySelector('th[id="' + headers[i] + '"]');
					result = th ? !(th.closest('table') == item.closest('table')) : true;
					if (result) {
						break;
					}
				}
				return result;
			}
			else {
				var th = document.querySelector('th[id="' + headers + '"]');
				return th ? !(th.closest('table') == item.closest('table')) : true;
			}
		}
		else {
			return true;
		}
	},
	ressources: { 'act': ['a25f45'], 'wcag20': ['1.3.1'] },
	tags: ['a11y', 'tables']
});

tanaguruTestsList.push({
	lang: 'en',
	name: "Headers attribute specified on a cell refers to cells in the same table element.",
	description: 'This rule checks that the headers attribute on a cell refer to other cells in the same table element.',
	query: 'table td[headers]',
	filter: function (item) {
		var headers = item.getAttribute('headers');
		if (/^.+(\s.+)*$/.test(headers)) {
			headers = headers.split(' ');
			if (headers.length > 1) {
				var result = true;
				for (var i = 0; i < headers.length; i++) {
					var th = document.querySelector('th[id="' + headers[i] + '"]');
					result = th ? th.closest('table') == item.closest('table') : false;
					if (!result) {
						break;
					}
				}
				return result;
			}
			else {
				var th = document.querySelector('th[id="' + headers + '"]');
				return th ? th.closest('table') == item.closest('table') : false;
			}
		}
		else {
			return false;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	ressources: { 'act': ['a25f45'], 'wcag20': ['1.3.1'] },
	tags: ['a11y', 'tables']
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'All table header cells have assigned data cells.',
	description: 'This rule checks that each table header has assigned data cells in a table element.',
	query: 'th, [role="columnheader"]',
	filter: function (item) {
		// TODO : count columns (row by row) or cell with headers (probably headers > cell) ?
	},
	ressources: { 'act': ['d0f69e'], 'wcag20': ['1.3.1'] },
	tags: ['a11y', 'tables']
});

// Headings.
tanaguruTestsList.push({
	lang: 'en',
	name: 'Heading is descriptive.',
	description: 'This rule checks that headings describe the topic or purpose of the content.',
	query: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
	},
	ressources: { 'act': ['b49b2e'], 'wcag20': ['2.4.6'] },
	tags: ['a11y', 'headings'],
	comments: "Partially Implemented."
});

// Audio & Videos.
tanaguruTestsList.push({
	lang: 'en',
	name: 'audio element content has text alternative.',
	description: 'This rule checks if audio only elements have a text alternative available.',
	query: 'audio',
	ressources: { 'act': ['e7aa44'], 'wcag20': ['1.2.1'] },
	tags: ['a11y', 'audio'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'audio element content has transcript.',
	description: 'Non-streaming audio elements must have a text alternative for all included auditory information.',
	status: 'untested',
	ressources: { 'act': ['2eb176'] },
	tags: ['a11y', 'audio'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'audio element content is media alternative for text.',
	description: 'This rule checks audio is a media alternative for text on the page.',
	status: 'untested',
	ressources: { 'act': ['afb423'] },
	tags: ['a11y', 'audio'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element auditory content has accessible alternative.',
	description: 'This rule checks that video elements have an alternative for information conveyed through audio.',
	query: 'video',
	ressources: { 'act': ['eac66b'], 'wcag20': ['1.2.2'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element content is media alternative for text.',
	description: 'This rule checks non-streaming video is a media alternative for text on the page.',
	status: 'untested',
	ressources: { 'act': ['ab4d13'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual content has accessible alternative.',
	description: 'This rule checks that video elements with audio have an alternative for the video content as audio or as text.',
	query: 'video',
	ressources: { 'act': ['c5a4ea'], 'wcag20': ['1.2.3'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual content has audio description.',
	description: 'This rule checks that non-streaming video elements have all visual information also contained in the audio.',
	status: 'untested',
	ressources: { 'act': ['1ea59c'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual content has strict accessible alternative.',
	description: 'This rule checks that video elements with audio have audio description.',
	query: 'video',
	ressources: { 'act': ['1ec09b'], 'wcag20': ['1.2.5'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual content has transcript.',
	description: 'This rule checks that non-streaming video elements have all audio and visual information available in a transcript.',
	query: 'video',
	ressources: { 'act': ['1a02b0'], 'wcag20': ['1.2.8'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual-only content has accessible alternative.',
	description: 'This rule checks that video elements without audio have an alternative available.',
	query: 'video',
	ressources: { 'act': ['c3232f'], 'wcag20': ['1.2.1'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual-only content has audio track alternative.',
	description: 'Non-streaming video elements without audio must have an audio alternative.',
	status: 'untested',
	ressources: { 'act': ['d7ba54'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual-only content has transcript.',
	description: 'Non-streaming video elements without audio must have all visual information available in a transcript.',
	status: 'untested',
	ressources: { 'act': ['ee13b5'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual-only content is media alternative for text.',
	description: 'This rule checks non-streaming silent video is a media alternative for text on the page.',
	status: 'untested',
	ressources: { 'act': ['fd26cf'] },
	tags: ['a11y', 'videos'],
	comments: "Can't be detected."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'audio or video without controls has audio that plays automatically.',
	description: 'This rule checks that audio or video that plays automatically does not have audio that lasts for more than 3 seconds or has an audio control mechanism to stop or mute it.',
	query: 'audio[autoplay]:not([controls]), video[autoplay]:not([controls])',
	ressources: { 'act': ['80f0bf'], 'wcag20': ['1.4.2'] },
	tags: ['a11y', 'audio', 'videos'],
	comments: "Partially Implemented."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'audio or video with controls has audio that plays automatically.',
	description: 'This rule checks that audio or video that plays automatically does not have audio that lasts for more than 3 seconds or has an audio control mechanism to stop or mute it.',
	query: 'audio[autoplay][controls], video[autoplay][controls]',
	ressources: { 'act': ['80f0bf', '4c31df'], 'wcag20': ['1.4.2'] },
	tags: ['a11y', 'audio', 'videos'],
	comments: "Partially Implemented for both tests."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'audio or video that plays automatically does not exceed 3 seconds.',
	description: 'audio or video that plays automatically does not output audio for more than 3 seconds.',
	status: 'untested',
	ressources: { 'act': ['aaa1bf'] },
	tags: ['a11y', 'audio', 'videos'],
	comments: "Can't be detected (to investigate - i.e. passed example 2 + duration time)."
});

tanaguruTestsList.push({
	lang: 'en',
	name: "video element auditory content doesn't have captions.",
	description: 'This rule checks that captions are available for audio information in non-streaming video elements.',
	query: 'video',
	filter: function (item) {
		return item.querySelectorAll('track[kind="captions"]').length == 0;
	},
	ressources: { 'act': ['f51b46'], 'wcag20': ['1.2.2'] },
	tags: ['a11y', 'videos'],
	comments: "Partially Implemented (dynamical tracktext not supported here)."
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element auditory content has captions.',
	description: 'This rule checks that captions are available for audio information in non-streaming video elements.',
	query: 'video',
	filter: function (item) {
		return item.querySelectorAll('track[kind="captions"]').length > 0;
	},
	ressources: { 'act': ['f51b46'], 'wcag20': ['1.2.2'] },
	tags: ['a11y', 'videos'],
	comments: "Partially Implemented (dynamical tracktext not supported here). This test is somewhat silly (need to check that the video element has controls)."
});

tanaguruTestsList.push({
	lang: 'en',
	name: "video element visual(-only) content doesn't have description track.",
	description: 'This rule checks that description tracks that come with non-streaming video elements (without audio or not) are descriptive.',
	query: 'video',
	filter: function (item) {
		return item.querySelectorAll('track[kind="descriptions"]').length == 0;
	},
	ressources: { 'act': ['f196ce', 'ac7dc6'], 'wcag20': ['1.2.1', '1.2.3', '1.2.5', '1.2.7'] },
	tags: ['a11y', 'videos'],
	comments: "Partially Implemented. Hum, Accessibility Supported?"
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'video element visual(-only) content has description track.',
	description: 'This rule checks that description tracks that come with non-streaming video elements (without audio or not) are descriptive.',
	query: 'video',
	filter: function (item) {
		return item.querySelectorAll('track[kind="descriptions"]').length > 0;
	},
	ressources: { 'act': ['f196ce', 'ac7dc6'], 'wcag20': ['1.2.1', '1.2.3', '1.2.5', '1.2.7'] },
	tags: ['a11y', 'videos'],
	comments: "Partially Implemented. Hum, Accessibility Supported?"
});