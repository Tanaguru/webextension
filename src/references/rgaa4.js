// TODO: début RGAA.
var tanaguruTestsList = [];


// 1.1.1 - Chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role="img") porteuse d'information a-t-elle une alternative textuelle ? // ne pas traiter les images liens

tanaguruTestsList.push({
    lang: 'fr',
    name: 'liste des images (balise img ou balise possédant l&#x2018;attribut WAI-ARIA role="img") sans nom accessible',
    query: 'img:not([role]), [role="img"]',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        var IName = item.tagName;
        if (IName != 'svg') {
            if (!item.closest('a')){
                if (IName == 'IMG') {
                    if (item.hasAttribute('alt')){
                        if (item.getAttribute('alt') != '') {
                            return item.getAttribute('alt') == ' ' ;
                        }
                        return false;
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
        var IName = item.tagName;
        if (IName != 'svg') {
            if (IName == 'IMG') {
                if (item.hasAttribute('alt')){
                    if (item.getAttribute('alt') != '') {
                        if(item.getAttribute('alt') == ' ') {
                            return false;
                        }
                    }
                    else return false;
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
    name: 'Liste d&#x2018images réactives (balise area) sans nom accessible ?',
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
    name: 'Liste d&#x2018images réactives (balise area) avec un nom accessible ?',
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
    name: 'Liste de boutons de type image (balise input avec l&#x2018;attribut type="image") Sans nom accessible ?',
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
    name: 'Liste de boutons de type image (balise input avec l&#x2018;attribut type="image") avec un nom accessible ?',
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
    name: 'Liste de zones cliquables d&#x2018une image réactive côté serveur qui ne sont pas doublée d&#x2018;un lien dans la page ?',
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
    name: 'Liste de zones cliquables d&#x2018une image réactive côté serveur doublée d&#x2018;un lien dans la page ?',
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
    name: 'Liste d&#x2018;images vectorielles (balise svg) sans nom accessible ?',
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
    name: 'Liste d&#x2018;images vectorielles (balise svg) avec un nom accessible ?',
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
    name: 'Liste d&#x2018;images objet (balise object avec l&#x2018;attribut type="image/…") sans nom accessible ?',
    query: 'object[type]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.6'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d&#x2018;images objet (balise object avec l&#x2018;attribut type="image/…") avec un nom accessible ?',
    query: 'object[type]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
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
    name: 'Liste d&#x2018;images embarquées (balise embed avec l&#x2018;attribut type="image/…") sans nom accessible ?',
    query: 'embed[type]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){

            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.7'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d&#x2018;images embarquées (balise embed avec l&#x2018;attribut type="image/…") avec un nom accessible ?',
    query: 'embed[type]:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
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
    name: 'Liste d&#x2018images bitmap (balise canvas) sans nom accessible ?',
    query: 'canvas:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances n&#x2018;ont pas de nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.1.8'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d&#x2018images bitmap (balise canvas) avec un nom accessible ?',
    query: 'canvas:not([role])',
    description: 'ce test vérifie si les images restituées par les technologies d&#x2018;assistances ont un nom accessible',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length > 80) {
            item.setAttribute('data-tanaguruAltLong','true');
        }
        else if (item.isNotExposedDueTo.length == 0 && item.accessibleName.length <= 80) {
            item.setAttribute('data-tanaguruAltLong','false');
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
        if (item.hasAttribute('alt')){
            if(item.getAttribute('alt') == '') {
                return true;
            }
        }
        if (item.hasAttribute('aria-hidden')){
            if (item.getAttribute('aria-hidden="true"')) {
                return true;
            }
        }
        if (item.hasAttribute('role')){
            if (item.getAttribute('role') == "presentation") {
                return true;
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
    name: 'Liste de zones non cliquables (balise area sans attribut href) ignorées par les technologies d&#x2018;assistance ?',
    query: 'area:not([role]):not([href]), area[role="presentation"]',
    filter: function (item) {
        if (item.hasAttribute('role')){
            if ((item.getAttribute('role') == "presentation")||item.getAttribute('aria-hidden="true"')) {
                return true;
            };
        };
        if (( item.hasAttribute('alt') && !item.hasAttribute('aria-label') )){
            return item.getAttribute('alt')=='';
        }
        else return false;
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
    name: 'Liste d&#x2018;images objets (balise object avec l&#x2018;attribut type="image/…") ignorées par les technologies d&#x2018;assistance ?',
    query: 'object[type]:not([role])',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            if (item.getAttribute('aria-hidden="true"')) {
                return true;
            };
            return item.isNotExposedDueTo.length != 0;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-hidden','role']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.3'] }
});

// 1.2.4 Chaque image vectorielle (balise svg) de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester

tanaguruTestsList.push({
    lang: 'fr',
    name: ' vectorielle (balise svg) ignorées par les technologies d&#x2018;assistance ?',
    query: 'svg[aria-hidden="true"]',
    filter: function (item) {
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
    name: ' Liste d&#x2018;image vectorielle (balise svg) de décoration non ignorées par les technologies d&#x2018;assistance ?',
    query: 'svg[aria-hidden="true"]',
    filter: function (item) {
        var titleTag = item.querySelectorAll("title");
        for (var i = 0; i < titleTag.length; i++) {
            return !titleTag[i].hasAccessibleName;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    mark: { attrs: ['aria-hidden']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.4'] }
});

// 1.2.5  Chaque image bitmap (balise <canvas>) de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d&#x2018images bitmap (balise canvas) ignorées par les technologies d&#x2018assistance ?',
    query: 'canvas[aria-hidden="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length != 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.5'] }
});


// 1.2.6 Chaque image embarquée (balise <embed> avec l'attribut type="image/…") de décoration, sans légende, vérifie-t-elle ces conditions ? // à tester

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste d&#x2018images embarquées (balise embed avec l&#x2018;attribut type="image/…") ignorées par les technologies d&#x2018assistance ?',
    query: 'embed[type]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.isNotExposedDueTo.length != 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    mark: { attrs: ['alt','aria-label','aria-labelledby','title']},
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.2.6'] }
});

// 1.3.1

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces d&#x2018images (balise img ou balises possédant l&#x2018attribut WAI-ARIA role="img") ont-elles un nom accessible pertinent ?',
    query: 'img:not([role]), [role="img"]',
    filter: function (item) {
        var IName = item.tagName;
        if (IName != 'svg') {
            if (IName == 'IMG') {
                if (item.hasAttribute('alt')){
                    return item.getAttribute('alt') == ' '||item.getAttribute('alt') == '';
                }
            }
            if (item.isNotExposedDueTo.length == 0 && item.hasAccessibleName()){
                if (item.accessibleName.length > 80) {
                    item.addClass('tanaguruLongAlt');
                }
                return true;
            }
            return false;
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
    name: 'Ces zones (balise area) d&#x2018une image réactive ont-elles un nom accessible pertinent ?',
    query: 'area:not([role])',
    filter: function (item) {
        if (item.hasAttribute('alt')){
            return item.getAttribute('alt') == ' ';
        }
        return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.2'] }
});

// 1.3.3 Pour chaque bouton de type image (balise <input> avec l'attribut type="image"), ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces boutons de type image (balise input avec l&#x2018;attribut type="image") ont-elles un nom accessible pertinent ?',
    query: 'input[type="image"]:not([role])',
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.3'] }
});

// 1.3.4 Pour chaque image objet (balise <object> avec l'attribut type="image/…") porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images objet (balise object avec l&#x2018;attribut type="image/…") ont-elles un nom accessible pertinent ?',
    query: 'object[type]:not([role])',
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'canTell';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.4'] }
});

// 1.3.5 Pour chaque image embarquée (balise <embed> avec l'attribut type="image/…") porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Ces images embarquées (balise embed avec l&#x2018;attribut type="image/…") ont-elles un nom accessible pertinent ?',
    query: 'embed[type]:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        if (item.getAttribute('type').startsWith("image/")){
            return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
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
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.6'] }
});

// 1.3.7 Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ? // traiter le cas particulier

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Ces images bitmap (balise canvas) ont-elles un nom accessible pertinent ?',
    query: 'canvas:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.7'] }
});

