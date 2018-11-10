var sub_regexes = {
	"tag": "([a-zA-Z][a-zA-Z0-9]{0,10}|\\*)",
	"attribute": "[.a-zA-Z_:][-\\w:.]*(\\(\\))?)",
	"value": "\\s*[\\w/:][-/\\w\\s,:;.]*"
};

var validation_re = "(?P<node>" + "(" + "^id\\([\"\\']?(?P<idvalue>%(value)s)[\"\\']?\\)" + "|" + "(?P<nav>//?(?:following-sibling::)?)(?P<tag>%(tag)s)" + "(\\[(" + "(?P<matched>(?P<mattr>@?%(attribute)s=[\"\\'](?P<mvalue>%(value)s))[\"\\']" + "|" + "(?P<contained>contains\\((?P<cattr>@?%(attribute)s,\\s*[\"\\'](?P<cvalue>%(value)s)[\"\\']\\))" + ")\\])?" + "(\\[\\s*(?P<nth>\\d|last\\(\\s*\\))\\s*\\])?" + ")" + ")";
for (var prop in sub_regexes) {
    validation_re = validation_re.replace(new RegExp('%\\(' + prop + '\\)s', 'gi'), sub_regexes[prop]);
}

validation_re = validation_re.replace(/\?P<node>|\?P<idvalue>|\?P<nav>|\?P<tag>|\?P<matched>|\?P<mattr>|\?P<mvalue>|\?P<contained>|\?P<cattr>|\?P<cvalue>|\?P<nth>/gi, '');
function XPathException(message) {
    this.message = message;
    this.name = "[XPathException]";
}

