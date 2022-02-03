//TODO recupérer les events appliqué via api
function listAllEventListeners() {
    var allElements = Array.from(document.body.querySelectorAll('*'));
    allElements.push(document.body);
    var types = [];
    for(let ev in window) {
      if(/^on/.test(ev)) types[types.length] = ev;
    //   console.log(ev);
    //   else if(/^jQuery/.test(ev) && ev.events.length > 0) types[types.length] = ev;
    }
  
    let elements = [];
    for(let i = 0; i < allElements.length; i++) {
      var currentElement = allElements[i];
      for(let j = 0; j < types.length; j++) {

        if(types[j] != 'onload' && typeof currentElement[types[j]] === 'function') {
          elements.push(currentElement);
        }
      }
    }
    return elements;
}

// listAllEventListeners();