/**
 *? IMAGES
 ** tous les tests sont répertoriés, mais les critères 1.2/1.4 et 1.5 sont améliorables
 *TODO pas possible de tester si un élément a un aria-hidden="true" ET un nom accessible car hasAccessibleName() renvoie false quand isNotExposedDueTo.length === 0
 *! 1.4/1.5 comment identifier les images test / captcha ?
 *
 * datas : data-tng-img-roleImg, data-tng-informative-img, data-tng-altLong, data-tng-image-link, data-tng-ismap-linked, data-tng-img-ignored, data-tng-altnotexposed, data-tng-accessibleCaption
 */

//* 1.1 Chaque image porteuse d'information a-t-elle une alternative textuelle ?
// 1.1.1 - Chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role="img") porteuse d'information a-t-elle une alternative textuelle ? // ne pas traiter les images liens
tanaguruTestsList.push({
    lang: 'fr',
    name: 'liste des images (balise img ou balise possédant l\'attribut WAI-ARIA role="img") sans nom accessible',
    query: 'img[data-tng-el-exposed="true"]:not([role]), [role="img"][data-tng-el-exposed="true"]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    testStatus: "failed",
    filter: function (item) {
        if(item.closest('a')) {
            item.setAttribute('data-tng-image-link', true);
            return;
        }

        let IName = item.tagName.toLowerCase();
        if (IName != 'svg' && IName != 'object' && IName != 'embed' && IName != 'canvas') {
            item.setAttribute('data-tng-img-roleImg', true);
            if (IName == 'img') {
                if ((!item.hasAttribute('alt') || item.getAttribute('alt').trim().length === 0) && (!item.hasAttribute('aria-label') || item.getAttribute('aria-label').trim().length === 0) && (!item.hasAttribute('aria-labelledby') || item.getAttribute('aria-labelledby').trim().length === 0)){
                    if(item.hasAttribute('alt') && item.getAttribute('alt').length === 0) return false;
                    else return true;
                }
            }

            item.setAttribute('data-tng-informative-img', true);

            if(item.accessibleName() == '') {
                return true;
            } else if(item.accessibleName().length > 80) {
                item.setAttribute('data-tng-altLong','true');
            } else {
                item.setAttribute('data-tng-altLong','false');
            }
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise img ou balise possédant l\'attribut WAI-ARIA role="img") avec un nom accessible',
    query: 'img[data-tng-altLong], [role="img"][data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.1'] }
});

// 1.1.2 - Chaque zone d'une image réactive (balise <area>) porteuse d'information a-t-elle une alternative textuelle ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images réactives (balise area) sans nom accessible.',
    query: 'area[data-tng-el-exposed="true"]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    testStatus: "failed",
    filter: function(item) {
        if(!item.hasAttribute('href')) {
            if(item.hasAttribute('aria-hidden')) {
                if(item.getAttribute('aria-hidden') === true) return;
            }
    
            if((!item.hasAttribute('alt') || item.getAttribute('alt').trim().length === 0) && !item.getAttribute('aria-label')) return;
        }

        item.setAttribute('data-tng-informative-img', true);

        if(item.accessibleName() == '') {
            return true;
        } else if(item.accessibleName().length > 80) {
            item.setAttribute('data-tng-altLong','true');
        } else {
            item.setAttribute('data-tng-altLong','false');
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images réactives (balise area) avec un nom accessible.',
    query: 'area[data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['alt','aria-label']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.2'] }
});

// 1.1.3 - Chaque bouton de type image (balise <input> avec l'attribut type="image") a-t-il une alternative textuelle ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de boutons de type image (balise input avec l\'attribut type="image") sans nom accessible.',
    query: 'input[type="image"][data-tng-el-exposed="true"]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    testStatus: "failed",
    filter: function (item) {
        if(item.accessibleName() == '') {
            return true;
        } else if(item.accessibleName().length > 80) {
            item.setAttribute('data-tng-altLong','true');
        } else {
            item.setAttribute('data-tng-altLong','false');
        }
    },
    tags: ['a11y', 'buttons', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de boutons de type image (balise input avec l\'attribut type="image") avec un nom accessible.',
    query: 'input[type="image"][data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'buttons', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.3'] }
});

