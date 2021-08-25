// TODO: début RGAA.
var tanaguruTestsList = [];

/**
 *? Thématiques
 *! Images (todo)
 * Cadres
 *! Couleurs (todo)
 *! Multimédia (bloqué)
 * Tableaux
 * Liens
 *! Scripts (todo)
 *! Eléments obligatoires (todo)
 * Structuration de l'information
 *! Présentation de l'information(todo)
 *! Formulaires (bloqué)
 * Navigation
 * Consultation
 */

/**
 *? IMAGES
 ** tous les tests sont répertoriés, mais les critères 1.2/1.4 et 1.5 sont améliorables
 *TODO pas possible de tester si un élément a un aria-hidden="true" ET un nom accessible car hasAccessibleName() renvoie false quand isNotExposedDueTo.length === 0
 *! 1.4/1.5 comment identifier les images test / captcha ?
 */

//* 1.1 Chaque image porteuse d'information a-t-elle une alternative textuelle ?
// 1.1.1 - Chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role="img") porteuse d'information a-t-elle une alternative textuelle ? // ne pas traiter les images liens
tanaguruTestsList.push({
    lang: 'fr',
    name: 'liste des images (balise img ou balise possédant l\'attribut WAI-ARIA role="img") sans nom accessible',
    query: 'img:not([role]), [role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        var IName = item.tagName.toLowerCase();
        if (IName != 'svg' && IName != 'object' && IName != 'embed' && IName != 'canvas') {
            if (!item.closest('a')){
                if (IName == 'img') {
                    if (item.hasAttribute('alt') && !item.hasAttribute('aria-label') && !item.hasAttribute('aria-labelledby')){
                        if (item.getAttribute('alt') === '') {
                            return false;
                        }
                    }
                }
                return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
            }
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise img ou balise possédant l\'attribut WAI-ARIA role="img") avec un nom accessible',
    query: 'img:not([role]), [role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        var IName = item.tagName.toLowerCase();
        if (IName != 'svg' && IName != 'object' && IName != 'embed' && IName != 'canvas') {
            if (!item.closest('a')) {
                if (IName == 'img') {
                    if (item.hasAttribute('alt') && !item.hasAttribute('aria-label') && !item.hasAttribute('aria-labelledby')){
                        if (item.getAttribute('alt') === '') {
                            return false;
                        }
                    }
                }
                if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
                    item.setAttribute('data-tanaguruAltLong','true');
                }
                else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
                    item.setAttribute('data-tanaguruAltLong','false');
                }
                return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.1'] }
});

// 1.1.2 - Chaque zone d'une image réactive (balise <area>) porteuse d'information a-t-elle une alternative textuelle ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images réactives (balise area) sans nom accessible.',
    query: 'area:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function(item) {
        if(item.isNotExposedDueTo.length > 0) return;

        if(!item.hasAttribute('href')) {
            if(item.hasAttribute('aria-hidden')) {
                if(item.getAttribute('aria-hidden') === true) return;
            }
    
            if(item.hasAttribute('alt')) {
                if(item.getAttribute('alt').length === 0) return;
            }
        }

        return !item.hasAccessibleName();
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images réactives (balise area) avec un nom accessible.',
    query: 'area:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;

        if(!item.hasAttribute('href')) {
            if(item.hasAttribute('aria-hidden')) {
                if(item.getAttribute('aria-hidden') === true) return;
            }

            if(item.hasAttribute('alt')) {
                if(item.getAttribute('alt').length === 0) return;
            }
        }

        return item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.2'] }
});

// 1.1.3 - Chaque bouton de type image (balise <input> avec l'attribut type="image") a-t-il une alternative textuelle ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de boutons de type image (balise input avec l\'attribut type="image") sans nom accessible.',
    query: 'input[type="image"]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'buttons', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de boutons de type image (balise input avec l\'attribut type="image") avec un nom accessible.',
    query: 'input[type="image"]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
            item.setAttribute('data-tanaguruAltLong','true');
        }
        else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
            item.setAttribute('data-tanaguruAltLong','false');
        }
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'buttons', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.3'] }
});

// 1.1.4 - Chaque zone cliquable d'une image réactive côté serveur est-elle doublée d'un lien dans la page ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones cliquables d\'une image réactive côté serveur qui ne sont pas doublée d\'un lien dans la page.',
    query: 'img[ismap]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        var parentLink = item.closest('a');
        if (parentLink != null) {
            var hrefValue = parentLink.getAttribute('href');
            var linkPage = document.querySelectorAll('a');
            var cpt = 0;
            for (var i = 0; i < linkPage.length; i++) {
                if (linkPage[i].hasAttributes('href')) {
                    hrefValueBis= linkPage[i].getAttribute('href');
                    if (hrefValueBis != null) {
                        if (hrefValueBis.indexOf(hrefValue)>= 0){
                            cpt = cpt+1;
                        }
                    }
                }
            }
            return item.isNotExposedDueTo.length == 0 && cpt < 2;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.4'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones cliquables d\'une image réactive côté serveur doublée d\'un lien dans la page.',
    query: 'img[ismap]:not([role])',
    filter: function (item) {
        var parentLink = item.closest('a');
        if (parentLink != null) {
            var hrefValue = parentLink.getAttribute('href');
            var linkPage = document.querySelectorAll('a');
            var cpt = 0;
            for (var i = 0; i < linkPage.length; i++) {
                if (linkPage[i].hasAttributes('href')) {
                    hrefValueBis= linkPage[i].getAttribute('href');
                    if (hrefValueBis != null) {
                        if (hrefValueBis.indexOf(hrefValue)>= 0){
                            cpt = cpt+1;
                        }
                    }
                }
            }
            return item.isNotExposedDueTo.length == 0 && cpt > 1;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['href']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.4'] }
});

// 1.1.5 - Chaque image vectorielle (balise <svg>) porteuse d'information, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images vectorielles (balise svg) restituées ne possédant pas d\'attribut role="img".',
    query: 'svg',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(item.hasAttribute('role')) {
                return item.getAttribute('role') !== 'img' && !item.hasValidRole();
            }
            return true;
        }
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images vectorielles (balise svg) sans nom accessible',
    query: 'svg[role="img"]',
    expectedNbElements: 0,
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images vectorielles (balise svg) avec un nom accessible',
    query: 'svg[role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
            item.setAttribute('data-tanaguruAltLong','true');
        }
        else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
            item.setAttribute('data-tanaguruAltLong','false');
        }
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.5'] }
});

// 1.1.6 - Chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, vérifie-t-elle une de ces conditions ? // semble KO sur l'accessible name //gère que le 1er cas dans le RGAA4
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") restituées ne possédant pas d\'attribut role="img".',
    query: 'object[type]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(item.hasAttribute('role')) {
                return item.getAttribute('role') !== 'img' && !item.hasValidRole();
            }
            return true;
        }
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") sans nom accessible',
    query: 'object[type]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/") && (item.getAttribute('role') === 'img' || !item.hasAttribute('role'))){
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objet (balise object avec l\'attribut type="image/…") avec un nom accessible',
    query: 'object[type]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/") && (item.getAttribute('role') === 'img' || !item.hasAttribute('role'))){
            if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
                item.setAttribute('data-tanaguruAltLong','true');
            }
            else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
                item.setAttribute('data-tanaguruAltLong','false');
            }
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.6'] }
});

// 1.1.7 - Chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") restituées ne possédant pas d\'attribut role="img".',
    query: 'embed[type]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(item.hasAttribute('role')) {
                return item.getAttribute('role') !== 'img' && !item.hasValidRole();
            }
            return true;
        }
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.7'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") sans nom accessible',
    query: 'embed[type]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/") && (item.getAttribute('role') === 'img' || !item.hasAttribute('role'))){

            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.7'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") avec un nom accessible',
    query: 'embed[type]',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/") && (item.getAttribute('role') === 'img' || !item.hasAttribute('role'))){
            if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
                item.setAttribute('data-tanaguruAltLong','true');
            }
            else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
                item.setAttribute('data-tanaguruAltLong','false');
            }
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.7'] }
});

// 1.1.8 - Chaque image bitmap (balise <canvas>) porteuse d'information, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) restituées ne possédant pas d\'attribut role="img".',
    query: 'canvas',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(item.hasAttribute('role')) {
                return item.getAttribute('role') !== 'img' && !item.hasValidRole();
            }
            return true;
        }
    },
    tags: ['a11y', 'images'],
    ressources: { 'rgaa': ['1.1.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) sans nom accessible',
    query: 'canvas',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances n\'ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.getAttribute('role') === 'img' || !item.hasAttribute('role')) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) avec un nom accessible',
    query: 'canvas',
    description: 'ce test vérifie si les images restituées par les technologies d\'assistances ont un nom accessible',
    filter: function (item) {
        if(item.getAttribute('role') === 'img' || !item.hasAttribute('role')) {
            if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
                item.setAttribute('data-tanaguruAltLong','true');
            }
            else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
                item.setAttribute('data-tanaguruAltLong','false');
            }
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.8'] }
});

//* 1.2 Chaque image de décoration est-elle correctement ignorée par les technologies d'assistance ?
// 1.2.1 Chaque image (balise <img>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images (balise img) ignorées par les technologies d\'assistance',
    query: 'img:not([role]), img[role="presentation"]',
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    return false;
                }
            }
        }
        
        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden') == "true") {
                return true;
            }
        }

        if (item.hasAttribute('role')){
            if (item.getAttribute('role') == "presentation") {
                return !item.hasAttribute('tabindex') || item.getAttribute('tabindex') < 0;
            }
        }

        if (item.hasAttribute('alt')){
            if(item.getAttribute('alt') == '') {
                return !item.hasAccessibleName();
            }
        }
        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-hidden','role']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images (balise img) de décoration non ignorées par les technologies d\'assistance',
    query: 'img:not([role]), img[role="presentation"], img[role="none"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    return false;
                }
            }
        }
        
        if(item.hasAttribute('aria-hidden')){
            if(item.getAttribute('aria-hidden') == "true") {
                return false;
            }
        }

        if(item.hasAttribute('role')){
            if(item.getAttribute('role') == "presentation" || item.getAttribute('role') == "none") {
                return item.hasAttribute('tabindex') && item.getAttribute('tabindex') >= 0;
            }
        }

        if(item.hasAttribute('alt')){
            if(item.getAttribute('alt') == '') {
                return item.hasAccessibleName();
            } else if(item.getAttribute('alt').trim().length == 0) {
                return true;
            }
        } else {
            return !item.hasAccessibleName();
        }

        return false;
    },
    mark: { attrs: ['alt','role', 'tabindex']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.1'] }
});

// 1.2.2 Chaque zone non cliquable (balise <area> sans attribut href) de décoration, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones non cliquables (balise area sans attribut href) ignorées par les technologies d\'assistance',
    query: 'area:not([role]):not([href]), area[role="presentation"]:not([href])',
    filter: function (item) {
        if (item.hasAttribute('role')){
            if ((item.getAttribute('role') == "presentation")) {
                return !item.hasAttribute('tabindex') || item.getAttribute('tabindex') < 0;
            };
        };

        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden') == "true") {
                return true;
            }
        }

        if (item.hasAttribute('alt') && item.getAttribute('alt') == ''){
            return !item.hasAccessibleName();
        }
        
        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-hidden','role']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones non cliquables (balise area sans attribut href) de décoration non ignorées par les technologies d\'assistance',
    query: 'area:not([role]):not([href]), area[role="presentation"]:not([href]), area[role="none"]:not([href])',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden') == "true") {
                return false;
            }
        }

        if (item.hasAttribute('role')){
            if(item.getAttribute('role') == "presentation" || item.getAttribute('role') == "none") {
                return item.hasAttribute('tabindex') && item.getAttribute('tabindex') >= 0;
            }
        };

        if(item.hasAttribute('alt')){
            if(item.getAttribute('alt') == '') {
                return item.hasAccessibleName();
            } else if(item.getAttribute('alt').trim().length == 0) {
                return true;
            }
        } else {
            return !item.hasAccessibleName();
        }
        
        return false;
    },
    mark: { attrs: ['alt','tabindex','role']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.2'] }
});

// 1.2.3 Chaque image objet (balise object avec l'attribut type="image/…") de décoration, sans légende, vérifie-t-elle ces conditions ? // pourquoi pas de gestion de role presentation dans le RGAA // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objets (balise object avec l\'attribut type="image/…") ignorées par les technologies d\'assistance',
    query: 'object[type]:not([role]), object[type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            var parent = item.parentNode;

            if(parent) {
                var parentTag = parent.tagName.toLowerCase();

                if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                    if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                        return false;
                    }
                }
            }

            if (item.textContent.trim().length > 0) {
                return false;
            }

            if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').length > 0) {
                return false;
            }

            if(item.hasAttribute('title') && item.getAttribute('title').length > 0) {
                return false;
            }

            return !item.hasAccessibleName();
        }

        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images objets (balise object avec l\'attribut type="image/…") de décoration non ignorées par les technologies d\'assistance',
    query: 'object[type][aria-hidden="true"]:not([role]), object[type][aria-hidden="true"][role="img"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            var parent = item.parentNode;

            if(parent) {
                var parentTag = parent.tagName.toLowerCase();

                if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                    if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                        return false;
                    }
                }
            }

            if (item.textContent.trim().length > 0) {
                return true;
            }

            if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').length > 0) {
                return true;
            }

            if(item.hasAttribute('title') && item.getAttribute('title').length > 0) {
                return true;
            }
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.3'] }
});

// 1.2.4 Chaque image vectorielle (balise svg) de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'image vectorielle (balise svg) ignorées par les technologies d\'assistance',
    query: 'svg[aria-hidden="true"]',
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    return false;
                }
            }
        }

        var titleTag = item.querySelectorAll("title");
        var descTag = item.querySelectorAll('desc');
        var titleAtt = item.querySelectorAll('[title]');

        if(titleAtt.length > 0 || item.hasAttribute('title')) {
            return false;
        }

        for (var i = 0; i < titleTag.length; i++) {
            if(titleTag[i].textContent.length > 0) {
                return false;
            }
        }

        for (var i = 0; i < descTag.length; i++) {
            if(descTag[i].textContent.length > 0) {
                return false;
            }
        }

        return !item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.4'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'image vectorielle (balise svg) de décoration non ignorées par les technologies d\'assistance',
    query: 'svg[aria-hidden="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    return false;
                }
            }
        }

        var titleTag = item.querySelectorAll("title");
        var descTag = item.querySelectorAll('desc');
        var titleAtt = item.querySelectorAll('[title]');

        if(titleAtt.length > 0 || item.hasAttribute('title')) {
            return true;
        }

        for (var i = 0; i < titleTag.length; i++) {
            if(titleTag[i].textContent.length > 0) {
                return true;
            }
        }

        for (var i = 0; i < descTag.length; i++) {
            if(descTag[i].textContent.length > 0) {
                return true;
            }
        }

        if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').length > 0) {
            return true;
        }
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.4'] }
});

// 1.2.5  Chaque image bitmap (balise <canvas>) de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) ignorées par les technologies d\'assistance',
    query: 'canvas[aria-hidden="true"]',
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    return false;
                }
            }
        }

        if (item.textContent.trim().length > 0) {
            return false;
        }

        return !item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-hidden','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images bitmap (balise canvas) de décoration non ignorées par les technologies d\'assistance',
    query: 'canvas[aria-hidden="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                    return false;
                }
            }
        }

        if (item.textContent.trim().length > 0) {
            return true;
        }

        if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').length > 0) {
            return true;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.5'] }
});

// 1.2.6 Chaque image embarquée (balise <embed> avec l'attribut type="image/…") de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") ignorées par les technologies d\'assistance',
    query: 'embed[aria-hidden="true"][type]:not([role]), embed[aria-hidden="true"][type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            var parent = item.parentNode;

            if(parent) {
                var parentTag = parent.tagName.toLowerCase();

                if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                    if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                        return false;
                    }
                }
            }

            if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').length > 0) {
                return false;
            }

            if(item.hasAttribute('title') && item.getAttribute('title').length > 0) {
                return false;
            }

            return !item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images embarquées (balise embed avec l\'attribut type="image/…") de décoration non ignorées par les technologies d\'assistance',
    query: 'embed[aria-hidden="true"][type]:not([role]), embed[aria-hidden="true"][type][role="img"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            var parent = item.parentNode;

            if(parent) {
                var parentTag = parent.tagName.toLowerCase();

                if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                    if(parent.querySelector('figcaption').textContent.trim().length > 0) {
                        return false;
                    }
                }
            }

            if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').length > 0) {
                return true;
            }

            if(item.hasAttribute('title') && item.getAttribute('title').length > 0) {
                return true;
            }

            return item.hasAccessibleName();
        }
    },
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.6'] }
});

//* 1.3 Pour chaque image porteuse d'information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
//* 1.4 Pour chaque image utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?
// 1.3.1 Pour chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role="img") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
// 1.4.1 Pour chaque image (balise <img>) utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative est-elle pertinente ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images (balise img ou balises possédant l\'attribut WAI-ARIA role="img") ont-elles un nom accessible pertinent ?',
    query: 'img:not([role]), [role="img"]',
    description: 'La pertinence du nom accessible dépend du contexte de l\'image, image porteuse d\'information ou image-test/CAPTCHA.',
    filter: function (item) {
        var IName = item.tagName.toLowerCase();
        if (IName != 'svg' && IName != 'object' && IName != 'embed' && IName != 'canvas') {
            if (item.hasAccessibleName()){
                if (item.accessibleName.length > 80) {
                    item.classList.add('tanaguruLongAlt');
                }
                return true;
            }
        }
    },
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
    query: 'area:not([role])',
    filter: function (item) {
        if (item.hasAccessibleName()){
            if (item.accessibleName.length > 80) {
                item.classList.add('tanaguruLongAlt');
            }
            return true;
        }
    },
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
    query: 'input[type="image"]:not([role])',
    filter: function (item) {
        if (item.hasAccessibleName()){
            if (item.accessibleName.length > 80) {
                item.classList.add('tanaguruLongAlt');
            }
            return true;
        }
    },
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
    query: 'object[type]:not([role], object[type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            if (item.hasAccessibleName()){
                if (item.accessibleName.length > 80) {
                    item.classList.add('tanaguruLongAlt');
                }
                return true;
            }
        }
    },
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
    query: 'embed[type]:not([role]), embed[type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            if (item.hasAccessibleName()){
                if (item.accessibleName.length > 80) {
                    item.classList.add('tanaguruLongAlt');
                }
                return true;
            }
        }
    },
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
    query: 'svg[role="img"]',
    filter: function (item) {
        if (item.hasAccessibleName()){
            if (item.accessibleName.length > 80) {
                item.classList.add('tanaguruLongAlt');
            }
            return true;
        }
    },
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
    query: 'canvas:not([role]), canvas[role="img"]',
    filter: function (item) {
        if (item.hasAccessibleName()){
            if (item.accessibleName.length > 80) {
                item.classList.add('tanaguruLongAlt');
            }
            return true;
        }
    },
    mark: { attrs: ['aria-label','aria-labelledby']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.7', '1.4.7'] }
});

// 1.3.8 Pour chaque image bitmap (balise <canvas>) porteuse d'information et ayant un contenu alternatif entre <canvas> et </canvas>, ce contenu alternatif est-il correctement restitué par les technologies d'assistance ? //traiter le cas particulier
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images bitmap (balise canvas) porteuse d\'information, ayant un contenu alternatif entre sa balise ouvrante et sa balise fermante correctement restitué par les technologies d\'assistance',
    query: 'canvas[role="img"]',
    filter: function (item) {
        if (item.textContent && item.textContent.trim().length > 0) {
            return item.isNotExposedDueTo.length === 0;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images bitmap (balise canvas) porteuse d\'information, ayant un contenu alternatif entre sa balise ouvrante et sa balise fermante non restitué par les technologies d\'assistance',
    query: 'canvas[role="img"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.textContent && item.textContent.trim().length > 0) {
            return !item.isNotExposedDueTo.length === 0;
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.8'] }
});

// 1.3.9 Pour chaque image porteuse d'information et ayant une alternative textuelle, l'alternative textuelle est-elle courte et concise (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Images avec un nom accessible trop long',
    query: '[data-tanaguruAltLong="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        return true;
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.9'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Le nom accessible de ces images est-il concis ?',
    query: '[data-tanaguruAltLong="false"]',
    filter: function (item) {
        return true;
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.9'] }
});

//* 1.5 Pour chaque image utilisée comme CAPTCHA, une solution d'accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?
// 1.5.1 Chaque image (balises <img>, <area>, <object>, <embed>, <svg>, <canvas> ou possédant un attribut WAI-ARIA role="img") utilisée comme CAPTCHA vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images.',
    query: 'img, area, object, embed, svg, canvas, [role="img"]',
    description: 'Si ces images sont utilisées comme CAPTCHA, vérifier qu\'il existe une alternative non graphique ou une autre solution d\'accès à la fonctionnalité qui est sécurisée par le CAPTCHA',
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.5.1']}
});

