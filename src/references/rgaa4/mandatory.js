/**
 *? ELEMENTS OBLIGATOIRES
 ** tous les tests sont répertoriés
 ** 8.3 si l'élément <html> n'a pas d'attribut lang, vérifier que la langue est renseignée pour chaque noeud texte et attribut dont le contenu est affiché ou lu par les lecteurs d'écran
 ** 8.9.1 voir si l'on peut étoffer
 *TODO 8.2 implémenter spec HTML dans le script content.js
 *
 * data : data-tng-validRole, data-tng-validAria, data-tng-haslang, data-tng-lang, data-tng-emptylang, data-tng-samelangs, data-tng-validlang, data-tng-pageTitle, data-tng-el-notemptylang, data-tng-el-validlang, data-tng-dirValid
 */

//* 8.1 Chaque page web est-elle définie par un type de document ?
// 8.1.1 Pour chaque page web, le type de document (balise doctype) est-il présent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Le type de document (balise doctype) est présent sur la page.',
    node: document.doctype,
    expectedNbElements: 1,
    explanations: {
        'passed': "Cette page possède bien une balise doctype.",
		'failed': "Cette page n'a pas de balise doctype."
    },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.1.1']}
});

// 8.1.2 Pour chaque page web, le type de document (balise doctype) est-il valide ?
// https://www.w3.org/QA/2002/04/valid-dtd-list.html
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Le type de document (balise doctype) est valide.',
    node: document.doctype,
    analyzeElements: function(collection) {
        let collectionLength = collection.length;
        for (var i = 0; i < collectionLength; i++) {
            var item = collection[i];
            var nameList = ['html', 'math', 'svg:svg', 'svg'];
            var htmlList = [
                '-//W3C//DTD HTML 4.01//ENhttp://www.w3.org/TR/html4/strict.dtd',
                '-//W3C//DTD HTML 4.01 Transitional//ENhttp://www.w3.org/TR/html4/loose.dtd',
                '-//W3C//DTD HTML 4.01 Frameset//ENhttp://www.w3.org/TR/html4/frameset.dtd',
                '-//W3C//DTD XHTML 1.0 Strict//ENhttp://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd',
                '-//W3C//DTD XHTML 1.0 Transitional//ENhttp://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd',
                '-//W3C//DTD XHTML 1.0 Frameset//ENhttp://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd',
                '-//W3C//DTD XHTML 1.1//ENhttp://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd',
                '-//W3C//DTD XHTML Basic 1.1//ENhttp://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd',
                '-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//ENhttp://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd',
                '-//IETF//DTD HTML 2.0//EN',
                '-//W3C//DTD HTML 3.2 Final//EN',
                '-//W3C//DTD XHTML Basic 1.0//ENhttp://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd'
            ];
            var mathList = [
                '-//W3C//DTD MathML 2.0//ENhttp://www.w3.org/Math/DTD/mathml2/mathml2.dtd',
                'http://www.w3.org/Math/DTD/mathml1/mathml.dtd'
            ];
            var svgList = [
                '-//W3C//DTD SVG 1.1//ENhttp://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd',
                '-//W3C//DTD SVG 1.0//ENhttp://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd',
                '-//W3C//DTD SVG 1.1 Basic//ENhttp://www.w3.org/Graphics/SVG/1.1/DTD/svg11-basic.dtd',
                '-//W3C//DTD SVG 1.1 Tiny//ENhttp://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd'
            ];
            var svgSvg = '-//W3C//DTD XHTML 1.1 plus MathML 2.0 plus SVG 1.1//ENhttp://www.w3.org/2002/04/xhtml-math-svg/xhtml-math-svg.dtd';

            var name = item.name.toLowerCase();

            if(nameList.includes(name)) {
                if(name === 'html' && !item.publicId && !item.systemId) {
                    item.status = 'passed';
                }

                else if(name === 'html' && htmlList.includes(item.publicId+item.systemId)) {
                    item.status = 'passed';
                }

                else if(name === 'math' && mathList.includes(item.publicId+item.systemId)) {
                    item.status = 'passed';
                }

                else if(name === 'svg' && svgList.includes(item.publicId+item.systemId)) {
                    item.status = 'passed';
                }

                else if(name === 'svg:svg' && item.publicId+item.systemId === svgSvg) {
                    item.status = 'passed';
                }

                else item.status = 'failed';
            }

            else item.status = 'failed';
		}
    },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.1.2']}
});

