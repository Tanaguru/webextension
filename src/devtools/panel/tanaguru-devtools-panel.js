/**
 *? XPATH
 */
var sub_regexes = {
	"tag": "([a-zA-Z0-9-_]*|\\*)",
	"attribute": "[.a-zA-Z_:][-\\w:.]*(\\(\\))?)",
	"value": "\\s*[\\w/:][-/\\w\\s,:;.]*"
};

var validation_re = "(?P<node>" + "(" + "^id\\([\"\\']?(?P<idvalue>%(value)s)[\"\\']?\\)" + "|" + "(?P<nav>//?(?:following-sibling::)?)(?P<tag>%(tag)s)" + "(\\[(" + "(?P<matched>(?P<mattr>@?%(attribute)s=[\"\\'](?P<mvalue>%(value)s))[\"\\']" + "|" + "(?P<contained>contains\\((?P<cattr>@?%(attribute)s,\\s*[\"\\'](?P<cvalue>%(value)s)[\"\\']\\))" + ")\\])?" + "(\\[\\s*(?P<nth>\\d+|last\\(\\s*\\))\\s*\\])?" + ")" + ")";

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

/**
 *? applied on actions buttons 
 */
function manageHoveredImageButton(event) {
	if (['mouseover', 'mouseout'].indexOf(event.type) == -1 || (['mouseover', 'mouseout'].indexOf(event.type) > -1 && this != document.querySelector(':focus'))) {
		var img = this.firstChild;
		var newsrc = img.getAttribute('data-src');
		img.setAttribute('data-src', img.getAttribute('src'));
		img.setAttribute('src', newsrc);	
	}
}

/**
 *? Construct panel
 */
var html = document.querySelector('html');
html.setAttribute('lang', chrome.i18n.getMessage('extensionLang'));
var main = document.createElement('main');
main.setAttribute('role', 'main');
main.setAttribute('class', 'launch-analysis');

// left
var leftcolumn = document.createElement('div');
main.appendChild(leftcolumn);

// right
var rightcolumn = document.createElement('div');

// right/title
var homeTitle = document.createElement('h1');
homeTitle.textContent = chrome.i18n.getMessage('homeTitle');
homeTitle.style.textAlign = 'center';
rightcolumn.appendChild(homeTitle);

// right/filtres
var filterBloc = document.createElement('div');
filterBloc.classList.add('launch-analysis-filters');

var isRGAAVersion = chrome.runtime.getManifest().short_name.match(/RGAA/);
if(isRGAAVersion) {
	var rgaaFilterTemplate = document.getElementById('rgaaFilter').content;
	filterBloc.appendChild(rgaaFilterTemplate);
}

var statusFilterTemplate = document.getElementById('statusFilter').content;
filterBloc.appendChild(statusFilterTemplate);
rightcolumn.appendChild(filterBloc);


// right/bouton "analyser cette page"
var button = document.createElement('button');
button.setAttribute('type', 'button');
button.appendChild(document.createTextNode("Analyser cette page"));
var p = document.createElement('p');
p.appendChild(button);
rightcolumn.appendChild(p);

main.appendChild(rightcolumn);
document.body.insertBefore(main, document.body.querySelector('script'));

/**
 * ? filters logic
 */
let allfilter = document.querySelectorAll('fieldset[data-filter] input:not([name])');
let datafilters = document.querySelectorAll('fieldset[data-filter] input[name]');

datafilters.forEach(el => el.addEventListener('click', switchAll));
allfilter.forEach(el => el.addEventListener('click', toggle));

function switchAll(evt) {
	let sameState = true;
	let siblings = evt.currentTarget.parentNode.parentNode.querySelectorAll('input[name]');
	let master = evt.currentTarget.parentNode.parentNode.querySelector('input:not([name])');

	siblings.forEach(el => {
		sameState = el.checked != evt.currentTarget.checked ? false : sameState;
	});

	if(sameState) master.click();
	else master.checked = false;
}

function toggle(evt) {
	let siblings = evt.currentTarget.parentNode.parentNode.querySelectorAll('input[name]');
	siblings.forEach(el => el.checked = evt.currentTarget.checked);
}

/**
 *? Click on analize button
 */
