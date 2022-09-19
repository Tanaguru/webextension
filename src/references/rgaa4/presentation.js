/**
 *? PRESENTATION DE L'INFORMATION
 ** Tous les tests sont répertoriés
 ** dependances gérées
 *TODO 10.4.1 récupérer la liste de noeuds texte -> font-size-200% -> check viewport position
 *TODO traiter le 10.5 dans la boucle qui passe chaque noeud texte dans le script de contrast, car il n'est pas possible de recupérer simplement les propriétés color et background appliquées directement sur les éléments
 *TODO 10.11.1 et 10.11.2 voir si on peut être + performant avec l'api windows
 *TODO 10.12.1 passer chaque noeud texte après avoir défini les propriétés d'espacement du texte sur le document
 *
 * data : data-tng-scalable
 */

//* 10.1 Dans le site web, des feuilles de style sont-elles utilisées pour contrôler la présentation de l'information ?
// 10.1.1 : Dans chaque page web, les balises servant à la présentation de l'information ne doivent pas être présentes dans le code source généré des pages. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__presentation_name_372",
    query: 'basefont[data-tng-el-exposed="true"], blink[data-tng-el-exposed="true"], center[data-tng-el-exposed="true"], font[data-tng-el-exposed="true"], marquee[data-tng-el-exposed="true"], s[data-tng-el-exposed="true"], strike[data-tng-el-exposed="true"], tt[data-tng-el-exposed="true"], big[data-tng-el-exposed="true"]',
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [],
            related: {},
            tag: true,
            content: false
        }
    },
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.1'] }
});

// 10.1.2 : Dans chaque page web, les attributs servant à la présentation de l'information ne doivent pas être présents dans le code source généré des pages. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__presentation_name_373",
    query: '[align][data-tng-el-exposed="true"], [alink][data-tng-el-exposed="true"], [background][data-tng-el-exposed="true"], [bgcolor][data-tng-el-exposed="true"], [border][data-tng-el-exposed="true"], [cellpadding][data-tng-el-exposed="true"], [cellspacing][data-tng-el-exposed="true"], [char][data-tng-el-exposed="true"], [charoff][data-tng-el-exposed="true"], [clear][data-tng-el-exposed="true"], [compact][data-tng-el-exposed="true"], [color][data-tng-el-exposed="true"], [frameborder][data-tng-el-exposed="true"], [hspace][data-tng-el-exposed="true"], [link][data-tng-el-exposed="true"], [marginheight][data-tng-el-exposed="true"], [marginwidth][data-tng-el-exposed="true"], [text][data-tng-el-exposed="true"], [valign][data-tng-el-exposed="true"], [vlink][data-tng-el-exposed="true"], [vspace][data-tng-el-exposed="true"], [data-tng-el-exposed="true"][size]:not([type="text"], [type="password"]), [data-tng-el-exposed="true"]:not(img, object, embed, canvas, svg)[width], [data-tng-el-exposed="true"]:not(img, object, embed, canvas, svg)[height]',
    filter: function(item) {
        if(item.tagName.toLowerCase() === 'input' && item.type) {
            if(item.type.toLowerCase() === 'text' || item.type.toLowerCase() === 'password') {
                return;
            }
        }

        return true;
    },
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [{
                name: "align",
                value: "",
                valueState: "any"
            },
            {
                name: "alink",
                value: "",
                valueState: "any"
            },
            {
                name: "background",
                value: "",
                valueState: "any"
            },
            {
                name: "bgcolor",
                value: "",
                valueState: "any"
            },
            {
                name: "border",
                value: "",
                valueState: "any"
            },
            {
                name: "cellpadding",
                value: "",
                valueState: "any"
            },
            {
                name: "cellspacing",
                value: "",
                valueState: "any"
            },
            {
                name: "char",
                value: "",
                valueState: "any"
            },
            {
                name: "charoff",
                value: "",
                valueState: "any"
            },
            {
                name: "clear",
                value: "",
                valueState: "any"
            },
            {
                name: "compact",
                value: "",
                valueState: "any"
            },
            {
                name: "color",
                value: "",
                valueState: "any"
            },
            {
                name: "frameborder",
                value: "",
                valueState: "any"
            },
            {
                name: "hspace",
                value: "",
                valueState: "any"
            },
            {
                name: "link",
                value: "",
                valueState: "any"
            },
            {
                name: "marginheight",
                value: "",
                valueState: "any"
            },
            {
                name: "marginwidth",
                value: "",
                valueState: "any"
            },
            {
                name: "text",
                value: "",
                valueState: "any"
            },
            {
                name: "valign",
                value: "",
                valueState: "any"
            },
            {
                name: "vlink",
                value: "",
                valueState: "any"
            },
            {
                name: "vspace",
                value: "",
                valueState: "any"
            },
            {
                name: "size",
                value: "",
                valueState: "any"
            },
            {
                name: "width",
                value: "",
                valueState: "any"
            },
            {
                name: "height",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.2'] }
});

// 10.1.3 Dans chaque page web, l'utilisation des espaces vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__presentation_name_374",
    status: 'untested',
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.3'] }
});