// 1.3.8 Pour chaque image bitmap (balise <canvas>) porteuse d'information et ayant un contenu alternatif entre <canvas> et </canvas>, ce contenu alternatif est-il correctement restitué par les technologies d'assistance ? //traiter le cas particulier

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Pour chaque image bitmap (balise canvas) porteuse d&#x2018information, ayant une alternative textuelle ou un contenu alternatif, cette alternative est-elle pertinente (hors cas particuliers) ?',
    query: 'canvas:not([role])',
    expectedNbElements: 0,
    filter: function (item) {
        return item.isNotExposedDueTo.length == 0 && item.hasAccessibleName();
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'cantTell';
        }
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.8'] }
});

// 1.3.9 Pour chaque image porteuse d'information et ayant une alternative textuelle, l'alternative textuelle est-elle courte et concise (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le nom accessible de ces images est-il court ?',
    query: '[data-tanaguruAltLong="true"]',
    expectedNbElements: 0,
    filter: function (item) {
        return true;
    },
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
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.3.9'] }
});

// 1.4.1 à traiter

// 1.9.1 Chaque légende d&#x2018image est-elle, si nécessaire, correctement reliée à l&#x2018image correspondante ?

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Liste des légendes d&#x2018image non reliées à l&#x2018image correspondante ?',
    query: 'figure img, figure input[type="image"], figure input[role="image"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue != parentFigureLabel;
                    }
                }
            }
        }
        return true;
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des légendes d&#x2018image reliées à l&#x2018image correspondante ?',
    query: 'figure img, figure input[type="image"], figure input[role="image"]',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue == parentFigureLabel;
                    }
                }
            }
        }
        return false;
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
    name: ' Chaque image objet pourvue d&#x2018une légende (balise object avec l&#x2018;attribut type="image/…" associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure object[type="image"]',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue != parentFigureLabel;
                    }
                }
            }
        }
        return true;
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Chaque image objet pourvue d&#x2018une légende (balise object avec l&#x2018;attribut type="image/…" associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure object[type="image"]',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue == parentFigureLabel;
                    }
                }
            }
        }
        return false;
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
    name: ' Chaque image embarquée pourvue d&#x2018une légende (balise <embed> associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure embed',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue != parentFigureLabel;
                    }
                }
            }
        }
        return true;
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Chaque image embarquée pourvue d&#x2018une légende (balise <embed> associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure embed',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue == parentFigureLabel;
                    }
                }
            }
        }
        return false;
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
    name: ' Chaque image vectorielle pourvue d&#x2018une légende (balise svg associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure svg',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue != parentFigureLabel;
                    }
                }
            }
        }
        return true;
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.4'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Chaque image vectorielle pourvue d&#x2018une légende (balise svg associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure svg',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue == parentFigureLabel;
                    }
                }
            }
        }
        return false;
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
    name: ' Chaque image bitmap pourvue d&#x2018une légende (balise canvas associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure canvas',
    expectedNbElements: 0,
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue != parentFigureLabel;
                    }
                }
            }
        }
        return true;
    },
    tags: ['a11y', 'images', 'accessiblename'],
    ressources: { 'rgaa': ['1.9.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: ' Chaque image bitmap pourvue d&#x2018;une légende (balise canvas associée à une légende adjacente), vérifie-t-elle, si nécessaire, ces conditions ?',
    query: 'figure canvas',
    filter: function (item) {
        var parentFigure = item.closest('figure');
        if (parentFigure.hasAttribute('role')) {
            var parentRole = parentFigure.getAttribute('role');
            if ((parentRole == 'figure')||(parentRole == 'group')) {
                if (parentFigure.hasAttribute('aria-label')) {
                    var parentFigureLabel = parentFigure.getAttribute('aria-label');
                    if (parentFigure.querySelector('figcaption')) {
                        var figcaptionValue = parentFigure.querySelector('figcaption').accessibleName;
                        return figcaptionValue == parentFigureLabel;
                    }
                }
            }
        }
        return false;
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
        var titleAttr = item.getAttribute('title');
        if (titleAttr == "" || titleAttr == " ") {
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
    filter: function (item) {
        var titleAttr = item.getAttribute('title');
        if (titleAttr == "" || titleAttr == " ") {
            return item.isNotExposedDueTo.length == 0;
        }
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'failed';
        }
    },
    mark: { attrs: ['title']},
    tags: ['a11y', 'frames', 'accessiblename'],
    ressources: {'rgaa': ['2.2.1']}
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

// // 4.1.2 Chaque média temporel pré-enregistré seulement vidéo, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire que l&#x2018;information est également présente sous forme d&#x2018;audio ou de transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.1.2']}
});

// // 4.1.3  Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?

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

// 4.2.2 Pour chaque média temporel pré-enregistré seulement audio, ayant une transcription textuelle, celle-ci est-elle pertinente (hors cas particuliers) ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement vidéos',
    query: 'video, object[type="video/mpeg"], object[type="video/avi"], object[type="video/x-ms-wmv"], object[type="video/quicktime"]',
    description:'Vérifiez si nécessaire la pertinence de l&#x2018;alternative audio ou de la transcription',
    tags: ['a11y', 'videos'],
    ressources: {'rgaa': ['4.2.2']}
});

