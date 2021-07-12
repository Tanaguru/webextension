// TODO: début RGAA.
var tanaguruTestsList = [];

// 1.1 Chaque image porteuse d'information a-t-elle une alternative textuelle ?
// 1.1.1 - Chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role="img") porteuse d'information a-t-elle une alternative textuelle ? // ne pas traiter les images liens
tanaguruTestsList.push({
    lang: 'fr',
    name: 'liste des images (balise img ou balise possédant l&#x2018;attribut WAI-ARIA role="img") sans nom accessible',
    query: 'img:not([role]), [role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
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
    name: 'Liste des images (balise img ou balise possédant l&#x2018;attribut WAI-ARIA role="img") avec un nom accessible',
    query: 'img:not([role]), [role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste d&#x2018images réactives (balise area) sans nom accessible.',
    query: 'area:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
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
    name: 'Liste d&#x2018images réactives (balise area) avec un nom accessible.',
    query: 'area:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste de boutons de type image (balise input avec l&#x2018;attribut type="image") sans nom accessible.',
    query: 'input[type="image"]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'buttons', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste de boutons de type image (balise input avec l&#x2018;attribut type="image") avec un nom accessible.',
    query: 'input[type="image"]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste de zones cliquables d&#x2018une image réactive côté serveur qui ne sont pas doublée d&#x2018;un lien dans la page.',
    query: 'img[ismap]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        var parentLink = item.closest('a');
        if (parentLink != null) {
            console.log(item.outerHTML);
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
    name: 'Liste de zones cliquables d&#x2018une image réactive côté serveur doublée d&#x2018;un lien dans la page.',
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
    name: 'Liste d&#x2018;images vectorielles (balise svg) restituées ne possédant pas d\'attribut role="img".',
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
    name: 'Liste d&#x2018;images vectorielles (balise svg) sans nom accessible',
    query: 'svg[role="img"]',
    expectedNbElements: 0,
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d&#x2018;images vectorielles (balise svg) avec un nom accessible',
    query: 'svg[role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste d&#x2018;images objet (balise object avec l&#x2018;attribut type="image/…") restituées ne possédant pas d\'attribut role="img".',
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
    name: 'Liste d&#x2018;images objet (balise object avec l&#x2018;attribut type="image/…") sans nom accessible',
    query: 'object[type]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
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
    name: 'Liste d&#x2018;images objet (balise object avec l&#x2018;attribut type="image/…") avec un nom accessible',
    query: 'object[type]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste d&#x2018;images embarquées (balise embed avec l&#x2018;attribut type="image/…") restituées ne possédant pas d\'attribut role="img".',
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
    name: 'Liste d&#x2018;images embarquées (balise embed avec l&#x2018;attribut type="image/…") sans nom accessible',
    query: 'embed[type]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
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
    name: 'Liste d&#x2018;images embarquées (balise embed avec l&#x2018;attribut type="image/…") avec un nom accessible',
    query: 'embed[type]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste d&#x2018;images bitmap (balise canvas) restituées ne possédant pas d\'attribut role="img".',
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
    name: 'Liste d&#x2018images bitmap (balise canvas) sans nom accessible',
    query: 'canvas',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
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
    name: 'Liste d&#x2018images bitmap (balise canvas) avec un nom accessible',
    query: 'canvas',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
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
    name: 'Liste d&#x2018;images (balise img) ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste de zones non cliquables (balise area sans attribut href) ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018;images objets (balise object avec l&#x2018;attribut type="image/…") ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018;images objets (balise object avec l&#x2018;attribut type="image/…") non ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018;image vectorielle (balise svg) ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018;image vectorielle (balise svg) non ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018images bitmap (balise canvas) ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018images bitmap (balise canvas) non ignorées par les technologies d&#x2018;assistance',
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
    name: 'Liste d&#x2018images embarquées (balise embed avec l&#x2018;attribut type="image/…") ignorées par les technologies d&#x2018assistance',
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
    name: 'Ces images (balise img ou balises possédant l&#x2018;attribut WAI-ARIA role="img") ont-elles un nom accessible pertinent ?',
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
    name: 'Ces zones (balise area) d&#x2018;une image réactive ont-elles un nom accessible pertinent ?',
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
    name: 'Ces boutons de type image (balise input avec l&#x2018;attribut type="image") ont-elles un nom accessible pertinent ?',
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
    name: 'Ces images objet (balise object avec l&#x2018;attribut type="image/…") ont-elles un nom accessible pertinent ?',
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
    name: 'Ces images embarquées (balise embed avec l&#x2018;attribut type="image/…") ont-elles un nom accessible pertinent ?',
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
    name: 'Liste des images bitmap (balise canvas) porteuse d&#x2018information, ayant un contenu alternatif entre sa balise ouvrante et sa balise fermante correctement restitué par les technologies d\'assistance',
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
    name: 'Liste des images bitmap (balise canvas) porteuse d&#x2018information, ayant un contenu alternatif entre sa balise ouvrante et sa balise fermante non restitué par les technologies d\'assistance',
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
    name: 'Liste des légendes d&#x2018image (balise img, balise input type="image" ou balise role="img") non reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image (balise img, balise input type="image" ou balise role="img") reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image objet non reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image objet reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image embarquées (balise embed) non reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image embarquées (balise embed) reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image vectorielles (balise svg) non reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image vectorielles (balise svg) reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image bitmap (balise canvas) non reliées à l&#x2018image correspondante',
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
    name: 'Liste des légendes d&#x2018image bitmap (balise canvas) reliées à l&#x2018image correspondante',
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
    description:'Vérifiez si nécessaire la présence d&#x2018;une transcription textuelle',
    tags: ['a11y', 'audio'],
    ressources: {'rgaa': ['4.1.1']}
});

// 4.1.2 Chaque média temporel pré-enregistré seulement vidéo, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire que l&#x2018;information est également présente sous forme d&#x2018;audio ou de transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.1.2']}
});

