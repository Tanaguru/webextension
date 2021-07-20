// TODO: début RGAA.
var tanaguruTestsList = [];

// 1.1 Chaque image porteuse d'information a-t-elle une alternative textuelle ?
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
    filter: function (item) {
        if (item.hasAttribute('href')){
            if (item.hasAttribute('aria-label')){
                var alAttribute = item.getAttribute('aria-label');
                if (alAttribute == " ") {
                    return item.isNotExposedDueTo.length == 0;
                }
                if (alAttribute.length > 0){
                    return false;
                }
            }
            if (item.hasAttribute('alt')){
                var altAttribute = item.getAttribute('alt');
                if (altAttribute == " " ){
                    return item.isNotExposedDueTo.length == 0;
                }
                if (altAttribute.length > 0){
                    return false;
                }
            }
            return item.isNotExposedDueTo.length == 0;
        }
        else {
            if (item.hasAttribute('aria-label')){
                var alAttribute = item.getAttribute('aria-label');
                if (alAttribute == " ") {
                    return item.isNotExposedDueTo.length == 0;
                }
                if (alAttribute.length > 0){
                    return false;
                }
            }
            if (item.hasAttribute('alt')){
                var altAttribute = item.getAttribute('alt');
                if (altAttribute == " " ){
                    return item.isNotExposedDueTo.length == 0;
                }
                return false;
            }
            return item.isNotExposedDueTo.length == 0;
        }
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
        if (item.hasAttribute('href')){
            if (item.hasAttribute('aria-label')){
                var alAttribute = item.getAttribute('aria-label');
                if (alAttribute == " ") {
                    return !item.isNotExposedDueTo.length == 0;
                }
                if (alAttribute.length > 0){
                    return true;
                }
            }
            if (item.hasAttribute('alt')){
                var altAttribute = item.getAttribute('alt');
                if (altAttribute == " " ){
                    return !item.isNotExposedDueTo.length == 0;
                }
                if (altAttribute.length > 0){
                    return true;
                }
                else return !item.isNotExposedDueTo.length == 0;
            }
            return item.isNotExposedDueTo.length == 0;
        }
        else {
            if (item.hasAttribute('aria-label')){
                var alAttribute = item.getAttribute('aria-label');
                if (alAttribute == " ") {
                    return !item.isNotExposedDueTo.length == 0;
                }
                if (alAttribute.length > 0){
                    return true;
                }
            }
            if (item.hasAttribute('alt')){
                var altAttribute = item.getAttribute('alt');
                if (altAttribute == " " ){
                    return !item.isNotExposedDueTo.length == 0;
                }

                return true;
            }
            return item.isNotExposedDueTo.length == 0;
        }
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

//TODO hasAccessibleName ne teste pas le title sur les balises object & embed

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

//1.2.1 Chaque image (balise <img>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d\'images (balise img) ignorées par les technologies d\'assistance',
    query: 'img:not([role]), img[role="presentation"]',
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent) {
                    return !parent.querySelector('figcaption').textContent.trim().length > 0;
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
                return true;
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

// 1.2.2 Chaque zone non cliquable (balise <area> sans attribut href) de décoration, vérifie-t-elle une de ces conditions ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de zones non cliquables (balise area sans attribut href) ignorées par les technologies d\'assistance',
    query: 'area:not([role]):not([href]), area[role="presentation"]:not([href])',
    filter: function (item) {
        if (item.hasAttribute('role')){
            if ((item.getAttribute('role') == "presentation")) {
                return true;
            };
        };

        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden') == "true") {
                return true;
            }
        }

        if (item.hasAttribute('alt') && !item.hasAttribute('aria-label')){
            return item.getAttribute('alt') == '';
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
                    if(parent.querySelector('figcaption').textContent) {
                        return !parent.querySelector('figcaption').textContent.trim().length > 0;
                    }
                }
            }

            //TODO pas possible de tester si l'élément a un aria-hidden="true" ET un nom accessible car hasAccessibleName() renvoie false quand isNotExposedDueTo.length === 0
            if (item.textContent && item.textContent.trim().length > 0) {
                return false;
            }

            return item.isNotExposedDueTo.length !== 0;
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
    name: 'Liste d\'images objets (balise object avec l\'attribut type="image/…") non ignorées par les technologies d\'assistance',
    query: 'object[type][aria-hidden="true"]:not([role]), object[type][aria-hidden="true"][role="img"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            var parent = item.parentNode;

            if(parent) {
                var parentTag = parent.tagName.toLowerCase();

                if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                    if(parent.querySelector('figcaption').textContent) {
                        return !parent.querySelector('figcaption').textContent.trim().length > 0;
                    }
                }
            }

            //TODO pas possible de tester si l'élément a un aria-hidden="true" ET un nom accessible car hasAccessibleName() renvoie false quand isNotExposedDueTo.length === 0
            if (item.textContent && item.textContent.trim().length > 0) {
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
                if(parent.querySelector('figcaption').textContent) {
                    return !parent.querySelector('figcaption').textContent.trim().length > 0;
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
    name: 'Liste d\'image vectorielle (balise svg) non ignorées par les technologies d\'assistance',
    query: 'svg[aria-hidden="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent) {
                    return !parent.querySelector('figcaption').textContent.trim().length > 0;
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
                if(parent.querySelector('figcaption').textContent) {
                    return !parent.querySelector('figcaption').textContent.trim().length > 0;
                }
            }
        }

        //TODO pas possible de tester si l'élément a un aria-hidden="true" ET un nom accessible car hasAccessibleName() renvoie false quand isNotExposedDueTo.length === 0
        if (item.textContent && item.textContent.trim().length > 0) {
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
    name: 'Liste d\'images bitmap (balise canvas) non ignorées par les technologies d\'assistance',
    query: 'canvas[aria-hidden="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parent = item.parentNode;

        if(parent) {
            var parentTag = parent.tagName.toLowerCase();

            if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                if(parent.querySelector('figcaption').textContent) {
                    return !parent.querySelector('figcaption').textContent.trim().length > 0;
                }
            }
        }

        //TODO pas possible de tester si l'élément a un aria-hidden="true" ET un nom accessible car hasAccessibleName() renvoie false quand isNotExposedDueTo.length === 0
        if (item.textContent && item.textContent.trim().length > 0) {
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
    query: 'embed[type]:not([role]), embed[type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            var parent = item.parentNode;

            if(parent) {
                var parentTag = parent.tagName.toLowerCase();

                if(parentTag === 'figure' && parent.querySelector('figcaption')) {
                    if(parent.querySelector('figcaption').textContent) {
                        return !parent.querySelector('figcaption').textContent.trim().length > 0;
                    }
                }
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

// 1.3.1

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images (balise img ou balises possédant l\'attribut WAI-ARIA role="img") ont-elles un nom accessible pertinent ?',
    query: 'img:not([role]), [role="img"]',
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.1'] }
});

// 1.3.2 - Pour chaque zone (balise <area>) d'une image réactive porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces zones (balise area) d\'une image réactive ont-elles un nom accessible pertinent ?',
    query: 'area:not([role])',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['alt','aria-label']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.2'] }
});

