/**
 *? TABLEAUX
 ** complet
 ** dependances gérées
 * data : data-tng-tableCaptions, data-tng-prezTable, data-tng-dataTableSummary, data-tng-tableAccessiblename, data-tng-table, data-tng-tableCol, data-tng-tableRow, data-tng-row, data-tng-tableHeaders, data-tng-tableHeader-uniqueID, data-tng-scope, data-tng-partHeader-uniqueID, data-tng-headerInTable, data-tng-prezTable-dataEl
 */

//* 5.1 Chaque tableau de données complexe a-t-il un résumé ?
// 5.1.1  Pour chaque tableau de données complexe un résumé est-il disponible ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_433',
    query: 'table[data-tng-el-exposed="true"][data-tng-el-visible="true"]:not([role]), [role="table"][data-tng-el-exposed="true"][data-tng-el-visible="true"]',
    expectedNbElements: 0,
    explanations: {
        passed: 'locale__tables_passed_434',
        failed: 'locale__tables_failed_435'
    },
    depStatus: ["cantTell"],
    filter: function (item) {
        if(item.querySelectorAll('th').length > 1 || item.querySelectorAll('[role="columnheader"], [role="rowheader"]').length > 1) {
            var isComplex = item.querySelectorAll('[colspan], [rowspan], [aria-colspan], [aria-rowspan]').length > 0;
            if(isComplex) {
                if(item.querySelector('caption')) {
                    if(item.querySelector('caption').textContent.trim().length > 0) {
                        item.setAttribute('data-tng-tableCaptions', 'true');
                        return;
                    }
                } else if(item.hasAttribute('role') && item.hasAttribute('aria-describedby')) {
                    var ids = item.getAttribute('aria-describedby').trim().split(' ');
                    if(ids.length > 0) {
                        var summary = '';
                        ids.forEach(id => {
                            if(document.getElementById(id)) {
                                summary += document.getElementById(id).textContent.trim();
                            }
                        });

                        if(summary.length > 0) {
                            item.setAttribute('data-tng-tableCaptions', 'true');
                            return;
                        }
                    }
                }
                return true;
            }
        }
    },
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.1.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_436',
    query: '[data-tng-tableCaptions]',
    testStatus: "passed",
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.1.1']}
});

// 5.2.1  Pour chaque tableau de données complexe ayant un résumé, celui-ci est-il pertinent ?
//! dependance 5.1.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_437',
    query: '[data-tng-tableCaptions]',
    description: 'locale__tables_description_438',
    testStatus: "cantTell",
    mark: {attrs: ['aria-describedby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.2.1']}
});

//* 5.3 Pour chaque tableau de mise en forme, le contenu linéarisé reste-t-il compréhensible ?
// 5.3.1 Chaque tableau de mise en forme vérifie-t-il ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_439',
    query: 'table',
    description: 'locale__tables_description_440',
    testStatus: "failed",
    depStatus: ["cantTell", "passed"],
    filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') == 'false' && item.getAttribute('data-tng-el-visible') == 'false') return;

        if(item.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length === 0) {
            item.setAttribute('data-tng-prezTable', 'true');

            if(!item.hasAttribute('role') || item.getAttribute('role') !== 'presentation') {
                return true;
            }
        }
    },
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.3.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_441',
    query: 'table[data-tng-prezTable][role="presentation"]',
    description: 'locale__tables_description_440',
    testStatus: "cantTell",
    mark: {attrs: ['role']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.3.1']}
});

// 5.4.1 Pour chaque tableau de données ayant un titre, le titre est-il correctement associé au tableau de données ?
//! dependance 5.3.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_443',
    query: 'table:not([role], [data-tng-prezTable]), [role="table"]:not([data-tng-prezTable])',
    filter: function(item) {
        if(item.querySelector('caption') != null) {
            item.setAttribute('data-tng-dataTableSummary', 'true');
            return true;
        }

        if(item.hasAttribute('title') || item.hasAttribute('aria-label')) {
            item.setAttribute('data-tng-dataTableSummary', 'true');
            return true;
        }

        if(item.hasAttribute('aria-labelledby') && item.getAttribute('aria-labelledby').trim().length > 0) {
            var ids = item.getAttribute('aria-labelledby').trim().split(' ');
            if(ids.length > 0) {
                var summary = false;
                ids.forEach(id => {
                    if(document.getElementById(id)) {
                        summary = true;
                    }
                });

                if(summary) {
                    item.setAttribute('data-tng-dataTableSummary', 'true');
                    return true;
                } else {
                    item.setAttribute('data-tng-dataTableSummary', 'false');
                }
            }
        }
    },
    testStatus: "passed",
    depStatus: ["failed", "cantTell"],
    mark: {attrs: ['title', 'aria-label', 'aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.4.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_444',
    query: '[data-tng-dataTableSummary="false"]',
    testStatus: "failed",
    mark: {attrs: ['aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.4.1']}
});

