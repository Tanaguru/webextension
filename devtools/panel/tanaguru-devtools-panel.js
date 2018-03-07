/* A REECRIRE ENTIEREMENT */
/* @group CSSify */
// JavaScript function for converting simple XPath to CSS selector.
// Ported by Dither from [cssify](https://github.com/santiycr/cssify)
// Example: `cssify('//div[@id="girl"][2]/span[@class="body"]//a[contains(@class, "sexy")]//img[1]')`
// Bug : exemple google news (avec balise c-wiz)
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

/* @end */

var main = document.createElement('main');
main.setAttribute('role', 'main');
main.setAttribute('class', 'launch-analysis');
var leftcolumn = document.createElement('div');
main.appendChild(leftcolumn);
var rightcolumn = document.createElement('div');
var button = document.createElement('button');
button.setAttribute('type', 'button');
button.appendChild(document.createTextNode("Analyser cette page"));
var p = document.createElement('p');
p.appendChild(button);
rightcolumn.appendChild(p);
main.appendChild(rightcolumn);

//
// BUTTON CLICK "ANALYSER CETTE PAGE"
//
button.addEventListener('click', function () {
	this.setAttribute('disabled', 'disabled');

	var main = document.querySelector('main');
	main.className = 'analysis-filters';
	main.children[0].innerHTML = "";
	main.children[1].innerHTML = "";
	
	var filtersContainer = document.createElement('div');
	filtersContainer.classList.add('filtersContainer');

	var filterTitles = ['Par phase de projet', 'Par tags'];
	var phases = [ 'Intégration', 'Développement', 'Rédaction'];
	var tags = [
		'Accessibilité', 
		'SEO',
		'Ecoconception',
		'Internationalisation',
		'Robustesse',
		'Performance',
		'Sécurité',
		'SEO',
		'Mobile',
		'E-Commerce',
		'Newsletter',
		'Syndication',
		'Espaces publics',
		'Label Opquast'
	]
	
	filterTitles.forEach(function(filter, i){
		var filterCategory = document.createElement('div');
		var filterCatTitle = document.createElement('h2');
		var filterList = document.createElement('ul');

		filterCategory.classList.add('filterCategory');
		filterCatTitle.innerHTML = filter;
		filterCategory.appendChild(filterCatTitle);
		
		if ( filterTitles[i] == 'Par phase de projet' ){
			phases.forEach(function(phase){
				var listItem = document.createElement('li');
				var listButton = document.createElement('button');
				listButton.setAttribute('type', 'button');
				listButton.innerHTML = phase;
				listButton.className = phase;
				listItem.appendChild(listButton);
				filterList.appendChild(listItem);
			})
		} else if ( filterTitles[i] == 'Par tags' ) {
			tags.forEach(function(tag){
				var listItem = document.createElement('li');
				var listButton = document.createElement('button');
				listButton.setAttribute('type', 'button');
				listButton.innerHTML = tag;
				listButton.className = tag;
				listItem.appendChild(listButton);
				filterList.appendChild(listItem);
			})
		}

		filtersContainer.appendChild(filterCategory);
		filtersContainer.appendChild(filterList);
		main.children[1].appendChild(filtersContainer);
	})

	var filterButtons = document.querySelectorAll('.filtersContainer button');

	filterButtons.forEach(function(btn,i){
		btn.addEventListener('click', function(){
			var el = btn;
			var btnClass = btn.className;

			switch (btnClass) {
				case 'Accessibilité':
					browser.runtime.sendMessage({
						tabId: browser.devtools.inspectedWindow.tabId,
						command: 'analyze'
					}).then(function (response) {
	
						var main = document.querySelector('main');
						main.className = "analysis-results"
						main.children[0].innerHTML = '';
						main.children[1].innerHTML = '';
				
						//
						// VERTICAL NAV (TABS)
						//
						var nav = document.createElement('div');
						nav.setAttribute('class', 'navigation');
						  
						var navheading = document.createElement('h1');
						navheading.appendChild(document.createTextNode("Résultats de l'analyse"));
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
								document.getElementById(element.getAttribute('aria-controls')).setAttribute('aria-hidden', 'false');
							}
							}
						}, false);
						  
						// ----- DASHBOARD ----- //
						var dashboard = document.createElement('li');
						dashboard.setAttribute('id', 'tab0');
						dashboard.setAttribute('role', 'tab');
						dashboard.setAttribute('aria-selected', 'true');
						dashboard.setAttribute('tabindex', '0');
						dashboard.appendChild(document.createTextNode('Tableau de bord'));
						  
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
									var closebuttonimg = document.createElement('img');
									closebuttonimg.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAAVlJREFUKBWdk0tKxEAQhpMmYNRBcASPIB5CUTcu1VUC6szChXoEr+AJRDeSMJLHSlwLKswhxEsIPoOExK+aJGSSDIIF/9Sj66+q7soYBhLHcT8IgnWx/xLJ8zxvSfJM3/eXbdv2sDfyPN93Xfd2WgGa7HAWgHGapkMFcQVnC8yCURRFe+iWFMQbDubApmVZq8pxnHGWZS6BD9M059GtAmEY7hIXYo/pPoEL78kkoKVWWScQPJQrTIsLqSKLIx2UUiPMHninwwX6lIkWpCO2LojWMkGWSNHpGrOvM/iB+Io6aj6mKhNKzV3uSL4s/UJfNYkSb5FldMY8aZCPu7YwQa7dWUaWO5+DN4ot4re2UJHlruVjQZB1DBn1DOIAYucaNbm5R5KrV5U3wD/oKmDScY2DezAjHdEVEbuS+r4J/oBtlSTJC8YD+AadROJGbYIv3Ee+7WeJ//tf9Quc07u6uHs1zgAAAABJRU5ErkJggg==');
									closebuttonimg.setAttribute('alt', 'Fermer la fenêtre (' + h1.firstChild.nodeValue + ')');
									closebutton.appendChild(closebuttonimg);
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
			
						var i = 1;
						var badgecount = 0;
			
						for (var element in response[0]) {
							var li = document.createElement('li');
							li.setAttribute('role', 'tab');
							li.setAttribute('aria-selected', 'false');
							li.setAttribute('id', 'tab' + i);
							li.setAttribute('tabindex', '-1');
							var span = document.createElement('span');
							span.appendChild(document.createTextNode(element));
							li.appendChild(span);
							if (response[0][element].datacount > 0) {
								li.appendChild(document.createTextNode(' '));
								var strong = document.createElement('strong');
								strong.appendChild(document.createTextNode(response[0][element].datacount));
								li.appendChild(strong);
							}
							badgecount += response[0][element].datacount;
							var tabpanel = document.createElement('div');
							var tabpanelheading = document.createElement('h2');
							tabpanelheading.appendChild(document.createTextNode(li.firstChild.firstChild.nodeValue));
							tabpanel.appendChild(tabpanelheading);
							tabpanel.setAttribute('role', 'tabpanel');
							tabpanel.setAttribute('aria-labelledby', li.getAttribute('id'));
							tabpanel.setAttribute('id', 'tabpanel' + i);
							tabpanel.setAttribute('aria-hidden', 'true');
							li.setAttribute('aria-controls', tabpanel.getAttribute('id'));
							var data = response[0][element].data;
							var codehighlight = response[0][element].mark;
							for (var j = 0; j < data.length; j++) {
								if (data[j].data.length > 0) {		
									var tabpanelsection = document.createElement('h3');
									tabpanelsection.setAttribute('class', data[j].type);
									var tabpanelsectionbutton = document.createElement('button');
									tabpanelsectionbutton.setAttribute('type', 'button');
									tabpanelsectionbutton.setAttribute('data-action', 'showhide-action');
									tabpanelsectionbutton.setAttribute('aria-expanded', 'false');
									var strong = document.createElement('strong');
									strong.appendChild(document.createTextNode(data[j].data.length));
									tabpanelsectionbutton.appendChild(strong);
									tabpanelsectionbutton.appendChild(document.createTextNode(' '));
									var span = document.createElement('span');
									span.innerHTML = data[j].name.charAt(0).toLowerCase() + data[j].name.slice(1);
									tabpanelsectionbutton.appendChild(span);
									tabpanelsection.appendChild(tabpanelsectionbutton);
									var tabpanelsectiondiv = document.createElement('div');
									tabpanelsectiondiv.setAttribute('id', tabpanel.getAttribute('id') + 'section' + j);
									tabpanelsectionbutton.setAttribute('aria-controls', tabpanelsectiondiv.getAttribute('id'));
									tabpanelsectiondiv.setAttribute('hidden', 'hidden');
									if (data[j].description) {
										var tabpanelsectionp = document.createElement('p');
										tabpanelsectionp.innerHTML = data[j].description;
										tabpanelsectiondiv.appendChild(tabpanelsectionp);
									}
									tabpanel.appendChild(tabpanelsection);
									var countvisible = 0;
									var countinvisible = 0;
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
									codehighlight = data[j].mark ? data[j].mark : codehighlight;
									for (var h = 0; h < data[j].data.length; h++) {
										var tr = document.createElement('tr');
										var td = document.createElement('td');
										td.appendChild(document.createTextNode(h + 1));
										tr.appendChild(td);
										var td = document.createElement('td');
										var code = document.createElement('code');
										if (codehighlight) {
											code.innerHTML = (data[j].data[h].outer.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")).replace(new RegExp(codehighlight), '<mark>$1</mark>'); // / key="([^"]*)"/
										}
										else {
											code.appendChild(document.createTextNode(data[j].data[h].outer));
										}
										var divcode = document.createElement('div');
										divcode.setAttribute('class', 'code');
										divcode.appendChild(code);
										td.appendChild(divcode);
										tr.appendChild(td);
										var td = document.createElement('td');
										var canbereachedimg = document.createElement('img');
										canbereachedimg.setAttribute('src', data[j].data[h].canBeReachedUsingKeyboardWith.length > 0 ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAANpJREFUKBXVkLEOAVEQRddGSGxBQ6dQKJXiD1ZEpVT4ANGLSucvRCtq0YqaUukDVBQKEsI6T3Jls5uXkGhMcnbum7kz72Ud528iCIIGJL5+MEN9uMEQ3I8XYO7CHRT+a5iTC3XbJnoduIJigvAcPkkYgdk6iC6g1oILKGaItG5tqkp+QE8L0D6cQLFAeOqbmzMwVpdsfkgbanAAxQqRew9KUEzBVC7yGY6h8xpdkD+WaZoXzEMDkltEMTYQLWDKwlJT5B2Uoz7rGXMeNrCHitVoazBUgqqt/5P6E3SkJ/cZVE0PAAAAAElFTkSuQmCC' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAALtJREFUKBWlk2EOgjAMhaeBY+1eAn/0VuLN4M/8XtykW5oZYpPSjvdeu7ESQraUUix5L1Y8FiP+wHd8+SFcMu9OHAOPiFubvQIQZksijxIPDlAVcHDtYPg2cQgT7664orWqsC3QEl9WRe4LSwUIN3xrRFpPhdONEJ+NeO0KCqgO+PnOWWibrnZB7p9ZQEPUDi64orWjAG91z7o3aweB8wC0hT/3DPDXhGm2Nau7OpQP50XwerYLCeD0X/UGVSXGYbh63LAAAAAASUVORK5CYII=');
										canbereachedimg.setAttribute('alt', data[j].data[h].canBeReachedUsingKeyboardWith.length > 0 ? 'Oui (' + data[j].data[h].canBeReachedUsingKeyboardWith.join(' / ') + ')' : 'Non');
										canbereachedimg.setAttribute('title', canbereachedimg.getAttribute('alt'));
										td.appendChild(canbereachedimg);
										tr.appendChild(td);
										var td = document.createElement('td');
										var exposedimg = document.createElement('img');
										exposedimg.setAttribute('src', data[j].data[h].isNotExposedDueTo.length > 0 ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAALtJREFUKBWlk2EOgjAMhaeBY+1eAn/0VuLN4M/8XtykW5oZYpPSjvdeu7ESQraUUix5L1Y8FiP+wHd8+SFcMu9OHAOPiFubvQIQZksijxIPDlAVcHDtYPg2cQgT7664orWqsC3QEl9WRe4LSwUIN3xrRFpPhdONEJ+NeO0KCqgO+PnOWWibrnZB7p9ZQEPUDi64orWjAG91z7o3aweB8wC0hT/3DPDXhGm2Nau7OpQP50XwerYLCeD0X/UGVSXGYbh63LAAAAAASUVORK5CYII=' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAALGPC/xhBQAAANpJREFUKBXVkLEOAVEQRddGSGxBQ6dQKJXiD1ZEpVT4ANGLSucvRCtq0YqaUukDVBQKEsI6T3Jls5uXkGhMcnbum7kz72Ud528iCIIGJL5+MEN9uMEQ3I8XYO7CHRT+a5iTC3XbJnoduIJigvAcPkkYgdk6iC6g1oILKGaItG5tqkp+QE8L0D6cQLFAeOqbmzMwVpdsfkgbanAAxQqRew9KUEzBVC7yGY6h8xpdkD+WaZoXzEMDkltEMTYQLWDKwlJT5B2Uoz7rGXMeNrCHitVoazBUgqqt/5P6E3SkJ/cZVE0PAAAAAElFTkSuQmCC');
										exposedimg.setAttribute('alt', data[j].data[h].isNotExposedDueTo.length > 0 ? 'Non (' + data[j].data[h].isNotExposedDueTo.join(' / ') + ')' : 'Oui');
										exposedimg.setAttribute('title', exposedimg.getAttribute('alt'));
										td.appendChild(exposedimg);
										tr.appendChild(td);
										var td = document.createElement('td');
										var actionslist = document.createElement('ul');
										var actions = [{
											id: 'inspect-action',
											name: "Révéler dans l'inspecteur",
											image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAABLdJREFUSA2tVWtMXFUQnjl3l12eLa0FMUpJoWZhbUNrIlZsapPWhNDE1IZfaGOsEq2RN2W3JGY1kUeBwq4xJhhNTKS1UrU/qiipWoWgNhirZhcKaLVBf5CtLJSHwN47zrn0Xi61Lf7wJHDmzOObufNahNuczMrWexyxtu1IsJUAHkeEHgIaQFX7IdhYOXobU1OEJmUhsusCDwqAciB4FBCSLSKdZGfT7PQrVYPAUGNpz41y63ulg5ISe86G+3xAVIWIDqsiO1PZmWLlEX8OAL25cA1rRl8rnbLKDNp0kPViwBGTRG8hYLEhZON+0OADRv5eQXUyShCvCLGFjfYT4V5OmW7PXs7NzqhFv7VXRJZtlyjTQU6dv5n1qyWbAwujBtXBbyY64bwveqORfGcfbSsUIAKAuOm6/FRwuLcYurpUq77uwOUN7FIEnQNAmwTXovDYUFNZv1XxZnR2jX8zxsDHHNhmKScVngg1lnZadbmWgELQER2c0UmDyluBZ5S3rYWiIrMOg81lIxSlZ4hoXoIi42Q85XOucOD2HM/kjti9xKTvBkf7TlgVDDqzujklLl5ccGXtfNjgyXuwqfxrbogzkibALc60dXmSNo4goWznPMYuMei0kcN7q1ruyPb6j6R7GvQ2ddpjClgnVdHoco7XX+3ytGUYIBrQKUnLoiPSigAE8woNRe6GnwB8ItvTtsfujPkCBR6MjdrWSjkhPMkhnp2DuUkUsJ+76XNXXfsBeMRn0xYpxNldkHrsJFPexhEMusd4cBKvbap1JgohWtnADZp26FJLzeXsqpaNbJlPoJ34tckzOb+AB7lB1ymEfnde8l0qiBlO86LE4ft6NpZQBZD2uukAKE0HiGIht9cn7PBDd60/XTjs+1gnMhme/FLWwmGHszxklxai2t5gU9kVm6BUhjaKO7GMByA0EgMmg2CnpEePlY7B8MQBAK12fhYjnJ5D3F9n/uzwzTp/n4loRPXT2mzByLGKQakvFMq3THlQ8oyDLm/9eoHxP3N10hhkbHF+cdtwa3XYUNAjdsR8ilEo5Wj7DL5x6xsgkb5l+1y9XVX1/lBTpelEDDUcvcreT+oGiHfbHfZXDGN5/9JSM74whTuCTRM3HbyYBE3urVypy2ntYfCQpI0jBw2ioB7n6P/QmYjPu72Bl5jWp1zyeJHxIPk0XW75567zlyAKn84imODt+jLT3DfLxwRxedv3CcTTHM3SFiX6aFGjhuHGclmjFUYcQA6hvnGfXoaC88FXS3db3jppOpCvHE+gGAS9wU4S5Vv2NisMMHGRw7/Kn5vE7K389wC3bbzUMY6xukP9Ey9YF+QKB1LZ5W3boaDSzAnKN4xvdXNRL0qZUQNJM+/tUDj4HHR06HNhLi4plCfc99lYyp1576rrHT/y0AgZKRJx2niVAbERjvM09SJp9ZFwpAptyvs2xfYQB5Qu7dnZtpS4lI1rcgu6/7rQrf7rC6SS9XAbJtmdlKqKaByS8vecmBu/0uhdMUxZ3sAGB1IXo+8ybDmYzqlZ9dlVHRgGq936PImE9xjQXD1ctwq9TVcz/i9yOU/yZ5OL3W3qE03/b19ggLoP+xK0NcmHuRbh0EjvO/8AzKbQ7QS6mysAAAAASUVORK5CYII='
										}, {
											id: 'about-action',
											name: "A propos de cet élément",
											image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAz9JREFUSA21Vs1LVFEUP+e9GZ3JbEaGIkhEgtTJNMMWQiqzCIIWucl/oIVgVGSUH7l5EDgyCtoH1iqC2rnIok20eZhhGkJfoFYL+yAJ+hhNmUznnc6Z6TofvjfVogt67jnnd37n3PvOvXcQ/jDqO8NFGnmrNA2CCNAocAIYtSyYtjD2Yqy361suCo6xHw1d/bt1cLUy4AgglNiiCN5xsrtWnIZGI23TdpgNCUIhwwV1vg5EOAeIPrugDTaiBV5XhMYXI6ZprKX7MxKEjhub0e+/zoDmdNA/zIcpGj1mDhlLKkZXk9qWFnd+UfFNRHQkJ4J7hNY1JFjh1ZWr2DRZiR7PrkCwZGR+asoSu0s5twQqZEuOKj1bMvkDMxxtAjA40LgY6vLd52IOZuNYb2aupyx7xKfJvwPtg+UE2Clzp4FIj5PkgjAsxk86YYVLOMWfSODW6SRXU+gUkLATHg6dHvDLvLaj18eBh5zwwuXW4YT4UYJwE7zk6Q6nAGXnlnyNQON8EOp4O8uU3U7yln6AGFW50Et7eSE5yGmSwX385wYkD4HmQqJX3JbdXKnXjlxs3ObF8XysdgFxN2Q0a1YI4Xa21MYhFhkLJ09t9dm+goDbdYrtjgmERUeq0Jg8JIrj4FPM1XTqWl6Nwvh1fSd/yCKlO0nGNKy3qRMoYSdaplVrTmG4sjIuzK30XFLjD2bmAoiPED9qn5fnFY40rUrNc0luiIe8RTSbC5T00RvzhvEjhcM9qbnzLE44o1EMnyVayhkn9/N6EXKlsG53TWQwCKe2Qs81c7Atygx3MrzZCqVWmVdQsY33vzQbYqOPCHfiJK/G8TIRfbcBJUxI+F75LG9sjc/BW7LgFgHJnbNhCNdqHK6II5HgUeT0LH+Q3g1IZdD50fk9Jnq6P9H4Qg3B2iU+PratytsTFk4JWW/TxS8zfYWB4D4+nTY3KraEzg9uBQsm+LqwuDEquTLGYYFKnCaHl75O9ys94wz/1wdHMs49MX+W6nW3sThvhdX9fKF4VCU5ZfLJvMBbd8YcTm9nXqNTYGP7QFDXoZUhTYxyfPSlA+NxuPrXj352wvSfLdz/9Qk/wpj8bJE+T7Z5dlRK/wUTGiho46MioAAAAABJRU5ErkJggg==',
											attrs: { 'data-xpath': data[j].data[h].xpath }
										}];
										if (data[j].data[h].isNotVisibleDueTo.length == 0) {
											countvisible += 1;
											var highlightaction = {
												id: 'highlight-action',
												name: "Mettre en évidence sur la page",
												image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAx1JREFUSA3tVU1IVFEUPve+eU7lT9BkEUR/lo4NFZVQlAhJGWUQCW4FN+5q/E3HElyUNjkqugoXCRJEWLRJF2W2KdsYoWIzoyQUlJQGlVqOM+/eznkzb3rjiLqJNl6Yd+75zne+c++5774BWBv/uwNsNQvIrGrbByoc5Yw5pJQKE2JEaHzQ2+QcXyl/2QKOmtZc4LwURXKBscQYMSnn0O+XAG3vGpzPY2ImZ8kC6RWezapVbQRgxcBA0flSfkH7MZK7AwtuDeOgAcjOYCDoGmuunI7EoyauQHp18yFVsXShwMGwgJyQEm4Eggs97z1VXxFjaZVNqVY1IZ8xuI68PRHecFALFY25K4ai6kQ2Oxmu1pMK492MsW2ES5Bv5Xzwkre58oPOKylRoaMjpIfwkVnh2cnWqY8ZsMMUx/OZ1KQo9DeWvSKfRrRAxrWWLItUnhhbR/GfIqRl+9zlI3ZXg01hiXXY7+NCzuX7Gmu/hdMB7NUtB7hFeYlFUnQMWxli2gX/zfJB8jk9aCUo/sAQJwyX/5DEt5e1rEfx+xhz4s6OcZ6YTeG9l9utgDsiDnEJ0weeDWnZa1p3kc8zrrqTuVXtjPZSZ5E+PKNp0gbLaYydicBkuhy17Y8SkmHAbtt/lgCDS3N94LkonN/FRaRwzq3nUeCUETMs9m6K5lyKdAMjq7eCQQEe8BHOICOMhblmHmmqieIcFyLQi6fzIiaIDq4qlTDB+NjimOELCX6aG1wD1y1qkjb3366eEYFgMRaZMBNwB3pbZn+F+jCmt8scJ2x+8nsfYQY3Gkct0iRt/RJNv376Y1NO3gCX7CJuLUknMkizncjrmfCUf7Jl5/QCqCriG/E3hSu+x35rV8bvuGboLWIK92DrrHpe+C0q8LkrvORj8b9jpXvgKKxPIPZod/0C2fh7AJ+FJgt9bucAxWnEFCBgFTcZ8CZv0W8yZ3WYspvycAyFpCjyN5QOh93wM64Awf/0W2SuvtzXFM9hFl+ffia0ttFbZf3mPPN8yR2YCTSn/wOuiCz8dDskk5qUzAtBeLOa/4PFWmt+XAf+AK+PSd5DrX9WAAAAAElFTkSuQmCC',
												attrs: { 'class': 'visible' }
											};
										}
										else {
											countinvisible += 1;
											var highlightaction = {
												name: "Cet élément n'est pas visible à l'écran (" + data[j].data[h].isNotVisibleDueTo.join(' / ') + ").",
												image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAA6NJREFUSA21VktoVFkQrarX/TomJlHiJxKj+AEhRgzoJujgLyDZOAgKg1shIGgkETsGI7RRTKJixiwUBwZhVoMLERfqoh2jKAOuBDUDIyhGQuKMgubfn3fLqtd9m5cm8Ue8i9yqW6dO1bu3qjoAP2DVdV4pre/pKVFqnG1+JU4OmTbldcvpNM1mAEvOgBWWd9a+IEiOwAOa/e3GxuGvCrD16NlypyC8gg0uNQBEgG9MMvGy91x0SDOdiVxtnw2w7cSFtZjGeiCsAsaIOuQWcgIM9wHxA2Tao9cSzNzipg2wK/p78agz8gsDb0GkLIaHDcI7dSSGBZKbXyUALCcK4cFIObXrtSjGrpAV7L79+PnlozxyQJwqUR2Z/2MwNxyTfPJX17GPgsO6ls4SDru17OE+QHLUV8KYxNvkfBGnBJhSRdvafl3DEIoqedbpdQrGz9zraL4fF/KtsZifULiiUGLSdiVnNCnFSjIV6qscqtuVu6K6Y90rDeFRgfqfzsgTThrb412H+zdFu4pdjOwGh1eni+CyO4ZN9s6RElc9jhxBxjkZUh4mw+finU0vVfe/4KfWMwsN4iFLngU+VvK9sWuuS+5BdHAnAq0Kj1GrJU+YiY746ZZ/5IIeZ3z0L5YoV31rz0LVqLbpwpwwFjUA4iI9sEtq8anK75MD1UhUbc9lL0P5OikA41LBCj232BxGuBLIDRsaYoVUWIA1YqjKGbOC56VHVJTHW5JvY/86qNLaLDYPVzWvrHQ9jU/yEzH05RnBcULF/pkDH/JtVpcHHFQ5h7WGzN6n3PR3d/NEisd+03IM2o2Bddqh5OHPwXMrszHPyl58fKa6Yu25vwuXciq3X8P9D++Or9q88wUjbJRHynQscrk3irWiyxXxIMlDyphQ24hUxiMTcf+4dSk6UddycRkT7JMyDWeCSBUxd/d2RgdUz5WpKn4NMzRKyc1TXReiGXIXOye1Q20f9MZiabVp9YWwqElIlqsuD/+B2Lt4t+PIv6rrmhJAD3bEzleZlBOV+eJnxOi9AwPXtZO12RQjnVzqkVuDiLulhvxyBOR+CuPleOxwv2LsmhIgOBXFYUwyKpRAWcz0s4jZyM3i/ble8Z83z+73K8+S654LECS3U3Hy/3TlTNNUOj0hQ++5ccyde6eanwdJg7IfYDry4FTU3wNyIyuZvaXSA8YJwYA3mXplfw+ChPkyfok83+Fb9dw0tdcSzPxbyWbEB//NmBH0nYZPhr+uRH7oKK0AAAAASUVORK5CYII=',
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
												var buttontext = actions[a].name;
											}
											if (actions[a].image) {
												var actionimg = document.createElement('img');
												actionimg.setAttribute('src', actions[a].image);
												actionimg.setAttribute('alt', buttontext);
												if (button.tagName.toLowerCase() == 'span') {
													actionimg.setAttribute('title', actionimg.getAttribute('alt'));
												}
												buttoncontent.appendChild(actionimg);
											}
											else {
												buttoncontent.appendChild(document.createTextNode(buttontext));
											}
											button.appendChild(buttoncontent);
											if (button.tagName.toLowerCase() == 'button' && button.firstChild.nodeType == 1) {
												var span = document.createElement('span');
												span.setAttribute('title', actions[a].name);
												span.appendChild(button);
												action.appendChild(span);
											}
											else {
												action.appendChild(button);
											}
											actionslist.appendChild(action);	
										}
										td.appendChild(actionslist);
										tr.appendChild(td);
										table.appendChild(tr);
									}
									tabpanelsectiondiv.appendChild(table);
									if (countvisible > 0 && countinvisible > 0) {
										var selectparent = document.createElement('p');
										selectparent.setAttribute('class', 'filter');
										var selectlabel = document.createElement('label');
										selectlabel.setAttribute('for', 'select' + i + j);
										var selectlabeltext = tabpanelsection.firstChild.lastChild.textContent;
										var selectlabelspanl = document.createElement('span');
										selectlabelspanl.appendChild(document.createTextNode('Pour la partie "' + selectlabeltext.charAt(0).toUpperCase() + selectlabeltext.substr(1, selectlabeltext.length) + '", '));
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
											{ name: 'Tous les éléments', value: 'all' },
											{ name: 'Les éléments visibles uniquement (' + countvisible + ')', value: 'visible' },
											{ name: 'Les élements non visibles uniquement (' + countinvisible + ')', value: 'hidden' }
										];
										for (var o = 0; o < options.length; o++) {
											var option = document.createElement('option');
											option.setAttribute('value', options[o].value);
											option.appendChild(document.createTextNode(options[o].name));
											select.appendChild(option);
										}
										selectparent.appendChild(select);
										table.parentNode.insertBefore(selectparent, table);
									}
									tabpanel.appendChild(tabpanelsectiondiv);
								}
							}
							main.children[1].appendChild(tabpanel);
							ul.appendChild(li);
							i++;
						}
			
						browser.runtime.sendMessage({
							tabId: browser.devtools.inspectedWindow.tabId,
							command: 'notify',
							count: badgecount
						});
			
						nav.appendChild(ul);
						main.children[0].appendChild(nav);
						main.children[1].querySelector('p').remove(); 
						dashboard.focus();
					});
				break;
			}
		})
	})
	
}, false);

document.body.insertBefore(main, document.body.querySelector('script'));