// 1.3.3 Pour chaque bouton de type image (balise <input> avec l'attribut type="image"), ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces boutons de type image (balise input avec l\'attribut type="image") ont-elles un nom accessible pertinent ?',
    query: 'input[type="image"]:not([role])',
    filter: function (item) {
        return item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.3'] }
});

// 1.3.4 Pour chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images objet (balise object avec l\'attribut type="image/…") ont-elles un nom accessible pertinent ?',
    query: 'object[type]:not([role], object[type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'canTell';
        }
    },
    mark: { attrs: ['aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.4'] }
});

// 1.3.5 Pour chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images embarquées (balise embed avec l\'attribut type="image/…") ont-elles un nom accessible pertinent ?',
    query: 'embed[type]:not([role]), embed[type][role="img"]',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.5'] }
});

// 1.3.6 Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images images vectorielles (balise svg) ont-elles un nom accessible pertinent ?',
    query: 'svg[role="img"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['aria-label','aria-labelledby']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.6'] }
});

// 1.3.7 Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ? // traiter le cas particulier

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Ces images bitmap (balise canvas) ont-elles un nom accessible pertinent ?',
    query: 'canvas:not([role]), canvas[role="img"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['aria-label','aria-labelledby']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.7'] }
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.9'] }
});

// 1.4.1 à traiter

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

// 2.1.1 Chaque cadre a-t-il un titre de cadre ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des cadres sans attribut title',
    query: 'iframe:not([role]), frame:not([role])',
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
    query: 'iframe:not([role]), frame:not([role])',
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

// 2.2.1 Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence des titres des cadres suivants',
    query: 'iframe[title]:not([role]), frame[title]:not([role])',
    filter: function (item) {
        var titleAttr = item.getAttribute('title').trim();
        if (titleAttr.length === 0) {
            return !item.isNotExposedDueTo.length == 0;
        }
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les cadres suivants ont un titre non pertinent',
    query: 'iframe[title]:not([role]), frame[title]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        var titleAttr = item.getAttribute('title').trim();
        if (titleAttr.length === 0) {
            return item.isNotExposedDueTo.length == 0;
        }
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.2.1']}
});

