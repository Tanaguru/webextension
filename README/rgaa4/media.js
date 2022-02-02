/**
 *? MULTIMEDIA
 ** tous les tests sont répertoriés
 *TODO voir si l'on peut identifier de façon assez précise les médias non temporels
 *
 * data: data-tng-mediaAuto
 */

//* 4.1 Chaque média temporel pré-enregistré a-t-il, si nécessaire, une transcription textuelle ou une audiodescription (hors cas particuliers) ?
//* 4.2 Pour chaque média temporel pré-enregistré ayant une transcription textuelle ou une audiodescription synchronisée, celles-ci sont-elles pertinentes (hors cas particuliers) ?
// 4.1.1 Chaque média temporel pré-enregistré seulement audio, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?
// 4.2.1 Pour chaque média temporel pré-enregistré seulement audio, ayant une transcription textuelle, celle-ci est-elle pertinente (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels seulement audios',
    query: 'audio, object[type^="audio/"], object[type="application/ogg"], embed[type^="audio/"]',
    description:'Vérifiez si nécessaire la présence d\'une transcription textuelle et sa pertinence.',
    testStatus: "cantTell",
    tags: ['a11y', 'audio', 'media'],
    ressources: {'rgaa': ['4.1.1', '4.2.1']}
});

// 4.1.2 Chaque média temporel pré-enregistré seulement vidéo, vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?
// 4.2.2 Chaque média temporel pré-enregistré seulement vidéo vérifie-t-il une de ces conditions (hors cas particuliers) ?
// 4.1.3  Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
// 4.2.3 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
//* 4.3 Chaque média temporel synchronisé pré-enregistré a-t-il, si nécessaire, des sous-titres synchronisés (hors cas particuliers) ?
// 4.3.1 Chaque média temporel synchronisé pré-enregistré vérifie-t-il, si nécessaire, l'une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés ou vidéos',
    query: 'video, object[type^="video/"], embed[type^="video/"]',
    description:'Vérifiez si nécessaire la présence d\'une audio-description, transcription textuelle et sous-titres ainsi que leur pertinence.',
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.1.2', '4.1.3', '4.2.2', '4.2.3', '4.3.1']}
});

// 4.3.2 Pour chaque média temporel synchronisé pré-enregistré possédant des sous-titres synchronisés diffusés via une balise <track>, la balise <track> possède-t-elle un attribut kind="captions" ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des balises <track> sans attribut kind="captions"',
    query: 'video track:not([kind=captions])',
    description:'Vérifiez si ces éléments track sont des sous-titres synchronisés, si oui, ils devraient posséder un attribut [kind="captions"].',
    testStatus: "cantTell",
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des sous-titres synchronisés diffusés via une balise <track> avec attribut kind="captions"',
    query: 'video track[kind="captions"]',
    testStatus: "passed",
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.2']}
});

// 4.4.1 Pour chaque média temporel synchronisé pré-enregistré ayant des sous-titres synchronisés, ces sous-titres sont-ils pertinents ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels synchronisés possédant des sous-titres via la balise track',
    query: 'video track[kind="captions"]',
    description:'Vérifiez la pertinence des sous-titres',
    testStatus: "cantTell",
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.4.1']}
});

//* 4.5 Chaque média temporel pré-enregistré a-t-il, si nécessaire, une audiodescription synchronisée (hors cas particuliers) ?
//* 4.6 Pour chaque média temporel pré-enregistré ayant une audiodescription synchronisée, celle-ci est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels vidéo',
    query: 'video, object[type^="video/"], embed[type^="video/"]',
    description:'Vérifiez si nécessaire la présence d\'une audiodescription synchronisée et sa pertinence',
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.5.1', '4.5.2', '4.6.1', '4.6.2']}
});

//* 4.7 Chaque média temporel est-il clairement identifiable (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels',
    query: 'video, audio, object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]',
    description:'Vérifiez que le contenu textuel adjacent permet d\'identifier clairement le média.',
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.7.1']}
});

//* 4.8 Chaque média non temporel a-t-il, si nécessaire, une alternative (hors cas particuliers) ?
// 4.8.1 Chaque média non temporel vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Les médias non temporels ont si nécessaire une alternative.',
    description:'Vérifiez qu\'un lien ou bouton adjacent, clairement identifiable, permet d’accéder à une alternative.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.8.1']}
});

// 4.8.2 Chaque média non temporel associé à une alternative vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour les médias non temporels associés à une alternative, cette alternative doit être accessible.',
    description:'Vérifiez l\'accessibilité de l\'alternative associée au média non temporel.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.8.2']}
});