// 4.2.3 Pour chaque média temporel pré-enregistré seulement audio, ayant une transcription textuelle, celle-ci est-elle pertinente (hors cas particuliers) ?

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

// // 4.3.2 Pour chaque média temporel synchronisé pré-enregistré possédant des sous-titres synchronisés diffusés via une balise <track>, la balise <track> possède-t-elle un attribut kind="captions" ?

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres synchronisés diffusés via une balise <track> sans attribut kind="captions"',
    query: 'video',
    tags: ['a11y', 'videos'],
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length != 0) {
            for (var i = 0; i < trackTag.length; i++) {
                return trackTag[i].getAttribute('kind') != 'subtitles';
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

// retourne Indéterminé à la place de Validé. // @rg
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres synchronisés diffusés via une balise <track> avec attribut kind="captions"',
    query: 'video',
    tags: ['a11y', 'videos'],
    filter: function (item) {
        var trackTag = item.querySelectorAll('track');
        if (trackTag.length != 0) {
            for (var i = 0; i < trackTag.length; i++) {
                return trackTag[i].getAttribute('kind') == 'subtitles';
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
                return trackTag[i].getAttribute('kind') == 'subtitles';
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

// 5.5.1

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
    ressources: {'rgaa': ['5.4.1']}
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
    ressources: {'rgaa': ['5.4.1']}
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
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textcontent == "")) {
            return item.isNotExposedDueTo.length == 0 && !item.hasAccessibleName();
        }
    },
    tags: ['a11y', 'links', 'accessiblename'],
    ressources: {'rgaa': ['6.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des liens images avec un nom accessibe',
    query: 'a:not([role]), [role="link"]',
    description:'Vérifiez la pertinence des noms accessibles des images',
    filter: function (item) {
        if ((item.querySelector('img, [role="img"], svg, object[type="image"], embed, canvas') != null) && (item.textcontent == "")) {
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

// 8.1.1 Pour chaque page web, le type de document (balise doctype) est-il présent ?
// Comment gérer le doctype

// 8.2.2 Pour chaque déclaration de type de document, le code source généré de la page vérifie-t-il ces conditions (hors cas particuliers) ?

// 8.3.1 : Pour chaque page web, l'indication de langue par défaut vérifie-t-elle une de ces conditions ?
// incomplete (devrait gérer les attributs lang sur les éléments contenant du texte)
// gérer xml:lang

tanaguruTestsList.push({
    lang: 'fr',
    name: 'La langue de la page n&#x2018;est pas spécifié',
    expectedNbElements: 0,
    query: 'html:not([lang])',
    tags: ['a11y', 'languages'],
    ressources: {'rgaa': ['8.3.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque page web, l&#x2018;indication de langue par défaut vérifie-t-elle une de ces conditions ?',
    query: 'html',
    filter: function (item) {
        return (item.hasAttribute('lang'));
    },
    analyzeElements: function (collection) {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 'passed';
        }
    },
    tags: ['a11y', 'languages'],
    ressources: {'rgaa': ['8.3.1']}
});

//8.4.1 Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?
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

//8.8.1 à implémenter
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?',
    description: 'ne pas utiliser de double br pour créer des espaces entre les éléments textes',
    query: 'br + br',
    expectedNbElements: 0,
    filter: function (item) {
        var textBetween = item.previousSibling.nodeValue;
        if ((textBetween == "")||(textBetween == null)){
            return item.isNotExposedDueTo.length == 0;
        }
    },
    tags: ['a11y','mandatory'],
    ressources: {'rgaa': ['8.6.1']}
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
    name: 'Vérifier la pertinece des titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level)',
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
    name: 'Dans chaque page web, les balises servant à la présentation de l&#x2018information ne doivent pas être présentes dans le code source généré des pages.',
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
    ressources: { 'rgaa': ['11.1.1']}
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
    ressources: { 'rgaa': ['11.3.1']}
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
    ressources: { 'rgaa': ['11.3.1']}
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