// 5.5.1 Pour chaque tableau de données ayant un titre, ce titre permet-il d'identifier le contenu du tableau de données de manière claire et concise ?
//! dependance 5.4.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_445',
    query: '[data-tng-dataTableSummary="true"]',
    description: 'locale__tables_description_446',
    filter: function(item) {
        if(item.hasAccessibleName()) {
            item.setAttribute('data-tng-tableAccessiblename', 'true');
            return true;
        }

        item.setAttribute('data-tng-tableAccessiblename', 'false');
    },
    testStatus: "cantTell",
    depStatus: ["failed"],
    mark: {attrs: ['title', 'aria-label', 'aria-labelledby']},
    tags: ['a11y', 'tables', 'accessiblename'],
    ressources: {'rgaa': ['5.5.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_447',
    query: '[data-tng-tableAccessiblename="false"][data-tng-el-exposed="true"], [data-tng-tableAccessiblename="false"][data-tng-el-visible="true"]',
    testStatus: "failed",
    mark: {attrs: ['title', 'aria-label', 'aria-labelledby']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.5.1']}
});

//* 5.6 Pour chaque tableau de données, chaque en-tête de colonnes et chaque en-tête de lignes sont-ils correctement déclarés ?
// 5.6.1 Pour chaque tableau de données, chaque en-tête de colonnes s'appliquant à la totalité de la colonne vérifie-t-il une de ces conditions ?
//! dependance 5.3.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_448',
    query: 'table:not([role], [data-tng-prezTable]) *[scope="col"][data-tng-el-exposed="true"], table:not([role], [data-tng-prezTable]) *[scope="colgroup"][data-tng-el-exposed="true"], table:not([role], [data-tng-prezTable]) *[id][data-tng-el-exposed="true"], table:not([role], [data-tng-prezTable]) th[data-tng-el-exposed="true"]',
    filter: function (item) {
        var table = item.closest('table');
        var parentRow = item.closest('tr');

        if(item.tagName.toLowerCase() === 'th' && parentRow) {
            if(parentRow.querySelectorAll('th').length < parentRow.querySelectorAll('td').length) return;
        }

        //? header with SCOPE
        if(item.hasAttribute('scope')) {
            if(item.getAttribute('scope') === 'col' || item.getAttribute('scope') === 'colgroup') {
                if(item.tagName.toLowerCase() !== 'th') {
                    item.setAttribute('data-tng-table', 'headerColFull');
                    if(item.hasAttribute('role') && item.getAttribute('role') === 'columnheader') {
                        return true;
                    } else {
                        item.setAttribute('data-tng-tableCol', 'bad');
                        return;
                    }
                } 
                else if(item.tagName.toLowerCase() === 'th' && (item.id.trim().length === 0 || !table.querySelector('[headers*="'+item.id+'"]'))) {
                    item.setAttribute('data-tng-table', 'headerColFull');
                    return true;
                }
            }
        }

        //? if item isn't cell return
        if(item.tagName.toLowerCase() !== 'th' && item.tagName.toLowerCase() !== 'td') return;

        if(item.tagName.toLowerCase() === 'th' && !table.querySelector('*[headers]')) {
            if(parentRow) {
                item.setAttribute('data-tng-table', 'headerColFull');
                return true;
            }

            return;
        }

        //? header with ID
        //? check if this ID corresponding with headers attibute
        var headersList = table.querySelectorAll('*[headers]');
        var headers = [];
        var headersLength = headersList.length;

        for(var i = 0; i < headersLength; i++) {
            var list = headersList[i].getAttribute('headers').split(' ');

            list.forEach(h => {
                if(!headers.includes(h)) {
                    headers.push(h);
                }
            });
        }

        if(!headers.includes(item.id)) return;

        //? get column's size & position
        var row = item.closest('tr');
        if(!row) return;

        var headerIndex = [];
        var p = 0;
        var siblings = row.children;
        var siblingsLength = siblings.length;

        for(var x = 0; x < siblingsLength; x++) {
            if(siblings[x] != item) {
                if(siblings[x].hasAttribute('colspan') && siblings[x].getAttribute('colspan') > 0) {
                    p = p + parseInt(siblings[x].getAttribute('colspan'));
                } else p++;
            } else break;
        }

        if(item.hasAttribute('colspan') && item.getAttribute('colspan') > 0) {
            var size = parseInt(item.getAttribute('colspan'));
            var sizeP = size+p;

            for(var x = p; x < sizeP; x++) {
                headerIndex.push(x+1);
            }
        } else {
            headerIndex.push(p+1);
        }

        //? check if all cells in the column has headers attribute corresponding to the item(header) ID
        var cells = table.querySelectorAll('th, td');
        var columnHeader = true;

        cells.forEach(cell => {
            var cellIndex = [];
            var rowC = cell.closest('tr');
            var pC = 0;
            var siblingsC = rowC.children;
            var siblingsCLength = siblingsC.length;

            for(var x = 0; x < siblingsCLength; x++) {
                if(siblingsC[x] != cell) {
                    if(siblingsC[x].hasAttribute('colspan') && siblingsC[x].getAttribute('colspan') > 0) {
                        pC = pC + parseInt(siblingsC[x].getAttribute('colspan'));
                    } else pC++;
                } else break;
            }

            if(cell.hasAttribute('colspan') && cell.getAttribute('colspan') > 0) {
                var sizeC = parseInt(cell.getAttribute('colspan'));
                var sizeCpC = sizeC+pC;

                for(var x = pC; x < sizeCpC; x++) {
                    cellIndex.push(x+1);
                }
            } else {
                cellIndex.push(pC+1);
            }

            if(cellIndex.some(n => headerIndex.includes(n)) && cell != item) {
                if(cell.hasAttribute('headers')) {
                    columnHeader = cell.getAttribute('headers').match(item.id) ? columnHeader : false;
                } else if(!cell.hasAttribute('headers')) {
                    columnHeader = false;
                }
            }
        });

        if(columnHeader) {
            item.setAttribute('data-tng-table', 'headerColFull');
            if(item.tagName.toLowerCase() !== 'th') {
                if(item.hasAttribute('role') && item.getAttribute('role') === 'columnheader') {
                    return true;
                } else {
                    item.setAttribute('data-tng-tableCol', 'bad');
                    return;
                }
            } else return true;
        }

        // else if(item.hasAttribute('role') && item.getAttribute('role') === 'table') {
        //     var ch = item.querySelectorAll('*[role="columnheader"]');
        //     if(ch.length === 0) {
        //         verifier que l'on a pas d'en-tête appliqué à toute une colonne mis en place avec aria-labelledby
        //     } else {
        //         c'est ok
        //     }
        // }

        else item.setAttribute('data-tng-table', 'headerColPart');
    },
    testStatus: "passed",
    depStatus: ["failed"],
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_449',
    query: 'table *[data-tng-tableCol="bad"]',
    testStatus: "failed",
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.1']}
});