// 1.1.4 - Chaque zone cliquable d'une image réactive côté serveur est-elle doublée d'un lien dans la page ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones cliquables d\'une image réactive côté serveur qui ne sont pas doublée d\'un lien dans la page.',
    query: 'a[href] img[ismap][data-tng-el-exposed="true"]:not([role])',
    testStatus: "failed",
    filter: function (item) {
        let ismapLink = item.closest('a');

        if (ismapLink.getAttribute('href').trim().length > 0) {
            var hrefValue = ismapLink.getAttribute('href');
            var linkPage = document.querySelectorAll('a[href="'+hrefValue+'"]');

            if(linkPage.length < 2) {
                return true;
            } else {
                item.setAttribute('data-tng-ismap-linked', true);
            }
        }
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.4'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones cliquables d\'une image réactive côté serveur doublée d\'un lien dans la page.',
    query: '[data-tng-ismap-linked]',
    testStatus: "passed",
    mark: { attrs: ['href']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.4'] }
});

// 1.1.5 - Chaque image vectorielle (balise <svg>) porteuse d'information, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images vectorielles (balise svg) restituées ne possédant pas d\'attribut role="img".',
    query: 'svg[data-tng-el-exposed="true"]:not([role="presentation"], [data-tng-image-link])',
    testStatus: "failed",
    filter: function (item) {
        if(item.closest('a')) {
            item.setAttribute('data-tng-image-link', true);
            return;
        }

        if(item.hasAttribute('role')) {
            return item.getAttribute('role') !== 'img' && !item.hasValidRole();
        }
        return true;
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images vectorielles (balise svg) sans nom accessible',
    query: 'svg[role="img"][data-tng-el-exposed="true"]:not([data-tng-image-link])',
    testStatus: "failed",
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    filter: function (item) {
        if(item.accessibleName() == '') {
            return true;
        } else if(item.accessibleName().length > 80) {
            item.setAttribute('data-tng-altLong','true');
        } else {
            item.setAttribute('data-tng-altLong','false');
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images vectorielles (balise svg) avec un nom accessible',
    query: 'svg[role="img"][data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.5'] }
});

// 1.1.6 - Chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, vérifie-t-elle une de ces conditions ? // semble KO sur l'accessible name //gère que le 1er cas dans le RGAA4
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") restituées ne possédant pas d\'attribut role="img".',
    query: 'object[type^="image/"][data-tng-el-exposed="true"]:not([data-tng-image-link])',
    testStatus: "failed",
    filter: function (item) {
        if(item.closest('a')) {
            item.setAttribute('data-tng-image-link', true);
            return;
        }

        if(item.hasAttribute('role')) {
            return item.getAttribute('role') !== 'img' && !item.hasValidRole();
        }
        return true;
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") sans nom accessible',
    query: 'object[role="img"][type^="image/"][data-tng-el-exposed="true"]:not([data-tng-image-link])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    testStatus: "failed",
    filter: function (item) {
        if(item.accessibleName() == '') {
            return true;
        } else if(item.accessibleName().length > 80) {
            item.setAttribute('data-tng-altLong','true');
        } else {
            item.setAttribute('data-tng-altLong','false');
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") avec un nom accessible',
    query: 'object[type^="image/"][data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.6'] }
});

// 1.1.7 - Chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") restituées ne possédant pas d\'attribut role="img".',
    query: 'embed[type^="image/"][data-tng-el-exposed="true"]',
    testStatus: "failed",
    filter: function (item) {
        if(item.hasAttribute('role')) {
            return item.getAttribute('role') !== 'img' && !item.hasValidRole();
        }
        return true;
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.7'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") sans nom accessible',
    query: 'embed[type^="image/"][role="img"][data-tng-el-exposed="true"]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    testStatus: "failed",
    filter: function (item) {
        if(item.accessibleName() == '') {
            return true;
        } else if(item.accessibleName().length > 80) {
            item.setAttribute('data-tng-altLong','true');
        } else {
            item.setAttribute('data-tng-altLong','false');
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.7'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") avec un nom accessible',
    query: 'embed[type^="image/"][data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.7'] }
});

