var result;

// Fonction callback à éxécuter quand une mutation est observée
function callback(mutationsList) {
    var newMutations = [];
    for(var mutation of mutationsList) {
        if(mutation.type == 'childList') {
            var parentMutationNode = mutation.target;

            if(mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0) {
                if(mutation.removedNodes.length > 0 && mutation.addedNodes.length > 0) {
                    /**
                     * TODO
                     */
                    console.log(mutation);
                } else {
                    if(mutation.addedNodes.length > 0) {
                        if(mutation.addedNodes.length == 1) {
                            let mutationDetails = {
                                el: parentMutationNode,
                                type: "Un noeud enfant a été ajouté.",
                                before: '',
                                after: mutation.addedNodes[0]
                            }
                            newMutations.push(mutationDetails);
                        } else {
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
                    }
        
                    if(mutation.removedNodes.length > 0) {
                        if(mutation.removedNodes.length == 1) {
                            let mutationDetails = {
                                el: parentMutationNode,
                                type: "Un noeud enfant a été supprimé.",
                                before: '',
                                after: mutation.removedNodes[0]
                            }
                            newMutations.push(mutationDetails);
                        } else {
                            mutation.removedNodes.forEach(el => {
                                let mutationDetails = {
                                    el: parentMutationNode,
                                    type: "Un noeud enfant a été supprimé.",
                                    before: '',
                                    after: el
                                }
                                newMutations.push(mutationDetails);
                            });
                        }
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

    console.log(newMutations);
};

// Créé une instance de l'observateur lié à la fonction de callback
if(typeof observer == 'undefined') var observer = new MutationObserver(callback);

if(obs === 'ON') {
    observer.observe(document.body, { attributes: true, attributeOldValue: true, childList: true, subtree: true, characterData: true, characterDataOldValue: true });
    result = "observer is starting....";
} else {
    observer.disconnect();
    result = "observer is stopping...";
}

result;
