/**
 * SOMMAIRE
 *
 * ACCESSIBILITE
 * 01 - Cadres
 * 02 - Titres de contenus 
 * 03 - Images
 * 04 - Liens
 * 05 - Liens images
 * 06 - Boutons
 * 07 - Boutons images
 * 08 - Formulaires
 * 09 - Scripts
 * 10 - Eléments obligatoires
 * -------- Eléments obsolètes
 * -------- Titre de la page
 * -------- Gestion des langues
 * -------- Sens de lecture
 * 11 - Structuration de l'information
 * 12 - Présentation de l'information
 * 13 - Consultation
 * 14 - Aria
 * 
 * SEO
 * 
 * OPQUAST
*/

var tanaguruTestsList = [];

/*************************************************
 ***** Accessibilité *****************************
 *************************************************/

// ------------------------------------------------
// --- 01 - CADRES -------------------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'FramesTest1',
	query: 'iframe:not([role]):not([title])',
	expectedNbElements: 0,
	tags: ['a11y', 'frames', 'q5y'],
	ressources: { 'rgaa3': ['2.1.1'], 'rgaa4': ['2.1.1'], 'pidila': ['Pi-357'], 'opquast': ['145'] }
});

tanaguruTestsList.push({
	id: 'FramesTest2',
	query: 'frame:not([role]):not([title])',
	expectedNbElements: 0,
	tags: ['a11y', 'frames', 'q5y'],
	ressources: { 'rgaa4': ['2.1.1'] }
});

tanaguruTestsList.push({
	id: 'FramesTest3',
	query: 'frame:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title == "") {
			return false;
		}
		if (title == src) {
			return false;
		}
		return true;
	},
	mark: { attrs: ['title'] },
	tags: ['a11y', 'frames', 'q5y'],
	ressources: { 'rgaa4': ['2.2.1'] }
});

tanaguruTestsList.push({
	id: 'FramesTest4',
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title == "") {
			return false;
		}
		if (title == src) {
			return false;
		}
		return true;
	},
	mark: { attrs: ['title'] },
	tags: ['a11y', 'frames', 'q5y'],
	ressources: { 'rgaa3': ['2.2.1'],'rgaa4': ['2.2.1'], 'pidila': ['Pi-357'], 'opquast': ['145'] }
});

tanaguruTestsList.push({
	id: "FramesTest5",
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title == "") {
			return true;
		}
		if (title == src) {
			return true;
		}
	},
	expectedNbElements: 0,
	mark: { attrs: ['title'] },
	tags: ['a11y', 'frames', 'q5y'],
	ressources: { 'rgaa3': ['2.2.1'], 'rgaa4': ['2.2.1'], 'pidila': ['Pi-357'], 'opquast': ['145']}
});

tanaguruTestsList.push({
	id: "FramesTest6",
	query: 'iframe:not([role])[title]',
	filter: function (item) {
		var title = item.getAttribute('title');
		var src = item.getAttribute('src');
		if (title == "") {
			return true;
		}
		if (title == src) {
			return true;
		}
	},
	expectedNbElements: 0,
	mark: { attrs: ['title'] },
	tags: ['a11y', 'frames', 'q5y'],
	ressources: { 'rgaa4': ['2.2.1'] }
});

tanaguruTestsList.push({
	id: "FramesTest7",
	query: 'iframe:not([role]), frame:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'frames', 'aria'],
	ressources: { 'rgaa4': ['2.2.1'] }
});

tanaguruTestsList.push({
	id: "FramesTest8",
	query: 'iframe:not([role]), frame:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	tags: ['a11y', 'frames', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

// ------------------------------------------------
// --- 02 - TITRES DE CONTENUS -------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: "HeadingsTest1",
	query: 'h1:not([role]):not([aria-level]), h1[role="heading"]:not([aria-level]), [role="heading"][aria-level="1"]',
	expectedNbElements: { min: 1 },
	tags: ['a11y', 'headings', 'SEO'],
	ressources: { 'rgaa3': ['9.1.1'], 'pidila': ['Pi-362'], 'opquast': ['13'] }
});

tanaguruTestsList.push({
	id: "HeadingsTest2",
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	expectedNbElements: { min: 1 },
	tags: ['a11y', 'headings'],
	ressources: { 'rgaa4': ['9.1.1'], 'wcag': ['1.3.1'] }
});

