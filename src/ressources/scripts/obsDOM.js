var result;

// Fonction callback à éxécuter quand une mutation est observée
function callback(mutationsList) {
    var newMutations = [];

    function extractOnlyNode(e) {
        if(e.nodeType === 3) return e.data
        else if(e.nodeType === 1) {
            let r = e.cloneNode(false);
            return r.outerHTML;
        }
        else return e;
    }

    function getCSSselector(node, attName = null, attValue = null) {
        let p0 = node.parentNode;
        let p1 = p0 ? p0.parentNode : null;
        let s0 = node.previousElementSibling;

        let selector = "";

        if(p1) {
            let att = Array.from(p1.attributes, ({name, value}) => (name+'="'+value+'"'));
            selector = p1.tagName.toLowerCase()+'['+att.join('][')+']';
        }

        if(p0) {
            let att = Array.from(p0.attributes, ({name, value}) => (name+'="'+value+'"'));
            if(selector.length > 0) selector += ">";
            selector += p0.tagName.toLowerCase()+'['+att.join('][')+']';
        }

        if(s0) {
            let s0att = Array.from(s0.attributes, ({name, value}) => (name+'="'+value+'"'));
            let att = Array.from(node.attributes, ({name, value}) => ((attName && attName == name) ? (attValue ? (attName+'="'+attValue+'"') : (attName)) : (name+'="'+value+'"')));
            if(selector.length > 0) selector += ">";
            selector += s0.tagName.toLowerCase()+'['+s0att.join('][')+']+'+node.tagName.toLowerCase()+'['+att.join('][')+']';
        } else {
            let att = Array.from(node.attributes, ({name, value}) => ((attName && attName == name) ? (attValue ? (attName+'="'+attValue+'"') : (attName)) : (name+'="'+value+'"')));
            if(selector.length > 0) selector += ">";
            selector += node.tagName.toLowerCase()+'['+att.join('][')+']';
        }

        return selector;
    }

    for(var mutation of mutationsList) {
        if(mutation.type == 'childList') {
            var parentMutationNode = mutation.target;

            if(mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0) {
                if(mutation.removedNodes.length > 0 && mutation.addedNodes.length > 0) {
                    let findMutation = false;
                    let newList = Array.from(mutation.addedNodes).map(extractOnlyNode);
                    let oldList = Array.from(mutation.removedNodes).map(extractOnlyNode);

                    for(let y = 0; y < newList.length; y++) {
                        if(mutation.addedNodes[y].nodeType === 1 || mutation.addedNodes[y].nodeType === 3) {
                            if(!oldList.includes(newList[y])) {
                                let mutationDetails = {
                                    el: getCSSselector(mutation.addedNodes[y]),
                                    type: 1,
                                    desc: "Un noeud enfant a été ajouté.",
                                    before: '',
                                    after: mutation.addedNodes[y].outerHTML
                                }
                                newMutations.push(mutationDetails);
                                findMutation = true;
                            }
                        }
                    }

                    for(let y = 0; y < oldList.length; y++) {
                        if(mutation.removedNodes[y].nodeType === 1 || mutation.removedNodes[y].nodeType === 3) {
                            if(!oldList.includes(oldList[y])) {
                                let mutationDetails = {
                                    el: getCSSselector(parentMutationNode),
                                    type: 2,
                                    desc: "Un noeud enfant a été supprimé.",
                                    before: mutation.removedNodes[y].outerHTML,
                                    after: ''
                                }
                                newMutations.push(mutationDetails);
                            }
                        }
                    }

                    if(!findMutation) {
                        if(mutation.removedNodes.length === 1 && mutation.addedNodes.length === 1) {
                            let mutationDetails = {
                                el: getCSSselector(mutation.addedNodes[0]),
                                type: 3,
                                desc: "Le contenu de cet élément a été modifié.",
                                before: mutation.removedNodes[0].outerHTML,
                                after: mutation.addedNodes[0].outerHTML
                            }
                            newMutations.push(mutationDetails);
                        } else {
                            let mutationDetails = {
                                el: getCSSselector(parentMutationNode),
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
                            let mutationDetails = {
                                el: getCSSselector(el),
                                type: 1,
                                desc: "Un noeud enfant a été ajouté.",
                                before: '',
                                after: el.outerHTML
                            }
                            newMutations.push(mutationDetails);
                        });
                    }
        
                    else if(mutation.removedNodes.length > 0) {
                        mutation.removedNodes.forEach(el => {
                            let mutationDetails = {
                                el: getCSSselector(parentMutationNode),
                                type: 2,
                                desc: "Un noeud enfant a été supprimé.",
                                before: el.outerHTML,
                                after: ''
                            }
                            newMutations.push(mutationDetails);
                        });
                    }
                }
            }
        }
        else if(mutation.type == 'attributes') {
            let currentNode = mutation.target;
            let attMatch = mutation.oldValue.split().filter(e => currentNode.getAttribute(mutation.attributeName).includes(e));
            attMatch = attMatch.length > 0 ? attMatch.join(' ') : null;

            let mutationDetails = {
                el: getCSSselector(currentNode, mutation.attributeName, attMatch),
                type: 4,
                desc: "L'attribut "+mutation.attributeName+" a été modifié.",
                before: mutation.oldValue,
                after: currentNode.getAttribute(mutation.attributeName)
            }
            newMutations.push(mutationDetails);
        }

        if(mutation.type == 'characterData') {
            let parentNode = mutation.target.parentNode;
            let mutationDetails = {
                el: getCSSselector(parentNode),
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
        migList: JSON.stringify(newMutations)
    });
};

// Créé une instance de l'observateur lié à la fonction de callback
if(typeof observer == 'undefined') var observer = new MutationObserver(callback);

if(obs === 'ON') {
    observer.observe(document.body, { attributeOldValue: true, childList: true, subtree: true, characterDataOldValue: true });
    result = "observer is starting....";
} else {
    observer.disconnect();
    result = "observer is stopping...";
}

result;