//* 10.2 Dans chaque page web, le contenu visible porteur d’information reste-t-il présent lorsque les feuilles de style sont désactivées ?
// 10.2.1 Dans chaque page web, l'information reste-t-elle présente lorsque les feuilles de style sont désactivées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__presentation_name_375",
    status: 'untested',
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.2.1'] }
});

//* 10.3 Dans chaque page web, l'information reste-t-elle compréhensible lorsque les feuilles de style sont désactivées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__presentation_name_376",
    status: 'untested',
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.3.1'] }
});

//* 10.4 Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200%, au moins (hors cas particuliers) ?
// 10.4.1 Dans chaque page web, l'augmentation de la taille des caractères jusqu'à 200 %, au moins, ne doit pas provoquer de perte d'information. Cette règle est-elle respectée selon une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_377",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.4.1'] }
});

// 10.4.2 Dans chaque page web, l'augmentation de la taille des caractères jusqu'à 200 %, au moins, doit être possible pour l’ensemble du texte dans la page. Cette règle est-elle respectée selon une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_378",
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		var content = item.getAttribute('content').trim();
        if(!content.match(/(user-scalable)|(maximum-scale)/igm)) {
            return true;
        }
		if (content.match(/(user-scalable=)|(maximum-scale=)/igm)) {
			content = content.indexOf(',') > -1 ? content.split(',') : content = [content];
            for (var j = 0; j < content.length; j++) {
				var property = content[j].split('=');
				var propertyName = property[0].trim().toLowerCase();
				var propertyValue = property[1].trim().toLowerCase();
				if (propertyName == 'user-scalable' && propertyValue == "no") {
                    item.setAttribute('data-tng-scalable', 'false');
					return false;
				}
				else if (propertyName == 'maximum-scale' && (parseFloat(propertyValue) < 2 && parseFloat(propertyValue) >= 0)) {
                    item.setAttribute('data-tng-scalable', 'false');
					return false;
				}
			}

            return true;
		}
	},
	testStatus: "passed",
    depStatus: ["failed"],
    mark: function() {
        return {
            attrs: [{
                name: "content",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'presentation', 'meta'],
    ressources: { 'rgaa': ['10.4.2'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_379",
	query: 'meta[data-tng-scalable]',
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [{
                name: "content",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
	tags: ['a11y', 'presentation', 'meta'],
    ressources: { 'rgaa': ['10.4.2'] }
});

//* 10.5 Dans chaque page web, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées ?
// 10.5.1 Dans chaque page web, chaque déclaration CSS de couleurs de police (color), d'un élément susceptible de contenir du texte, est-elle accompagnée d'une déclaration de couleur de fond (background, background-color), au moins, héritée d'un parent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_380",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.5.1'] }
});

// 10.5.2 Dans chaque page web, chaque déclaration de couleur de fond (background, background-color), d'un élément susceptible de contenir du texte, est-elle accompagnée d'une déclaration de couleur de police (color) au moins, héritée d'un parent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_381",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.5.2'] }
});

// 10.5.3 Dans chaque page web, chaque utilisation d'une image pour créer une couleur de fond d'un élément susceptible de contenir du texte, via CSS (background, background-image), est-elle accompagnée d'une déclaration de couleur de fond (background, background-color), au moins, héritée d'un parent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_382",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.5.3'] }
});

//* 10.6 Dans chaque page web, chaque lien dont la nature n'est pas évidente est-il visible par rapport au texte environnant ?
// 10.6.1 Dans chaque page web, chaque lien texte signalé uniquement par la couleur, et dont la nature n'est pas évidente, vérifie-t-il ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_383",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.6.1'] }
});

//* 10.7 Dans chaque page web, pour chaque élément recevant le focus, la prise de focus est-elle visible ?
// 10.7.1 Pour chaque élément recevant le focus, la prise de focus vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_384",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.7.1'] }
});

//* 10.8 Pour chaque page web, les contenus cachés ont-ils vocation à être ignorés par les technologies d'assistance ?
// 10.8.1 Dans chaque page web, chaque contenu caché vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_385",
	query: '[data-tng-el-exposed="false"][data-tng-el-visible="true"]',
	description: "locale__presentation_description_386",
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'keyboard', 'presentation'],
    ressources: { 'rgaa': ['10.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_387",
	query: '[data-tng-el-exposed="true"][data-tng-el-visible="false"]',
	description: "locale__presentation_description_388",
    filter: function(item) {
        let an = item.fullAccessibleName;
        if(an[0].length === 0) return;
        an.shift();
        
        let anwithoutchild = "";
        an.forEach(part => {
            for(content in part) {
                if(typeof part[content] === "string") anwithoutchild += part[content].trim();
            }
        });
        return anwithoutchild.length > 0;
    },
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'keyboard', 'presentation'],
    ressources: { 'rgaa': ['10.8.1'] }
});

//* 10.9 Dans chaque page web, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
//* 10.10 Dans chaque page web, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
// 10.9.1 Dans chaque page web, pour chaque texte ou ensemble de textes, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.1 Dans chaque page web, pour chaque texte ou ensemble de textes, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_389",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.1', '10.10.1'] }
});