// 8.1.3 Pour chaque page web possédant une déclaration de type de document, celle-ci est-elle située avant la balise <html> dans le code source ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Le type de document est déclaré avant l\'ouverture de la balise html.',
    node: document.doctype,
    analyzeElements: function(collection) {
        let collectionLength = collection.length;
        for (var i = 0; i < collectionLength; i++) {
            var sibling = collection[i].nextSibling;
			if(sibling && sibling.tagName && sibling.tagName.toLowerCase() === 'html') {
                collection[i].status = 'passed';
            } else {
                collection[i].status = 'failed';
            }
		}
    },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.1.1']}
});

//* 8.2 Pour chaque page web, le code source généré est-il valide selon le type de document spécifié ?
// 8.2.1 Pour chaque déclaration de type de document, le code source généré de la page vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Valeurs d\'attribut id dupliqués dans la page',
    code: 'duplicate_id',
    testStatus: "failed",
    mark: { attrs: ['id'] },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Attributs role avec une valeur invalide',
	query: '[role][data-tng-el-exposed="true"]',
	testStatus: "failed",
	filter: function (item) {
		if (item.getAttribute('role').trim() == 0) {
            return false;
        }

        if(item.hasValidRole()) {
            item.setAttribute('data-tng-validRole', true);
        } else {
            return true;
        }
	},
    tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Attributs role avec une valeur valide',
	query: '[data-tng-validRole]',
	testStatus: "passed",
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements possédants des attributs aria-* non définis dans WAI-ARIA.',
	query: '[data-tng-ariaAttribute][data-tng-el-exposed="true"]',
    testStatus: "failed",
	filter: function (item) {
        if(item.hasInvalidAriaAttributes()) {
            return true;
        } else {
            item.setAttribute('data-tng-validAria', 'true');
            return;
        }
	},
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements possédants uniquement des attributs aria-* définis dans WAI-ARIA.',
	query: '[data-tng-validAria]',
	testStatus: "passed",
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Propiétés ARIA avec une valeur invalide.',
	query: '[data-tng-validAria]',
	testStatus: "failed",
	filter: function (item) {
		return item.hasAriaAttributesWithInvalidValues({ permissive: true });
	},
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Propriétés ARIA non autorisées sur leur élément.',
	query: '[data-tng-validAria]',
	testStatus: "failed",
	filter: function (item) {
		return item.hasProhibitedAriaAttributes();
	},
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Imbrications de balises HTML non conformes.',
	query: 'form form, button a, a button, ul>a, ol>a, ul>h1, ul>h2, ul>h3, ul>h4, ul>h5, ul>h6, ol>h1, ol>h2, ol>h3, ol>h4, ol>h5, ol>h6, ul>p, ol>p, ul>span, ol>span, ul>div, ol>div, section main, header main, footer main',
	testStatus: "failed",
	tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Le titre de la page doit être déclaré dans l'en-tête (balise head).",
	query: 'body title',
	testStatus: "failed",
	filter: function (item) {
		if(item.closest('svg')) return;
	},
	tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "La page web doit contenir un seul titre de page (balise title).",
	query: 'head title, body title',
	expectedNbElements: {max: 1},
    explanations: {
        passed: "La page web contient ne possède pas plus d'un titre de page (balise title).",
        failed: "La page web contient plusieurs titres de page (balise title)."
    },
	filter: function (item) {
		if(!item.closest('svg')) return true;
	},
	tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Le titre de page (balise title) ne doit pas être vide.",
	query: 'head title, body title',
	testStatus: "failed",
	filter: function (item) {
		if(!item.closest('svg')) return item.textContent.trim().length === 0;
	},
	tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

