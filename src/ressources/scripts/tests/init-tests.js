var statuses = ['failed', 'cantTell', 'passed'];
var interactiveRoles = ["button", "checkbox", "combobox", "link", "listbox", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "searchbox", "slider", "spinbutton", "switch", "tab", "textbox"];
var DOM_archi;
var interactiveIndex = 0;
var interactives = [];

function isInside(parent, children) {
    let top = parent.top - children.top <= 0;
    let left = parent.left - children.left <= 0;
    let bottom = parent.bottom - children.bottom >= 0;
    let right = parent.right - children.right >= 0;
    
    return top && left && bottom && right;
}

function getElementProperties(element, pos, bgColorParent, positionParent) {
    if(element.localName === "head" || element.localName === "noscript" || element.localName === "noscript") return;
    let exposed = element.isNotExposedDueTo;
    let properties = {
        index: pos,
        role: element.getComputedAriaRole(),
        tag: element.tagName.toLowerCase(),
        position: getPosition(element),
        width: element.offsetWidth,
        height: element.offsetHeight,
        bgImage: window.getComputedStyle(element).getPropertyValue('background-image') != "none",
        bgColor: window.getComputedStyle(element).getPropertyValue('background-color'),
        color: window.getComputedStyle(element).getPropertyValue('color'),
        text: false,
        content: element.textContent,
        interactive: false,
        tab: false,
        visible: (exposed == 'css:display' || exposed == 'css:visibility') ? false : element.isVisible,
        exposed: exposed.length === 0
    };

    if(properties.exposed) {
        properties.tab = element.canBeReachedUsingKeyboardWith.length > 0;

        if(interactiveRoles.includes(properties.role)) {
            properties.interactive = !element.hasAttribute('disabled') && !(element.hasAttribute('aria-disabled') && element.getAttribute('aria-disabled') === "true");
        }
    } else element.setAttribute('data-tng-notExposed', exposed.join());

    if(properties.bgColor === "rgba(0, 0, 0, 0)") {
        if(positionParent && isInside(positionParent, properties.position)) {
            properties.bgColor = bgColorParent;
        } else properties.bgColor = null;
    }

    if(properties.tab || properties.interactive) {
        interactives.push({el: element, prop: properties});
    }

    //todo traiter également les pseudos éléments ::before & ::after
    let child = element.childNodes;
    let elementChild = {};

    for(let i = 1; i <= child.length; i++) {
        let DOMposition = pos+"."+i;
        if(!properties.text && child[i-1].nodeType === 3 && child[i-1].textContent.trim().length > 0) {
            properties.text = true;
        }

        else if(child[i-1].nodeType === 1) {
            let tag = child[i-1].tagName.toLowerCase();
            if(tag === "head" || tag === "script") continue;
            elementChild[DOMposition] = getElementProperties(child[i-1], DOMposition, properties.bgColor);
        }

        else continue;
    }

    if(Object.keys(elementChild).length > 0) properties.child = elementChild;

    element.setAttribute('data-tng-properties', pos);
    element.setAttribute('data-tng-el-exposed', properties.exposed);
    element.setAttribute('data-tng-el-visible', properties.visible);

    if(properties.tab) {
        element.setAttribute('data-tng-interactive-pos', interactiveIndex);
        interactiveIndex++;
    }

    let attributesList = element.attributes;
    for(let i = 0; i < attributesList.length; i++) {
        if(attributesList[i].name.match(/^aria-.*$/)) {
            element.setAttribute('data-tng-ariaAttribute', true);
        }
    }

    return properties;
}

/**
 * ? Define for each node of the page, if it is exposed, visible and has a [aria-*] attribute
 * ! NEED FOR TESTS
 */
