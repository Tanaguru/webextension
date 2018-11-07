// Titres de contenus.
createTanaguruTest({
	lang: 'fr',
	name: "Présence d'au moins un titre de niveau 1.",
	query: 'h1:not([role]):not([aria-level]), h1[role="heading"]:not([aria-level]), [role="heading"][aria-level="1"]',
	expectedNbElements: { min: 1 },
	explanations: { 
		'passed': "Un titre de niveau 1 (élément h1) est présent dans la page.", 
		'failed': "Cette page ne contient pas de titre de niveau 1 (élément h1)."
	},
	tags: ['a11y', 'headings'],
	ressources: { 'rgaa': ['9.1.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence des titres de contenus.",
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	explanations: {
		'cantTell': "Vérifiez que les titres de contenus en présence sont pertinents."
	},
	tags: ['a11y', 'headings'],
	ressources: { 'rgaa': ['9.1.4'] }
});

// Images.
createTanaguruTest({
	lang: 'fr',
	name: 'Images sans attribut alt.',
	query: 'img:not([role]):not([alt]), img[role="img"]:not([alt])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments img sans attribut alt.",
		'failed': "Des éléments img sans attribut alt sont présents dans la page."
	},
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.1.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Images avec attribut alt.',
	query: 'img[alt]:not([role]), img[alt][role="img"]',
	filter: function (item) {
		return !item.matches('a[href]:not([role]) img, [role="link"] img, button:not([role]) img, [role="button"] img');
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1', '1.3.1'] }
});

// Liens.
createTanaguruTest({
	lang: 'fr',
	name: 'Liens sans attribut title.',
	query: 'a[href]:not([role]):not([title])',
	tags: ['links']
});

createTanaguruTest({
	lang: 'fr',
	name: 'Liens avec attribut title renseigné.',
	query: 'a[href][title]:not([role])',
	filter: function (item) {
		return item.getAttribute('title').trim().length > 0;
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'links'],
	ressources: { 'rgaa': ['6.2.1', '6.2.2', '6.2.3'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Liens avec attribut title vide.',
	query: 'a[href][title]:not([role])',
	filter: function (item) {
		return item.getAttribute('title').trim().length == 0;
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments a avec attribut title vide.",
		'failed': "Des éléments a avec attribut title vide sont présents dans la page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'links'],
	ressources: { 'rgaa': ['6.2.1', '6.2.2', '6.2.3'] }
});

// Liens images.
createTanaguruTest({
	lang: 'fr',
	name: 'Liens images sans intitulé.',
	query: 'a[href]:not([role]) > img[alt=""]:not([role]):only-child, a[href]:not([role]) > img[role="img"][alt=""]:only-child, a[href]:not([role]) > img[role="presentation"][alt]:only-child, [role="link"] > img[alt=""]:not([role]):only-child, [role="link"] > img[role="img"][alt=""]:only-child, [role="link"] > img[role="presentation"][alt]:only-child',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas de liens images sans intitulé.",
		'failed': "Des liens images sans intitulé sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'links'],
	ressources: { 'rgaa': ['6.5.1'] }
});

// Boutons.
createTanaguruTest({
	lang: 'fr',
	name: 'Boutons.',
	query: 'button:not([role]), input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	tags: ['buttons']
});

// Chargement des résultats.
loadTanaguruTests();