// 10.9.2 Dans chaque page web, pour chaque image ou ensemble d'images, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.2 Dans chaque page web, pour chaque image ou ensemble d'images, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_390",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.2', '10.10.2'] }
});

// 10.9.3 Dans chaque page web, pour chaque média temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.3 Dans chaque page web, pour chaque média temporel, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_391",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.3', '10.10.3'] }
});

// 10.9.4 Dans chaque page web, pour chaque média non temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.4 Dans chaque page web, pour chaque média non temporel, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_392",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.4', '10.10.4'] }
});

//! 10.11 l'ajout de l'iframe cache les images sur certains sites sous chrome
//* 10.11 Pour chaque page web, les contenus peuvent-ils être présentés sans avoir recours à un défilement vertical pour une fenêtre ayant une hauteur de 256px ou à un défilement horizontal pour une fenêtre ayant une largeur de 320px (hors cas particuliers) ?
// 10.11.1 Pour chaque page web, lorsque le contenu dont le sens de lecture est horizontal est affiché dans une fenêtre réduite à une largeur de 320px, l'ensemble des informations et des fonctionnalités sont-elles disponibles sans aucun défilement horizontal (hors cas particuliers) ?
// tanaguruTestsList.push({
// 	lang: 'fr',
// 	name: "locale__presentation_name_393",
//     query: 'body',
//     analyzeElements: function(collection) {
//         var currentPage = document.createElement("iframe");
//         currentPage.id = 'test10-11-1-tng';
//         currentPage.style.width = "320px";
//         currentPage.style.height = "256px";
//         var pageHead = document.head.innerHTML;
//         var pageBody = document.body.outerHTML;
//         document.body.appendChild(currentPage);
//         currentPage.contentWindow.document.head.innerHTML = pageHead;
//         currentPage.contentWindow.document.body.outerHTML = pageBody;
//         var horizontalScroll = currentPage.contentWindow.document.body.scrollWidth - currentPage.contentWindow.document.body.clientWidth;
//         var verticalScroll = currentPage.contentWindow.document.body.scrollHeight - currentPage.contentWindow.document.body.clientHeight;
//         currentPage.remove();
//         if(verticalScroll > 0) {
//             collection[0].setAttribute('data-tng-verticallScroll', true);
//         } else {
//             collection[0].setAttribute('data-tng-verticallScroll', false);
//         }
//         if(horizontalScroll > 0) {
//             collection[0].status = 'cantTell';
//         } else {
//             collection[0].status = 'passed';
//         }
//     },
// 	tags: ['a11y', 'presentation'],
//     ressources: { 'rgaa': ['10.11.1'] }
// });

// 10.11.2 Pour chaque page web, lorsque le contenu dont le sens de lecture est vertical est affiché dans une fenêtre réduite à une hauteur de 256px, l'ensemble des informations et des fonctionnalités sont-elles disponibles sans aucun défilement vertical (hors cas particuliers) ?
// tanaguruTestsList.push({
// 	lang: 'fr',
// 	name: "locale__presentation_name_394",
//     query: '[data-tng-verticallScroll]',
//     analyzeElements: function(collection) {
//         if(collection[0].getAttribute('data-tng-verticallScroll') === 'true') {
//             collection[0].status = 'cantTell';
//         }

//         collection[0].status = 'passed';
//     },
// 	tags: ['a11y', 'presentation'],
//     ressources: { 'rgaa': ['10.11.2'] }
// });

//* 10.12 Dans chaque page web, les propriétés d'espacement du texte peuvent-elles être redéfinies par l'utilisateur sans perte de contenu ou de fonctionnalité (hors cas particuliers) ?
// 10.12.1 Dans chaque page web, le texte reste-t-il lisible lorsque l'affichage est modifié selon ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_395",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.12.1'] }
});

//* 10.13 Dans chaque page web, les contenus additionnels apparaissant à la prise de focus ou au survol d'un composant d'interface sont-ils contrôlables par l'utilisateur (hors cas particuliers) ?
// 10.13.1 Chaque contenu additionnel devenant visible à la prise de focus ou au survol d'un composant d'interface peut-il être masqué par une action utilisateur sans déplacer le focus ou le pointeur de la souris (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_396",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.13.1'] }
});

// 10.13.2 Chaque contenu additionnel qui apparaît au survol d'un composant d'interface peut-il être survolé par le pointeur de la souris sans disparaître (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_397",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.13.2'] }
});

// 10.13.3 Chaque contenu additionnel qui apparaît à la prise de focus ou au survol d'un composant d'interface vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_398",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.13.3'] }
});

//* 10.14 Dans chaque page web, les contenus additionnels apparaissant via les styles CSS uniquement peuvent-ils être rendus visibles au clavier et par tout dispositif de pointage ?
// 10.14.1 Dans chaque page web, les contenus additionnels apparaissant au survol d'un composant d'interface via les styles CSS respectent-ils si nécessaire une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_399",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.14.1'] }
});

// 10.14.2 Dans chaque page web, les contenus additionnels apparaissant au focus d'un composant d'interface via les styles CSS respectent-ils si nécessaire une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__presentation_name_400",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.14.2'] }
});
