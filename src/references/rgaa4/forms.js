/**
 *? FORMULAIRES
 ** Tous les tests sont répertoriés
 *? dependances gérées mais attention à la reference data-tng-altLong
 *TODO voir si l'on peut approfondir les tests 11.10.2 et 11.10.4
 *TODO traiter la proximité d'une étiquette avec son champ ?? (11.1.3, 11.4)
 *
 * data : data-tng-fieldsAN, data-tng-label-related, data-tng-has-label, data-tng-visible-label, data-tng-text-label, data-tng-ANinclude-visibleLabel, data-tng-fieldsgroup-legend, data-tng-optgroup-label, data-tng-button-namesMatch, data-tng-autocomplete-group, data-tng-autocomplete
 */

//* 11.1 Chaque champ de formulaire a-t-il une étiquette ?
// 11.1.1 Chaque champ de formulaire vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_74",
    query: 'input[type="text"]:not([role]), input[type="password"]:not([role]), input[type="search"]:not([role]), input[type="email"]:not([role]), input[type="number"]:not([role]), input[type="tel"]:not([role]), input[type="url"]:not([role]), textarea:not([role]), input[type="checkbox"]:not([role]), input[type="radio"]:not([role]), input[type="date"]:not([role]), input[type="range"]:not([role]), input[type="color"]:not([role]), input[type="time"]:not([role]), input[type="month"]:not([role]), input[type="week"]:not([role]), input[type="datetime-local"]:not([role]), select:not([role]), datalist:not([role]), input[type="file"]:not([role]), progress:not([role]), meter:not([role]), input:not([type]):not([role]), [role="progressbar"], [role="slider"], [role="spinbutton"], [role="textbox"], [role="listbox"], [role="searchbox"], [role="combobox"], [role="option"], [role="checkbox"], [role="radio"], [role="switch"], [contenteditable="true"]:not([role])',
    testStatus: "failed",
    depStatus: ["passed", "cantTell"],
    filter: function (item) {
        item.setAttribute('data-tng-formField', 'true');
        if(item.getAttribute('data-tng-el-exposed') === 'true') {
            if(item.hasAccessibleName()) {
                item.setAttribute('data-tng-fieldsAN', 'true');
                return;
            } else {
                return true;
            }
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_75",
    query: '[data-tng-fieldsAN="true"]',
    testStatus: "passed",
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.1.1'] }
});