// 4.1.3  Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la présence d&#x2018;une audio-description et d&#x2018;une transcription',
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
    description:'Vérifiez si nécessaire la pertinence de l&#x2018;alternative audio ou de la transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.2.2']}
});

// 4.2.3 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la pertinence de l&#x2018;audio-description ou de la transcription',
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
    description:'Vérifiez, s&#x2018;ils existent, la pertinence des sous-titres',
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
    description:'Vérifiez si le tableau est complexe, qu&#x2018;il comporte un résumé',
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
    description:'Vérifiez si le tableau est complexe, qu&#x2018;il comporte un résumé',
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
            console.log(hascaption);
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


// 6.1.1 Chaque lien texte vérifie-t-il une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens sans nom accessible',
    query: 'a:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});


tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens visibles non restitués',
    query: 'a:not([role]), [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length != 0 && item.isNotVisibleDueTo.length === 0;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens non visibles non restitués',
    query: 'a:not([role]), [role="link"]',
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
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens avec un nom accessible',
    query: 'a:not([role]), [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles des liens',
    filter: function (item) {
        if (item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') == null) {
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

// 6.1.2 Chaque lien image vérifie-t-il une de ces conditions (hors cas particuliers) ? // Gestion des liens sont bizarres

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images sans nom accessible"',
    query: 'a, [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images visibles non restitués"',
    query: 'a, [role="link"]',
    expectedNbElements: 0,
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length != 0 && item.isNotVisibleDueTo.length === 0;
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images non visibles non restitués"',
    query: 'a, [role="link"]',
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
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images avec un nom accessibe',
    query: 'a, [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles des images',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textContent == "")) {
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

// 7.1 Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ?
// 7.1.2 Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Boutons visibles sans nom accessible.',
	query: 'button:not([role]), [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	expectedNbElements: 0,
    explanations: {
		'passed': "Cette page ne contient pas de bouton visible sans nom accessible.",
		'failed': "Des boutons visibles sans nom accessible sont présents dans la page."
	},
	filter: function (item) {
        if(getVisibility(item, getOpacity(item))) {
            return !item.hasAccessibleName();
        }
	},
	tags: ['a11y', 'buttons', 'accessiblename'],
	ressources: {'rgaa': ['7.1.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Boutons visibles avec un nom accessible.',
	query: 'button:not([role]), [role="button"], input[type="reset"]:not([role]), input[type="submit"]:not([role])',
	filter: function (item) {
        if(getVisibility(item, getOpacity(item))) {
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

// 8.1.1 Pour chaque page web, le type de document (balise doctype) est-il présent ?
// Comment gérer le doctype

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
// gérer xml:lang

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La langue de la page n&#x2018;est pas spécifiée.',
    expectedNbElements: 0,
    query: 'html:not([lang])',
    tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.3.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La langue de la page est spécifiée.',
    query: 'html[lang]',
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.3.1']}
});

//8.4.1 Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec un attribut lang vide.',
	query: 'html[lang]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.getAttribute('lang').trim().length == 0;
	},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec un attribut lang non vide.',
	query: 'html[lang]',
	filter: function (item) {
		return item.getAttribute('lang').trim().length > 0;
	},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: "Page HTML avec des attributs lang et xml:lang dont les valeurs ne correspondent pas.",
	query: 'html[lang][xml\\:lang]',
	expectedNbElements: 0,
	filter: function (item) {
		return !item.hasValidLanguageCode || (item.getAttribute('xml:lang').trim().length > 0 && item.getAttribute('lang') != item.getAttribute('xml:lang'));
	},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Page HTML avec des attributs lang et xml:lang dont les valeurs correspondent."',
	query: 'html[lang][xml\\:lang]',
	filter: function (item) {
		return item.hasValidLanguageCode && item.getAttribute('lang') == item.getAttribute('xml:lang');
	},
	analyzeElements: function (collection) {
		if (collection.length == 1) {
			collection[0].status = 'passed';
		}
	},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La langue de la page HTML est invalide.',
	query: 'html[lang]',
	expectedNbElements: 0,
	filter: function (item) {
		return item.getAttribute('lang').trim().length > 0 && !item.hasValidLanguageCode();
	},
	tags: ['a11y', 'languages', 'mandatory'],
    ressources: {'rgaa': ['8.4.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'La langue de la page HTML est valide.',
	query: 'html[lang]',
	filter: function (item) {
		return item.getAttribute('lang').trim().length > 0 && item.hasValidLanguageCode();
	},
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
    name: 'La page n&#x2018;a pas de  titre de page (balise title)',
    query: 'title',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.matches('svg title')){
            return false;
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.5.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La page a un titre de page (balise title) ?',
    query: 'title',
    filter: function (item) {
        if (item.matches('svg title')){
            return false;
        }
        return true;
    },
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
    name: 'Vérifier la pertinence du titre de page (balise title) ?',
    query: 'title',
    filter: function (item) {
        if (item.matches('svg title')){
            return false;
        }
        return true;
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
    name: 'Le titre de la page (balise title) n&#x2018;est pas pertinent',
    query: 'title',
    expectedNbElements: 0,
    filter: function (item) {
        var titleContent=item.textContent;
        return (titleContent=="")||(titleContent==" ");
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
});

//8.7.1 Dans chaque page web, chaque texte écrit dans une langue différente de la langue par défaut vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Dans chaque page web, chaque texte écrit dans une langue différente de la langue par défaut vérifie-t-il une de ces conditions (hors cas particuliers) ?',
    query: '[lang],[xml\\:lang]',
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
	name: 'Elements avec un attribut lang invalide.',
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
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Elements avec un attribut lang valide..',
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
    tags: ['a11y', 'languages', 'mandatory'],
	ressources: { 'rgaa': ['8.8.1'] }
});

// 8.9 Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
// 8.9.1 Dans chaque page web les balises (à l'exception de <div>, <span> et <table>) ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?',
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
    name: 'Dans chaque page web, chaque changement du sens de lecture (attribut dir) vérifie-t-il ces conditions ?',
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
    name: 'Liste des titres de niveau qui ne respecte pas la hierarchie de titres***',
    query: 'h1:not([role]), h2:not([role]), h3:not([role]), h4:not([role]), h5:not([role]), h6:not([role]), [role="heading"]',
    analyzeElements: function (elements) {
        var badHierarchie = -1;
        for (var e = 0; e < elements.length; e++) {
            if (e + 1 < elements.length) {
                var currentlevel = parseInt(elements[e].hasAttribute('aria-level') ? elements[e].getAttribute('aria-level') : elements[e].tagName.substring(1));
                var nextelement = elements[e + 1];
                var nextlevel = parseInt(nextelement.hasAttribute('aria-level') ? nextelement.getAttribute('aria-level') : nextelement.tagName.substring(1));
                if (nextlevel - currentlevel > 1) {
                    //elements[e + 1].status = 'failed';
                    badHierarchie = (e+1);
                }
                if (e == badHierarchie) {
                    elements[e].status = 'failed';
                }
                else {
                    elements[e].status = 'passed';
                }
            }
        }
    },
    tags: ['a11y', 'headings'],
    ressources: { 'rgaa': ['9.1.1'] }
});

