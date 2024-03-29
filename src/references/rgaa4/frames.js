/**
 *? CADRES (terminé)
 ** dependances gérées
 * data : data-tng-frameAlt
 */

//* 2.1 Chaque cadre a-t-il un titre de cadre ?
// 2.1.1 Chaque cadre (balise <iframe> ou <frame>) a-t-il un attribut title ?

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__frames_name_131",
    query: 'iframe[data-tng-el-exposed="true"][title]:not([role="presentation"]), frame[data-tng-el-exposed="true"][title]:not([role="presentation"])',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "title",
                value: "",
                valueState: "any" //startBy || endBy, || contains || egal || notEmpty || any
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__frames_name_132",
    query: 'iframe[data-tng-el-exposed="true"]:not([role="presentation"]):not([title]), frame[data-tng-el-exposed="true"]:not([role="presentation"]):not([title])',
    testStatus: "failed",
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__frames_name_133",
    query: 'iframe[data-tng-el-exposed="false"]:not([role="presentation"]), frame[data-tng-el-exposed="false"]:not([role="presentation"])',
    testStatus: "inapplicable",
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.1.1']}
});

//* 2.2 Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?
// 2.2.1 Pour chaque cadre (balise <iframe> ou <frame>) ayant un attribut title, le contenu de cet attribut est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__frames_name_134",
    query: 'iframe[data-tng-el-exposed="true"][title]:not([role="presentation"]), frame[data-tng-el-exposed="true"][title]:not([role="presentation"])',
    filter: function (item) {
        if(item.getAttribute('title').trim().length === 0) {
            item.setAttribute('data-tng-frameAlt', 'false');
            return;
        }

        return true;
    },
    testStatus: 'cantTell',
    warning: false,
    depStatus: ["failed"],
    mark: function() {
        return {
            attrs: [{
                name: "title",
                value: "",
                valueState: "notEmpty" //startBy || endBy, || contains || egal || notEmpty || any
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__frames_name_135",
    query: '[data-tng-frameAlt]',
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [{
                name: "title",
                value: "",
                valueState: "any" //startBy || endBy, || contains || egal || notEmpty || any
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'frames'],
    ressources: {'rgaa': ['2.2.1']}
});