// 11.1.2 : Chaque champ de formulaire associé à une balise <label> ayant un attribut for, vérifie-t-il ces conditions ? 
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_76",
    query: 'label[for][data-tng-el-exposed="true"]',
    testStatus: "failed",
    depStatus: ["passed"],
    filter: function (item) {
        if(item.getAttribute('for').trim().length > 0) {
            var startDigit = /^\d/;
            var id = item.getAttribute('for');

            if(id.match(startDigit)) {
                id = '\\3'+id.substring(0, 1)+' '+id.substring(1, id.length).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
            } else {
                id = id.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]/g, "\\$&");
            }
            
            var fields = document.querySelectorAll('#'+id);

            if(fields.length === 0 || fields.length > 1) {
                return true;
            } else {
                let elCategory = fields[0].getImplicitAriaRoleCategory();
                if(elCategory && elCategory === 'forms') {
                    item.setAttribute('data-tng-label-related', 'true');
                }
                return;
            }
        }
    },
    mark: function() {
        return {
            attrs: [{
                name: "for",
                value: "",
                valueState: "notEmpty" //startBy || endBy, || contains || egal || notEmpty || any
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.1.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_77",
    query: 'label[data-tng-label-related="true"]',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "for",
                value: "",
                valueState: "notEmpty" //startBy || endBy, || contains || egal || notEmpty || any
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.1.2'] }
});

// 11.1.3 Chaque champ de formulaire ayant une étiquette dont le contenu n'est pas visible ou à proximité (masqué, aria-label) ou qui n’est pas accolé au champ (aria-labelledby), vérifie-t-il une de ses conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_78",
    query: '[data-tng-fieldsAN]',
    testStatus: "failed",
    depStatus: ["cantTell", "passed"],
    filter: function (item) {
        if((item.getAttribute('data-tng-el-exposed') === 'false' && item.getAttribute('data-tng-el-visible', 'false')) || item.disabled) return;

        let hasLabel = false;

        if(item.hasAttribute('aria-labelledby') && item.getAttribute('aria-labelledby').trim().length > 0) {
            let ids = item.getAttribute('aria-labelledby').split(' ');
            let labelIsVisible = false;
            let visibleLabel = '';

            ids.forEach(id => {
                let el = document.getElementById(id);
                if(el) {
                    hasLabel = true;
                    item.setAttribute('data-tng-has-label', 'labelledby');
                    labelIsVisible = false;
                    if(el.getAttribute('data-tng-el-visible') === 'true' && el.textContent.trim().length > 0) {
                        el.childNodes.forEach(e => {
                            if(e.nodeType === 3) {
                                labelIsVisible = true;
                                visibleLabel += ' '+e.textContent;
                            }
            
                            if(e.nodeType === 1 && e.getAttribute('data-tng-el-visible') === 'true') {
                                e.childNodes.forEach(echild => {
                                    if(echild.nodeType === 3 || echild.nodeType === 1 && echild.getAttribute('data-tng-el-visible') === 'true') {
                                        labelIsVisible = true;
                                        visibleLabel += ' '+echild.textContent;
                                    }
                                });
                            }
                        });
                    }
                }
            });

            if(labelIsVisible) {
                item.setAttribute('data-tng-visible-label', 'labelledby');
                item.setAttribute('data-tng-text-label', visibleLabel.trim());
                return;
            }
        }

        if(item.id.trim().length > 0) {
            let labels = document.querySelectorAll('label[for]');
            let labelsLength = labels.length;
            
            for(let i = 0; i < labelsLength; i++) {
                let forAttr = labels[i].getAttribute('for').split(' ');
                if(forAttr.includes(item.id)) {
                    if(labels[i].textContent.trim().length > 0) {
                        if(labels[i].getAttribute('data-tng-el-visible') === 'true') {
                            let visibleText = '';
                            labels[i].childNodes.forEach(e => {
                                if(e.nodeType === 3) {
                                    visibleText += ' '+e.textContent;
                                }
                
                                if(e.nodeType === 1 && e.getAttribute('data-tng-el-visible') === 'true') {
                                    e.childNodes.forEach(echild => {
                                        if(echild.nodeType === 3 || (echild.nodeType === 1 && echild.getAttribute('data-tng-el-visible') === 'true')) {
                                            visibleText += ' '+echild.textContent;
                                        }
                                    });
                                }
                            });

                            if(visibleText.length > 0) {
                                item.setAttribute('data-tng-visible-label', 'label');
                                item.setAttribute('data-tng-text-label', visibleText.trim());
                                return;
                            }
                        }

                        hasLabel = true;
                        item.setAttribute('data-tng-has-label', 'label');
                    }
                    
                    break;
                } 
            }
        }

        if(item.hasAttribute('aria-label') && item.getAttribute('aria-label').trim().length > 0) {
            hasLabel = true;
            item.setAttribute('data-tng-has-label', 'arialabel');
        }

        if(item.hasAttribute('title') && item.getAttribute('title').trim().length > 0) {
            item.setAttribute('data-tng-has-label', 'title');
            return;
        }

        if(hasLabel) {
            item.setAttribute('data-tng-temp', 'focused');
            item = item.focus();
            item = document.querySelector('[data-tng-temp]');
            item.removeAttribute('data-tng-temp');
            if(item.hasAttribute('aria-describedby') && item.getAttribute('aria-describedby').trim().length > 0) {
                let ids = item.getAttribute('aria-describedby').split(' ');
                ids.forEach(id => {
                    let el = document.getElementById(id);
                    if(el && el.textContent.trim().length > 0) {
                        if(el.getAttribute('data-tng-el-visible') === 'true') {
                            item.setAttribute('data-tng-has-label', 'describedby');
                            return;
                        } 
                        // else {
                        //     item.focus();
                        //     let elFocus = document.getElementById(id);
                        //     if(elFocus.isVisible) {
                        //         item.setAttribute('data-tng-has-label', 'describedby-focus');
                        //         return;
                        //     }
                        // }
                    }
                })
            }
            return true;
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_79",
    description: "locale__forms_description_80",
    query: '[data-tng-has-label="title"]:not([data-tng-visible-label])',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "title",
                value: "",
                valueState: "notEmpty" //startBy || endBy, || contains || egal || notEmpty || any
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.1.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_81",
    description: "locale__forms_description_82",
    query: '[data-tng-has-label="describedby"]:not([data-tng-visible-label])',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [],
            related: {
                title: "Passage de texte référencé par [aria-describedby].", // desc displayed above the element
                element: "#!!!aria-describedby!!!", //css selector
                attrs: [],
                tag: false,
                content: true
            },
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.1.3'] }
});

// tanaguruTestsList.push({
//     lang: 'fr',
//     name: "locale__forms_name_83",
//     description: "locale__forms_description_82",
//     query: '[data-tng-has-label="describedby-focus"]:not([data-tng-visible-label])',
//     mark: {attrs: ['aria-describedby']},
//     tags: ['a11y', 'forms', 'accessiblename'],
//     ressources: { 'rgaa': ['11.1.3'] }
// });

//* 11.2 : Chaque étiquette associée à un champ de formulaire est-elle pertinente (hors cas particuliers) ?
// 11.2.1 : Chaque balise <label> permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_85",
    query: 'label[data-tng-el-exposed="true"]',
    filter: function (item) {
        if(item.getAttribute('data-tng-label-related' === 'true')) return true;

        if(item.hasChildNodes()) {
            var children = item.childNodes;
            var childrenLength = children.length;

            for(var i = 0; i < childrenLength; i++) {
                if(children[i].tagName) {
                    let cat = children[i].getImplicitAriaRoleCategory();
                    if(cat && cat === 'forms') return true;
                }
            }
        }
    },
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [],
            related: {
                title: "Champ associé au <label>.",
                element: "#!!!for!!!",
                attrs: [],
                tag: false,
                content: false
            },
            tag: false,
            content: true
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.2.1'] }
});