// 5.6.2 Pour chaque tableau de données, chaque en-tête de lignes s'appliquant à la totalité de la ligne vérifie-t-il une de ces conditions ?
//! dependance 5.3.1
tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_450',
    query: 'table:not([role], [data-tng-prezTable]) *[scope="row"][data-tng-el-exposed="true"], table:not([role], [data-tng-prezTable]) *[scope="rowgroup"][data-tng-el-exposed="true"], table:not([role], [data-tng-prezTable]) *[id][data-tng-el-exposed="true"], table:not([role], [data-tng-prezTable]) th[data-tng-el-exposed="true"]',
    filter: function (item) {
        var table = item.closest('table');
        var parentRow = item.closest('tr');

        if(item.tagName.toLowerCase() === 'th' && parentRow) {
            if(parentRow.querySelectorAll('th').length > parentRow.querySelectorAll('td').length) return;
        }

        //? header with SCOPE
        if(item.hasAttribute('scope')) {
            if(item.getAttribute('scope') === 'row' || item.getAttribute('scope') === 'rowgroup') {
                if(item.tagName.toLowerCase() !== 'th') {
                    item.setAttribute('data-tng-table', 'headerRowFull');
                    if(item.hasAttribute('role') && item.getAttribute('role') === 'rowheader') {
                        return true;
                    } else {
                        item.setAttribute('data-tng-tableRow', 'bad');
                        return
                    }
                }
                else if(item.tagName.toLowerCase() === 'th' && (item.id.trim().length === 0 || !table.querySelector('[headers*="'+item.id+'"]'))) {
                    item.setAttribute('data-tng-table', 'headerRowFull');
                    return true;
                }
            }
        }

        //? if item isn't cell, return
        if(item.tagName.toLowerCase() !== 'th' && item.tagName.toLowerCase() !== 'td') return;

        if(item.tagName.toLowerCase() === 'th' && !table.querySelector('*[headers]')) {
            if(parentRow) {
                item.setAttribute('data-tng-table', 'headerRowFull');
                return true;
            }

            return;
        }

        //? header with ID
        //? check if this ID corresponding with headers attribute
        var headersList = table.querySelectorAll('*[headers]');
        var headers = [];
        var headersLength = headersList.length;

        for(var i = 0; i < headersLength; i++) {
            var list = headersList[i].getAttribute('headers').split(' ');

            list.forEach(h => {
                if(!headers.includes(h)) {
                    headers.push(h);
                }
            });
        }

        if(!headers.includes(item.id)) return;

        //? get row's size & all its cells
        var rows = table.querySelectorAll('tr');
        var cells = [];
        var currentRow = item.closest('tr');
        if(!currentRow) return;
        currentRow.setAttribute('data-tng-row', true);

        if(item.hasAttribute('rowspan') && parseInt(item.getAttribute('rowspan')) > 1) {
            var size = parseInt(item.getAttribute('rowspan'));
            var rowsLength = rows.length;

            for(var i = 0; i < rowsLength; i++) {
                if(rows[i] === currentRow) {
                    for(var x = 1; x < size; x++) {
                        rows[i+x].setAttribute('data-tng-row', true);
                    }
                }
            }
        }

        var cells = table.querySelectorAll('[data-tng-row=true] th, [data-tng-row=true] td');
        var rowHeader = true;

        //? check if all cells in the row has headers attribute corresponding to the item(header) ID
        cells.forEach(cell => {
            if(cell != item) {
                rowHeader = cell.hasAttribute('headers') && cell.getAttribute('headers').match(item.id) ? rowHeader : false;
            }
        });

        rows.forEach(e => {
            e.removeAttribute('data-tng-row');
        });

        if(rowHeader) {
            item.setAttribute('data-tng-table', 'headerRowFull');
            if(item.tagName.toLowerCase() !== 'th') {
                if(item.hasAttribute('role') && item.getAttribute('role') === 'rowheader') {
                    return true;
                } else {
                    item.setAttribute('data-tng-tableRow', 'bad');
                }
            } else return true;
        }

        else item.setAttribute('data-tng-table', 'headerRowPart');
    },
    testStatus: "passed",
    depStatus: ["failed"],
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'locale__tables_name_451',
    query: 'table *[data-tng-tableRow="bad"]',
    testStatus: "failed",
    mark: {attrs: ['scope']},
    tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.2']}
});