// 1.1.8 - Chaque image bitmap (balise <canvas>) porteuse d'information, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) restituées ne possédant pas d\'attribut role="img".',
    query: 'canvas[data-tng-el-exposed="true"]:not([data-tng-image-link])',
    testStatus: "failed",
    filter: function (item) {
        if(item.closest('a')) {
            item.setAttribute('data-tng-image-link', true);
            return;
        }

        if(item.hasAttribute('role')) {
            return item.getAttribute('role') !== 'img' && !item.hasValidRole();
        }
        return true;
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) sans nom accessible',
    query: 'canvas[role="img"][data-tng-el-exposed="true"]:not([data-tng-image-link])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    testStatus: "failed",
    filter: function (item) {
        if(item.accessibleName() == '') {
            return true;
        } else if(item.accessibleName().length > 80) {
            item.setAttribute('data-tng-altLong','true');
        } else {
            item.setAttribute('data-tng-altLong','false');
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) avec un nom accessible',
    query: 'canvas[data-tng-altLong]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    testStatus: "passed",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.8'] }
});

//* 1.2 Chaque image de décoration est-elle correctement ignorée par les technologies d'assistance ?
// 1.2.1 Chaque image (balise <img>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images (balise img) ignorées par les technologies d\'assistance',
    query: 'img:not([data-tng-informative-img], [data-tng-image-link])',
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') === 'false' && item.getAttribute('data-tng-el-visible') === 'false') return;
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    item.setAttribute('data-tng-informative-img', true);
                    return;
                }
            }
        }
        
        if (item.hasAttribute('aria-hidden')) {
            if (item.getAttribute('aria-hidden') == "true") {
                item.setAttribute('data-tng-img-ignored', true);
                return true;
            }
        }

        if (item.hasAttribute('role')){
            if (item.getAttribute('role') == "presentation" && (!item.hasAttribute('tabindex') || item.getAttribute('tabindex') < 0)) {
                item.setAttribute('data-tng-img-ignored', true);
                return true;
            }
        }

        if (item.hasAttribute('alt')){
            if(item.getAttribute('alt') == '') {
                item.setAttribute('data-tng-img-ignored', true);
                return true;
            }
        }

        item.setAttribute('data-tng-img-ignored', false);
        return;
    },
    testStatus: "passed",
    mark: { attrs: ['alt','aria-hidden','role']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images (balise img) de décoration non ignorées par les technologies d\'assistance',
    query: 'img[data-tng-img-ignored="false"]',
    testStatus: "failed",
    mark: { attrs: ['alt','role', 'tabindex']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.1'] }
});

// 1.2.2 Chaque zone non cliquable (balise <area> sans attribut href) de décoration, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones non cliquables (balise area sans attribut href) ignorées par les technologies d\'assistance',
    query: 'area:not([role], [data-tng-informative-img], [href]), area[role="presentation"]:not([href], [data-tng-informative-img])',
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') === 'false') return;

        if(item.hasAttribute('role')) {
            if(!item.hasAttribute('tabindex') || item.getAttribute('tabindex') < 0) {
                item.setAttribute('data-tng-img-ignored', true);
                return true;
            };
        };

        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden') == "true") {
                item.setAttribute('data-tng-img-ignored', true);
                return true;
            }
        }

        if (item.hasAttribute('alt') && item.getAttribute('alt') == ''){
            item.setAttribute('data-tng-img-ignored', true);
            return true;
        }

        item.setAttribute('data-tng-img-ignored', false);
        return;
    },
    testStatus: "passed",
    mark: { attrs: ['alt','aria-hidden','role']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones non cliquable (balise area sans attribut href) de décoration non ignorées par les technologies d\'assistance',
    query: 'area[data-tng-img-ignored="false"]',
    testStatus: "failed",
    mark: { attrs: ['alt','tabindex','role']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.2'] }
});

