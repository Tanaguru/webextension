var statuses = ['failed', 'cantTell', 'passed'];

/**
 * ? Define for each node of the page, if it is exposed, visible and has a [aria-*] attribute
 */
var eList = document.body.querySelectorAll('*');
eList.forEach(e => {
    let elExposed = e.isNotExposedDueTo;
    if(elExposed.length > 0) {
        e.setAttribute('data-tng-el-exposed', false);
        e.setAttribute('data-tng-notExposed', elExposed);

        if(elExposed == 'css:display' || 'css:visibility') {
            e.setAttribute('data-tng-el-visible', false);
        }
    } else {
        e.setAttribute('data-tng-el-exposed', true);
    }

    if(!e.hasAttribute('data-tng-el-visible')) {
        if(e.isVisible) {
            e.setAttribute('data-tng-el-visible', true);
        } else {
            e.setAttribute('data-tng-el-visible', false);
        }
    }
    
    let attributesList = e.attributes;
    for(let i = 0; i < attributesList.length; i++) {
        if(attributesList[i].name.match(/^aria-.*$/)) {
            e.setAttribute('data-tng-ariaAttribute', true);
        }
    }
});

/**
 * ? Filters tests list by the user's chosen categories , before launching tests
 */
var colorTests = true;

if(filters[0].length > 0 && !filters[0].match(/rgaaAll/)) {
    var rgaaFilters = filters[0].split(',');

    function matchFilters(test) {
        let tags = test.tags;
        let matched = false;

        tags.forEach(tag => {
            if(rgaaFilters.includes(tag)) {
                matched = true;
            }
        });
        return matched;
    }
    
    tanaguruTestsList = tanaguruTestsList.filter(matchFilters);
    colorTests = rgaaFilters.includes('colors');
}

/**
 * ? Remove tests defined as "untested" before launching tests, if necessary
 */
if(!filters[1].match(/(?:statusAll)|(?:untested)/gm)) {
    function matchUntested(test) {
        if(test.status && test.status === 'untested') {
            return false;
        } else {
            return true;
        }
    }
    
    tanaguruTestsList = tanaguruTestsList.filter(matchUntested);
}

/**
 * ? Launch contrast script only if necessary
 */
var textNodeList = colorTests ? getTextNodeContrast() : [];

/**
 * ? Launch tests
 */
var testsLength = tanaguruTestsList.length;
for (var i = 0; i < testsLength; i++) {
    /*
        Schéma des clefs :
        testIdName
        testIdExplanationsPassed
        testIdExplanationsFailed
        testIdExplanationsCantTell
        ---
        name: '',
        explanations: { 'passed': '', 'failed': '' }
    */
    var test = tanaguruTestsList[i];
    if (!test.hasOwnProperty('name')) {
        test.name = browser.i18n.getMessage('test' + test.id + 'Name');
    }
    if (!test.hasOwnProperty('explanations') && test.hasOwnProperty('id')) {
        var explanations = [];
        for (var j = 0; j < statuses.length; j++) {
            var statusname = statuses[j];
            statusname = statusname[0].toUpperCase() + statusname.substring(1);
            var message = browser.i18n.getMessage('test' + test.id + 'Explanations' + statusname);
            if (message) {
                explanations.push({ id: statuses[j], text: message });
            }
        }
        if (explanations.length > 0) {
            test.explanations = {};
            for (var j = 0; j < explanations.length; j++) {
                test.explanations[explanations[j].id] = explanations[j].text;
            }
        }
    }
    createTanaguruTest(test);
}

/**
 * ? Filters the tests by the user's chosen status
 */
filterTestsByStatus();

/**
 * ? remove all [data-tng-*]
 */
eList.forEach(e => removeDataTNG(e));

// code.
loadTanaguruTests();