// 5.6.3 Pour chaque tableau de données, chaque en-tête ne s'appliquant pas à la totalité de la ligne ou de la colonne est-il structuré au moyen d'une balise <th> ?
//! dependances 5.6.1 & 5.6.2
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_452',
    description: 'locale__tables_description_453',
    query: '*[data-tng-table="headerColPart"], *[data-tng-table="headerRowPart"]',
    testStatus: "failed",
    filter: function(item) {
        return item.tagName.toLowerCase() != 'th';
    },
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.3']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_454',
    query: 'th[data-tng-table="headerColPart"], th[data-tng-table="headerRowPart"]',
    testStatus: "passed",
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.3']}
});

// 5.6.4 Pour chaque tableau de données, chaque cellule associée à plusieurs en-têtes est-elle structurée au moyen d’une balise <td> ou <th> ?
//! dependance 5.3.1
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_455',
	query: 'table:not([role], [data-tng-prezTable]) *[headers][data-tng-el-exposed="true"], [role="table"]:not([data-tng-prezTable]) *[headers][data-tng-el-exposed="true"]',
    testStatus: "failed",
    depStatus: ["passed"],
	filter: function (item) {
        var table = item.closest('table');
        var headers = item.getAttribute('headers').split(' ');
        var count = 0;
        var headersLength = headers.length;

        for(var i = 0; i < headersLength; i++) {
            var id = document.getElementById(headers[i]);

            if(id) {
                count = id.closest('table') == table ? count+1 : count;
            }
        }

        if(count > 1) {
            if(item.tagName.toLowerCase() !== 'td' && item.tagName.toLowerCase() !== 'th') {
                return true;
            }
            item.setAttribute('data-tng-tableHeaders', 'true');
        }
	},
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.4']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_456',
	query: 'table *[data-tng-tableHeaders="true"]',
    testStatus: "passed",
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.6.4']}
});

