var result;

/**
 * ? processes the mutations and sends them as an object array to the background.js
 * @param {Object} mutationsList 
 */
function callback(mutationsList) {
    var elementsList = new Object();
    var newMutations = null;
    var currentEl = null;

    /**
     * ? [elementNode] Return the outerHTML of an element without its children
     * ? [textNode] Return text
     * @param {Object} e node
     * @returns {string} node data (without children)
     */
    function extractOnlyNode(e) {
        if(e.nodeType === 3) return e.data
        else if(e.nodeType === 1) {
            let r = e.cloneNode(false);
            r.removeAttribute('data-tng-dom');
            return r.outerHTML;
        }
        else return e;
    }

    for(var mutation of mutationsList) {
        var domElCount = document.querySelectorAll('[data-tng-dom]').length;
        if(mutation.type == 'childList') {
            var parentMutationNode = mutation.target;

            if(!parentMutationNode.hasAttribute('data-tng-dom')) parentMutationNode.setAttribute('data-tng-dom', parentMutationNode.tagName+'-'+domElCount+1);

            if(parentMutationNode != currentEl) {
                currentEl = parentMutationNode;
                let newKey = currentEl.getAttribute('data-tng-dom');
                if(!(newKey in elementsList)) {
                    elementsList[newKey] = [];
                } 
                newMutations = elementsList[newKey];
            }

            if(mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0) {
                if(mutation.removedNodes.length > 0 && mutation.addedNodes.length > 0) {
                    let findMutation = false;
                    let newList = Array.from(mutation.addedNodes).map(extractOnlyNode);
                    let oldList = Array.from(mutation.removedNodes).map(extractOnlyNode);

                    for(let y = 0; y < newList.length; y++) {
                        if(mutation.addedNodes[y].nodeType === 1 || mutation.addedNodes[y].nodeType === 3) {
                            let afterData = mutation.addedNodes[y].nodeType == 1 ? mutation.addedNodes[y].outerHTML : '#text '+mutation.addedNodes[y].data;
                            if(!oldList.includes(newList[y])) {
                                let mutationDetails = {
                                    el: extractOnlyNode(currentEl),
                                    type: 1,
                                    desc: "Un noeud enfant a été ajouté.",
                                    before: '',
                                    after: afterData
                                }
                                newMutations.push(mutationDetails);
                                findMutation = true;
                            }
                        }
                    }

                    for(let y = 0; y < oldList.length; y++) {
                        if(mutation.removedNodes[y].nodeType === 1 || mutation.removedNodes[y].nodeType === 3) {
                            let beforeData = mutation.removedNodes[y].nodeType == 1 ? mutation.removedNodes[y].outerHTML : '#text '+mutation.removedNodes[y].data;
                            if(!oldList.includes(oldList[y])) {
                                let mutationDetails = {
                                    el: extractOnlyNode(currentEl),
                                    type: 2,
                                    desc: "Un noeud enfant a été supprimé.",
                                    before: beforeData,
                                    after: ''
                                }
                                newMutations.push(mutationDetails);
                                findMutation = true;
                            }
                        }
                    }

                    if(!findMutation) {
                        if(mutation.removedNodes.length === 1 && mutation.addedNodes.length === 1) {
                            if((mutation.removedNodes[0].nodeType === 1 || mutation.removedNodes[0].nodeType === 3) && (mutation.addedNodes[0].nodeType === 1 || mutation.addedNodes[0].nodeType === 3)) {
                                let beforeData = mutation.removedNodes[0].nodeType == 1 ? mutation.removedNodes[0].outerHTML : '#text '+mutation.removedNodes[0].data;
                                let afterData = mutation.addedNodes[0].nodeType == 1 ? mutation.addedNodes[0].outerHTML : '#text '+mutation.addedNodes[0].data;
                                if(beforeData === afterData) continue;
                                let mutationDetails = {
                                    el: extractOnlyNode(currentEl),
                                    type: 3,
                                    desc: "Le contenu de cet élément a été modifié.",
                                    before: beforeData,
                                    after: afterData
                                }
                                newMutations.push(mutationDetails);
                            }
                        } else {
                            let mutationDetails = {
                                el: extractOnlyNode(currentEl),
                                type: 3,
                                desc: "Le contenu de cet élément a été modifié.",
                                before: '',
                                after: parentMutationNode.outerHTML
                            }
                            newMutations.push(mutationDetails);
                        }  
                    }
                } else {
                    if(mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(el => {
                            let afterData = el.nodeType == 1 ? el.outerHTML : '#text '+el.data;
                            let mutationDetails = {
                                el: extractOnlyNode(currentEl),
                                type: 1,
                                desc: "Un noeud enfant a été ajouté.",
                                before: '',
                                after: afterData
                            }
                            newMutations.push(mutationDetails);
                        });
                    }
        
                    else if(mutation.removedNodes.length > 0) {
                        mutation.removedNodes.forEach(el => {
                            let beforeData = el.nodeType == 1 ? el.outerHTML : '#text '+el.data;
                            let mutationDetails = {
                                el: extractOnlyNode(currentEl),
                                type: 2,
                                desc: "Un noeud enfant a été supprimé.",
                                before: beforeData,
                                after: ''
                            }
                            newMutations.push(mutationDetails);
                        });
                    }
                }
            }
        }
        else if(mutation.type == 'attributes') {
            if(mutation.attributeName.startsWith('data-tng-')) continue;
            
            let currentNode = mutation.target;
            if(mutation.oldValue == currentNode.getAttribute(mutation.attributeName)) continue;

            if(!currentNode.hasAttribute('data-tng-dom')) currentNode.setAttribute('data-tng-dom', currentNode.tagName+'-'+domElCount+1);

            if(currentNode != currentEl) {
                currentEl = currentNode;
                let newKey = currentEl.getAttribute('data-tng-dom');
                if(!(newKey in elementsList)) {
                    elementsList[newKey] = [];
                } 
                newMutations = elementsList[newKey];
            }

            let mutationDetails = {
                el: extractOnlyNode(currentEl),
                type: 4,
                desc: "L'attribut "+mutation.attributeName+" a été modifié.",
                before: mutation.oldValue,
                after: currentNode.getAttribute(mutation.attributeName)
            }
            newMutations.push(mutationDetails);
        }

        else if(mutation.type == 'characterData') {
            let parentMutationNode = mutation.target.parentNode;

            if(!parentMutationNode.hasAttribute('data-tng-dom')) parentMutationNode.setAttribute('data-tng-dom', parentMutationNode.tagName+'-'+domElCount+1);

            if(parentMutationNode != currentEl) {
                currentEl = parentMutationNode;
                let newKey = currentEl.getAttribute('data-tng-dom');
                if(!(newKey in elementsList)) {
                    elementsList[newKey] = [];
                } 
                newMutations = elementsList[newKey];
            }

            let mutationDetails = {
                el: extractOnlyNode(currentEl),
                type: 5,
                desc: "Le contenu textuel a été modifié.",
                before: mutation.oldValue,
                after: mutation.target.nodeValue
            }
            newMutations.push(mutationDetails);
        }
    }

    chrome.runtime.sendMessage({
        command: 'newMigration',
        tabId: panelId,
        migList: JSON.stringify(elementsList)
    });
};

if(typeof observer == 'undefined') var observer = new MutationObserver(callback);

if(obs === 'ON') {
    observer.observe(document.body, { attributeOldValue: true, childList: true, subtree: true, characterDataOldValue: true });
    result = "observer is starting....";
} else {
    observer.disconnect();
    let dataTng = document.querySelectorAll('.data-tng-dom');
    dataTng.forEach(n => n.removeAttribute('data-tng-dom'));
    result = "observer is stopping...";
}

result;