// 11.2.2 : Chaque attribut title permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?
//! dependance 11.1.1
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_86",
    query: '[data-tng-formField][title][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "title",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.2.2'] }
});

//! dependance 11.1.1
// 11.2.3 : Chaque étiquette implémentée via l'attribut WAI-ARIA aria-label permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_87",
    query: '[data-tng-formField][aria-label][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "aria-label",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.2.3'] }
});

//! dependance 11.1.1
// 11.2.4 : Chaque passage de texte associé via l'attribut WAI-ARIA aria-labelledby permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_88",
    query: '[data-tng-formField][aria-labelledby][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [],
            related: {
                title: "Passage de texte associé au champ.",
                element: "#!!!aria-labelledby!!!",
                attrs: [],
                tag: false,
                content: true
            },
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.2.4'] }
});

// 11.2.5 Chaque champ de formulaire ayant un intitulé visible vérifie-t-il ces conditions (hors cas particuliers) ?
//! dependance 11.1.3
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_89",
    query: '[data-tng-visible-label]',
    filter: function (item) {
        let anMatch = isString1MatchString2(item.accessibleName(), item.getAttribute('data-tng-text-label'));
        if(anMatch === null) return
        else if(anMatch) return true
        else {
            item.setAttribute('data-tng-ANinclude-visibleLabel', 'false');
            return;
        }
    },
    testStatus: "passed",
    depStatus: ["failed"],
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.5'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_90",
    query: '[data-tng-ANinclude-visibleLabel]',
    testStatus: "failed",
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.2.5'] }
});
// 11.2.6 Chaque bouton adjacent au champ de formulaire qui fournit une étiquette visible permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_91",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.2.6'] }
});