//* 5.7 Pour chaque tableau de données, la technique appropriée permettant d'associer chaque cellule avec ses en-têtes est-elle utilisée (hors cas particuliers) ?
// 5.7.1 Pour chaque contenu de balise <th> s'appliquant à la totalité de la ligne ou de la colonne, la balise <th> respecte-t-elle une de ces conditions (hors cas particuliers) ?
//! dependances 5.6.1 & 5.6.2
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_457',
	query: 'th[data-tng-table="headerColFull"]:not([scope], [role="columnheader"]), th[data-tng-table="headerRowFull"]:not([scope], [role="rowheader"])',
    testStatus: "failed",
    depStatus: ["passed"],
	filter: function (item) {
        if(item.id.trim().length > 0) {
            let thID = item.id;
            item.id = "";
            if(!document.getElementById(thID)) {
                item.id = thID;
                item.setAttribute('data-tng-tableHeader-uniqueID', 'true');
                return;
            }
            item.id = thID;
        }

        return true;
	},
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_458',
	query: 'th[data-tng-table="headerColFull"][scope], th[data-tng-table="headerColFull"][role="columnheader"], th[data-tng-table="headerColFull"][data-tng-tableHeader-uniqueID="true"], th[data-tng-table="headerRowFull"][scope], th[data-tng-table="headerRowFull"][role="rowheader"], th[data-tng-table="headerRowFull"][data-tng-tableHeader-uniqueID="true"]',
    testStatus: "passed",
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.1']}
});

// 5.7.2 Pour chaque contenu de balise <th> s'appliquant à la totalité de la ligne ou de la colonne et possédant un attribut scope, la balise <th> vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_459',
	query: 'th[scope]',
	filter: function (item) {
		var row = item.parentNode;
        if(row.querySelectorAll('th').length === 1 && row.querySelectorAll('td').length > 0) {
            item.setAttribute('data-tng-scope', 'valid');
            return item.getAttribute('scope') === 'row';
        }

        if(row.querySelectorAll('td').length === 0) {
            item.setAttribute('data-tng-scope', 'valid');
            return item.getAttribute('scope') === 'col';
        }
	},
	testStatus: "passed",
    depStatus: ["failed", "cantTell"],
    mark: {attrs: ['scope']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.2']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_460',
	query: 'th[scope]:not([data-tng-scope="valid"])',
    testStatus: "failed",
    depStatus: ["cantTell"],
	filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') == 'false' && item.getAttribute('data-tng-el-visible') == 'false') return;

		var scope = item.getAttribute('scope');

        if(scope != 'row' && scope != 'col') {
            item.setAttribute('data-tng-scope', 'invalid');
            return true;
        }
	},
    mark: {attrs: ['scope']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.2']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_461',
	query: 'th[scope]:not([data-tng-scope])',
    description: 'locale__tables_description_462',
    testStatus: "cantTell",
    mark: {attrs: ['scope']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.2']}
});

