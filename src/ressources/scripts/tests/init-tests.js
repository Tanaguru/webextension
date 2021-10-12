var statuses = ['failed', 'cantTell', 'passed'];

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

var textNodeList = getTextNodeContrast();
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

// nettoyer les datas
eList.forEach(e => removeDataTNG(e));

// code.
loadTanaguruTests();