//* 11.3 Dans chaque formulaire, chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée plusieurs fois dans une même page ou dans un ensemble de pages est-elle cohérente ?
// 11.3.1 Chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée plusieurs fois dans une même page est-elle cohérente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_92",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.3.1'] }
});

// 11.3.2 Chaque étiquette associée à un champ de formulaire ayant la même fonction et répétée dans un ensemble de pages est-elle cohérente ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_93",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.3.2'] }
});

//* 11.4 Dans chaque formulaire, chaque étiquette de champ et son champ associé sont-ils accolés (hors cas particuliers) ?
// 11.4.1 Chaque étiquette de champ et son champ associé sont-ils accolés ?
// 11.4.2 Chaque étiquette accolée à un champ (à l'exception des case à cocher, bouton radio ou balise ayant un attribut WAI-ARIA role="checkbox", role="radio" ou role="switch"), vérifie-t-elle ces conditions (hors cas particuliers) ? 
// 11.4.3 Chaque étiquette accolée à un champ de type checkbox ou radio ou à une balise ayant un attribut WAI-ARIA role="checkbox", role="radio" ou role="switch", vérifie-t-elle ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_94",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.4.1', '11.4.2', '11.4.3'] }
});

//* 11.5 Dans chaque formulaire, les champs de même nature sont-ils regroupés, si nécessaire ?
//11.5.1 : Les champs de même nature vérifient-ils l'une de ces conditions, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_95",
    query: 'fieldset[data-tng-el-exposed="true"], [role="group"][data-tng-el-exposed="true"], [role="radiogroup"][data-tng-el-exposed="true"]',
    filter: function(item) {
        let cat = item.getImplicitAriaRoleCategory();
        if(cat) return cat === 'forms';
    },
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.5.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_96",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.5.1'] }
});

//* 11.6 Dans chaque formulaire, chaque regroupement de champs de même nature a-t-il une légende ?
// 11.6.1 : Chaque regroupement de champs de même nature possède-t-il une légende ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_97",
    query: 'fieldset[data-tng-el-exposed="true"], [role="group"][data-tng-el-exposed="true"]',
    testStatus: "failed",
    depStatus: ["passed", "cantTell"],
    filter: function (item) {
        let cat = item.getImplicitAriaRoleCategory();
        if(cat && cat === 'forms') {
            if(item.hasAccessibleName()) {
                item.setAttribute('data-tng-fieldsgroup-legend', 'true');
                return;
            } else {
                return true;
            }
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.6.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_98",
    query: '[data-tng-fieldsgroup-legend]',
    testStatus: "passed",
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.6.1'] }
});

//* 11.7 Dans chaque formulaire, chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?
// 11.7.1 Chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?
//! dependance 11.6.1
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_99",
    query: '[data-tng-fieldsgroup-legend]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "aria-label",
                value: "",
                valueState: "notEmpty"
            }],
            related: {
                title: "Passage de texte associé au champ.",
                element: "#!!!aria-labelledby!!!",
                attrs: [],
                tag: false,
                content: true
            },
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms', 'accessiblename'],
    ressources: { 'rgaa': ['11.7.1'] }
});

//* 11.8 Dans chaque formulaire, les items de même nature d'une liste de choix sont-ils regroupés de manière pertinente ?
// 11.8.1 Pour chaque balise <select>, les items de même nature d'une liste de choix sont-ils regroupés avec une balise <optgroup>, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_100",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.8.1'] }
});

