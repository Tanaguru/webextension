// cadres
createTanaguruTest({
	lang: 'fr',
	name: "Présence d'un titre pour chaque cadre",
	query: 'iframe:not([role]):not([title])',
	expectedNbElements: 0,
	explanations: { 
		'passed': "tous les cadres de cette page ont un titre.", 
		'failed': "Des éléments iframe sans attribut title sont présents dans cette page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'frames'],
	ressources: { 'rgaa': ['2.1.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Pertinence du titre pour chaque cadre",
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title=="") {
			return  false;
		}
		if (title==src) {
			return false;
		}
		return true;
	},
	explanations: { 
		'cantTell': "Vérifiez que les titres des cadres en présence sont pertinents."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'frames'],
	ressources: { 'rgaa': ['2.1.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Non pertinence du titre pour chaque cadre",
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title=="") {
			return  true;
		}
		if (title==src) {
			return true;
		}
	},
	expectedNbElements: 0,
	explanations: {  
		'failed': "Des éléments iframe avec attribut title non pertinent sont présents dans cette page."
	},
	mark: '(title=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'frames'],
	ressources: { 'rgaa': ['2.2.1'] }
});

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
	name: 'Images (balise img) sans attribut alt.',
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
	name: 'Images svg sans attribut alt.',
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
	name: 'Images (balise img) avec attribut alt.',
	query: 'img[alt]:not([role]), img[alt][role="img"]',
	filter: function (item) {
		return !item.matches('a[href]:not([role]) img, [role="link"] img, button:not([role]) img, [role="button"] img');
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1', '1.3.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images avec une alternative vide et un attribut tite, aria-label, aria-describedby ou aria-labelledby.",
	query: 'img[alt=""][title]:not([role]), img[alt=""][title][role="img"] ,img[alt=""][aria-label]:not([role]), img[alt=""][aria-label][role="img"], img[alt=""][aria-labelledby]:not([role]), img[alt=""][aria-labelledby][role="img"], img[alt=""][aria-describedby]:not([role]), img[alt=""][aria-describedby][role="img"]',
	expectedNbElements: 0,
	explanations: {
		'failed': "Des éléments img avec un attribut alt vide et un attribut tite, aria-label, aria-describedby ou aria-labelledby sont présents dans la page"
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images avec une alternative vide.",
	query: 'img[alt=""]:not([title]):not([role]), img[alt=""]:not([title])[role="img"] ,img[alt=""]:not([aria-label]):not([role]), img[alt=""]:not([aria-label])[role="img"], img[alt=""]:not([aria-labelledby]):not([role]), img[alt=""]:not([aria-labelledby])[role="img"], img[alt=""]:not([aria-describedby]):not([role]), img[alt=""]:not([aria-describedby])[role="img"]',
	explanations: {
		'cantTell': "Vérifier que ces images sont bien des images de décoration",
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.2.1'] }
});

createTanaguruTest({
	lang: 'fr',
	name: "Images avec un attribut title, aria-label ou aria-labelledby différent de l'attribut alt.",
	query: 'img[alt]:not([alt=""]):not([role]), img[alt]:not([alt=""])[role="img"]',
	filter: function (item) {
		var alt = item.getAttribute('alt');
		if (item.hasAttribute('title')) {
			return  alt != item.getAttribute('title');
		}
		if (item.hasAttribute('aria-label')) {
			return alt != item.getAttribute('aria-label');
		}
		if (item.hasAttribute('aria-labelledby')) {
			return  alt != item.getAttribute('aria-labelledby');
		}
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'images dont l'attribut aria-label ou aria-labelledby sont différents de l'attibut alt..",
		'failed': "Des éléments img ont un attribut title, aria-label ou aria-labelledby différents de l'attibut alt."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images'],
	ressources: { 'rgaa': ['1.3.1'] }
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

// Boutons images.
createTanaguruTest({
	lang: 'fr',
	name: 'Boutons images avec attribut alt.',
	query: 'input[alt][type=image]:not([role])',
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa': ['1.3.3'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Boutons Images sans attribut alt.',
	query: 'input[type=image]:not([role]):not([alt])',
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments input type='image' sans attribut alt.",
		'failed': "Des éléments input type='image' sans attribut alt sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa': ['1.1.3'] }
});

createTanaguruTest({
	lang: 'fr',
	name: 'Boutons Images avec un attribut alt vide.',
	query: 'input[alt][type=image]:not([role]):not([title]):not([aria-label]):not([aria-labelledby])',
	filter: function (item) {
		return item.getAttribute('alt').trim().length == 0;
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas d'éléments input type='image' sans attribut alt.",
		'failed': "Des éléments input type='image' sans attribut alt sont présents dans la page."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa': ['1.3.3'] }
});


createTanaguruTest({
	lang: 'fr',
	name: "Boutons Images avec un attribut title, aria-label ou aria-labelledby différent de l'attribut alt.",
	query: 'input[alt][type=image]:not([alt=""]):not([role])',
	filter: function (item) {
		var alt = item.getAttribute('alt');
		if (item.hasAttribute('title')) {
			return  alt != item.getAttribute('title');
		}
		if (item.hasAttribute('aria-label')) {
			return alt != item.getAttribute('aria-label');
		}
		if (item.hasAttribute('aria-labelledby')) {
			return  alt != item.getAttribute('aria-labelledby');
		}
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas de boutons images dont l'attribut title, aria-label ou aria-labelledby est différent de l'attibut alt.",
		'failed': "Des éléments boutons images ont un attribut title, aria-label ou aria-labelledby sont différents de l'attibut alt."
	},
	mark: '(alt=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa': ['1.3.3'] }
});

// Formulaires
createTanaguruTest({
lang: 'fr',
name: "Absence d'étiquette pour les éléments de formulaire",
query: 'input:not([type=image]):not([type=button]):not([role]), select:not([role]), textarea:not([role])',
filter: function (item) {
	if ((item.hasAttribute('title')) || (item.hasAttribute('aria-labelledby')) || (item.hasAttribute('id')) || (item.hasAttribute('aria-label')))  {
		var AttrId = item.getAttribute('id');
		var selection = document.querySelector('label[for="'+AttrId+'"]') == null;
		if (selection){
				return true;
			}
		return false;
	}
},
expectedNbElements: 0,
explanations: {
	'passed': "Cette page ne contient pas de boutons images dont l'attribut title, aria-label ou aria-labelledby est différent de l'attibut alt.",
	'failed': "Des éléments champs de formulaire n'ont pas d'étiquette."
},
mark: '(id=&quot;(?:(?!&quot;).)*&quot;)',
tags: ['a11y', 'forms', 'labels'],
ressources: { 'rgaa': ['11.1.1'] }
});

/* createTanaguruTest({
	lang: 'fr',
	name: "Absence d'étiquette pour les éléments de formulaire",
	query: 'input:not([type=image]):not([role]), select:not([role]), textarea:not([role])',
	filter: function (item) {
		if (item.hasAttribute('id')) {
			var AttrId = item.getAttribute('id');
			var selection = document.querySelector('label[for="'+AttrId+'"]') == null;
			if (selection){
					return true;
				}
		}
		else if (item.hasAttribute('title')) {
			var AttrTi = item.getAttribute('title');
			if (item.hasAttribute('placeholder')) {
				var AttrPl = item.getAttribute('placeholder');
				if (AttrTi !== AttrPl) {
					return true
				}
				else return false;
			}
		}
		else if (item.hasAttribute('aria-labelledby')) {
			var AttrLa = item.getAttribute('aria-labelledby');
			var selection = document.querySelector('*[id="'+AttrLa+'"]') == null;
			if (selection){
					return true;
				}
		}
		else if (item.hasAttribute('aria-label')) {
			return false;
		}
		else return true;
	},
	expectedNbElements: 0,
	explanations: {
		'passed': "Cette page ne contient pas de boutons images dont l'attribut title, aria-label ou aria-labelledby est différent de l'attibut alt.",
		'failed': "Des éléments champs de formulaire n'ont pas d'étiquette."
	},
	mark: '(id=&quot;(?:(?!&quot;).)*&quot;)',
	tags: ['a11y', 'forms', 'labels'],
	ressources: { 'rgaa': ['11.1.1'] }
	}); */
	

//,*[role="checkbox"],*[role="radio"],*[role="textbox"],*[role="combobox"],*[role="contenteditable"]


// Chargement des résultats.
loadTanaguruTests();