//8.3.1 Pour chaque page web, l'indication de langue par défaut vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'La langue de la page est spécifiée.',
    query: 'html[lang], html[xml\\:lang], body[lang], body[xml\\:lang]',
    expectedNbElements: {min: 1},
    explanations: {
        passed: "La langue de la page est bien spécifiée.",
        failed: "La langue de la page n'est pas spécifiée."
    },
    filter: function(item) {
        if(item.hasAttribute('lang') || item.hasAttribute('xml:lang')) {
            item.setAttribute('data-tng-haslang', true);
            return true;
        }
    },
    mark: {attrs: ['lang', 'xml\\:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.3.1']}
});

//8.4.1 Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec un attribut lang vide.',
	query: '[data-tng-haslang]',
	testStatus: "failed",
	filter: function (item) {
        if(item.hasAttribute('lang')) {
            item.setAttribute('data-tng-lang', 'lang');
            if(item.getAttribute('lang').length === 0) {
                item.setAttribute('data-tng-emptylang', 'lang');
            }
        }

        if (item.hasAttribute('xml:lang')) {
            item.setAttribute('data-tng-lang', 'xml');
            if(item.getAttribute('xml:lang').length === 0) {
                if(item.hasAttribute('data-tng-emptylang')) {
                    item.setAttribute('data-tng-emptylang', 'both');
                } else {
                    item.setAttribute('data-tng-emptylang', 'xml');
                }
            }
        }
        return item.hasAttribute('data-tng-emptylang');
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec un attribut lang non vide.',
	query: '[data-tng-lang="lang"]:not([data-tng-emptylang="lang"], [data-tng-emptylang="both"]), [data-tng-lang="xml"]:not([data-tng-emptylang="xml"], [data-tng-emptylang="both"])',
    testStatus: "passed",
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Page HTML avec des attributs lang et xml:lang dont les valeurs ne correspondent pas.",
	query: '[data-tng-lang="lang"][data-tng-lang="xml"]',
	testStatus: "failed",
	filter: function (item) {
        var lang1 = item.getAttribute('lang');
        var lang2 = item.getAttribute('xml:lang');
        if(lang1.length > 0 || lang2.length > 0) {
            var langA = lang1.includes('-') ? lang1.split('-')[0] : lang1;
            var langB = lang2.includes('-') ? lang2.split('-')[0] : lang2;
            if(langA == langB) {
                item.setAttribute('data-tng-samelangs', 'true');
                return;
            }
            return true;
        }
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec des attributs lang et xml:lang dont les valeurs correspondent."',
	query: '[data-tng-samelangs]',
	testStatus: "passed",
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La langue de la page HTML est invalide.',
	query: '[data-tng-haslang]',
	testStatus: "failed",
	filter: function (item) {
        if(item.hasAttribute('lang') && item.hasAttribute('xml:lang')) {
            if(item.hasAttribute('data-tng-emptylang') && item.getAttribute('data-tng-emptylang') === 'both') {
                return;
            }
        } else {
            if(item.hasAttribute('data-tng-emptylang')) {
                return;
            }
        }

        if(item.hasValidLanguageCode()) {
            item.setAttribute('data-tng-validlang', 'true');
            return;
        }
		return true;
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La langue de la page HTML est valide.',
	query: '[data-tng-validlang]',
    testStatus: "passed",
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

//8.5.1 Chaque page web a-t-elle un titre de page (balise title) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'La page web a un titre de page (balise title).',
    query: 'head title, body title',
    expectedNbElements: {min: 1},
    explanations: {
        'passed': 'La page possède bien un titre de page.',
        'failed': 'Aucun titre de page n\'a été trouvé.'
    },
    filter: function (item) {
        if(item.closest('svg')) return;
        return true;
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.5.1']}
});

//8.6.1 Pour chaque page web ayant un titre de page (balise title), le contenu de cette balise est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence du titre de page (balise title).',
    query: 'head title, body title',
    filter: function(item) {
        if(item.closest('svg')) return;
        if(item.textContent.trim().length > 0) {
            let defaultTitles = [
                'document', 'untitled', 'sans titre', 'untitled document', 'document sans titre', 'no title', 'home', 'accueil'
            ];

            if(defaultTitles.includes(item.textContent.trim().toLowerCase())) {
                item.setAttribute('data-tng-pageTitle', 'false');
                return;
            }
            else return true;
        }

        item.setAttribute('data-tng-pageTitle', 'false');
        return;
    },
    testStatus: "cantTell",
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le titre de la page (balise title) n\'est pas pertinent',
    query: '[data-tng-pageTitle]',
    testStatus: "failed",
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

//8.7.1 Dans chaque page web, chaque texte écrit dans une langue différente de la langue par défaut vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez que pour chaque texte écrit dans une langue différente de la langue par défaut le langage est correctement indiqué.',
    query: 'body [lang], body [xml\\:lang]',
    testStatus: "cantTell",
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'mandatory'],
    ressources: {'rgaa': ['8.7.1']}
});