// 1.5.2 Chaque bouton associé à une image (balise <input> avec l'attribut type="image") utilisée comme CAPTCHA vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des bouton associé à une image.',
    query: 'input[type="image"]',
    description: 'Si ces bouton sont utilisés comme CAPTCHA, vérifier qu\'il existe une alternative non graphique ou une autre solution d\'accès à la fonctionnalité qui est sécurisée par le CAPTCHA',
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
    query: 'img',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.1', '1.7.1']}
});

// 1.6.2 Chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.3 Chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <object>) porteuses d\'information.',
    query: 'object[type]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.2', '1.7.3']}
});

//1.6.3 Chaque image embarquée (balise <embed>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.4 Chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <embed>) porteuses d\'information.',
    query: 'embed[type]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.3', '1.7.4']}
});

//1.6.4 Chaque bouton de type image (balise <input> avec l'attribut type="image") porteur d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.7.2 Chaque bouton de type image (balise <input> avec l'attribut type="image") porteur d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <input>) porteuses d\'information.',
    query: 'input[type="image"]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée et pertinente.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.4', '1.7.2']}
});

// 1.6.5 Chaque image vectorielle (balise <svg>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
// 1.6.6 Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une description détaillée, la référence éventuelle à la description détaillée dans l'attribut WAI-ARIA aria-label et la description détaillée associée par l'attribut WAI-ARIA aria-labelledby ou aria-describedby sont-elles correctement restituées par les technologies d'assistance ?
// 1.7.5 Chaque image vectorielle (balise <svg>) porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <svg>) porteuses d\'information.',
    query: 'svg[role="img"]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée, pertinente et correctement restituée par les technologies d\'assistance.',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.5', '1.6.6', '1.7.5']}
});

// 1.6.7 Chaque image bitmap (balise <canvas>), porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ? 
// 1.6.8 Pour chaque image bitmap (balise <canvas>) porteuse d'information, qui implémente une référence à une description détaillée adjacente, cette référence est-elle correctement restituée par les technologies d'assistance ?
// 1.7.6 Chaque image bitmap (balise <canvas>) porteuse d'information, ayant une description détaillée, vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <canvas>) porteuses d\'information.',
    query: 'canvas[role="img"]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée, pertinente et correctement restituée par les technologies d\'assistance.',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.7', '1.6.8', '1.7.6']}
});

// 1.6.9 Pour chaque image (balise <img>, <input> avec l'attribut type="image", <area>, <object>, <embed>, <svg>, <canvas>, ou possédant un attribut WAI-ARIA role="img") porteuse d'information, qui est accompagnée d'une description détaillée et qui utilise un attribut WAI-ARIA aria-describedby, l'attribut WAI-ARIA aria-describedby associe-t-il la description détaillée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images qui utilisent l\'attribut aria-describedby.',
    query: 'img[aria-describedby], input[type="image"][aria-describedby], area[aria-describedby], object[type][aria-describedby], embed[type][aria-describedby], [role="img"][aria-describedby]',
    description: 'Si ces images nécessitent une description détaillée, vérifier que l\'attribut aria-describedby associe cette description.',
    filter: function (item) {
        var IName = item.tagName.toLowerCase();
        if ((IName == 'object' || IName == 'embed') && !item.getAttribute('type').startsWith("image/")) {
            return false;
        }
        return true;
    },
    mark: { attrs: ['aria-describedby']},
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.9']}
});

// 1.6.10 Chaque balise possédant un attribut WAI-ARIA role="img" porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (attribut role="img") porteuses d\'information.',
    query: '[role="img"]',
    description: 'Vérifier si ces images ont si nécessaire une description détaillée.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.6.10']}
});

//* 1.8 Chaque image texte porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
// 1.8.1 Chaque image texte (balise <img> ou possédant un attribut WAI-ARIA role="img") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <img> ou possédant un attribut role="img") porteuses d\'information.',
    query: 'img, [role="img"]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.1']}
});

// 1.8.2 Chaque bouton « image texte » (balise <input> avec l'attribut type="image") porteur d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacé par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <input>) porteuses d\'information.',
    query: 'input[type="image"]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.2']}
});

// 1.8.3 Chaque image texte objet (balise <object> avec l'attribut type="image/…") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <object>) porteuses d\'information.',
    query: 'object[type]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.3']}
});

// 1.8.4 Chaque image texte embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <embed>) porteuses d\'information.',
    query: 'embed[type]',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.4']}
});

// 1.8.5 Chaque image texte bitmap (balise <canvas>) porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <canvas>) porteuses d\'information.',
    query: 'canvas',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.5']}
});

// 1.8.6 Chaque image texte SVG (balise <svg>) porteuse d'information et dont le texte n’est pas complètement structuré au moyen d’éléments <text>, en l’absence d’un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des images (balise <svg>) porteuses d\'information.',
    query: 'svg',
    description: 'Si ces images sont des images texte sans mécanisme de remplacement, elles doivent si possible être remplacées par du texte stylé en CSS.',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    tags: ['a11y', 'images'],
    ressources: {'rgaa': ['1.8.6']}
});

//* 1.9 Chaque légende d'image est-elle, si nécessaire, correctement reliée à l'image correspondante ?
// 1.9.1 Chaque image pourvue d'une légende (balise <img>, <input> avec l'attribut type="image" ou balise possédant un attribut WAI-ARIA role="img" associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image (balise img, balise input type="image" ou balise role="img") non reliées à l\'image correspondante',
    query: 'figure img, figure input[type="image"], figure [role="img"]',
    expectedNbElements: 0,
    filter: function (item) {
        var IName = item.tagName.toLowerCase();
        if (IName != 'svg' && IName != 'object' && IName != 'embed' && IName != 'canvas') {
            var parentFigure = item.closest('figure');
            var figcaption = parentFigure.querySelector('figcaption');
            if(figcaption && figcaption.textContent.length > 0) {
                if (parentFigure.hasAttribute('role')) {
                    var parentRole = parentFigure.getAttribute('role');
                    if ((parentRole == 'figure') || (parentRole == 'group')) {
                        if (parentFigure.hasAttribute('aria-label')) {
                            var parentFigureLabel = parentFigure.getAttribute('aria-label');
                            if (parentFigure.querySelector('figcaption')) {
                                var figcaptionValue = figcaption.accessibleName;
                                return figcaptionValue.trim().toLowerCase() != parentFigureLabel.trim().toLowerCase();
                            }
                        }
                    }
                }
                return true;
            }
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image (balise img, balise input type="image" ou balise role="img") reliées à l\'image correspondante',
    query: 'figure img, figure input[type="image"], figure [role="img"]',
    filter: function (item) {
        var IName = item.tagName.toLowerCase();
        if (IName != 'svg' && IName != 'object' && IName != 'embed' && IName != 'canvas') {
            var parentFigure = item.closest('figure');
            var figcaption = parentFigure.querySelector('figcaption');
            if(figcaption && figcaption.textContent.length > 0) {
                if (parentFigure.hasAttribute('role')) {
                    var parentRole = parentFigure.getAttribute('role');
                    if ((parentRole == 'figure') || (parentRole == 'group')) {
                        if (parentFigure.hasAttribute('aria-label')) {
                            var parentFigureLabel = parentFigure.getAttribute('aria-label');
                            if (parentFigure.querySelector('figcaption')) {
                                var figcaptionValue = figcaption.accessibleName;
                                return figcaptionValue.trim().toLowerCase() == parentFigureLabel.trim().toLowerCase();
                            }
                        }
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.1'] }
});

// 1.9.2 Chaque image objet pourvue d'une légende (balise object avec l'attribut type="image/…" associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ? xxx
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image objet non reliées à l\'image correspondante',
    query: 'figure object[type]',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() != parentFigureLabel.trim().toLowerCase();
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
    name: 'Liste des légendes d\'image objet reliées à l\'image correspondante',
    query: 'figure object[type]',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() == parentFigureLabel.trim().toLowerCase();
                        }
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.2'] }
});

//1.9.3 Chaque image embarquée pourvue d'une légende (balise <embed> associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image embarquées (balise embed) non reliées à l\'image correspondante',
    query: 'figure embed',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() != parentFigureLabel.trim().toLowerCase();
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
    name: 'Liste des légendes d\'image embarquées (balise embed) reliées à l\'image correspondante',
    query: 'figure embed',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() == parentFigureLabel.trim().toLowerCase();
                        }
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.3'] }
});

//1.9.4 Chaque image vectorielle pourvue d'une légende (balise <svg> associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image vectorielles (balise svg) non reliées à l\'image correspondante',
    query: 'figure svg',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() != parentFigureLabel.trim().toLowerCase();
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
    name: 'Liste des légendes d\'image vectorielles (balise svg) reliées à l\'image correspondante',
    query: 'figure svg',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() == parentFigureLabel.trim().toLowerCase();
                        }
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.4'] }
});

// 1.9.5 Chaque image bitmap pourvue d'une légende (balise canvas associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d\'image bitmap (balise canvas) non reliées à l\'image correspondante',
    query: 'figure canvas',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() != parentFigureLabel.trim().toLowerCase();
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
    name: 'Liste des légendes d\'image bitmap (balise canvas) reliées à l\'image correspondante',
    query: 'figure canvas',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        var figcaption = parentFigure.querySelector('figcaption');
        if(figcaption && figcaption.textContent.length > 0) {
            if (parentFigure.hasAttribute('role')) {
                var parentRole = parentFigure.getAttribute('role');
                if ((parentRole == 'figure') || (parentRole == 'group')) {
                    if (parentFigure.hasAttribute('aria-label')) {
                        var parentFigureLabel = parentFigure.getAttribute('aria-label');
                        if (parentFigure.querySelector('figcaption')) {
                            var figcaptionValue = figcaption.accessibleName;
                            return figcaptionValue.trim().toLowerCase() == parentFigureLabel.trim().toLowerCase();
                        }
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.5'] }
});

/**
 *? CADRES (terminé)
 */

//* 2.1 Chaque cadre a-t-il un titre de cadre ?
// 2.1.1 Chaque cadre (balise <iframe> ou <frame>) a-t-il un attribut title ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des cadres sans attribut title',
    query: 'iframe:not([role="presentation"]), frame:not([role="presentation"])',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAttribute('title');
    },
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des cadres avec un attribut title',
    query: 'iframe:not([role="presentation"]), frame:not([role="presentation"])',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAttribute('title');
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.1.1']}
});

//* 2.2 Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?
// 2.2.1 Pour chaque cadre (balise <iframe> ou <frame>) ayant un attribut title, le contenu de cet attribut est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence des titres des cadres suivants',
    query: 'iframe[title]:not([role="presentation"]), frame[title]:not([role="presentation"])',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.getAttribute('title').trim().length > 0;
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les cadres suivants ont un titre non pertinent',
    query: 'iframe[title]:not([role="presentation"]), frame[title]:not([role="presentation"])',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.getAttribute('title').trim().length == 0;
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.2.1']}
});

/**
 *? COULEURS
 ** tous les tests sont répertoriés
 *TODO prendre en compte les attributs tel quel "value" ou "placeholder" dans les tests du critère 3.2
 *TODO 3.3.1 répertorier les indications de couleur & les propriétés CSS déterminant une couleur
 *TODO identifier les mécanismes de contraste
 *! voir si l'on peut traiter certains éléments graphique
 */

//* 3.1 Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
// 3.1.1 Pour chaque mot ou ensemble de mots dont la mise en couleur est porteuse d'information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque mot ou ensemble de mots dont la mise en couleur est porteuse d\'information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.1']}
});

// 3.1.2 Pour chaque indication de couleur donnée par un texte, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque indication de couleur donnée par un texte, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.2']}
});

// 3.1.3 Pour chaque image véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque image véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.3']}
});

// 3.1.4 Pour chaque propriété CSS déterminant une couleur et véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque propriété CSS déterminant une couleur et véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.4']}
});

// 3.1.5 Pour chaque média temporel véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média temporel véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.5']}
});

// 3.1.6 Pour chaque média non temporel véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média non temporel véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.6']}
});

//* 3.2 Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?
// 3.2.1 Dans chaque page web, le texte et le texte en image sans effet de graisse d'une taille restituée inférieure à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_45',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste inférieur à 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'valid_45',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste suffisant de 4.5:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte sans effet de graisse et d\'une taille restituée inférieure à 24px respectent un contraste d\'au moins 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'invalid_45V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste inférieur à 4.5:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 4.5:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée inférieure à 24px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 4.5:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'valid_45V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste suffisant de 4.5:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

// 3.2.2 Dans chaque page web, le texte et le texte en image en gras d’une taille restituée inférieure à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    contrast: 'invalid_45G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée inférieure à 18.5px ayant un contraste inférieur à 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'valid_45G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée inférieure à 18.5px ayant un contraste suffisant de 4.5:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45G',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte en gras d\'une taille restituée inférieure à 18.5px respectent un contraste d\'au moins 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'invalid_45GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée inférieure à 18.5px ayant un contraste inférieur à 4.5:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 4.5:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée inférieure à 18.5px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 4.5:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'valid_45GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée inférieure à 18.5px ayant un contraste suffisant de 4.5:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

// 3.2.3 Dans chaque page web, le texte et le texte en image sans effet de graisse d’une taille restituée supérieure ou égale à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste inférieur à 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'valid_3',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste suffisant de 3:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px respectent un contraste d\'au moins 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'invalid_3V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste inférieur à 3:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 3:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 3:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'valid_3V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste suffisant de 3:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

// 3.2.4 Dans chaque page web, le texte et le texte en image en gras d'une taille restituée supérieure ou égale à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste inférieur à 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'valid_3G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste suffisant de 3:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3G',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte en gras d\'une taille restituée supérieure ou égale à 18.5px respectent un contraste d\'au moins 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'invalid_3GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste inférieur à 3:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 3:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée supérieure ou égale à 18.5px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 3:1 minimum.',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'valid_3GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste suffisant de 3:1',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

// 3.2.5 Dans le mécanisme qui permet d'afficher un rapport de contraste conforme, le rapport de contraste entre le texte et la couleur d’arrière-plan est-il suffisamment élevé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Une mécanisme permet d\'afficher un rapport de contraste conforme entre le texte et sa couleur d\'arrière plan.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.2.5']}
});

//* 3.3 Dans chaque page web, les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations sont-elles suffisamment contrastées (hors cas particuliers) ?
// 3.3.1 Dans chaque page web, le rapport de contraste entre les couleurs d'un composant d'interface dans ses différents états et la couleur d'arrière-plan contiguë vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le rapport de contraste entre les couleurs d\'un composant d\'interface dans ses différents états et la couleur d\'arrière-plan contiguë est de 3:1 au moins.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.1']}
});

// 3.3.2 Dans chaque page web, le rapport de contraste des différentes couleurs composant un élément graphique, lorsqu'elles sont nécessaires à sa compréhension, et la couleur d'arrière-plan contiguë, vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le rapport de contraste des différentes couleurs composant un élément graphique, lorsqu\'elles sont nécessaires à sa compréhension, et la couleur d\'arrière-plan contiguë est de 3:1 au moins.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.2']}
});

// 3.3.3 Dans chaque page web, le rapport de contraste des différentes couleurs contiguës entre elles d'un élément graphique, lorsqu'elles sont nécessaires à sa compréhension, vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le rapport de contraste des différentes couleurs contiguës entre elles d\'un élément graphique, lorsqu\'elles sont nécessaires à sa compréhension,  est de 3:1 au moins.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.3']}
});

// 3.3.4 Dans le mécanisme qui permet d'afficher un rapport de contraste conforme, les couleurs du composant ou des éléments graphiques porteurs d’informations qui le composent, sont-elles suffisamment contrastées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Une mécanisme permet d\'afficher un rapport de contraste conforme pour les composants d\'interface et les éléments graphiques porteurs d\'informations.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.4']}
});

/**
 *? MULTIMEDIA
 ** tous les tests sont répertoriés
 *TODO voir si l'on peut identifier de façon assez précise les médias non temporels
 */

//* 4.1 Chaque média temporel pré-enregistré a-t-il, si nécessaire, une transcription textuelle ou une audiodescription (hors cas particuliers) ?
// 4.1.1 Chaque média temporel pré-enregistré seulement audio, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement audios',
    query: 'audio, object[type], embed[type]',
    description:'Vérifiez si nécessaire la présence d\'une transcription textuelle',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'audio') {
            return true;
        } else if(tag === 'object' && (item.getAttribute('type').startsWith('audio/') || item.getAttribute('type') === "application/ogg")) {
            return true;
        } else if(tag === 'embed' && (item.getAttribute('type').startsWith('audio/'))) {
            return true;
        }
    },
    tags: ['a11y', 'audio', 'media'],
    ressources: {'rgaa': ['4.1.1']}
});

// 4.1.2 Chaque média temporel pré-enregistré seulement vidéo, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type], embed[type]',
    description:'Vérifiez si nécessaire que l\'information est également présente sous forme d\'audio ou de transcription',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video') {
            return true;
        } else {
            return item.getAttribute('type').startsWith('video/');
        }
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.1.2']}
});

// 4.1.3  Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type], embed[type]',
    description:'Vérifiez si nécessaire la présence d\'une audio-description et d\'une transcription',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video') {
            return true;
        } else {
            return item.getAttribute('type').startsWith('video/');
        }
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.1.3']}
});

//* 4.2 Pour chaque média temporel pré-enregistré ayant une transcription textuelle ou une audiodescription synchronisée, celles-ci sont-elles pertinentes (hors cas particuliers) ?
// 4.2.1 Pour chaque média temporel pré-enregistré seulement audio, ayant une transcription textuelle, celle-ci est-elle pertinente (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement audios',
    query: 'audio, object[type], embed[type]',
    description:'Vérifiez si elle est présente la pertinence de la transcription textuelle',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'audio') {
            return true;
        } else if(tag === 'object' && (item.getAttribute('type').startsWith('audio/') || item.getAttribute('type') === "application/ogg")) {
            return true;
        } else if(tag === 'embed' && (item.getAttribute('type').startsWith('audio/'))) {
            return true;
        }
    },
    tags: ['a11y', 'audio', 'media'],
    ressources: {'rgaa': ['4.2.1']}
});

// 4.2.2 Chaque média temporel pré-enregistré seulement vidéo vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type], embed[type]',
    description:'Vérifiez si nécessaire la pertinence de l\'alternative audio ou de la transcription',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video') {
            return true;
        } else {
            return item.getAttribute('type').startsWith('video/');
        }
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.2.2']}
});

// 4.2.3 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type], embed[type]',
    description:'Vérifiez si nécessaire la pertinence de l\'audio-description ou de la transcription',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video') {
            return true;
        } else {
            return item.getAttribute('type').startsWith('video/');
        }
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.2.3']}
});

//* 4.3 Chaque média temporel synchronisé pré-enregistré a-t-il, si nécessaire, des sous-titres synchronisés (hors cas particuliers) ?
// 4.3.1 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type], embed[type]',
    description:'Vérifiez si nécessaire la présence de sous-titres',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video') {
            return true;
        } else {
            return item.getAttribute('type').startsWith('video/');
        }
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.1']}
});

// 4.3.2 Pour chaque média temporel synchronisé pré-enregistré possédant des sous-titres synchronisés diffusés via une balise <track>, la balise <track> possède-t-elle un attribut kind="captions" ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des sous-titres synchronisés diffusés via une balise <track> sans attribut kind="captions"',
    query: 'video track',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.hasAttribute('kind')) {
            return item.getAttribute('kind') != 'captions';
        } else {
            return true;
        }
    },
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des sous-titres synchronisés diffusés via une balise <track> avec attribut kind="captions"',
    query: 'video track',
    filter: function (item) {
        if(item.hasAttribute('kind')) {
            return item.getAttribute('kind') == 'captions'
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.2']}
});

// 4.4.1 Pour chaque média temporel synchronisé pré-enregistré ayant des sous-titres synchronisés, ces sous-titres sont-ils pertinents ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres via la balise track',
    query: 'video track[kind="captions"]',
    description:'Vérifiez la pertinence des sous-titres',
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.4.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video',
    description:'Vérifiez, s\'ils existent, la pertinence des sous-titres',
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length == 0) {
            return true;
        }
        return false;
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.4.1']}
});

//* 4.5 Chaque média temporel pré-enregistré a-t-il, si nécessaire, une audiodescription synchronisée (hors cas particuliers) ?
//* 4.6 Pour chaque média temporel pré-enregistré ayant une audiodescription synchronisée, celle-ci est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels vidéo',
    query: 'video, object[type], embed[type]',
    description:'Vérifiez si nécessaire la présence d\'une audiodescription synchronisée et sa pertinence',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video') {
            return true;
        } else {
            return item.getAttribute('type').startsWith('video/');
        }
    },
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.5.1', '4.5.2', '4.6.1', '4.6.2']}
});

