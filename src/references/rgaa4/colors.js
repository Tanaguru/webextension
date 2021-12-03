/**
 *? COULEURS
 ** tous les tests sont répertoriés
 *TODO prendre en compte les attributs tel quel "value" ou "placeholder" dans les tests du critère 3.2
 *TODO 3.3.1 répertorier les indications de couleur & les propriétés CSS déterminant une couleur
 *TODO identifier les mécanismes de contraste
 *! voir si l'on peut traiter certains éléments graphique
 */

//* 3.1 Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
// 3.1.1 Pour chaque mot ou ensemble de mots dont la mise en couleur est porteuse d'information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque mot ou ensemble de mots dont la mise en couleur est porteuse d\'information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.1']}
});

// 3.1.2 Pour chaque indication de couleur donnée par un texte, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque indication de couleur donnée par un texte, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.2']}
});

// 3.1.3 Pour chaque image véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque image véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.3']}
});

// 3.1.4 Pour chaque propriété CSS déterminant une couleur et véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque propriété CSS déterminant une couleur et véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.4']}
});

// 3.1.5 Pour chaque média temporel véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média temporel véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.5']}
});

// 3.1.6 Pour chaque média non temporel véhiculant une information, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média non temporel véhiculant une information, l\'information ne doit pas être donnée uniquement par la couleur.',
    status: 'untested',
    tags: ['a11y', 'colors'],
    ressources: {'rgaa': ['3.1.6']}
});

//* 3.2 Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?
// 3.2.1 Dans chaque page web, le texte et le texte en image sans effet de graisse d'une taille restituée inférieure à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_45',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste inférieur à 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'valid_45',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste suffisant de 4.5:1',
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte sans effet de graisse et d\'une taille restituée inférieure à 24px respectent un contraste d\'au moins 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    testStatus: "cantTell",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'invalid_45V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste inférieur à 4.5:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 4.5:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée inférieure à 24px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 4.5:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

tanaguruTestsList.push({
    contrast: 'valid_45V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée inférieure à 24px ayant un contraste suffisant de 4.5:1',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.1']}
});

// 3.2.2 Dans chaque page web, le texte et le texte en image en gras d’une taille restituée inférieure à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    contrast: 'invalid_45G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée inférieure à 18.5px ayant un contraste inférieur à 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'valid_45G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée inférieure à 18.5px ayant un contraste suffisant de 4.5:1',
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45G',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte en gras d\'une taille restituée inférieure à 18.5px respectent un contraste d\'au moins 4.5:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    testStatus: "cantTell",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'invalid_45GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée inférieure à 18.5px ayant un contraste inférieur à 4.5:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 4.5:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_45GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée inférieure à 18.5px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 4.5:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

tanaguruTestsList.push({
    contrast: 'valid_45GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée inférieure à 18.5px ayant un contraste suffisant de 4.5:1',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.2']}
});

// 3.2.3 Dans chaque page web, le texte et le texte en image sans effet de graisse d’une taille restituée supérieure ou égale à 24px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste inférieur à 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'valid_3',
    lang: 'fr',
    name: 'Textes visibles sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste suffisant de 3:1',
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px respectent un contraste d\'au moins 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    testStatus: "cantTell",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'invalid_3V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste inférieur à 3:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 3:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 3:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

tanaguruTestsList.push({
    contrast: 'valid_3V',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés sans effet de graisse et d\'une taille restituée supérieure ou égale à 24px ayant un contraste suffisant de 3:1',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.3']}
});

// 3.2.4 Dans chaque page web, le texte et le texte en image en gras d'une taille restituée supérieure ou égale à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    contrast: 'invalid_3G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste inférieur à 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    tags: ['a11y', 'contrast', 'colors'],
    testStatus: "failed",
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'valid_3G',
    lang: 'fr',
    name: 'Textes visibles en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste suffisant de 3:1',
    testStatus: "passed",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3G',
    lang: 'fr',
    name: 'Vérifier que ces éléments texte en gras d\'une taille restituée supérieure ou égale à 18.5px respectent un contraste d\'au moins 3:1',
    description:'Vérifiez si nécessaire la présence d\'un mécanisme permettant d\'afficher un rapport de contraste conforme',
    testStatus: "cantTell",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'invalid_3GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste inférieur à 3:1',
    description: 'Si ces éléments texte peuvent être rendus visibles, ils devraient respecter un contraste de 3:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'cantTell_3GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée supérieure ou égale à 18.5px',
    description: 'Si ces éléments texte peuvent être rendus visibles, vérifier qu\'ils respectent un contraste de 3:1 minimum.',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

tanaguruTestsList.push({
    contrast: 'valid_3GV',
    lang: 'fr',
    name: 'Textes non visibles ou désactivés en gras d\'une taille restituée supérieure ou égale à 18.5px ayant un contraste suffisant de 3:1',
    testStatus: "inapplicable",
    tags: ['a11y', 'contrast', 'colors'],
    ressources: {'rgaa': ['3.2.4']}
});

// 3.2.5 Dans le mécanisme qui permet d'afficher un rapport de contraste conforme, le rapport de contraste entre le texte et la couleur d’arrière-plan est-il suffisamment élevé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Une mécanisme permet d\'afficher un rapport de contraste conforme entre le texte et sa couleur d\'arrière plan.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.2.5']}
});

//* 3.3 Dans chaque page web, les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations sont-elles suffisamment contrastées (hors cas particuliers) ?
// 3.3.1 Dans chaque page web, le rapport de contraste entre les couleurs d'un composant d'interface dans ses différents états et la couleur d'arrière-plan contiguë vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le rapport de contraste entre les couleurs d\'un composant d\'interface dans ses différents états et la couleur d\'arrière-plan contiguë est de 3:1 au moins.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.1']}
});

// 3.3.2 Dans chaque page web, le rapport de contraste des différentes couleurs composant un élément graphique, lorsqu'elles sont nécessaires à sa compréhension, et la couleur d'arrière-plan contiguë, vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le rapport de contraste des différentes couleurs composant un élément graphique, lorsqu\'elles sont nécessaires à sa compréhension, et la couleur d\'arrière-plan contiguë est de 3:1 au moins.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.2']}
});

// 3.3.3 Dans chaque page web, le rapport de contraste des différentes couleurs contiguës entre elles d'un élément graphique, lorsqu'elles sont nécessaires à sa compréhension, vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Le rapport de contraste des différentes couleurs contiguës entre elles d\'un élément graphique, lorsqu\'elles sont nécessaires à sa compréhension,  est de 3:1 au moins.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.3']}
});

// 3.3.4 Dans le mécanisme qui permet d'afficher un rapport de contraste conforme, les couleurs du composant ou des éléments graphiques porteurs d’informations qui le composent, sont-elles suffisamment contrastées ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Une mécanisme permet d\'afficher un rapport de contraste conforme pour les composants d\'interface et les éléments graphiques porteurs d\'informations.',
    status: 'untested',
    tags: ['a11y', 'colors', 'contrast'],
    ressources: {'rgaa': ['3.3.4']}
});