function addDataTng() {
    if(document.querySelector('[sdata-tng-hindex]')) cleanSDATA();
    var eList = document.body.querySelectorAll('*');
    var pos = 1;

    eList.forEach(e => {
        e.setAttribute('data-tng-pos', pos);
        pos++;
        let elExposed = e.isNotExposedDueTo;
        if(elExposed.length > 0) {
            e.setAttribute('data-tng-el-exposed', false);
            e.setAttribute('data-tng-notExposed', elExposed.join());
    
            if(elExposed == 'css:display' || elExposed == 'css:visibility') {
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
        document.querySelectorAll('*').forEach(e => removeDataTNG(e));
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
                if(test.depStatus) {
                    let dep = false;
                    test.depStatus.forEach(e => {
                        if(statusUser.match(e)) dep = true;
                    });

                    return dep;
                } else return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchInapplicable);
    }

    if(!statusUser.match('cantTell')) {
        function matchCantTell(test) {
            if(test.testStatus && test.testStatus === 'cantTell') {
                if(test.depStatus) {
                    let dep = false;
                    test.depStatus.forEach(e => {
                        if(statusUser.match(e)) dep = true;
                    });

                    return dep;
                } else return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchCantTell);
    }

    if(!statusUser.match('failed')) {
        function matchFailed(test) {
            if(test.testStatus && test.testStatus === 'failed') {
                if(test.depStatus) {
                    let dep = false;
                    test.depStatus.forEach(e => {
                        if(statusUser.match(e)) dep = true;
                    });

                    return dep;
                } else return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchFailed);
    }

    if(!statusUser.match('passed')) {
        function matchPassed(test) {
            if(test.testStatus && test.testStatus === 'passed') {
                if(test.depStatus) {
                    let dep = false;
                    test.depStatus.forEach(e => {
                        if(statusUser.match(e)) dep = true;
                    });

                    return dep;
                } else return false;
            } else {
                return true;
            }
        }
        
        tanaguruTestsList = tanaguruTestsList.filter(matchPassed);
    }

    if(!statusUser.match('passed') && !statusUser.match('failed')) {
        function matchPassedFailed(test) {
            if(test.expectedNbElements) {
                if(test.depStatus) {
                    test.depStatus.forEach(e => {
                        if(statusUser.match(e)) return true;
                    });
                }

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

        if (test.hasOwnProperty('name') && test.name.startsWith("locale__")) {
            test.name = chrome.i18n.getMessage(test.name.split("locale__")[1]);
        }

        if (test.hasOwnProperty('description') && test.description.startsWith("locale__")) {
            test.description = chrome.i18n.getMessage(test.description.split("locale__")[1]);
        }

        if (test.hasOwnProperty('explanations')) {
            if(test.explanations["passed"].startsWith("locale__")) {
                test.explanations["passed"] = chrome.i18n.getMessage(test.explanations["passed"].split("locale__")[1]);
            }

            if(test.explanations["failed"].startsWith("locale__")) {
                test.explanations["failed"] = chrome.i18n.getMessage(test.explanations["failed"].split("locale__")[1]);
            }
        }

        if (!test.hasOwnProperty('name')) {
            if (!test.hasOwnProperty('id')) continue;
            test.name = chrome.i18n.getMessage('test' + test.id + 'Name');
        }

        if (!test.hasOwnProperty('explanations') && test.hasOwnProperty('id')) {
            var explanations = [];
            for (var j = 0; j < statuses.length; j++) {
                var statusname = statuses[j];
                statusname = statusname[0].toUpperCase() + statusname.substring(1);
                var message = chrome.i18n.getMessage('test' + test.id + 'Explanations' + statusname);
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

if(first === "yes") {
    if(document.querySelector('[sdata-tng-hindex]')) cleanSDATA();

    localStorage.setItem("DOM", JSON.stringify({
        properties: getElementProperties(document.documentElement, 1, null, null)
    }));
    DOM_archi = JSON.parse(localStorage.getItem("DOM"));

    interactivesError = interactives.filter(e => (e.prop.role && e.prop.role != "application") && e.prop.tab != e.prop.interactive);
    interactivesError.forEach(e => e.el.setAttribute('data-tng-interactive-notab', 'true'));

    var tablist = interactives.filter(e => e.prop.tab);
    tablist.sort((a, b) => b.el.tabIndex - a.el.tabIndex);

    var realTabOrder = tablist.slice(0);

    /**
     * ! hautement améliorable
     */
    for(let i = 0; i < realTabOrder.length; i++) {
        let previous = i > 0 ? realTabOrder[i-1] : null;
        let current = realTabOrder[i];

        if(previous && previous.prop.position.left >= current.prop.position.left && previous.prop.position.top >= current.prop.position.top) {
            current.el.setAttribute('data-tng-tab-visual-error', 'true');
        }
    }

    orderPross(tablist);
    getHeadingsMap();

    function moveArrVal(arr, from, to) {
        var elem = arr.splice(from, 1)[0];
        if (to < 0) to += 1;
        arr.splice(to, 0, elem);
        return arr;
    }

    function orderPross(arr) {
        var relaunch = false;
        for(let i = 0; i < arr.length; i++) {
            var pos = parseInt(arr[i].el.getAttribute('data-tng-interactive-pos'));

            if(pos != i) {
                arr[i].el.setAttribute('data-tng-tab-dom-error', 'true');
                arr = moveArrVal(arr, i, pos);
                relaunch = true;
                break;
            }
        }

        if(relaunch) orderPross(arr);
    }
}
var textNodeList = (cat !== 'colors') ? null : getTextNodeContrast();

filterCat();
filterStatus();
launchTests();
filterAllTestsByStatus();
removeAllDataTNG();
loadTanaguruTests();
