/**
 *? COULEURS
 ** tous les tests sont répertoriés
 *! dépendance contrast.js sur tous les tests
 *TODO prendre en compte les attributs tel quel "value" ou "placeholder" dans les tests du critère 3.2
 *TODO 3.3.1 répertorier les indications de couleur & les propriétés CSS déterminant une couleur
 *TODO identifier les mécanismes de contraste
 *! voir si l'on peut traiter certains éléments graphique
 */

//* 3.1 Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
// 3.1.1 Pour chaque mot ou ensemble de mots dont la mise en couleur est porteuse d'information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_0",
    description: "locale__colors_description_1",
    query: '[data-tng-colorization][data-tng-el-visible="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.1']}
});

// 3.1.2 Pour chaque indication de couleur donnée par un texte, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_2",
    description: "locale__colors_description_3",
    query: '[data-tng-colorindication][data-tng-el-visible="true"], [data-tng-colorindication][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.2']}
});

// 3.1.3 Pour chaque image véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_4",
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.3']}
});

// 3.1.4 Pour chaque propriété CSS déterminant une couleur et véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_5",
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.4']}
});

// 3.1.5 Pour chaque média temporel véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_6",
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.5']}
});

// 3.1.6 Pour chaque média non temporel véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_7",
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.6']}
});

//* 3.2 Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?
// 3.2.1 Dans chaque page web, le texte et le texte en image sans effet de graisse d'une taille restituée inférieure à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_45',
    lang: 'fr',
    name: "locale__colors_name_8",
    description: "locale__colors_description_9",
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'valid_45',
    lang: 'fr',
    name: "locale__colors_name_10",
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45',
    lang: 'fr',
    name: "locale__colors_name_11",
    description: "locale__colors_description_9",
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'invalid_45V',
    lang: 'fr',
    name: "locale__colors_name_13",
    description: "locale__colors_description_14",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45V',
    lang: 'fr',
    name: "locale__colors_name_15",
    description: "locale__colors_description_16",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'valid_45V',
    lang: 'fr',
    name: "locale__colors_name_17",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

// 3.2.2 Dans chaque page web, le texte et le texte en image en gras d’une taille restituée inférieure à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    contrast: 'invalid_45G',
    lang: 'fr',
    name: "locale__colors_name_18",
    description: "locale__colors_description_9",
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'valid_45G',
    lang: 'fr',
    name: "locale__colors_name_20",
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45G',
    lang: 'fr',
    name: "locale__colors_name_21",
    description: "locale__colors_description_9",
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'invalid_45GV',
    lang: 'fr',
    name: "locale__colors_name_23",
    description: "locale__colors_description_14",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45GV',
    lang: 'fr',
    name: "locale__colors_name_25",
    description: "locale__colors_description_16",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'valid_45GV',
    lang: 'fr',
    name: "locale__colors_name_27",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

// 3.2.3 Dans chaque page web, le texte et le texte en image sans effet de graisse d’une taille restituée supérieure ou égale à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3',
    lang: 'fr',
    name: "locale__colors_name_28",
    description: "locale__colors_description_9",
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'valid_3',
    lang: 'fr',
    name: "locale__colors_name_30",
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3',
    lang: 'fr',
    name: "locale__colors_name_31",
    description: "locale__colors_description_9",
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'invalid_3V',
    lang: 'fr',
    name: "locale__colors_name_33",
    description: "locale__colors_description_34",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3V',
    lang: 'fr',
    name: "locale__colors_name_35",
    description: "locale__colors_description_36",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'valid_3V',
    lang: 'fr',
    name: "locale__colors_name_37",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

// 3.2.4 Dans chaque page web, le texte et le texte en image en gras d'une taille restituée supérieure ou égale à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3G',
    lang: 'fr',
    name: "locale__colors_name_38",
    description: "locale__colors_description_9",
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'valid_3G',
    lang: 'fr',
    name: "locale__colors_name_40",
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3G',
    lang: 'fr',
    name: "locale__colors_name_41",
    description: "locale__colors_description_9",
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'invalid_3GV',
    lang: 'fr',
    name: "locale__colors_name_43",
    description: "locale__colors_description_34",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3GV',
    lang: 'fr',
    name: "locale__colors_name_45",
    description: "locale__colors_description_36",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'valid_3GV',
    lang: 'fr',
    name: "locale__colors_name_47",
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

// 3.2.5 Dans le mécanisme qui permet d'afficher un rapport de contraste conforme, le rapport de contraste entre le texte et la couleur d’arrière-plan est-il suffisamment élevé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_48",
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.2.5']}
});

//* 3.3 Dans chaque page web, les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations sont-elles suffisamment contrastées (hors cas particuliers) ?
// 3.3.1 Dans chaque page web, le rapport de contraste entre les couleurs d'un composant d'interface dans ses différents états et la couleur d'arrière-plan contiguë vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_49",
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.1']}
});

// 3.3.2 Dans chaque page web, le rapport de contraste des différentes couleurs composant un élément graphique, lorsqu'elles sont nécessaires à sa compréhension, et la couleur d'arrière-plan contiguë, vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_50",
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.2']}
});

// 3.3.3 Dans chaque page web, le rapport de contraste des différentes couleurs contiguës entre elles d'un élément graphique, lorsqu'elles sont nécessaires à sa compréhension, vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_51",
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.3']}
});

// 3.3.4 Dans le mécanisme qui permet d'afficher un rapport de contraste conforme, les couleurs du composant ou des éléments graphiques porteurs d’informations qui le composent, sont-elles suffisamment contrastées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__colors_name_52",
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.4']}
});