//* 4.9 Pour chaque média non temporel ayant une alternative, cette alternative est-elle pertinente ?
// 4.9.1 Pour chaque média non temporel ayant une alternative, cette alternative permet-elle d'accéder au même contenu et à des fonctionnalités similaires ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour les médias non temporels ayant une alternative, cette alternative doit être pertinente.',
    description:'Vérifiez que l\'alternative permet d\'accéder au même contenu et à des fonctionnalités similaires.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.9.1']}
});

//* 4.10 Chaque son déclenché automatiquement est-il contrôlable par l'utilisateur ?
// 4.10.1 Chaque séquence sonore déclenchée automatiquement via une balise <object>, <video>, <audio>, <embed>, <bgsound> ou un code JavaScript vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des sons durant plus de 3secondes déclenchés automatiquement et non contrôlables par l\'utilisateur.',
	query: 'audio[autoplay]:not([muted]), video[autoplay]:not([muted])',
    testStatus: "failed",
    filter: function(item) {
        if(item.duration <= 3 && !item.hasAttribute('loop')) {
            item.setAttribute('data-tng-mediaAuto', "true");
            return false;
        }

        if(item.hasAttribute('controls')) {
            item.setAttribute('data-tng-mediaAuto', "true");
            return false;
        }

        return true;
    },
    tags: ['a11y', 'audio', 'videos', 'media'],
    ressources: {'rgaa': ['4.10.1'] },
	comments: "Implémentation partielle"
});

tanaguruTestsList.push({
	lang: 'fr',
	name: 'Liste des sons déclenchés automatiquement qui sont contrôlables par l\'utilisateur ou durent maximum 3secondes.',
	query: '[data-tng-mediaAuto]',
    testStatus: "passed",
	tags: ['a11y', 'audio', 'videos', 'media'],
    ressources: {'rgaa': ['4.10.1'] },
	comments: "Implémentation partielle"
});

//* 4.11 La consultation de chaque média temporel est-elle, si nécessaire, contrôlable par le clavier et tout dispositif de pointage ?
// 4.11.1 Chaque média temporel a-t-il, si nécessaire, les fonctionnalités de contrôle de sa consultation ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels ayant les fonctionnalités de contrôle de sa consultation',
    query: 'video[controls], audio[controls]',
    testStatus: "passed",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels',
    query: 'video:not([controls]), audio:not([controls]), object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]',
    description:'Vérifiez si nécessaire la présence des fonctionnalités de contrôle de la consultation de ces médias.',
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.1']}
});

// 4.11.2/4.11.3 Pour chaque média temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Liste des médias temporels',
    query: 'video, audio, object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]',
    description:'Vérifiez que chaque fonctionnalité de ces médias est contrôlable ET activable par le clavier et tout dispositif de pointage.',
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.2', '4.11.3']}
});

//* 4.12 La consultation de chaque média non temporel est-elle contrôlable par le clavier et tout dispositif de pointage ?
// 4.12.1 Pour chaque média non temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média non-temporel, chaque fonctionnalité doit être accessible par le clavier et tout dispositif de pointage.',
    status: 'untested',
    tags: ['a11y', 'media', 'keyboard'],
    ressources: {'rgaa': ['4.12.1']}
});

// 4.12.2 Pour chaque média non temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média non-temporel, chaque fonctionnalité doit être activable par le clavier et tout dispositif de pointage.',
    status: 'untested',
    tags: ['a11y', 'media', 'keyboard'],
    ressources: {'rgaa': ['4.12.2']}
});

//* 4.13 Chaque média temporel et non temporel est-il compatible avec les technologies d'assistance (hors cas particuliers) ?
// 4.13.1 Chaque média temporel et non temporel vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Chaque média doit être compatible avec les technologies d\'assistance.',
    description: 'Vérifier que le nom, le rôle, la valeur, le paramétrage et les changements d\'états des composants d\'interfaces sont accessibles aux technologies ou qu\'une alternative compatible permette d\'accéder aux mêmes fonctionnalités.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.13.1']}
});

// 4.13.2 Chaque média temporel et non temporel qui possède une alternative compatible avec les technologies d'assistance, vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: 'Pour chaque média ayant une alternative compatible avec les technologies d\'assistance, l\'alternative doit être implémentée correctement.',
    description: 'Vérifier que l\'alternative ou le lien/bouton permettant d\'y accéder soit adjacent au média, ou qu\'un mécanisme permette de remplacer le média par son alternative.',
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.13.2']}
});