// 1.2.3 Chaque image objet (balise object avec l'attribut type="image/…") de décoration, sans légende, vérifie-t-elle ces conditions ? // pourquoi pas de gestion de role presentation dans le RGAA // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objets (balise object avec l\'attribut type="image/…") ignorées par les technologies d\'assistance',
    query: 'object[type^="image/"]:not([role], [data-tng-informative-img], [data-tng-image-link]), object[type^="image/"][role="img"]:not([data-tng-image-link], [data-tng-informative-img])',
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') === 'false' && item.getAttribute('data-tng-el-visible') === 'false') return;
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    item.setAttribute('data-tng-informative-img', true);
                    return false;
                }
            }
        }

        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden') == "true") {
                if (item.textContent.trim().length === 0) {
                    if(!item.hasAttribute('aria-label') || item.getAttribute('aria-label').length === 0) {
                        if(!item.hasAttribute('title') || item.getAttribute('title').length === 0) {
                            item.setAttribute('data-tng-img-ignored', true);
                            return true;
                        }
                    }
                }
            }
        }

        item.setAttribute('data-tng-img-ignored', false);
        return;
    },
    testStatus: "passed",
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") de décoration non ignorées par les technologies d\'assistance',
    query: 'object[type^="image/"][data-tng-img-ignored="false"]',
    testStatus: "failed",
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.3'] }
});

// 1.2.4 Chaque image vectorielle (balise svg) de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'image vectorielle (balise svg) ignorées par les technologies d\'assistance',
    query: 'svg:not([data-tng-informative-img], [data-tng-image-link])',
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') === 'false' && item.getAttribute('data-tng-el-visible') === 'false') return;
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    item.setAttribute('data-tng-informative-img', true);
                    return;
                }
            }
        }

        if (item.hasAttribute('aria-hidden')) {
            if (item.getAttribute('aria-hidden') == "true") {
                if(!item.hasAttribute('aria-label') || item.getAttribute('aria-label').length === 0) {
                    var titleTag = item.querySelector("title");
                    var descTag = item.querySelector('desc');
                    var titleAtt = item.querySelectorAll('[title]');

                    if(!titleTag && !descTag) {
                        if(titleAtt.length === 0 && !item.hasAttribute('title')) {
                            item.setAttribute('data-tng-img-ignored', true);
                            return true;
                        }
                    }
                }
            }
        }

        item.setAttribute('data-tng-img-ignored', false);
        return;
    },
    testStatus: "passed",
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.4'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'image vectorielle (balise svg) de décoration non ignorées par les technologies d\'assistance',
    query: 'svg[data-tng-img-ignored="false"]',
    testStatus: "failed",
    mark: { attrs: ['title']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.4'] }
});

// 1.2.5  Chaque image bitmap (balise <canvas>) de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) ignorées par les technologies d\'assistance',
    query: 'canvas:not([data-tng-informative-img], [data-tng-image-link])',
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') === 'false' && item.getAttribute('data-tng-el-visible') === 'false') return;
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    item.setAttribute('data-tng-informative-img', true);
                    return;
                }
            }
        }

        if (item.hasAttribute('aria-hidden')) {
            if (item.getAttribute('aria-hidden') == "true") {
                if(!item.hasAttribute('aria-label') || item.getAttribute('aria-label').length === 0) {
                    if (item.textContent.trim().length === 0) {
                        item.setAttribute('data-tng-img-ignored', true);
                        return true;
                    }
                }
            }
        }

        item.setAttribute('data-tng-img-ignored', false);
        return;        
    },
    testStatus: "passed",
    mark: { attrs: ['alt','aria-hidden','aria-labelledby','title']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) de décoration non ignorées par les technologies d\'assistance',
    query: 'canvas[data-tng-img-ignored="false"]',
    testStatus: "failed",
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.5'] }
});

