var statuses = ['failed', 'cantTell', 'passed'];
var interactiveRoles = ["button", "checkbox", "combobox", "link", "listbox", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "searchbox", "slider", "spinbutton", "switch", "tab", "textbox"];
var DOM_archi;
var interactiveIndex = 0;
var interactives = [];
window.scrollTo(0,0);

function isInside(parent, children) {
    let top = parent.top - children.top <= 0;
    let left = parent.left - children.left <= 0;
    let bottom = parent.bottom - children.bottom >= 0;
    let right = parent.right - children.right >= 0;
    
    return top && left && bottom && right;
}

function getElementProperties(element, pos, bgColorParent, positionParent) {
    if(element.localName === "head" || element.localName === "noscript" || element.localName === "noscript") return;
    if(element.scrollTop > 0 || element.scrollLeft < 0) element.scrollTo(0,0);
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
 * ? check if tab order = dom order
 */
function domTab(arr) {
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

    if(relaunch) domTab(arr);
}

/**
 * ? check the pertinence of visual tab order
 */
function visualTab(arr) {
    var segments = [];
    var coords = [];

    for(let i = 0; i < arr.length; i++) {
        if(i === 0) continue;

        let previous = arr[i-1];
        let current = arr[i];

        segments.push({
            a: {x: (previous.prop.position.left), y: (previous.prop.position.top+previous.prop.position.bottom)/2, el: previous.el},
            b: {x: (current.prop.position.left), y: (current.prop.position.top+current.prop.position.bottom)/2, el: current.el}
        });

        coords.push({
            a: {
                x: (previous.prop.position.left >= 0 ? previous.prop.position.left : 0),
                y: (previous.prop.position.top+previous.prop.position.bottom)/2 >= 0 ? (previous.prop.position.top+previous.prop.position.bottom)/2 : 18,
                error: false, visible: previous.prop.visible
            },
            b: {
                x: (current.prop.position.left >= 0 ? current.prop.position.left : 0),
                y: (current.prop.position.top+current.prop.position.bottom)/2 >= 0 ? (current.prop.position.top+current.prop.position.bottom)/2 : 18,
                error: false, visible: current.prop.visible
            }
        });
    }

    for(let i = 0; i < segments.length; i++) {
        if(i === 0 || segments[i].a.el.hasAttribute('data-tng-tab-visual-error') || segments[i].b.el.hasAttribute('data-tng-tab-visual-error')) continue;

        var previousSegments = segments.slice(0, i);

        for(let x = 0; x < previousSegments.length; x++) {
            if(getIntersectionPoint(previousSegments[x].a, previousSegments[x].b, segments[i].a, segments[i].b)) {
                if(previousSegments[x].a.el.hasAttribute('data-tng-tab-visual-error') || previousSegments[x].b.el.hasAttribute('data-tng-tab-visual-error')) continue;

                let a1x = previousSegments[x].a.x;
                let a1y = previousSegments[x].a.y;
                let b1x = previousSegments[x].b.x;
                let b1y = previousSegments[x].b.y;
                let a2x = segments[i].a.x;
                let a2y = segments[i].a.y;
                let b2x = segments[i].b.x;
                let b2y = segments[i].b.y;

                if(a1x >= b1x && a1y >= b1y) {
                    previousSegments[x].a.el.setAttribute('data-tng-tab-visual-error', 'true');
                    coords[x].a.error = true;
                    if(x !== 0) coords[x-1].b.error = true;
                } else if(a2x >= b2x && a2y >= b2y) {
                    segments[i].a.el.setAttribute('data-tng-tab-visual-error', 'true');
                    coords[i].a.error = true;
                    if(i !== 0) coords[i-1].b.error = true;
                    break;
                } else if(b1x >= a2x && b1y >= a2y){
                    previousSegments[x].b.el.setAttribute('data-tng-tab-visual-error', 'true');
                    coords[x].b.error = true;
                    if(x !== coords.length-1) coords[x+1].a.error = true;
                    break;
                } else if(previousSegments[x].b.el === segments[i].a.el) {
                    segments[i].a.el.setAttribute('data-tng-tab-visual-error', 'true');
                    coords[i].a.error = true;
                    if(i !== 0) coords[i-1].b.error = true;
                    break;
                } else {
                    segments[i].b.el.setAttribute('data-tng-tab-visual-error', 'true');
                    coords[i].b.error = true;
                    if(i !== coords.length-1) coords[i+1].a.error = true;
                    break;
                }
            }
        }
    }

    return coords;
}

/**
 * ? calculates the intersection point between 2 segments
 */
function getIntersectionPoint(a, b, c, d) {
    var u = {x: b.x - a.x, y: b.y - a.y};
    var v = {x: d.x - c.x, y: d.y - c.y};
    var div = u.x * v.y - v.x * u.y;

    if(div === 0) {
        //* les droites sont colinéaires
        if(a.x === b.x) {
            //* ab est verticale
            if(a.x === c.x) {
                //* ab et cd sont confondues
                let startAB = a.y < b.y ? a.y : b.y;
                let endAB = a.y < b.y ? b.y : a.y;
                let startCD = c.y < d.y ? c.y : d.y;
                let endCD = c.y < d.y ? d.y : c.y;

                //*? teste si [ab] et [cd] sont confondus
                if(startAB < c.y && c.y < endAB) return true;
                else if(startAB < d.y && d.y < endAB) return true;
                else if(startCD < a.y && a.y < endCD) return true;
                else if(startCD < b.y && b.y < endCD) return true;
            }
        } else {
            var m_ab = (b.y - a.y) / (b.x - a.x);
            var p_ab = m_ab === 0 ? a.y : a.y - m_ab * a.x;

            var m_cd = (d.y - c.y) / (d.x - c.x);
            var p_cd = m_cd === 0 ? c.y : c.y - m_cd * c.x;

            if(p_ab === p_cd) {
                //* ab et cd sont confondues
                let startAB = a.x < b.x ? a.x : b.x;
                let endAB = a.x < b.x ? b.x : a.x;
                let startCD = c.x < d.x ? c.x : d.x;
                let endCD = c.x < d.x ? d.x : c.x;

                //*? teste si [ab] et [cd] sont confondus
                if(startAB < c.x && c.x < endAB) return true;
                else if(startAB < d.x && d.x < endAB) return true;
                else if(startCD < a.x && a.x < endCD) return true;
                else if(startCD < b.x && b.x < endCD) return true;
            }
        }
    } else {
        //* les droites sont sécantes
        var param1 = ((u.x * a.y) - (u.x * c.y) - (u.y * a.x) + (u.y * c.x)) / div;
        var param2 = ((v.x * a.y) - (v.x * c.y) - (v.y * a.x) + (v.y * c.x)) / div;
    
        if(param1 > 0 && param1 < 1 && param2 > 0 && param2 < 1) {
            //* l'intersection est sur le segment
            //? point d'intersection = {x: a.x + param1 * u.x, y: a.y + param1 * u.y}
            return true;
        }
    }

    return false;
}

/**
 * ? move array value
 */
 function moveArrVal(arr, from, to) {
    var elem = arr.splice(from, 1)[0];
    if (to < 0) to += 1;
    arr.splice(to, 0, elem);
    return arr;
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

    localStorage.setItem("DOM", JSON.stringify(getElementProperties(document.documentElement, 1, null, null)));
    DOM_archi = JSON.parse(localStorage.getItem("DOM"));

    interactivesError = interactives.filter(e => (e.prop.role && e.prop.role != "application" && e.prop.role != "option") && !e.prop.tab && e.prop.interactive);
    interactivesError.forEach(e => e.el.setAttribute('data-tng-interactive-notab', 'true'));

    var tablist = interactives.filter(e => e.prop.tab).sort((a, b) => b.el.tabIndex - a.el.tabIndex);
    var realTabOrder = tablist.slice(0).filter(e => true);

    localStorage.setItem("TAB", JSON.stringify(Object.assign({}, visualTab(realTabOrder))));

    domTab(tablist);
    getHeadingsMap();
}

var textNodeList = (cat !== 'colors') ? null : getTextNodeContrast();

filterCat();
filterStatus();
launchTests();
filterAllTestsByStatus();
removeAllDataTNG();
loadTanaguruTests();
