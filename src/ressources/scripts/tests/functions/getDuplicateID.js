function getDuplicateID() {
    var nodelist = document.querySelectorAll('[id]:not([id=""])');
    var ids = [];
    var query = null;
    nodelist.forEach(node => {
        if (node.getAttribute('id').trim().length > 0) {
            if(!node.getAttribute('id').match(/\s/)) {
                if(ids[node.getAttribute('id')] && ids[node.getAttribute('id')] < 2) {
                    var startDigit = /^\d/;
                    var id = node.getAttribute('id');

                    if(id.match(startDigit)) {
                        id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                    } else {
                        id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                    }
    
                    query = query === null ? '' : query;
                    query += '[id='+id+'],'
                }
    
                if (!ids[node.getAttribute('id')]) {
                    ids[node.getAttribute('id')] = 0;
                }
    
                ids[node.getAttribute('id')]++;
            }
            
            else node.setAttribute('data-tng-invalid-id', 'true');
            
        }
    });

    query = query === null ? query : query.slice(0, -1);
    return document.querySelectorAll(query);
}