// 1.2.6 Chaque image embarquée (balise <embed> avec l'attribut type="image/…") de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") ignorées par les technologies d\'assistance',
    query: 'embed[type^="image/"]:not([role], [data-tng-informative-img]), embed[type^="image/"][role="img"]:not([data-tng-informative-img])',
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') === 'false' && item.getAttribute('data-tng-el-visible') === 'false') return;
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    item.setAttribute('data-tng-informative-img', true);
                    return false;
                }
            }
        }

        if (item.hasAttribute('aria-hidden')) {
            if (item.getAttribute('aria-hidden') == "true") {
                if(!item.hasAttribute('aria-label') || item.getAttribute('aria-label').length === 0) {
                    if(!item.hasAttribute('title') || item.getAttribute('title').length === 0) {
                        item.setAttribute('data-tng-img-ignored', true);
                        return true;
                    }
                }
            }
        }

        item.setAttribute('data-tng-img-ignored', false);
        return;
    },
    testStatus: "passed",
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") de décoration non ignorées par les technologies d\'assistance',
    query: 'embed[type^="image/"][data-tng-img-ignored="false"]',
    testStatus: "failed",
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.2.6'] }
});

//* 1.3 Pour chaque image porteuse d'information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
//* 1.4 Pour chaque image utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?
// 1.3.1 Pour chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role="img") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.1 Pour chaque image (balise <img>) utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images (balise img ou balises possédant l\'attribut WAI-ARIA role="img") ont-elles un nom accessible pertinent ?',
    query: '[data-tng-img-roleImg][data-tng-altLong]',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    testStatus: "cantTell",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.1', '1.4.1'] }
});

// 1.3.2 - Pour chaque zone (balise <area>) d'une image réactive porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.2 Pour chaque zone (balise <area>) d'une image réactive utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces zones (balise area) d\'une image réactive ont-elles un nom accessible pertinent ?',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    query: 'area[data-tng-altLong]',
    testStatus: "cantTell",
    mark: { attrs: ['alt','aria-label']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.2', '1.4.2'] }
});

// 1.3.3 Pour chaque bouton de type image (balise <input> avec l'attribut type="image"), ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.3 Pour chaque bouton de type image (balise <input> avec l'attribut type="image") utilisé comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces boutons de type image (balise input avec l\'attribut type="image") ont-elles un nom accessible pertinent ?',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    query: 'input[type="image"][data-tng-altLong]',
    testStatus: "cantTell",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.3', '1.4.3'] }
});

// 1.3.4 Pour chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.4 Pour chaque image objet (balise <object> avec l'attribut type="image/…") utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images objet (balise object avec l\'attribut type="image/…") ont-elles un nom accessible pertinent ?',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    query: 'object[data-tng-altLong]',
    testStatus: "cantTell",
    mark: { attrs: ['aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.4', '1.4.4'] }
});

// 1.3.5 Pour chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.5 Pour chaque image embarquée (balise <embed> avec l'attribut type="image/…") utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images embarquées (balise embed avec l\'attribut type="image/…") ont-elles un nom accessible pertinent ?',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    query: 'embed[data-tng-altLong]',
    testStatus: "cantTell",
    mark: { attrs: ['aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.5', '1.4.5'] }
});

// 1.3.6 Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.6 Pour chaque image vectorielle (balise <svg>) utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images images vectorielles (balise svg) ont-elles un nom accessible pertinent ?',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    query: 'svg[data-tng-altLong]',
    testStatus: "cantTell",
    mark: { attrs: ['aria-label','aria-labelledby']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.6', '1.4.6'] }
});

// 1.3.7 Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ? // traiter le cas particulier
// 1.4.7 Pour chaque image bitmap (balise <canvas>) utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: ' Ces images bitmap (balise canvas) ont-elles un nom accessible pertinent ?',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    query: 'canvas[data-tng-altLong]',
    testStatus: "cantTell",
    mark: { attrs: ['aria-label','aria-labelledby']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.7', '1.4.7'] }
});