/* Test utilisant le traitement par collection */
tanaguruTestsList.push({
	id: 'HeadingsTest3',
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	analyzeElements: function (elements) {
		for (var e = 0; e < elements.length; e++) {
			if (e + 1 < elements.length) {
				var currentlevel = parseInt(elements[e].hasAttribute('aria-level') ? elements[e].getAttribute('aria-level') : elements[e].tagName.substring(1));
				var nextelement = elements[e + 1];
				var nextlevel = parseInt(nextelement.hasAttribute('aria-level') ? nextelement.getAttribute('aria-level') : nextelement.tagName.substring(1));
				if (nextlevel - currentlevel > 1) {
					elements[e + 1].status = 'failed';
				}
			}
			if (elements[e].status == 'cantTell') {
				elements[e].status = 'passed';
			}
		}
	},
	tags: ['a11y', 'headings'],
	ressources: { 'rgaa4': ['9.1.1'], 'wcag': ['1.3.1'] }
});

tanaguruTestsList.push({
	id: 'HeadingsTest4',
	query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
	tags: ['a11y', 'headings', 'SEO'],
	ressources: { 'rgaa3': ['9.1.4'], 'rgaa3': ['9.1.2'], 'pidila': ['Pi-362'], 'opquast': ['13'], 'wcag': ['1.3.1'] }
});

// ------------------------------------------------
// --- 03 - IMAGES -------------------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'ImagesTest1',
	query: 'area[href]:not([role]):not([alt])',
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'q5y'],
	ressources: { 'rgaa3': ['1.1.2'], 'pidila': ['Pi-309'], 'opquast': ['1'] }
});

// TODO - test RGAA 1.2.3
// 
// tanaguruTestsList.push({
// 	lang: 'fr',
// 	name: 'Images (balise area) sans attribut alt.',
// 	query: 'area[href]:not([role]):not([alt])',
// 	expectedNbElements: 0,
// 	explanations: {
// 		'passed': "Cette page ne contient pas d'éléments area sans attribut alt.",
// 		'failed': "Des éléments area sans attribut alt sont présents dans la page."
// 	},
// 	tags: ['a11y', 'images'],
// 	ressources: { 'rgaa3': ['1.2.3'] }
// });