// 9.1.2 : Dans chaque page web, le contenu de chaque titre (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-il pertinent ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) non pertinent ?',
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
    name: 'Vérifier que les éléments suivant sont des zones d&#x2018;entêtes ?',
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
    name: 'Vérifier que les éléments suivant sont des zones de pied de page ?',
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
    name: 'Vérifier que les éléments suivant sont des zones navigation ',
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
    name: 'Vérifier que l&#x2018;éléments suivant est la zone de contenu principale ?',
    query: 'main',
    expectedNbElements : { max: 1 },
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'Passed';
        }
    },
    tags: ['a11y', 'structure', 'accessiblename'],
    ressources: { 'rgaa': ['9.1.2'] }
});

// 10.1.1 : Dans chaque page web, les balises servant à la présentation de l'information ne doivent pas être présentes dans le code source généré des pages. Cette règle est-elle respectée ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Dans chaque page web, les balises servant à la présentation de l&#x2018information ne doivent pas être présentes dans le code source généré des pages.',
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
    name: 'Dans chaque page web, les attributs servant à la présentation de l&#x2018information ne doivent pas être présents dans le code source généré des pages.',
    query: '[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [compact], [color], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0;
    },
    mark: { attrs: ['align','alink','background','bgcolor','border','cellpadding','cellspacing','char','charoff','clear','compact', 'color', 'frameborder', 'hspace', 'link', 'marginheight', 'marginwidth', 'text', 'valign', 'vlink', 'vspace', 'size']},
    tags: ['a11y', 'presentation'],
    ressources: { 'rgaa': ['10.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Dans chaque page web, les attributs servant à la présentation de l&#x2018information ne doivent pas être présents dans le code source généré des pages.',
    query: '[width],[height]',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.tagName == "IMG" || item.tagName == "OBJECT" || item.tagName == "EMBED" || item.tagName == "CANVAS" || item.tagName == "SVG")
        {return false;}
        else return item.isNotExposedDueTo.length == 0;
    },
    mark: { attrs: ['width','height']},
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
    ressources: { 'rgaa': ['10.1.2'] }
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