// 1.3.8 Pour chaque image bitmap (balise <canvas>) porteuse d'information et ayant un contenu alternatif entre <canvas> et </canvas>, ce contenu alternatif est-il correctement restitué par les technologies d'assistance ? //traiter le cas particulier
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images bitmap (balise canvas) porteuse d\'information, ayant un contenu alternatif entre sa balise ouvrante et sa balise fermante correctement restitué par les technologies d\'assistance',
    query: 'canvas[role="img"][data-tng-el-exposed="true"]',
    filter: function (item) {
        let texts = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
        let alt = 0;
        let altExposed = 0;
        while(texts.nextNode() && !alt && !altExposed) {
            let cnt = texts.currentNode;
            let parent = cnt.parentNode;
            if(cnt.nodeValue.trim().length > 0) {
                alt++;

                if(parent.getAttribute('data-tng-el-exposed') === 'true') {
                    altExposed++;
                }
            }
        }
        
        if(alt > 0) {
            if(alt === altExposed) return true;
            else item.setAttribute('data-tng-altnotexposed', 'true');
        }
    },
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.3.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images bitmap (balise canvas) porteuse d\'information, ayant un contenu alternatif entre sa balise ouvrante et sa balise fermante non restitué par les technologies d\'assistance',
    query: 'canvas[data-tng-altnotexposed]',
    testStatus: "failed",
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.3.8'] }
});

// 1.3.9 Pour chaque image porteuse d'information et ayant une alternative textuelle, l'alternative textuelle est-elle courte et concise (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Images avec un nom accessible trop long',
    description: "Ce test vérifie si le nom accessible des images est inférieur à 80 caractère.",
    query: '[data-tng-altLong="true"]',
    testStatus: "failed",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.9'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Le nom accessible de ces images est-il concis ?',
    query: '[data-tng-altLong="false"]',
    testStatus: "cantTell",
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.9'] }
});

//* 1.5 Pour chaque image utilisée comme CAPTCHA, une solution d'accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?
// 1.5.1 Chaque image (balises <img>, <area>, <object>, <embed>, <svg>, <canvas> ou possédant un attribut WAI-ARIA role="img") utilisée comme CAPTCHA vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images.',
    query: 'img:not([data-tng-image-link]), area:not([data-tng-image-link]), object:not([data-tng-image-link]), embed:not([data-tng-image-link]), svg:not([data-tng-image-link]), canvas:not([data-tng-image-link]), [role="img"]:not([data-tng-image-link])',
    description: 'Si ces images sont utilisées comme CAPTCHA, vérifier qu\'il existe une alternative non graphique ou une autre solution d\'accès à la fonctionnalité qui est sécurisée par le CAPTCHA',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.5.1']}
});

// 1.5.2 Chaque bouton associé à une image (balise <input> avec l'attribut type="image") utilisée comme CAPTCHA vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des bouton associé à une image.',
    query: 'input[type="image"]',
    description: 'Si ces bouton sont utilisés comme CAPTCHA, vérifier qu\'il existe une alternative non graphique ou une autre solution d\'accès à la fonctionnalité qui est sécurisée par le CAPTCHA',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.5.2']}
});

//* 1.6 Chaque image porteuse d'information a-t-elle, si nécessaire, une description détaillée ?
//* 1.7 Pour chaque image porteuse d'information ayant une description détaillée, cette description est-elle pertinente ?
// 1.6.1 Chaque image (balise <img>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.1 Chaque image (balise <img>) porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <img>) porteuses d\'information.',
    query: 'img[data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.1', '1.7.1']}
});

// 1.6.2 Chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.3 Chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <object>) porteuses d\'information.',
    query: 'object[type^="image/"][data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.2', '1.7.3']}
});

