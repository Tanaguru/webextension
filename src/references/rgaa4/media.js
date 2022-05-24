/**
 *? MULTIMEDIA
 ** tous les tests sont répertoriés
 ** dependances gérées
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
    name: "locale__media_name_319",
    query: 'audio, object[type^="audio/"], object[type="application/ogg"], embed[type^="audio/"]',
    description: "locale__media_description_320",
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
    name: "locale__media_name_321",
    query: 'video, object[type^="video/"], embed[type^="video/"]',
    description: "locale__media_description_322",
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.1.2', '4.1.3', '4.2.2', '4.2.3', '4.3.1']}
});

// 4.3.2 Pour chaque média temporel synchronisé pré-enregistré possédant des sous-titres synchronisés diffusés via une balise <track>, la balise <track> possède-t-elle un attribut kind="captions" ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_323",
    query: 'video track:not([kind=captions])',
    description: "locale__media_description_324",
    testStatus: "cantTell",
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_325",
    query: 'video track[kind="captions"]',
    testStatus: "passed",
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.3.2']}
});

// 4.4.1 Pour chaque média temporel synchronisé pré-enregistré ayant des sous-titres synchronisés, ces sous-titres sont-ils pertinents ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_326",
    query: 'video track[kind="captions"]',
    description: "locale__media_description_327",
    testStatus: "cantTell",
    mark: {attrs: ['kind']},
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.4.1']}
});

//* 4.5 Chaque média temporel pré-enregistré a-t-il, si nécessaire, une audiodescription synchronisée (hors cas particuliers) ?
//* 4.6 Pour chaque média temporel pré-enregistré ayant une audiodescription synchronisée, celle-ci est-elle pertinente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_328",
    query: 'video, object[type^="video/"], embed[type^="video/"]',
    description: "locale__media_description_329",
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'media'],
    ressources: {'rgaa': ['4.5.1', '4.5.2', '4.6.1', '4.6.2']}
});

//* 4.7 Chaque média temporel est-il clairement identifiable (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_330",
    query: 'video, audio, object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]',
    description: "locale__media_description_331",
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.7.1']}
});

//* 4.8 Chaque média non temporel a-t-il, si nécessaire, une alternative (hors cas particuliers) ?
// 4.8.1 Chaque média non temporel vérifie-t-il, si nécessaire, une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_332",
    description: "locale__media_description_333",
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.8.1']}
});

// 4.8.2 Chaque média non temporel associé à une alternative vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_334",
    description: "locale__media_description_335",
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.8.2']}
});

//* 4.9 Pour chaque média non temporel ayant une alternative, cette alternative est-elle pertinente ?
// 4.9.1 Pour chaque média non temporel ayant une alternative, cette alternative permet-elle d'accéder au même contenu et à des fonctionnalités similaires ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_336",
    description: "locale__media_description_337",
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.9.1']}
});

//* 4.10 Chaque son déclenché automatiquement est-il contrôlable par l'utilisateur ?
// 4.10.1 Chaque séquence sonore déclenchée automatiquement via une balise <object>, <video>, <audio>, <embed>, <bgsound> ou un code JavaScript vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__media_name_338",
	query: 'audio[autoplay]:not([muted]), video[autoplay]:not([muted])',
    testStatus: "failed",
    depStatus: ["passed"],
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
	name: "locale__media_name_339",
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
    name: "locale__media_name_340",
    query: 'video[controls], audio[controls]',
    testStatus: "passed",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_330",
    query: 'video:not([controls]), audio:not([controls]), object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]',
    description: "locale__media_description_342",
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.1']}
});

// 4.11.2/4.11.3 Pour chaque média temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_330",
    query: 'video, audio, object[type^="video/"], object[type^="audio/"], object[type="application/ogg"], embed[type^="video/"], embed[type^="audio/"]',
    description: "locale__media_description_344",
    testStatus: "cantTell",
    tags: ['a11y', 'videos', 'audio', 'media'],
    ressources: {'rgaa': ['4.11.2', '4.11.3']}
});

//* 4.12 La consultation de chaque média non temporel est-elle contrôlable par le clavier et tout dispositif de pointage ?
// 4.12.1 Pour chaque média non temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_345",
    status: 'untested',
    tags: ['a11y', 'media', 'keyboard'],
    ressources: {'rgaa': ['4.12.1']}
});

// 4.12.2 Pour chaque média non temporel, chaque fonctionnalité vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_346",
    status: 'untested',
    tags: ['a11y', 'media', 'keyboard'],
    ressources: {'rgaa': ['4.12.2']}
});

//* 4.13 Chaque média temporel et non temporel est-il compatible avec les technologies d'assistance (hors cas particuliers) ?
// 4.13.1 Chaque média temporel et non temporel vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_347",
    description: "locale__media_description_348",
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.13.1']}
});

// 4.13.2 Chaque média temporel et non temporel qui possède une alternative compatible avec les technologies d'assistance, vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__media_name_349",
    description: "locale__media_description_350",
    status: 'untested',
    tags: ['a11y', 'media'],
    ressources: {'rgaa': ['4.13.2']}
});