// 11.1.2 : à traiter.

//11.2 :

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que le nom accessible de chaque champ de formulaire est pertinent.',
    query: 'input[type="password"]:not([role]), input[type="checkbox"]:not([role]), [role="checkbox"], [role="switch"], input[type="radio"]:not([role]), [role="radio"], select:not([role]), [role="combobox"], input[type="search"]:not([role]), [role="searchbox"], input[type="range"]:not([role]), [role="slider"], input[type="number"]:not([role]), [role="spinbutton"], input:not([type]):not([role]), input[type="email"]:not([role]), input[type="tel"]:not([role]), input[type="text"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), [contenteditable="true"]:not([role]), [role="textbox"], [role="listbox"], [role="menuitemcheckbox"], [role="menuitemradio"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.3.1'] }
});
// voir pour extraire l'éléments porteur du nom accessible @rg

//11.5.1 : Les champs de même nature vérifient-ils l'une de ces conditions, si nécessaire ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Vérifier que l&#x2018;utilisation des balises fieldset et les attributs role group sont bien nécessaire',
    query: 'fieldset, [role="group"]',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.3.1'] }
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
    ressources: { 'rgaa': ['13.3.1']},
    tags: ['a11y', 'meta']
});


// 13.9 Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran (portrait ou paysage) (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'en',
    name: 'la page est consultable quelque soit l&#x2018;orientation de l&#x2018;écran',
    status: 'untested',
    ressources: { 'rgaa': ['13.9.1'] },
    tags: ['a11y'],
    comments: "Computed styles are not useful/relevant for this test + need to 'identify' some 'root' elements. Require a special UI & a new method of execution ?"
});