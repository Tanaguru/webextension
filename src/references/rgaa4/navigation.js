/**
 *? NAVIGATION
 ** tous les tests sont répertoriés
 *TODO voir pour tester les liens d'évitement implémenté de façon "classique"
 *TODO ordre de tabulation - pièges au clavier - raccourcis clavier
 */

//* 12.1 Chaque ensemble de pages dispose-t-il de deux systèmes de navigation différents, au moins (hors cas particuliers) ?
// 12.1.1 Chaque ensemble de pages vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque ensemble de pages doit disposer d'au moins deux systèmes de navigation différents.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.1.1'] }
});

//* 12.2 Dans chaque ensemble de pages, le menu et les barres de navigation sont-ils toujours à la même place (hors cas particuliers) ?
// 12.2.1 Dans chaque ensemble de pages, chaque page disposant d'un menu ou de barres de navigation vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages le menu et les barres de navigation sont toujours à la même place dans la présentation ET se présentent toujours dans le même ordre relatif dans le code source.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.2.1'] }
});

//* 12.3 La page « plan du site » est-elle pertinente ?
// 12.3.1 La page « plan du site » est-elle représentative de l'architecture générale du site ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "La page « plan du site » doit être représentative de l'architecture générale du site.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.3.1'] }
});

// 12.3.2 Les liens du plan du site sont-ils fonctionnels ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les liens du plan du site doivent être fonctionnels.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.3.2'] }
});

// 12.3.3 Les liens du plan du site renvoient-ils bien vers les pages indiquées par l'intitulé ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les liens du plan du site doivent pointer vers les pages indiquées par l'intitulé.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.3.3'] }
});

//* 12.4 Dans chaque ensemble de pages, la page « plan du site » est-elle atteignable de manière identique ?
// 12.4.1 Dans chaque ensemble de pages, la page « plan du site » est-elle accessible à partir d'une fonctionnalité identique ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la page « plan du site » doit être accessible à partir d'une fonctionnalité identique.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.4.1'] }
});

// 12.4.2 Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » est-elle située à la même place dans la présentation ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » doit être située à la même place dans la présentation.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.4.2'] }
});

// 12.4.3 Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » se présente-t-elle toujours dans le même ordre relatif dans le code source ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » doit toujours se présenter dans le même ordre relatif dans le code source.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.4.3'] }
});

//* 12.5 Dans chaque ensemble de pages, le moteur de recherche est-il atteignable de manière identique ?
// 12.5.1 Dans chaque ensemble de pages, le moteur de recherche est-il accessible à partir d'une fonctionnalité identique ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, le moteur de recherche doit être accessible à partir d'une fonctionnalité identique.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.5.1'] }
});

// 12.5.2 Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche est-elle située à la même place dans la présentation ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche doit être située à la même place dans la présentation.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.5.2'] }
});

// 12.5.3 Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche se présente-t-elle toujours dans le même ordre relatif dans le code source ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche doit toujours se présenter dans le même ordre relatif dans le code source.",
    status: 'untested',
    tags: ['a11y', 'navigation'],
    ressources: { 'rgaa': ['12.5.3'] }
});

//* 12.6 Les zones de regroupement de contenus présentes dans plusieurs pages web (zones d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche) peuvent-elles être atteintes ou évitées ?
// 12.6.1 Dans chaque page web où elles sont présentes, la zone d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche respectent-elles au moins une de ces conditions : 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les zones de regroupement de contenus présentes dans plusieurs pages web (zones d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche) doivent pouvoir être atteintes ou évitées.",
    status: 'untested',
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.6.1'] }
});

//* 12.7 Dans chaque page web, un lien d'évitement ou d'accès rapide à la zone de contenu principal est-il présent (hors cas particuliers) ?
// 12.7.1 Dans chaque page web, un lien permet-il d'éviter la zone de contenu principal ou d'y accéder (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque page web, un lien doit permettre d'éviter la zone de contenu principal ou d'y accéder.",
    status: 'untested',
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.7.1'] }
});

