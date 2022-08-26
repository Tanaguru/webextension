/**
 *? Gestion des tests
 */
function getXPath(element) {
    var position = 0;
    if (element.parentNode && element.parentNode.nodeType == 1) {
        var children = element.parentNode.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].tagName.toLowerCase() == element.tagName.toLowerCase()) {
                position++;
            }
            if (children[i] == element) {
                break;
            }
        }
    }

    return (element.parentNode.nodeType == 1 ? getXPath(element.parentNode) : '') + '/' + element.tagName.toLowerCase() + '[' + (position ? position : '1') + ']' + (element.hasAttribute('id') && !element.getAttribute('id').match(/[\/\[\]]/g) ? '[@id="' + element.getAttribute('id') + '"]' : '') + (element.hasAttribute('class') && !element.getAttribute('class').match(/[\/\[\]]/g) ? '[@class="' + element.getAttribute('class') + '"]' : '');
}

function initTanaguru() {
    if (!window.tanaguru) {
        window.tanaguru = {};
        window.tanaguru.tags = new Array();
        window.tanaguru.tests = new Array();
        window.tanaguru.headings = new Array();
    }
}

function addResultSet(name, data) {
    initTanaguru();
    window.tanaguru.tests.push(data);
}

function filterTestsByStatus(statuses) {
    if(window.tanaguru && window.tanaguru.tests) {
        if(statuses.length > 0) {
            function matchFilters(test) {
                return statuses.match(test.type);
            }
            window.tanaguru.tests = window.tanaguru.tests.filter(matchFilters);
        } else {
            window.tanaguru.tests = [];
        }
    }
}

function loadTanaguruTests() {
    initTanaguru();
    var tags = [];
    for (var tag in window.tanaguru.tags) {
        tags.push(window.tanaguru.tags[tag]);
    }

    var result = { tags: tags, tests: window.tanaguru.tests, headings: window.tanaguru.headings };

    window.tanaguru = undefined;
    return result;
}

function removeDataTNG(element) {
    let attr = element.attributes;
    let tngAttr = [];
    for(let i = 0; i < attr.length; i++) {
        if(attr[i].name.match(/^data-tng-.*$/)) {
            tngAttr.push(attr[i].name);
        }
    }
    tngAttr.forEach(data => {
        element.removeAttribute(data);
    });
}

function manageOutput(element, an) {
    var status = element.status ? element.status : 'cantTell';
    element.status = undefined;
    an = an ? element.fullAccessibleName : null;

    if(element.nodeType === 10) {
        var canBeReachedUsingKeyboardWith = [];
        var isVisible = false;
        var isNotExposedDueTo = '';

        var fakeelement = "<!DOCTYPE "+(element.name ? element.name : '')+(element.publicId ? ' PUBLIC "' + element.publicId + '"' : '')+(!element.publicId && element.systemId ? ' SYSTEM' : '')+(element.systemId ? ' "' + element.systemId + '"' : '')+'>';
        var e = null;
    } else {
        var canBeReachedUsingKeyboardWith = element.canBeReachedUsingKeyboardWith;
        var isVisible = element.getAttribute('data-tng-el-visible') === "true";
        var isNotExposedDueTo = element.hasAttribute('data-tng-notExposed') ? element.getAttribute('data-tng-notExposed') : '';

        var fakeelement = element.cloneNode(true);
        removeDataTNG(fakeelement);
        
        let fakeChildren = fakeelement.querySelectorAll('*');
        for(let i = 0; i < fakeChildren.length; i++) {
            removeDataTNG(fakeChildren[i]);
        }

        var e = document.createElement(fakeelement.tagName.toLowerCase());
        if (e && e.outerHTML.indexOf("/") != -1) {
            if (fakeelement.innerHTML.length > 300) {
                fakeelement.innerHTML =  '[...]';
            }
        }
    }

    return { status: status, outer: e ? fakeelement.outerHTML : fakeelement, anDetails: an, xpath: e ? getXPath(element) : null, canBeReachedUsingKeyboardWith: canBeReachedUsingKeyboardWith, isVisible: isVisible, isNotExposedDueTo: isNotExposedDueTo};
}

function createTanaguruTag(tag, status) {
    if (!window.tanaguru.tags[tag]) {
        window.tanaguru.tags[tag] = { id: tag, status: status, nbfailures: 0, isNA: 0 };
    }
}

