/**
 *? CADRES (terminé)
 ** dependances gérées
 * data : data-tng-frameAlt
 */

//* 2.1 Chaque cadre a-t-il un titre de cadre ?
// 2.1.1 Chaque cadre (balise <iframe> ou <frame>) a-t-il un attribut title ?

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_131",
  query:
    'iframe[data-tng-el-exposed="true"][title]:not([role="presentation"]), frame[data-tng-el-exposed="true"][title]:not([role="presentation"])',
  testStatus: "passed",
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "any", //startBy || endBy, || contains || egal || notEmpty || any
        },
      ],
      related: {},
      tag: "iframe",
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.1.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_132",
  query:
    'iframe[data-tng-el-exposed="true"]:not([role="presentation"]):not([title]), frame[data-tng-el-exposed="true"]:not([role="presentation"]):not([title])',
  testStatus: "failed",
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.1.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_133",
  query:
    'iframe[data-tng-el-exposed="false"]:not([role="presentation"]), frame[data-tng-el-exposed="false"]:not([role="presentation"])',
  testStatus: "inapplicable",
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.1.1"] },
});

//* 2.2 Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?
// 2.2.1 Pour chaque cadre (balise <iframe> ou <frame>) ayant un attribut title, le contenu de cet attribut est-il pertinent ?
tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_134",
  query:
    'iframe[data-tng-el-exposed="true"][title]:not([role="presentation"]), frame[data-tng-el-exposed="true"][title]:not([role="presentation"])',
  filter: function (item) {
    if (item.getAttribute("title").trim().length === 0) {
      item.setAttribute("data-tng-frameAlt", "false");
      return;
    }

    return true;
  },
  testStatus: "cantTell",
  warning: false,
  depStatus: ["failed"],
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "notEmpty",
        },
      ],
      related: {},
      tag: false,
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.2.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_135",
  query: "[data-tng-frameAlt]",
  testStatus: "failed",
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "any",
        },
      ],
      related: {},
      tag: false,
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.2.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_471",
  query:
    'iframe[data-tng-el-exposed="true"]:not([role="presentation"])[title], frame[data-tng-el-exposed="true"]:not([role="presentation"])[title]',
  filter: function (item) {
    const srcUrl = item.getAttribute("src").trim();
    const titleUrl = item.getAttribute("title").trim();

    if (srcUrl === titleUrl) {
      return true;
    }

    return false;
  },
  testStatus: "presumedNonCompliant",
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "any",
        },
      ],
      related: {},
      tag: false,
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.2.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_472",
  query:
    'iframe[data-tng-el-exposed="true"]:not([role="presentation"])[title], frame[data-tng-el-exposed="true"]:not([role="presentation"])[title]',
  filter: function (item) {
    const titleUrl = item.getAttribute("title").trim();
    return !isNaN(titleUrl);
  },
  testStatus: "presumedNonCompliant",
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "any",
        },
      ],
      related: {},
      tag: false,
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.2.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_473",
  query:
    'iframe[data-tng-el-exposed="true"]:not([role="presentation"])[title], frame[data-tng-el-exposed="true"]:not([role="presentation"])[title]',
  filter: function (item) {
    // Construction du sélecteur pour trouver les iframes avec le même title et src différent.
    let selector =
      item.tagName.toLowerCase() +
      '[title="' +
      item.getAttribute("title") +
      '"]' +
      ':not([src="' +
      item.getAttribute("src") +
      '"])';

    return document.querySelectorAll(selector).length > 0;
  },
  testStatus: "presumedNonCompliant",
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "any",
        },
      ],
      related: {},
      tag: false,
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.2.1"] },
});

tanaguruTestsList.push({
  lang: "fr",
  name: "locale__frames_name_474",
  query:
    'iframe[data-tng-el-exposed="true"]:not([role="presentation"])[title], frame[data-tng-el-exposed="true"]:not([role="presentation"])[title]',
  filter: function (item) {
    // Vérifier si l'iframe a bien les attributs title et src
    let title = item.getAttribute("title");
    let src = item.getAttribute("src");

    // Si title ou src est manquant, on retourne false
    if (!title || !src) return false;

    // Construction du sélecteur CSS pour chercher les iframes avec le même title et src
    let selector =
      item.tagName.toLowerCase() +
      '[title="' +
      title +
      '"]' +
      '[src="' +
      src +
      '"]';

    // Sélectionner tous les iframes avec le même title et src
    let matchingIframes = document.querySelectorAll(selector);

    // Retourner true si on trouve plus d'un iframe (ce qui signifie qu'il y a des duplicatas)
    return matchingIframes.length > 1;
  },
  testStatus: "presumedCompliant",
  mark: function () {
    return {
      attrs: [
        {
          name: "title",
          value: "",
          valueState: "any",
        },
        {
          name: "src",
          value: "",
          valueState: "any",
        },
      ],
      related: {},
      tag: false,
      content: false,
    };
  },
  tags: ["a11y", "frames"],
  ressources: { rgaa: ["2.2.1"] },
});