// 12.7.2 Dans chaque ensemble de pages, le lien d'évitement ou d'accès rapide à la zone de contenu principal vérifient-il ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, le lien d'évitement ou d'accès rapide à la zone de contenu principal doit être situé à la même place dans la présentation  et se présente toujours dans le même ordre relatif dans le code source. Il doit également être visible ou visible à la prise de focus et fonctionnel.",
    status: 'untested',
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.7.2'] }
});

//* 12.8 Dans chaque page web, l'ordre de tabulation est-il cohérent ?
// 12.8.1 Dans chaque page web, l'ordre de tabulation dans le contenu est-il cohérent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des éléments non visibles mais tabulables.',
	query: '[data-tng-el-visible="false"]:not([hidden], [data-tng-notExposed*="css:display"], [data-tng-notExposed*="css:visibility"])',
	description: "Vérifier que ces éléments deviennent visibles au focus.",
	filter: function (item) {
        if(item.disabled) return;

		return item.canBeReachedUsingKeyboardWith.length > 0;
	},
    testStatus: "cantTell",
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.8.1'] }
});

//TODO peut-on simuler un focus client ?
// tanaguruTestsList.push({
// 	lang: 'fr',
// 	name: 'Liste des éléments non visibles mais tabulables.',
// 	query: HTML.getFocusableElementsSelector(),
// 	expectedNbElements: 0,
// 	filter: function (item) {
//         if(item.disabled) return;

//         item.setAttribute('data-tng-temp', 'focused');
//         item.focus();
//         item = document.querySelector('[data-tng-temp]');
//         item.removeAttribute('data-tng-temp');

// 		var exposedState = item.isNotExposedDueTo;

// 		if (exposedState.indexOf('css:display') == -1 && exposedState.indexOf('css:visibility') == -1) {
// 			return !item.isVisible;
// 		}
// 	},
//     tags: ['a11y', 'keyboard', 'navigation'],
//     ressources: { 'rgaa': ['12.8.1'] }
// });

// 12.8.2 Pour chaque script qui met à jour ou insère un contenu, l'ordre de tabulation reste-t-il cohérent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque script qui met à jour ou insère un contenu, l'ordre de tabulation doit rester cohérent.",
    status: 'untested',
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.8.2'] }
});

//* 12.9 Dans chaque page web, la navigation ne doit pas contenir de piège au clavier. Cette règle est-elle respectée ?
// 12.9.1 Dans chaque page web, chaque élément recevant le focus vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'en',
	name: 'Il est possible d\'atteindre l\'élément suivant ou précédent pouvant recevoir le focus avec la touche de tabulation.',
	query: '[onblur]',
    testStatus: "cantTell",
	tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.9.1'] },
	comments: "peut détecter l'attribut onblur (peut-être aussi l'événement) mais ce n'est pas vraiment une preuve que c'est un piège à clavier"
});

//* 12.10 Dans chaque page web, les raccourcis clavier n'utilisant qu'une seule touche (lettre minuscule ou majuscule, ponctuation, chiffre ou symbole) sont-ils contrôlables par l’utilisateur ?
// 12.10.1 Dans chaque page web, chaque raccourci clavier n'utilisant qu'une seule touche (lettres minuscule ou majuscule, ponctuation, chiffre ou symbole) vérifie-t-il l'une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque raccourci clavier n'utilisant qu'une seule touche (lettres minuscule ou majuscule, ponctuation, chiffre ou symbole) un mécanisme permet de désactiver ou configurer le raccourci clavier.",
    status: 'untested',
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.10.1'] }
});

//* 12.11 Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?
// 12.11.1 Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface doivent, si nécessaire, être atteignables au clavier.",
    status: 'untested',
    tags: ['a11y', 'keyboard', 'navigation'],
    ressources: { 'rgaa': ['12.11.1'] }
});