//* 4.7 Chaque média temporel est-il clairement identifiable (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels',
    query: 'video, audio, object[type], embed[type]',
    description:'Vérifiez que le contenu textuel adjacent permet d\'identifier clairement le média.',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video' || tag === 'audio') {
            return true;
        } else {
            var mediaType = item.getAttribute('type');
            return mediaType.startsWith('video/') || mediaType.startsWith('audio/') || mediaType === 'application/ogg';
        }
    },
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.7.1']}
});

//* 4.8 Chaque média non temporel a-t-il, si nécessaire, une alternative (hors cas particuliers) ?
// 4.8.1 Chaque média non temporel vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les médias non temporels ont si nécessaire une alternative.',
    description:'Vérifiez qu\'un lien ou bouton adjacent, clairement identifiable, permet d’accéder à une alternative.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.8.1']}
});

// 4.8.2 Chaque média non temporel associé à une alternative vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour les médias non temporels associés à une alternative, cette alternative doit être accessible.',
    description:'Vérifiez l\'accessibilité de l\'alternative associée au média non temporel.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.8.2']}
});

//* 4.9 Pour chaque média non temporel ayant une alternative, cette alternative est-elle pertinente ?
// 4.9.1 Pour chaque média non temporel ayant une alternative, cette alternative permet-elle d'accéder au même contenu et à des fonctionnalités similaires ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour les médias non temporels ayant une alternative, cette alternative doit être pertinente.',
    description:'Vérifiez que l\'alternative permet d\'accéder au même contenu et à des fonctionnalités similaires.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.9.1']}
});

//* 4.10 Chaque son déclenché automatiquement est-il contrôlable par l'utilisateur ?
// 4.10.1 Chaque séquence sonore déclenchée automatiquement via une balise <object>, <video>, <audio>, <embed>, <bgsound> ou un code JavaScript vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des sons durant plus de 3secondes déclenchés automatiquement et non contrôlables par l\'utilisateur.',
	query: 'audio[autoplay]:not([muted]), video[autoplay]:not([muted])',
    expectedNbElements: 0,
    filter: function(item) {
        if(item.duration <= 3 && !item.hasAttribute('loop')) {
            return false;
        }

        if(item.hasAttribute('controls')) {
            return false;
        }

        return true;
    },
    tags: ['a11y', 'audio', 'videos', 'media'],
    ressources: {'rgaa': ['4.10.1'] },
	comments: "Implémentation partielle"
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des sons déclenchés automatiquement qui sont contrôlables par l\'utilisateur ou durent maximum 3secondes.',
	query: 'audio[autoplay]:not([muted]), video[autoplay]:not([muted])',
    filter: function(item) {
        if(item.duration <= 3 && !item.hasAttribute('loop')) {
            return true;
        }

        if(item.hasAttribute('controls')) {
            return true;
        }

        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
	tags: ['a11y', 'audio', 'videos', 'media'],
    ressources: {'rgaa': ['4.10.1'] },
	comments: "Implémentation partielle"
});

//* 4.11 La consultation de chaque média temporel est-elle, si nécessaire, contrôlable par le clavier et tout dispositif de pointage ?
// 4.11.1 Chaque média temporel a-t-il, si nécessaire, les fonctionnalités de contrôle de sa consultation ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels ayant les fonctionnalités de contrôle de sa consultation',
    query: 'video[controls], audio[controls]',
    analyzeElements: function(collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels',
    query: 'video:not([controls]), audio:not([controls]), object[type], embed[type]',
    description:'Vérifiez si nécessaire la présence des fonctionnalités de contrôle de la consultation de ces médias.',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video' || tag === 'audio') {
            return true;
        } else {
            var mediaType = item.getAttribute('type');
            return mediaType.startsWith('video/') || mediaType.startsWith('audio/') || mediaType === 'application/ogg';
        }
    },
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.1']}
});

// 4.11.2/4.11.3 Pour chaque média temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels',
    query: 'video, audio, object[type], embed[type]',
    description:'Vérifiez que chaque fonctionnalité de ces médias est contrôlable ET activable par le clavier et tout dispositif de pointage.',
    filter: function(item) {
        var tag = item.tagName.toLowerCase();
        if(tag === 'video' || tag === 'audio') {
            return true;
        } else {
            var mediaType = item.getAttribute('type');
            return mediaType.startsWith('video/') || mediaType.startsWith('audio/') || mediaType === 'application/ogg';
        }
    },
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.2', '4.11.3']}
});

//* 4.12 La consultation de chaque média non temporel est-elle contrôlable par le clavier et tout dispositif de pointage ?
// 4.12.1 Pour chaque média non temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média non-temporel, chaque fonctionnalité doit être accessible par le clavier et tout dispositif de pointage.',
    status: 'untested',
    tags: ['a11y', 'media', 'keyboard'],
    ressources: {'rgaa': ['4.12.1']}
});

// 4.12.2 Pour chaque média non temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média non-temporel, chaque fonctionnalité doit être activable par le clavier et tout dispositif de pointage.',
    status: 'untested',
    tags: ['a11y', 'media', 'keyboard'],
    ressources: {'rgaa': ['4.12.2']}
});

//* 4.13 Chaque média temporel et non temporel est-il compatible avec les technologies d'assistance (hors cas particuliers) ?
// 4.13.1 Chaque média temporel et non temporel vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Chaque média doit être compatible avec les technologies d\'assistance.',
    description: 'Vérifier que le nom, le rôle, la valeur, le paramétrage et les changements d\'états des composants d\'interfaces sont accessibles aux technologies ou qu\'une alternative compatible permette d\'accéder aux mêmes fonctionnalités.',
    status: 'untested',
    tags: ['a11y', 'media', 'accessiblename'],
    ressources: {'rgaa': ['4.13.1']}
});

// 4.13.2 Chaque média temporel et non temporel qui possède une alternative compatible avec les technologies d'assistance, vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média ayant une alternative compatible avec les technologies d\'assistance, l\'alternative doit être implémentée correctement.',
    description: 'Vérifier que l\'alternative ou le lien/bouton permettant d\'y accéder soit adjacent au média, ou qu\'un mécanisme permette de remplacer le média par son alternative.',
    status: 'untested',
    tags: ['a11y', 'media', 'accessiblename'],
    ressources: {'rgaa': ['4.13.2']}
});

/**
 *? TABLEAUX
 ** complet
 */

//* 5.1 Chaque tableau de données complexe a-t-il un résumé ?
// 5.1.1  Pour chaque tableau de données complexe un résumé est-il disponible ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux complexes sans résumé.',
    query: 'table:not([role]), [role="table"]',
    expectedNbElements: 0,
    explanations: {
        'passed': 'aucun tableau de données complexe sans résumé n\'a été trouvé sur cette page.',
        'failed': 'des tableaux de données complexes sans résumé ont été trouvé sur cette page.'
    },
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }
        if(item.querySelectorAll('th').length > 1 || item.querySelectorAll('[role="columnheader"], [role="rowheader"]').length > 1) {
            var isComplex = item.querySelectorAll('[colspan], [rowspan], [aria-colspan], [aria-rowspan]').length > 0;
            if(isComplex) {
                if(item.querySelector('caption')) {
                    return item.querySelector('caption').textContent.trim().length === 0;
                } else if(item.hasAttribute('role') && item.hasAttribute('aria-describedby')) {
                    var ids = item.getAttribute('aria-describedby').trim().split(' ');
                    if(ids.length > 0) {
                        var summary = '';
                        ids.forEach(id => {
                            if(document.getElementById(id)) {
                                summary += document.getElementById(id).textContent.trim();
                            }
                        });

                        return summary.length === 0;
                    }
                }
                return true;
            }
        }
    },
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux complexes avec résumé.',
    query: 'table:not([role]), [role="table"]',
    filter: function (item) {
        if(item.querySelectorAll('th').length > 1 || item.querySelectorAll('[role="columnheader"], [role="rowheader"]').length > 1) {
            var isComplex = item.querySelectorAll('[colspan], [rowspan], [aria-colspan], [aria-rowspan]').length > 0;
            if(isComplex) {
                if(item.querySelector('caption')) {
                    return item.querySelector('caption').textContent.trim().length > 0;
                } else if(item.hasAttribute('role') && item.hasAttribute('aria-describedby')) {
                    var ids = item.getAttribute('aria-describedby').trim().split(' ');
                    if(ids.length > 0) {
                        var summary = '';
                        ids.forEach(id => {
                            if(document.getElementById(id)) {
                                summary += document.getElementById(id).textContent.trim();
                            }
                        });

                        return summary.length > 0;
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.1.1']}
});

// 5.2.1  Pour chaque tableau de données complexe ayant un résumé, celui-ci est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux complexes avec un résumé pertinent.',
    query: 'table:not([role]), [role="table"]',
    description:'Vérifiez la pertinence du résumé du tableau complexe',
    filter: function (item) {
        if(item.querySelectorAll('th').length > 1 || item.querySelectorAll('[role="columnheader"], [role="rowheader"]').length > 1) {
            var isComplex = item.querySelectorAll('[colspan], [rowspan], [aria-colspan], [aria-rowspan]').length > 0;
            if(isComplex) {
                if(item.querySelector('caption')) {
                    return item.querySelector('caption').textContent.trim().length > 0;
                } else if(item.hasAttribute('role') && item.hasAttribute('aria-describedby')) {
                    var ids = item.getAttribute('aria-describedby').trim().split(' ');
                    if(ids.length > 0) {
                        var summary = '';
                        ids.forEach(id => {
                            if(document.getElementById(id)) {
                                summary += document.getElementById(id).textContent.trim();
                            }
                        });

                        return summary.length > 0;
                    }
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.2.1']}
});

//* 5.3 Pour chaque tableau de mise en forme, le contenu linéarisé reste-t-il compréhensible ?
// 5.3.1 Chaque tableau de mise en forme vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de mise en forme sans role présentation',
    query: 'table:not([role="presentation"])',
    description:'Vérifiez que le contenu linéarisé reste compréhensible',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }
        return item.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length === 0;
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.3.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de mise en forme avec role présentation',
    query: 'table[role="presentation"]',
    description:'Vérifiez que le contenu linéarisé reste compréhensible',
    mark: {attrs: ['role']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.3.1']}
});

// 5.4.1 Pour chaque tableau de données ayant un titre, le titre est-il correctement associé au tableau de données ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre correctement associé au tableau.',
    query: 'table:not([role]), [role="table"]',
    filter: function(item) {
        if(item.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length > 0) {
            if(item.querySelector('caption') != null) {
                return true;
            }

            if(item.hasAttribute('title') || item.hasAttribute('aria-label')) {
                return true;
            }

            if(item.hasAttribute('aria-labelledby') && item.getAttribute('aria-labelledby').trim().length > 0) {
                return document.getElementById(item.getAttribute('aria-labelledby')) != null;
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['title', 'aria-label', 'aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.4.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre mal associé au tableau.',
    query: 'table:not([role])[aria-labelledby], [role="table"][aria-labelledby]',
    expectedNbElements: 0,
    filter: function(item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }
        if(item.getAttribute('aria-labelledby').trim().length > 0) {
            var ids = item.getAttribute('aria-labelledby').trim().split(' ');
            if(ids.length > 0) {
                var summary = false;
                ids.forEach(id => {
                    if(document.getElementById(id)) {
                        summary = true;
                    }
                });

                return !summary;
            }
        }
    },
    mark: {attrs: ['aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.4.1']}
});

// 5.5.1 Pour chaque tableau de données ayant un titre, ce titre permet-il d'identifier le contenu du tableau de données de manière claire et concise ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre',
    query: 'table:not([role]), [role="table"]',
    description:'Vérifiez la pertinence du titre',
    filter: function(item) {
        if(item.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length > 0) {
            return item.hasAccessibleName();
        }
    },
    mark: {attrs: ['title', 'aria-label', 'aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.5.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre non pertinent',
    query: 'table:not([role]), [role="table"]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }
        if(item.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length > 0) {
            return !item.hasAccessibleName();
        }
    },
    mark: {attrs: ['title', 'aria-label', 'aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.5.1']}
});

//* 5.6 Pour chaque tableau de données, chaque en-tête de colonnes et chaque en-tête de lignes sont-ils correctement déclarés ?
// 5.6.1 Pour chaque tableau de données, chaque en-tête de colonnes s'appliquant à la totalité de la colonne vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des en-têtes d\'une colonne complète d\'un tableau de données, mal déclarés.',
    query: 'table:not([role]) *[scope="col"], table:not([role]) *[scope="colgroup"], table:not([role]) *[id]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;

        var table = item.closest('table');

        //? header with SCOPE
        if(item.hasAttribute('scope')) {
            if(item.getAttribute('scope') === 'col' || item.getAttribute('scope') === 'colgroup') {
                if(item.tagName.toLowerCase() !== 'th') {
                    return !(item.hasAttribute('role') && item.getAttribute('role') === 'columnheader');
                } else return;
            }
        }

        //? if item is TH, columnheader or isn't cell, return
        if(item.tagName.toLowerCase() !== 'th' && item.tagName.toLowerCase() !== 'td') return;
        if(item.tagName.toLowerCase() === 'th') return;
        if(item.hasAttribute('role') && item.getAttribute('role') === 'columnheader') return;


        //? header with ID
        //? check if this ID corresponding with headers attribute
        var headersList = table.querySelectorAll('*[headers]');
        var headers = [];

        for(var i = 0; i < headersList.length; i++) {
            var list = headersList[i].getAttribute('headers').split(' ');

            list.forEach(h => {
                if(!headers.includes(h)) {
                    headers.push(h);
                }
            });
        }

        if(!headers.includes(item.id)) return;

        //? get column's size & position
        var row = item.closest('tr');
        if(!row) return;

        var headerIndex = [];
        var p = 0;
        var siblings = row.children;

        for(var x = 0; x < siblings.length; x++) {
            if(siblings[x] != item) {
                if(siblings[x].hasAttribute('colspan') && siblings[x].getAttribute('colspan') > 0) {
                    p = p + parseInt(siblings[x].getAttribute('colspan'));
                } else p++;
            } else break;
        }

        if(item.hasAttribute('colspan') && item.getAttribute('colspan') > 0) {
            var size = parseInt(item.getAttribute('colspan'));

            for(var x = p; x < size+p; x++) {
                headerIndex.push(x+1);
            }
        } else {
            headerIndex.push(p+1);
        }

        //? check if all cells in the column has headers attribute corresponding to the item(header) ID
        var cells = table.querySelectorAll('th, td');
        var columnHeader = true;

        cells.forEach(cell => {
            var cellIndex = [];
            var rowC = cell.closest('tr');
            var pC = 0;
            var siblingsC = rowC.children;

            for(var x = 0; x < siblingsC.length; x++) {
                if(siblingsC[x] != cell) {
                    if(siblingsC[x].hasAttribute('colspan') && siblingsC[x].getAttribute('colspan') > 0) {
                        pC = pC + parseInt(siblingsC[x].getAttribute('colspan'));
                    } else pC++;
                } else break;
            }

            if(cell.hasAttribute('colspan') && cell.getAttribute('colspan') > 0) {
                var sizeC = parseInt(cell.getAttribute('colspan'));

                for(var x = pC; x < sizeC+pC; x++) {
                    cellIndex.push(x+1);
                }
            } else {
                cellIndex.push(pC+1);
            }

            if(cellIndex.some(n => headerIndex.includes(n)) && cell != item) {
                if(cell.hasAttribute('headers')) {
                    columnHeader = cell.getAttribute('headers').match(item.id) ? columnHeader : false;
                } else if(!cell.hasAttribute('headers')) {
                    columnHeader = false;
                }
            }
        });

        return columnHeader;

        // else if(item.hasAttribute('role') && item.getAttribute('role') === 'table') {
        //     var ch = item.querySelectorAll('*[role="columnheader"]');
        //     if(ch.length === 0) {
                // verifier que l'on a pas d'en-tête appliqué à toute une colonne mis en place avec aria-labelledby
            // } else {
                // c'est ok
        //     }
        // }

    },
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des en-têtes d\'une colonne complète d\'un tableau de données, correctement déclarés.',
    query: 'table:not([role]) *[scope="col"], table:not([role]) *[scope="colgroup"], table:not([role]) *[id]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;

        var table = item.closest('table');

        //? header with SCOPE
        if(item.hasAttribute('scope')) {
            if(item.getAttribute('scope') === 'col' || item.getAttribute('scope') === 'colgroup') {
                item.setAttribute('data-tng-table', 'headerColFull');
                if(item.tagName.toLowerCase() !== 'th') {
                    return item.hasAttribute('role') && item.getAttribute('role') === 'columnheader';
                } else return true;
            }
        }

        //? if item isn't cell return
        if(item.tagName.toLowerCase() !== 'th' && item.tagName.toLowerCase() !== 'td') return;

        //? header with ID
        //? check if this ID corresponding with headers attibute
        var headersList = table.querySelectorAll('*[headers]');
        var headers = [];

        for(var i = 0; i < headersList.length; i++) {
            var list = headersList[i].getAttribute('headers').split(' ');

            list.forEach(h => {
                if(!headers.includes(h)) {
                    headers.push(h);
                }
            });
        }

        if(!headers.includes(item.id)) return;

        //? get column's size & position
        var row = item.closest('tr');
        if(!row) return;

        var headerIndex = [];
        var p = 0;
        var siblings = row.children;

        for(var x = 0; x < siblings.length; x++) {
            if(siblings[x] != item) {
                if(siblings[x].hasAttribute('colspan') && siblings[x].getAttribute('colspan') > 0) {
                    p = p + parseInt(siblings[x].getAttribute('colspan'));
                } else p++;
            } else break;
        }

        if(item.hasAttribute('colspan') && item.getAttribute('colspan') > 0) {
            var size = parseInt(item.getAttribute('colspan'));

            for(var x = p; x < size+p; x++) {
                headerIndex.push(x+1);
            }
        } else {
            headerIndex.push(p+1);
        }

        //? check if all cells in the column has headers attribute corresponding to the item(header) ID
        var cells = table.querySelectorAll('th, td');
        var columnHeader = true;

        cells.forEach(cell => {
            var cellIndex = [];
            var rowC = cell.closest('tr');
            var pC = 0;
            var siblingsC = rowC.children;

            for(var x = 0; x < siblingsC.length; x++) {
                if(siblingsC[x] != cell) {
                    if(siblingsC[x].hasAttribute('colspan') && siblingsC[x].getAttribute('colspan') > 0) {
                        pC = pC + parseInt(siblingsC[x].getAttribute('colspan'));
                    } else pC++;
                } else break;
            }

            if(cell.hasAttribute('colspan')&& cell.getAttribute('colspan') > 0) {
                var sizeC = parseInt(cell.getAttribute('colspan'));

                for(var x = pC; x < sizeC+pC; x++) {
                    cellIndex.push(x+1);
                }
            } else {
                cellIndex.push(pC+1);
            }

            if(cellIndex.some(n => headerIndex.includes(n)) && cell != item) {
                if(cell.hasAttribute('headers')) {
                    columnHeader = cell.getAttribute('headers').match(item.id) ? columnHeader : false;
                } else if(!cell.hasAttribute('headers')) {
                    columnHeader = false;
                }
            }
        });

        if(columnHeader) {
            item.setAttribute('data-tng-table', 'headerColFull');
            if(item.tagName.toLowerCase() !== 'th') {
                return item.hasAttribute('role') && item.getAttribute('role') === 'columnheader';
            } else return true;
        }

        else item.setAttribute('data-tng-table', 'headerColPart');
    },
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.1']}
});