// 3.2 Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?
// 3.2.1 Dans chaque page web, le texte et le texte en image sans effet de graisse d'une taille restituée inférieure à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_45',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste inférieur à 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte sans effet de graisse et d\'une taille restituée inférieure à 24px respectent un contraste d\'au moins 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.1']}
});

// 3.2.2 Dans chaque page web, le texte et le texte en image en gras d’une taille restituée inférieure à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    contrast: 'invalid_45G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée inférieure à 18.5px ayant un contraste inférieur à 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45G',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte en gras d\'une taille restituée inférieure à 18.5px respectent un contraste d\'au moins 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.2']}
});

// 3.2.3 Dans chaque page web, le texte et le texte en image sans effet de graisse d’une taille restituée supérieure ou égale à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste inférieur à 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px respectent un contraste d\'au moins 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.3']}
});

// 3.2.4 Dans chaque page web, le texte et le texte en image en gras d'une taille restituée supérieure ou égale à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste inférieur à 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3G',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte en gras d\'une taille restituée supérieure ou égale à 18.5px respectent un contraste d\'au moins 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
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
    tags: ['a11y', 'contrast'],
    ressources: {'rgaa': ['3.2.4']}
});

// 4.1.1 Chaque média temporel pré-enregistré seulement audio, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement audios',
    query: 'audio, object[type="audio/x-wav"], object[type="audio/mpeg"], object[type="application/ogg"], object[type="audio/x-midi"]',
    description:'Vérifiez si nécessaire la présence d\'une transcription textuelle',
    tags: ['a11y', 'audio'],
    ressources: {'rgaa': ['4.1.1']}
});

// 4.1.2 Chaque média temporel pré-enregistré seulement vidéo, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire que l\'information est également présente sous forme d\'audio ou de transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.1.2']}
});

// 4.1.3  Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la présence d\'une audio-description et d\'une transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.1.3']}
});

// 4.2.1 Pour chaque média temporel pré-enregistré seulement audio, ayant une transcription textuelle, celle-ci est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement audios',
    query: 'audio, object[type="audio/x-wav"], object[type="audio/mpeg"], object[type="application/ogg"], object[type="audio/x-midi"]',
    description:'Vérifiez si elle est présente la pertinence de la transcription textuelle',
    tags: ['a11y', 'audio'],
    ressources: {'rgaa': ['4.2.1']}
});

// 4.2.2 Chaque média temporel pré-enregistré seulement vidéo vérifie-t-il une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la pertinence de l\'alternative audio ou de la transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.2.2']}
});

// 4.2.3 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la pertinence de l\'audio-description ou de la transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.2.3']}
});

// 4.3.1 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la présence de sous-titres',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.3.1']}
});

// 4.3.2 Pour chaque média temporel synchronisé pré-enregistré possédant des sous-titres synchronisés diffusés via une balise <track>, la balise <track> possède-t-elle un attribut kind="captions" ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres synchronisés diffusés via une balise <track> sans attribut kind="captions"',
    query: 'video',
    tags: ['a11y', 'videos'],
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length != 0) {
            for (var i = 0; i < trackTag.length; i++) {
                return trackTag[i].getAttribute('kind') != 'captions';
            }
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    ressources: {'rgaa': ['4.3.2']}
});

// retourne Indéterminé à la place de Validé. // @rg // corrigé @severine
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres synchronisés diffusés via une balise <track> avec attribut kind="captions"',
    query: 'video',
    tags: ['a11y', 'videos'],
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length != 0) {
            for (var i = 0; i < trackTag.length; i++) {
                return trackTag[i].getAttribute('kind') == 'captions';
            }
        }
        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    ressources: {'rgaa': ['4.3.2']}
});

// 4.4.1 Pour chaque média temporel synchronisé pré-enregistré ayant des sous-titres synchronisés, ces sous-titres sont-ils pertinents ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres via la balise track',
    query: 'video',
    description:'Vérifiez la pertinence des sous-titres',
    tags: ['a11y', 'videos'],
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length != 0) {
            for (var i = 0; i < trackTag.length; i++) {
                return trackTag[i].getAttribute('kind') == 'captions';
            }
        }
        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    ressources: {'rgaa': ['4.4.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video',
    description:'Vérifiez, s\'ils existent, la pertinence des sous-titres',
    tags: ['a11y', 'videos'],
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length == 0) {
            return true;
        }
        return false;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    ressources: {'rgaa': ['4.4.1']}
});

