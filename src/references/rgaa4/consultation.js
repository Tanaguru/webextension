/**
 *? CONSULTATION
 ** tous les tests sont répertoriés
 ** dependances gérées
 *TODO reconnaissance des contenus cryptique
 *TODO analyse des scripts
 *TODO contenus en mouvement ou clignotant ?
 */

//* 13.1 Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque limite de temps modifiant le contenu (hors cas particuliers) ?
// 13.1.1 Pour chaque page web, chaque procédé de rafraîchissement (balise <object>, balise <embed>, balise <svg>, balise <canvas>, balise <meta>) vérifie-t-il une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__consultation_name_53",
    query: 'meta[http-equiv="refresh"][content]',
    testStatus: "failed",
    filter: function (item) {
        var content = item.getAttribute('content').trim();

        if (content.length > 0) {
            let redirect = /; *url=.+/i;
            let refresh = /^(\s*\d+\s*){1}/i;

            if(redirect.test(content)) {
                item.setAttribute('data-tng-redirect', true);
                return;
            } else if(refresh.test(content)) {
                content = content.split(';')[0].trim();
                return content > 0 && content < 72000;
            }
        }
    },
    mark: {attrs: ['http-equiv', 'content']},
    tags: ['a11y', 'meta', 'consultation'],
    ressources: { 'rgaa': ['13.1.1']}
});

// 13.1.2  Pour chaque page web, chaque procédé de redirection effectué via une balise <meta> est-il immédiat (hors cas particuliers) ?
//! dependance 13.1.1
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__consultation_name_54",
    query: '[data-tng-redirect]',
    testStatus: "failed",
    filter: function (item) {
        var content = item.getAttribute('content').trim();
        let time = content.match(/^\d+/);
        if(time) return time[0] > 0;
    },
    mark: {attrs: ['http-equiv', 'content']},
    tags: ['a11y', 'meta', 'consultation'],
    ressources: { 'rgaa': ['13.1.2']}
});

// 13.1.3 Pour chaque page web, chaque procédé de redirection effectué via un script vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_55",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.1.3'] }
});

// 13.1.4 Pour chaque page web, chaque procédé limitant le temps d'une session vérifie-t-il une de ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_56",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.1.4'] }
});

//* 13.2 Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur. Cette règle est-elle respectée ?
// 13.2.1 Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur. Cette règle est-elle respectée ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_57",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.2.1'] }
});

//* 13.3 Dans chaque page web, chaque document bureautique en téléchargement possède-t-il, si nécessaire, une version accessible (hors cas particuliers) ?
// 13.3.1 Dans chaque page web, chaque fonctionnalité de téléchargement d'un document bureautique vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_58",
    query: '[href][download]',
    testStatus: "cantTell",
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.3.1'] }
});

//* 13.4 Pour chaque document bureautique ayant une version accessible, cette version offre-t-elle la même information ?
// 13.4.1 Chaque document bureautique ayant une version accessible vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_59",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.4.1'] }
});

//* 13.5 Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) a-t-il une alternative ?
// 13.5.1 Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_60",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.5.1'] }
});

//* 13.6 Dans chaque page web, pour chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) ayant une alternative, cette alternative est-elle pertinente ?
// 13.6.1 Dans chaque page web, chaque contenu cryptique (art ASCII, émoticon, syntaxe cryptique) vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_61",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.6.1'] }
});

//* 13.7 Dans chaque page web, les changements brusques de luminosité ou les effets de flash sont-ils correctement utilisés ?
// 13.7.1 Dans chaque page web, chaque image ou élément multimédia (balise <video>, balise <img>, balise <svg>, balise <canvas>, balise <embed> ou balise <object>) qui provoque un changement brusque de luminosité ou un effet de flash vérifie-t-elle une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_62",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.7.1'] }
});

// 13.7.2 Dans chaque page web, chaque script qui provoque un changement brusque de luminosité ou un effet de flash vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_63",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.7.2'] }
});

// 13.7.3 Dans chaque page web, chaque mise en forme CSS qui provoque un changement brusque de luminosité ou un effet de flash vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_64",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.7.3'] }
});

//* 13.8 Dans chaque page web, chaque contenu en mouvement ou clignotant est-il contrôlable par l'utilisateur ?
// 13.8.1 Dans chaque page web, chaque contenu en mouvement, déclenché automatiquement, vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_65",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.8.1'] }
});

// 13.8.2 Dans chaque page web, chaque contenu clignotant, déclenché automatiquement, vérifie-t-il une de ces conditions ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_66",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.8.2'] }
});

//* 13.9 Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran (portrait ou paysage) (hors cas particuliers) ?
// 13.9.1 Dans chaque page web, chaque contenu vérifie-t-il ces conditions (hors cas particuliers) ? 
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_67",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.9.1'] }
});

//* 13.10 Dans chaque page web, les fonctionnalités utilisables ou disponibles au moyen d'un geste complexe peuvent-elles être également disponibles au moyen d'un geste simple (hors cas particuliers) ?
// 13.10.1 Dans chaque page web, chaque fonctionnalité utilisable ou disponible suite à un contact multipoint est-elle également utilisable ou disponible suite à un contact en un point unique de l’écran (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_68",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.10.1'] }
});

// 13.10.2 Dans chaque page web, chaque fonctionnalité utilisable ou disponible suite à un geste basé sur le suivi d'une trajectoire sur l'écran est-elle également utilisable ou disponible suite à un contact en un point unique de l'écran (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_69",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.10.2'] }
});

//* 13.11 Dans chaque page web, les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran peuvent-elles faire l'objet d'une annulation (hors cas particuliers) ?
// 13.11.1 Dans chaque page web, les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran vérifient-elles l'une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_70",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.11.1'] }
});

//* 13.12 Dans chaque page web, les fonctionnalités qui impliquent un mouvement de l'appareil ou vers l'appareil peuvent-elles être satisfaites de manière alternative (hors cas particuliers) ?
// 13.12.1 Dans chaque page web, les fonctionnalités disponibles en bougeant l'appareil peuvent-elles être accomplies avec des composants d'interface utilisateur (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_71",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.12.1'] }
});

// 13.12.2 Dans chaque page web, les fonctionnalités disponibles en faisant un geste en direction de l'appareil peuvent-elles être accomplies avec des composants d'interface utilisateur (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_72",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.12.2'] }
});

// 13.12.3 L'utilisateur a-t-il la possibilité de désactiver la détection du mouvement pour éviter un déclenchement accidentel de la fonctionnalité (hors cas particuliers) ?
tanaguruTestsList.push({
	lang: 'fr',
	name: "locale__consultation_name_73",
    status: 'untested',
    tags: ['a11y', 'consultation'],
    ressources: { 'rgaa': ['13.12.3'] }
});