// 5.6.2 Pour chaque tableau de données, chaque en-tête de lignes s'appliquant à la totalité de la ligne vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des en-têtes d\'une ligne complète d\'un tableau de données, mal déclarés.',
    query: 'table:not([role]) *[scope="row"], table:not([role]) *[scope="rowgroup"], table:not([role]) *[id]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;

        var table = item.closest('table');

        //? header with SCOPE
        if(item.hasAttribute('scope')) {
            if(item.getAttribute('scope') === 'row' || item.getAttribute('scope') === 'rowgroup') {
                if(item.tagName.toLowerCase() !== 'th') {
                    return !(item.hasAttribute('role') && item.getAttribute('role') === 'rowheader');
                } else return;
            }
        }

        //? if item is TH, rowheader or isn't cell, return
        if(item.tagName.toLowerCase() !== 'th' && item.tagName.toLowerCase() !== 'td') return;
        if(item.tagName.toLowerCase() === 'th') return;
        if(item.hasAttribute('role') && item.getAttribute('role') === 'rowheader') return;

        //? header with ID
        //? check if this ID corresponding with headers attribute
        var headersList = table.querySelectorAll('*[headers]');
        var headers = [];

        for(var i = 0; i < headersList.length; i++) {
            var list = headersList[i].getAttribute('headers').split(' ');

            list.forEach(h => {
                if(!headers.includes(h)) {
                    headers.push(h);
                }
            });
        }

        if(!headers.includes(item.id)) return;

        //? get row's size & all its cells
        var rows = table.querySelectorAll('tr');
        var cells = [];
        var currentRow = item.closest('tr');
        if(!currentRow) return;
        currentRow.setAttribute('data-row-tng', true);

        if(item.hasAttribute('rowspan') && parseInt(item.getAttribute('rowspan')) > 1) {
            var size = parseInt(item.getAttribute('rowspan'));

            for(var i = 0; i < rows.length; i++) {
                if(rows[i] === currentRow) {
                    for(var x = 1; x < size; x++) {
                        rows[i+x].setAttribute('data-row-tng', true);
                    }
                }
            }
        }

        var cells = table.querySelectorAll('[data-row-tng=true] th, [data-row-tng=true] td');
        var rowHeader = true;
        
        //? check if all cells in the row has headers attribute corresponding to the item(header) ID
        cells.forEach(cell => {
            if(cell != item) {
                rowHeader = cell.hasAttribute('headers') && cell.getAttribute('headers').match(item.id) ? rowHeader : false;
            }
        });

        rows.forEach(e => {
            e.removeAttribute('data-row-tng');
        });

        return rowHeader;
    },
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des en-têtes d\'une ligne complète d\'un tableau de données, correctement déclarés.',
    query: 'table:not([role]) *[scope="row"], table:not([role]) *[scope="rowgroup"], table:not([role]) *[id]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;

        var table = item.closest('table');

        //? header with SCOPE
        if(item.hasAttribute('scope')) {
            if(item.getAttribute('scope') === 'row' || item.getAttribute('scope') === 'rowgroup') {
                item.setAttribute('data-tng-table', 'headerRowFull');
                if(item.tagName.toLowerCase() !== 'th') {
                    return item.hasAttribute('role') && item.getAttribute('role') === 'rowheader';
                } else return true;
            }
        }

        //? if item isn't cell, return
        if(item.tagName.toLowerCase() !== 'th' && item.tagName.toLowerCase() !== 'td') return;

        //? header with ID
        //? check if this ID corresponding with headers attribute
        var headersList = table.querySelectorAll('*[headers]');
        var headers = [];

        for(var i = 0; i < headersList.length; i++) {
            var list = headersList[i].getAttribute('headers').split(' ');

            list.forEach(h => {
                if(!headers.includes(h)) {
                    headers.push(h);
                }
            });
        }

        if(!headers.includes(item.id)) return;

        //? get row's size & all its cells
        var rows = table.querySelectorAll('tr');
        var cells = [];
        var currentRow = item.closest('tr');
        if(!currentRow) return;
        currentRow.setAttribute('data-row-tng', true);

        if(item.hasAttribute('rowspan') && parseInt(item.getAttribute('rowspan')) > 1) {
            var size = parseInt(item.getAttribute('rowspan'));

            for(var i = 0; i < rows.length; i++) {
                if(rows[i] === currentRow) {
                    for(var x = 1; x < size; x++) {
                        rows[i+x].setAttribute('data-row-tng', true);
                    }
                }
            }
        }

        var cells = table.querySelectorAll('[data-row-tng=true] th, [data-row-tng=true] td');
        var rowHeader = true;

        //? check if all cells in the row has headers attribute corresponding to the item(header) ID
        cells.forEach(cell => {
            if(cell != item) {
                rowHeader = cell.hasAttribute('headers') && cell.getAttribute('headers').match(item.id) ? rowHeader : false;
            }
        });

        rows.forEach(e => {
            e.removeAttribute('data-row-tng');
        });

        if(rowHeader) {
            item.setAttribute('data-tng-table', 'headerRowFull');
            if(item.tagName.toLowerCase() !== 'th') {
                return item.hasAttribute('role') && item.getAttribute('role') === 'rowheader';
            } else return true;
        }

        else item.setAttribute('data-tng-table', 'headerRowPart');
    },
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.2']}
});

// 5.6.3 Pour chaque tableau de données, chaque en-tête ne s'appliquant pas à la totalité de la ligne ou de la colonne est-il structuré au moyen d'une balise <th> ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes ne s'appliquant pas à la totalité de la ligne ou de la colonne mal structurés.",
    description: "Ces en-têtes devraient être structurés au moyen d'une balise th.",
    query: '*[data-tng-table="headerColPart"], *[data-tng-table="headerRowPart"]',
    expectedNbElements: 0,
    filter: function(item) {
        return item.tagName.toLowerCase() != 'th';
    },
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.3']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes ne s'appliquant pas à la totalité de la ligne ou de la colonne correctement structurés.",
    query: 'th[data-tng-table="headerColPart"], th[data-tng-table="headerRowPart"]',
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.3']}
});

// 5.6.4 Pour chaque tableau de données, chaque cellule associée à plusieurs en-têtes est-elle structurée au moyen d’une balise <td> ou <th> ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des cellules d'un tableau de données associées à plusieurs en-têtes, mal balisées.",
	query: '*[headers]',
    expectedNbElements: 0,
	filter: function (item) {
		if(item.isNotExposedDueTo.length > 0) return;

        var table = item.closest('table');
        if(!table) return;
        var headers = item.getAttribute('headers').split(' ');
        var count = 0;

        for(var i = 0; i < headers.length; i++) {
            var id = document.getElementById(headers[i]);

            if(id) {
                count = id.closest('table') == table ? count+1 : count;
            }
        }

        if(count > 1) {
            return item.tagName.toLowerCase() !== 'td' && item.tagName.toLowerCase() !== 'th';
        }
	},
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.4']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des cellules d'un tableau de données associées à plusieurs en-têtes, correctement balisées.",
	query: '*[headers]',
	filter: function (item) {
		if(item.isNotExposedDueTo.length > 0) return;

        var table = item.closest('table');
        if(!table) return;
        var headers = item.getAttribute('headers').split(' ');
        var count = 0;

        for(var i = 0; i < headers.length; i++) {
            var id = document.getElementById(headers[i]);

            if(id) {
                count = id.closest('table') == table ? count+1 : count;
            }
        }

        if(count > 1) {
            return item.tagName.toLowerCase() === 'td' || item.tagName.toLowerCase() === 'th';
        }
	},
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.4']}
});

//* 5.7 Pour chaque tableau de données, la technique appropriée permettant d'associer chaque cellule avec ses en-têtes est-elle utilisée (hors cas particuliers) ?
// 5.7.1 Pour chaque contenu de balise <th> s'appliquant à la totalité de la ligne ou de la colonne, la balise <th> respecte-t-elle une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes de tableau s'appliquant à toute une ligne ou colonne mal associés aux cellules.",
	query: 'th[data-tng-table="headerColFull"], th[data-tng-table="headerRowFull"]',
    expectedNbElements: 0,
	filter: function (item) {
		if(item.hasAttribute('scope')) return;

        if(item.hasAttribute('role')) {
            let role = item.getAttribute('role');
            if(role === 'rowheader' || role === 'columnheader') {
                return;
            }
        }

        if(item.id.trim().length > 0) {
            let id = item.id;
            item.id = "";
            if(!document.getElementById(id)) {
                item.id = id;
                return;
            }
            item.id = id;
        }

        return true;
	},
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes de tableau s'appliquant à toute une ligne ou colonne correctement associés aux cellules.",
	query: 'th[data-tng-table="headerColFull"], th[data-tng-table="headerRowFull"]',
	filter: function (item) {
		if(item.hasAttribute('scope')) return true;

        if(item.hasAttribute('role')) {
            let role = item.getAttribute('role');
            if(role === 'rowheader' || role === 'columnheader') {
                return true;
            }
        }

        if(item.id.trim().length > 0) {
            let id = item.id;
            item.id = "";
            if(!document.getElementById(id)) {
                item.id = id;
                return true;
            }
            item.id = id;
        }
	},
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.1']}
});

// 5.7.2 Pour chaque contenu de balise <th> s'appliquant à la totalité de la ligne ou de la colonne et possédant un attribut scope, la balise <th> vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "En-têtes de tableau associant les cellules de sa ligne ou colonne avec un attribut scope valide.",
	query: 'th[scope]',
	filter: function (item) {
		var row = item.parentNode;
        if(row.querySelectorAll('th').length === 1 && row.querySelectorAll('td').length > 0) {
            return item.getAttribute('scope') === 'row';
        }

        if(row.querySelectorAll('td').length === 0) {
            return item.getAttribute('scope') === 'col';
        }
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['scope']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.2']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "En-têtes de tableau associant les cellules de sa ligne ou colonne avec un attribut scope invalide.",
	query: 'th[scope]',
    expectedNbElements: 0,
	filter: function (item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }
		var scope = item.getAttribute('scope');
        return scope != 'row' && scope != 'col';
	},
    mark: {attrs: ['scope']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.2']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "En-têtes de tableau associant les cellules de sa ligne ou colonne avec un attribut scope.",
	query: 'th[scope]',
    description: "Vérifier la pertinence de l'attribut scope.",
	filter: function (item) {
		var row = item.parentNode;
        if(row.querySelectorAll('th').length === 1 && row.querySelectorAll('td').length > 0 && item.getAttribute('scope') === 'row') {
            return;
        }

        if(row.querySelectorAll('td').length === 0 && item.getAttribute('scope') === 'col') {
            return;
        }

        var scope = item.getAttribute('scope');
        return scope === 'row' || scope === 'col';
	},
    mark: {attrs: ['scope']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.2']}
});

// 5.7.3  Pour chaque contenu de balise <th> ne s'appliquant pas à la totalité de la ligne ou de la colonne, la balise <th> vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes de tableau ne s'appliquant pas à toute une ligne ou colonne mal associés aux cellules.",
	query: 'th[data-tng-table="headerColPart"], th[data-tng-table="headerRowPart"]',
    expectedNbElements: 0,
	filter: function (item) {
		if(item.hasAttribute('scope')) return true;

        if(item.hasAttribute('role')) {
            let role = item.getAttribute('role');
            if(role === 'rowheader' || role === 'columnheader') {
                return true;
            }
        }

        if(item.id.trim().length > 0) {
            let id = item.id;
            item.id = "";
            if(document.getElementById(id)) {
                item.id = id;
                return true;
            }
            item.id = id;
        }
	},
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.3']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes de tableau ne s'appliquant pas à toute une ligne ou colonne correctement associés aux cellules.",
	query: 'th[data-tng-table="headerColPart"], th[data-tng-table="headerRowPart"]',
	filter: function (item) {
		if(item.hasAttribute('scope')) return;

        if(item.hasAttribute('role')) {
            let role = item.getAttribute('role');
            if(role === 'rowheader' || role === 'columnheader') {
                return;
            }
        }

        if(item.id.trim().length > 0) {
            let id = item.id;
            item.id = "";
            if(document.getElementById(id)) {
                item.id = id;
                return;
            }
            item.id = id;
        }

        return true;
	},
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.3']}
});

// 5.7.4 Pour chaque contenu de balise <td> ou <th> associée à un ou plusieurs en-têtes possédant un attribut id, la balise vérifie-t-elle ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "L'attribut Headers spécifié sur une cellule fait référence à des en-têtes du même élément de tableau.",
	query: 'table td[headers], table th[headers]',
	filter: function (item) {
		var headers = item.getAttribute('headers');
		if (/^.+(\s.+)*$/.test(headers)) {
			headers = headers.split(' ');
			if (headers.length > 1) {
				var result = true;
				for (var i = 0; i < headers.length; i++) {
					var th = document.getElementById(headers[i]);;
					result = th ? th.closest('table') == item.closest('table') : false;
					if (!result) {
						break;
					}
				}
				return result;
			}
			else {
				var th = document.getElementById(headers[0]);
				return th ? th.closest('table') == item.closest('table') : false;
			}
		}
		else {
			return false;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.4']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "L'attribut Headers spécifié sur une cellule ne fait pas référence à des en-têtes du même élément de tableau.",
	query: 'table td[headers], table th[headers]',
    expectedNbElements: 0,
	filter: function (item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }
		var headers = item.getAttribute('headers');
		if (/^.+(\s.+)*$/.test(headers)) {
			headers = headers.split(' ');
			if (headers.length > 1) {
				var result = true;
				for (var i = 0; i < headers.length; i++) {
					var th = document.getElementById(headers[i]);
					result = th ? th.closest('table') == item.closest('table') : false;
					if (!result) {
						break;
					}
				}
				return !result;
			}
			else {
				var th = document.getElementById(headers[0]);
				return th ? th.closest('table') != item.closest('table') : true;
			}
		}
		else {
			return false;
		}
	},
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.4']}
});

// 5.7.5 Pour chaque balise pourvue d'un attribut WAI-ARIA role="rowheader" ou role="columnheader" dont le contenu s'applique à la totalité de la ligne ou de la colonne, la balise vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes ARIA s'appliquant à toute une ligne ou colonne mal renseignés.",
	query: '[role="rowheader"][data-tng-table="headerColFull"], [role="columnheader"][data-tng-table="headerRowFull"]',
    expectedNbElements: 0,
    mark: {attrs: ['role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.5']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des en-têtes ARIA s'appliquant à toute une ligne ou colonne correctement renseignés.",
	query: '[role="columnheader"][data-tng-table="headerColFull"], [role="rowheader"][data-tng-table="headerRowFull"]',
    analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
    mark: {attrs: ['role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.5']}
});

//* 5.8 Chaque tableau de mise en forme ne doit pas utiliser d'éléments propres aux tableaux de données. Cette règle est-elle respectée ?
// 5.8.1 Chaque tableau de mise en forme (balise <table>) vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des tableaux de mise en forme utilisant des éléments propre aux tableaux de données.",
	query: 'table[role="presentation"]',
    expectedNbElements: 0,
	filter: function (item) {
        if(item.isNotExposedDueTo.length > 0 && !item.isVisible) {
            return;
        }

		if(item.hasAttribute('summary') && getAttribute('summary').length > 0) {
            return true;
        }

        if(item.querySelectorAll('caption, th, thead, tfoot, colgroup, [role="rowheader"], [role="columnheader"], td[scope], td[headers], td[axis]').length > 0) {
            return true;
        }
	},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.8.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des tableaux de mise en forme n\'utilisant aucun élément propre aux tableaux de données.",
	query: 'table[role="presentation"]',
	filter: function (item) {
		if(item.hasAttribute('summary') && getAttribute('summary').length > 0) {
            return false;
        }

        if(item.querySelectorAll('caption, th, thead, tfoot, colgroup, [role="rowheader"], [role="columnheader"], td[scope], td[headers], td[axis]').length > 0) {
            return false;
        }

        return true;
	},
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.8.1']}
});

/**
 *? LIENS
 */

//* 6.1 Chaque lien est-il explicite (hors cas particuliers) ?
// 6.1.1 Pour chaque lien texte l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens texte sans nom accessible',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], canvas') == null) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens texte visibles non restitués',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length != 0 && item.isVisible;
        }
    },
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens texte non visibles non restitués',
    query: 'a[href], [role="link"]',
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length != 0 && !item.isVisible;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens texte avec un nom accessible',
    query: 'a[href], [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles des liens',
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], canvas') == null) {
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

// 6.1.2 Pour chaque lien image l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images sans nom accessible',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent == "")) {
            var images = item.querySelectorAll('img, [role="img"], svg, object[type="image"], canvas');
            var linkName = false;
            var i = 0;
            while(images[i] && !linkName) {
                if(images[i].hasAccessibleName()) {
                    linkName = true;
                }
                i++;
            }
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName() && !linkName;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images visibles non restitués',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length != 0 && item.isVisible;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images non visibles non restitués',
    query: 'a[href], [role="link"]',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length != 0 && !item.isVisible;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images avec un nom accessible',
    query: 'a[href], [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles des images',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent == "")) {
            var images = item.querySelectorAll('img, [role="img"], svg, object[type="image"], canvas');
            var linkName = false;
            var i = 0;
            while(images[i] && !linkName) {
                if(images[i].hasAccessibleName()) {
                    linkName = true;
                }
                i++;
            }
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName() && linkName;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

// 6.1.3 Pour chaque lien composite l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens composites sans nom accessible',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            var children = item.childNodes;
            var linkName = false;
            var i = 0;
            while(children[i] && !linkName) {
                if(children[i].nodeType === 1 && children[i].hasAccessibleName()) {
                    linkName = true;
                }
                i++;
            }
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName() && !linkName;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens composites visibles non restitués',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            return item.isNotExposedDueTo.length != 0 && item.isVisible;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens composites non visibles non restitués',
    query: 'a[href], [role="link"]',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            return item.isNotExposedDueTo.length != 0 && !item.isVisible;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens composites avec un nom accessible',
    query: 'a[href], [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles.',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            var children = item.childNodes;
            var linkName = false;
            var i = 0;
            while(children[i] && !linkName) {
                if(children[i].nodeType === 1 && children[i].hasAccessibleName()) {
                    linkName = true;
                }
                i++;
            }
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName() && linkName;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

// 6.1.4 Pour chaque lien SVG l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens SVG sans nom accessible',
    query: 'svg a[href], svg [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens SVG visibles non restitués',
    query: 'svg a[href], svg [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length != 0 && item.isVisible;
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens SVG non visibles non restitués',
    query: 'svg a[href], svg [role="link"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length != 0 && !item.isVisible;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'inapplicable';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens SVG avec un nom accessible',
    query: 'svg a[href], svg [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles.',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

// 6.1.5 Pour chaque lien ayant un intitulé visible, le nom accessible du lien contient-il au moins l'intitulé visible (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens ayant un intitulé visible non repris dans le nom accessible.',
    query: 'a[href], [role="link"], svg a[href], svg [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isVisible && item.innerText) {
            var linkName = item.innerText.trim().replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var linkAccessibleName = item.accessibleName.replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var regex = new RegExp(linkName, 'mi');
            
            return item.isNotExposedDueTo.length == 0 && !linkAccessibleName.match(regex);
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.5']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens ayant un intitulé visible bien repris dans le nom accessible.',
    query: 'a[href], [role="link"], svg a[href], svg [role="link"]',
    filter: function (item) {
        if(item.isVisible && item.innerText) {
            var linkName = item.innerText.trim().replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var linkAccessibleName = item.accessibleName.replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var regex = new RegExp(linkName, 'mi');

            return item.isNotExposedDueTo.length == 0 && linkAccessibleName.match(regex);
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.5']}
});

//* 6.2 Dans chaque page web, chaque lien a-t-il un intitulé ?
// 6.2.1 Dans chaque page web, chaque lien a-t-il un intitulé entre <a> et </a> ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens sans intitulé entre <a> et </a>.',
    query: 'a[href], [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.innerText && item.innerText.trim().length > 0) {
            return;
        }

        if(item.isVisible) {
            return item.querySelectorAll('img, [role="img"], object, canvas, svg').length === 0;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens avec un intitulé entre <a> et </a>.',
    query: 'a[href], [role="link"]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0 || item.isVisible) {
            if(item.innerText && item.innerText.trim().length > 0) {
                return true;
            }
    
            if(item.isVisible) {
                return item.querySelectorAll('img, [role="img"], object, canvas, svg').length > 0;
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.2.1']}
});

/**
 *? SCRIPTS
 ** tous les tests sont répertoriés
 ** 7.1 & 7.2 implémentation partielle
 *TODO implémenter les modèles de conception dans le script content.js
 */
// 7.1 Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ?
// 7.1.1 Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Boutons visibles ou restitués sans nom accessible.',
	query: 'button:not([role]), button[role="none"], [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role]), input[type="button"]:not([role])',
	expectedNbElements: 0,
    explanations: {
		'passed': "Cette page ne contient pas de bouton visible sans nom accessible.",
		'failed': "Des boutons visibles sans nom accessible sont présents dans la page."
	},
	filter: function (item) {
        if((item.isVisible || item.isNotExposedDueTo.length === 0) && !item.disabled) {
            if(item.matches('input[type="reset"]:not([value]), input[type="submit"]:not([value])')) return;
            return !item.hasAccessibleName();
        }
	},
	tags: ['a11y', 'buttons', 'accessiblename'],
	ressources: {'rgaa': ['7.1.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Boutons visibles ou restitués avec un nom accessible.',
	query: 'button:not([role]), button[role="none"], [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role]), input[type="button"]:not([role])',
	filter: function (item) {
        if(item.isVisible || item.isNotExposedDueTo.length === 0) {
            if(item.matches('input[type="reset"]:not([value]), input[type="submit"]:not([value])')) return true;
            return item.hasAccessibleName();
        }
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'buttons', 'accessiblename'],
	ressources: {'rgaa': ['7.1.1']}
});

// 7.1.2 Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque script qui génère ou contrôle un composant d'interface doit être correctement restitué par les technologies d'assistance.",
    status: 'untested',
	tags: ['a11y', 'accessiblename'],
	ressources: {'rgaa': ['7.1.2']}
});