// 4.10 Chaque son déclenché automatiquement est-il contrôlable par l'utilisateur ?
// 4.10.1 Chaque séquence sonore déclenchée automatiquement via une balise <object>, <video>, <audio>, <embed>, <bgsound> ou un code JavaScript vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des sons déclenchés automatiquement et non contrôlables par l\'utilisateur.',
	query: 'audio[autoplay]:not([controls])',
    tags: ['a11y', 'audio'],
    ressources: {'rgaa': ['4.10.1'] },
	comments: "Implémentation partielle"
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des sons déclenchés automatiquement et contrôlables par l\'utilisateur.',
	query: 'audio[autoplay][controls]',
	tags: ['a11y', 'audio'],
    ressources: {'rgaa': ['4.10.1'] },
	comments: "Implémentation partielle"
});

// 5.1.1  Pour chaque tableau de données complexe un résumé est-il disponible ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux complexes sans résumé',
    query: 'table:not([role]), [role="table"]',
    description:'Vérifiez si le tableau est complexe, qu\'il comporte un résumé',
    filter: function (item) {
        var thTag = item.querySelectorAll('th');
        var colspanAttribut = item.querySelectorAll('[colspan]');
        var rowspanAttribut = item.querySelectorAll('[rowspan]');
        if (thTag.length !=0 &&(colspanAttribut.length != 0 || rowspanAttribut.length != 0)) {
            var hasCaption = item.querySelector('caption')
            return item.querySelector('caption') == null;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux complexes avec résumé',
    query: 'table:not([role]), [role="table"]',
    description:'Vérifiez si le tableau est complexe, qu\'il comporte un résumé',
    filter: function (item) {
        var thTag = item.querySelectorAll('th');
        var colspanAttribut = item.querySelectorAll('[colspan]');
        var rowspanAttribut = item.querySelectorAll('[rowspan]');
        if (thTag.length !=0 && (colspanAttribut.length != 0 || rowspanAttribut.length != 0)) {
            var hasCaption = item.querySelector('caption')
            return item.querySelector('caption') != null;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.1.1']}
});

// 5.2.1  Pour chaque tableau de données complexe ayant un résumé, celui-ci est-il pertinent ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux complexes avec résumé',
    query: 'table:not([role]), [role="table"]',
    description:'Vérifiez la pertinence du résumé du tableau complexe',
    filter: function (item) {
        var thTag = item.querySelectorAll('th');
        var colspanAttribut = item.querySelectorAll('[colspan]');
        var rowspanAttribut = item.querySelectorAll('[rowspan]');
        if (thTag.length !=0 && (colspanAttribut.length != 0 || rowspanAttribut.length != 0)) {
            var hasCaption = item.querySelector('caption')
            return item.querySelector('caption') != null;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.2.1']}
});

// 5.3.1 Chaque tableau de mise en forme vérifie-t-il ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de mise en forme sans role présentation',
    query: 'table[border="0"][width="100%"]',
    description:'Vérifiez que le contenu linéarisé reste compréhensible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.hasAttribute("role")) {
            var roleAttr = item.getAttribute("role");
            return roleAttr == "presentation";
        }
        return true;
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.3.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de mise en forme avec role présentation',
    query: 'table[role="presentation"]',
    description:'Vérifiez que le contenu linéarisé reste compréhensible',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.3.1']}
});

// 5.4.1 Pour chaque tableau de données ayant un titre, le titre est-il correctement associé au tableau de données ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre',
    query: 'table:not([role]) caption, *[role="table"] caption,table[title]:not([role]),*[title][role="table"],table[aria-label]:not([role]),*[aria-label][role="table"],table[aria-labelledby]:not([role]),*[aria-labelledby][role="table"]',
    description:'Vérifiez que le tableau est bien un tableau de données',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.4.1']}
});

// 5.5.1 Pour chaque tableau de données ayant un titre, ce titre permet-il d'identifier le contenu du tableau de données de manière claire et concise ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre',
    query: 'table:not([role]) caption, *[role="table"] caption,table[title]:not([role]),*[title][role="table"],table[aria-label]:not([role]),*[aria-label][role="table"],table[aria-labelledby]:not([role]),*[aria-labelledby][role="table"]',
    description:'Vérifiez la pertinence du titre',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.5.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des tableaux de données avec un titre non pertinent',
    query: 'table:not([role]), [role="table"]',
    expectedNbElements: 0,
    filter: function (item) {
        var hascaption = item.querySelector('caption');
        if (hascaption != null) {
            if ((hascaption.innerText == "") || (hascaption.innerText == " ")) {
                return true;
            }
        }
        if (item.hasAttribute("aria-label")) {
            var hasAriaLabel = item.getAttribute("aria-label");
            if ((hasAriaLabel == "") || (hasAriaLabel == " ")) {
                return true;
            }
        }
        if (item.hasAttribute("aria-labelledby")) {
            var hasAriaLabelledby = item.getAttribute("aria-labelledby");
            var linkTag = document.querySelector(['#' +hasAriaLabelledby]);
            if (linkTag.hasAccessibleName) {
                return true;
            }
        }
        if (item.hasAttribute("title")) {
            var hasTitle = item.getAttribute("title")
            if ((hasTitle == "")|| (hasTitle == " ")) {
                return true;
            }
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.5.1']}
});

