/**
 *? STRUCTURATION DE L'INFORMATION
 ** tous les tests sont répertoriés
 *
 * data : data-tng-headingHierarchy, data-tng-headingAN
 */
//TODO a revoir
// 9.1.1 : Dans chaque page web, la hiérarchie entre les titres (balise hx ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres de niveau qui ne respectent pas la hierarchie de titres',
    query: 'h1[data-tng-el-exposed="true"]:not([role]), h2[data-tng-el-exposed="true"]:not([role]), h3[data-tng-el-exposed="true"]:not([role]), h4[data-tng-el-exposed="true"]:not([role]), h5[data-tng-el-exposed="true"]:not([role]), h6[data-tng-el-exposed="true"]:not([role]), [role="heading"][data-tng-el-exposed="true"][aria-level]',
    testStatus: "failed",
    filter: function (item) {
        return false;
        // var currentlevel = parseInt(item.hasAttribute('aria-level') ? item.getAttribute('aria-level') : item.tagName.substring(1));
        // if(currentlevel > 5) return false;
        // var badHierarchy = false;

        // for(let i = currentlevel+1; i < 7; i++) {
        //     var lessLvl = document.body.querySelectorAll(`h${i}[data-tng-el-exposed="true"], [role="heading"][aria-level="${i}"][data-tng-el-exposed="true"]`);

        //     for(let y = 0; y < lessLvl.length; y++) {
        //         var less = lessLvl[y];
        //         if(less.parentNode != item.parentNode) {
        //             var parent = less.parentNode;
        //             while(parent) {
        //                 if(parent.contains(item)) {
        //                     let elList = parent.querySelectorAll(`${less.tagName.toLowerCase()}, ${item.tagName.toLowerCase()}`);
                            
        //                     for(let x = 0; x < elList.length; x++) {
        //                         let el = elList[x];
        //                         if(el == less) {
        //                             badHierarchy = true;
        //                             break;
        //                         }
        //                         else if(el == item) {
        //                             break;
        //                         }
        //                     }
        //                     break;
        //                 }
        //                 else parent = parent.parentNode;
        //             }
        //         }
        //         if(badHierarchy) break;
        //     }
        // }

        // if(badHierarchy) return true;
        // else {
        //     item.setAttribute('data-tng-headingHierarchy', 'true');
        //     return false;
        // }
    },
    mark: {attrs: ['role', 'aria-level']},
    tags: ['a11y', 'headings', 'structure'],
    ressources: { 'rgaa': ['9.1.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres de niveau qui respectent la hierarchie de titres',
    query: '[data-tng-headingHierarchy]',
    testStatus: "passed",
    mark: {attrs: ['role', 'aria-level']},
    tags: ['a11y', 'headings', 'structure'],
    ressources: { 'rgaa': ['9.1.1'] }
});

// 9.1.2 : Dans chaque page web, le contenu de chaque titre (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) non pertinent',
    query: 'h1[data-tng-el-exposed="true"]:not([role]), h2[data-tng-el-exposed="true"]:not([role]), h3[data-tng-el-exposed="true"]:not([role]), h4[data-tng-el-exposed="true"]:not([role]), h5[data-tng-el-exposed="true"]:not([role]), h6[data-tng-el-exposed="true"]:not([role]), [role="heading"][data-tng-el-exposed="true"][aria-level]',
    testStatus: "failed",
    filter: function (item) {
        if(item.hasAccessibleName()) {
            item.setAttribute('data-tng-headingAN', 'true');
            return;
        } else {
            return true;
        }
    },
    tags: ['a11y', 'headings', 'accessiblename', 'structure'],
    ressources: { 'rgaa': ['9.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence des titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level)',
    query: '[data-tng-headingAN="true"]',
    testStatus: "cantTell",
    tags: ['a11y', 'headings', 'accessiblename', 'structure'],
    ressources: { 'rgaa': ['9.1.2'] }
});

// 9.1.3 Dans chaque page web, chaque passage de texte constituant un titre est-il structuré à l'aide d'une balise <hx> ou d'une balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Chaque passage de texte constituant un titre doit être structuré à l'aide d'une balise <hx> ou d'une balise possédant un attribut WAI-ARIA role='heading' associé à un attribut WAI-ARIA aria-level",
    status: 'untested',
    tags: ['a11y', 'headings', 'structure'],
    ressources: { 'rgaa': ['9.1.3'] }
});

// 9.2.1 Dans chaque page web, la structure du document vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones d\'entêtes',
    query: 'header[data-tng-el-exposed="true"]',
    testStatus: "cantTell",
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones de pied de page',
    query: 'footer[data-tng-el-exposed="true"]',
    testStatus: "cantTell",
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones navigation',
    query: 'nav[data-tng-el-exposed="true"]',
    testStatus: "cantTell",
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que l\'éléments suivant est la zone de contenu principale',
    query: 'main[data-tng-el-exposed="true"]',
    testStatus: "cantTell",
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La structure du document utilise une balise main visible et unique',
    query: 'main[data-tng-el-exposed="true"][data-tng-el-visible="true"]',
    expectedNbElements : 1,
    explanations: {
        'passed': 'La structure du document utilise bien une balise main visible et unique.',
        'failed': "La structure du document n'utilise pas de balise main visible et ou en utilise plusieurs."
    },
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.2.1'] }
});

//* 9.3 Dans chaque page web, chaque liste est-elle correctement structurée ?
// 9.3.1 Dans chaque page web, les informations regroupées visuellement sous forme de liste non ordonnée vérifient-elles une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les informations regroupées visuellement sous forme de liste non ordonnée doivent être structurées comme telle.",
    status: 'untested',
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.3.1'] }
});

// 9.3.2 Dans chaque page web, les informations regroupées visuellement sous forme de liste ordonnée vérifient-elles une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les informations regroupées visuellement sous forme de liste ordonnée doivent être structurées comme telle.",
    status: 'untested',
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.3.2'] }
});

// 9.3.3 Dans chaque page web, les informations regroupées sous forme de liste de description utilisent-elles les balises <dl> et <dt> / <dd> ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les informations regroupées visuellement sous forme de liste de description doivent être structurées comme telle.",
    status: 'untested',
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.3.3'] }
});

//* 9.4 Dans chaque page web, chaque citation est-elle correctement indiquée ?
// 9.4.1 Dans chaque page web, chaque citation courte utilise-t-elle une balise <q> ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Chaque citation courte doit utiliser une balise <q>",
    status: 'untested',
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.4.1'] }
});

// 9.4.2 Dans chaque page web, chaque bloc de citation utilise-t-il une balise <blockquote> ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Chaque bloc de citation doit utiliser une balise <blockquote>",
    status: 'untested',
    tags: ['a11y', 'structure'],
    ressources: { 'rgaa': ['9.4.2'] }
});