// 7.1.3 Chaque script qui génère ou contrôle un composant d'interface vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque script qui génère ou contrôle un composant d'interface doit avoir un nom pertinent et accessible.",
    status: 'untested',
	tags: ['a11y', 'accessiblename'],
	ressources: {'rgaa': ['7.1.3']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque script qui génère ou contrôle un composant d'interface doit avoir un rôle pertinent.",
    status: 'untested',
	tags: ['a11y', 'accessiblename'],
	ressources: {'rgaa': ['7.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des boutons ayant un intitulé visible non repris dans le nom accessible.',
    query: 'button:not([role]), button[role="none"], [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role]), input[type="button"]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.closest('form')) return;
        if(item.isVisible && (item.innerText || item.value) && !item.disabled) {
            var visibleName = item.innerText ? item.innerText : item.value;
            var buttonName = visibleName.trim().replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var buttonAccessibleName = item.accessibleName.replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var regex = new RegExp(buttonName, 'mi');
            
            return item.isNotExposedDueTo.length == 0 && !buttonAccessibleName.match(regex);
        }
    },
    tags: ['a11y', 'accessiblename', 'buttons'],
    ressources: {'rgaa': ['7.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des boutons ayant un intitulé visible bien repris dans le nom accessible.',
    query: 'button:not([role]), button[role="none"], [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role]), input[type="button"]:not([role])',
    filter: function (item) {
        if(item.closest('form')) return;
        if(item.isVisible && (item.innerText || item.value)) {
            var visibleName = item.innerText ? item.innerText : item.value;
            var buttonName = visibleName.trim().replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var buttonAccessibleName = item.accessibleName.replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var regex = new RegExp(buttonName, 'mi');

            return item.isNotExposedDueTo.length == 0 && buttonAccessibleName.match(regex);
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'accessiblename', 'buttons'],
    ressources: {'rgaa': ['7.1.3']}
});

// 7.2 Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?
// 7.2.1 Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des alternatives de script dans des balises <noscript>.',
    description: 'Vérifier la pertinence de l\'alternative.',
	query: 'noscript',
	tags: ['a11y', 'accessiblename'],
	ressources: {'rgaa': ['7.2.1']}
});

// 7.2.2 Chaque élément non textuel mis à jour par un script (dans la page, ou dans un cadre) et ayant une alternative vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque élément non textuel mis à jour par un script (dans la page, ou dans un cadre) et ayant une alternative, l'aternative doit être mise à jour de façon pertinente.",
    status: 'untested',
	tags: ['a11y', 'accessiblename'],
	ressources: {'rgaa': ['7.2.2']}
});

//* 7.3 Chaque script est-il contrôlable par le clavier et par tout dispositif de pointage (hors cas particuliers) ?
// 7.3.1 Chaque élément possédant un gestionnaire d'événement contrôlé par un script vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque élément possédant un gestionnaire d'événement contrôlé par un script, l'élément doit être contrôlable par le clavier et tout dispositif de pointage.",
    status: 'untested',
	tags: ['a11y', 'keyboard'],
	ressources: {'rgaa': ['7.3.1']}
});

// 7.3.2 Un script ne doit pas supprimer le focus d'un élément qui le reçoit. Cette règle est-elle respectée (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Un script ne doit pas supprimer le focus d'un élément qui le reçoit.",
    status: 'untested',
	tags: ['a11y', 'keyboard'],
	ressources: {'rgaa': ['7.3.2']}
});

//* 7.4 Pour chaque script qui initie un changement de contexte, l'utilisateur est-il averti ou en a-t-il le contrôle ?
// 7.4.1 Chaque script qui initie un changement de contexte vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque script qui initie un changement de contexte, l'utilisateur doit être averti ou en avoir le contrôle.",
    status: 'untested',
	tags: ['a11y'],
	ressources: {'rgaa': ['7.4.1']}
});

//* 7.5 Dans chaque page web, les messages de statut sont-ils correctement restitués par les technologies d'assistance ?
// 7.5.1 Chaque message de statut qui informe de la réussite, du résultat d'une action ou bien de l'état d'une application utilise-t-il l'attribut WAI-ARIA role="status" ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Chaque message de statut qui informe de la réussite, du résultat d\'une action ou bien de l\'état d\'une application doit utiliser l\'attribut WAI-ARIA role="status".',
    status: 'untested',
	tags: ['a11y'],
	ressources: {'rgaa': ['7.5.1']}
});

// 7.5.2 Chaque message de statut qui présente une suggestion, ou avertit de l'existence d'une erreur utilise-t-il l'attribut WAI-ARIA role="alert" ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Chaque message de statut qui présente une suggestion, ou avertit de l\'existence d\'une erreur doit utiliser l\'attribut WAI-ARIA role="alert".',
    status: 'untested',
	tags: ['a11y'],
	ressources: {'rgaa': ['7.5.2']}
});

// 7.5.3 Chaque message de statut qui indique la progression d'un processus utilise-t-il l'un des attributs WAI-ARIA role="log", role="progressbar" ou role="status" ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Chaque message de statut qui indique la progression d\'un processus doit utiliser l\'un des attributs WAI-ARIA role="log", role="progressbar" ou role="status".',
    status: 'untested',
	tags: ['a11y'],
	ressources: {'rgaa': ['7.5.3']}
});

/**
 *? ELEMENTS OBLIGATOIRES
 ** tous les tests sont répertoriés
 ** 8.3 si l'élément <html> n'a pas d'attribut lang, vérifier que la langue est renseignée pour chaque noeud texte et attribut dont le contenu est affiché ou lu par les lecteurs d'écran
 ** 8.9.1 voir si l'on peut étoffer
 *TODO 8.2 implémenter spec HTML dans le script content.js
 */

//* 8.1 Chaque page web est-elle définie par un type de document ?
// 8.1.1 Pour chaque page web, le type de document (balise doctype) est-il présent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Le type de document (balise doctype) est présent sur la page.',
    node: document.doctype,
    expectedNbElements: 1,
    explanations: {
        'passed': "Cette page possède bien une balise doctype.",
		'failed': "Cette page n'a pas de balise doctype."
    },
    tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.1.1']}
});

// 8.1.2 Pour chaque page web, le type de document (balise doctype) est-il valide ?
// https://www.w3.org/QA/2002/04/valid-dtd-list.html
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Le type de document (balise doctype) est valide.',
    node: document.doctype,
    analyzeElements: function(collection) {
        for (var i = 0; i < collection.length; i++) {
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
    tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.1.2']}
});

// 8.1.3 Pour chaque page web possédant une déclaration de type de document, celle-ci est-elle située avant la balise <html> dans le code source ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Le type de document est déclaré avant l\'ouverture de la balise html.',
    node: document.doctype,
    analyzeElements: function(collection) {
        for (var i = 0; i < collection.length; i++) {
            var sibling = collection[i].nextSibling;
			if(sibling && sibling.tagName && sibling.tagName.toLowerCase() === 'html') {
                collection[i].status = 'passed';
            } else {
                collection[i].status = 'failed';
            }
		}
    },
    tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.1.1']}
});

//* 8.2 Pour chaque page web, le code source généré est-il valide selon le type de document spécifié ?
// 8.2.1 Pour chaque déclaration de type de document, le code source généré de la page vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Valeurs d\'attribut id dupliqués dans la page',
    code: 'duplicate_id',
    expectedNbElements: 0,
    explanations: {
        'passed': "Cette page ne contient pas d'attribut ID dupliqué'.",
		'failed': "Des attributs ID dupliqués sont présents dans la page."
    },
    mark: { attrs: ['id'] },
    tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Attributs role avec une valeur invalide',
	query: '[role]',
	expectedNbElements: 0,
    explanations: {
        'passed': "Cette page ne contient pas d'attribut role avec une valeur invalide'.",
		'failed': "Des attributs role avec une valeur invalide sont présents dans la page."
    },
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (item.getAttribute('role').trim() == 0) {
				return false;
			}
			return !item.hasValidRole();
		}
		return false;
	},
    tags: ['a11y', 'aria', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Attributs role avec une valeur valide',
	query: '[role]',
	filter: function (item) {
		return item.isNotExposedDueTo.length == 0 ? item.hasValidRole() : false;
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
		}
	},
	tags: ['a11y', 'aria', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Attributs aria-* non définis dans WAI-ARIA.',
	query: '*',
    expectedNbElements: 0,
    explanations: {
        'passed': 'Tous les attributs aria-* trouvés sur cette page sont bien définis dans WAI-ARIA.',
        'failed': 'Des attributs aria-* non définis dans WAI-ARIA ont été trouvé sur cette page.'
    },
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
            var attributes = Array.from(item.attributes);
            var definedStatesProperties = ARIA.getAllStatesProperties('js');
            for (var a = 0; a < attributes.length; a++) {
				if (/^aria-.*$/.test(attributes[a].nodeName)) {
					if (definedStatesProperties.indexOf(attributes[a].nodeName) == -1) {
						return true;
					}
				}
			}
		}
	},
	tags: ['a11y', 'aria', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Attributs aria-* définis dans WAI-ARIA.',
	query: '*',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
            var attributes = Array.from(item.attributes);
            var definedStatesProperties = ARIA.getAllStatesProperties('js');
            var ariaAttributes = false;
            for (var a = 0; a < attributes.length; a++) {
				if (/^aria-.*$/.test(attributes[a].nodeName)) {
					if (definedStatesProperties.indexOf(attributes[a].nodeName) == -1) {
						return false;
					}
                    ariaAttributes = true;
				}
			}
            return ariaAttributes;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
	},
	tags: ['a11y', 'aria', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Propiétés ARIA avec une valeur invalide.',
	query: '*',
	expectedNbElements: 0,
    explanations: {
        'passed': "Cette page ne contient pas de propriété ARIA avec une valeur invalide'.",
		'failed': "Des propriétés ARIA avec une valeur invalide sont présentes dans la page."
    },
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (Array.from(item.attributes).filter(function(attributeNode) { return /^aria-.*$/.test(attributeNode.nodeName); }).length > 0) {
				return item.hasAriaAttributesWithInvalidValues({ permissive: true });
			}
		}
		return false;
	},
	tags: ['a11y', 'aria', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Propriétés ARIA non autorisées sur leur élément.',
	query: '*',
	expectedNbElements: 0,
    explanations: {
        'passed': "Cette page ne contient pas de propriété ARIA non autorisée.",
		'failed': "Des propriétés ARIA non autorisées sont présentes dans la page."
    },
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			if (Array.from(item.attributes).filter(function(attributeNode) { return /^aria-.*$/.test(attributeNode.nodeName); }).length > 0) {
				return item.hasProhibitedAriaAttributes();
			}
		}
		return false;
	},
	tags: ['a11y', 'aria', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Imbrications de balises HTML non conformes.',
	query: 'form form, button a, a button, ul>a, ol>a, ul>h1, ul>h2, ul>h3, ul>h4, ul>h5, ul>h6, ol>h1, ol>h2, ol>h3, ol>h4, ol>h5, ol>h6, ul>p, ol>p, ul>span, ol>span, ul>div, ol>div, section main, header main, footer main',
	expectedNbElements: 0,
    explanations: {
        'passed': "Aucune imbrication de balises HTML non conforme n\'a été trouvé sur cette page.",
		'failed': "Des imbrications de balises HTML ne sont pas conformes sur cette page."
    },
	tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Le titre de la page doit être déclaré dans l'en-tête (balise head).",
	query: 'body title',
	expectedNbElements: 0,
	filter: function (item) {
		if(item.closest('svg')) return;
	},
	tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "La page web doit contenir un seul titre de page (balise title).",
	query: 'head title, body title',
	expectedNbElements: {max: 1},
	filter: function (item) {
		if(!item.closest('svg')) return true;
	},
	tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Le titre de page (balise title) ne doit pas être vide.",
	query: 'head title, body title',
	expectedNbElements: 0,
	filter: function (item) {
		if(!item.closest('svg')) return item.textContent.trim().length === 0;
	},
	tags: ['a11y', 'code'],
	ressources: {'rgaa': ['8.2.1']}
});

// 8.3.1 : Pour chaque page web, l'indication de langue par défaut vérifie-t-elle une de ces conditions ?
// incomplete (devrait gérer les attributs lang sur les éléments contenant du texte)
tanaguruTestsList.push({
    lang: 'fr',
    name: 'La langue de la page n\'est pas spécifiée.',
    expectedNbElements: 0,
    query: 'html:not([lang], [xml\\:lang])',
    tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.3.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La langue de la page est spécifiée.',
    query: 'html[lang], html[xml\\:lang]',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['lang', 'xml\\:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.3.1']}
});

//8.4.1 Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec un attribut lang vide.',
	query: 'html[lang], html[xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
        if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            return item.getAttribute('lang').length == 0;
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            return item.getAttribute('xml:lang').length == 0;
        } else {
            return item.getAttribute('lang').length == 0 || item.getAttribute('xml:lang').length == 0;
        }
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec un attribut lang non vide.',
	query: 'html[lang], html[xml\\:lang]',
	filter: function (item) {
		if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            return item.getAttribute('lang').length > 0;
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            return item.getAttribute('xml:lang').length > 0;
        } else {
            return item.getAttribute('lang').length > 0 || item.getAttribute('xml:lang').length > 0;
        }
	},
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Page HTML avec des attributs lang et xml:lang dont les valeurs ne correspondent pas.",
	query: 'html[lang][xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
        var lang1 = item.getAttribute('lang');
        var lang2 = item.getAttribute('xml:lang');
        if(lang1.length > 0 || lang2.length > 0) {
            var langA = lang1.includes('-') ? lang1.split('-')[0] : lang1;
            var langB = lang2.includes('-') ? lang2.split('-')[0] : lang2;
            return langA != langB;
        }
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec des attributs lang et xml:lang dont les valeurs correspondent."',
	query: 'html[lang][xml\\:lang]',
	filter: function (item) {
        var lang1 = item.getAttribute('lang');
        var lang2 = item.getAttribute('xml:lang');
        if(lang1.length > 0 || lang2.length > 0) {
            var langA = lang1.includes('-') ? lang1.split('-')[0] : lang1;
            var langB = lang2.includes('-') ? lang2.split('-')[0] : lang2;
            return langA == langB;
        }
	},
	analyzeElements: function (collection) {
		if (collection.length == 1) {
			collection[0].status = 'passed';
		}
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La langue de la page HTML est invalide.',
	query: 'html[lang], html[xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
        if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            if(item.getAttribute('lang').length === 0) {
                return false;
            }
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            if(item.getAttribute('xml:lang').length === 0) {
                return false;
            }
        } else if(item.getAttribute('lang').length === 0 && item.getAttribute('xml:lang').length === 0) {
            return false;
        }
		return !item.hasValidLanguageCode();
	},
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La langue de la page HTML est valide.',
	query: 'html[lang], html[xml\\:lang]',
	filter: function (item) {
		return item.hasValidLanguageCode();
	},
    analyzeElements: function(collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['lang', 'xml\\:lang']},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

//8.5.1 Chaque page web a-t-elle un titre de page (balise title) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'La page web a un titre de page (balise title).',
    query: 'head title, body title',
    expectedNbElements: {min: 1},
    explanations: {
        'passed': 'La page possède bien un titre de page.',
        'failed': 'Aucun titre de page n\'a été trouvé.'
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
    name: 'Vérifier la pertinence du titre de page (balise title).',
    query: 'head title, body title',
    filter: function(item) {
        if(item.closest('svg')) return;
        if(item.textContent.trim().length > 0) {
            let defaultTitles = [
                'document', 'untitled', 'sans titre', 'untitled document', 'document sans titre', 'no title', 'home', 'accueil'
            ];
            return !defaultTitles.includes(item.textContent.trim().toLowerCase());
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le titre de la page (balise title) n\'est pas pertinent',
    query: 'head title, body title',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.closest('svg')) return;
        if(item.textContent.trim().length > 0) {
            let defaultTitles = [
                'document', 'untitled', 'sans titre', 'untitled document', 'document sans titre', 'no title', 'home', 'accueil'
            ];
            return defaultTitles.includes(item.textContent.trim().toLowerCase());
        }
        return true;
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

//8.7.1 Dans chaque page web, chaque texte écrit dans une langue différente de la langue par défaut vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez que pour chaque texte écrit dans une langue différente de la langue par défaut le langage est correctement indiqué.',
    query: 'body [lang], body [xml\\:lang]',
    filter: function (item) {
        return (item.hasAttribute('lang')||item.hasAttribute('xml:lang'));
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'mandatory'],
    ressources: {'rgaa': ['8.7.1']}
});

//* 8.8 Dans chaque page web, le code de langue de chaque changement de langue est-il valide et pertinent ?
//8.8.1 Pour chaque page web, le code de langue de chaque changement de langue vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang vide.',
	query: 'body [lang], body [xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
        if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            if(item.getAttribute('lang').length === 0) {
                return true;
            }
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            if(item.getAttribute('xml:lang').length === 0) {
                return true;
            }
        } else if(item.getAttribute('lang').length === 0 || item.getAttribute('xml:lang').length === 0) {
            return true;
        }
	},
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang non vide.',
	query: 'body [lang], body [xml\\:lang]',
	filter: function (item) {
        if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            if(item.getAttribute('lang').length > 0) {
                return true;
            }
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            if(item.getAttribute('xml:lang').length > 0) {
                return true;
            }
        } else if(item.getAttribute('lang').length > 0 || item.getAttribute('xml:lang').length > 0) {
            return true;
        }
	},
    analyzeElements: function(collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang invalide.',
	query: 'body [lang], body [xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
        if(item.hasAttribute('lang') && !item.hasAttribute('xml:lang')) {
            if(item.getAttribute('lang').length === 0) {
                return false;
            }
        } else if (item.hasAttribute('xml:lang') && !item.hasAttribute('lang')) {
            if(item.getAttribute('xml:lang').length === 0) {
                return false;
            }
        } else if(item.getAttribute('lang').length === 0 && item.getAttribute('xml:lang').length === 0) {
            return false;
        }
		return !item.hasValidLanguageCode();
	},
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang valide.',
	query: 'body [lang], body [xml\\:lang]',
	filter: function (item) {
		return item.hasValidLanguageCode();
	},
    analyzeElements: function(collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['lang', 'xml:lang']},
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

//* 8.9 Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
// 8.9.1 Dans chaque page web les balises (à l'exception de <div>, <span> et <table>) ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les balises ne doivent pas être utilisées uniquement à des fins de présentation.',
    description: 'ne pas utiliser de double br pour créer des espaces entre les éléments textes',
    query: 'br + br',
    expectedNbElements: 0,
    filter: function (item) {
        var textBetween = item.previousSibling.nodeValue;
        textBetween = textBetween ? textBetween.trim().length : textBetween;
        if (!textBetween){
            return item.isNotExposedDueTo.length == 0;
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.9.1']}
});

//* 8.10 Dans chaque page web, les changements du sens de lecture sont-ils signalés ?
// 8.10.1 Dans chaque page web, chaque texte dont le sens de lecture est différent du sens de lecture par défaut est contenu dans une balise possédant un attribut dir ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Chaque texte dont le sens de lecture est différent du sens de lecture par défaut doit être contenu dans une balise possédant un attribut dir.",
    status: 'untested',
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.1']}
});

// 8.10.2 : Dans chaque page web, chaque changement du sens de lecture (attribut dir) vérifie-t-il ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Changements du sens de lecture (attribut dir) non conforme.',
    query: '[dir]',
    expectedNbElements: 0,
    filter: function (item) {
        var dirAttr = item.getAttribute('dir');
        return item.isNotExposedDueTo.length == 0 && !(dirAttr == 'ltr' || dirAttr == 'rtl');
    },
    mark: { attrs: ['dir']},
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Changements du sens de lecture (attribut dir) conforme.',
    description: "Vérifier la pertinence de la valeur de l'attribut dir.",
    query: '[dir]',
    filter: function (item) {
        var dirAttr = item.getAttribute('dir');
        return item.isNotExposedDueTo.length == 0 && (dirAttr == 'ltr' || dirAttr == 'rtl');
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['dir']},
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.10.2']}
});

/**
 *? STRUCTURATION DE L'INFORMATION
 ** tous les tests sont répertoriés
 */
