var statuses = ['failed', 'cantTell', 'passed'];
var eList;

/**
 * ? Define for each node of the page, if it is exposed, visible and has a [aria-*] attribute
 * ! NEED FOR TESTS
 */
function addDataTng() {
    eList = document.body.querySelectorAll('*');
    eList.forEach(e => {
        let elExposed = e.isNotExposedDueTo;
        if(elExposed.length > 0) {
            e.setAttribute('data-tng-el-exposed', false);
            e.setAttribute('data-tng-notExposed', elExposed.join());
    
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
}

/**
 * ? Check if page has images, frames, media, tables, links & form fields
 */
function isNACat(currentCat) {
    if(currentCat === 'images') {
        return !document.body.querySelector('img, [role="img"], area, input[type="image"], svg, object[type^="image/"], embed[type^="image/"], canvas');
    }

    if(currentCat === 'frames') {
        return !document.body.querySelector('iframe:not([role="presentation"]), frame:not([role="presentation"])');
    }

    if(currentCat === 'media') {
        return !document.body.querySelector('video, audio, object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]');
    }

    if(currentCat === 'tables') {
        return !document.body.querySelector('table, [role="table]');
    }

    if(currentCat === 'links') {
        return !document.body.querySelector('a[href], [role="link"]');
    }

    if(currentCat === 'forms') {
        return !document.body.querySelector('form, [role="form"], input[type="text"]:not([role]), input[type="password"]:not([role]), input[type="search"]:not([role]), input[type="email"]:not([role]), input[type="number"]:not([role]), input[type="tel"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), input[type="checkbox"]:not([role]), input[type="radio"]:not([role]), input[type="date"]:not([role]), input[type="range"]:not([role]), input[type="color"]:not([role]), input[type="time"]:not([role]), input[type="month"]:not([role]), input[type="week"]:not([role]), input[type="datetime-local"]:not([role]), select:not([role]), datalist:not([role]), input[type="file"]:not([role]), progress:not([role]), meter:not([role]), input:not([type]):not([role]), [role="progressbar"], [role="slider"], [role="spinbutton"], [role="textbox"], [role="listbox"], [role="searchbox"], [role="combobox"], [role="option"], [role="checkbox"], [role="radio"], [role="switch"], [contenteditable="true"]:not([role])');
    }

    return false;
}

/**
 * ? Filters the tests by the user's chosen status
 */
function filterAllTestsByStatus() {
    filterTestsByStatus(statusUser);
}

/**
 * ? remove all [data-tng-*]
 */
function removeAllDataTNG() {
    if(last === "yes") {
        removeDataTNG(document.querySelector('html'));
        eList.forEach(e => removeDataTNG(e));
    }
};

/**
 * ? filter tests list according user choices
 */
function filterCat() {
    /**
     * ? Filters tests according current category request , before launching tests
     */
    if(cat.length > 0) {
        function matchFilters(test) {
            return test.tags && test.tags.includes(cat);
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchFilters);
    }
}

function filterStatus() {
    if(statusUser.length === 0) {
        tanaguruTestsList = [];
        return;
    }

    if(isNACat(cat)) {
        tanaguruTestsList = tanaguruTestsList.map(function(test) {
            test.status = "inapplicable";
            test.na = cat;
            return test;
        });
    }

    if(!statusUser.match('untested')) {
        function matchUntested(test) {
            if(test.status && test.status === 'untested') {
                return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchUntested);
    }

    if(!statusUser.match('inapplicable')) {
        function matchInapplicable(test) {
            if((test.status && test.status === 'inapplicable') || (test.testStatus && test.testStatus === 'inapplicable')) {
                return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchInapplicable);
    }

    if(!statusUser.match('cantTell')) {
        function matchCantTell(test) {
            if(test.testStatus && test.testStatus === 'cantTell') {
                return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchCantTell);
    }

    if(!statusUser.match('failed')) {
        function matchFailed(test) {
            if(test.testStatus && test.testStatus === 'failed') {
                return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchFailed);
    }

    if(!statusUser.match('passed')) {
        function matchPassed(test) {
            if(test.testStatus && test.testStatus === 'passed') {
                return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchPassed);
    }

    if(!statusUser.match('passed') && !statusUser.match('failed')) {
        function matchPassedFailed(test) {
            if(test.expectedNbElements) {
                return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchPassedFailed);
    }
}

/**
 * ? launch tests
 */
function launchTests() {
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
}

if(first === "yes") addDataTng();
var textNodeList = (cat !== 'colors') ? null : getTextNodeContrast();

filterCat();
filterStatus();
launchTests();
filterAllTestsByStatus();
removeAllDataTNG();
loadTanaguruTests();