tanaguruTestsList.push({
	id: 'ImagesTest2',
	query: 'img:not([role]):not([href])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest3',
	query: '[role="img"]',
	filter: function (item) {
		return item.accessibleName == null; //to complete
	},
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest4',
	query: 'img:not([role]):not([href]) ,[role="img"]',
	filter: function (item) {
		return item.accessibleName == null;
	},
	tags: ['a11y', 'images', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest5',
	query: 'area:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest6',
	query: 'area:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest7',
	query: 'area[alt=""][title]:not([role]) ,area[alt=""][aria-label]:not([role]), area[alt=""][aria-labelledby]:not([role]), area[alt=""][aria-describedby]:not([role])',
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'q5y'],
	ressources: { 'rgaa3': ['1.2.2'], 'pidila': ['Pi-309'], 'opquast': ['1'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest8',
	query: 'area[alt]:not([role]):not([href])',
	filter: function (item) {
		return item.getAttribute('alt') != ""
	},
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'q5y'],
	ressources: { 'rgaa3': ['1.2.2'], 'pidila': ['Pi-309'], 'opquast': ['1'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest9',
	query: 'area[href][alt=""]:not([role])',
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'q5y'],
	ressources: { 'rgaa3': ['1.3.2'], 'pidila': ['Pi-304', 'Pi-305'], 'opquast': ['2', '3'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest10',
	query: 'area[alt][href]:not([alt=""]):not([role])',
	filter: function (item) {
		var alt = item.getAttribute('alt');
		if (item.hasAttribute('title')) {
			return  alt != item.getAttribute('title');
		}
		if (item.hasAttribute('aria-label')) {
			return alt != item.getAttribute('aria-label');
		}
		if (item.hasAttribute('aria-labelledby')) {
			var AttrLabelledby = item.getAttribute('aria-labelledby');
			if (document.querySelector('*[id="'+AttrLabelledby+'"]') != null){
				return document.querySelector('*[id="'+AttrLabelledby+'"]').textContent != alt;
			};
		};
	},
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'q5y'],
	ressources: { 'rgaa3': ['1.3.2'], 'pidila': ['Pi-304', 'Pi-305'], 'opquast': ['2', '3'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest11',
	query: 'img:not([role]):not([alt]), img[role="img"]:not([alt])',
	expectedNbElements: 0,
	tags: ['a11y', 'images', 'SEO', 'q5y'],
	ressources: { 'rgaa3': ['1.1.1'], 'pidila': ['Pi-302'], 'opquast': ['1', '2', '3'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest12',
	query: 'img[alt=""][title]:not([role]), img[alt=""][title][role="img"] ,img[alt=""][aria-label]:not([role]), img[alt=""][aria-label][role="img"], img[alt=""][aria-labelledby]:not([role]), img[alt=""][aria-labelledby][role="img"], img[alt=""][aria-describedby]:not([role]), img[alt=""][aria-describedby][role="img"]',
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'q5y'],
	ressources: { 'rgaa3': ['1.2.1'], 'pidila': ['Pi-309', 'Pi-356'], 'opquast': ['2', '3'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest13',
	query: 'img[alt=""]:not([title]):not([role]), img[alt=""]:not([title])[role="img"] ,img[alt=""]:not([aria-label]):not([role]), img[alt=""]:not([aria-label])[role="img"], img[alt=""]:not([aria-labelledby]):not([role]), img[alt=""]:not([aria-labelledby])[role="img"], img[alt=""]:not([aria-describedby]):not([role]), img[alt=""]:not([aria-describedby])[role="img"]',
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images'],
	ressources: { 'rgaa3': ['1.2.1'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest14',
	query: 'img[alt]:not([role]):not([alt=""]), img[alt][role="img"]:not([alt=""])',
	filter: function (item) {
		return !item.matches('a[href]:not([role]) img, [role="link"] img, button:not([role]) img, [role="button"] img');
	},
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images'],
	ressources: { 'rgaa3': ['1.2.1', '1.3.1'] }
});

tanaguruTestsList.push({
	id: 'ImagesTest15',
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
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images'],
	ressources: { 'rgaa3': ['1.3.1'] }
});

// ------------------------------------------------
// --- 04 - LIENS --------------------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'LinksTest1',
	query: 'a[href]:not([role]):not([title])',
	tags: ['links']
});

tanaguruTestsList.push({
	id: 'LinksTest2',
	query: 'a[href][title]:not([role])',
	filter: function (item) {
		return item.getAttribute('title').trim().length > 0;
	},
	mark: { attrs: ['title'] },
	tags: ['a11y', 'links'],
	ressources: { 'rgaa3': ['6.2.1', '6.2.2', '6.2.3'] }
});

tanaguruTestsList.push({
	id: 'LinksTest3',
	query: 'a[href][title]:not([role])',
	filter: function (item) {
		return item.getAttribute('title').trim().length == 0;
	},
	expectedNbElements: 0,
	mark: { attrs: ['title'] },
	tags: ['a11y', 'links'],
	ressources: { 'rgaa3': ['6.2.1', '6.2.2', '6.2.3'] }
});

// ------------------------------------------------
// --- 05 - LIENS IMAGES  -------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'LinksTest4',
	query: 'a[href]:not([role]) > img[alt=""]:not([role]):only-child, a[href]:not([role]) > img[role="img"][alt=""]:only-child, a[href]:not([role]) > img[role="presentation"][alt]:only-child, [role="link"] > img[alt=""]:not([role]):only-child, [role="link"] > img[role="img"][alt=""]:only-child, [role="link"] > img[role="presentation"][alt]:only-child',
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'links'],
	ressources: { 'rgaa3': ['6.5.1'] }
});

// ------------------------------------------------
// --- 06 - BOUTONS ------------------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'ButtonsTest1',
	query: 'button:not([role]), input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	tags: ['buttons']
});

// ------------------------------------------------
// --- 07 - BOUTONS IMAGES  ----------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'ButtonsTest2',
	query: 'input[alt][type=image]:not([role])',
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa3': ['1.3.3'] }
});

tanaguruTestsList.push({
	id: 'ButtonsTest3',
	query: 'input[type=image]:not([role]):not([alt])',
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa3': ['1.1.3'] }
});

tanaguruTestsList.push({
	id: 'ButtonsTest4',
	query: 'input[alt][type=image]:not([role]):not([title]):not([aria-label]):not([aria-labelledby])',
	filter: function (item) {
		return item.getAttribute('alt').trim().length == 0;
	},
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa3': ['1.3.3'] }
});

tanaguruTestsList.push({
	id: 'ButtonsTest5',
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
			var AttrLabelledby = item.getAttribute('aria-labelledby');
			if (document.querySelector('*[id="'+AttrLabelledby+'"]') != null){
				return document.querySelector('*[id="'+AttrLabelledby+'"]').textContent != alt;
			};
		};
	},
	expectedNbElements: 0,
	mark: { attrs: ['alt'] },
	tags: ['a11y', 'images', 'buttons'],
	ressources: { 'rgaa3': ['1.3.3'] }
});