// 11.8.2 Dans chaque balise <select>, chaque balise <optgroup> possède-t-elle un attribut label ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_101",
    query: 'select optgroup[data-tng-el-exposed="true"]:not([label])',
    testStatus: "failed",
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.8.2'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_102",
    query: 'select optgroup[label][data-tng-el-exposed="true"]',
    testStatus: "passed",
    mark: function() {
        return {
            attrs: [{
                name: "label",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.8.2'] }
});

// 11.8.3 Pour chaque balise <optgroup> ayant un attribut label, le contenu de l'attribut label est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_103",
    query: 'select optgroup[label][data-tng-el-exposed="true"]',
    testStatus: "failed",
    depStatus: ["cantTell"],
    filter: function (item) {
        if(item.getAttribute('label').trim().length > 0) {
            item.setAttribute('data-tng-optgroup-label', 'true');
            return;
        } else {
            return true;
        }
    },
    mark: function() {
        return {
            attrs: [{
                name: "label",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.8.3'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_104",
    query: '[data-tng-optgroup-label]',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "label",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.8.3'] }
});

//* 11.9 Dans chaque formulaire, l'intitulé de chaque bouton est-il pertinent (hors cas particuliers) ?
// 11.9.1 L'intitulé de chaque bouton est-il pertinent ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_105",
    query: 'input[type="submit"][data-tng-el-exposed="true"], input[type="reset"][data-tng-el-exposed="true"], input[type="button"][data-tng-el-exposed="true"], button[data-tng-el-exposed="true"], input[type="image"][data-tng-el-exposed="true"], [role="button"][data-tng-el-exposed="true"]',
    filter: function(item) {
        if(item.closest('form') || item.closest('[role="form"]')) {
            item.setAttribute('data-tng-formButton', 'true');
            if(item.hasAccessibleName()) {
                if(item.hasAttribute('data-tng-ANObject')) {
                    let details = JSON.parse(item.getAttribute('data-tng-ANObject'));
                    details.shift();
                    for(let i = 0; i < details.length; i++) {
                        if(Object.keys(details[i]).includes("aria-labelledby") || Object.keys(details[i]).includes("aria-label")) {
                            item.setAttribute('data-tng-formButton-ANaria', "true");
                            break;
                        }
                    }
                }
                return true;
            } else {
                item.setAttribute('data-tng-formButton-an', 'false');
                return;
            }
        }
    },
    testStatus: 'cantTell',
    warning: false,
    depStatus: ["failed"],
    mark: function() {
        return {
            attrs: [{
                name: "aria-label",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: "alt",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: "value",
                value: "",
                valueState: "notEmpty"
            },
            {
                name: "title",
                value: "",
                valueState: "notEmpty"
            }],
            related: {
                title: "Passage de texte associé au champ.",
                element: "#!!!aria-labelledby!!!",
                attrs: [],
                tag: false,
                content: true
            },
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms', 'buttons'],
    ressources: { 'rgaa': ['11.9.1'] }
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_106",
    query: '[data-tng-formButton-an="false"]',
    testStatus: "failed",
    mark: function() {
        return {
            attrs: [{
                name: "aria-label",
                value: "",
                valueState: "any"
            },
            {
                name: "alt",
                value: "",
                valueState: "any"
            },
            {
                name: "value",
                value: "",
                valueState: "any"
            },
            {
                name: "title",
                value: "",
                valueState: "any"
            }],
            related: {
                title: "Passage de texte associé au champ.",
                element: "#!!!aria-labelledby!!!",
                attrs: [],
                tag: false,
                content: true
            },
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms', 'buttons'],
    ressources: { 'rgaa': ['11.9.1'] }
});

// 11.9.2 Chaque bouton affichant un intitulé visible vérifie-t-il ces conditions (hors cas particuliers) ?
//! dependance 11.9.1
//! reference a data-tng-altLong, vérifier si nécessaire, si oui cet attribut est défini dans le script image donc il faudrait également le definir dans ce script
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_107",
    query: '[data-tng-formButton-ANaria]',
    testStatus: "failed",
    depStatus: ["passed"],
    filter: function (item) {
        if(item.innerText.trim().length > 0 || (item.value && item.value.trim().length > 0) || item.querySelector('[data-tng-altLong]')) {
            var visibleName = '';
            if(item.alt) visibleName += ' '+item.alt;
            if(item.value) visibleName += ' '+item.value;
            item.childNodes.forEach(e => {
                if(e.nodeType === 3) {
                    visibleName += ' '+e.textContent;
                }

                if(e.nodeType === 1 && e.getAttribute('data-tng-el-visible') === 'true') {
                    if(e.alt) visibleName += ' '+e.alt;

                    e.childNodes.forEach(echild => {
                        if(echild.nodeType === 3 || (echild.nodeType === 1 && echild.getAttribute('data-tng-el-visible') === 'true')) {
                            visibleName += ' '+echild.textContent;
                            if(echild.alt) visibleName += ' '+echild.alt;
                        }
                    });
                }
            });

            if(visibleName.length == 0) return;

            let anMatch = isString1MatchString2(item.accessibleName(), visibleName);
            if(anMatch === null) return
            else if(!anMatch) return true
            else {
                item.setAttribute('data-tng-button-namesMatch', 'true');
                return;
            }
        }
    },
    tags: ['a11y', 'accessiblename', 'buttons', 'forms'],
    ressources: {'rgaa': ['11.9.2']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_108",
    query: '[data-tng-button-namesMatch]',
    testStatus: "passed",
    tags: ['a11y', 'accessiblename', 'buttons', 'forms'],
    ressources: {'rgaa': ['11.9.2']}
});

//* 11.10 Dans chaque formulaire, le contrôle de saisie est-il utilisé de manière pertinente (hors cas particuliers) ?
// 11.10.1 Les indications du caractère obligatoire de la saisie des champs vérifient-elles une de ces conditions (hors cas particuliers) ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_109",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.10.1'] }
});

// 11.10.2 Les champs obligatoires ayant l'attribut aria-required="true" ou required vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_110",
    description: "locale__forms_description_111",
    query: '[aria-required="true"][data-tng-el-exposed="true"], [required][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.10.2']}
});