// 5.7 Pour chaque tableau de données, la technique appropriée permettant d'associer chaque cellule avec ses en-têtes est-elle utilisée (hors cas particuliers) ?
// 5.7.4 Pour chaque contenu de balise <td> ou <th> associée à un ou plusieurs en-têtes possédant un attribut id, la balise vérifie-t-elle ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "L'attribut Headers spécifié sur une cellule fait référence à des en-têtes du même élément de tableau.",
	query: 'table td[headers]',
	filter: function (item) {
		var headers = item.getAttribute('headers');
		if (/^.+(\s.+)*$/.test(headers)) {
			headers = headers.split(' ');
			if (headers.length > 1) {
				var result = true;
				for (var i = 0; i < headers.length; i++) {
					var th = document.querySelector('th[id="' + headers[i] + '"]');
					result = th ? th.closest('table') == item.closest('table') : false;
					if (!result) {
						break;
					}
				}
				return result;
			}
			else {
				var th = document.querySelector('th[id="' + headers + '"]');
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
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.4']}
});


// 6.1.1 Pour chaque lien texte l'intitulé de lien seul permet-il d'en comprendre la fonction et la destination ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens texte sans nom accessible',
    query: 'a[href]:not([role]), [role="link"]',
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
    query: 'a[href]:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length != 0 && item.isNotVisibleDueTo.length === 0;
        }
    },
    mark: {attrs: ['role']},
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens texte non visibles non restitués',
    query: 'a[href]:not([role]), [role="link"]',
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length != 0 && item.isNotVisibleDueTo.length > 0;
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
    query: 'a[href]:not([role]), [role="link"]',
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
    query: 'a[href]:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images visibles non restitués',
    query: 'a[href]:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length != 0 && item.isNotVisibleDueTo.length === 0;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images non visibles non restitués',
    query: 'a[href]:not([role]), [role="link"]',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length != 0 && item.isNotVisibleDueTo.length > 0;
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
    query: 'a[href]:not([role]), [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles des images',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
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
    query: 'a[href]:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens composites visibles non restitués',
    query: 'a[href]:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            return item.isNotExposedDueTo.length != 0 && getVisibility(item, getOpacity(item));
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.3']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens composites non visibles non restitués',
    query: 'a[href]:not([role]), [role="link"]',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            return item.isNotExposedDueTo.length != 0 && !getVisibility(item, getOpacity(item));
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
    query: 'a[href]:not([role]), [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles.',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], canvas') != null) && (item.textContent.length > 0)) {
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
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
    query: 'svg a[href]:not([role]), svg [role="link"]',
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
    query: 'svg a[href]:not([role]), svg [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length != 0 && getVisibility(item, getOpacity(item));
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.4']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens SVG non visibles non restitués',
    query: 'svg a[href]:not([role]), svg [role="link"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length != 0 && !getVisibility(item, getOpacity(item));
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
    query: 'svg a[href]:not([role]), svg [role="link"]',
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
    query: 'a[href]:not([role]), [role="link"], svg a[href]:not([role]), svg [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if(getVisibility(item, getOpacity(item)) && item.textContent.trim().length > 1) {
            var linkName = item.textContent.trim().replace(/[[:ponct::]]/, '').toLowerCase();
            var linkAccessibleName = item.accessibleName.replace(/[[:ponct::]]/, '').toLowerCase();
            return item.isNotExposedDueTo.length == 0 && !linkAccessibleName.match(linkName);
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.5']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens ayant un intitulé visible bien repris dans le nom accessible.',
    query: 'a[href]:not([role]), [role="link"], svg a[href]:not([role]), svg [role="link"]',
    filter: function (item) {
        if(getVisibility(item, getOpacity(item)) && item.textContent.trim().length > 1) {
            var linkName = item.textContent.trim().replace(/[[:ponct::]]/, '').toLowerCase();
            var linkAccessibleName = item.accessibleName.replace(/[[:ponct::]]/, '').toLowerCase();
            return item.isNotExposedDueTo.length == 0 && linkAccessibleName.match(linkName);
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

// 6.2.1 Dans chaque page web, chaque lien a-t-il un intitulé entre <a> et </a> ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens sans nom accessible entre <a> et </a>.',
    query: 'a[href]:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0 || getVisibility(item, getOpacity(item))) {
            var children = item.childNodes;
            var linkContent = false;
            for(var i = 0; i < children.length; i++) {
                if(children[i].nodeType === 1 && children[i].hasAccessibleName()) {
                    linkContent = true;
                    break;
                }

                if(children[i].nodeType === 3 && children[i].textContent.trim().length > 0) {
                    linkContent = true;
                    break;
                }
            }
            return !linkContent;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.2.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens avec un nom accessible entre <a> et </a>.',
    query: 'a[href]:not([role]), [role="link"]',
    filter: function (item) {
        if(item.isNotExposedDueTo.length == 0 || getVisibility(item, getOpacity(item))) {
            var children = item.childNodes;
            var linkContent = false;
            for(var i = 0; i < children.length; i++) {
                if(children[i].nodeType === 1 && children[i].hasAccessibleName()) {
                    linkContent = true;
                    break;
                }

                if(children[i].nodeType === 3 && children[i].textContent.trim().length > 0) {
                    linkContent = true;
                    break;
                }
            }
            return linkContent;
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

// 7.1 Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ?
// 7.1.2 Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Boutons visibles ou restitués sans nom accessible.',
	query: 'button:not([role]), [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	expectedNbElements: 0,
    explanations: {
		'passed': "Cette page ne contient pas de bouton visible sans nom accessible.",
		'failed': "Des boutons visibles sans nom accessible sont présents dans la page."
	},
	filter: function (item) {
        if(getVisibility(item, getOpacity(item)) || item.isNotExposedDueTo.length === 0) {
            if(!item.matches('input[type="reset"]:not([aria-labelledby], [aria-label], [value], [title]), input[type="submit"]:not([aria-labelledby], [aria-label], [value], [title])')) {
                return !item.hasAccessibleName();
            }
        }
	},
	tags: ['a11y', 'buttons', 'accessiblename'],
	ressources: {'rgaa': ['7.1.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Boutons visibles ou restitués avec un nom accessible.',
	query: 'button:not([role]), [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	filter: function (item) {
        if(getVisibility(item, getOpacity(item)) || item.isNotExposedDueTo.length === 0) {
            if(item.matches('input[type="reset"]:not([aria-labelledby], [aria-label], [value], [title]), input[type="submit"]:not([aria-labelledby], [aria-label], [value], [title])')) {
                return true;
            }

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

// 8.1 Chaque page web est-elle définie par un type de document ?
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


// 8.2 Pour chaque page web, le code source généré est-il valide selon le type de document spécifié ?
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
	name: 'Attributs aria-* définis dans WAI-ARIA.',
	query: '*',
	filter: function (item) {
		if (item.isNotExposedDueTo.length == 0) {
			return Array.from(item.attributes).filter(function(attributeNode) {
				return /^aria-.*$/.test(attributeNode.nodeName);
			}).length > 0;
		}
		return false;
	},
	analyzeElements: function (collection) {
		var definedStatesProperties = ARIA.getAllStatesProperties('js');
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
			var attributes = Array.from(collection[i].attributes);
			for (var a = 0; a < attributes.length; a++) {
				if (/^aria-.*$/.test(attributes[a].nodeName)) {
					if (definedStatesProperties.indexOf(attributes[a].nodeName) == -1) {
						collection[i].status = 'failed';
						break;
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
        'passed': "Cette page ne contient pas de propriété ARIA non autorisée'.",
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


// vérifier la validité
/*
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des attributs lang invalides',
	query: 'body [lang]',
	expectedNbElements: 0,
	filter: function (item) {
		var lang = item.getAttribute('lang');
		if (lang != '') {
			return lang.trim().length == 0 ? true : !item.hasValidLanguageCode();
		}
		else {
			return false;
		}
	},
	mark: { attrs: ['lang']},
	tags: ['a11y', 'languages','mandatory'],
	ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des attributs lang valides',
	query: 'body [lang]',
	filter: function (item) {
		var lang = item.getAttribute('lang');
		if (lang != '') {
			return lang.trim().length > 0 ? item.hasValidLanguageCode() : false;
		}
		else {
			return false;
		}
	},
	mark: { attrs: ['lang']},
	tags: ['a11y', 'languages','mandatory'],
	ressources: {'rgaa': ['8.4.1']}
});
*/

//8.5.1 Chaque page web a-t-elle un titre de page (balise title) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La page n\'a pas de  titre de page (balise title).',
    query: 'head',
    expectedNbElements: 0,
    filter: function (item) {
        if (!item.querySelector('title')){
            return true;
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.5.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La page a un titre de page (balise title).',
    query: 'head title',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.5.1']}
});

//8.6.1 Pour chaque page web ayant un titre de page (balise title), le contenu de cette balise est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier la pertinence du titre de page (balise title).',
    query: 'head title',
    filter: function(item) {
        if(item.textContent.trim().length > 0) {
            return true;
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
    query: 'head title',
    expectedNbElements: 0,
    filter: function (item) {
        return item.textContent.trim().length === 0;
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

// 8.8 Dans chaque page web, le code de langue de chaque changement de langue est-il valide et pertinent ?
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

// 8.9 Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
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
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"][aria-level="1"], [role="heading"][aria-level="2"], [role="heading"][aria-level="3"], [role="heading"][aria-level="4"], [role="heading"][aria-level="5"], [role="heading"][aria-level="6"]',
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
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"][aria-level="1"], [role="heading"][aria-level="2"], [role="heading"][aria-level="3"], [role="heading"][aria-level="4"], [role="heading"][aria-level="5"], [role="heading"][aria-level="6"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'headings', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

// 9.2.1 Dans chaque page web, la structure du document vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones d\'entêtes',
    query: 'header',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones de pied de page',
    query: 'footer',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que les éléments suivant sont des zones navigation',
    query: 'nav',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que l\'éléments suivant est la zone de contenu principale',
    query: 'main',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La structure du document utilise une balise main visible unique',
    query: 'main',
    expectedNbElements : { max: 1 },
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});


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

// 10.4 Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200%, au moins (hors cas particuliers) ?
// 10.4.2 Dans chaque page web, l'augmentation de la taille des caractères jusqu'à 200 %, au moins, doit être possible pour l’ensemble du texte dans la page. Cette règle est-elle respectée selon une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'La meta viewport ne doit pas empêcher le zoom.',
	query: 'meta[name="viewport"][content]',
	filter: function (item) {
		var content = item.getAttribute('content').trim();
		if (content.length > 0) {
			return /^\s*[^,=]+\s*=\s*[^,=]+\s*(,\s*[^,=]+\s*=\s*[^,=]+\s*)*$/i.test(content);
		}
		else {
			return false;
		}
	},
	analyzeElements: function (collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].status = 'passed';
			var content = collection[i].getAttribute('content').trim();
			content = content.indexOf(',') > -1 ? content.split(',') : content = [content];
			for (var j = 0; j < content.length; j++) {
				var property = content[j].split('=');
				var propertyName = property[0].trim().toLowerCase();
				var propertyValue = property[1].trim().toLowerCase();
				if (propertyName == 'user-scalable') {
					collection[i].status = propertyValue == 'no' ? 'failed' : 'passed';
				}
				else if (propertyName == 'maximum-scale' && /^\d+(\.\d+)?$/.test(propertyValue)) { // TODO : cas 1. / +1. / .1 / +.1
					propertyValue = parseFloat(propertyValue);
					collection[i].status = propertyValue < 2 ? 'failed' : 'passed';
				}
			}
		}
	},
	tags: ['a11y', 'presentation', 'meta'],
    ressources: { 'rgaa': ['10.4.2'] }
});

// 11.1 Chaque champ de formulaire a-t-il une étiquette ?
// 11.1.1 Chaque champ de formulaire vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des champs de formulaires sans nom accessible',
    query: 'input[type="password"]:not([role]), input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]',
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
    description: 'This rule checks that each form field element has an accessible name.',
    query: 'input[type="password"]:not([role]), input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]',
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

// 11.2 : Chaque étiquette associée à un champ de formulaire est-elle pertinente (hors cas particuliers) ?
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
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
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: {attrs: ['aria-labelledby']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.4'] }
});

// tanaguruTestsList.push({
//     lang: 'fr',
//     name: 'Vérifier que le nom accessible de chaque champ de formulaire est pertinent.',
//     query: 'input[type="password"]:not([role]), input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]',
//     filter: function (item) {
//         return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
//     },
//     analyzeElements: function (collection) {
//         for (var i = 0; i < collection.length; i++) {
//             collection[i].status = 'cantTell';
//         }
//     },
//     tags: ['a11y', 'forms', 'accessiblename'],
//     ressources: { 'rgaa': ['11.3.1'] }
// });
// voir pour extraire l'éléments porteur du nom accessible @rg

//11.5.1 : Les champs de même nature vérifient-ils l'une de ces conditions, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que l\'utilisation des balises fieldset et les attributs role group sont bien nécessaire',
    query: 'fieldset, [role="group"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.3.1'] }
});

// 11.6 Dans chaque formulaire, chaque regroupement de champs de même nature a-t-il une légende ?
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

// 11.7 Dans chaque formulaire, chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?
// 11.7.1 Chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez si les légendes associées aux regroupements de champs de formulaires sont pertinentes.',
    query: 'fieldset, [role="group"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: {attrs: ['aria-label', 'aria-labelledby']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.7.1'] }
});