//1.6.3 Chaque image embarquée (balise <embed>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.4 Chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <embed>) porteuses d\'information.',
    query: 'embed[type^="image/"][data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.3', '1.7.4']}
});

//1.6.4 Chaque bouton de type image (balise <input> avec l'attribut type="image") porteur d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.2 Chaque bouton de type image (balise <input> avec l'attribut type="image") porteur d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <input>) porteuses d\'information.',
    query: 'input[type="image"][data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.4', '1.7.2']}
});

// 1.6.5 Chaque image vectorielle (balise <svg>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.6.6 Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une description détaillée, la référence éventuelle à la description détaillée dans l'attribut WAI-ARIA aria-label et la description détaillée associée par l'attribut WAI-ARIA aria-labelledby ou aria-describedby sont-elles correctement restituées par les technologies d'assistance ?
// 1.7.5 Chaque image vectorielle (balise <svg>) porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <svg>) porteuses d\'information.',
    query: 'svg[data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée, pertinente et correctement restituée par les technologies d\'assistance.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.5', '1.6.6', '1.7.5']}
});

// 1.6.7 Chaque image bitmap (balise <canvas>), porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ? 
// 1.6.8 Pour chaque image bitmap (balise <canvas>) porteuse d'information, qui implémente une référence à une description détaillée adjacente, cette référence est-elle correctement restituée par les technologies d'assistance ?
// 1.7.6 Chaque image bitmap (balise <canvas>) porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <canvas>) porteuses d\'information.',
    query: 'canvas[data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée, pertinente et correctement restituée par les technologies d\'assistance.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.7', '1.6.8', '1.7.6']}
});

// 1.6.9 Pour chaque image (balise <img>, <input> avec l'attribut type="image", <area>, <object>, <embed>, <svg>, <canvas>, ou possédant un attribut WAI-ARIA role="img") porteuse d'information, qui est accompagnée d'une description détaillée et qui utilise un attribut WAI-ARIA aria-describedby, l'attribut WAI-ARIA aria-describedby associe-t-il la description détaillée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images qui utilisent l\'attribut aria-describedby.',
    query: '[data-tng-informative-img][aria-describedby]',
    description: 'Si ces images nécessitent une description détaillée, vérifier que l\'attribut aria-describedby associe cette description.',
    testStatus: "cantTell",
    mark: { attrs: ['aria-describedby']},
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.9']}
});

// 1.6.10 Chaque balise possédant un attribut WAI-ARIA role="img" porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (attribut role="img") porteuses d\'information.',
    query: '[role="img"][data-tng-informative-img]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.10']}
});

//* 1.8 Chaque image texte porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
// 1.8.1 Chaque image texte (balise <img> ou possédant un attribut WAI-ARIA role="img") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <img> ou possédant un attribut role="img") porteuses d\'information.',
    query: '[data-tng-img-roleImg][data-tng-altLong]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.1']}
});

// 1.8.2 Chaque bouton « image texte » (balise <input> avec l'attribut type="image") porteur d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacé par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <input>) porteuses d\'information.',
    query: 'input[data-tng-altLong]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.2']}
});

// 1.8.3 Chaque image texte objet (balise <object> avec l'attribut type="image/…") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <object>) porteuses d\'information.',
    query: 'object[data-tng-altLong]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.3']}
});

// 1.8.4 Chaque image texte embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <embed>) porteuses d\'information.',
    query: 'embed[data-tng-altLong]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.4']}
});

// 1.8.5 Chaque image texte bitmap (balise <canvas>) porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <canvas>) porteuses d\'information.',
    query: 'canvas[data-tng-altLong]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.5']}
});

// 1.8.6 Chaque image texte SVG (balise <svg>) porteuse d'information et dont le texte n’est pas complètement structuré au moyen d’éléments <text>, en l’absence d’un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <svg>) porteuses d\'information.',
    query: 'svg[data-tng-altLong]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    testStatus: "cantTell",
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.6']}
});