// 5.7.3  Pour chaque contenu de balise <th> ne s'appliquant pas à la totalité de la ligne ou de la colonne, la balise <th> vérifie-t-elle ces conditions ?
//! dependances 5.6.1 & 5.6.2
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_463',
	query: 'th[data-tng-table="headerColPart"][id]:not([scope="col"], [role="columnheader"]), th[data-tng-table="headerRowPart"][id]:not([scope="row"], [role="rowheader"])',
	filter: function (item) {
        if(item.id.trim().length > 0) {
            let thID = item.id;
            item.id = "";
            if(!document.getElementById(thID)) {
                item.id = thID;
                item.setAttribute('data-tng-partHeader-uniqueID', 'true');
                return true;
            }
            item.id = thID;
        }
        return;
	},
    testStatus: "passed",
    depStatus: ["failed"],
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.3']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_464',
	query: 'th[data-tng-table="headerColPart"]:not([data-tng-partHeader-uniqueID="true"]), th[data-tng-table="headerRowPart"]:not([data-tng-partHeader-uniqueID="true"])',
    testStatus: "failed",
    mark: {attrs: ['scope', 'id', 'role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.3']}
});

// 5.7.4 Pour chaque contenu de balise <td> ou <th> associée à un ou plusieurs en-têtes possédant un attribut id, la balise vérifie-t-elle ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_465',
	query: 'table td[headers], table th[headers]',
	filter: function (item) {
		var headers = item.getAttribute('headers');
		if (/^.+(\s.+)*$/.test(headers)) {
			headers = headers.split(' ');
			if (headers.length > 1) {
				var result = true;
				for (var i = 0; i < headers.length; i++) {
					var th = document.getElementById(headers[i]);;
					result = th ? th.closest('table') == item.closest('table') : false;
					if (!result) {
						break;
					}
				}

                if(result) {
                    return true;
                } else {
                    item.setAttribute('data-tng-headerInTable', 'false');
                    return;
                }
			}
			else {
				var th = document.getElementById(headers[0]);

                if(th && th.closest('table') == item.closest('table')) {
                    return true;
                } else {
                    item.setAttribute('data-tng-headerInTable', 'false');
                    return;
                }
			}
		}
		else {
			return false;
		}
	},
	testStatus: "passed",
    depStatus: ["failed"],
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.4']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_466',
	query: 'table [data-tng-headerInTable="false"][data-tng-el-exposed="true"], table [data-tng-headerInTable="false"][data-tng-el-visible="true"]',
    testStatus: "failed",
    mark: {attrs: ['headers']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.4']}
});

// 5.7.5 Pour chaque balise pourvue d'un attribut WAI-ARIA role="rowheader" ou role="columnheader" dont le contenu s'applique à la totalité de la ligne ou de la colonne, la balise vérifie-t-elle une de ces conditions ?
//! dependances 5.6.1 & 5.6.2
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_467',
	query: '[role="rowheader"][data-tng-table="headerColFull"], [role="columnheader"][data-tng-table="headerRowFull"]',
    testStatus: "failed",
    mark: {attrs: ['role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.5']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_468',
	query: '[role="columnheader"][data-tng-table="headerColFull"], [role="rowheader"][data-tng-table="headerRowFull"]',
    testStatus: "passed",
    mark: {attrs: ['role']},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.7.5']}
});

//* 5.8 Chaque tableau de mise en forme ne doit pas utiliser d'éléments propres aux tableaux de données. Cette règle est-elle respectée ?
// 5.8.1 Chaque tableau de mise en forme (balise <table>) vérifie-t-il ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_469',
	query: 'table[role="presentation"]',
    testStatus: "failed",
    depStatus: ["passed"],
	filter: function (item) {
        if(item.getAttribute('data-tng-el-exposed') == 'false' && item.getAttribute('data-tng-el-visible') == 'false') return;

		if(item.hasAttribute('summary') && getAttribute('summary').length > 0) {
            return true;
        }

        if(item.querySelectorAll('caption, th, thead, tfoot, colgroup, [role="rowheader"], [role="columnheader"], td[scope], td[headers], td[axis]').length > 0) {
            return true;
        }

        item.setAttribute('data-tng-prezTable-dataEl', 'false');
	},
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.8.1']}
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'locale__tables_name_470',
	query: 'table[role="presentation"][data-tng-prezTable-dataEl="false"]',
    testStatus: "passed",
	tags: ['a11y', 'tables'],
    ressources: {'rgaa': ['5.8.1']}
});