// ------------------------------------------------
// --- 08 - FORMULAIRES --------------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'FormsTest1',
	query: 'input:not([type="image"]):not([type="button"]):not([type="hidden"]):not([type="submit"]):not([type="reset"]):not([role]), select:not([role]), textarea:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'forms', 'labels'],
	ressources: { 'rgaa3': ['11.1.1'] }
});

tanaguruTestsList.push({
	id: 'FormsTest2',
	query: '*[role="checkbox"], *[role="radio"], *[role="textbox"], *[role="combobox"]',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	mark: { attrs: ['id'] },
	tags: ['a11y', 'forms', 'labels', 'aria'],
	ressources: { 'rgaa3': ['7.1.1'] }
});

tanaguruTestsList.push({
	id: 'FormsTest3',
	query: 'input:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'forms', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: 'FormsTest4',
	query: 'input:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	tags: ['a11y', 'forms', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: "FormsTest5",
	query: 'select:not([role])',
	filter: function (item) {
		return item.accessibleName == null;	
	},
	expectedNbElements: 0,
	tags: ['a11y', 'forms', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

tanaguruTestsList.push({
	id: "FormsTest6",
	query: 'select:not([role])',
	filter: function (item) {
		return item.accessibleName == null;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'forms', 'aria'],
	ressources: { 'wcag': ['4.1.2'] }
});

// ------------------------------------------------
// --- 09 - SCRIPTS ------------------------------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'ScriptsTest1',
	query: '*[role="checkbox"], *[role="radio"], *[role="textbox"], *[role="combobox"], *[role="contenteditable"]',
	filter: function (item) {
		if (item.hasAttribute('tabindex') || !(item.canBeReachedUsingKeyboardWith == '')){
			return false;
			}
		else return true;
	},
	expectedNbElements: 0,
	mark: { attrs: ['role'] },
	tags: ['a11y', 'forms', 'labels','aria'],
	ressources: { 'rgaa3': ['7.3.1'] }
});

// ------------------------------------------------
// --- 10 - ELEMENTS OBLIGATOIRES  ---------------------
// ------------------------------------------------


// Eléments obsolètes

tanaguruTestsList.push({
	id: 'MandatoryElementsTest1',
	query: 'acronym, bgsound, dir, frame, frameset, noframes, hgroup, isindex, listing, nextid, noembed, plaintext, strike, xmp, basefont, big, blink, center, font, marquee, menu, menuitem, multicol, nobr, spacer, tt',
	expectedNbElements: 0,
	tags: ['a11y', 'Deprecated'],
	ressources: { 'rgaa3': ['8.2.2'] }
});

tanaguruTestsList.push({
	id: 'MandatoryElementsTest2',
	query: 'a[charset], link[charset], a[coords], a[shape], a[methods], a[name], embed[name], img[name], option[name], a[urn], link[urn], form[accept], area[hreflang], head[profile], html[version], input[ismap], input[usemap], iframe[longdesc], img[longdesc], link[target], meta[scheme], object[archive], object[classid], object[code], object[codebase], object[codetype], object[declare], object[standby], param[type], param[valuetype], script[language], script[event], script[for], table[datapagesize], table[summary], td[abbr], td[axis], th[axis], td[scope], a[datasrc], applet[datasrc],button[datasrc],div[datasrc], frame[datasrc], iframe[datasrc], img[datasrc], input[datasrc], label[datasrc], legend[datasrc], marquee[datasrc], object[datasrc], option[datasrc], select[datasrc], table[datasrc], textarea[datasrc], a[datafld], applet[datafld], button[datafld], div[datafld], fieldset[datafld], frame[datafld], iframe[datafld], img[datafld], input[datafld], label[datafld], legend[datafld], marquee[datafld], object[datafld], param[datafld], select[datafld], text[datafld], button[dataformatas], div[dataformatas], input[dataformatas], label[dataformatas], legend[dataformatas], marquee[dataformatas], object[dataformatas], option[dataformatas], select[dataformatas], a[dataformatas], table[dataformatas], body[alink], body[bgcolor], body[bottommargin], body[leftmargin], body[link], body[marginheight], body[marginwidth], body[rightmargin], body[text], body[topmargin], body[vlink], br[clear], caption[align], col[align], col[widht], div[align], dl[compact], embed[align], embed[hspace], embed[vspace], frame[bodercolor], hr[align], hr[color], hr[noshade], hr[size], hr[width], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], iframe[align], iframe[allowtransparency], iframe[frameborder], iframe[framespacing], iframe[hspace], iframe[marginheight], iframe[marginwidth], iframe[scrolling], iframe[vspace], input[align], input[border], input[hspace], input[vspace], img[align], img[border], img[hspace], img[vspace], legend[align], li[type], menu[compact], marquee[bgcolor], marquee[height], marquee[hspace], marquee[vspace], marquee[width], object[align], object[border], object[hspace], object[vspace], ol[compact], p[align], pre[width], table[align], table[bgcolor], table[border], table[bordercolor], table[cellpadding], table[callspacing], table[frame], table[height], table[rules], table[width], tbody[align], thead[align], tfoot[align], tbody[char], thead[char], tfoot[char], tbody[charoff], thead[charoff], tfoot[charoff], tbody[valign], thead[valign], tfoot[valign], td[align], th[align], td[bgcolor], th[bgcolor], td[char], th[char], td[charoff], th[charoff], td[height], th[height], td[nowrap], th[nowrap], td[valign], th[valign], td[with], th[width], tr[align], tr[bgcolor], tr[char], tr[charoff], tr[height], tr[valign], ul[compact], ul[type], body[background], table[background], thead[background],tbody[background], tfoot[background],tr[background], td[background], th[background]',
	expectedNbElements: 0,
	tags: ['a11y', 'Deprecated'],
	ressources: { 'rgaa3': ['8.1.2'] }
});

// Titre de la page

tanaguruTestsList.push({
	id: 'MandatoryElementsTest3',
	query: 'head>title',
	expectedNbElements: 1,
	tags: ['a11y', 'Mandatory', 'SEO'],
	ressources: { 'rgaa3': ['8.5.1'], 'pidila': ['Pi-412'], 'opquast': ['32', '33'] }
});

tanaguruTestsList.push({
	id: 'MandatoryElementsTest4',
	query: 'head>title',
	filter: function (item) {
		var tagTitle =  item != null;
		if (tagTitle) {
			return item.textContent == "";
		}
	},
	expectedNbElements: 0,
	mark: { attrs: ['title'] },
	tags: ['a11y', 'Mandatory'],
	ressources: { 'rgaa3': ['8.6.1'], 'pidila': ['Pi-412'] , 'opquast': ['32', '33'] }
});

// Gestion des langues

tanaguruTestsList.push({
	id: 'MandatoryElementsTest5',
	query: 'html[lang]',
	expectedNbElements: 1,
	mark: { attrs: ['lang'] },
	tags: ['a11y', 'Mandatory', 'SEO'],
	ressources: { 'rgaa3': ['8.3.1'], 'pidila': ['Pi-361'], 'opquast': ['132'] }
});

tanaguruTestsList.push({
	id: 'MandatoryElementsTest6',
	query: 'html[lang=""]',
	expectedNbElements: 0,
	mark: { attrs: ['lang'] },
	tags: ['a11y', 'Mandatory', 'SEO'],
	ressources: { 'rgaa3': ['8.4.1'], 'pidila': ['Pi-361'], 'opquast': ['132'] }
});

tanaguruTestsList.push({
	id: 'MandatoryElementsTest7',
	query: 'input[type="hidden"][id]',
	filter: function(item) {
		var AttrId = item.getAttribute('id');
		if (document.querySelector('label[for="'+AttrId+'"]') == null){
			return false;
		};
		return true;
	},
	expectedNbElements: 0,
	mark: { attrs: ['for'] },
	tags: ['a11y', 'Mandatory'],
	ressources: { 'rgaa3': ['8.2.1'] }
});

tanaguruTestsList.push({
	id: 'MandatoryElementsTest8',
	query: '*[aria-labelledby]',
	filter: function(item) {
		var AttrLabelledby = item.getAttribute('aria-labelledby');
		return document.querySelector('*[id="'+AttrLabelledby+'"]') == null;
	},
	expectedNbElements: 0,
	mark: { attrs: ['for'] },
	tags: ['a11y', 'Mandatory'],
	ressources: { 'rgaa3': ['8.2.1'] }
});

// Sens de lecture

tanaguruTestsList.push({
	id: 'MandatoryElementsTest9',
	query: '[dir="ltr"], [dir="rtl"]',
	tags: ['a11y', 'Mandatory'],
	ressources: { 'rgaa3': ['8.10.2'] }
});

tanaguruTestsList.push({
	id: 'MandatoryElementsTest10',
	query: '*[dir]',
	filter: function(item){
		var dirAttr = item.getAttribute('dir').toLowerCase();
		if (dirAttr !== 'ltr' && dirAttr !== 'rtl') {
			return true;
		}
		return false;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'Mandatory'],
	ressources: { 'rgaa3': ['8.10.2'] }
});

// ------------------------------------------------
// --- 11 - STRUCTURATION DE L'INFORMATION  ------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'StructureTest1',
	query: 'header, nav, footer, main',
	tags: ['a11y', 'Structure'],
	ressources: { 'rgaa3': ['9.2.1'] }
});