function createTanaguruTest(test) {
    if (test.hasOwnProperty('status') && (test.status == 'untested' || test.status == 'inapplicable')) { // Non testés mais référencés.
        // Initialisation des tags.
        initTanaguru();
        if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
            for (var i = 0; i < test.tags.length; i++) {
                createTanaguruTag(test.tags[i], test.status);
                if(test.status == 'untested' && window.tanaguru.tags[test.tags[i]].status === 'inapplicable') {
                    window.tanaguru.tags[test.tags[i]].status = 'untested';
                }

                if(test.hasOwnProperty('na') && test.na === test.tags[i]) {
                    window.tanaguru.tags[test.na].isNA = 1;
                }
            }
        }
        else {
            createTanaguruTag('others', test.status);
            if(test.status == 'untested' && window.tanaguru.tags['others'].status === 'inapplicable') {
                window.tanaguru.tags['others'].status = 'untested';
            }
        }
        
        // Chargement du résultat.
        var result = {
            name: test.name,
            type: test.status,
            data: [],
            tags: []
        };
        if (test.hasOwnProperty('id')) {
            result.id = test.id;
        }
        if (test.hasOwnProperty('lang')) {
            result.lang = test.lang;
        }
        if (test.hasOwnProperty('description')) {
            result.description = test.description;
        }
        if (test.hasOwnProperty('explanations') && test.explanations.hasOwnProperty(test.status)) {
            result.explanation = test.explanations[test.status];
        }
        result.tags = test.hasOwnProperty('tags') ? test.tags : ['others'];
        if (test.hasOwnProperty('ressources')) {
            result.ressources = test.ressources;
        }
        addResultSet("Nouvelle syntaxe d'écriture des tests", result);
        // Intégrer chaque résultat dans window.tanaguru.tests.
    }
    else if ((test.hasOwnProperty('query') && test.query.constructor == String) || test.hasOwnProperty('contrast') || test.hasOwnProperty('code') || test.hasOwnProperty('node')) {
        // Sélection des éléments.
        if(test.hasOwnProperty('contrast')) {
            var elements = textNodeList[test.contrast];
        } else if(test.hasOwnProperty('code')) {
            var elements = getDuplicateID();
        } else if(test.hasOwnProperty('node')) {
            var elements = test.node ? [test.node] : [];
        } else {
            var elements = document.querySelectorAll(test.query);
        }

        if (elements) {
            // Statut du test par défaut.
            var status = 'inapplicable';
            elements = Array.from(elements);

            // Initialisation des tags.
            initTanaguru();
            if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
                for (var i = 0; i < test.tags.length; i++) {
                    createTanaguruTag(test.tags[i], status);
                }
            }
            else {
                createTanaguruTag('others', status);
            }

            // Gestion du compteur d'éléments testés (avant filtre).
            var counter = null;
            if (test.hasOwnProperty('counter') && test.counter == 'beforefilter') {
                counter = elements.length;
            }

            // Filtre additionnel sur la sélection d'éléments.
            if (test.hasOwnProperty('filter')) {
                if (test.filter.constructor == Function) {
                    elements = elements.filter(test.filter);
                }
                else {
                    console.error("The value of the filter propertie must be a function.");
                }
            }

            // Gestion du compteur d'éléments testés (après filtre).
            if (test.hasOwnProperty('counter') && test.counter == 'afterfilter') {
                counter = elements.length;
            }

            // Calcul du statut du test.
            if (test.hasOwnProperty('expectedNbElements') && !test.hasOwnProperty('status')) {
                if (Number.isInteger(test.expectedNbElements)) {
                    status = elements.length == test.expectedNbElements ? 'passed' : 'failed';
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].status = status;
                    }
                }
                else if (test.expectedNbElements.constructor == Object && (test.expectedNbElements.hasOwnProperty('min') || test.expectedNbElements.hasOwnProperty('max'))) {
                    var min = test.expectedNbElements.hasOwnProperty('min') && Number.isInteger(test.expectedNbElements.min) ? test.expectedNbElements.min : 0;
                    var max = test.expectedNbElements.hasOwnProperty('max') && Number.isInteger(test.expectedNbElements.max) ? test.expectedNbElements.max : null;
                    status = elements.length >= min && (max == null || elements.length <= max) ? 'passed' : 'failed';
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].status = status;
                    }
                }
                else {
                    // Erreur : valeur de la propriété expectedNbElements.
                }
            }
            else {
                if(test.hasOwnProperty('testStatus') && typeof test.testStatus === 'string') {
                    let statusList = ['passed', 'cantTell', 'inapplicable', 'failed'];
                    if(statusList.includes(test.testStatus)) {
                        status = test.testStatus;
                        elements.map(e => e.status = status);
                    }
                }

                if (elements.length == 0) {
                    status = 'inapplicable'; // Voir si le statut "Non applicable" n'est possible que dans le cas d'un nombre d'éléments à vérifier.
                }
            }

            var statuspriority = {
                failed: 4,
                passed: 3,
                cantTell: 2,
                inapplicable: 1,
                untested: 0
            };

            // Traitement par collection.
            var failedincollection = 0;
            if (test.hasOwnProperty('analyzeElements') && !test.hasOwnProperty('status')) {
                if (test.analyzeElements.constructor == Function) {
                    test.analyzeElements(elements);
                    // On modifie le statut du test selon les statuts d'items.
                    for (var e = 0; e < elements.length; e++) {
                        if (elements[e].status == 'failed') {
                            // failedincollection = failedincollection == null ? 0 : failedincollection;
                            failedincollection += 1;
                        }
                        if (statuspriority[status] < statuspriority[elements[e].status]) {
                            status = elements[e].status;
                        }
                    }
                }
            } 

            // Mises à jour des tags (statut du tag et nombre de résultats en erreur).
            if (test.hasOwnProperty('tags') && test.tags.constructor == Array) {
                for (var i = 0; i < test.tags.length; i++) {
                    if(status === 'inapplicable' && window.tanaguru.tags[test.tags[i]].status === 'untested') continue;
                    if (statuspriority[window.tanaguru.tags[test.tags[i]].status] < statuspriority[status]) {
                        window.tanaguru.tags[test.tags[i]].status = status;
                    }
                    if (status == 'failed') {
                        window.tanaguru.tags[test.tags[i]].nbfailures += failedincollection ? failedincollection : (elements.length > 0 ? elements.length : 1);
                    }
                }
            }
            else {
                if(!(status === 'inapplicable' && window.tanaguru.tags['others'].status === 'untested')) {
                    if (statuspriority[window.tanaguru.tags['others'].status] < statuspriority[status]) {
                        window.tanaguru.tags['others'].status = status;
                    }
                    if (status == 'failed') {
                        window.tanaguru.tags['others'].nbfailures += failedincollection ? failedincollection : (elements.length > 0 ? elements.length : 1);
                    }
                }
            }

            let an = false;
            if(test.tags && test.tags.includes('accessiblename')) {
                an = true;
            }

            // Chargement du résultat.
            var outputelements = [];
            if(!test.hasOwnProperty('contrast')) {
                if(!an) outputelements = elements.map(e => manageOutput(e, false));
                else outputelements = elements.map(e => manageOutput(e, true));
            }
            
            if(test.hasOwnProperty('contrast')) {
                let contrastElLength = elements.length;
                for (var i = 0; i < contrastElLength; i++) {
                    var node = elements[i].node;

                    elements[i].canBeReachedUsingKeyboardWith = node.canBeReachedUsingKeyboardWith;
                    elements[i].isNotExposedDueTo = node.hasAttribute('data-tng-notExposed') ? node.getAttribute('data-tng-notExposed') : '';

                    delete elements[i].node;
                }
                
                outputelements = elements;
            }

            var result = {
                name: test.name,
                type: status,
                data: outputelements,
                tags: []
            };
            if (test.hasOwnProperty('id')) {
                result.id = test.id;
            }
            if (test.hasOwnProperty('lang')) {
                result.lang = test.lang;
            }
            if (test.hasOwnProperty('description')) {
                result.description = test.description;
            }
            if (test.hasOwnProperty('explanations') && test.explanations.hasOwnProperty(status)) {
                result.explanation = test.explanations[status];
            }
            if (test.hasOwnProperty('mark')) {
                result.mark = test.mark;
            }
            result.tags = test.hasOwnProperty('tags') ? test.tags : ['others'];
            
            if (test.hasOwnProperty('ressources')) {
                result.ressources = test.ressources;
            }
            if (counter) {
                result.counter = counter;
            }
            if (failedincollection) {
                result.failedincollection = failedincollection;
            }
            
            addResultSet("Nouvelle syntaxe d'écriture des tests", result);
            // Intégrer chaque résultat dans window.tanaguru.tests.
        }
        else {
            // Erreur : valeur de la propriété query.
        }
    }
}