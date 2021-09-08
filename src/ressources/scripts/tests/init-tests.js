var statuses = ['failed', 'cantTell', 'passed'];

let startDataTng = new Date().getTime() / 1000;
let elements = document.body.querySelectorAll('*');

elements.forEach(e => {
    if(e.isNotExposedDueTo.length > 0) {
        e.setAttribute('data-tng-el-exposed', false);
    } else {
        e.setAttribute('data-tng-el-exposed', true);
    }

    if(e.isVisible) {
        e.setAttribute('data-tng-el-visible', true);
    } else {
        e.setAttribute('data-tng-el-visible', false);
    }

    let attributesList = e.attributes;
    for(let i = 0; i < attributesList.length; i++) {
        if(attributesList[i].name.match(/^aria-.*$/)) {
            e.setAttribute('data-tng-ariaAttribute', true);
        }
    }
});

let endDataTng = new Date().getTime() / 1000;
console.log('data tng : ', endDataTng - startDataTng);

let startTest = new Date().getTime() / 1000;
let testsLength = tanaguruTestsList.length;

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

let endTest = new Date().getTime() / 1000;
let durationTest = endTest - startTest;
console.log('tests time : ', durationTest);

// code.
loadTanaguruTests();