//* 1.9 Chaque légende d'image est-elle, si nécessaire, correctement reliée à l'image correspondante ?
// 1.9.1 Chaque image pourvue d'une légende (balise <img>, <input> avec l'attribut type="image" ou balise possédant un attribut WAI-ARIA role="img" associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image (balise img, balise input type="image" ou balise role="img") mal reliées à l\'image correspondante',
    query: 'figure [data-tng-img-roleImg], figure input[type="image"]',
    testStatus: "failed",
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');

        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');

                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label').trim().toLowerCase();
                        var figcaptionValue = figcaption.accessibleName().trim().toLowerCase();

                        if(figcaptionValue == parentFigureLabel) {
                            item.setAttribute('data-tng-accessibleCaption', 'true');
                            return;
                        }
                    }
                }
            }
            return true;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image (balise img, balise input type="image" ou balise role="img") correctement reliées à l\'image correspondante',
    query: 'figure [data-tng-img-roleImg][data-tng-accessibleCaption], figure input[type="image"][data-tng-accessibleCaption]',
    testStatus: "passed",
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.1'] }
});

// 1.9.2 Chaque image objet pourvue d'une légende (balise object avec l'attribut type="image/…" associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ? xxx
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image objet mal reliées à l\'image correspondante',
    query: 'figure object[type^="image/"]',
    testStatus: "failed",
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');

        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');

                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label').trim().toLowerCase();
                        var figcaptionValue = figcaption.accessibleName().trim().toLowerCase();

                        if(figcaptionValue == parentFigureLabel) {
                            item.setAttribute('data-tng-accessibleCaption', 'true');
                            return;
                        }
                    }
                }
            }
            return true;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image objet correctement reliées à l\'image correspondante',
    query: 'figure object[type^="image/"][data-tng-accessibleCaption]',
    testStatus: "passed",
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.2'] }
});

//1.9.3 Chaque image embarquée pourvue d'une légende (balise <embed> associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image embarquées (balise embed) mal reliées à l\'image correspondante',
    query: 'figure embed',
    testStatus: "failed",
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');

        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');

                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label').trim().toLowerCase();
                        var figcaptionValue = figcaption.accessibleName().trim().toLowerCase();

                        if(figcaptionValue == parentFigureLabel) {
                            item.setAttribute('data-tng-accessibleCaption', 'true');
                            return;
                        }
                    }
                }
            }
            return true;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image embarquées (balise embed) correctement reliées à l\'image correspondante',
    query: 'figure embed[data-tng-accessibleCaption]',
    testStatus: "passed",
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.3'] }
});

//1.9.4 Chaque image vectorielle pourvue d'une légende (balise <svg> associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image vectorielles (balise svg) mal reliées à l\'image correspondante',
    query: 'figure svg',
    testStatus: "failed",
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');

        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');

                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label').trim().toLowerCase();
                        var figcaptionValue = figcaption.accessibleName().trim().toLowerCase();

                        if(figcaptionValue == parentFigureLabel) {
                            item.setAttribute('data-tng-accessibleCaption', 'true');
                            return;
                        }
                    }
                }
            }
            return true;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.4'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image vectorielles (balise svg) correctement reliées à l\'image correspondante',
    query: 'figure svg[data-tng-accessibleCaption]',
    testStatus: "passed",
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.4'] }
});

// 1.9.5 Chaque image bitmap pourvue d'une légende (balise canvas associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image bitmap (balise canvas) mal reliées à l\'image correspondante',
    query: 'figure canvas',
    testStatus: "failed",
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');

        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');

                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label').trim().toLowerCase();
                        var figcaptionValue = figcaption.accessibleName().trim().toLowerCase();

                        if(figcaptionValue == parentFigureLabel) {
                            item.setAttribute('data-tng-accessibleCaption', 'true');
                            return;
                        }
                    }
                }
            }
            return true;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image bitmap (balise canvas) correctement reliées à l\'image correspondante',
    query: 'figure canvas[data-tng-accessibleCaption]',
    testStatus: "passed",
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.5'] }
});