// 9.1.1 : Dans chaque page web, la hiérarchie entre les titres (balise hx ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres de niveau qui ne respectent pas la hierarchie de titres',
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
    expectedNbElements: 0,
    explanations: {
        'passed': 'La hiérarchie entre les titres de niveau est pertinente sur cette page.',
        'failed': 'Des titres de niveau(n) non précédés d\'un titre de niveau(n-1) ont été trouvés.'
    },
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;
        if(item.tagName.toLowerCase().match(/^h\d$/) || item.hasAttribute('aria-level')) {
            var currentlevel = parseInt(item.hasAttribute('aria-level') ? item.getAttribute('aria-level') : item.tagName.substring(1));
            var currentElement = item.hasAttribute('aria-level') ? '[role="heading"][aria-level="'+currentlevel+'"]' : item.tagName;
            
            if(currentlevel === 1) {
                return false;
            }
            var parent = item.parentNode;
            while(parent) {
                if(currentlevel < 8) {
                    var headings = parent.querySelectorAll(currentElement+',h'+(currentlevel-1)+', [role="heading"][aria-level="'+(currentlevel-1)+'"]');
                } else {
                    var headings = parent.querySelectorAll(currentElement+', [role="heading"][aria-level="'+(currentlevel-1)+'"]');
                }
                

                for(var i = 0; i < headings.length; i++) {
                    if(headings[i] === item) {
                        parent = parent.tagName.toLowerCase() != 'body' ? parent.parentNode : null;
                        break;
                    } else if(item.isNotExposedDueTo.length > 0) {
                        continue;
                    } else {
                        return false;
                    }
                }
            }

            return true;
        }
    },
    mark: {attrs: ['role', 'aria-level']},
    tags: ['a11y', 'headings'],
    ressources: { 'rgaa': ['9.1.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres de niveau qui respectent la hierarchie de titres',
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length > 0) return;
        if(item.tagName.toLowerCase().match(/^h\d$/) || item.hasAttribute('aria-level')) {
            var currentlevel = parseInt(item.hasAttribute('aria-level') ? item.getAttribute('aria-level') : item.tagName.substring(1));
            var currentElement = item.hasAttribute('aria-level') ? '[role="heading"][aria-level="'+currentlevel+'"]' : item.tagName;
            if(currentlevel === 1) {
                return true;
            }
            var parent = item.parentNode;
            while(parent) {
                if(currentlevel < 8) {
                    var headings = parent.querySelectorAll(currentElement+',h'+(currentlevel-1)+', [role="heading"][aria-level="'+(currentlevel-1)+'"]');
                } else {
                    var headings = parent.querySelectorAll(currentElement+', [role="heading"][aria-level="'+(currentlevel-1)+'"]');
                }

                for(var i = 0; i < headings.length; i++) {
                    if(headings[i] === item) {
                        parent = parent.tagName.toLowerCase() != 'body' ? parent.parentNode : null;
                        break;
                    } else if(item.isNotExposedDueTo.length > 0) {
                        continue;
                    } else {
                        return true;
                    }
                }
            }

            return false;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['role', 'aria-level']},
    tags: ['a11y', 'headings'],
    ressources: { 'rgaa': ['9.1.1'] }
});

// 9.1.2 : Dans chaque page web, le contenu de chaque titre (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) non pertinent',
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"][aria-level]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'headings', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence des titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level)',
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"][aria-level]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    tags: ['a11y', 'headings', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

// 9.1.3 Dans chaque page web, chaque passage de texte constituant un titre est-il structuré à l'aide d'une balise <hx> ou d'une balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Chaque passage de texte constituant un titre doit être structuré à l'aide d'une balise <hx> ou d'une balise possédant un attribut WAI-ARIA role='heading' associé à un attribut WAI-ARIA aria-level",
    status: 'untested',
    tags: ['a11y', 'headings', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.3'] }
});

// 9.2.1 Dans chaque page web, la structure du document vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones d\'entêtes',
    query: 'header',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones de pied de page',
    query: 'footer',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones navigation',
    query: 'nav',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que l\'éléments suivant est la zone de contenu principale',
    query: 'main',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.2.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La structure du document utilise une balise main visible unique',
    query: 'main',
    expectedNbElements : { max: 1 },
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.isVisible;
    },
    tags: ['a11y', 'structure', 'accessiblename'],
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

/**
 *? PRESENTATION DE L'INFORMATION
 ** Tous les tests sont répertoriés
 *TODO 10.4.1 récupérer la liste de noeuds texte -> font-size-200% -> check viewport position
 *TODO traiter le 10.5 dans la boucle qui passe chaque noeud texte dans le script de contrast, car il n'est pas possible de recupérer simplement les propriétés color et background appliquées directement sur les éléments
 *TODO 10.12.1 passer chaque noeud texte après avoir défini les propriétés d'espacement du texte sur le document
 */

//* 10.1 Dans le site web, des feuilles de style sont-elles utilisées pour contrôler la présentation de l'information ?
// 10.1.1 : Dans chaque page web, les balises servant à la présentation de l'information ne doivent pas être présentes dans le code source généré des pages. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des balises servant à la présentation de l\'information présentes dans le code source généré de la page.',
    query: 'basefont, blink, center, font, marquee, s, strike, tt, big',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.1'] }
});

// 10.1.2 : Dans chaque page web, les attributs servant à la présentation de l'information ne doivent pas être présents dans le code source généré des pages. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des attributs servant à la présentation de l\'information présents dans le code source généré de la page.',
    query: '[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [compact], [color], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size], :not(img, object, embed, canvas, svg)[width], :not(img, object, embed, canvas, svg)[height]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    mark: { attrs: ['align','alink','background','bgcolor','border','cellpadding','cellspacing','char','charoff','clear','compact', 'color', 'frameborder', 'hspace', 'link', 'marginheight', 'marginwidth', 'text', 'valign', 'vlink', 'vspace', 'size', 'width', 'height']},
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.2'] }
});

// 10.1.3 Dans chaque page web, l'utilisation des espaces vérifie-t-elle ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les espaces ne doivent pas être utiliser pour séparer les lettres d'un mot, simuler des tableaux ou simuler des colonnes de texte.",
    status: 'untested',
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.3'] }
});

//* 10.2 Dans chaque page web, le contenu visible porteur d’information reste-t-il présent lorsque les feuilles de style sont désactivées ?
// 10.2.1 Dans chaque page web, l'information reste-t-elle présente lorsque les feuilles de style sont désactivées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "L'information doit rester présente lorsque les feuilles de style sont désactivées.",
    status: 'untested',
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.2.1'] }
});

//* 10.3 Dans chaque page web, l'information reste-t-elle compréhensible lorsque les feuilles de style sont désactivées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "L'information doit rester compréhensible lorsque les feuilles de style sont désactivées.",
    status: 'untested',
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.3.1'] }
});

//* 10.4 Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200%, au moins (hors cas particuliers) ?
// 10.4.1 Dans chaque page web, l'augmentation de la taille des caractères jusqu'à 200 %, au moins, ne doit pas provoquer de perte d'information. Cette règle est-elle respectée selon une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'La taille des caractères doit pouvoir être augmentée jusque 200% sans perdre d\'information.',
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.4.1'] }
});

// 10.4.2 Dans chaque page web, l'augmentation de la taille des caractères jusqu'à 200 %, au moins, doit être possible pour l’ensemble du texte dans la page. Cette règle est-elle respectée selon une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'La meta viewport n"empêche pas le zoom.',
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
					return false;
				}
				else if (propertyName == 'maximum-scale' && (parseFloat(propertyValue) < 2 && parseFloat(propertyValue) >= 0)) {
					return false;
				}
			}

            return true;
		}
	},
	analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['content']},
	tags: ['a11y', 'presentation', 'meta'],
    ressources: { 'rgaa': ['10.4.2'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La meta viewport empêche le zoom.',
	query: 'meta[name="viewport"][content]',
    expectedNbElements: 0,
	filter: function (item) {
		var content = item.getAttribute('content').trim();
        if(!content.match(/(user-scalable)|(maximum-scale)/igm)) {
            return;
        }
		if (content.match(/(user-scalable=)|(maximum-scale=)/igm)) {
			content = content.indexOf(',') > -1 ? content.split(',') : content = [content];
            for (var j = 0; j < content.length; j++) {
				var property = content[j].split('=');
				var propertyName = property[0].trim().toLowerCase();
				var propertyValue = property[1].trim().toLowerCase();
				if (propertyName == 'user-scalable' && propertyValue == "no") {
					return true;
				}
				else if (propertyName == 'maximum-scale' && (parseFloat(propertyValue) < 2 && parseFloat(propertyValue) >= 0)) {
					return true;
				}
			}
		}
	},
    mark: {attrs: ['content']},
	tags: ['a11y', 'presentation', 'meta'],
    ressources: { 'rgaa': ['10.4.2'] }
});

//* 10.5 Dans chaque page web, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées ?
// 10.5.1 Dans chaque page web, chaque déclaration CSS de couleurs de police (color), d'un élément susceptible de contenir du texte, est-elle accompagnée d'une déclaration de couleur de fond (background, background-color), au moins, héritée d'un parent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque déclaration CSS de couleurs de police (color), d'un élément susceptible de contenir du texte, doit être accompagnée d'une déclaration de couleur de fond (background, background-color), au moins, héritée d'un parent.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'colors'],
    ressources: { 'rgaa': ['10.5.1'] }
});

// 10.5.2 Dans chaque page web, chaque déclaration de couleur de fond (background, background-color), d'un élément susceptible de contenir du texte, est-elle accompagnée d'une déclaration de couleur de police (color) au moins, héritée d'un parent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque déclaration de couleur de fond (background, background-color), d'un élément susceptible de contenir du texte, doit être accompagnée d'une déclaration de couleur de police (color) au moins, héritée d'un parent.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'colors'],
    ressources: { 'rgaa': ['10.5.2'] }
});

// 10.5.3 Dans chaque page web, chaque utilisation d'une image pour créer une couleur de fond d'un élément susceptible de contenir du texte, via CSS (background, background-image), est-elle accompagnée d'une déclaration de couleur de fond (background, background-color), au moins, héritée d'un parent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque utilisation d'une image pour créer une couleur de fond d'un élément susceptible de contenir du texte, via CSS (background, background-image), doit être accompagnée d'une déclaration de couleur de fond (background, background-color), au moins, héritée d'un parent.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'colors'],
    ressources: { 'rgaa': ['10.5.3'] }
});

//* 10.6 Dans chaque page web, chaque lien dont la nature n'est pas évidente est-il visible par rapport au texte environnant ?
// 10.6.1 Dans chaque page web, chaque lien texte signalé uniquement par la couleur, et dont la nature n'est pas évidente, vérifie-t-il ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque lien texte signalé uniquement par la couleur, et dont la nature n'est pas évidente, doit être visible par rapport au texte environnant.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'links'],
    ressources: { 'rgaa': ['10.6.1'] }
});

//* 10.7 Dans chaque page web, pour chaque élément recevant le focus, la prise de focus est-elle visible ?
// 10.7.1 Pour chaque élément recevant le focus, la prise de focus vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque élément recevant le focus, la prise de focus doit être visible.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard', 'contrast'],
    ressources: { 'rgaa': ['10.7.1'] }
});

//* 10.8 Pour chaque page web, les contenus cachés ont-ils vocation à être ignorés par les technologies d'assistance ?
// 10.8.1 Dans chaque page web, chaque contenu caché vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des contenus cachés restitués.",
    description: "Vérifier que ces éléments ont bien vocation à être restitués par les technologies d'assistance.",
    query: 'body *',
    filter: function(item) {
        return !item.isVisible && item.isNotExposedDueTo.length === 0;
    },
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Liste des contenus cachés non restitués.",
    description: "Vérifier que ces éléments ont bien vocation à être ignorés par les technologies d'assistance.",
    query: 'body *',
    filter: function(item) {
        return !item.isVisible && item.isNotExposedDueTo.length > 0;
    },
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.8.1'] }
});

//* 10.9 Dans chaque page web, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
//* 10.10 Dans chaque page web, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
// 10.9.1 Dans chaque page web, pour chaque texte ou ensemble de textes, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.1 Dans chaque page web, pour chaque texte ou ensemble de textes, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque texte ou ensemble de textes, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle doit être respectée et implémentée de façon pertinente.",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.1', '10.10.1'] }
});

// 10.9.2 Dans chaque page web, pour chaque image ou ensemble d'images, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.2 Dans chaque page web, pour chaque image ou ensemble d'images, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque image ou ensemble d'images, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle doit être respectée et implémentée de façon pertinente.",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.2', '10.10.2'] }
});

// 10.9.3 Dans chaque page web, pour chaque média temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.3 Dans chaque page web, pour chaque média temporel, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque média temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle doit être respectée et implémentée de façon pertinente.",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.3', '10.10.3'] }
});

// 10.9.4 Dans chaque page web, pour chaque média non temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?
// 10.10.4 Dans chaque page web, pour chaque média non temporel, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque média non temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle doit être respectée et implémentée de façon pertinente.",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.9.4', '10.10.4'] }
});

//* 10.11 Pour chaque page web, les contenus peuvent-ils être présentés sans avoir recours à un défilement vertical pour une fenêtre ayant une hauteur de 256px ou à un défilement horizontal pour une fenêtre ayant une largeur de 320px (hors cas particuliers) ?
// 10.11.1 Pour chaque page web, lorsque le contenu dont le sens de lecture est horizontal est affiché dans une fenêtre réduite à une largeur de 320px, l'ensemble des informations et des fonctionnalités sont-elles disponibles sans aucun défilement horizontal (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Si le sens de lecture du contenu est horizontal, il ne doit y avoir aucun défilement horizontal sur les écrans de 320px de large.",
    query: 'body',
    analyzeElements: function(collection) {
        var currentPage = document.createElement("iframe");
        currentPage.id = 'test10-11-1-tng';
        currentPage.style.width = "320px";
        var pageHead = document.head.innerHTML;
        var pageBody = document.body.outerHTML;
        document.body.appendChild(currentPage);
        currentPage.contentWindow.document.head.innerHTML = pageHead;
        currentPage.contentWindow.document.body.outerHTML = pageBody;
        var horizontalScroll = currentPage.contentWindow.document.body.scrollWidth - currentPage.contentWindow.document.body.clientWidth;
        currentPage.remove();
        if(horizontalScroll > 0) {
            collection[0].status = 'cantTell';
        } else {
            collection[0].status = 'passed';
        }
    },
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.11.1'] }
});

// 10.11.2 Pour chaque page web, lorsque le contenu dont le sens de lecture est vertical est affiché dans une fenêtre réduite à une hauteur de 256px, l'ensemble des informations et des fonctionnalités sont-elles disponibles sans aucun défilement vertical (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Si le sens de lecture du contenu est vertical, il ne doit y avoir aucun défilement vertical sur les écrans de 256px de haut.",
    query: 'body',
    analyzeElements: function(collection) {
        var currentPage = document.createElement("iframe");
        currentPage.id = 'test10-11-2-tng';
        currentPage.style.height = "256px";
        var pageHead = document.head.innerHTML;
        var pageBody = document.body.outerHTML;
        document.body.appendChild(currentPage);
        currentPage.contentWindow.document.head.innerHTML = pageHead;
        currentPage.contentWindow.document.body.outerHTML = pageBody;
        var verticalScroll = currentPage.contentWindow.document.body.scrollHeight - currentPage.contentWindow.document.body.clientHeight;
        currentPage.remove();
        if(verticalScroll > 0) {
            collection[0].status = 'cantTell';
        } else {
            collection[0].status = 'passed';
        }
    },
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.11.2'] }
});

//* 10.12 Dans chaque page web, les propriétés d'espacement du texte peuvent-elles être redéfinies par l'utilisateur sans perte de contenu ou de fonctionnalité (hors cas particuliers) ?
// 10.12.1 Dans chaque page web, le texte reste-t-il lisible lorsque l'affichage est modifié selon ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les propriétés d'espacement du texte doivent pouvoir être redéfinies par l'utilisateur sans perte de contenu ou de fonctionnalité.",
    status: 'untested',
	tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.12.1'] }
});

//* 10.13 Dans chaque page web, les contenus additionnels apparaissant à la prise de focus ou au survol d'un composant d'interface sont-ils contrôlables par l'utilisateur (hors cas particuliers) ?
// 10.13.1 Chaque contenu additionnel devenant visible à la prise de focus ou au survol d'un composant d'interface peut-il être masqué par une action utilisateur sans déplacer le focus ou le pointeur de la souris (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu additionnel devenant visible à la prise de focus ou au survol d'un composant d'interface doit pouvoir être masqué par une action utilisateur sans déplacer le focus ou le pointeur de la souris.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.13.1'] }
});

// 10.13.2 Chaque contenu additionnel qui apparaît au survol d'un composant d'interface peut-il être survolé par le pointeur de la souris sans disparaître (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu additionnel qui apparaît au survol d'un composant d'interface doit pouvoir être survolé par le pointeur de la souris sans disparaître.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.13.2'] }
});

// 10.13.3 Chaque contenu additionnel qui apparaît à la prise de focus ou au survol d'un composant d'interface vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu additionnel qui apparaît à la prise de focus ou au survol d'un composant d'interface reste visible jusqu'à ce qu'il soit valide ou qu'une action de l'utilisateur le cache.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.13.3'] }
});

//* 10.14 Dans chaque page web, les contenus additionnels apparaissant via les styles CSS uniquement peuvent-ils être rendus visibles au clavier et par tout dispositif de pointage ?
// 10.14.1 Dans chaque page web, les contenus additionnels apparaissant au survol d'un composant d'interface via les styles CSS respectent-ils si nécessaire une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les contenus additionnels apparaissant au survol d'un composant d'interface via les styles CSS doivent pouvoir être rendus visibles au clavier et par tout dispositif de pointage.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.14.1'] }
});

// 10.14.2 Dans chaque page web, les contenus additionnels apparaissant au focus d'un composant d'interface via les styles CSS respectent-ils si nécessaire une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les contenus additionnels apparaissant au focus d'un composant d'interface via les styles CSS doivent pouvoir être rendus visibles au clavier et par tout dispositif de pointage.",
    status: 'untested',
	tags: ['a11y', 'presentation', 'keyboard'],
    ressources: { 'rgaa': ['10.14.2'] }
});

/**
 *? FORMULAIRES
 ** Tous les tests sont répertoriés
 *TODO voir si l'on peut approfondir les tests 11.10.2 et 11.10.4
 *TODO traiter la proximité d'une étiquette avec son champ ?? (11.1.3, 11.4)
 */

//* 11.1 Chaque champ de formulaire a-t-il une étiquette ?
// 11.1.1 Chaque champ de formulaire vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaires sans nom accessible',
    query: 'input[type="text"]:not([role]), input[type="password"]:not([role]), input[type="search"]:not([role]), input[type="email"]:not([role]), input[type="number"]:not([role]), input[type="tel"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), input[type="checkbox"]:not([role]), input[type="radio"]:not([role]), input[type="date"]:not([role]), input[type="range"]:not([role]), input[type="color"]:not([role]), input[type="time"]:not([role]), input[type="month"]:not([role]), input[type="week"]:not([role]), input[type="datetime-local"]:not([role]), select:not([role]), datalist:not([role]), input[type="file"]:not([role]), progress:not([role]), meter:not([role]), input:not([type]):not([role]), [role="progressbar"], [role="slider"], [role="spinbutton"], [role="textbox"], [role="listbox"], [role="searchbox"], [role="combobox"], [role="option"], [role="checkbox"], [role="radio"], [role="switch"], [contenteditable="true"]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaires avec un nom accessible',
    query: 'input[type="text"]:not([role]), input[type="password"]:not([role]), input[type="search"]:not([role]), input[type="email"]:not([role]), input[type="number"]:not([role]), input[type="tel"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), input[type="checkbox"]:not([role]), input[type="radio"]:not([role]), input[type="date"]:not([role]), input[type="range"]:not([role]), input[type="color"]:not([role]), input[type="time"]:not([role]), input[type="month"]:not([role]), input[type="week"]:not([role]), input[type="datetime-local"]:not([role]), select:not([role]), datalist:not([role]), input[type="file"]:not([role]), progress:not([role]), meter:not([role]), input:not([type]):not([role]), [role="progressbar"], [role="slider"], [role="spinbutton"], [role="textbox"], [role="listbox"], [role="searchbox"], [role="combobox"], [role="option"], [role="checkbox"], [role="radio"], [role="switch"], [contenteditable="true"]:not([role])',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.1'] }
});

// 11.1.2 : Chaque champ de formulaire associé à une balise <label> ayant un attribut for, vérifie-t-il ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des intitulés de champs de formulaire non reliés à leur champ.',
    query: 'label[for]',
    expectedNbElements: 0,
    explanations: {
        'passed': 'Aucun intitulés de champs de formulaires non relié à son champs n\'a été trouvé dans la page',
        'failed': 'Des intitulés de champs de formulaire sont mal reliés ou pas reliés à leur champ.'
    },
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0 && item.getAttribute('for').trim().length > 0) {
            var startDigit = /^\d/;
            var id = item.getAttribute('for');

            if(id.match(startDigit)) {
                id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
            } else {
                id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
            }
            
            var fields = document.querySelectorAll('#'+id);

            if(fields.length === 0 || fields.length > 1) {
                return true;
            }
        }
    },
    mark: {attrs: ['for']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des intitulés de champs de formulaire reliés à leur champ.',
    query: 'label[for]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0 && item.getAttribute('for').trim().length > 0) {
            var startDigit = /^\d/;
            var id = item.getAttribute('for');

            if(id.match(startDigit)) {
                id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
            } else {
                id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
            }

            var fields = document.querySelectorAll('#'+id);
            if(0 < fields.length && fields.length < 2) {
                if(htmlData.elements[fields[0].tagName.toLowerCase()]) {
                    return htmlData.elements[fields[0].tagName.toLowerCase()].category === 'forms';
                }
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['for']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.2'] }
});