tanaguruTestsList.push({
	id: 'StructureTest2',
	query: 'main, [role="main"]:not(main)',
	expectedNbElements : { max: 1 },
	tags: ['a11y', 'Structure'],
	ressources: { 'rgaa3': ['9.2.1', '12.10.1'] }
});

tanaguruTestsList.push({
	id: 'StructureTest3',
	query: 'q, blockquote',
	tags: ['a11y', 'Structure'],
	ressources: { 'rgaa3': ['9.6.1', '9.6.2'] }
});

// ------------------------------------------------
// --- 12 - PRESENTATION DE L'INFORMATION  -------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'PresentationTest1',
	query: 'basefont, blink, center, font, marquee, s, strike, tt, u, bing, small',
	expectedNbElements: 0,
	tags: ['a11y', 'Presentation'],
	ressources: { 'rgaa3': ['10.1.1'] }
});

tanaguruTestsList.push({
	id: 'PresentationTest2',
	query: '[align], [alink], [background], [bgcolor], [border], [cellpading], [cellspacing], [char], [charoff], [clear], [compact], [color], [frameborder],[hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size], [width], [height]',
	filter: function(item){
		var nodeName = item.nodeName;
		var widthAttr = item.attributes.width;
		var heightAttr = item.attributes.height;
		var colorAttr = item.attributes.color;
		/** Si l'élément possède les attributs width et/ou height, et s'il s'agit 
		 * d'un élément img, svg, canvas, embed ou object : exclure l'élément de l'échantillon.
		 * Sinon, on le laisse. Ainsi un élément img[width] ne sera pas ajouté.
		 */
		if (colorAttr !== undefined) {
			if (nodeName == "LINK") {
				return false;
			}
			return true;
		}
		if (widthAttr !== undefined || heightAttr !== undefined) {
			if (nodeName == 'IMG' || nodeName == 'SVG' || nodeName == 'CANVAS' || nodeName == 'EMBED' || nodeName == 'OBJECT') {
				return false;
			}
			return true;
		}
		return true;
	},
	expectedNbElements: 0,
	tags: ['a11y', 'Presentation'],
	ressources: { 'rgaa3': ['10.1.2'] }
});

