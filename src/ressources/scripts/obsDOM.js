var result;

// Fonction callback à éxécuter quand une mutation est observée
function callback(mutationsList) {
    var newMutations = [];
    for(var mutation of mutationsList) {
        if(mutation.type == 'childList') {
            var parentMutationNode = mutation.target;

            if(mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0) {
                if(mutation.removedNodes.length > 0 && mutation.addedNodes.length > 0) {
                    function extractOnlyNode(e) {
                        if(e.nodeType === 3) return e.data
                        else if(e.nodeType === 1) {
                            let r = e.cloneNode(false);
                            return r.outerHTML;
                        }
                        else return e;
                    }

                    let findMutation = false;
                    let newList = Array.from(mutation.addedNodes).map(extractOnlyNode);
                    let oldList = Array.from(mutation.removedNodes).map(extractOnlyNode);

                    for(let y = 0; y < newList.length; y++) {
                        if(mutation.addedNodes[y].nodeType === 1 || mutation.addedNodes[y].nodeType === 3) {
                            if(!oldList.includes(newList[y])) {
                                let mutationDetails = {
                                    el: parentMutationNode,
                                    type: "Un noeud enfant a été ajouté.",
                                    before: '',
                                    after: mutation.addedNodes[y]
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
                                    el: parentMutationNode,
                                    type: "Un noeud enfant a été supprimé.",
                                    before: mutation.removedNodes[y],
                                    after: ''
                                }
                                newMutations.push(mutationDetails);
                            }
                        }
                    }

                    if(!findMutation) {
                        if(mutation.removedNodes.length === 1 && mutation.addedNodes.length === 1) {
                            let mutationDetails = {
                                el: parentMutationNode,
                                type: "Le contenu de cet élément a été modifié.",
                                before: mutation.removedNodes[0],
                                after: mutation.addedNodes[0]
                            }
                            newMutations.push(mutationDetails);
                        } else {
                            let mutationDetails = {
                                el: parentMutationNode,
                                type: "Le contenu de cet élément a été modifié.",
                                before: '',
                                after: parentMutationNode
                            }
                            newMutations.push(mutationDetails);
                        }  
                    }
                } else {
                    if(mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(el => {
                            let mutationDetails = {
                                el: parentMutationNode,
                                type: "Un noeud enfant a été ajouté.",
                                before: '',
                                after: el
                            }
                            newMutations.push(mutationDetails);
                        });
                    }
        
                    else if(mutation.removedNodes.length > 0) {
                        mutation.removedNodes.forEach(el => {
                            let mutationDetails = {
                                el: parentMutationNode,
                                type: "Un noeud enfant a été supprimé.",
                                before: el,
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
            let mutationDetails = {
                el: currentNode,
                type: "L'attribut "+mutation.attributeName+" a été modifié.",
                before: mutation.oldValue,
                after: currentNode.getAttribute(mutation.attributeName)
            }
            newMutations.push(mutationDetails);
        }

        if(mutation.type == 'characterData') {
            let parentNode = mutation.target.parentNode;
            let mutationDetails = {
                el: parentNode,
                type: "Le contenu textuel a été modifié.",
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