// 11.1.3 Chaque champ de formulaire ayant une étiquette dont le contenu n'est pas visible ou à proximité (masqué, aria-label) ou qui n’est pas accolé au champ (aria-labelledby), vérifie-t-il une de ses conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaires avec une étiquette non visible, ne possédant ni attribut title ni passage de texte visible identifié par un id.',
    query: 'input[type="text"]:not([role]), input[type="password"]:not([role]), input[type="search"]:not([role]), input[type="email"]:not([role]), input[type="number"]:not([role]), input[type="tel"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), input[type="checkbox"]:not([role]), input[type="radio"]:not([role]), input[type="date"]:not([role]), input[type="range"]:not([role]), input[type="color"]:not([role]), input[type="time"]:not([role]), input[type="month"]:not([role]), input[type="week"]:not([role]), input[type="datetime-local"]:not([role]), select:not([role]), datalist:not([role]), input[type="file"]:not([role]), progress:not([role]), meter:not([role]), input:not([type]):not([role]), [role="progressbar"], [role="slider"], [role="spinbutton"], [role="textbox"], [role="listbox"], [role="searchbox"], [role="combobox"], [role="option"], [role="checkbox"], [role="radio"], [role="switch"], [contenteditable="true"]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        if((item.isNotExposedDueTo.length > 0 && !item.isVisible) || item.disabled) return;

        let hasLabel = false;

        if(item.hasAttribute('aria-labelledby') && item.getAttribute('aria-labelledby').trim().length > 0) {
            let ids = item.getAttribute('aria-labelledby').split(' ');
            let labelIsVisible = false;
            let visibleLabel = '';

            ids.forEach(id => {
                let el = document.getElementById(id);
                if(el) {
                    hasLabel = true;
                    item.setAttribute('data-tng-has-label', 'labelledby');
                    labelIsVisible = el.isVisible && el.textContent.trim().length > 0 ? true : labelIsVisible;
                    if(el.isVisible && el.textContent.trim().length > 0) {
                        labelIsVisible = true;
                        visibleLabel += el.textContent.trim() + ' ';
                    }
                }
            });

            if(labelIsVisible) {
                item.setAttribute('data-tng-visible-label', 'labelledby');
                item.setAttribute('data-tng-text-label', visibleLabel.trim());
                return;
            }
        }

        if(item.hasAttribute('id') && item.getAttribute('id').trim().length > 0) {
            let id = item.getAttribute('id');
            let labels = document.querySelectorAll('label[for]');
            
            for(let i = 0; i < labels.length; i++) {
                let forAttr = labels[i].getAttribute('for');
                if(forAttr.match(id)) {
                    if(labels[i].textContent.trim().length > 0) {
                        if(labels[i].isVisible) {
                            item.setAttribute('data-tng-visible-label', 'label');
                            item.setAttribute('data-tng-text-label', labels[i].textContent.trim());
                            return;
                        }

                        hasLabel = true;
                        item.setAttribute('data-tng-has-label', 'label');
                    }
                    
                    break;
                } 
            }
        }

        if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').trim().length > 0) {
            hasLabel = true;
            item.setAttribute('data-tng-has-label', 'arialabel');
        }

        if(item.hasAttribute('title') && item.getAttribute('title').trim().length > 0) {
            item.setAttribute('data-tng-has-label', 'title');
            return;
        }

        if(hasLabel) {
            item.setAttribute('data-tng-temp', 'focused');
            item = item.focus();
            item = document.querySelector('[data-tng-temp]');
            item.removeAttribute('data-tng-temp');
            if(item.hasAttribute('aria-describedby') && item.getAttribute('aria-describedby').trim().length > 0) {
                let ids = item.getAttribute('aria-describedby').split(' ');
                ids.forEach(id => {
                    let el = document.getElementById(id);
                    if(el && el.textContent.trim().length > 0) {
                        if(el.isVisible) {
                            item.setAttribute('data-tng-has-label', 'describedby');
                            return;
                        } 
                        // else {
                        //     item.focus();
                        //     let elFocus = document.getElementById(id);
                        //     if(elFocus.isVisible) {
                        //         item.setAttribute('data-tng-has-label', 'describedby-focus');
                        //         return;
                        //     }
                        // }
                    }
                })
            }
            return true;
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaires avec une étiquette non visible, possédant un attribut title.',
    description: "Vérifier la pertinence de l'attribut title.",
    query: '[data-tng-has-label="title"]:not([data-tng-visible-label])',
    mark: {attrs: ['title']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaires avec une étiquette non visible, possédant un passage de texte visible identifié par un id.',
    description: "Vérifier la pertinence du passage de texte ainsi que sa proximité avec le champ associé.",
    query: '[data-tng-has-label="describedby"]:not([data-tng-visible-label])',
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.3'] }
});

// tanaguruTestsList.push({
//     lang: 'fr',
//     name: 'Liste des champs de formulaires avec une étiquette non visible, possédant un passage de texte visible au focus identifié par un id.',
//     description: "Vérifier la pertinence du passage de texte ainsi que sa proximité avec le champ associé.",
//     query: '[data-tng-has-label="describedby-focus"]:not([data-tng-visible-label])',
//     mark: {attrs: ['aria-describedby']},
//     tags: ['a11y', 'forms', 'accessiblename'],
//     ressources: { 'rgaa': ['11.1.3'] }
// });

//* 11.2 : Chaque étiquette associée à un champ de formulaire est-elle pertinente (hors cas particuliers) ?
// 11.2.1 : Chaque balise <label> permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez si la balise label permet de connaître la fonction exacte du champ de formulaire auquel elle est associée.',
    query: 'label',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(item.hasAttribute('for') && item.getAttribute('for').trim().length > 0) {
                var startDigit = /^\d/;
                var id = item.getAttribute('for');

                if(id.match(startDigit)) {
                    id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                } else {
                    id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                }
                var tags = document.querySelectorAll('#'+id);

                for(var i = 0; i < tags.length; i++) {
                    if(htmlData.elements[tags[i].tagName.toLowerCase()]) {
                        if(htmlData.elements[tags[i].tagName.toLowerCase()].category === 'forms') {
                            return true;
                        }
                    }
                }
            }

            if(item.hasChildNodes()) {
                var children = item.childNodes;
                for(var i = 0; i < children.length; i++) {
                    if(children[i].tagName) {
                        if(htmlData.elements[children[i].tagName.toLowerCase()]) {
                            if(htmlData.elements[children[i].tagName.toLowerCase()].category === 'forms') {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    },
    mark: {attrs: ['for']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.1'] }
});

// 11.2.2 : Chaque attribut title permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez si l\'attribut title permet de connaître la fonction exacte du champ de formulaire auquel il est associé.',
    query: '[title]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(htmlData.elements[item.tagName.toLowerCase()]) {
                return htmlData.elements[item.tagName.toLowerCase()].category === 'forms';
            }
        }
    },
    mark: {attrs: ['title']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.2'] }
});

// 11.2.3 : Chaque étiquette implémentée via l'attribut WAI-ARIA aria-label permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez si l\'attribut WAI-ARIA aria-label permet de connaître la fonction exacte du champ de formulaire auquel il est associé.',
    query: '[aria-label]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(htmlData.elements[item.tagName.toLowerCase()]) {
                return htmlData.elements[item.tagName.toLowerCase()].category === 'forms';
            }
        }
    },
    mark: {attrs: ['aria-label']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.3'] }
});

// 11.2.4 : Chaque passage de texte associé via l'attribut WAI-ARIA aria-labelledby permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez si le passage de texte associé via l\'attribut WAI-ARIA aria-labelledby permet de connaître la fonction exacte du champ de formulaire auquel il est associé.',
    query: '[aria-labelledby]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0) {
            if(htmlData.elements[item.tagName.toLowerCase()]) {
                return htmlData.elements[item.tagName.toLowerCase()].category === 'forms';
            }
        }
    },
    mark: {attrs: ['aria-labelledby']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.4'] }
});

// 11.2.5 Chaque champ de formulaire ayant un intitulé visible vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaire dont le nom accessible contient l\'intitulé visible.',
    query: '[data-tng-visible-label]',
    filter: function (item) {
        return item.accessibleName.includes(item.getAttribute('data-tng-text-label'));
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaire dont le nom accessible ne reprend pas l\'intitulé visible.',
    query: '[data-tng-visible-label]',
    expectedNbElements: 0,
    filter: function (item) {
        return !item.accessibleName.includes(item.getAttribute('data-tng-text-label'));
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.5'] }
});
// 11.2.6 Chaque bouton adjacent au champ de formulaire qui fournit une étiquette visible permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Chaque bouton adjacent au champ de formulaire qui fournit une étiquette visible doit permettre de connaître la fonction exacte du champs de formulaire auquel il est associé.',
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.6'] }
});

//* 11.3 Dans chaque formulaire, chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée plusieurs fois dans une même page ou dans un ensemble de pages est-elle cohérente ?
// 11.3.1 Chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée plusieurs fois dans une même page est-elle cohérente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée plusieurs fois dans une même page doit être cohérente.',
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.3.1'] }
});

// 11.3.2 Chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée dans un ensemble de pages est-elle cohérente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée dans un ensemble de pages doit être cohérente.',
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.3.2'] }
});

//* 11.4 Dans chaque formulaire, chaque étiquette de champ et son champ associé sont-ils accolés (hors cas particuliers) ?
// 11.4.1 Chaque étiquette de champ et son champ associé sont-ils accolés ?
// 11.4.2 Chaque étiquette accolée à un champ (à l'exception des case à cocher, bouton radio ou balise ayant un attribut WAI-ARIA role="checkbox", role="radio" ou role="switch"), vérifie-t-elle ces conditions (hors cas particuliers) ? 
// 11.4.3 Chaque étiquette accolée à un champ de type checkbox ou radio ou à une balise ayant un attribut WAI-ARIA role="checkbox", role="radio" ou role="switch", vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Chaque étiquette de champ et son champ associé doivent être accolés de façon pertinente.',
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.4.1', '11.4.2', '11.4.3'] }
});

//* 11.5 Dans chaque formulaire, les champs de même nature sont-ils regroupés, si nécessaire ?
//11.5.1 : Les champs de même nature vérifient-ils l'une de ces conditions, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que l\'utilisation des balises fieldset et les attributs role group sont bien nécessaire',
    query: 'fieldset, [role="group"], [role="radiogroup"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.5.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les champs de même nature doivent si nécessaire être correctement regroupés.',
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.5.1'] }
});

//* 11.6 Dans chaque formulaire, chaque regroupement de champs de même nature a-t-il une légende ?
// 11.6.1 : Chaque regroupement de champs de même nature possède-t-il une légende ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des regroupement de champs sans légende.',
    query: 'fieldset, [role="group"]',
    expectedNbElements: 0,
    explanations: {
        'passed': 'Aucun regroupement de champs sans légende n\'a été trouvé sur cette page.',
        'failed': 'Des regroupements de champs sans légendes ont été trouvé sur cette page.'
    },
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.6.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des regroupement de champs avec légende.',
    query: 'fieldset, [role="group"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.6.1'] }
});

//* 11.7 Dans chaque formulaire, chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?
// 11.7.1 Chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez si les légendes associées aux regroupements de champs de formulaires sont pertinentes.',
    query: 'fieldset, [role="group"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    mark: {attrs: ['aria-label', 'aria-labelledby']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.7.1'] }
});

//* 11.8 Dans chaque formulaire, les items de même nature d'une liste de choix sont-ils regroupés de manière pertinente ?
// 11.8.1 Pour chaque balise <select>, les items de même nature d'une liste de choix sont-ils regroupés avec une balise <optgroup>, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Pour chaque balise <select>, les items de même nature d'une liste de choix doivent, si nécessaire, être regroupés avec une balise <optgroup>.",
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.8.1'] }
});

// 11.8.2 Dans chaque balise <select>, chaque balise <optgroup> possède-t-elle un attribut label ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des éléments optgroup sans attribut label.',
    query: 'select optgroup:not([label])',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    explanations: {
        'passed': 'Aucun éléments optgroup sans attribut label n\'a été trouvé sur cette page.',
        'failed': 'Des éléments optgroup sans attribut label ont été trouvé sur cette page.'
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.8.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des éléments optgroup avec attribut label.',
    query: 'select optgroup[label]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: {attrs: ['label']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.8.2'] }
});

// 11.8.3 Pour chaque balise <optgroup> ayant un attribut label, le contenu de l'attribut label est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Element <optgroup> avec un attribut label non pertinent.",
    query: 'select optgroup[label]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.getAttribute('label').trim() === 0;
    },
    mark: {attrs: ['label']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.8.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez la pertinence de l\'attribut label sur l\'élément optgroup.',
    query: 'select optgroup[label]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    mark: {attrs: ['label']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.8.3'] }
});

//* 11.9 Dans chaque formulaire, l'intitulé de chaque bouton est-il pertinent (hors cas particuliers) ?
// 11.9.1 L'intitulé de chaque bouton est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez la pertinence des intitulés de ces boutons.',
    query: 'input[type="submit"][value], input[type="reset"][value], input[type="button"][value], button, input[type="image"][alt], input[type="submit"][aria-label], input[type="submit"][aria-labelledby], input[type="submit"][title], input[type="reset"][aria-label], input[type="reset"][aria-labelledby], input[type="reset"][title], input[type="button"][aria-label], input[type="button"][aria-labelledby], input[type="button"][title], [role="button"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    mark: {attrs: ['aria-labelledby', 'aria-label', 'alt', 'value', 'title']},
    tags: ['a11y', 'forms', 'accessiblename', 'buttons'],
    ressources: { 'rgaa': ['11.9.1'] }
});

// 11.9.2 Chaque bouton affichant un intitulé visible vérifie-t-il ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des boutons de formulaire ayant un intitulé visible non repris dans le nom accessible.',
    query: 'form button:not([role]), form button[role="none"], form [role="button"], form input[type="submit"]:not([role]), form input[type="reset"]:not([role]), form input[type="button"]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isVisible && (item.innerText || item.value) && !item.disabled) {
            var visibleName = item.innerText ? item.innerText : item.value;
            var buttonName = visibleName.trim().replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var buttonAccessibleName = item.accessibleName.replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var regex = new RegExp(buttonName, 'mi');

            return item.isNotExposedDueTo.length == 0 && !buttonAccessibleName.match(regex);
        }
    },
    tags: ['a11y', 'accessiblename', 'buttons', 'forms'],
    ressources: {'rgaa': ['11.9.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des boutons de formulaire ayant un intitulé visible bien repris dans le nom accessible.',
    query: 'form button:not([role]), form button[role="none"], form [role="button"], form input[type="submit"]:not([role]), form input[type="reset"]:not([role]), form input[type="button"]:not([role])',
    filter: function (item) {
        if(item.isVisible && (item.innerText || item.value)) {
            var visibleName = item.innerText ? item.innerText : item.value;
            var buttonName = visibleName.trim().replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var buttonAccessibleName = item.accessibleName.replace(/[\s\X!"#$%&'()*+,\-.\/:;<=>?@[\]^_`{|}~]/gm, '');
            var regex = new RegExp(buttonName, 'mi');

            return item.isNotExposedDueTo.length == 0 && buttonAccessibleName.match(regex);
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'accessiblename', 'buttons', 'forms'],
    ressources: {'rgaa': ['11.9.2']}
});

//* 11.10 Dans chaque formulaire, le contrôle de saisie est-il utilisé de manière pertinente (hors cas particuliers) ?
// 11.10.1 Les indications du caractère obligatoire de la saisie des champs vérifient-elles une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les indications du caractère obligatoire de la saisie des champs doivent être correctement implémentées.",
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.10.1'] }
});

// 11.10.2 Les champs obligatoires ayant l'attribut aria-required="true" ou required vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les champs obligatoires ayant l'attribut aria-required ou required doivent être doublés d'une indication de champs obligatoire visible.",
    description: "Vérifier qu'une indication de champ obligatoire est visible ET située dans l'étiquette ou le passage de texte associé au champ préalablement à la validation du formulaire.",
    query: '[aria-required="true"], [required]',
    filter: function (item) {
        return item.isNotExposedDueTo.length === 0;
    },
    tags: ['a11y', 'accessiblename', 'forms'],
    ressources: {'rgaa': ['11.10.2']}
});

// 11.10.3 Les messages d'erreur indiquant l'absence de saisie d'un champ obligatoire vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les messages d'erreur indiquant l'absence de saisie d'un champ obligatoire doivent être correctement implémentées.",
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.10.3'] }
});

// 11.10.4 Les champs obligatoires ayant l'attribut aria-invalid="true" vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les champs obligatoires ayant l'attribut aria-invalid doivent être associés à un message d'erreur visible.",
    description: "Pour chaque champ obligatoire, vérifier que le message d’erreur indiquant le caractère invalide est visible ET situé dans l'étiquette ou le passage de texte associé au champ.",
    query: '[aria-invalid="true"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length === 0;
    },
    tags: ['a11y', 'accessiblename', 'forms'],
    ressources: {'rgaa': ['11.10.4']}
});

// 11.10.5 Les instructions et indications du type de données et/ou de format obligatoires vérifient-elles une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les instructions et indications du type de données et/ou de format obligatoires doivent être correctement implémentées.",
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.10.5'] }
});

// 11.10.6 Les messages d'erreurs fournissant une instruction ou une indication du type de données et/ou de format obligatoire des champs vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les messages d'erreurs fournissant une instruction ou une indication du type de données et/ou de format obligatoires doivent être correctement implémentées.",
    status: 'untested',
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.10.6'] }
});

// 11.10.7 Les champs ayant l'attribut aria-invalid="true" dont la saisie requiert un type de données et/ou de format obligatoire vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Les champs ayant l'attribut aria-invalid dont la saisie requiert un type de données et/ou de format obligatoire doivent être doublés d'une indication visible.",
    description: "Pour chaque champ dont la saisie requiert un type de données et/ou de format obligatoire, vérifier qu'une instruction ou une indication du type de données et/ou de format obligatoire est visible ET située dans la balise <label> ou le passage de texte associée au champ.",
    query: '[aria-invalid="true"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length === 0;
    },
    tags: ['a11y', 'accessiblename', 'forms'],
    ressources: {'rgaa': ['11.10.7']}
});

//* 11.11 Dans chaque formulaire, le contrôle de saisie est-il accompagné, si nécessaire, de suggestions facilitant la correction des erreurs de saisie ?
// 11.11.1 Pour chaque erreur de saisie, les types et les formats de données sont-ils suggérés, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Pour chaque erreur de saisie, les types et les formats de données doivent si nécessaire être suggérés.",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.11.1']}
});

// 11.11.2 Pour chaque erreur de saisie, des exemples de valeurs attendues sont-ils suggérés, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Pour chaque erreur de saisie, des exemples de valeurs attendues doivent si nécessaire être suggérés.",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.11.2']}
});

//* 11.12 Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou à un examen, ou dont la validation a des conséquences financières ou juridiques, les données saisies peuvent-elles être modifiées, mises à jour ou récupérées par l’utilisateur ?
// 11.12.1 Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou un examen, ou dont la validation a des conséquences financières ou juridiques, la saisie des données vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou un examen, ou dont la validation a des conséquences financières ou juridiques, l'utilisateur doit pouvoir valider le formulaire en connaissance de cause.",
    description: "Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou un examen, ou dont la validation a des conséquences financières ou juridiques, vérifier que l'utilisateur peut modifier ses saisies après la validation formulaire (ou avant la validation lors d'un formulaire en plusieurs étapes) ou que le formulaire possède un mécanisme de confirmation explicite.",
    query: 'form, [role="form"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length === 0;
    },
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.12.1']}
});

// 11.12.2 Chaque formulaire dont la validation modifie ou supprime des données à caractère financier, juridique ou personnel vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Pour chaque formulaire dont la validation modifie ou supprime des données à caractère financier, juridique ou personnel, l'utilisateur doit pouvoir valider le formulaire en connaissance de cause.",
    description: "Pour chaque formulaire dont la validation modifie ou supprime des données à caractère financier, juridique ou personnel, vérifier que le formulaire possède un mécanisme permettant de récupérer les données supprimées ou modifiées ou un mécanisme de confirmation explicite.",
    query: 'form, [role="form"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length === 0;
    },
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.12.2']}
});