tanaguruTestsList.push({
	id: 'PresentationTest3',
	query: 'a[href]',
	filter: function(item){
		return item.style.outline == "none";
	},
	expectedNbElements: 0,
	tags: ['a11y', 'Presentation'],
	ressources: { 'pidila': ['Pi-328'], 'opquast': ['155'], 'rgaa3': ['10.7.1'] } 
});

tanaguruTestsList.push({
	id: 'PresentationTest4',
	query: 'a[href]',
	filter: function(item){
		return item.style.outlineStyle == "none";
	},
	expectedNbElements: 0,
	tags: ['a11y', 'Presentation', 'q5y'],
	ressources: { 'pidila': ['Pi-328'], 'opquast': ['155'], 'rgaa3': ['10.7.1'] } 
});

tanaguruTestsList.push({
	id: 'PresentationTest5',
	query: 'a[href]',
	filter: function(item){
		return item.style.outlineWidth == "0";
	},
	expectedNbElements: 0,
	tags: ['a11y', 'Presentation'],
	ressources: { 'pidila': ['Pi-328'], 'opquast': ['155'], 'rgaa3': ['10.7.1'] } 
});

// ------------------------------------------------
// ---- 13 - Consultation  -----------------
// ------------------------------------------------

tanaguruTestsList.push({
	id: 'ConsultationTest1',
	query: 'head > meta[http-equiv]',
	filter: function(item){
		return item.style.outlineWidth == "0";
	},
	expectedNbElements: 0,
	tags: ['a11y', 'Presentation'],
	ressources: { 'pidila': ['Pi-328'], 'opquast': ['155'], 'rgaa3': ['10.7.1'] } 
});