// 11.10.3 Les messages d'erreur indiquant l'absence de saisie d'un champ obligatoire vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_112",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.10.3'] }
});

// 11.10.4 Les champs obligatoires ayant l'attribut aria-invalid="true" vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_113",
    description: "locale__forms_description_114",
    query: '[aria-invalid="true"][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.10.4']}
});

// 11.10.5 Les instructions et indications du type de données et/ou de format obligatoires vérifient-elles une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_115",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.10.5'] }
});

// 11.10.6 Les messages d'erreurs fournissant une instruction ou une indication du type de données et/ou de format obligatoire des champs vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_116",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: { 'rgaa': ['11.10.6'] }
});

// 11.10.7 Les champs ayant l'attribut aria-invalid="true" dont la saisie requiert un type de données et/ou de format obligatoire vérifient-ils une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_117",
    description: "locale__forms_description_118",
    query: '[aria-invalid="true"][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.10.7']}
});

//* 11.11 Dans chaque formulaire, le contrôle de saisie est-il accompagné, si nécessaire, de suggestions facilitant la correction des erreurs de saisie ?
// 11.11.1 Pour chaque erreur de saisie, les types et les formats de données sont-ils suggérés, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_119",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.11.1']}
});

// 11.11.2 Pour chaque erreur de saisie, des exemples de valeurs attendues sont-ils suggérés, si nécessaire ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_120",
    status: 'untested',
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.11.2']}
});

//* 11.12 Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou à un examen, ou dont la validation a des conséquences financières ou juridiques, les données saisies peuvent-elles être modifiées, mises à jour ou récupérées par l’utilisateur ?
// 11.12.1 Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou un examen, ou dont la validation a des conséquences financières ou juridiques, la saisie des données vérifie-t-elle une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_121",
    description: "locale__forms_description_122",
    query: 'form[data-tng-el-exposed="true"], [role="form"][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.12.1']}
});

