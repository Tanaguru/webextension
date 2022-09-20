/**
 *? ELEMENTS OBLIGATOIRES
 ** tous les tests sont répertoriés
 ** dependances géréss
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
	name: "locale__mandatory_name_275",
    node: document.doctype,
    expectedNbElements: 1,
    explanations: {
        passed: 'locale__mandatory_passed_276',
		failed: 'locale__mandatory_failed_277'
    },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.1.1']}
});

// 8.1.2 Pour chaque page web, le type de document (balise doctype) est-il valide ?
// https://www.w3.org/QA/2002/04/valid-dtd-list.html
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_278",
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
	name: "locale__mandatory_name_279",
    node: document.doctype,
    analyzeElements: function(collection) {
        let collectionLength = collection.length;
        for (var i = 0; i < collectionLength; i++) {
            var sibling = null;
            if(collection[i].nextSibling) {
                sibling = collection[i].nextSibling.nodeType === 1 ? collection[i].nextSibling : collection[i].nextSibling.nextElementSibling;
            }

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
	name: "locale__mandatory_name_280",
    code: 'duplicate_id',
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [{
                name: "id",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "La valeur de l'attribut id ne contient pas d'espace.",
    query: '[data-tng-invalid-id]',
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [{
                name: "id",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_281",
	query: '[role][data-tng-el-exposed="true"]',
	testStatus: "failed",
    depStatus: ["passed"],
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
	name: "locale__mandatory_name_282",
	query: '[data-tng-validRole]',
	testStatus: "passed",
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_283",
	query: '[data-tng-ariaAttribute][data-tng-el-exposed="true"]',
    testStatus: "failed",
    depStatus: ["passed"],
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
	name: "locale__mandatory_name_284",
	query: '[data-tng-validAria]',
	testStatus: "passed",
	tags: ['a11y', 'aria', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_285",
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
	name: "locale__mandatory_name_286",
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
	name: "locale__mandatory_name_287",
	query: 'form form, button a, a button, ul>a, ol>a, ul>h1, ul>h2, ul>h3, ul>h4, ul>h5, ul>h6, ol>h1, ol>h2, ol>h3, ol>h4, ol>h5, ol>h6, ul>p, ol>p, ul>span, ol>span, ul>div, ol>div, section main, header main, footer main',
	testStatus: "failed",
	tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_288",
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
	name: "locale__mandatory_name_289",
	query: 'head title, body title',
	expectedNbElements: {max: 1},
    explanations: {
        passed: 'locale__mandatory_passed_290',
        failed: 'locale__mandatory_failed_291'
    },
	filter: function (item) {
		if(!item.closest('svg')) return true;
	},
	tags: ['a11y', 'code', 'mandatory'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_292",
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
    name: "locale__mandatory_name_293",
    query: 'html[lang], html[xml\\:lang], body[lang], body[xml\\:lang]',
    expectedNbElements: {min: 1},
    explanations: {
        passed: 'locale__mandatory_passed_294',
        failed: 'locale__mandatory_failed_295'
    },
    filter: function(item) {
        if(item.hasAttribute('lang') || item.hasAttribute('xml:lang')) {
            item.setAttribute('data-tng-haslang', true);
            return true;
        }
    },
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.3.1']}
});

//8.4.1 Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?
//! dependance 8.3.1
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_296",
	query: '[data-tng-haslang]',
	testStatus: "failed",
    depStatus: ["passed"],
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
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_297",
	query: '[data-tng-lang="lang"]:not([data-tng-emptylang="lang"]):not([data-tng-emptylang="both"]), [data-tng-lang="xml"]:not([data-tng-emptylang="xml"]):not([data-tng-emptylang="both"])',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "notEmpty"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_298",
	query: '[data-tng-lang="lang"][data-tng-lang="xml"]',
	testStatus: "failed",
    depStatus: ["passed"],
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
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_299",
	query: '[data-tng-samelangs]',
	testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_300",
	query: '[data-tng-haslang]',
	testStatus: "failed",
    depStatus: ["passed"],
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
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "notEmpty"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_301",
	query: '[data-tng-validlang]',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "notEmpty"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

//8.5.1 Chaque page web a-t-elle un titre de page (balise title) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__mandatory_name_302",
    query: 'head title, body title',
    expectedNbElements: {min: 1},
    explanations: {
        passed: 'locale__mandatory_passed_303',
        failed: 'locale__mandatory_failed_304'
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
    name: "locale__mandatory_name_305",
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
    testStatus: 'cantTell',
    warning: false,
    depStatus: ["failed"],
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__mandatory_name_306",
    query: '[data-tng-pageTitle]',
    testStatus: "failed",
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

//8.7.1 Dans chaque page web, chaque texte écrit dans une langue différente de la langue par défaut vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__mandatory_name_307",
    query: 'body [lang], body [xml\\:lang]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'mandatory'],
    ressources: {'rgaa': ['8.7.1']}
});

//* 8.8 Dans chaque page web, le code de langue de chaque changement de langue est-il valide et pertinent ?
//8.8.1 Pour chaque page web, le code de langue de chaque changement de langue vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_308",
	query: 'body [lang], body [xml\\:lang]',
	testStatus: "failed",
    depStatus: ["passed"],
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
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "egal"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "egal"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_309",
	query: '[data-tng-el-notemptylang]',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "notEmpty"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_310",
	query: '[data-tng-el-notemptylang]',
	testStatus: "failed",
    depStatus: ["passed"],
	filter: function (item) {
        if(item.hasValidLanguageCode()) {
            item.setAttribute('data-tng-el-validlang', 'true');
            return;
        }

		return true;
	},
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__mandatory_name_311",
	query: '[data-tng-el-validlang]',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "lang",
                value: "",
                valueState: "any"
            },
            {
                name: 'xml\\:lang',
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

//* 8.9 Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
// 8.9.1 Dans chaque page web les balises (à l'exception de <div>, <span> et <table>) ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__mandatory_name_312",
    description: "locale__mandatory_description_313",
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
    name: "locale__mandatory_name_314",
    status: 'untested',
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.1']}
});

// 8.10.2 : Dans chaque page web, chaque changement du sens de lecture (attribut dir) vérifie-t-il ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__mandatory_name_315",
    query: '[dir][data-tng-el-exposed="true"]',
    description: "locale__mandatory_description_316",
    testStatus: "failed",
    depStatus: ["cantTell"],
    filter: function (item) {
        var dirAttr = item.getAttribute('dir');

        if(dirAttr === 'ltr' || dirAttr === 'rtl') {
            item.setAttribute('data-tng-dirValid', 'true');
            return;
        }
        else return true;
    },
    mark: function() {
        return {
            attrs: [{
                name: "dir",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__mandatory_name_317",
    description: "locale__mandatory_description_318",
    query: '[data-tng-dirValid]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "dir",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.2']}
});