// 11.8 Dans chaque formulaire, les items de même nature d'une liste de choix sont-ils regroupés de manière pertinente ?
// 11.8.2 Dans chaque balise <select>, chaque balise <optgroup> possède-t-elle un attribut label ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des éléments optgroup sans attribut label.',
    query: 'select optgroup',
    expectedNbElements: 0,
    filter: function (item) {
        if(item.hasAttribute('label') && item.getAttribute('label').trim().length > 0) {
            return item.isNotExposedDueTo.length != 0;
        }
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
        if(item.getAttribute('label').trim().length > 0) {
            return item.isNotExposedDueTo.length == 0;
        }
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
    name: 'Vérifiez la pertinence de l\'attribut label sur l\'élément optgroup.',
    query: 'select optgroup[label]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: {attrs: ['label']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.8.3'] }
});

// 11.9 Dans chaque formulaire, l'intitulé de chaque bouton est-il pertinent (hors cas particuliers) ?
// 11.9.1 L'intitulé de chaque bouton est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifiez la pertinence des intitulés de ces boutons.',
    query: 'input[type="submit"][value], input[type="reset"][value], input[type="button"][value], button, input[type="image"][alt], input[type="submit"][aria-label], input[type="submit"][aria-labelledby], input[type="submit"][title], input[type="reset"][aria-label], input[type="reset"][aria-labelledby], input[type="reset"][title], input[type="button"][aria-label], input[type="button"][aria-labelledby], input[type="button"][title], [role="button"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    mark: {attrs: ['aria-labelledby', 'aria-label', 'alt', 'value', 'title']},
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.9.1'] }
});

