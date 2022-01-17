/**
 *? CADRES (terminé)
 *
 * data : data-tng-frameAlt
 */

//* 2.1 Chaque cadre a-t-il un titre de cadre ?
// 2.1.1 Chaque cadre (balise <iframe> ou <frame>) a-t-il un attribut title ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des cadres avec un attribut title',
    query: 'iframe[data-tng-el-exposed="true"][title]:not([role="presentation"]), frame[data-tng-el-exposed="true"][title]:not([role="presentation"])',
    testStatus: "passed",
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des cadres sans attribut title',
    query: 'iframe[data-tng-el-exposed="true"]:not([role="presentation"], [title]), frame[data-tng-el-exposed="true"]:not([role="presentation"], [title])',
    testStatus: "failed",
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "Liste des cadres non exposés aux technologies d'assistance.",
    query: 'iframe[data-tng-el-exposed="false"]:not([role="presentation"]), frame[data-tng-el-exposed="false"]:not([role="presentation"])',
    testStatus: "inapplicable",
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.1.1']}
});

//* 2.2 Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?
// 2.2.1 Pour chaque cadre (balise <iframe> ou <frame>) ayant un attribut title, le contenu de cet attribut est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence des titres des cadres suivants',
    query: 'iframe[data-tng-el-exposed="true"][title]:not([role="presentation"]), frame[data-tng-el-exposed="true"][title]:not([role="presentation"])',
    filter: function (item) {
        if(item.getAttribute('title').trim().length === 0) {
            item.setAttribute('data-tng-frameAlt', 'false');
            return;
        }

        return true;
    },
    testStatus: "cantTell",
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les cadres suivants ont un titre non pertinent',
    query: '[data-tng-frameAlt]',
    testStatus: "failed",
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.2.1']}
});