//* 8.8 Dans chaque page web, le code de langue de chaque changement de langue est-il valide et pertinent ?
//8.8.1 Pour chaque page web, le code de langue de chaque changement de langue vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang vide.',
	query: 'body [lang], body [xml\\:lang]',
	testStatus: "failed",
	filter: function (item) {
        if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            if(item.getAttribute('lang').length === 0) {
                return true;
            }
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            if(item.getAttribute('xml:lang').length === 0) {
                return true;
            }
        } else {
            let length1 = item.getAttribute('lang').length;
            let length2 = item.getAttribute('xml:lang').length;
            if(length1 === 0 || length2 === 0) {
                if(length1 + length2 > 0) item.setAttribute('data-tng-el-notemptylang', 'true');
                return true;
            }
        }

        item.setAttribute('data-tng-el-notemptylang', 'true');
        return;
	},
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang non vide.',
	query: '[data-tng-el-notemptylang]',
    testStatus: "passed",
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang invalide.',
	query: '[data-tng-el-notemptylang]',
	testStatus: "failed",
	filter: function (item) {
        if(item.hasValidLanguageCode()) {
            item.setAttribute('data-tng-el-validlang', 'true');
            return;
        }

		return true;
	},
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang valide.',
	query: '[data-tng-el-validlang]',
    testStatus: "passed",
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

//* 8.9 Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
// 8.9.1 Dans chaque page web les balises (à l'exception de <div>, <span> et <table>) ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les balises ne doivent pas être utilisées uniquement à des fins de présentation.',
    description: 'ne pas utiliser de double br pour créer des espaces entre les éléments textes',
    query: 'br + br',
    testStatus: "failed",
    filter: function (item) {
        var textBetween = item.previousSibling.nodeValue;
        textBetween = textBetween ? textBetween.trim().length : textBetween;
        return !textBetween;
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.9.1']}
});

//* 8.10 Dans chaque page web, les changements du sens de lecture sont-ils signalés ?
// 8.10.1 Dans chaque page web, chaque texte dont le sens de lecture est différent du sens de lecture par défaut est contenu dans une balise possédant un attribut dir ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Chaque texte dont le sens de lecture est différent du sens de lecture par défaut doit être contenu dans une balise possédant un attribut dir.",
    status: 'untested',
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.1']}
});

// 8.10.2 : Dans chaque page web, chaque changement du sens de lecture (attribut dir) vérifie-t-il ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Changements du sens de lecture (attribut dir) non conforme.',
    query: '[dir][data-tng-el-exposed="true"]',
    description: "La  valeur de ces attributs n'est pas conforme, les valeurs attendues sont 'ltr' ou 'rtl'.",
    testStatus: "failed",
    filter: function (item) {
        var dirAttr = item.getAttribute('dir');

        if(dirAttr === 'ltr' || dirAttr === 'rtl') {
            item.setAttribute('data-tng-dirValid', 'true');
            return;
        }
        else return true;
    },
    mark: { attrs: ['dir']},
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Changements du sens de lecture (attribut dir) conforme.',
    description: "Vérifier la pertinence de la valeur de l'attribut dir.",
    query: '[data-tng-dirValid]',
    testStatus: "cantTell",
    mark: { attrs: ['dir']},
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.2']}
});