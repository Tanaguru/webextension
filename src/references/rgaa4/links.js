/**
 *? LIENS
 *
 * * dependances gérées
 * data : data-tng-svgLink, data-tng-textlink, data-tng-textlink-accessiblename, data-tng-cplink, data-tng-imglink, data-tng-imglink-hasContent, data-tng-imglink-accessiblename, data-tng-cplink-hasContent, data-tng-cplink-accessiblename, data-tng-svglink-accessiblename, data-tng-link-names-match, data-tng-link-hasname
 */

//* 6.1 Chaque lien est-il explicite (hors cas particuliers) ?
// 6.1.1 Pour chaque lien texte l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_245',
    query: 'a[href], [role="link"]',
    testStatus: "failed",
    depStatus: ["inapplicable", "cantTell", "passed"],
    filter: function (item) {
        if(item.closest('svg')) {
            item.setAttribute('data-tng-svgLink', 'true');
            return;
        }

        if(item.querySelector('img, [role="img"], svg, object, canvas') == null) {
            item.setAttribute('data-tng-textlink', 'true');

            if(item.getAttribute('data-tng-el-exposed') === 'true') {
                if(!item.hasAccessibleName()) {
                    return true;
                } else {
                    item.setAttribute('data-tng-textlink-accessiblename', 'true');

                    if(item.hasAttribute('data-tng-ANObject')) {
                        let details = JSON.parse(item.getAttribute('data-tng-ANObject'));
                        details.shift();
                        for(let i = 0; i < details.length; i++) {
                            if(Object.keys(details[i]).includes("aria-labelledby") || Object.keys(details[i]).includes("aria-label")) {
                                item.setAttribute('data-tng-link-ANaria', "true");
                                break;
                            }
                        }
                    }
                    return;
                }
            }
        }
    },
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_246',
    query: '[data-tng-textlink="true"][data-tng-el-exposed="false"][data-tng-el-visible="true"]',
    testStatus: "failed",
    mark: {attrs: ['role']},
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_247',
    query: '[data-tng-textlink="true"][data-tng-el-exposed="false"][data-tng-el-visible="false"]',
    testStatus: "inapplicable",
    mark: {attrs: ['role']},
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_248',
    query: '[data-tng-textlink-accessiblename]',
    description: 'locale__links_description_249',
    testStatus: "cantTell",
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_250',
    query: '[data-tng-textlink-accessiblename][title]',
    testStatus: "failed",
    description: 'locale__links_description_251',
    filter: function(item) {
        let anMatch = isString1MatchString2(item.getAttribute('title'), item.accessibleName());
        if(anMatch === null) return;
        return !anMatch;
    },
    mark: {attrs: ['title']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

// 6.1.2 Pour chaque lien image l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
//! dependance 6.1.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_252',
    query: 'a[href]:not([data-tng-svgLink], [data-tng-textlink]), [role="link"]:not([data-tng-svgLink], [data-tng-textlink])',
    testStatus: "failed",
    depStatus: ["inapplicable", "cantTell", "passed"],
    filter: function (item) {
        let linkTextContent = item.textContent.replace(/\s+/g, "");
        if(linkTextContent.length > 0) {
            item.setAttribute('data-tng-cplink', 'true');
            return;
        }
        else item.setAttribute('data-tng-imglink', 'true');
        
        var images = item.querySelectorAll('img, [role="img"], svg, object[type^="image/"], canvas');
        var linkName = false;
        var imagesLength = images.length;
        for(let i = 0; i < imagesLength; i++) {
            if(images[i].hasAccessibleName()) {
                item.setAttribute('data-tng-imglink-hasContent', 'true');
                linkName = true;
                break;
            }
        }

        if(item.getAttribute('data-tng-el-exposed') === 'true') {
            if(linkName || item.hasAccessibleName()) {
                item.setAttribute('data-tng-imglink-accessiblename', 'true');

                if(item.hasAttribute('data-tng-ANObject')) {
                    let details = JSON.parse(item.getAttribute('data-tng-ANObject'));
                    details.shift();
                    for(let i = 0; i < details.length; i++) {
                        if(Object.keys(details[i]).includes("aria-labelledby") || Object.keys(details[i]).includes("aria-label")) {
                            item.setAttribute('data-tng-link-ANaria', "true");
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
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_253',
    query: '[data-tng-imglink][data-tng-el-visible="true"][data-tng-el-exposed="false"]',
    testStatus: "failed",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_254',
    query: '[data-tng-imglink][data-tng-el-visible="false"][data-tng-el-exposed="false"]',
    testStatus: "inapplicable",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_255',
    query: '[data-tng-imglink-accessiblename]',
    description: 'locale__links_description_256',
    testStatus: "cantTell",
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_257',
    query: '[data-tng-imglink-accessiblename][title]',
    testStatus: "failed",
    description: 'locale__links_description_258',
    filter: function(item) {
        let anMatch = isString1MatchString2(item.getAttribute('title'), item.accessibleName());
        if(anMatch === null) return;
        return !anMatch;
    },
    mark: {attrs: ['title']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

// 6.1.3 Pour chaque lien composite l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
//! dependance 6.1.2
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_259',
    query: '[data-tng-cplink]',
    testStatus: "failed",
    depStatus: ["cantTell", "passed"],
    filter: function (item) {
        var images = item.querySelectorAll('img, [role="img"], svg, object[type^="image/"], canvas');
        var linkName = false;
        var imagesLength = images.length;
        for(let i = 0; i < imagesLength; i++) {
            if(images[i].hasAccessibleName()) {
                item.setAttribute('data-tng-cplink-hasContent', 'true');
                linkName = true;
                break;
            }
        }

        if(item.getAttribute('data-tng-el-exposed') === 'true') {
            if(linkName || item.hasAccessibleName()) {
                item.setAttribute('data-tng-cplink-accessiblename', 'true');

                if(item.hasAttribute('data-tng-ANObject')) {
                    let details = JSON.parse(item.getAttribute('data-tng-ANObject'));
                    details.shift();
                    for(let i = 0; i < details.length; i++) {
                        if(Object.keys(details[i]).includes("aria-labelledby") || Object.keys(details[i]).includes("aria-label")) {
                            item.setAttribute('data-tng-link-ANaria', "true");
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
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_260',
    query: '[data-tng-cplink][data-tng-el-visible="true"][data-tng-el-exposed="false"]',
    testStatus: "failed",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_261',
    query: '[data-tng-cplink][data-tng-el-visible="false"][data-tng-el-exposed="false"]',
    testStatus: "inapplicable",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_262',
    query: '[data-tng-cplink-accessiblename]',
    description: 'locale__links_description_263',
    testStatus: "cantTell",
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_264',
    query: '[data-tng-cplink-accessiblename][title]',
    testStatus: "failed",
    description: 'locale__links_description_265',
    filter: function(item) {
        let anMatch = isString1MatchString2(item.getAttribute('title'), item.accessibleName());
        if(anMatch === null) return;
        return !anMatch;
    },
    mark: {attrs: ['title']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

// 6.1.4 Pour chaque lien SVG l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
//! dependance 6.1.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_266',
    query: '[data-tng-svgLink][data-tng-el-exposed="true"]',
    testStatus: "failed",
    depStatus: ["cantTell"],
    filter: function (item) {
        if(!item.hasAccessibleName()) {
            return true;
        } else {
            item.setAttribute('data-tng-svglink-accessiblename', 'true');
            return;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_267',
    query: '[data-tng-svgLink][data-tng-el-visible="true"][data-tng-el-exposed="false"]',
    testStatus: "failed",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_268',
    query: '[data-tng-svgLink][data-tng-el-visible="false"][data-tng-el-exposed="false"]',
    testStatus: "inapplicable",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_269',
    query: '[data-tng-svglink-accessiblename]',
    description: 'locale__links_description_263',
    testStatus: "cantTell",
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

// 6.1.5 Pour chaque lien ayant un intitulé visible, le nom accessible du lien contient-il au moins l'intitulé visible (hors cas particuliers) ?
//! dependance 6.1.*
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_271',
    query: '[data-tng-link-ANaria][data-tng-el-visible="true"]',
    testStatus: "failed",
    depStatus: ["passed"],
    filter: function (item) {
        if(item.innerText.trim().length > 0 || item.hasAttribute('data-tng-imglink-accessiblename')) {
            var visibleName = '';
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
                item.setAttribute('data-tng-link-names-match', 'true');
                return;
            }
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.5']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_272',
    query: '[data-tng-link-names-match]',
    testStatus: "passed",
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.5']}
});

//* 6.2 Dans chaque page web, chaque lien a-t-il un intitulé ?
// 6.2.1 Dans chaque page web, chaque lien a-t-il un intitulé entre <a> et </a> ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_273',
    query: 'a[href][data-tng-el-visible="true"]',
    testStatus: "failed",
    depStatus: ["passed"],
    filter: function (item) {
        if(item.textContent.length > 0) {
            item.setAttribute('data-tng-link-hasname', 'true');
            return;
        }

        if(item.hasAttribute('data-tng-imglink-hasContent') || item.hasAttribute('data-tng-cplink-hasContent')) {
            item.setAttribute('data-tng-link-hasname', 'true');
            return;
        }

        return true;
    },
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__links_name_274',
    query: '[data-tng-link-hasname]',
    testStatus: "passed",
    tags: ['a11y', 'links'],
    ressources: {'rgaa': ['6.2.1']}
});