// 12.8 Dans chaque page web, l'ordre de tabulation est-il cohérent ?
// 12.8.1 Dans chaque page web, l'ordre de tabulation dans le contenu est-il cohérent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Les éléments qui ne sont pas restitués ne sont pas tabulables.',
	query: '[aria-hidden="true"]',
	expectedNbElements: 0,
	filter: function (item) {
		var visibleState = item.isNotVisibleDueTo;
		if (visibleState.length == 0 || (visibleState.indexOf('css:display') == -1 && visibleState.indexOf('css:visibility') == -1)) {
			var focusables = item.querySelectorAll(HTML.getFocusableElementsSelector());
			if (focusables.length == 0) {
				focusables = [];
				var elementsWithTabindex = item.querySelectorAll('[tabindex]');
				for (var i = 0; i < elementsWithTabindex.length; i++) {
					if (/^[1-9]{1}\d*$/.test(elementsWithTabindex[i].getAttribute('tabindex'))) {
						focusables.push(elementsWithTabindex[i]);
						break;
					}
				}
			}
			return focusables.length > 0;
		}
		else {
			return false;
		}
	},
    tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.8.1'] }
});

// 12.9 Dans chaque page web, la navigation ne doit pas contenir de piège au clavier. Cette règle est-elle respectée ?
// 12.9.1 Dans chaque page web, chaque élément recevant le focus vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'en',
	name: 'Il est possible d\'atteindre l\'élément suivant ou précédent pouvant recevoir le focus avec la touche de tabulation.',
	query: '[onblur]',
	tags: ['a11y', 'keyboard'],
    ressources: { 'rgaa': ['12.9.1'] },
	comments: "peut détecter l'attribut onblur (peut-être aussi l'événement) mais ce n'est pas vraiment une preuve que c'est un piège à clavier"
});