// 11.12.2 Chaque formulaire dont la validation modifie ou supprime des données à caractère financier, juridique ou personnel vérifie-t-il une de ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_123",
    description: "locale__forms_description_124",
    query: 'form[data-tng-el-exposed="true"], [role="form"][data-tng-el-exposed="true"]',
    testStatus: 'cantTell',
    warning: false,
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.12.2']}
});

//* 11.13 La finalité d'un champ de saisie peut-elle être déduite pour faciliter le remplissage automatique des champs avec les données de l'utilisateur ?
// 11.13.1 Chaque champ de formulaire dont l'objet se rapporte à une information concernant l'utilisateur vérifie-t-il ces conditions ?
tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_125",
    query: 'input[type="text"][data-tng-el-exposed="true"], input[type="password"][data-tng-el-exposed="true"], input[type="email"][data-tng-el-exposed="true"], input[type="tel"][data-tng-el-exposed="true"], input[type="url"][data-tng-el-exposed="true"], textarea[data-tng-el-exposed="true"], input[type="date"][data-tng-el-exposed="true"], select[data-tng-el-exposed="true"], input[data-tng-el-exposed="true"]:not([type])',
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "autocomplete",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_126",
    description: "locale__forms_description_127",
    query: 'input[autocomplete][data-tng-el-exposed="true"], textarea[autocomplete][data-tng-el-exposed="true"], select[autocomplete][data-tng-el-exposed="true"]',
    testStatus: "failed",
    filter: function (item) {
        //? if na, return
        if(item.disabled) return;
        if(item.hasAttribute('aria-disabled') && item.getAttribute('aria-disabled') === 'true') return;

        if(item.getAttribute('autocomplete') === 'on' || item.getAttribute('autocomplete') === 'off' || item.getAttribute('autocomplete').trim() === '') return;

        if(item.tagName.toLowerCase() === 'input' && item.hasAttribute('type')) {
            let notField = ['submit', 'reset', 'image', 'button'];
            if(notField.includes(item.getAttribute('type').toLowerCase())) {
                return;
            }
        }

        if(item.hasAttribute('role') && item.getAttribute('role') === 'button') return;

        //? else get autocomplete values
        let autocomplete = item.getAttribute('autocomplete').toLowerCase().split(' ');

        /**
         *? Token groups
         * order : 1.group, 2.Mode, 3.Hint, 4.Token
         ** https://html.spec.whatwg.org/#autofill-field
         */
        let group = new RegExp(/section-*/);
        let mode = ['shipping', 'billing'];
        let hint = ['home', 'work', 'mobile', 'fax', 'pager']; // contact token only

        let normalToken = ['name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname', 'organization-title', 'username', 'new-password', 'current-password', 'one-time-code', 'organization', 'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level4', 'address-level3', 'address-level2', 'address-level1', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type', 'transaction-currency', 'transaction-amount', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'url', 'photo'];
        let contactToken = ['tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension', 'email', 'impp'];

        //? Control groups
        let textGroup = ['name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'nickname', 'organization-title', 'organization', 'address-line1', 'address-line2', 'address-line3','address-level4', 'address-level3', 'address-level2', 'address-level1', 'country', 'country-name', 'postal-code', 'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-csc', 'cc-type', 'transaction-currency', 'language', 'sex', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension'];
        let usernameGroup = ['username', 'email'];
        let passwordGroup = ['new-password', 'current-password', 'one-time-code'];
        let multilineGroup = ['street-address'];
        let monthGroup = ['cc-exp'];
        let numericGroup = ['cc-exp-month', 'cc-exp-year', 'transaction-amount', 'bday-day', 'bday-month', 'bday-year'];
        let dateGroup = ['bday'];
        let urlGroup = ['url', 'photo', 'impp'];
        let telGroup = ['tel'];

        let controlGroups = [
            ['text', textGroup],
            ['email', usernameGroup],
            ['password', passwordGroup],
            ['multiline', multilineGroup],
            ['month', monthGroup],
            ['number', numericGroup],
            ['date', dateGroup],
            ['url', urlGroup],
            ['tel', telGroup]
        ];

        /**
         *? Check validity
         */
        if(autocomplete.length === 1) {
            if(!normalToken.includes(autocomplete[0]) && !contactToken.includes(autocomplete[0])) return true;

            controlGroups.forEach(el => {
                if(el[1].includes(autocomplete[0])) {
                    item.setAttribute('data-tng-autocomplete-group', el[0]);
                    return;
                }
            });
        }

        if(autocomplete.length > 1) {
            let mainTokenIndex = autocomplete.length - 1;
            let mainToken = false;

            //? check main token
            if(normalToken.includes(autocomplete[mainTokenIndex])) {
                mainToken = 'normal';
            } else if(contactToken.includes(autocomplete[mainTokenIndex])) {
                mainToken = 'contact';
            } else {
                return true;
            }

            //? check order tokens
            if(mainToken === 'normal') {
                if(autocomplete.length < 4 && !hint.some(x => autocomplete.includes(x))) {
                    if(autocomplete.length === 2 && (!autocomplete[0].match(group) && !mode.includes(autocomplete[0]))) {
                        return true;
                    }

                    if(autocomplete.length === 3) {
                        if(!autocomplete[0].match(group) || !mode.includes(autocomplete[1])) {
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            }

            if(mainToken === 'contact') {
                if(autocomplete.length < 5) {
                    if(autocomplete.length === 2 && (!autocomplete[0].match(group) && !mode.includes(autocomplete[0]) && !hint.includes(autocomplete[0]))) {
                        return true;
                    }

                    if(autocomplete.length === 3) {
                        if(autocomplete[0].match(group)) {
                            if(!mode.includes(autocomplete[1]) && !hint.includes(autocomplete[1])) {
                                return true;
                            }
                        } else if(mode.includes(autocomplete[0]) && !hint.includes(autocomplete[1])) {
                            return true;
                        } else if(hint.includes(autocomplete[0])) {
                            return true;
                        }
                    }

                    if(autocomplete.length === 4) {
                        if(!autocomplete[0].match(group) || !mode.includes(autocomplete[1]) || !hint.includes(autocomplete[2])) {
                            return true;
                        }
                    }
                } else {
                    return true;
                }
            }

            controlGroups.forEach(el => {
                if(el[1].includes(autocomplete[mainTokenIndex])) {
                    item.setAttribute('data-tng-autocomplete-group', el[0]);
                    return;
                }
            });
        }
    },
    mark: function() {
        return {
            attrs: [{
                name: "autocomplete",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_128",
    query: '[data-tng-autocomplete-group]',
    testStatus: "failed",
    depStatus: ["cantTell"],
    filter: function(item) {
        if(item.tagName.toLowerCase() === 'textarea' || item.tagName.toLowerCase() === 'select') {
            item.setAttribute('data-tng-autocomplete', true);
            return;
        }

        let group = item.getAttribute('data-tng-autocomplete-group');
        let type = '';

        if(item.hasAttribute('type')) {
            type = item.getAttribute('type').toLowerCase();
        } else {
            type = 'text';
        }

        if(group === 'multiline') return true;

        if(type === 'text' || type === 'search') {
            item.setAttribute('data-tng-autocomplete', true);
            return;
        }

        if(type === group) {
            item.setAttribute('data-tng-autocomplete', true);
            return;
        }

        return true;
    },
    mark: function() {
        return {
            attrs: [{
                name: "autocomplete",
                value: "",
                valueState: "any"
            },
            {
                name: "type",
                value: "",
                valueState: "notEmpty"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});

tanaguruTestsList.push({
    lang: 'fr',
    name: "locale__forms_name_129",
    query: '[data-tng-autocomplete]',
    description: "locale__forms_description_130",
    testStatus: 'cantTell',
    warning: false,
    mark: function() {
        return {
            attrs: [{
                name: "autocomplete",
                value: "",
                valueState: "any"
            }],
            related: {},
            tag: false,
            content: false
        }
    },
    tags: ['a11y', 'forms'],
    ressources: {'rgaa': ['11.13.1']}
});
