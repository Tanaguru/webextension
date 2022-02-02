/**
 *? STRUCTURATION DE L'INFORMATION
 ** tous les tests sont répertoriés
 *
 * data : data-tng-headingAN
 */
//! 9.1.1 : voir content.js getHeadingsMap()


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
    name: "Liste d'éléments non structurés en titre mais ayant un role ou une classe indiquant un titre.",
    description: "Vérifier si ces éléments devraient être structurés en titre.",
    query: '[role="heading"][data-tng-el-exposed="true"]:not([aria-level]), [class*="heading"][data-tng-el-exposed="true"]:not([role="heading"]), [class*="titre"][data-tng-el-exposed="true"]:not([role="heading"])',
    filter: function(item) {
        if(item.textContent.trim().length === 0) return;
        if(item.tagName.toLowerCase().match(/^h\d$/g)) return;
        return true;
    },
    testStatus: 'cantTell',
    mark: { attrs: ['role', 'class']},
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