function cssify(xpath) {
    var prog, match, result, nav, tag, attr, nth, nodes, css, node_css = '', csses = [], xindex = 0, position = 0;
	xpath = xpath.replace(/contains\s*\(\s*concat\(["']\s+["']\s*,\s*@class\s*,\s*["']\s+["']\)\s*,\s*["']\s+([a-zA-Z0-9-_]+)\s+["']\)/gi, '@class="$1"');
    if (typeof xpath == 'undefined' || (
		xpath.replace(/[\s-_=]/g,'') === '' || 
		xpath.length !== xpath.replace(/[-_\w:.]+\(\)\s*=|=\s*[-_\w:.]+\(\)|\sor\s|\sand\s|\[(?:[^\/\]]+[\/\[]\/?.+)+\]|starts-with\(|\[.*last\(\)\s*[-\+<>=].+\]|number\(\)|not\(|count\(|text\(|first\(|normalize-space|[^\/]following-sibling|concat\(|descendant::|parent::|self::|child::|/gi,'').length)) {
		throw new XPathException('Invalid or unsupported XPath: ' + xpath);
    }
    var xpatharr = xpath.split('|');
    while (xpatharr[xindex]) {
        prog = new RegExp(validation_re,'gi');
        css = [];
        while (nodes = prog.exec(xpatharr[xindex])) {
            if (!nodes && position === 0) {
                throw new XPathException('Invalid or unsupported XPath: ' + xpath);
            }
			match = {
                node: nodes[5],
                idvalue: nodes[12] || nodes[3],
                nav: nodes[4],
                tag: nodes[5],
                matched: nodes[7],
                mattr: nodes[10] || nodes[14],
                mvalue: nodes[12] || nodes[16],
                contained: nodes[13],
                cattr: nodes[14],
                cvalue: nodes[16],
                nth: nodes[18]
            };
            if (position != 0 && match['nav']) {
                if (~match['nav'].indexOf('following-sibling::')) nav = ' + ';
                else nav = (match['nav'] == '//') ? ' ' : ' > ';
            } else {
                nav = '';
            }
            tag = (match['tag'] === '*') ? '' : (match['tag'] || '');
			if (match['contained']) {
                if (match['cattr'].indexOf('@') === 0) {
                    attr = '[' + match['cattr'].replace(/^@/, '') + '*=' + match['cvalue'] + ']';
                } else {
					throw new XPathException('Invalid or unsupported XPath attribute: ' + match['cattr']);
                }
            } else if (match['matched']) {
                switch (match['mattr']){
                    case '@id':
                        attr = '#' + match['mvalue'].replace(/^\s+|\s+$/,'').replace(/\s/g, '#');
                        break;
                    case '@class':
                        attr = '.' + match['mvalue'].replace(/^\s+|\s+$/,'').replace(/\s/g, '.');
                        break;
                    case 'text()':
                    case '.':
                        throw new XPathException('Invalid or unsupported XPath attribute: ' + match['mattr']);
                    default:
                        if (match['mattr'].indexOf('@') !== 0) {
                            throw new XPathException('Invalid or unsupported XPath attribute: ' + match['mattr']);
                        }
                        if (match['mvalue'].indexOf(' ') !== -1) {
                            match['mvalue'] = '\"' + match['mvalue'].replace(/^\s+|\s+$/,'') + '\"';
                        }
                        attr = '[' + match['mattr'].replace('@', '') + '=' + match['mvalue'] + ']';
                        break;
                }
            } else if (match['idvalue']) {
                attr = '#' + match['idvalue'].replace(/\s/, '#');
			}
            else {
                attr = '';
			}
            if (match['nth']) {
                if (match['nth'].indexOf('last') === -1){
                    if (isNaN(parseInt(match['nth'], 10))) {
                        throw new XPathException('Invalid or unsupported XPath attribute: ' + match['nth']);
                    }
                    nth = parseInt(match['nth'], 10) !== 1 ? ':nth-of-type(' + match['nth'] + ')' : ':first-of-type';
                } else {
                    nth = ':last-of-type';
                }
            } else {
                nth = '';
            }
            node_css = nav + tag + attr + nth;
			css.push(node_css);
            position++;
        }
        result = css.join('');
		if (result === '') {
		    throw new XPathException('Invalid or unsupported XPath: ' + match['node']);
		}
        csses.push(result);
        xindex++;
    }
	return csses.join(', ');
}

function manageHoveredImageButton(event) {
	if (['mouseover', 'mouseout'].indexOf(event.type) == -1 || (['mouseover', 'mouseout'].indexOf(event.type) > -1 && this != document.querySelector(':focus'))) {
		var img = this.firstChild;
		var newsrc = img.getAttribute('data-src');
		img.setAttribute('data-src', img.getAttribute('src'));
		img.setAttribute('src', newsrc);	
	}
}

var html = document.querySelector('html');
html.setAttribute('lang', browser.i18n.getMessage('extensionLang'));
var main = document.createElement('main');
main.setAttribute('role', 'main');
main.setAttribute('class', 'launch-analysis');
var leftcolumn = document.createElement('div');
main.appendChild(leftcolumn);
var rightcolumn = document.createElement('div');
var button = document.createElement('button');
button.setAttribute('type', 'button');
button.addEventListener('click', function () {
	var loadingtemplate = document.getElementById('loading');
	loadingtemplate = loadingtemplate.content;
	var rightcolumn = this.parentNode.parentNode;
	rightcolumn.replaceChild(document.importNode(loadingtemplate, true), this.parentNode);
	rightcolumn.querySelector('[tabindex="-1"]').focus();
	browser.runtime.sendMessage({
		tabId: browser.devtools.inspectedWindow.tabId,
		command: 'executeTests'
	}).then(function (response) {
	  	var main = document.querySelector('main');
	  	main.removeAttribute('class');
	  	var nav = document.createElement('div');
	  	nav.setAttribute('class', 'navigation');
	  	var navheading = document.createElement('h1');
	  	navheading.appendChild(document.createTextNode(browser.i18n.getMessage('msgNavHeading')));
	  	nav.appendChild(navheading);
	  	var ul = document.createElement('ul');
	  	ul.setAttribute('role', 'tablist');
	  	ul.setAttribute('aria-orientation', 'vertical');
	  	ul.addEventListener('keydown', function(event) {
	  		if ([38,40].indexOf(event.keyCode) > -1) {
	  			var currenttab = this.querySelector('[role="tab"][aria-selected="true"]');
		  		if (event.keyCode == 38) {
					var newcurrenttab = currenttab.previousSibling;
					if (!newcurrenttab) {
						newcurrenttab = this.querySelectorAll('[role="tab"]');
						newcurrenttab = newcurrenttab[newcurrenttab.length - 1];
					}
				}
				else if (event.keyCode == 40) {
					var newcurrenttab = currenttab.nextSibling;
					newcurrenttab = newcurrenttab ? newcurrenttab : this.querySelector('[role="tab"]');
				}
				var e = new Event('click', { 'bubbles': true, 'cancelable': false });
				newcurrenttab.dispatchEvent(e);
				newcurrenttab.focus();
			}
	  	}, false);
	  	ul.addEventListener('click', function(event) {
	  		var element = event.target;
	  		if (element.getAttribute('role') == 'tab') {
				var currenttab = this.querySelector('[role="tab"][aria-selected="true"]');
				if (element != currenttab) {
					currenttab.setAttribute('aria-selected', 'false');
					currenttab.setAttribute('tabindex', '-1');
					document.getElementById(currenttab.getAttribute('aria-controls')).setAttribute('aria-hidden', 'true');
					element.setAttribute('aria-selected', 'true');
					element.setAttribute('tabindex', '0');
					var newcurrenttabpanel = document.getElementById(element.getAttribute('aria-controls'));
					if (newcurrenttabpanel.getAttribute('id') == 'tests') {
						newcurrenttabpanel.setAttribute('aria-labelledby', element.getAttribute('id'));
						newcurrenttabpanel.querySelector('h2').innerHTML = element.textContent;
						newcurrenttabpanel.parentNode.scrollTop = 0;
						var tests = newcurrenttabpanel.querySelectorAll('h3');
						for (var i = 0; i < tests.length; i++) {
							if (element.getAttribute('id') == 'alltests') {
								tests[i].parentNode.removeAttribute('hidden');
							}
							else {
								if (tests[i].parentNode.classList.contains(element.getAttribute('id'))) {
									tests[i].parentNode.removeAttribute('hidden');
								}
								else {
									tests[i].parentNode.setAttribute('hidden', 'hidden');
								}
							}
						}
					}
					newcurrenttabpanel.setAttribute('aria-hidden', 'false');
				}
	  		}
	  	}, false);
	  	var dashboard = document.createElement('li');
	  	dashboard.setAttribute('id', 'tab0');
	  	dashboard.setAttribute('role', 'tab');
	  	dashboard.setAttribute('aria-selected', 'true');
	  	dashboard.setAttribute('tabindex', '0');
	  	dashboard.appendChild(document.createTextNode(browser.i18n.getMessage('msgDashboard')));
	  	var dashboardpanel = document.createElement('div');
	  	dashboardpanel.setAttribute('role', 'tabpanel');
	  	dashboardpanel.setAttribute('aria-labelledby', dashboard.getAttribute('id'));
		dashboardpanel.setAttribute('id', 'tabpanel0');
		dashboardpanel.setAttribute('aria-hidden', 'false');
		dashboard.setAttribute('aria-controls', dashboardpanel.getAttribute('id'));
		var dashboardpanelheading = document.createElement('h2');
		dashboardpanelheading.appendChild(document.createTextNode(dashboard.textContent));
		dashboardpanel.appendChild(dashboardpanelheading);
	  	main.children[1].appendChild(dashboardpanel);
	  	ul.appendChild(dashboard);
	  	main.children[1].addEventListener('click', function(event) {
  			var element = event.target;
  			if (element.tagName.toLowerCase() == 'button') {
	  			switch (element.getAttribute('data-action')) {
					case 'showhide-action':
						if (element.getAttribute('aria-expanded') == 'false') {
							document.getElementById(element.getAttribute('aria-controls')).removeAttribute('hidden');
							element.setAttribute('aria-expanded', 'true');
						}
						else {
							document.getElementById(element.getAttribute('aria-controls')).setAttribute('hidden', 'hidden');
							element.setAttribute('aria-expanded', 'false');
						}
						break;
					case 'highlight-action':
						var getxpathbutton = element.parentNode.parentNode.parentNode.querySelector('[data-action="about-action"]');
						browser.runtime.sendMessage({
							tabId: browser.devtools.inspectedWindow.tabId,
							command: 'highlight',
							element: cssify(getxpathbutton.getAttribute('data-xpath'))
						});
						break;
					case 'inspect-action':
						var getxpathbutton = element.parentNode.parentNode.parentNode.querySelector('[data-action="about-action"]');
						var css = cssify(getxpathbutton.getAttribute('data-xpath'));
						browser.devtools.inspectedWindow.eval("inspect(document.querySelector('" + css + "'))");
						break;
					case 'about-action':
						element.setAttribute('data-popinopener', 'true');
						var id = 'tanaguru-popin';
						var tanagurupopin = document.getElementById(id);
						if (!tanagurupopin) {
							var tanagurupopin = document.createElement('div');
							tanagurupopin.setAttribute('id', id)
							tanagurupopin.setAttribute('hidden', 'hidden');
							tanagurupopin.addEventListener('click', function(event) {
								var element = event.target;
								if (element.tagName.toLowerCase() == 'button') {
									switch (element.getAttribute('data-action')) {
										case 'copy-action':
											var input = document.getElementById('clipboarddata');
											input.value = element.parentNode.parentNode.previousSibling.textContent;
											input.select();
											if (document.execCommand("Copy")) {
												alert('Copie dans le presse-papier : OK');
												input.value = '';
												element.focus();
											}
											break;
									}
								}
							}, false);
							document.body.appendChild(tanagurupopin);
						}
						var clipboarddata = document.createElement('input');
						clipboarddata.setAttribute('id', 'clipboarddata');
						clipboarddata.setAttribute('type', 'text');
						clipboarddata.setAttribute('class', 'visually-hidden');
						clipboarddata.setAttribute('aria-hidden', 'true');
						clipboarddata.setAttribute('tabindex', '-1');
						tanagurupopin.appendChild(clipboarddata);
						var header = document.createElement('div');
						header.setAttribute('class', 'popin-header');
						var h1 = document.createElement('h1');
						h1.appendChild(document.createTextNode('A propos de cet élément'));
						var closebutton = document.createElement('button');
						closebutton.setAttribute('type', 'button');
						closebutton.appendChild(document.createTextNode('Retour aux résultats'));
						closebutton.addEventListener('click', function(event) {
							var tanagurupopin = this.parentNode.parentNode.parentNode;
							tanagurupopin.setAttribute('hidden', 'hidden');
							tanagurupopin.innerHTML = '';
							document.querySelector('main').classList.remove('tanaguru-popin-show');
							var popinopener = document.querySelector('[data-popinopener="true"]');
							popinopener.removeAttribute('data-popinopener');
							popinopener.focus();
						}, false);
						var closebuttonparent = document.createElement('p');
						closebuttonparent.appendChild(closebutton);
						header.appendChild(closebuttonparent);
						tanagurupopin.appendChild(header);
						header.appendChild(h1);
						var cssselector = document.createElement('div');
						var h2 = document.createElement('h2');
						var img = document.createElement('img');
						img.setAttribute('alt', '');
						img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAd9JREFUSA3tVD1LW2EUfs57kyoVcXAoSHWpQz5m8QdUBUFK5wp2qCB0MGkjfkQHp4sOVm8GO7SgUPwFomBD/QUdTRTRRcGhFNFB80Xu8cQ0eLgmt0unkru8zznnec7Xe+8Fms9/vwH624Th2dUBMqaPytjKLMfOavzojNPDFkYZ/PPQjqdrfu9pvA5tR5POG2NZaeliHuT26ljZ4jARLRgy38PJtTEd09i3ABO9FvIvlBHJLH3Y18IjO76Xz5VCzLgwoFc6prFvAWI8lQRXejVafPopcU7E1wC1ar/GvgVAHKySFxvxCDLmA0+nruLAYxcQmrM7LbSNiLhf9v8DWHTr8cQnA/IBMQ1G55y3pWJp53hl6rfm1u3MmDYHhjaZuB0uf9ECL3bBX+95wg+0BFe98boFcswJ18V72e0tDMa9Im3LW/QOjBsZZqJQLCZ0rIJ9v4PIfCot4p6sfRlusCaKJlNZSX6esWND3uQVu+4ENaLcYL6KG9+BXDBLn8Waxnv6FhBpXop0vPi40u0VVuze6dRzZuqQCf408pjlXwC8DaJnLa2BTCTpvNTy0Gxq6EkQh/KSdjFoV8c09i0g/5hvKPOwJPnMhdKJFlrMRzLdeiWetSc3dKyJmxv4txu4A7som3rR28JBAAAAAElFTkSuQmCC');
						h2.appendChild(img);
						h2.appendChild(document.createTextNode(' Sélecteur CSS'));
						cssselector.appendChild(h2);
						var p = document.createElement('p');
						p.appendChild(document.createTextNode(cssify(element.getAttribute('data-xpath'))));
						cssselector.appendChild(p);
						var cssactions = document.createElement('div');
						var keepcsssimplep = document.createElement('p');
						var checkbox = document.createElement('input');
						checkbox.setAttribute('disabled', 'disabled');
						checkbox.setAttribute('checked', 'checked');
						checkbox.setAttribute('type', 'checkbox');
						checkbox.setAttribute('id', 'cbsimplecss');
						keepcsssimplep.appendChild(checkbox);
						keepcsssimplep.appendChild(document.createTextNode(' '));
						var label = document.createElement('label');
						label.setAttribute('for', checkbox.getAttribute('id'));
						label.appendChild(document.createTextNode('Conserver les pseudo-classes :first-of-type et :nth-of-type dans le sélecteur CSS.'));
						keepcsssimplep.appendChild(label);
						cssactions.appendChild(keepcsssimplep);
						var copyp = document.createElement('p');
						var copybutton = document.createElement('button');
						copybutton.setAttribute('data-action', 'copy-action');
						copybutton.setAttribute('type', 'button');
						copybutton.setAttribute('aria-label', 'Copier dans le presse-papier le sélecteur CSS');
						copybutton.appendChild(document.createTextNode('Copier dans le presse-papier'));
						copyp.appendChild(copybutton);
						cssactions.appendChild(copyp);
						cssselector.appendChild(cssactions);
						tanagurupopin.appendChild(cssselector);
						var xpath = document.createElement('div');
						var h2 = document.createElement('h2');
						var img = document.createElement('img');
						img.setAttribute('alt', '');
						img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAapJREFUSA3tUj0sQ1EUPue+UgxVJrpoYigaEhsJohNjZ5PJ+uL/b2kkfuKnxGCwMjTpJhYLEtHB0IH2dRCRLkIkqoj4eb3HuWkqTwepxCDSL7nnnb/7nfu+ewGKKCrw5xXAXzoheidWfSREFyJcyTc4SCzp54r7VwZ4ptZabCCizKYpUgJ6YBM05vSZggc0Tq+3IVEvIJZIkFEtdb8X3wg8NQ4v16G9pA8R5xT5F5AcKmhAw+RquxDaPjeXWQjOgOiOED2cv2H/mBDaEbD1s4do1qYCd3+grNzl7BQEbhJwTy/mSWJlJJmrCRTdeeSq1MzrlijTa0TSp3AYMF0DgYqq6so2QlGHJJPxhcF99I4u1lCpPcyTO9QuBdbwDgm2+EQODnysrYMHpPjK6rMdWUtEMSOSalXk1rzVtzG5biVXRY6r2ej82wa/ivmMNA+19OMVOZ1+rvm5VisBkxIzwe/IFZcNMhjL3r0K84CwE5/VNy3ZbfbVKhjCuDgKEYB6Ac95uy5N0wzl5X4csrRZNI0HvSi0HhDQIwnC4v11N740dp2rF79FBf6xAh+YyZKoiNAU8AAAAABJRU5ErkJggg==');
						h2.appendChild(img);
						h2.appendChild(document.createTextNode(' Chemin de localisation (XPath)'));
						xpath.appendChild(h2);
						var p = document.createElement('p');
						p.appendChild(document.createTextNode(element.getAttribute('data-xpath')));
						xpath.appendChild(p);
						var xpathactions = document.createElement('div');
						var keepxpathsimplep = document.createElement('p');
						var checkbox = document.createElement('input');
						checkbox.setAttribute('disabled', 'disabled');
						checkbox.setAttribute('checked', 'checked');
						checkbox.setAttribute('type', 'checkbox');
						checkbox.setAttribute('id', 'cbsimplexpath');
						keepxpathsimplep.appendChild(checkbox);
						keepxpathsimplep.appendChild(document.createTextNode(' '));
						var label = document.createElement('label');
						label.setAttribute('for', checkbox.getAttribute('id'));
						label.appendChild(document.createTextNode('Conserver les attributs class et id dans le chemin de localisation (XPath).'));
						keepxpathsimplep.appendChild(label);
						xpathactions.appendChild(keepxpathsimplep);
						var copyp = document.createElement('p');
						var copybutton = document.createElement('button');
						copybutton.setAttribute('data-action', 'copy-action');
						copybutton.setAttribute('type', 'button');
						copybutton.setAttribute('aria-label', 'Copier dans le presse-papier le chemin de localisation (XPath)');
						copybutton.appendChild(document.createTextNode('Copier dans le presse-papier'));
						copyp.appendChild(copybutton);
						xpathactions.appendChild(copyp);
						xpath.appendChild(xpathactions);
						tanagurupopin.appendChild(xpath);
						document.querySelector('main').classList.add('tanaguru-popin-show');
						tanagurupopin.removeAttribute('hidden');
						closebutton.focus();
						break;
				}
  			}
  		}, false);
		var tab = document.createElement('li');
		tab.setAttribute('role', 'tab');
		tab.setAttribute('aria-selected', 'false');
		tab.setAttribute('id', 'alltests');
		tab.setAttribute('tabindex', '-1');
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(browser.i18n.getMessage('allTags')));
		tab.appendChild(span);
		ul.appendChild(tab);
		var alltagspanel = document.createElement('div');
		alltagspanel.setAttribute('role', 'tabpanel');
		alltagspanel.setAttribute('aria-labelledby', tab.getAttribute('id'));
		alltagspanel.setAttribute('id', 'tests');
		alltagspanel.setAttribute('aria-hidden', 'true');
		tab.setAttribute('aria-controls', alltagspanel.getAttribute('id'));
		var alltagspanelheading = document.createElement('h2');
		alltagspanelheading.appendChild(document.createTextNode(tab.textContent));
		alltagspanel.appendChild(alltagspanelheading);
		var t = 1;
		for (var test in response[0].tests) {
			var testelement = document.createElement('div');
			testelement.setAttribute('class', response[0].tests[test].tags.join(' '));
			var tabpanelsection = document.createElement('h3');
			tabpanelsection.setAttribute('class', response[0].tests[test].type);
			var tabpanelsectionbutton = document.createElement('button');
			tabpanelsectionbutton.setAttribute('type', 'button');
			tabpanelsectionbutton.setAttribute('data-action', 'showhide-action');
			tabpanelsectionbutton.setAttribute('aria-expanded', 'false');
			tabpanelsectionbutton.appendChild(document.createTextNode('[' + browser.i18n.getMessage('earl' + response[0].tests[test].type.charAt(0).toUpperCase() + response[0].tests[test].type.slice(1)) + '] '));
			if (!(response[0].tests[test].type == 'failed' && response[0].tests[test].data.length == 0)) {
				var strong = document.createElement('strong');
				strong.appendChild(document.createTextNode(response[0].tests[test].data.length));
				tabpanelsectionbutton.appendChild(strong);
				tabpanelsectionbutton.appendChild(document.createTextNode(' '));
			}
			var span = document.createElement('span');
			span.innerHTML = response[0].tests[test].name.charAt(0).toUpperCase() + response[0].tests[test].name.slice(1);
			tabpanelsectionbutton.appendChild(span);
			tabpanelsection.appendChild(tabpanelsectionbutton);
			var tabpanelsectiondiv = document.createElement('div');
			tabpanelsectiondiv.setAttribute('id', 'testsection' + t);
			tabpanelsectionbutton.setAttribute('aria-controls', tabpanelsectiondiv.getAttribute('id'));
			tabpanelsectiondiv.setAttribute('hidden', 'hidden');
			testelement.appendChild(tabpanelsection);
			if (response[0].tests[test].description) {
				var tabpanelsectionp = document.createElement('p');
				tabpanelsectionp.innerHTML = response[0].tests[test].description;
				tabpanelsectiondiv.appendChild(tabpanelsectionp);
			}
			if (response[0].tests[test].explanation) {
				var tabpanelsectionp = document.createElement('p');
				tabpanelsectionp.innerHTML = response[0].tests[test].explanation;
				tabpanelsectiondiv.appendChild(tabpanelsectionp);
			}
			var tagssection = document.createElement('div');
			tagssection.setAttribute('class', 'tags');
			tagssection.addEventListener('click', function(event) {
				var element = event.target;
				if (element.tagName.toLowerCase() == 'button') {
					var tab = document.getElementById(element.getAttribute('data-tagid'));
					tab.click();
					tab.focus();
				}
			}, false);
			var tabpanelsectionp = document.createElement('p');
			tabpanelsectionp.appendChild(document.createTextNode('Étiquettes : '));
			if (response[0].tests[test].tags.length == 1) {
				var tagid = 'tag' + response[0].tests[test].tags[0].charAt(0).toUpperCase() + response[0].tests[test].tags[0].slice(1);
				var tagbutton = document.createElement('button');
				tagbutton.setAttribute('type', 'button');
				tagbutton.setAttribute('data-tagid', response[0].tests[test].tags[0]);
				tagbutton.setAttribute('title', browser.i18n.getMessage('uiTagButton').replace(new RegExp('{tagName}'), browser.i18n.getMessage(tagid)));
				tagbutton.appendChild(document.createTextNode(browser.i18n.getMessage(tagid)));
				tabpanelsectionp.appendChild(tagbutton);
				tabpanelsectionp.appendChild(document.createTextNode('.'));
			}
			tagssection.appendChild(tabpanelsectionp);
			if (response[0].tests[test].tags.length > 1) {
				var tagsul = document.createElement('ul');
				for (var i = 0; i < response[0].tests[test].tags.length; i++) {
					var tagli = document.createElement('li');
					var tagid = 'tag' + response[0].tests[test].tags[i].charAt(0).toUpperCase() + response[0].tests[test].tags[i].slice(1);
					var tagbutton = document.createElement('button');
					tagbutton.setAttribute('type', 'button');
					tagbutton.setAttribute('data-tagid', response[0].tests[test].tags[i]);
					tagbutton.setAttribute('title', browser.i18n.getMessage('uiTagButton').replace(new RegExp('{tagName}'), browser.i18n.getMessage(tagid)));
					tagbutton.appendChild(document.createTextNode(browser.i18n.getMessage(tagid)));
					tagli.appendChild(tagbutton);
					tagsul.appendChild(tagli);
				}
				tagssection.appendChild(tagsul);
			}
			tabpanelsectiondiv.appendChild(tagssection);
			if (response[0].tests[test].data.length > 0) {
				var countvisible = 0;
				var countinvisible = 0;
				var countkeyboardyes = 0;
				var countkeyboardno = 0;
				var countreaderyes = 0;
				var countreaderno = 0;
				var table = document.createElement('table');
				table.setAttribute('border', '');
				var caption = document.createElement('caption');
				caption.setAttribute('class', 'visually-hidden');
				caption.appendChild(document.createTextNode(tabpanelsection.textContent));
				table.appendChild(caption);
				var tableheadings = [
					{ name: 'N°' }, 
					{ name: 'Item' }, 
					{ name: 'Atteignable au clavier ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAABGdBTUEAALGPC/xhBQAAAjBJREFUOBGt1M1LVUEYgPF7ND/KLG4qRVibIgJvoIsgcOGuEFdRRC10I5LQP6ArbRUu3dqudkG4cCEGlktNSElF6YPioqGVRmEp+XF6njoH5F69XawXfsw0vTPzzsy5JhL/IcIwrEAvgszlCjIH9vnvc8xLBkEQ7nP+3tOoOokBXN4t68Bug38bYzErdsFq1KGf6p/QZkXWnWVlZAyweDNDLRjCezxn8TTtvweLpzCEZL6r/b4iJlQw4Wgek26TM2JuHpt85WTLAYn1TOjGBxhuuhG127QqisaO0K7j544xv0RtRmO2xkl0u8EEnXtwURPncBHT8GRVGMclvIHvdgajMO8TlpGCeecRF9WZYIM0WrEJ49GfJhymXYj6D6N2klZGPGaOuUY817VcM+11+OP4iDsoxAtMYgwn4FGfYRaeyrBaP8uX8GoXMYynGMEWlhB6JUYxatCANnhN7TiEVXTADRsj9h3z/8pg7gxa4RoXcBChJ/C+fLxbqMQP+FDXYQElaIIL3IDhia+hFD74VTh2E4fxBd7Cto+cpmPVa7Diz1iH3/oKrPA4XuMUjHmcxRK+4xjMtWqLdC37fZ7A+zqNTpjsL9QNH6AWHtdTmht/gnHfE07BaltwH1dgUX6ZWyb6jXuXb+HO83iFBZTDa8gVzjPXOc59B6t3zSKvqIeOCw3CsEofPf5d+GXlCm/AE1qo72HRRiO+uYGPeBc+molGiPgPof1csTMv7nt1j9H1C4W7DIhH/jVRAAAAAElFTkSuQmCC' },
					{ name: 'Restitué ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABGdBTUEAALGPC/xhBQAAAlBJREFUOBGV00tIVUEcx/F7xAfaQ0vCUtQitCgQqoWohI9N0MNFYVKgEiRo9JAgIqhFunAjggs3UYvoIqK0cGFqFPlEoVwYoeIjDHqYgWiu6/r9HWbiei5XOgOfO/+Z+c+cO3PmOAEfJRQKHSW9BJWYRh+GHMfZoPZXWGw/gviJD+hGP75gAdW+VmTCIcyiF3nhk2nvwA2soil8LGpMooPXCNok4rN4hHqkq5+6ABu4bPMiagb3ItZMKCROQiZGoC2/go7hG86ZvNvEc0iMWNAkPGew0Q4Sx2MMnUg1OdrFLeicM6Cj+IoyO09bSIGS4lAKJdvtlRP/QNq/CSagTw+7Yx40QHw/hp8EaKt/cRc1XJF31Iu4CJUcJGOQ3AvqCCvzxFmmvUadHMNPHV6w0G/qFlyDyhsUu1Eg0EFdhDa0sHCS+qk1/xQ+qk05gO8aOIxlHEQePiMWVRh1U80P7WLo3PTiEtGOaeyG7rKO7ISe9MfMcahDnlh9erDOuYGwC63Q2Q4hH5fMLh8Qz2BKExrwkobiOoyb+DGx3nY2JjCD88jCEvQvE0zudeJ1nFRbC2kbelm7sAidsfpHUY8jeAi9KPUP46mJte0nWIH3BbrJexi4Bz3gNJSYqcm20K6EznQn9uE9BnHM5kStSQqi2ZtA3xXUQldRn28P3CPw5ka0SUyDviJ9KbpKWwp9WnwJKVsG/qfBpAp88ubS9xZ62/4LE/VPdfeu2tnEZ7CKXNvnu9aC+IU+6AwV39xuIfdyb5egMRY5TlWLeDzjsk9SRy2bAMhld532BdwAAAAASUVORK5CYII=' }, 
					{ name: 'Actions' }
				];
				var tr = document.createElement('tr');
				tr.setAttribute('class', 'theadings');
				for (var k = 0; k < tableheadings.length; k++) {
					var th = document.createElement('th');
					th.setAttribute('scope', 'col');
					if (tableheadings[k].img) {
						var img = document.createElement('img');
						img.setAttribute('src', tableheadings[k].img);
						img.setAttribute('alt', tableheadings[k].name);
						img.setAttribute('title', img.getAttribute('alt'));
						th.appendChild(img);
					}
					else {
						th.appendChild(document.createTextNode(tableheadings[k].name));
					}
					tr.appendChild(th);
				}
				table.appendChild(tr);
				var codehighlight = response[0].tests[test].mark ? response[0].tests[test].mark : null;
				for (var h = 0; h < response[0].tests[test].data.length; h++) {
					var tr = document.createElement('tr');
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(h + 1));
					tr.appendChild(td);
					var td = document.createElement('td');
					var code = document.createElement('code');
					if (codehighlight) {
						code.innerHTML = (response[0].tests[test].data[h].outer.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")).replace(new RegExp(codehighlight), '<mark>$1</mark>'); // / key="([^"]*)"/
					}
					else {
						code.appendChild(document.createTextNode(response[0].tests[test].data[h].outer));
					}
					var divcode = document.createElement('div');
					divcode.setAttribute('class', 'code');
					divcode.appendChild(code);
					td.appendChild(divcode);
					tr.appendChild(td);
					var td = document.createElement('td');
					var canbereachedimg = document.createElement('img');
					if (response[0].tests[test].data[h].canBeReachedUsingKeyboardWith.length > 0) {
						countkeyboardyes += 1;
						canbereachedimg.setAttribute('class', 'keyboardyes');
					}
					else {
						countkeyboardno += 1;
						canbereachedimg.setAttribute('class', 'keyboardno');
					}
					canbereachedimg.setAttribute('src', response[0].tests[test].data[h].canBeReachedUsingKeyboardWith.length > 0 ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAANpJREFUKBXVkLEOAVEQRddGSGxBQ6dQKJXiD1ZEpVT4ANGLSucvRCtq0YqaUukDVBQKEsI6T3Jls5uXkGhMcnbum7kz72Ud528iCIIGJL5+MEN9uMEQ3I8XYO7CHRT+a5iTC3XbJnoduIJigvAcPkkYgdk6iC6g1oILKGaItG5tqkp+QE8L0D6cQLFAeOqbmzMwVpdsfkgbanAAxQqRew9KUEzBVC7yGY6h8xpdkD+WaZoXzEMDkltEMTYQLWDKwlJT5B2Uoz7rGXMeNrCHitVoazBUgqqt/5P6E3SkJ/cZVE0PAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAALtJREFUKBWlk2EOgjAMhaeBY+1eAn/0VuLN4M/8XtykW5oZYpPSjvdeu7ESQraUUix5L1Y8FiP+wHd8+SFcMu9OHAOPiFubvQIQZksijxIPDlAVcHDtYPg2cQgT7664orWqsC3QEl9WRe4LSwUIN3xrRFpPhdONEJ+NeO0KCqgO+PnOWWibrnZB7p9ZQEPUDi64orWjAG91z7o3aweB8wC0hT/3DPDXhGm2Nau7OpQP50XwerYLCeD0X/UGVSXGYbh63LAAAAAASUVORK5CYII=');
					canbereachedimg.setAttribute('alt', response[0].tests[test].data[h].canBeReachedUsingKeyboardWith.length > 0 ? 'Oui (' + response[0].tests[test].data[h].canBeReachedUsingKeyboardWith.join(' / ') + ')' : 'Non');
					canbereachedimg.setAttribute('title', canbereachedimg.getAttribute('alt'));
					td.appendChild(canbereachedimg);
					tr.appendChild(td);
					var td = document.createElement('td');
					var exposedimg = document.createElement('img');
					if (response[0].tests[test].data[h].isNotExposedDueTo.length > 0) {
						countreaderno += 1;
						exposedimg.setAttribute('class', 'readerno');
					}
					else {
						countreaderyes += 1;
						exposedimg.setAttribute('class', 'readeryes');
					}
					exposedimg.setAttribute('src', response[0].tests[test].data[h].isNotExposedDueTo.length > 0 ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAALtJREFUKBWlk2EOgjAMhaeBY+1eAn/0VuLN4M/8XtykW5oZYpPSjvdeu7ESQraUUix5L1Y8FiP+wHd8+SFcMu9OHAOPiFubvQIQZksijxIPDlAVcHDtYPg2cQgT7664orWqsC3QEl9WRe4LSwUIN3xrRFpPhdONEJ+NeO0KCqgO+PnOWWibrnZB7p9ZQEPUDi64orWjAG91z7o3aweB8wC0hT/3DPDXhGm2Nau7OpQP50XwerYLCeD0X/UGVSXGYbh63LAAAAAASUVORK5CYII=' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAANpJREFUKBXVkLEOAVEQRddGSGxBQ6dQKJXiD1ZEpVT4ANGLSucvRCtq0YqaUukDVBQKEsI6T3Jls5uXkGhMcnbum7kz72Ud528iCIIGJL5+MEN9uMEQ3I8XYO7CHRT+a5iTC3XbJnoduIJigvAcPkkYgdk6iC6g1oILKGaItG5tqkp+QE8L0D6cQLFAeOqbmzMwVpdsfkgbanAAxQqRew9KUEzBVC7yGY6h8xpdkD+WaZoXzEMDkltEMTYQLWDKwlJT5B2Uoz7rGXMeNrCHitVoazBUgqqt/5P6E3SkJ/cZVE0PAAAAAElFTkSuQmCC');
					exposedimg.setAttribute('alt', response[0].tests[test].data[h].isNotExposedDueTo.length > 0 ? 'Non (' + response[0].tests[test].data[h].isNotExposedDueTo.join(' / ') + ')' : 'Oui');
					exposedimg.setAttribute('title', exposedimg.getAttribute('alt'));
					td.appendChild(exposedimg);
					tr.appendChild(td);
					var td = document.createElement('td');
					var actionslist = document.createElement('ul');
					var actions = [{
						id: 'inspect-action',
						name: "Révéler dans l'inspecteur",
						image: 'images/inspect.png',
						image_hover: 'images/inspect_hover.png'
					}, {
						id: 'about-action',
						name: "A propos de cet élément",
						image: 'images/about.png',
						image_hover: 'images/about_hover.png',
						attrs: { 'data-xpath': response[0].tests[test].data[h].xpath }
					}];
					if (response[0].tests[test].data[h].isNotVisibleDueTo.length == 0) {
						countvisible += 1;
						var highlightaction = {
							id: 'highlight-action',
							name: "Mettre en évidence sur la page",
							image: 'images/see.png',
							image_hover: 'images/see_hover.png',
							attrs: { 'class': 'visible' }
						};
					}
					else {
						countinvisible += 1;
						var highlightaction = {
							name: "Cet élément n'est pas visible à l'écran (" + response[0].tests[test].data[h].isNotVisibleDueTo.join(' / ') + ").",
							image: 'images/see_disabled.png',
							attrs: { 'class': 'hidden' }
						};
					}
					actions.unshift(highlightaction);
					for (var a = 0; a < actions.length; a++) {
						var action = document.createElement('li');
						if (!actions[a].hasOwnProperty('id')) {
							var button = document.createElement('span');
						}
						else {
							var button = document.createElement('button');
							button.setAttribute('type', 'button');
							button.setAttribute('data-action', actions[a].id);
						}
						for (var attr in actions[a].attrs) {
							button.setAttribute(attr, actions[a].attrs[attr]);	
						}
						var buttoncontent = document.createDocumentFragment();
						if (button.tagName.toLowerCase() == 'button') {
							var buttontext = actions[a].name + ' (' + tabpanelsection.firstChild.lastChild.textContent + ', item ' + (h + 1) + ')';
						}
						else {
							button.classList.add('noaction');
							var buttontext = actions[a].name;
						}
						if (actions[a].image) {
							var actionimg = document.createElement('img');
							actionimg.setAttribute('src', actions[a].image);
							actionimg.setAttribute('alt', buttontext);
							if (button.tagName.toLowerCase() == 'span') {
								actionimg.setAttribute('title', actionimg.getAttribute('alt'));
							}
							if (button.tagName.toLowerCase() == 'button' && actions[a].image_hover) {
								actionimg.setAttribute('data-src', actions[a].image_hover);
								button.addEventListener('mouseover', manageHoveredImageButton, false);
								button.addEventListener('mouseout', manageHoveredImageButton, false);
								button.addEventListener('focus', manageHoveredImageButton, false);
								button.addEventListener('blur', manageHoveredImageButton, false);
							}
							buttoncontent.appendChild(actionimg);
						}
						else {
							buttoncontent.appendChild(document.createTextNode(buttontext));
						}
						button.appendChild(buttoncontent);
						action.appendChild(button);
						actionslist.appendChild(action);	
					}
					td.appendChild(actionslist);
					tr.appendChild(td);
					table.appendChild(tr);
				}
				tabpanelsectiondiv.appendChild(table);
				if ((countvisible > 0 && countinvisible > 0) || (countkeyboardyes > 0 && countkeyboardno > 0) || (countreaderyes > 0 && countreaderno > 0)) {
					var selectparent = document.createElement('p');
					selectparent.setAttribute('class', 'filter');
					var selectlabel = document.createElement('label');
					selectlabel.setAttribute('for', 'select' + t);
					var selectlabeltext = tabpanelsection.firstChild.lastChild.textContent;
					var selectlabelspanl = document.createElement('span');
					selectlabelspanl.appendChild(document.createTextNode('Pour la partie "' + selectlabeltext.charAt(0).toUpperCase() + selectlabeltext.slice(1) + '", '));
					selectlabelspanl.setAttribute('class', 'visually-hidden');
					selectlabel.appendChild(selectlabelspanl);
					var selectlabelspanc = document.createElement('span');
					selectlabelspanc.appendChild(document.createTextNode('afficher'));
					selectlabelspanc.setAttribute('class', 'ucfirst');
					selectlabel.appendChild(selectlabelspanc);
					var selectlabelspanr = document.createElement('span');
					selectlabelspanr.appendChild(document.createTextNode(' ci-dessous et dès sélection'));
					selectlabelspanr.setAttribute('class', 'visually-hidden');
					selectlabel.appendChild(selectlabelspanr);
					selectlabel.appendChild(document.createTextNode(' :'));
					selectparent.appendChild(selectlabel);
					selectparent.appendChild(document.createTextNode(' '));
					var select = document.createElement('select');
					select.setAttribute('id', selectlabel.getAttribute('for'));
					select.addEventListener('change', function(event) {
						var table = this.parentNode.nextSibling;
						var tr = table.querySelectorAll('tr');
						for (var i = 1; i < tr.length; i++) {
							switch (this.value) {
								case 'keyboardyes':
									if (tr[i].querySelector('.keyboardyes')) {
										tr[i].removeAttribute('hidden');
									}
									else {
										tr[i].setAttribute('hidden', 'hidden');
									}
									break;
								case 'keyboardno':
									if (tr[i].querySelector('.keyboardno')) {
										tr[i].removeAttribute('hidden');
									}
									else {
										tr[i].setAttribute('hidden', 'hidden');
									}
									break;
								case 'readeryes':
									if (tr[i].querySelector('.readeryes')) {
										tr[i].removeAttribute('hidden');
									}
									else {
										tr[i].setAttribute('hidden', 'hidden');
									}
									break;
								case 'readerno':
									if (tr[i].querySelector('.readerno')) {
										tr[i].removeAttribute('hidden');
									}
									else {
										tr[i].setAttribute('hidden', 'hidden');
									}
									break;
								case 'visible':
									if (tr[i].querySelector('.visible')) {
										tr[i].removeAttribute('hidden');
									}
									else {
										tr[i].setAttribute('hidden', 'hidden');
									}
									break;
								case 'hidden':
									if (tr[i].querySelector('.hidden')) {
										tr[i].removeAttribute('hidden');
									}
									else {
										tr[i].setAttribute('hidden', 'hidden');
									}
									break;
								default:
									tr[i].removeAttribute('hidden');
									break;
							}
						}
					}, false);
					var options = [
						{ name: 'Tous les éléments', value: 'all' }
					];
					if (countkeyboardyes > 0 && countkeyboardno > 0) {
						options.push({
							name: 'Clavier',
							options: [
								{ name: 'Les éléments atteignables au clavier uniquement (' + countkeyboardyes + ')', value: 'keyboardyes' },
								{ name: 'Les éléments non atteignables au clavier uniquement (' + countkeyboardno + ')', value: 'keyboardno' }
							]
						});
					}
					if (countreaderyes > 0 && countreaderno > 0) {
						options.push({
							name: 'Restitution',
							options: [
								{ name: 'Les éléments restitués uniquement (' + countreaderyes + ')', value: 'readeryes' },
								{ name: 'Les éléments non restitutés uniquement (' + countreaderno + ')', value: 'readerno' }
							]
						});
					}
					if (countvisible > 0 && countinvisible > 0) {
						options.push({
							name: 'Visibilité',
							options: [
								{ name: 'Les éléments visibles uniquement (' + countvisible + ')', value: 'visible' },
								{ name: 'Les élements non visibles uniquement (' + countinvisible + ')', value: 'hidden' }
							]
						});
					}
					for (var o = 0; o < options.length; o++) {
						if (options[o].hasOwnProperty('options')) {
							var optgroup = document.createElement('optgroup');
							optgroup.setAttribute('label', options[o].name);
							for (var oo = 0; oo < options[o].options.length; oo++) {
								var option = document.createElement('option');
								option.setAttribute('value', options[o].options[oo].value);
								option.appendChild(document.createTextNode(options[o].options[oo].name));
								optgroup.appendChild(option);	
							}
							select.appendChild(optgroup);
						}
						else {
							var option = document.createElement('option');
							option.setAttribute('value', options[o].value);
							option.appendChild(document.createTextNode(options[o].name));
							select.appendChild(option);	
						}
					}
					selectparent.appendChild(select);
					table.parentNode.insertBefore(selectparent, table);
				}
			}
			testelement.appendChild(tabpanelsectiondiv);
			alltagspanel.appendChild(testelement);
			t++;
		}
		main.children[1].appendChild(alltagspanel);
		for (var tag in response[0].tags) {
			var tab = document.createElement('li');
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-selected', 'false');
			tab.setAttribute('id', response[0].tags[tag].id);
			tab.setAttribute('tabindex', '-1');
			tab.setAttribute('aria-controls', alltagspanel.getAttribute('id'));
			var span = document.createElement('span');
			span.appendChild(document.createTextNode(response[0].tags[tag].name));
			tab.appendChild(span);
			if (response[0].tags[tag].nbfailures > 0) {
				tab.appendChild(document.createTextNode(' '));
				var strong = document.createElement('strong');
				strong.appendChild(document.createTextNode(response[0].tags[tag].nbfailures));
				tab.appendChild(strong);
			}
			ul.appendChild(tab);
		}
		nav.appendChild(ul);
		main.children[0].appendChild(nav);
		main.children[1].querySelector('p').remove(); // Supprime le loading...
		dashboard.focus();
	});
}, false);
button.appendChild(document.createTextNode("Analyser cette page"));
var p = document.createElement('p');
p.appendChild(button);
rightcolumn.appendChild(p);
main.appendChild(rightcolumn);
document.body.insertBefore(main, document.body.querySelector('script'));