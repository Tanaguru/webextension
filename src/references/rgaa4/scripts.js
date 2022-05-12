/**
 *? SCRIPTS
 ** tous les tests sont répertoriés
 *! dependances gérées mais attention à la référence à data-tng-altLong
 ** 7.1 & 7.2 implémentation partielle
 *TODO implémenter les modèles de conception dans le script content.js
 *
 * data : data-tng-btn-accessiblename, data-tng-btn-nameMatch
 */
// 7.1 Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ?
// 7.1.1 Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_401',
	query: 'button:not([role]), button[role="none"], [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role]), input[type="button"]:not([role])',
	testStatus: "failed",
    depStatus: ["passed"],
	filter: function (item) {
        if(item.closest('form')) return;
        if((item.getAttribute('data-tng-el-visible') === 'true' || item.getAttribute('data-tng-el-exposed') === 'true') && !item.disabled) {
            if(item.matches('input[type="reset"]:not([value]), input[type="submit"]:not([value])') || item.hasAccessibleName()) {
                item.setAttribute('data-tng-btn-accessiblename', 'true');
                if(item.hasAttribute('data-tng-ANObject')) {
                    let details = JSON.parse(item.getAttribute('data-tng-ANObject'));
                    details.shift();
                    for(let i = 0; i < details.length; i++) {
                        if(Object.keys(details[i]).includes("aria-labelledby") || Object.keys(details[i]).includes("aria-label")) {
                            item.setAttribute('data-tng-script-ANaria', "true");
                            break;
                        }
                    }
                }
                return;
            } else {
                return true;
            }
        }
	},
	tags: ['a11y', 'buttons', 'accessiblename', 'scripts'],
	ressources: {'rgaa': ['7.1.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_402',
	query: '[data-tng-btn-accessiblename]',
	testStatus: "passed",
	tags: ['a11y', 'buttons', 'accessiblename', 'scripts'],
	ressources: {'rgaa': ['7.1.1']}
});

// 7.1.2 Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_403',
	query: '[data-tng-el-exposed="false"]',
	testStatus: "failed",
	filter: function (item) {
        if(item.disabled) return;
        let itemNotExposed = item.getAttribute('data-tng-notExposed').split(',');

		return item.canBeReachedUsingKeyboardWith.length > 0 && !itemNotExposed.includes('css:display') && !itemNotExposed.includes('css:visibility');
	},
    tags: ['a11y', 'keyboard', 'scripts'],
    ressources: { 'rgaa': ['7.1.2'] }
});

// 7.1.3 Chaque script qui génère ou contrôle un composant d'interface vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_404',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.1.3']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_405',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.1.3']}
});

//! dependance 7.1.1
//! reference a data-tng-altLong (defini dans le script image), vérifier si c'est nécessaire, si oui definir cet attribut dans ce script egalement.
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__scripts_name_406',
    query: '[data-tng-script-ANaria][data-tng-el-visible="true"]',
    testStatus: "failed",
    depStatus: ["passed"],
    filter: function (item) {
        if(item.innerText.trim().length > 0 || (item.value && item.value.trim().length > 0) || item.querySelector('[data-tng-altLong]')) {
            var visibleName = '';
            if(item.alt) visibleName += ' '+item.alt;
            if(item.value) visibleName += ' '+item.value;
            item.childNodes.forEach(e => {
                if(e.nodeType === 3) {
                    visibleName += ' '+e.textContent;
                }

                if(e.nodeType === 1 && e.getAttribute('data-tng-el-visible') === 'true') {
                    if(e.alt) visibleName += ' '+e.alt;

                    e.childNodes.forEach(echild => {
                        if(echild.nodeType === 3 || (echild.nodeType === 1 && echild.getAttribute('data-tng-el-visible') === 'true')) {
                            visibleName += ' '+echild.textContent;
                            if(echild.alt) visibleName += ' '+echild.alt;
                        }
                    });
                }
            });

            if(visibleName.length == 0) return;

            let anMatch = isString1MatchString2(item.accessibleName(), visibleName);
            if(anMatch === null) return
            else if(!anMatch) return true
            else {
                item.setAttribute('data-tng-btn-nameMatch', 'true');
                return;
            }
        }
    },
    tags: ['a11y', 'accessiblename', 'buttons', 'scripts'],
    ressources: {'rgaa': ['7.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__scripts_name_407',
    query: '[data-tng-btn-nameMatch]',
    testStatus: "passed",
    tags: ['a11y', 'accessiblename', 'buttons', 'scripts'],
    ressources: {'rgaa': ['7.1.3']}
});

// 7.2 Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?
// 7.2.1 Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_408',
    description: 'locale__scripts_description_409',
	query: 'noscript',
    testStatus: "cantTell",
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.2.1']}
});

// 7.2.2 Chaque élément non textuel mis à jour par un script (dans la page, ou dans un cadre) et ayant une alternative vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_410',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.2.2']}
});

//* 7.3 Chaque script est-il contrôlable par le clavier et par tout dispositif de pointage (hors cas particuliers) ?
// 7.3.1 Chaque élément possédant un gestionnaire d'événement contrôlé par un script vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_411',
    status: 'untested',
	tags: ['a11y', 'keyboard', 'scripts'],
	ressources: {'rgaa': ['7.3.1']}
});

// 7.3.2 Un script ne doit pas supprimer le focus d'un élément qui le reçoit. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_412',
    status: 'untested',
	tags: ['a11y', 'keyboard', 'scripts'],
	ressources: {'rgaa': ['7.3.2']}
});

//* 7.4 Pour chaque script qui initie un changement de contexte, l'utilisateur est-il averti ou en a-t-il le contrôle ?
// 7.4.1 Chaque script qui initie un changement de contexte vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_413',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.4.1']}
});

//* 7.5 Dans chaque page web, les messages de statut sont-ils correctement restitués par les technologies d'assistance ?
// 7.5.1 Chaque message de statut qui informe de la réussite, du résultat d'une action ou bien de l'état d'une application utilise-t-il l'attribut WAI-ARIA role="status" ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_414',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.5.1']}
});

// 7.5.2 Chaque message de statut qui présente une suggestion, ou avertit de l'existence d'une erreur utilise-t-il l'attribut WAI-ARIA role="alert" ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_415',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.5.2']}
});

// 7.5.3 Chaque message de statut qui indique la progression d'un processus utilise-t-il l'un des attributs WAI-ARIA role="log", role="progressbar" ou role="status" ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__scripts_name_416',
    status: 'untested',
	tags: ['a11y', 'scripts'],
	ressources: {'rgaa': ['7.5.3']}
});