button.addEventListener('click', function () {
	/**
	 * ? Get filters choices
	 */
	var filters = {
		rgaa: [],
		statuses: []
	}

	document.querySelectorAll('#rgaaFieldset input:checked').forEach(e => {
		filters.rgaa.push(e.id);
	});

	document.querySelectorAll('#statusFieldset input:checked').forEach(e => {
		filters.statuses.push(e.id);
	});

	filterBloc.remove();
	homeTitle.remove();

	/**
	 * ? Display loading
	 */
	
	var loadingtemplate = document.getElementById('loading');
	loadingtemplate = loadingtemplate.content;
	var rightcolumn = this.parentNode.parentNode;
	rightcolumn.replaceChild(document.importNode(loadingtemplate, true), this.parentNode);
	rightcolumn.querySelector('[tabindex="-1"]').focus();
	
	chrome.runtime.sendMessage({
		tabId: chrome.devtools.inspectedWindow.tabId,
		command: 'executeTests', 
		timer: new Date().getTime(),
		rgaaFilters: filters.rgaa.join(),
		statusFilters: filters.statuses.join()},
		
		function (response) {
			/**
			 * ? Set DOM (dashboard's tab & panel)
			 */
			var main = document.querySelector('main');
			main.removeAttribute('class');
			var nav = document.createElement('div');
			nav.setAttribute('class', 'navigation');
			var navheading = document.createElement('h1');
			navheading.appendChild(document.createTextNode(chrome.i18n.getMessage('msgNavHeading')));
			nav.appendChild(navheading);
			
			var ptimer = document.createElement('p');
			ptimer.setAttribute('style', 'font-size: 0.8em; margin: 0 0 0.5em 0; padding: 0 0.5em;');
			var tte = new Date().getTime();
			var teststimer = (tte - response.timer) / 1000;
			var ptimersmall = document.createElement('small');
			ptimersmall.appendChild(document.createTextNode('Analyse réalisée en ' + teststimer + ' seconde' + (teststimer > 1 ? 's' : '') + '.'));
			ptimer.appendChild(ptimersmall);
			nav.appendChild(ptimer);
		
			var ul = document.createElement('ul');
			ul.setAttribute('role', 'tablist');
			ul.setAttribute('aria-orientation', 'vertical');

			var dashboard = document.createElement('li');
			dashboard.setAttribute('id', 'tab0');
			dashboard.setAttribute('role', 'tab');
			dashboard.setAttribute('aria-selected', 'true');
			dashboard.setAttribute('tabindex', '0');
			dashboard.appendChild(document.createTextNode(chrome.i18n.getMessage('msgDashboard')));
			var dashboardpanel = document.createElement('div');
			dashboardpanel.setAttribute('role', 'tabpanel');
			dashboardpanel.setAttribute('aria-labelledby', dashboard.getAttribute('id'));
			dashboardpanel.setAttribute('id', 'tabpanel0');
			dashboardpanel.setAttribute('aria-hidden', 'false');
			dashboard.setAttribute('aria-controls', dashboardpanel.getAttribute('id'));
			var dashboardpanelheading = document.createElement('h2');
			dashboardpanelheading.setAttribute('class', 'visually-hidden');
			dashboardpanelheading.appendChild(document.createTextNode(dashboard.textContent));
			dashboardpanel.appendChild(dashboardpanelheading);
		
			// UI. Dashboard.
			dashboardpanel.classList.add('dashboard');

			var dashboardpanelp = document.createElement('p'); 
			dashboardpanelp.classList.add('dashboard-message');
			dashboardpanelp.appendChild(document.createTextNode(chrome.i18n.getMessage('msgDashboardResultPassed')));
			dashboardpanel.appendChild(dashboardpanelp);

			var dashboardpanelbuttonreload = document.createElement('button');
			dashboardpanelbuttonreload.setAttribute('type', 'button');
			dashboardpanelbuttonreload.classList.add('dashboard-reload-button');
			dashboardpanelbuttonreload.appendChild(document.createTextNode("Quitter et démarrer une nouvelle analyse"));
			dashboardpanelbuttonreload.addEventListener('click', () => {window.location.reload();});
			dashboardpanel.appendChild(dashboardpanelbuttonreload);
			
			main.children[1].appendChild(dashboardpanel);
			ul.appendChild(dashboard);

			/**
			 * ? keyboard navigation
			 */
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

			response = response.response[0];

			if(response.tests.length === 0) dashboardpanelp.replaceChild(document.createTextNode(chrome.i18n.getMessage('msgDashboardResultNone')), dashboardpanelp.firstChild);
			else {
				let t = 1;

				/**
				 * ? filters the displayed tests by the selected tab
				 */
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
								
								// IN PROGRESS
								var newcurrenttabpanelheadingtext = element.firstChild.firstChild.nodeValue;
								var currenttabpanelheading = newcurrenttabpanel.querySelector('h2');
								currenttabpanelheading.replaceChild(document.createTextNode(newcurrenttabpanelheadingtext), currenttabpanelheading.firstChild);

								// contrast panel description
								if(element.getAttribute('id') === 'contrast' && !document.querySelector('.contrast-panel-desc')) {
									var contrastPanelDesc = document.createElement('div');
									contrastPanelDesc.classList.add('contrast-panel-desc');

									var contrastDescription1 = document.createElement('p');
									contrastDescription1.textContent = chrome.i18n.getMessage('contrastDescription1');
									contrastPanelDesc.appendChild(contrastDescription1);

									var contrastDescription2 = document.createElement('p');
									contrastDescription2.textContent = chrome.i18n.getMessage('contrastDescription2');
									contrastPanelDesc.appendChild(contrastDescription2);

									var contrastLegend = document.createElement('p');
									contrastLegend.classList.add('contrast-legend');
									contrastLegend.textContent = chrome.i18n.getMessage('contrastLegend1');

									var contrastBgImage1 = document.createElement('span');
									contrastBgImage1.classList.add('contrast-bgImage');
									contrastLegend.appendChild(contrastBgImage1);

									var contrastBgImage2 = document.createElement('span');
									contrastBgImage2.setAttribute('id','contrast-bgImage');
									contrastBgImage2.textContent = chrome.i18n.getMessage('contrastLegend2');
									contrastLegend.appendChild(contrastBgImage2);

									var contrastBgNull1 = document.createElement('span');
									contrastBgNull1.classList.add('contrast-bgNull');
									contrastLegend.appendChild(contrastBgNull1);

									var contrastBgNull2 = document.createElement('span');
									contrastBgNull2.setAttribute('id','contrast-bgNull');
									contrastBgNull2.textContent = chrome.i18n.getMessage('contrastLegend3');
									contrastLegend.appendChild(contrastBgNull2);

									contrastPanelDesc.appendChild(contrastLegend);
									newcurrenttabpanel.insertBefore(contrastPanelDesc, currenttabpanelheading.nextSibling);
								} else {
									if(document.querySelector('.contrast-panel-desc')) {
										newcurrenttabpanel.removeChild(document.querySelector('.contrast-panel-desc'));
									}
								}

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

				/**
				 ** Manage action buttons in right column
				* showhide-action
				* highlight-action
				* inspect-action
				* about-action
				*/
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
								var cellParent = element.closest('.item-actions');
								var getxpathbutton = cellParent.querySelector('.item-actions-about button[data-xpath]');
								chrome.runtime.sendMessage({
									tabId: chrome.devtools.inspectedWindow.tabId,
									command: 'highlight',
									element: cssify(getxpathbutton.getAttribute('data-xpath'))
								});
								break;
							case 'inspect-action':
								var cellParent = element.closest('.item-actions');
								var getxpathbutton = cellParent.querySelector('.item-actions-about button[data-xpath]');
								var css = cssify(getxpathbutton.getAttribute('data-xpath'));
								chrome.devtools.inspectedWindow.eval("inspect(document.querySelector('" + css + "'))");
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
														input.value = '';
														element.focus();
														chrome.runtime.sendMessage({
															tabId: chrome.devtools.inspectedWindow.tabId,
															command: 'copyClipboard',
															what: element.parentNode.parentNode.previousSibling.previousSibling.textContent
														});
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
									tanagurupopin.textContent = '';
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

				/**
				 * ? Set DOM (alltests's tab & panel)
				 */
				var tab = document.createElement('li');
				tab.setAttribute('role', 'tab');
				tab.setAttribute('aria-selected', 'false');
				tab.setAttribute('id', 'alltests');
				tab.setAttribute('tabindex', '-1');

				var span = document.createElement('span');
				span.appendChild(document.createTextNode(chrome.i18n.getMessage('allTags')));
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

				/**
				 * ? set tags name & sort by status & alphabetical
				 */
				response.tags.forEach(tag => {
					tag.name = chrome.i18n.getMessage('tag' + tag.id.charAt(0).toUpperCase() + tag.id.slice(1));
				});
				response.tags = response.tags.sort((a,b) => {
					if(a.name < b.name) return -1;
					if(a.name > b.name) return 1;
					return 0;
				});
				response.tags = response.tags.sort((a,b) => {
					if (a.status === 'failed' && b.status !== 'failed') return -1;
					if (a.status !== 'failed' && b.status === 'failed') return 1;
					if (a.status === 'cantTell' && b.status === 'passed') return -1;
					if (a.status === 'passed' && b.status === 'cantTell') return 1;
					if (a.status === 'cantTell' && b.status === 'untested') return -1;
					if (a.status === 'untested' && b.status === 'cantTell') return 1;
					if (a.status === 'passed' && b.status === 'untested') return -1;
					if (a.status === 'untested' && b.status === 'passed') return 1;
					return 0;
				});

				/**
				 * ? create tests container by status
				 */
				// IN PROGRESS
				var statuses = ['failed', 'cantTell', 'passed', 'inapplicable', 'untested'];

				var statuseslist = document.createElement('ul');
				statuseslist.setAttribute('style', 'margin: 1em; padding: 0; list-style-type: none; font-size: 0.8em');
				statuseslist.hidden = true;

				var statusescontents = document.createDocumentFragment();
				for (var s = 0; s < statuses.length; s++) {
					var status = document.createElement('li');
					status.setAttribute('style', 'display: inline-block; border: solid 1px black; margin-right: 0.5em; padding: 0.5em 1em');

					status.appendChild(document.createTextNode(chrome.i18n.getMessage('earl' + statuses[s].charAt(0).toUpperCase() + statuses[s].slice(1))));
					statuseslist.appendChild(status);
					var statuscontent = document.createElement('div');
					statuscontent.setAttribute('id', 'earl' + statuses[s].charAt(0).toUpperCase() + statuses[s].slice(1));
					statusescontents.appendChild(statuscontent);
				}
				alltagspanel.appendChild(statuseslist);
				alltagspanel.appendChild(statusescontents);

				// IN PROGRESS
				var reftests = {};

				// IN PROGRESS
				// var ressourcestests = [];

				var updatedashboardp = false;
				var tagsWithResult = [];

				/**
				 * ? display tests results
				 */
				response.tests.forEach(test => {
					// UI. Dashboard.
					// manage message on dashboard panel
					if (updatedashboardp == false && test.type == 'failed') {
						dashboardpanelp.replaceChild(document.createTextNode(chrome.i18n.getMessage('msgDashboardResultFailed')), dashboardpanelp.firstChild);
						updatedashboardp = true;
					}
					
					test.tags.forEach(tag => {
						if(!tagsWithResult.includes(tag)) tagsWithResult.push(tag);
					});
					var testelement = document.createElement('div');
					testelement.setAttribute('class', 'testparent ' + test.tags.join(' '));

					// if (test.hasOwnProperty('ressources')) {
					// 	// var testressources = test.ressources;
					// 	for (var r = 0; r < test.ressources.length; r++) {
					// 		testelement.className += ' ' + r;
					// 	}
					// }

					// create test button
					var tabpanelsection = document.createElement('h3');
					tabpanelsection.setAttribute('class', test.type);
					var tabpanelsectionbutton = document.createElement('button');
					tabpanelsectionbutton.setAttribute('type', 'button');
					tabpanelsectionbutton.setAttribute('data-action', 'showhide-action');
					tabpanelsectionbutton.setAttribute('aria-expanded', 'false');
					
					// IN PROGRESS - test référence
					var testref = document.createElement('em');
					testref.style.paddingRight = '1em';
					testref.style.verticalAlign = 'bottom';
					testref.style.display = 'inline-block';
					testref.style.overflow = 'hidden';
					testref.style.textOverflow = 'ellipsis';
					testref.style.width = '80px';
					testref.style.textAlign = 'right';

					if (!reftests.hasOwnProperty(test.tags[0].toUpperCase())) {
						reftests[test.tags[0].toUpperCase()] = 0;
					}

					reftests[test.tags[0].toUpperCase()] += 1;
					var testid = test.tags[0].toUpperCase() + '-' + reftests[test.tags[0].toUpperCase()];

					if (test.hasOwnProperty('id')) {
						testref.setAttribute('data-autoid', testid);
						testid = test.id;
					}

					testref.setAttribute('title', testid);
					testref.appendChild(document.createTextNode(testid));
					tabpanelsectionbutton.appendChild(testref);

					// IN PROGRESS - test ressources
					// if (test.hasOwnProperty('ressources')) {
					// 	var ressourcesLength = Object.keys(test.ressources).length;

					// 	for (var r = 0; r < ressourcesLength; r++) {
					// 		if (ressourcestests.indexOf(test.ressources[r]) == -1) {
					// 			ressourcestests.push(test.ressources[r]);
					// 		}
					// 	}
					// }
					
					// display test status on the button
					var status = document.createElement('span');
					status.setAttribute('class', 'status');
					status.appendChild(document.createTextNode(chrome.i18n.getMessage('earl' + test.type.charAt(0).toUpperCase() + test.type.slice(1))));
					tabpanelsectionbutton.appendChild(status);

					// display the number of elements on test button
					let dataLength = test.data.length;
					if (!((test.type == 'failed' && dataLength == 0) || test.type == 'untested')) {
						var strong = document.createElement('strong');
						var strongcount = test.hasOwnProperty('failedincollection') ? test.failedincollection : dataLength;
						strong.appendChild(document.createTextNode(strongcount + (test.hasOwnProperty('counter') ? ' / ' +  test.counter : '')));
						tabpanelsectionbutton.appendChild(strong);
						tabpanelsectionbutton.appendChild(document.createTextNode(' '));
					}

					// display the test name on the button
					var span = document.createElement('span');
					span.textContent = test.name.charAt(0).toUpperCase() + test.name.slice(1);
					tabpanelsectionbutton.appendChild(span);
					tabpanelsection.appendChild(tabpanelsectionbutton);

					// create results container
					var tabpanelsectiondiv = document.createElement('div');
					tabpanelsectiondiv.setAttribute('id', 'testsection' + t);
					tabpanelsectionbutton.setAttribute('aria-controls', tabpanelsectiondiv.getAttribute('id'));
					tabpanelsectiondiv.setAttribute('hidden', 'hidden');
					testelement.appendChild(tabpanelsection);

					// test description
					if (test.description) {
						var tabpanelsectionp = document.createElement('p');
						tabpanelsectionp.textContent = test.description;
						tabpanelsectiondiv.appendChild(tabpanelsectionp);
					}

					// test explanation
					if (test.explanation) {
						var tabpanelsectionp = document.createElement('p');
						tabpanelsectionp.textContent = test.explanation;
						tabpanelsectiondiv.appendChild(tabpanelsectionp);
					}
					
					// add test tags before table
					var beforetable = document.createElement('div');
					beforetable.setAttribute('class', 'beforetable');
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

					if (test.tags.length == 1) {
						var tagid = 'tag' + test.tags[0].charAt(0).toUpperCase() + test.tags[0].slice(1);
						var tagbutton = document.createElement('button');
						tagbutton.setAttribute('type', 'button');
						tagbutton.setAttribute('data-tagid', test.tags[0]);
						tagbutton.setAttribute('title', chrome.i18n.getMessage('uiTagButton').replace(new RegExp('{tagName}'), chrome.i18n.getMessage(tagid)));
						tagbutton.appendChild(document.createTextNode(chrome.i18n.getMessage(tagid)));
						tabpanelsectionp.appendChild(tagbutton);
						tabpanelsectionp.appendChild(document.createTextNode('.'));
					}

					tagssection.appendChild(tabpanelsectionp);

					if (test.tags.length > 1) {
						var tagsul = document.createElement('ul');
						for (var i = 0; i < test.tags.length; i++) {
							var tagli = document.createElement('li');
							var tagid = 'tag' + test.tags[i].charAt(0).toUpperCase() + test.tags[i].slice(1);
							var tagbutton = document.createElement('button');
							tagbutton.setAttribute('type', 'button');
							tagbutton.setAttribute('data-tagid', test.tags[i]);
							tagbutton.setAttribute('title', chrome.i18n.getMessage('uiTagButton').replace(new RegExp('{tagName}'), chrome.i18n.getMessage(tagid)));
							tagbutton.appendChild(document.createTextNode(chrome.i18n.getMessage(tagid)));
							tagli.appendChild(tagbutton);
							tagsul.appendChild(tagli);
						}
						tagssection.appendChild(tagsul);
					}

					beforetable.appendChild(tagssection);
					tabpanelsectiondiv.appendChild(beforetable);
					
					// display results in table
					if (test.data.length > 0) {
						var countvisible = 0;
						var countinvisible = 0;
						var countkeyboardyes = 0;
						var countkeyboardno = 0;
						var countreaderyes = 0;
						var countreaderno = 0;

						// table
						var table = document.createElement('table');
						table.setAttribute('border', '');

						// table caption
						var caption = document.createElement('caption');
						caption.setAttribute('class', 'visually-hidden');
						caption.appendChild(document.createTextNode(tabpanelsection.textContent));
						table.appendChild(caption);

						// table headings
						if(!test.tags.includes('contrast')) {
							var tableheadings = [
								{ name: 'N°', abbr: 'Numéro' }, 
								{ name: 'Statut', export: 'required' }, 
								{ name: 'Item', export: 'required' }, 
								{ name: 'Atteignable au clavier ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAABGdBTUEAALGPC/xhBQAAAjBJREFUOBGt1M1LVUEYgPF7ND/KLG4qRVibIgJvoIsgcOGuEFdRRC10I5LQP6ArbRUu3dqudkG4cCEGlktNSElF6YPioqGVRmEp+XF6njoH5F69XawXfsw0vTPzzsy5JhL/IcIwrEAvgszlCjIH9vnvc8xLBkEQ7nP+3tOoOokBXN4t68Bug38bYzErdsFq1KGf6p/QZkXWnWVlZAyweDNDLRjCezxn8TTtvweLpzCEZL6r/b4iJlQw4Wgek26TM2JuHpt85WTLAYn1TOjGBxhuuhG127QqisaO0K7j544xv0RtRmO2xkl0u8EEnXtwURPncBHT8GRVGMclvIHvdgajMO8TlpGCeecRF9WZYIM0WrEJ49GfJhymXYj6D6N2klZGPGaOuUY817VcM+11+OP4iDsoxAtMYgwn4FGfYRaeyrBaP8uX8GoXMYynGMEWlhB6JUYxatCANnhN7TiEVXTADRsj9h3z/8pg7gxa4RoXcBChJ/C+fLxbqMQP+FDXYQElaIIL3IDhia+hFD74VTh2E4fxBd7Cto+cpmPVa7Diz1iH3/oKrPA4XuMUjHmcxRK+4xjMtWqLdC37fZ7A+zqNTpjsL9QNH6AWHtdTmht/gnHfE07BaltwH1dgUX6ZWyb6jXuXb+HO83iFBZTDa8gVzjPXOc59B6t3zSKvqIeOCw3CsEofPf5d+GXlCm/AE1qo72HRRiO+uYGPeBc+molGiPgPof1csTMv7nt1j9H1C4W7DIhH/jVRAAAAAElFTkSuQmCC' },
								{ name: 'Restitué ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABGdBTUEAALGPC/xhBQAAAlBJREFUOBGV00tIVUEcx/F7xAfaQ0vCUtQitCgQqoWohI9N0MNFYVKgEiRo9JAgIqhFunAjggs3UYvoIqK0cGFqFPlEoVwYoeIjDHqYgWiu6/r9HWbiei5XOgOfO/+Z+c+cO3PmOAEfJRQKHSW9BJWYRh+GHMfZoPZXWGw/gviJD+hGP75gAdW+VmTCIcyiF3nhk2nvwA2soil8LGpMooPXCNok4rN4hHqkq5+6ABu4bPMiagb3ItZMKCROQiZGoC2/go7hG86ZvNvEc0iMWNAkPGew0Q4Sx2MMnUg1OdrFLeicM6Cj+IoyO09bSIGS4lAKJdvtlRP/QNq/CSagTw+7Yx40QHw/hp8EaKt/cRc1XJF31Iu4CJUcJGOQ3AvqCCvzxFmmvUadHMNPHV6w0G/qFlyDyhsUu1Eg0EFdhDa0sHCS+qk1/xQ+qk05gO8aOIxlHEQePiMWVRh1U80P7WLo3PTiEtGOaeyG7rKO7ISe9MfMcahDnlh9erDOuYGwC63Q2Q4hH5fMLh8Qz2BKExrwkobiOoyb+DGx3nY2JjCD88jCEvQvE0zudeJ1nFRbC2kbelm7sAidsfpHUY8jeAi9KPUP46mJte0nWIH3BbrJexi4Bz3gNJSYqcm20K6EznQn9uE9BnHM5kStSQqi2ZtA3xXUQldRn28P3CPw5ka0SUyDviJ9KbpKWwp9WnwJKVsG/qfBpAp88ubS9xZ62/4LE/VPdfeu2tnEZ7CKXNvnu9aC+IU+6AwV39xuIfdyb5egMRY5TlWLeDzjsk9SRy2bAMhld532BdwAAAAASUVORK5CYII=' }, 
								{ name: 'Actions', export: 'no' }
							];
						} else {
							var tableheadings = [
								{ name: 'N°', abbr: 'Numéro' }, 
								{ name: 'Balise', export: 'required' }, 
								{ name: 'Passage de texte', export: 'required' }, 
								{ name: 'Taille', export: 'required' }, 
								{ name: 'Graisse', export: 'required' }, 
								{ name: 'CT', abbr: 'Couleur de texte' }, 
								{ name: 'CF', abbr: 'Couleur de fond' }, 
								{ name: 'Ratio estimé', export: 'required' }, 
								{ name: 'Atteignable au clavier ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAABGdBTUEAALGPC/xhBQAAAjBJREFUOBGt1M1LVUEYgPF7ND/KLG4qRVibIgJvoIsgcOGuEFdRRC10I5LQP6ArbRUu3dqudkG4cCEGlktNSElF6YPioqGVRmEp+XF6njoH5F69XawXfsw0vTPzzsy5JhL/IcIwrEAvgszlCjIH9vnvc8xLBkEQ7nP+3tOoOokBXN4t68Bug38bYzErdsFq1KGf6p/QZkXWnWVlZAyweDNDLRjCezxn8TTtvweLpzCEZL6r/b4iJlQw4Wgek26TM2JuHpt85WTLAYn1TOjGBxhuuhG127QqisaO0K7j544xv0RtRmO2xkl0u8EEnXtwURPncBHT8GRVGMclvIHvdgajMO8TlpGCeecRF9WZYIM0WrEJ49GfJhymXYj6D6N2klZGPGaOuUY817VcM+11+OP4iDsoxAtMYgwn4FGfYRaeyrBaP8uX8GoXMYynGMEWlhB6JUYxatCANnhN7TiEVXTADRsj9h3z/8pg7gxa4RoXcBChJ/C+fLxbqMQP+FDXYQElaIIL3IDhia+hFD74VTh2E4fxBd7Cto+cpmPVa7Diz1iH3/oKrPA4XuMUjHmcxRK+4xjMtWqLdC37fZ7A+zqNTpjsL9QNH6AWHtdTmht/gnHfE07BaltwH1dgUX6ZWyb6jXuXb+HO83iFBZTDa8gVzjPXOc59B6t3zSKvqIeOCw3CsEofPf5d+GXlCm/AE1qo72HRRiO+uYGPeBc+molGiPgPof1csTMv7nt1j9H1C4W7DIhH/jVRAAAAAElFTkSuQmCC' },
								{ name: 'Restitué ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABGdBTUEAALGPC/xhBQAAAlBJREFUOBGV00tIVUEcx/F7xAfaQ0vCUtQitCgQqoWohI9N0MNFYVKgEiRo9JAgIqhFunAjggs3UYvoIqK0cGFqFPlEoVwYoeIjDHqYgWiu6/r9HWbiei5XOgOfO/+Z+c+cO3PmOAEfJRQKHSW9BJWYRh+GHMfZoPZXWGw/gviJD+hGP75gAdW+VmTCIcyiF3nhk2nvwA2soil8LGpMooPXCNok4rN4hHqkq5+6ABu4bPMiagb3ItZMKCROQiZGoC2/go7hG86ZvNvEc0iMWNAkPGew0Q4Sx2MMnUg1OdrFLeicM6Cj+IoyO09bSIGS4lAKJdvtlRP/QNq/CSagTw+7Yx40QHw/hp8EaKt/cRc1XJF31Iu4CJUcJGOQ3AvqCCvzxFmmvUadHMNPHV6w0G/qFlyDyhsUu1Eg0EFdhDa0sHCS+qk1/xQ+qk05gO8aOIxlHEQePiMWVRh1U80P7WLo3PTiEtGOaeyG7rKO7ISe9MfMcahDnlh9erDOuYGwC63Q2Q4hH5fMLh8Qz2BKExrwkobiOoyb+DGx3nY2JjCD88jCEvQvE0zudeJ1nFRbC2kbelm7sAidsfpHUY8jeAi9KPUP46mJte0nWIH3BbrJexi4Bz3gNJSYqcm20K6EznQn9uE9BnHM5kStSQqi2ZtA3xXUQldRn28P3CPw5ka0SUyDviJ9KbpKWwp9WnwJKVsG/qfBpAp88ubS9xZ62/4LE/VPdfeu2tnEZ7CKXNvnu9aC+IU+6AwV39xuIfdyb5egMRY5TlWLeDzjsk9SRy2bAMhld532BdwAAAAASUVORK5CYII=' }, 
								{ name: 'Actions', export: 'no' }
							];
						}

						var tr = document.createElement('tr');
						tr.setAttribute('class', 'theadings');
						for (var k = 0; k < tableheadings.length; k++) {
							var th = document.createElement('th');
							th.setAttribute('scope', 'col');
							if (tableheadings[k].hasOwnProperty('abbr')) {
								th.setAttribute('abbr', tableheadings[k].abbr);
							}
							if (tableheadings[k].hasOwnProperty('export')) {
								th.classList.add(tableheadings[k].export + '-export');
							}
							if (tableheadings[k].hasOwnProperty('img')) {
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

						var codehighlight = test.mark ? test.mark : null;

						// table content
						for (var h = 0; h < test.data.length; h++) {
							let itemNumber = '1A' + (h + 1);
							let itemKeyboard = test.data[h].canBeReachedUsingKeyboardWith.join(' / ');
							let itemReader = test.data[h].isNotExposedDueTo;
							let itemXPath = test.data[h].xpath;

							if(test.tags.includes('contrast')) {
								var itemTag = test.data[h].tag;
								var itemText = test.data[h].text;
								var itemSize = test.data[h].size;
								var itemWeight = test.data[h].weight;
								var itemCT = test.data[h].foreground;
								var itemCF = test.data[h].background;
								var itemRatio = test.data[h].ratio + ':1';

								let template = document.querySelector('#item-row-contrast');
								var newRow = document.importNode(template.content, true);
								newRow.querySelector('.item-number').textContent = itemNumber;
								newRow.querySelector('.item-tag').textContent = itemTag;
								newRow.querySelector('.item-text').textContent = itemText;
								newRow.querySelector('.item-size').textContent = itemSize;
								newRow.querySelector('.item-weight').textContent = itemWeight;
								newRow.querySelector('.item-ct .item-ct-content').style.backgroundColor = itemCT;
								newRow.querySelector('.item-ct .visually-hidden').textContent = itemCT;
								newRow.querySelector('.item-ct').setAttribute('title', itemCT);
								newRow.querySelector('.item-cf').setAttribute('title', itemCF);
								if(itemCF && itemCF !== 'image') {
									newRow.querySelector('.item-cf .item-cf-content').style.backgroundColor = itemCF;
								} else if(itemCF === 'image') {
									newRow.querySelector('.item-cf .item-cf-content').setAttribute('aria-describedby', 'contrast-bgImage');
									newRow.querySelector('.item-cf .item-cf-content').classList.add('contrast-bgImage');
								} else {
									newRow.querySelector('.item-cf .item-cf-content').setAttribute('aria-describedby', 'contrast-bgNull');
									newRow.querySelector('.item-cf .item-cf-content').classList.add('contrast-bgNull');
									newRow.querySelector('.item-cf').setAttribute('title', 'non trouvé');
								}
								newRow.querySelector('.item-cf .visually-hidden').textContent = itemCF;
								newRow.querySelector('.item-ratio').textContent = itemRatio;

								
							} else {
								var itemStatus = test.data[h].status;
								var itemCode = test.data[h].outer;

								let template = document.querySelector('#item-row');
								var newRow = document.importNode(template.content, true);
								newRow.querySelector('.item-number').textContent = itemNumber;
								newRow.querySelector('.item-status').textContent = itemStatus;
								newRow.querySelector('.item-code code').textContent = itemCode;

								if (codehighlight && codehighlight.hasOwnProperty('attrs')) {
									var codeattrs = [];
									var code = newRow.querySelector('.item-code code');
		
									for (var a = 0; a < codehighlight.attrs.length; a++) {
										if(itemCode.match(codehighlight.attrs[a])) {
											let regex  = codehighlight.attrs[a] + '="(?:(?!").)*"';
											codeattrs.push(itemCode.match(new RegExp(regex)));
											itemCode = itemCode.replace(new RegExp(' (' + codehighlight.attrs[a] + '="(?:(?!").)*")'), ' &&// '); // / key="([^"]*)"/	
										}
									}
		
									if(codeattrs.length > 0) {
										var codecontent = itemCode.split(' &&// ');
		
										for(let i = 0; i < codecontent.length - 1; i++) {
											code.appendChild(document.createTextNode(codecontent[i]+' '));
											var mark = document.createElement('mark');
											mark.textContent = codeattrs[i];
											code.appendChild(mark);
										}
		
										code.appendChild(document.createTextNode(codecontent[codecontent.length - 1]));
									} else {
										code.appendChild(document.createTextNode(itemCode));
									}
									
								} else {
									newRow.querySelector('.item-code code').textContent = itemCode;
								}
							}

							if(itemKeyboard.length > 0) {
								countkeyboardyes += 1;
								newRow.querySelector('.item-keyboard .keyboardyes').setAttribute('title', 'Oui ('+ itemKeyboard + ')');
								newRow.querySelector('.item-keyboard .visually-hidden').textContent = 'Oui ('+ itemKeyboard + ')';
							} else {
								countkeyboardno += 1;
								newRow.querySelector('.item-keyboard .keyboardyes').setAttribute('title', 'Non');
								newRow.querySelector('.item-keyboard .keyboardyes').className = 'keyboardno';
								newRow.querySelector('.item-keyboard .visually-hidden').textContent = 'Non';
							}

							if(itemReader.length === 0) {
								countreaderyes += 1;
								newRow.querySelector('.item-reader .readeryes').setAttribute('title', 'oui');
								newRow.querySelector('.item-reader .visually-hidden').textContent = 'Oui';
							} else {
								countreaderno += 1;
								newRow.querySelector('.item-reader .readeryes').setAttribute('title', 'Non (' + itemReader + ')');
								newRow.querySelector('.item-reader .readeryes').className = 'readerno';
								newRow.querySelector('.item-reader .visually-hidden').textContent = 'Non (' + itemReader + ')';
							}

							if(test.data[h].isVisible) {
								countvisible += 1;

								newRow.querySelector('.item-actions .item-actions-highlight button').setAttribute('title', 'Mettre en évidence sur la page (' + test.name + ', item ' + (h + 1) + ')');
								newRow.querySelector('.item-actions .item-actions-highlight .visually-hidden').textContent = 'Mettre en évidence sur la page (' + test.name + ', item ' + (h + 1) + ')';
							} else {
								countinvisible += 1;

								newRow.querySelector('.item-actions .item-actions-highlight button').className = 'hidden';
								newRow.querySelector('.item-actions .item-actions-highlight button').disabled = true;
								newRow.querySelector('.item-actions .item-actions-highlight button').setAttribute('title', "Cet élément n'est pas visible à l'écran.");
								newRow.querySelector('.item-actions .item-actions-highlight .visually-hidden').textContent = "Cet élément n'est pas visible à l'écran.";
							}

							newRow.querySelector('.item-actions .item-actions-inspect button').setAttribute('title', 'Révéler dans l\'inspecteur (' + test.name + ', item ' + (h + 1) + ')');
							newRow.querySelector('.item-actions .item-actions-inspect .visually-hidden').textContent = 'Révéler dans l\'inspecteur (' + test.name + ', item ' + (h + 1) + ')';

							newRow.querySelector('.item-actions .item-actions-about button').setAttribute('title', 'A propos de cet élément (' + test.name + ', item ' + (h + 1) + ')');
							newRow.querySelector('.item-actions .item-actions-about button').setAttribute('data-xpath', itemXPath);
							newRow.querySelector('.item-actions .item-actions-about .visually-hidden').textContent = 'A propos de cet élément (' + test.name + ', item ' + (h + 1) + ')';
							
							table.appendChild(newRow);
						}

						tabpanelsectiondiv.appendChild(table);

						// filter results
						var tableactions = document.createElement('div');
						tableactions.setAttribute('class', 'tableactions');
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
								var table = this.closest('.beforetable').nextSibling;
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
							tableactions.appendChild(selectparent);
						}
						
						// export data
						var exportparent = document.createElement('p');
						exportparent.setAttribute('class', 'export');
						var exportbutton = document.createElement('button');
						exportbutton.style.color = '#d90b0b'; /* background-color: #d90b0b; background: linear-gradient(top, #ef362c, #d90b0b); */
						exportbutton.setAttribute('type', 'button');
						exportbutton.setAttribute('title', 'Exporter les données du test - ' + test.name.charAt(0).toUpperCase() + test.name.slice(1));
						exportbutton.setAttribute('aria-label', exportbutton.getAttribute('title'));
						exportbutton.appendChild(document.createTextNode('\u2b07')); // Exporter les données de ce test
						exportbutton.addEventListener('click', function(event) {
							
							this.setAttribute('data-popinopener', 'true');
							var id = 'tanaguru-popin';
							var tanagurupopin = document.getElementById(id);
							if (!tanagurupopin) {
								var tanagurupopin = document.createElement('div');
								tanagurupopin.setAttribute('id', id)
								tanagurupopin.setAttribute('hidden', 'hidden');
								tanagurupopin.addEventListener('click', function(event) {
									var element = event.target;
								}, false);
								document.body.appendChild(tanagurupopin);
							}
							var header = document.createElement('div');
							header.setAttribute('class', 'popin-header');
							var h1 = document.createElement('h1');
							h1.appendChild(document.createTextNode(this.getAttribute('aria-label')));
							var closebutton = document.createElement('button');
							closebutton.setAttribute('type', 'button');
							closebutton.appendChild(document.createTextNode('Retour au résultat du test'));
							closebutton.addEventListener('click', function(event) {
								var tanagurupopin = this.parentNode.parentNode.parentNode;
								tanagurupopin.setAttribute('hidden', 'hidden');
								tanagurupopin.textContent = '';
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
							var file = document.createElement('div');
							var fileh2 = document.createElement('h2');
							var filelabel = document.createElement('label');
							filelabel.setAttribute('for', 'export-filename');
							filelabel.appendChild(document.createTextNode("Nom du fichier d'export"));
							fileh2.appendChild(filelabel);
							file.appendChild(fileh2);
							var filep = document.createElement('p');
							filep.setAttribute('class', 'input');
							var fileinput = document.createElement('input');
							fileinput.setAttribute('type', 'text');
							fileinput.setAttribute('id', filelabel.getAttribute('for'));
							fileinput.setAttribute('value', 'tanaextension_export_' + this.closest('.testparent').querySelector('h3 em').firstChild.nodeValue + '.csv');
							filep.appendChild(fileinput);
							file.appendChild(filep);
							tanagurupopin.appendChild(file);
							
							var exportitems = document.createElement('div');
							exportitems.setAttribute('id', 'export-items');
							var toignorediv = document.createElement('div');
							var toignoreh2 = document.createElement('h2');
							var toignorelabel = document.createElement('label');
							toignorelabel.setAttribute('for', 'toignore');
							toignorelabel.appendChild(document.createTextNode('Données à ne pas exporter'));
							toignoreh2.appendChild(toignorelabel);
							toignorediv.appendChild(toignoreh2);
							var toignorep = document.createElement('p');
							var toignoreselect = document.createElement('select');
							toignoreselect.setAttribute('size', '8');
							toignoreselect.setAttribute('id', toignorelabel.getAttribute('for'));
							toignoreselect.setAttribute('multiple', 'multiple');
							toignoreselect.setAttribute('aria-describedby', 'toignore-desc');
							toignoreselect.addEventListener('change', function (event) {
								var gotoexportcount = 0;
								for (var i = 0; i < this.options.length; i++) {
									if (this.options[i].selected) {
										gotoexportcount += 1;
									}
								}
								var toexport = document.getElementById('toexport');
								for (var i = 0; i < toexport.options.length; i++) {
									toexport.options[i].selected = false;
								}
								document.getElementById('gotoexport').disabled = gotoexportcount > 0 ? false : true;
								document.getElementById('moveup').disabled = true;
								document.getElementById('movedown').disabled = true;
								document.getElementById('gotoignore').disabled = true;
							}, false);
							toignorep.appendChild(toignoreselect);
							var toignoredesc = document.createElement('small');
							toignoredesc.setAttribute('hidden', 'hidden');
							toignoredesc.setAttribute('id', toignoreselect.getAttribute('aria-describedby'));
							toignoredesc.appendChild(document.createTextNode('Pour exporter, sélectionnez une ou plusieurs données puis ci-après cette liste, activez le bouton "Inclure ces données dans l\'export".'));
							toignorep.appendChild(toignoredesc);
							toignorediv.appendChild(toignorep);
							exportitems.appendChild(toignorediv);
							var exportswitch = document.createElement('ul');
							var exportswitchbuttons = [
								{
									id: 'gotoexport', accessiblename: "Inclure ces données dans l'export", name: '\u27A1', exec: function(event) {
										var elements = [];
										var toignore = document.getElementById('toignore');
										for (var i = 0; i < toignore.options.length; i++) {
											if (toignore.options[i].selected) {
												elements.push(toignore.options[i]);
											}
										}
										var toexport = document.getElementById('toexport');
										for (var i = 0; i < elements.length; i++) {
											toexport.appendChild(elements[i].parentNode.removeChild(elements[i]));
										}
										document.getElementById('launchexport').disabled = false;
										document.getElementById('gotoignore').disabled = false;
										document.getElementById('moveup').disabled = elements.length == 1 && toexport.options.length > 1 ? false : true;
										document.getElementById('movedown').disabled = true;
										this.disabled = true;
										toexport.focus();
									}
								},
								{
									id: 'gotoignore', accessiblename: "Exclure ces données de l'export", name: '\u2B05', exec: function(event) {
										var elements = [];
										var toexport = document.getElementById('toexport');
										for (var i = 0; i < toexport.options.length; i++) {
											if (toexport.options[i].selected) {
												elements.push(toexport.options[i]);
											}
										}
										var toignore = document.getElementById('toignore');
										for (var i = 0; i < elements.length; i++) {
											toignore.appendChild(elements[i].parentNode.removeChild(elements[i]));
										}
										if (toexport.options.length == 0) {
											document.getElementById('launchexport').disabled = true;
										}
										document.getElementById('gotoexport').disabled = false;
										document.getElementById('moveup').disabled = true;
										document.getElementById('movedown').disabled = true;
										this.disabled = true;
										toignore.focus();
									}
								}
							];
							for (var i = 0; i < exportswitchbuttons.length; i++) {
								var exportswitchli = document.createElement('li');
								var exportswitchbutton = document.createElement('button');
								exportswitchbutton.setAttribute('id', exportswitchbuttons[i].id);
								exportswitchbutton.setAttribute('aria-label', exportswitchbuttons[i].accessiblename);
								exportswitchbutton.setAttribute('disabled', 'disabled');
								exportswitchbutton.addEventListener('click', exportswitchbuttons[i].exec, false);
								exportswitchbutton.appendChild(document.createTextNode(exportswitchbuttons[i].name));
								exportswitchli.appendChild(exportswitchbutton);
								exportswitch.appendChild(exportswitchli);
							}
							exportitems.appendChild(exportswitch);
							var toexportdiv = document.createElement('div');
							var toexporth2 = document.createElement('h2');
							var toexportlabel = document.createElement('label');
							toexportlabel.setAttribute('for', 'toexport');
							toexportlabel.appendChild(document.createTextNode('Données à exporter'));
							toexporth2.appendChild(toexportlabel);
							toexportdiv.appendChild(toexporth2);
							var toexportp = document.createElement('p');
							var toexportselect = document.createElement('select');
							toexportselect.setAttribute('size', '8');
							toexportselect.setAttribute('id', toexportlabel.getAttribute('for'));
							toexportselect.setAttribute('multiple', 'multiple');
							toexportselect.setAttribute('aria-describedby', 'toexport-desc');
							toexportselect.addEventListener('change', function (event) {
								var gotoignorecount = 0;
								for (var i = 0; i < this.options.length; i++) {
									if (this.options[i].selected) {
										gotoignorecount += 1;
									}
								}
								var toignore = document.getElementById('toignore');
								for (var i = 0; i < toignore.options.length; i++) {
									toignore.options[i].selected = false;
								}
								document.getElementById('gotoignore').disabled = gotoignorecount > 0 ? false : true;
								document.getElementById('moveup').disabled = gotoignorecount == 1 && this.selectedIndex > 0 ? false : true; // désactiver si pas de previous...
								document.getElementById('movedown').disabled = gotoignorecount == 1 && this.selectedIndex < (this.options.length - 1) ? false : true; // désactiver si pas de next...
								document.getElementById('gotoexport').disabled = true;
							}, false);
							var datatoexport = this.parentNode.parentNode.parentNode.parentNode.querySelectorAll('table tr th'); // tr + tr pour les données...
							for (var d = 0; d < datatoexport.length; d++) {
								if (!datatoexport[d].classList.contains('no-export')) {
									var toexportoption = document.createElement('option');
									toexportoption.setAttribute('value', 'td:nth-child(' + (d + 1) + ')');
									toexportoption.appendChild(document.createTextNode(datatoexport[d].hasAttribute('abbr') ? datatoexport[d].getAttribute('abbr') : (datatoexport[d].querySelector('img') ? datatoexport[d].querySelector('img').getAttribute('alt') : datatoexport[d].textContent)));
									toexportselect.appendChild(toexportoption);
								}
							}
							var cssexport = document.createElement('option');
							cssexport.appendChild(document.createTextNode('Sélecteur CSS | [data-xpath]'));
							//toexportselect.appendChild(cssexport);
							var xpathexport = document.createElement('option');
							xpathexport.appendChild(document.createTextNode('Chemin XPath | [data-xpath]'));
							//toexportselect.appendChild(xpathexport);
							toexportp.appendChild(toexportselect);
							var toexportdesc = document.createElement('small');
							toexportdesc.setAttribute('hidden', 'hidden');
							toexportdesc.setAttribute('id', toexportselect.getAttribute('aria-describedby'));
							toexportdesc.appendChild(document.createTextNode('Pour ne pas exporter, sélectionnez une ou plusieurs données puis ci-avant cette liste, activez le bouton "Exclure ces données de l\'export". Pour réorganiser, l\'ordre des données à exporter, sélectionnez une donnée et ci-après cette liste, activez l\'un des boutons "Déplacer la donnée à exporter sélectionnée vers le haut" ou "Déplacer la donnée à exporter sélectionnée vers le bas".'));
							toexportp.appendChild(toexportdesc);
							toexportdiv.appendChild(toexportp);
							exportitems.appendChild(toexportdiv);
							var exportorder = document.createElement('ul');
							var exportorderbuttons = [
								{
									id: 'moveup', accessiblename: "Déplacer la donnée à exporter sélectionnée vers le haut", name: '\u2B06', exec: function(event) {
										var toexport = document.getElementById('toexport');
										var insertbefore = toexport.selectedIndex - 1;
										toexport.insertBefore(toexport.options[toexport.selectedIndex], toexport.options[insertbefore]);
										if (insertbefore == 0) {
											this.disabled = true;
										}
										document.getElementById('movedown').disabled = false;
									}
								},
								{
									id: 'movedown', accessiblename: "Déplacer la donnée à exporter sélectionnée vers le bas", name: '\u2B07', exec: function(event) {
										var toexport = document.getElementById('toexport');
										var insertafter = toexport.selectedIndex + 1;
										toexport.insertBefore(toexport.options[insertafter], toexport.options[toexport.selectedIndex]);
										if (insertafter == (toexport.options.length - 1)) {
											this.disabled = true;
										}
										document.getElementById('moveup').disabled = false;
									}
								}
							];
							for (var i = 0; i < exportorderbuttons.length; i++) {
								var exportorderli = document.createElement('li');
								var exportorderbutton = document.createElement('button');
								exportorderbutton.setAttribute('id', exportorderbuttons[i].id);
								exportorderbutton.setAttribute('aria-label', exportorderbuttons[i].accessiblename);
								exportorderbutton.setAttribute('disabled', 'disabled');
								exportorderbutton.addEventListener('click', exportorderbuttons[i].exec, false);
								exportorderbutton.appendChild(document.createTextNode(exportorderbuttons[i].name));
								exportorderli.appendChild(exportorderbutton);
								exportorder.appendChild(exportorderli);
							}
							exportitems.appendChild(exportorder);
							tanagurupopin.appendChild(exportitems);
							
							var exportbuttonparent = document.createElement('div');
							var ebpp = document.createElement('p');
							var exportbutton = document.createElement('button'); exportbutton.style.fontSize = '0.8em';
							exportbutton.setAttribute('id', 'launchexport');
							exportbutton.addEventListener('click', function(event) {
								var data = document.querySelector('[data-popinopener="true"]').parentNode.parentNode.parentNode.parentNode.querySelectorAll('table tr + tr');
								var datatext = [];
								var toexport = document.getElementById('toexport');
								var datatextitem = [];
								for (var i = 0; i < toexport.options.length; i++) {
									if (toexport.options[i].hasAttribute('value')) {
										datatextitem.push('"' + toexport.options[i].textContent + '"');
									}
								}
								datatext.push(datatextitem.join(';'));
								for (var i = 0; i < data.length; i++) {
									var datatextitem = [];
									for (var j = 0; j < toexport.options.length; j++) {
										if (toexport.options[j].hasAttribute('value')) {
											var texttoexport = data[i].querySelector(toexport.options[j].value);
											var texttoexportimg = texttoexport.querySelector('img');
											texttoexport = texttoexportimg ? texttoexportimg.getAttribute('alt') : texttoexport.textContent;
											datatextitem.push('"' + texttoexport.replace(/"/g, '""') + '"');
										}
									}
									datatext.push(datatextitem.join(';'));
								}
								var csvFile = new Blob([datatext.join('\n')], { type: 'text/csv' });
								chrome.runtime.sendMessage({
									tabId: chrome.devtools.inspectedWindow.tabId,
									command: 'downloadTestCsvFile',
									data: { url: window.URL.createObjectURL(csvFile), filename: document.getElementById('export-filename').value }
								});
							}, false);
							exportbutton.appendChild(document.createTextNode("Exporter les données au format CSV"));
							ebpp.appendChild(exportbutton);
							exportbuttonparent.appendChild(ebpp);
							tanagurupopin.appendChild(exportbuttonparent);
							document.querySelector('main').classList.add('tanaguru-popin-show');
							tanagurupopin.removeAttribute('hidden');
							closebutton.focus();
						}, false);
						exportparent.appendChild(exportbutton);
						tableactions.appendChild(exportparent);

						beforetable.appendChild(tableactions);
					}

					testelement.appendChild(tabpanelsectiondiv);

					// IN PROGRESS
					alltagspanel.querySelector('#earl' + test.type.charAt(0).toUpperCase() + test.type.slice(1)).appendChild(testelement);
					//alltagspanel.appendChild(testelement);
					
					t++;
				});

				main.children[1].appendChild(alltagspanel);

				/**
				 * ? generate tab in left column
				 * * tags & ressources
				 */
				response.tags.forEach(tag => {
					if(!tagsWithResult.includes(tag.id)) return;
					var tab = document.createElement('li');
					tab.setAttribute('role', 'tab');
					tab.setAttribute('aria-selected', 'false');
					tab.setAttribute('id', tag.id);
					tab.setAttribute('tabindex', '-1');
					tab.setAttribute('aria-controls', alltagspanel.getAttribute('id'));
					var span = document.createElement('span');
					span.appendChild(document.createTextNode(tag.name));
					tab.appendChild(span);
					if (tag.nbfailures > 0) {
						tab.appendChild(document.createTextNode(' '));
						var strong = document.createElement('strong');
						strong.appendChild(document.createTextNode(tag.nbfailures));
						tab.appendChild(strong);
					}

					ul.appendChild(tab);
				});

				// ressourcestests.sort();
				// console.log(ressourcestests);
				// for (var r = 0; r < ressourcestests.length; r++) {
				// 	var tab = document.createElement('li');
				// 	tab.setAttribute('class', 'ressource');
				// 	tab.setAttribute('role', 'tab');
				// 	tab.setAttribute('id', ressourcestests[r]);
				// 	tab.setAttribute('aria-selected', 'false');
				// 	tab.setAttribute('aria-controls', alltagspanel.getAttribute('id'));
				// 	tab.setAttribute('tabindex', '0');
				// 	var span = document.createElement('span');
				// 	span.appendChild(document.createTextNode(ressourcestests[r].toUpperCase())); // A prévoir listing des ressources...
				// 	tab.appendChild(span);
				// 	ul.appendChild(tab);
				// }
			}
			nav.appendChild(ul);
			main.children[0].appendChild(nav);
			main.children[1].querySelector('p').remove(); // Supprime le loading...
			dashboard.focus();
		}
	);
	
}, false);