//13.1 Pour chaque page web, chaque procédé de rafraîchissement (balise <object>, balise <embed>, balise <svg>, balise <canvas>, balise <meta>) vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des balises meta sans procédé de rafraîchissement',
    query: 'meta[http-equiv="refresh"][content]',
    filter: function (item) {
        var content = item.getAttribute('content').trim();
        if (content.length > 0) {
            return /^(\s*\d+\s*){1}(;|;(url=)?(.)+)?$/i.test(content);
        }
        else {
            return false;
        }
    },
    analyzeElements: function (collection) {
        var alreadyTested = false;
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'untested';
            if (!alreadyTested) {
                var content = collection[i].getAttribute('content').trim();
                if (content.indexOf(';') > -1) {
                    content = content.split(/;(.+)/);
                    content = content[0];
                }
                content = parseInt(content.trim());
                collection[i].status = content == 0 || content >= 72000 ? 'passed' : 'failed';
                alreadyTested = true;
            }
        }
    },
    ressources: { 'rgaa': ['13.1.1']},
    tags: ['a11y', 'meta']
});


// 13.9 Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran (portrait ou paysage) (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'en',
    name: 'la page est consultable quelque soit l\'orientation de l\'écran',
    status: 'untested',
    ressources: { 'rgaa': ['13.9.1'] },
    tags: ['a11y'],
    comments: "Computed styles are not useful/relevant for this test + need to 'identify' some 'root' elements. Require a special UI & a new method of execution ?"
});