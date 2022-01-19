function getDuplicateID() {
    var nodelist = document.querySelectorAll('[id]:not([id=""])');
    var ids = [];
    var query = null;
    nodelist.forEach(node => {
        if (node.id.trim().length > 0) {
            if(ids[node.id] && ids[node.id] < 2) {
                var startDigit = /^\d/;
                var id = node.id;

                if(id.match(startDigit)) {
                    id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                } else {
                    id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
                }

                query = query === null ? '' : query;
                query += '[id='+id+'],'
            }

            if (!ids[node.id]) {
                ids[node.id] = 0;
            }

            ids[node.id]++;
        }
    });

    query = query === null ? query : query.slice(0, -1);
    return document.querySelectorAll(query);
}