//* 11.13 La finalité d'un champ de saisie peut-elle être déduite pour faciliter le remplissage automatique des champs avec les données de l'utilisateur ?
// 11.13.1 Chaque champ de formulaire dont l'objet se rapporte à une information concernant l'utilisateur vérifie-t-il ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "Vérifier que chaque champ de formulaire dont l'objet se rapporte à une information concernant l'utilisateur, possède un attribut autocomplete.",
    query: 'input[type="text"], input[type="password"], input[type="email"], input[type="tel"], input[type="url"], textarea, input[type="date"], select, input:not([type])',
    filter: function (item) {
        return item.isNotExposedDueTo.length === 0;
    },
    mark: {attrs: ['autocomplete']},
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "Champs de formulaire possèdant un attribut autocomplete invalide.",
    query: 'input[autocomplete], textarea[autocomplete], select[autocomplete]',
    expectedNbElements: 0,
    explanations: {
        'passed': "Aucun attribut autocomplete invalide n'a été trouvé sur cette page;",
        'failed': "Des attributs autocomplete invalides ont été trouvé sur cette page. Soit les valeurs de l'attribut ne sont pas référencés dans la spécification HTML5, soit un token 'cible'(home, work...) est utilisé avec un token ne faisant pas parti de la catégorie 'contact', soit les valeurs sont renseignées dans un ordre non valide. (1.groupe, 2.mode, 3.cible, 4.token principal. Exemple: autocomplete='section-parent shipping home email')."
    },
    filter: function (item) {
        //? if na, return
        if(item.isNotExposedDueTo.length > 0 || item.disabled) return;
        if(item.hasAttribute('aria-disabled') && item.getAttribute('aria-disabled') === 'true') return;

        if(item.getAttribute('autocomplete') === 'on' || item.getAttribute('autocomplete') === 'off' || item.getAttribute('autocomplete').trim() === '') return;

        if(item.tagName.toLowerCase() === 'input' && item.hasAttribute('type')) {
            let notField = ['submit', 'reset', 'image', 'button'];
            if(notField.includes(item.getAttribute('type').toLowerCase())) {
                return;
            }
        }

        if(item.hasAttribute('role') && item.getAttribute('role') === 'button') return;

        //? else get autocomplete values
        let autocomplete = item.getAttribute('autocomplete').toLowerCase().split(' ');

        /**
         *? Token groups
         * order : 1.group, 2.Mode, 3.Hint, 4.Token
         ** https://html.spec.whatwg.org/#autofill-field
         */
        let group = new RegExp(/section-*/);
        let mode = ['shipping', 'billing'];
        let hint = ['home', 'work', 'mobile', 'fax', 'pager']; // contact token only

        let normalToken = ['name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname', 'organization-title', 'username', 'new-password', 'current-password', 'one-time-code', 'organization', 'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level4', 'address-level3', 'address-level2', 'address-level1', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type', 'transaction-currency', 'transaction-amount', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'url', 'photo'];
        let contactToken = ['tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension', 'email', 'impp'];

        //? Control groups
        let textGroup = ['name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname', 'organization-title', 'organization', 'address-line1', 'address-line2', 'address-line3','address-level4', 'address-level3', 'address-level2', 'address-level1', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-csc', 'cc-type', 'transaction-currency', 'language', 'sex', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension'];
        let usernameGroup = ['username', 'email'];
        let passwordGroup = ['new-password', 'current-password', 'one-time-code'];
        let multilineGroup = ['street-address'];
        let monthGroup = ['cc-exp'];
        let numericGroup = ['cc-exp-month', 'cc-exp-year', 'transaction-amount', 'bday-day', 'bday-month', 'bday-year'];
        let dateGroup = ['bday'];
        let urlGroup = ['url', 'photo', 'impp'];
        let telGroup = ['tel'];

        let controlGroups = [
            ['text', textGroup],
            ['email', usernameGroup],
            ['password', passwordGroup],
            ['multiline', multilineGroup],
            ['month', monthGroup],
            ['number', numericGroup],
            ['date', dateGroup],
            ['url', urlGroup],
            ['tel', telGroup]
        ];

        /**
         *? Check validity
         */
        if(autocomplete.length === 1) {
            if(!normalToken.includes(autocomplete[0]) && !contactToken.includes(autocomplete[0])) return true;

            controlGroups.forEach(el => {
                if(el[1].includes(autocomplete[0])) {
                    item.setAttribute('data-tng-autocomplete-group', el[0]);
                    return;
                }
            });
        }

        if(autocomplete.length > 1) {
            let mainTokenIndex = autocomplete.length - 1;
            let mainToken = false;

            //? check main token
            if(normalToken.includes(autocomplete[mainTokenIndex])) {
                mainToken = 'normal';
            } else if(contactToken.includes(autocomplete[mainTokenIndex])) {
                mainToken = 'contact';
            } else {
                return true;
            }

            //? check order tokens
            if(mainToken === 'normal') {
                if(autocomplete.length < 4 && !hint.some(x => autocomplete.includes(x))) {
                    if(autocomplete.length === 2 && (!autocomplete[0].match(group) && !mode.includes(autocomplete[0]))) {
                        return true;
                    }

                    if(autocomplete.length === 3) {
                        if(!autocomplete[0].match(group) || !mode.includes(autocomplete[1])) {
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            }

            if(mainToken === 'contact') {
                if(autocomplete.length < 5) {
                    if(autocomplete.length === 2 && (!autocomplete[0].match(group) && !mode.includes(autocomplete[0]) && !hint.includes(autocomplete[0]))) {
                        return true;
                    }

                    if(autocomplete.length === 3) {
                        if(autocomplete[0].match(group)) {
                            if(!mode.includes(autocomplete[1]) && !hint.includes(autocomplete[1])) {
                                return true;
                            }
                        } else if(mode.includes(autocomplete[0]) && !hint.includes(autocomplete[1])) {
                            return true;
                        } else if(hint.includes(autocomplete[0])) {
                            return true;
                        }
                    }

                    if(autocomplete.length === 4) {
                        if(!autocomplete[0].match(group) || !mode.includes(autocomplete[1]) || !hint.includes(autocomplete[2])) {
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            }

            controlGroups.forEach(el => {
                if(el[1].includes(autocomplete[mainTokenIndex])) {
                    item.setAttribute('data-tng-autocomplete-group', el[0]);
                    return;
                }
            });
        }
    },
    mark: {attrs: ['autocomplete']},
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "Champs de formulaire possèdant un attribut autocomplete valide mais non autorisé sur le type de champ.",
    query: '[data-tng-autocomplete-group]',
    expectedNbElements: 0,
    filter: function(item) {
        if(item.tagName.toLowerCase() === 'textarea' || item.tagName.toLowerCase() === 'select') {
            item.setAttribute('data-tng-autocomplete', true);
            return;
        }

        let group = item.getAttribute('data-tng-autocomplete-group');
        let type = '';

        if(item.hasAttribute('type')) {
            type = item.getAttribute('type').toLowerCase();
        } else {
            type = 'text';
        }

        if(group === 'multiline') return true;

        if(type === 'text' || type === 'search') {
            item.setAttribute('data-tng-autocomplete', true);
            return;
        }

        if(type === group) {
            item.setAttribute('data-tng-autocomplete', true);
            return;
        }

        return true;
    },
    mark: {attrs: ['autocomplete', 'type']},
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "Champs de formulaire possèdant un attribut autocomplete valide.",
    query: '[data-tng-autocomplete]',
    description: "Vérifier que l'attribut autocomplete est pertinent au regard du type d'information attendue.",
    mark: {attrs: ['autocomplete']},
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

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
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.1.1'] }
});

//* 12.2 Dans chaque ensemble de pages, le menu et les barres de navigation sont-ils toujours à la même place (hors cas particuliers) ?
// 12.2.1 Dans chaque ensemble de pages, chaque page disposant d'un menu ou de barres de navigation vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages le menu et les barres de navigation sont toujours à la même place dans la présentation ET se présentent toujours dans le même ordre relatif dans le code source.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.2.1'] }
});

//* 12.3 La page « plan du site » est-elle pertinente ?
// 12.3.1 La page « plan du site » est-elle représentative de l'architecture générale du site ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "La page « plan du site » doit être représentative de l'architecture générale du site.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.3.1'] }
});

// 12.3.2 Les liens du plan du site sont-ils fonctionnels ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les liens du plan du site doivent être fonctionnels.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.3.2'] }
});

// 12.3.3 Les liens du plan du site renvoient-ils bien vers les pages indiquées par l'intitulé ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les liens du plan du site doivent pointer vers les pages indiquées par l'intitulé.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.3.3'] }
});

//* 12.4 Dans chaque ensemble de pages, la page « plan du site » est-elle atteignable de manière identique ?
// 12.4.1 Dans chaque ensemble de pages, la page « plan du site » est-elle accessible à partir d'une fonctionnalité identique ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la page « plan du site » doit être accessible à partir d'une fonctionnalité identique.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.4.1'] }
});

// 12.4.2 Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » est-elle située à la même place dans la présentation ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » doit être située à la même place dans la présentation.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.4.2'] }
});

// 12.4.3 Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » se présente-t-elle toujours dans le même ordre relatif dans le code source ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers la page « plan du site » doit toujours se présenter dans le même ordre relatif dans le code source.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.4.3'] }
});

//* 12.5 Dans chaque ensemble de pages, le moteur de recherche est-il atteignable de manière identique ?
// 12.5.1 Dans chaque ensemble de pages, le moteur de recherche est-il accessible à partir d'une fonctionnalité identique ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, le moteur de recherche doit être accessible à partir d'une fonctionnalité identique.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.5.1'] }
});

// 12.5.2 Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche est-elle située à la même place dans la présentation ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche doit être située à la même place dans la présentation.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.5.2'] }
});

// 12.5.3 Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche se présente-t-elle toujours dans le même ordre relatif dans le code source ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche doit toujours se présenter dans le même ordre relatif dans le code source.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.5.3'] }
});

//* 12.6 Les zones de regroupement de contenus présentes dans plusieurs pages web (zones d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche) peuvent-elles être atteintes ou évitées ?
// 12.6.1 Dans chaque page web où elles sont présentes, la zone d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche respectent-elles au moins une de ces conditions : 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les zones de regroupement de contenus présentes dans plusieurs pages web (zones d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche) doivent pouvoir être atteintes ou évitées.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.6.1'] }
});

//* 12.7 Dans chaque page web, un lien d'évitement ou d'accès rapide à la zone de contenu principal est-il présent (hors cas particuliers) ?
// 12.7.1 Dans chaque page web, un lien permet-il d'éviter la zone de contenu principal ou d'y accéder (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque page web, un lien doit permettre d'éviter la zone de contenu principal ou d'y accéder.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.7.1'] }
});

// 12.7.2 Dans chaque ensemble de pages, le lien d'évitement ou d'accès rapide à la zone de contenu principal vérifient-il ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque ensemble de pages, le lien d'évitement ou d'accès rapide à la zone de contenu principal doit être situé à la même place dans la présentation  et se présente toujours dans le même ordre relatif dans le code source. Il doit également être visible ou visible à la prise de focus et fonctionnel.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.7.2'] }
});

//* 12.8 Dans chaque page web, l'ordre de tabulation est-il cohérent ?
// 12.8.1 Dans chaque page web, l'ordre de tabulation dans le contenu est-il cohérent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des éléments non restitués mais tabulables.',
	query: HTML.getFocusableElementsSelector(),
	expectedNbElements: 0,
	filter: function (item) {
        if(item.disabled) return;

		var exposedState = item.isNotExposedDueTo;

		if (exposedState.indexOf('css:display') == -1 && exposedState.indexOf('css:visibility') == -1) {
			return item.isNotExposedDueTo.length > 0;
		}
	},
    tags: ['a11y', 'keyboard'],
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
//     tags: ['a11y', 'keyboard'],
//     ressources: { 'rgaa': ['12.8.1'] }
// });

// 12.8.2 Pour chaque script qui met à jour ou insère un contenu, l'ordre de tabulation reste-t-il cohérent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque script qui met à jour ou insère un contenu, l'ordre de tabulation doit rester cohérent.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.8.2'] }
});

//* 12.9 Dans chaque page web, la navigation ne doit pas contenir de piège au clavier. Cette règle est-elle respectée ?
// 12.9.1 Dans chaque page web, chaque élément recevant le focus vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'en',
	name: 'Il est possible d\'atteindre l\'élément suivant ou précédent pouvant recevoir le focus avec la touche de tabulation.',
	query: '[onblur]',
	tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.9.1'] },
	comments: "peut détecter l'attribut onblur (peut-être aussi l'événement) mais ce n'est pas vraiment une preuve que c'est un piège à clavier"
});

//* 12.10 Dans chaque page web, les raccourcis clavier n'utilisant qu'une seule touche (lettre minuscule ou majuscule, ponctuation, chiffre ou symbole) sont-ils contrôlables par l’utilisateur ?
// 12.10.1 Dans chaque page web, chaque raccourci clavier n'utilisant qu'une seule touche (lettres minuscule ou majuscule, ponctuation, chiffre ou symbole) vérifie-t-il l'une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque raccourci clavier n'utilisant qu'une seule touche (lettres minuscule ou majuscule, ponctuation, chiffre ou symbole) un mécanisme permet de désactiver ou configurer le raccourci clavier.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.10.1'] }
});

//* 12.11 Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?
// 12.11.1 Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface doivent, si nécessaire, être atteignables au clavier.",
    status: 'untested',
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.11.1'] }
});

/**
 *? CONSULTATION
 ** tous les tests sont répertoriés
 *TODO reconnaissance des contenus cryptique
 *TODO analyse des scripts
 *TODO contenus en mouvement ou clignotant ?
 */

//* 13.1 Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque limite de temps modifiant le contenu (hors cas particuliers) ?
// 13.1.1 Pour chaque page web, chaque procédé de rafraîchissement (balise <object>, balise <embed>, balise <svg>, balise <canvas>, balise <meta>) vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des balises meta avec un procédé de rafraîchissement inférieur à 20heures.',
    query: 'meta[http-equiv="refresh"][content]',
    expectedNbElements: 0,
    filter: function (item) {
        var content = item.getAttribute('content').trim();

        if (content.length > 0) {
            let redirect = /; *url=.+/i;
            let refresh = /^(\s*\d+\s*){1}/i;

            if(redirect.test(content)) {
                item.setAttribute('data-tng-redirect', true);
                return;
            } else if(refresh.test(content)) {
                content = content.split(';')[0].trim();
                return content > 0 && content < 72000;
            }
        }
    },
    mark: {attrs: ['http-equiv', 'content']},
    tags: ['a11y', 'meta'],
    ressources: { 'rgaa': ['13.1.1']}
});

// 13.1.2  Pour chaque page web, chaque procédé de redirection effectué via une balise <meta> est-il immédiat (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des balises meta avec un procédé de redirection non immédiat.',
    query: '[data-tng-redirect]',
    expectedNbElements: 0,
    filter: function (item) {
        var content = item.getAttribute('content').trim();
        let time = content.match(/^\d+/)[0];
        if(time) return time > 0;
    },
    mark: {attrs: ['http-equiv', 'content']},
    tags: ['a11y', 'meta'],
    ressources: { 'rgaa': ['13.1.2']}
});

// 13.1.3 Pour chaque page web, chaque procédé de redirection effectué via un script vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque procédé de redirection effectué via un script doit être contrôlable par l'utilisateur ou avoir une limite de temps d'au moins 20heures.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.1.3'] }
});

// 13.1.4 Pour chaque page web, chaque procédé limitant le temps d'une session vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque procédé limitant le temps d'une session doit être contrôlable par l'utilisateur ou avoir une limite de temps d'au moins 20heures.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.1.4'] }
});

//* 13.2 Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur. Cette règle est-elle respectée ?
// 13.2.1 Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.2.1'] }
});

//* 13.3 Dans chaque page web, chaque document bureautique en téléchargement possède-t-il, si nécessaire, une version accessible (hors cas particuliers) ?
// 13.3.1 Dans chaque page web, chaque fonctionnalité de téléchargement d'un document bureautique vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque fonctionnalité de téléchargement d'un document bureautique, le document doit être accessible ou posséder une alternative accessible.",
    query: '[href][download]',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.3.1'] }
});

//* 13.4 Pour chaque document bureautique ayant une version accessible, cette version offre-t-elle la même information ?
// 13.4.1 Chaque document bureautique ayant une version accessible vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque document bureautique ayant une version accessible, la version accessible doit offrir la même information.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.4.1'] }
});

//* 13.5 Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) a-t-il une alternative ?
// 13.5.1 Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) doit avoir une alternative.",
    status: 'untested',
    tags: ['a11y', 'accessiblename'],
    ressources: { 'rgaa': ['13.5.1'] }
});

//* 13.6 Dans chaque page web, pour chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) ayant une alternative, cette alternative est-elle pertinente ?
// 13.6.1 Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) doit avoir une alternative pertinente.",
    status: 'untested',
    tags: ['a11y', 'accessiblename'],
    ressources: { 'rgaa': ['13.6.1'] }
});

//* 13.7 Dans chaque page web, les changements brusques de luminosité ou les effets de flash sont-ils correctement utilisés ?
// 13.7.1 Dans chaque page web, chaque image ou élément multimédia (balise <video>, balise <img>, balise <svg>, balise <canvas>, balise <embed> ou balise <object>) qui provoque un changement brusque de luminosité ou un effet de flash vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque image ou élément multimédia qui provoque un changement brusque de luminosité ou un effet de flash, l'effet doit avoir une fréquence inférieur à 3secondes ou une surface totale inférieure à 21825pixels.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.7.1'] }
});

// 13.7.2 Dans chaque page web, chaque script qui provoque un changement brusque de luminosité ou un effet de flash vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque script qui provoque un changement brusque de luminosité ou un effet de flash, l'effet doit avoir une fréquence inférieur à 3secondes ou une surface totale inférieure à 21825pixels.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.7.2'] }
});

// 13.7.3 Dans chaque page web, chaque mise en forme CSS qui provoque un changement brusque de luminosité ou un effet de flash vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Pour chaque mise en forme CSS qui provoque un changement brusque de luminosité ou un effet de flash, l'effet doit avoir une fréquence inférieur à 3secondes ou une surface totale inférieure à 21825pixels.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.7.3'] }
});

//* 13.8 Dans chaque page web, chaque contenu en mouvement ou clignotant est-il contrôlable par l'utilisateur ?
// 13.8.1 Dans chaque page web, chaque contenu en mouvement, déclenché automatiquement, vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu en mouvement déclenché automatiquement doit durer moins de 6 secondes ou être contrôlable par l'utilisateur.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.8.1'] }
});

// 13.8.2 Dans chaque page web, chaque contenu clignotant, déclenché automatiquement, vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque contenu clignotant déclenché automatiquement doit durer moins de 6 secondes ou être contrôlable par l'utilisateur.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.8.2'] }
});

//* 13.9 Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran (portrait ou paysage) (hors cas particuliers) ?
// 13.9.1 Dans chaque page web, chaque contenu vérifie-t-il ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "Le contenu proposé doit être consultable et identique quelle que soit l'orientation de l'écran (portrait ou paysage).",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.9.1'] }
});

//* 13.10 Dans chaque page web, les fonctionnalités utilisables ou disponibles au moyen d'un geste complexe peuvent-elles être également disponibles au moyen d'un geste simple (hors cas particuliers) ?
// 13.10.1 Dans chaque page web, chaque fonctionnalité utilisable ou disponible suite à un contact multipoint est-elle également utilisable ou disponible suite à un contact en un point unique de l’écran (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque fonctionnalité utilisable ou disponible suite à un contact multipoint doit également être utilisable ou disponible suite à un contact en un point unique de l’écran.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.10.1'] }
});

// 13.10.2 Dans chaque page web, chaque fonctionnalité utilisable ou disponible suite à un geste basé sur le suivi d'une trajectoire sur l'écran est-elle également utilisable ou disponible suite à un contact en un point unique de l'écran (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Chaque fonctionnalité utilisable ou disponible suite à un geste basé sur le suivi d'une trajectoire sur l'écran doit également être utilisable ou disponible suite à un contact en un point unique de l’écran.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.10.2'] }
});

//* 13.11 Dans chaque page web, les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran peuvent-elles faire l'objet d'une annulation (hors cas particuliers) ?
// 13.11.1 Dans chaque page web, les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran vérifient-elles l'une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran doivent pouvoir faire l'objet d'une annulation.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.11.1'] }
});

//* 13.12 Dans chaque page web, les fonctionnalités qui impliquent un mouvement de l'appareil ou vers l'appareil peuvent-elles être satisfaites de manière alternative (hors cas particuliers) ?
// 13.12.1 Dans chaque page web, les fonctionnalités disponibles en bougeant l'appareil peuvent-elles être accomplies avec des composants d'interface utilisateur (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les fonctionnalités disponibles en bougeant l'appareil doivent pouvoir être accomplies avec des composants d'interface utilisateur.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.12.1'] }
});

// 13.12.2 Dans chaque page web, les fonctionnalités disponibles en faisant un geste en direction de l'appareil peuvent-elles être accomplies avec des composants d'interface utilisateur (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "Les fonctionnalités disponibles en faisant un geste en direction de l'appareil doivent pouvoir être accomplies avec des composants d'interface utilisateur.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.12.2'] }
});

// 13.12.3 L'utilisateur a-t-il la possibilité de désactiver la détection du mouvement pour éviter un déclenchement accidentel de la fonctionnalité (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "L'utilisateur doit avoir la possibilité de désactiver la détection du mouvement pour éviter un déclenchement accidentel de la fonctionnalité.",
    status: 'untested',
    tags: ['a11y'],
    ressources: { 'rgaa': ['13.12.3'] }
});