/*************************************************
 ***** SEO ***************************************
 *************************************************/

tanaguruTestsList.push({
	id: 'SEOTest1',
	query: 'head > meta[name="description"]',
	expectedNbElements: 1,
	tags: ['SEO']
});

tanaguruTestsList.push({
	id: 'SEOTest2',
	query: 'head > meta[name="description"]',
	expectedNbElements: 0,
	filter: function(item){
		if (item.hasAttribute('content') && item.getAttribute('content').length > 250){
			return true;
		}
		return false;
	},
	tags: ['SEO']
});

tanaguruTestsList.push({
	id: 'SEOTest3',
	query: 'head > style, [style]',
	expectedNbElements: 0,
	filter: function(item){
		var styleAttr = item.getAttribute('style');

		if (item.nodeName == 'STYLE' && item.textContent) {
			return true;
		} else if (styleAttr && styleAttr !== "") {
			return true;
		}

		return false;
	},
	mark: { attrs: ['style'] },
	tags: ['SEO'],
	ressources: { 'pidila': ['Pi-412'], 'opquast': ['146'] }
});

tanaguruTestsList.push({
	id: 'SEOTest4',
	query: 'head > title',
	expectedNbElements: 0,
	filter: function(item){
		// 80 caractères est un compromis compte tenu du nombre de caractères
		// affichés par les résultats Google sur desktop et sur mobile.
		if (item.textContent.length > 80){
			return true;
		}
		return false;
	},
	tags: ['q5y', 'SEO'],
	ressources: { 'pidila': ['Pi-412'], 'opquast': ['146'] }
});

/*************************************************
 ***** Opquast ***********************************
 *************************************************/

tanaguruTestsList.push({
	id: 'OpquastTest1',
	query: 'frameset, frame, noframes',
	expectedNbElements: 0,
	mark: { attrs: ['title'] },
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-368'], 'opquast': ['146'] }
});

tanaguruTestsList.push({
	id: 'OpquastTest2',
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		return item.content.toLowerCase().includes('minimum-scale') 
	},
	expectedNbElements: 0,
	mark: { attrs: ['content'] },
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-344'], 'opquast': ['139'] }
});

tanaguruTestsList.push({
	id: 'OpquastTest3',
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		return item.content.toLowerCase().includes('maximum-scale') 
	},
	expectedNbElements: 0,
	mark: { attrs: ['content'] },
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-344'], 'opquast': ['139'] }
});

