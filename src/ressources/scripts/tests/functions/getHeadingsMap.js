/**
 * get array of headings hierarchy
 * * use [manageTests.js]
 */
 function getHeadingsMap() {
    initTanaguru();
    var collection = document.body.querySelectorAll('h1[data-tng-el-exposed="true"]:not([role]), h2[data-tng-el-exposed="true"]:not([role]), h3[data-tng-el-exposed="true"]:not([role]), h4[data-tng-el-exposed="true"]:not([role]), h5[data-tng-el-exposed="true"]:not([role]), h6[data-tng-el-exposed="true"]:not([role]), [role="heading"][data-tng-el-exposed="true"][aria-level]');
    collection = Array.from(collection).sort((a,b) => {
        return a.getAttribute('data-tng-pos') - b.getAttribute('data-tng-pos');
    });

    // var structure = [];
    var structure = window.tanaguru.headings;
    var lastPost = null;
    var lastLvl = [];
    var index = 1;

    function getHeadingInfos(el, currentlevel, previousLevel) {
        let error = index > 2 && currentlevel - previousLevel > 1 ? true : false;

        el.setAttribute('sdata-tng-hindex', index);
        if(error) el.setAttribute('data-tng-herror', 'true');
        
        let result = {
            index: index,
            tag: el.tagName.toLowerCase(),
            level: currentlevel,
            an: el.innerText.trim(),
            xpath: getXPath(el),
            error: error
        };
        index++;
        return result;
    }

    for(let i = 0; i < collection.length; i++) {
        let previousLevel = collection[i-1] ? (!collection[i-1].hasAttribute('role') ? collection[i-1].tagName.toLowerCase().split('h')[1] : collection[i-1].getAttribute('aria-level')) : null;
        let currentlevel = !collection[i].hasAttribute('role') ? collection[i].tagName.toLowerCase().split('h')[1] : collection[i].getAttribute('aria-level');

        let element = getHeadingInfos(collection[i], currentlevel, previousLevel);

        if(previousLevel) {
            if(previousLevel == currentlevel) {
                lastPost.push(element);
            } else if(previousLevel < currentlevel) {
                lastPost.push([element]);
                lastLvl.push(lastPost.length-1);
                lastPost = lastPost[lastPost.length-1];
            } else {
                if(lastLvl.length > 1 && (previousLevel - currentlevel) < lastLvl.length) {
                    for(let x = 0; x < previousLevel - currentlevel; x++) {
                        lastLvl.pop();
                    }
                    let key = "["+lastLvl.join('][')+"]";
                    lastPost = eval("structure"+key);
                    lastPost.push(element);
                }
                else if(lastLvl.length > 1 && currentlevel > 1) {
                    var eureka = false;
                    for(let x = 0; x < lastLvl.length; x++) {
                        lastLvl.pop();
                        let key = "["+lastLvl.join('][')+"]";
                        lastPost = eval("structure"+key);

                        if(parseInt(lastPost[0].level) === parseInt(currentlevel)) {
                            lastPost.push(element);
                            eureka = true;
                            break;
                        }
                    }

                    if(!eureka) {
                        structure.push([element]);
                        lastPost = structure[structure.length-1];
                        lastLvl = [structure.length-1];
                    }
                }
                else {
                    structure.push([element]);
                    lastPost = structure[structure.length-1];
                    lastLvl = [structure.length-1];
                }
            }
        } else {
            structure.push([element]);
            lastPost = structure[0];
            lastLvl.push(0);
        }
    }
}

function cleanSDATA() {
    let datas = document.querySelectorAll('[sdata-tng-hindex]');
    datas.forEach(el => el.removeAttribute('sdata-tng-hindex'));
    if(window.tanaguru && window.tanaguru.headings) {
        delete window.tanaguru.headings;
    }
}