tanaguruTestsList.push({
	id: 'OpquastTest4',
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		return item.content.toLowerCase().includes('user-scalable') 
	},
	expectedNbElements: 0,
	mark: { attrs: ['content'] },
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-344'], 'opquast': ['139'] }
});

/*************************************************
 ***** Pidila ************************************
 *************************************************/

tanaguruTestsList.push({
	id: 'PidilaTest1',
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('mentions légales');
	},
	expectedNbElements: 1,
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-008', 'Pi-032'], 'opquast': ['26'] }
});

tanaguruTestsList.push({
	id: 'PidilaTest2',
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('accessibilité');
	},
	expectedNbElements: 1,
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-010', 'Pi-032'], 'opquast': ['26'] } 
});

tanaguruTestsList.push({
	id: 'PidilaTest3',
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('contact');
	},
	expectedNbElements: 1,
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-032'], 'opquast': ['26'] } 
});

tanaguruTestsList.push({
	id: 'PidilaTest4',
	query: 'footer a',
	filter: function (item) {
		return item.textContent.toLowerCase().includes('plan du site');
	},
	expectedNbElements: 1,
	tags: ['q5y'],
	ressources: { 'pidila': ['Pi-032'], 'opquast': ['26'] } 
});

tanaguruTestsList.push({
	id: 'PidilaTest5',
	query: 'footer a[href="https://www.legifrance.gouv.fr/"], footer a[href="http://www.legifrance.gouv.fr/"], footer a[href="www.legifrance.gouv.fr/"], footer a[href="legifrance.gouv.fr/"]',
	expectedNbElements: 1,
	tags: ['CIE'],
	ressources: { 'pidila': ['Pi-147'] } 
});

tanaguruTestsList.push({
	id: 'PidilaTest6',
	query: 'footer a[href="https://www.service-public.fr/"], footer a[href="http://www.service-public.fr/"], footer a[href="www.service-public.fr/"], footer a[href="service-public.fr/"]',
	expectedNbElements: 1,
	tags: ['CIE'],
	ressources: { 'pidila': ['Pi-147'] } 
});

tanaguruTestsList.push({
	id: 'PidilaTest7',
	query: 'footer a[href="https://www.gouvernement.fr/"], footer a[href="http://www.gouvernement.fr/"], footer a[href="www.gouvernement.fr/"], footer a[href="gouvernement.fr/"]',
	expectedNbElements: 1,
	tags: ['CIE'],
	ressources: { 'pidila': ['Pi-147'] } 
});

tanaguruTestsList.push({
	id: 'PidilaTest8',
	query: 'footer a[href="https://www.france.fr/fr"], footer a[href="http://www.france.fr/fr"], footer a[href="www.france.fr/fr"], footer a[href="france.fr/fr"]',
	expectedNbElements: 1,
	tags: ['CIE'],
	ressources: { 'pidila': ['Pi-147'] } 
});

/* ACT */

tanaguruTestsList.push({
	lang: 'en',
	name: 'Button has accessible name.',
	query: 'button:not([role]), [role="button"], input[type="reset"], input[type="submit"]',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0 && !item.matches('input[type="reset"]:not([aria-labelledby]):not([aria-label]):not([value]):not([title]), input[type="reset"]:not([aria-labelledby]):not([aria-label]):not([value]):not([title])')) {
			var an = item.accessibleName;
			if (an.length > 0) {
				an = an.split(':');
				return an[1] == '';
			}
			return an == '';
		}
	},
	tags: ['buttons'],
	ressources: { 'act': ['97a4e1'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Link has accessible name.',
	query: 'a:not([role])',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0 ) {
			var an = item.accessibleName;
			if (an.length > 0) {
				an = an.split(':');
				return an[1] == '';
			}
			return an == '';
		}
	},
	tags: ['Links'],
	ressources: { 'act': ['c487ae'] }
});

tanaguruTestsList.push({
	lang: 'en',
	name: 'Image has accessible name.',
	query: 'img:not([role]), [role="img"]',
	expectedNbElements: 0,
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0 ) {
			var an = item.accessibleName;
			console.log(an);
			if (an.length > 0) {
				an = an.split(':');
				return an[1] == '';
			}
			return an == '';
		}
	},
	tags: ['Image'],
	ressources: { 'act': ['23a2a8'] }
});