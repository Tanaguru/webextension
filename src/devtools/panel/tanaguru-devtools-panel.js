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

function translateRGBToHex(rgb) {
	rgb = rgb.match(/\d+/g);
	if(rgb.length !== 3) console.error("Wrong RGB format in function parameter. (format: rgb(255, 255, 255))");
	else return ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
}

/**
 * ? highlight item selected attributes
 * ? item code formatting
 * @param {string} itemCode OuterHTML's element
 * @param {HTMLElement} codeContainer <code> to contain formatted code
 * @param {?Array} [codehighlight] Array of attributes to highlight
 */
function formattingCode(itemCode, codeContainer, codehighlight = null, relatedCode = null) {
	var itemCodeCapture = [];
	var regitemCode = new RegExp(/(?<open><[^\s\/]+\s*(?:[^\s"=]+="[^"]*"\s*)*>)|(?<close><\/[^\s>]+>)|(?<text>.)/g);

	let execAr;
	while((execAr = regitemCode.exec(itemCode)) !== null) {
		itemCodeCapture.push(execAr.groups);
	}

	for(let x = 0; x < itemCodeCapture.length; x++) {
		if(itemCodeCapture[x].text) {
			if(itemCodeCapture[x - 1] && itemCodeCapture[x - 1].text) {
				itemCodeCapture[x - 1].text += itemCodeCapture[x].text;
				itemCodeCapture.splice(x, 1);
				x = x - 1;
			}
		}
	}

	itemCodeCapture.forEach(icc => {
		if(icc.open) {
			let lineContainer = document.createElement('span');
			lineContainer.classList.add("code-open");

			lineContainer.appendChild(document.createTextNode("<"));

			let openSpan;
			if (codehighlight && codehighlight.hasOwnProperty('tag') && codehighlight.tag) {
				openSpan = document.createElement('mark');
			} else openSpan = document.createElement('span');
			
			openSpan.classList.add('code-tag');
			openSpan.appendChild(document.createTextNode(icc.open.match(/[^<\/\s>]+/)));
			lineContainer.appendChild(openSpan);

			let itemAtt = icc.open.match(/[^="<>\s]+="[^"]*"/g);
			if(itemAtt) {
				itemAtt.forEach(att => {
					let attName = att.match(/[^="<>\s]+/);
					let attValue= att.match(/(?<=")[^"]*(?=")/)[0];
					let hasHighlightAttrs = codehighlight && codehighlight.hasOwnProperty('attrs') && codehighlight.attrs.length > 0;
					let attObject = hasHighlightAttrs ? codehighlight.attrs.filter(hlAtt => hlAtt.name === attName[0]) : null;
					attObject = attObject && attObject.length > 0 ? attObject[0] : null;
					let isHL = false;

					if(attObject) {
						if(attObject.valueState === "any") isHL = true;
						else if(attObject.valueState === "notEmpty") isHL = attValue.length > 0;
						else if(attObject.valueState === "egal") isHL = attValue === attObject.value;
						else if(attObject.valueState === "contains") isHL = attValue.includes(attObject.value);
						else if(attObject.valueState === "startBy") isHL = attValue.startsWith(attObject.value);
						else if(attObject.valueState === "endBy") isHL = attValue.endsWith(attObject.value);
					}

					if(isHL) {
						let hlMark = document.createElement('mark');
						hlMark.appendChild(document.createTextNode(' '+att));
						lineContainer.appendChild(hlMark);
					} else {
						let attNameSpan = document.createElement('span');
						attNameSpan.classList.add('code-attName');
						attNameSpan.appendChild(document.createTextNode(' '+attName[0]));
						lineContainer.appendChild(attNameSpan);

						lineContainer.appendChild(document.createTextNode("="));

						let attValueSpan = document.createElement('span');
						attValueSpan.classList.add('code-attValue');
						attValueSpan.appendChild(document.createTextNode(att.match(/"[^"]*"/)[0]));
						lineContainer.appendChild(attValueSpan);
					}
				});
			}
			
			lineContainer.appendChild(document.createTextNode(">"));
			codeContainer.appendChild(lineContainer);
		} else if(icc.close) {
			let lineContainer = document.createElement('span');
			lineContainer.classList.add("code-close");
			lineContainer.appendChild(document.createTextNode("</"));

			let closeSpan;
			if (codehighlight && codehighlight.hasOwnProperty('tag') && codehighlight.tag) {
				closeSpan = document.createElement('mark');
			} else closeSpan = document.createElement('span');

			closeSpan.classList.add('code-tag');
			closeSpan.appendChild(document.createTextNode(icc.close.match(/[^<\/>]+/)));
			lineContainer.appendChild(closeSpan);

			lineContainer.appendChild(document.createTextNode(">"));
			codeContainer.appendChild(lineContainer);
		} else {
			let lineContainer;
			if (codehighlight && codehighlight.hasOwnProperty('content') && codehighlight.content) {
				lineContainer = document.createElement('mark');
			} else lineContainer = document.createElement('span');

			lineContainer.classList.add("code-textContent");
			lineContainer.appendChild(document.createTextNode(icc.text));
			codeContainer.appendChild(lineContainer);
		}
	});

	if(relatedCode && codehighlight.hasOwnProperty('related') && codehighlight.related.hasOwnProperty('title')) {
		let commentElement = document.createElement('span');
		let comment = "<!-- "+codehighlight.related.title+" -->";
		commentElement.classList.add('code-comment');

		commentElement.appendChild(document.createTextNode(comment));
		codeContainer.appendChild(commentElement);

		formattingCode(relatedCode, codeContainer, codehighlight.related);
	}
}

//? use in ../tanaguru-devtools.js
var obsMessage;

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
} else {
	var wcagFilterTemplate = document.getElementById('wcagFilter').content;
	filterBloc.appendChild(wcagFilterTemplate);
}

var statusFilterTemplate = document.getElementById('statusFilter').content;
filterBloc.appendChild(statusFilterTemplate);
rightcolumn.appendChild(filterBloc);

function toggleDisclosure(e) {
	let disclosureControl = e.target.closest('button');

	if(disclosureControl.getAttribute("aria-expanded") === "false") {
		disclosureControl.setAttribute("aria-expanded", "true");
		disclosureControl.classList.add("dropdownButton--active");
		let container = document.getElementById(disclosureControl.getAttribute("aria-controls"));
		container.style.display = "block";
	} else {
		disclosureControl.setAttribute("aria-expanded", "false");
		disclosureControl.classList.remove("dropdownButton--active");
		let container = document.getElementById(disclosureControl.getAttribute("aria-controls"));
		container.style.display = "none";
	}
}

filterBloc.querySelectorAll("fieldset legend button").forEach(b => {
	b.addEventListener('click', toggleDisclosure);
});

var listenDomModif = false;
var listenDOMBloc = document.createElement('label');
listenDOMBloc.setAttribute('for', 'listenDOM');
listenDOMBloc.className = "dashboard-switch";
var listenDOMLabel = document.createElement('span');
listenDOMLabel.classList.add('listenDOM-label');
listenDOMLabel.classList.add('switch-label');
listenDOMLabel.textContent = chrome.i18n.getMessage('dashboardListenDOMlegend');

var listenDOMSwitch = document.createElement('span');
listenDOMSwitch.classList.add('switch');
var listenDOMinput = document.createElement('input');
listenDOMinput.setAttribute('type', 'checkbox');
listenDOMinput.id = "listenDOM";

var listenDOMSlider = document.createElement('span');
listenDOMSlider.classList.add('slider');
listenDOMSlider.textContent = chrome.i18n.getMessage('word_no');

listenDOMinput.addEventListener('change', function(e) {	
	if(e.target.checked) {
		listenDOMSlider.textContent = chrome.i18n.getMessage('word_yes');
		listenDomModif = true;
	}
	else {
		listenDOMSlider.textContent = chrome.i18n.getMessage('word_no');
		listenDomModif = false;
	}
});

listenDOMSwitch.appendChild(listenDOMinput);
listenDOMSwitch.appendChild(listenDOMSlider);
listenDOMBloc.appendChild(listenDOMSwitch);
listenDOMBloc.appendChild(listenDOMLabel);

filterBloc.appendChild(listenDOMBloc);


// right/bouton "analyser cette page"
var button = document.createElement('button');
button.setAttribute('type', 'button');
button.classList.add("launchAnalysisButton");
button.appendChild(document.createTextNode(chrome.i18n.getMessage('homeLaunchAnalyze')));
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

datafilters.forEach(el => {
	el.addEventListener('click', switchAll);
	if(el.name === "catFilter") el.checked = "true";
});
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
	rightcolumn.querySelector('p').remove();
	listenDOMBloc.remove();

	/**
	 * ? Get filters choices
	 */
	var filters = {
		categories: [],
		statuses: []
	}

	var tagsCat = [];

	document.querySelectorAll('[data-filter="catFilter"] input[name]').forEach(e => {
		tagsCat.push(e.id);
	});

	document.querySelectorAll('[data-filter] input:checked').forEach(e => {
		if(!e.id.match(/all/i)) {
			if(e.name === 'catFilter') filters.categories.push(e.id)
			else filters.statuses.push(e.id)
		}
	});

	function sortCatByProcessTime() {
		var catOrder = ["navigation", "presentation", "media", "consultation", "scripts", "structure", "frames", "tables", "forms", "mandatory", "links", "images", "colors", "accessiblename", "aria", "audio", "buttons", "code", "languages", "meta", "keyboard", "contrast", "svg", "table", "pageTitle", "headings", "videos"];
		catOrder = catOrder.filter((e) => {return filters.categories.includes(e)})
		filters.categories = catOrder;
	}
	sortCatByProcessTime();
	filterBloc.remove();
	homeTitle.remove();

	/**
	 * ? Display panel
	 */
	var main = document.querySelector('main');
	main.removeAttribute('class');
	var nav = document.createElement('div');
	nav.setAttribute('class', 'panelNavigation');
	var navheading = document.createElement('h1');
	navheading.appendChild(document.createTextNode(chrome.i18n.getMessage('msgNavHeading')));
	nav.appendChild(navheading);
 
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
	var dashboardtemplate = document.querySelector('#dashboard');
	var dashboardpanelContent = document.importNode(dashboardtemplate.content, true);
	dashboardpanel.appendChild(dashboardpanelContent);
	dashboardpanel.querySelector('h2').textContent = chrome.i18n.getMessage('msgDashboard');
	var dashboardpanelp = dashboardpanel.querySelector('.dashboard-message');
	dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultLoad');

	// UI. Dashboard.
	dashboardpanel.classList.add('dashboard');
	var loadingtemplate = document.getElementById('loading').content;
	main.children[1].appendChild(dashboardpanel);
	ul.appendChild(dashboard);
	dashboard.focus();

	 /**
	 * ? keyboard navigation
	 */
	ul.addEventListener('keydown', tabsNavigation, false);

	function tabsNavigation(event) {
		var orientation = this.getAttribute('aria-orientation');
		if (orientation && ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft'].indexOf(event.key) > -1) {
			var currenttab = this.querySelector('[role="tab"][aria-selected="true"]');
			
			if ((orientation === 'vertical' && event.key == 'ArrowUp') || (orientation === 'horizontal' && event.key == 'ArrowLeft')) {
				let previousEl = currenttab.previousSibling;
				var newcurrenttab = (previousEl && previousEl.hasAttribute('hidden')) ? previousEl.previousSibling : previousEl;
				if (!newcurrenttab) {
					newcurrenttab = this.querySelectorAll('[role="tab"]');
					newcurrenttab = newcurrenttab[newcurrenttab.length - 1];
				}
			}
			else if ((orientation === 'vertical' && event.key == 'ArrowDown') || (orientation === 'horizontal' && event.key == 'ArrowRight')) {
				let nextEl = currenttab.nextSibling;
				var newcurrenttab = (nextEl && nextEl.hasAttribute('hidden')) ? nextEl.nextSibling : nextEl;
				newcurrenttab = newcurrenttab ? newcurrenttab : this.querySelector('[role="tab"]');
			}
			var e = new Event('click', { 'bubbles': true, 'cancelable': false });
			newcurrenttab.dispatchEvent(e);
			newcurrenttab.focus();
		}
	}
	
	/**
	 ** Manage action buttons in right column
	 * showhide-action
	 * highlight-action
	 * inspect-action
	 * about-action
	 */
	 main.children[1].addEventListener('click', manageActions, false);
	
	function manageActions(event) {
		var element = event.target.closest('button');
		if (element) {
			switch (element.getAttribute('data-action')) {
				case 'showhide-action':
					if (element.getAttribute('aria-expanded') == 'false') {
						document.getElementById(element.getAttribute('aria-controls')).removeAttribute('hidden');
						element.setAttribute('aria-expanded', 'true');
						if(element.classList.contains('dropdownButton')) {
							element.classList.add('dropdownButton--active');
						}
					}
					else {
						document.getElementById(element.getAttribute('aria-controls')).setAttribute('hidden', 'hidden');
						element.setAttribute('aria-expanded', 'false');
						element.classList.remove('dropdownButton--active');
					}
					break;
				case 'highlight-action':
					var cellParent = element.closest('.item-actions');
					var getxpathbutton = cellParent.querySelector('.item-actions-about button[data-xpath]');
					chrome.runtime.sendMessage({
						tabId: chrome.devtools.inspectedWindow.tabId,
						command: 'highlight',
						element: cssify(getxpathbutton.getAttribute('data-xpath'))
					}, (response) => {
						if(response.response[0] === "off") {
							element.classList.remove('highlightON');
							element.setAttribute('aria-selected', "true");
						} else {
							let previousHighlight = main.children[1].querySelector('.highlightON');
							if(previousHighlight) {
								previousHighlight.classList.remove('highlightON');
								previousHighlight.removeAttribute('aria-selected');
							}
							element.classList.add('highlightON');
						}
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
					h1.appendChild(document.createTextNode(chrome.i18n.getMessage('panelAboutElement')));
					var closebutton = document.createElement('button');
					closebutton.setAttribute('type', 'button');
					closebutton.appendChild(document.createTextNode(chrome.i18n.getMessage('optionBackresults')));
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
					h2.appendChild(document.createTextNode(' '+chrome.i18n.getMessage('word_selector')+' CSS'));
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
					label.appendChild(document.createTextNode(chrome.i18n.getMessage('optionSavePseudoClasses')));
					keepcsssimplep.appendChild(label);
					cssactions.appendChild(keepcsssimplep);
					var copyp = document.createElement('p');
					var copybutton = document.createElement('button');
					copybutton.setAttribute('data-action', 'copy-action');
					copybutton.setAttribute('type', 'button');
					copybutton.setAttribute('aria-label', chrome.i18n.getMessage('optionCopyCssSelector'));
					copybutton.appendChild(document.createTextNode(chrome.i18n.getMessage('optionCopyBtn')));
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
					h2.appendChild(document.createTextNode(' '+chrome.i18n.getMessage('optionLocalisation')+' (XPath)'));
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
					label.appendChild(document.createTextNode(chrome.i18n.getMessage('optionAttLocalisation')));
					keepxpathsimplep.appendChild(label);
					xpathactions.appendChild(keepxpathsimplep);
					var copyp = document.createElement('p');
					var copybutton = document.createElement('button');
					copybutton.setAttribute('data-action', 'copy-action');
					copybutton.setAttribute('type', 'button');
					copybutton.setAttribute('aria-label', chrome.i18n.getMessage('optionCopyLocalisation'));
					copybutton.appendChild(document.createTextNode(chrome.i18n.getMessage('optionCopyBtn')));
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
	}

	/**
	 * Add tabs and right panel
	 * launch tests requests
	 */
	function displayResults() {
		/**
		 * ? Set DOM (alltests's tab & panel)
		 */
		var allFailures = 0;
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

		/**
		 * ? add panel title
		 */
		var alltagspanelheading = document.createElement('h2');
		alltagspanelheading.appendChild(document.createTextNode(tab.textContent));
		alltagspanel.appendChild(alltagspanelheading);

		/**
		 * ? add panel legend
		 */
		var legendBlock = document.createElement('div');
		legendBlock.classList.add('results-legend');

		var legend_p = document.createElement('p');
		legend_p.appendChild(document.createTextNode(chrome.i18n.getMessage('resultsLegend')));

		var iconWarning = document.createElement('span');
		iconWarning.classList.add('warning-icon');
		iconWarning.textContent = "!";

		var labelWarning = document.createElement('span');
		labelWarning.textContent = chrome.i18n.getMessage('warningLabel');

		legend_p.appendChild(iconWarning);
		legend_p.appendChild(labelWarning);
		legendBlock.appendChild(legend_p);
		alltagspanel.appendChild(legendBlock);

		/**
		 * ? create tests container by status
		 */
		var statuses = ['failed', 'cantTell', 'passed', 'inapplicable', 'untested'];

		var statuseslist = document.createElement('ul');
		statuseslist.setAttribute('style', 'margin: 1em; padding: 0; list-style-type: none; font-size: 0.8em');
		statuseslist.hidden = true;

		var statusescontents = document.createElement('div');
		statusescontents.id = 'earlAll';
		statusescontents.style.display = 'none';
		for (var s = 0; s < statuses.length; s++) {
			var status = document.createElement('li');
			status.setAttribute('style', 'display: inline-block; border: solid 1px black; margin-right: 0.5em; padding: 0.5em 1em');

			status.appendChild(document.createTextNode(chrome.i18n.getMessage('earl' + statuses[s].charAt(0).toUpperCase() + statuses[s].slice(1))));
			statuseslist.appendChild(status);
			var statuscontent = document.createElement('div');
			statuscontent.setAttribute('id', 'earl' + statuses[s].charAt(0).toUpperCase() + statuses[s].slice(1));
			statusescontents.appendChild(statuscontent);
			var ulSeparator = document.createElement('li');
			ulSeparator.setAttribute('hidden', 'hidden');
			ulSeparator.style.display = 'none';
			ulSeparator.id = statuses[s]+'cat-separator';
			ul.appendChild(ulSeparator);
		}
		alltagspanel.appendChild(statuseslist);
		alltagspanel.appendChild(statusescontents);

		/**
		 * ? generate tab in left column
		 * * tags & ressources
		 */
		filters.categories.forEach(tag => {
			var tab = document.createElement('li');
			tab.setAttribute('role', 'tab');
			tab.setAttribute('aria-selected', 'false');
			tab.setAttribute('id', tag);
			tab.setAttribute('tabindex', '-1');
			tab.setAttribute('aria-controls', alltagspanel.getAttribute('id'));
			var span = document.createElement('span');
			span.appendChild(document.createTextNode(chrome.i18n.getMessage('tag' + tag.charAt(0).toUpperCase() + tag.slice(1))));
			tab.appendChild(span);

			tab.classList.add('cat-loading');
			tab.appendChild(document.createTextNode(' '));
			var loadingIcon = document.getElementById('loading');
			loadingIcon = loadingIcon.content;
			tab.appendChild(document.importNode(loadingtemplate, true));

			ul.appendChild(tab);
		});

		/**
		 * ? filters the displayed tests by the selected tab
		 */
		function filterDisplayedTests(element) {
			if (element.getAttribute('role') == 'tab') {
				var currenttab = ul.querySelector('[role="tab"][aria-selected="true"]');
				if (element != currenttab) {
					currenttab.setAttribute('aria-selected', 'false');
					currenttab.setAttribute('tabindex', '-1');
					document.getElementById(currenttab.getAttribute('aria-controls')).setAttribute('aria-hidden', 'true');
					element.setAttribute('aria-selected', 'true');
					element.setAttribute('tabindex', '0');
				}
				var newcurrenttabpanel = document.getElementById(element.getAttribute('aria-controls'));
				if (newcurrenttabpanel.getAttribute('id') == 'tests') {
					newcurrenttabpanel.setAttribute('aria-labelledby', element.getAttribute('id'));
					
					// IN PROGRESS
					var newcurrenttabpanelheadingtext = element.firstChild.firstChild.nodeValue;
					var currenttabpanelheading = newcurrenttabpanel.querySelector('h2');
					currenttabpanelheading.replaceChild(document.createTextNode(newcurrenttabpanelheadingtext), currenttabpanelheading.firstChild);

					var panelCategory = element.getAttribute('id');

					// contrast panel description
					if(panelCategory === 'colors' || panelCategory === 'alltests') {
						if(panelCategory === 'alltests' && document.querySelector('.contrast-panel-desc')) {
							newcurrenttabpanel.removeChild(document.querySelector('.contrast-panel-desc'));
						} else if(panelCategory === 'colors' && document.querySelector('.alltests-panel-desc')) {
							newcurrenttabpanel.removeChild(document.querySelector('.alltests-panel-desc'));
						}

						if(!document.querySelector('.contrast-panel-desc') && !document.querySelector('.alltests-panel-desc')) {
							document.querySelector('.results-legend').setAttribute("hidden", "hidden");

							if(panelCategory === 'colors') {
								var panelDesc = document.createElement('div');
								panelDesc.classList.add('contrast-panel-desc');

								var contrastDescription1 = document.createElement('p');
								contrastDescription1.textContent = chrome.i18n.getMessage('contrastDescription1');
								panelDesc.appendChild(contrastDescription1);
		
								var contrastDescription2 = document.createElement('p');
								contrastDescription2.textContent = chrome.i18n.getMessage('contrastDescription2');
								panelDesc.appendChild(contrastDescription2);
							} else {
								var panelDesc = document.createElement('div');
								panelDesc.classList.add('alltests-panel-desc');
							}
	
							var contrastLegend = document.createElement('p');
							contrastLegend.classList.add('contrast-legend');
							contrastLegend.textContent = chrome.i18n.getMessage('resultsLegend');
	
							var contrastBgImage1 = document.createElement('span');
							contrastBgImage1.classList.add('contrast-bgImage');
							contrastLegend.appendChild(contrastBgImage1);
	
							var contrastBgImage2 = document.createElement('span');
							contrastBgImage2.setAttribute('id','contrast-bgImage');
							contrastBgImage2.textContent = chrome.i18n.getMessage('contrastLegend1');
							contrastLegend.appendChild(contrastBgImage2);
	
							var contrastBgNull1 = document.createElement('span');
							contrastBgNull1.classList.add('contrast-bgNull');
							contrastBgNull1.classList.add('item-cf-icon');
							contrastBgNull1.setAttribute("aria-hidden", "true");
							contrastBgNull1.textContent = "x";
							contrastLegend.appendChild(contrastBgNull1);
	
							var contrastBgNull2 = document.createElement('span');
							contrastBgNull2.setAttribute('id','contrast-bgNull');
							contrastBgNull2.textContent = chrome.i18n.getMessage('contrastLegend2');
							contrastLegend.appendChild(contrastBgNull2);
	
							let iconWarning = document.createElement('span');
							iconWarning.classList.add('warning-icon');
							iconWarning.textContent = "!";
							contrastLegend.appendChild(iconWarning);
	
							let labelWarning = document.createElement('span');
							labelWarning.textContent = chrome.i18n.getMessage('warningLabel');
							contrastLegend.appendChild(labelWarning);
	
							panelDesc.appendChild(contrastLegend);
							newcurrenttabpanel.insertBefore(panelDesc, currenttabpanelheading.nextSibling);
						}
					} else {
						if(document.querySelector('.contrast-panel-desc')) {
							newcurrenttabpanel.removeChild(document.querySelector('.contrast-panel-desc'));
						} else if(document.querySelector('.alltests-panel-desc')) {
							newcurrenttabpanel.removeChild(document.querySelector('.alltests-panel-desc'));
						}

						document.querySelector('.results-legend').removeAttribute("hidden");
					}

					newcurrenttabpanel.parentNode.scrollTop = 0;
					let subtabsElement = newcurrenttabpanel.querySelector('div.subTabs');
					let earlAllElement = newcurrenttabpanel.querySelector('#earlAll');
					if(element.className.match(/cat-loading/)) {
						if(subtabsElement) subtabsElement.style.display = 'none';
						earlAllElement.style.display = 'none';
						if(!newcurrenttabpanel.querySelector('.loading')) newcurrenttabpanel.appendChild(document.importNode(loadingtemplate, true));
					} else {
						if(subtabsElement) subtabsElement.style.display = 'block';
						earlAllElement.style.display = 'block';
						if(newcurrenttabpanel.querySelector('.loading')) newcurrenttabpanel.querySelector('.loading').remove()
						var tests = newcurrenttabpanel.querySelectorAll('h3');
						var currentTabSubCat = [];
						if(newcurrenttabpanel.querySelector('.subTabs')) {
							newcurrenttabpanel.removeChild(newcurrenttabpanel.querySelector('.subTabs'));
						}
						for (var i = 0; i < tests.length; i++) {
							if (element.getAttribute('id') == 'alltests') {
								if(filters.categories.length > 0) {
									tests[i].parentNode.classList.forEach(el => {
										if(!el.match(/(?:testparent)|(?:a11y)/) && el != element.getAttribute('id') && !tagsCat.includes(el)) {
											if(!currentTabSubCat.includes(el)) currentTabSubCat.push(el);
										}
									});
								}
								tests[i].parentNode.removeAttribute('hidden');
							}
							else {
								if (tests[i].parentNode.classList.contains(element.getAttribute('id'))) {
									if(filters.categories.length > 0) {
										tests[i].parentNode.classList.forEach(el => {
											if(!el.match(/(?:testparent)|(?:a11y)/) && el != element.getAttribute('id')) {
												if(!currentTabSubCat.includes(el)) currentTabSubCat.push(el);
											}
										});
									}
									
									tests[i].parentNode.removeAttribute('hidden');
								}
								else {
									tests[i].parentNode.setAttribute('hidden', 'hidden');
								}
							}
						}
						
						if(currentTabSubCat.length > 0) {
							var subTabsContainer = document.createElement('div');
							subTabsContainer.classList.add('subTabs');
							var subTabsList = document.createElement('ul');
							subTabsList.setAttribute('role', 'tablist');
							subTabsList.setAttribute('aria-orientation', 'horizontal');
							subTabsList.setAttribute('aria-label', 'Filtrer les résultats');
							subTabsList.addEventListener('keydown', tabsNavigation, false);

							var subTabAll = document.createElement('li');
							subTabAll.id = 'sub-all';
							subTabAll.setAttribute('role', 'tab');
							subTabAll.setAttribute('aria-selected', 'true');
							subTabAll.setAttribute('tabindex', '0');
							subTabAll.setAttribute('aria-controls', 'earlAll');
							subTabAll.textContent = chrome.i18n.getMessage('word_all');
							subTabsList.appendChild(subTabAll);


							currentTabSubCat.forEach(st => {
								var subTab = document.createElement('li');
								subTab.id = 'sub-'+st;
								subTab.setAttribute('role', 'tab');
								subTab.setAttribute('aria-selected', 'false');
								subTab.setAttribute('tabindex', '-1');
								subTab.setAttribute('aria-controls', 'earlAll');
								subTab.textContent = chrome.i18n.getMessage('tag'+st);
								subTabsList.appendChild(subTab);
							});

							var subPanel = document.getElementById('earlAll');
							subPanel.setAttribute('aria-labelledby', 'sub-all');

							subTabsContainer.appendChild(subTabsList);
							currenttabpanelheading.nextSibling.after(subTabsContainer);

							subTabsList.querySelectorAll('li').forEach(item => {
								item.addEventListener('click', filterSubTag);
							});

							function filterSubTag(evt) {
								let currentSubTabsSelected = subTabsList.querySelector('li[aria-selected="true"]');
								currentSubTabsSelected.setAttribute('aria-selected', "false");
								currentSubTabsSelected.setAttribute('tabindex', "-1");
								evt.target.setAttribute('aria-selected', "true");
								evt.target.setAttribute('tabindex', "0");
								if(evt.target.id === 'sub-all') {
									for (var i = 0; i < tests.length; i++) {
										if (tests[i].parentNode.classList.contains(element.getAttribute('id')) || element.getAttribute('id') == 'alltests') {
											tests[i].parentNode.removeAttribute('hidden');
										}
										else {
											tests[i].parentNode.setAttribute('hidden', 'hidden');
										}
									}
								} else {
									for (var i = 0; i < tests.length; i++) {
										if ((tests[i].parentNode.classList.contains(element.getAttribute('id')) || element.getAttribute('id') == 'alltests') && tests[i].parentNode.classList.contains(evt.target.id.split('-')[1])) {
											tests[i].parentNode.removeAttribute('hidden');
										}
										else {
											tests[i].parentNode.setAttribute('hidden', 'hidden');
										}
									}
								}
							}
						}
					}
				}

				newcurrenttabpanel.setAttribute('aria-hidden', 'false');
			}
		}

		ul.addEventListener('click', function(event) {
			var element = event.target;
			filterDisplayedTests(element);
		}, false);

		nav.appendChild(ul);
		main.children[0].appendChild(nav);

		var catCount = 0;
		var testsCount = 0;
		var t = 1;
		var startTimer = new Date().getTime();
		var updatedashboardp = false;

		function responseProcess() {
			let first = (catCount === 0) ? "yes" : "no";
			let last = (catCount === filters.categories.length-1) ? "yes" : "no";
			let msgRequest = {
				tabId: chrome.devtools.inspectedWindow.tabId,
				command: 'executeTests',
				cat: filters.categories[catCount],
				statusUser: filters.statuses,
				first: first,
				last: last
			}

			const sendMessage = msg => new Promise((resolve, reject) => {
				const r = chrome.runtime.sendMessage(msg, resolve);
				if(r?.then) {
					return resolve(r);
				}
				if(chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				}
			});

			var sending = sendMessage(msgRequest);
			sending
			.then(
				function (response) {
					let category = filters.categories[catCount];
						response = response.response[0];
						// Check if 'response', 'result' and 'tests' exist, aren't null, and if 'tests' is an array
						if (response && response.result && Array.isArray(response.result.tests)) {
							// If it's return true, we iterate to check how many tests we have
							response.result.tests.forEach(test => {
								if (Array.isArray(test.data)) {
									testsCount += test.data.length;
								} else {
									console.error("Il n'existe pas de tableau data à parcourir dans ce lot de test.");
								}
							});							
						} else {
							console.error("La structure de la réponse reçue ne permet pas de traiter le comptage de tests.");
						}

					// We check if 'result' and 'headings' are defined inside our 'response' object and if 'headings' is an array
					if(response 
						&& response.result 
						&& response.result.headings 
						&& Array.isArray(response.result.headings)
						&& response.result.headings.length > 0) 
					{
						var headings = document.createElement('li');
						headings.setAttribute('id', 'headingsHierarchy');
						headings.setAttribute('role', 'tab');
						headings.setAttribute('aria-selected', 'false');
						headings.setAttribute('tabindex', '-1');
						headings.appendChild(document.createTextNode(chrome.i18n.getMessage('msgHeadingsHierarchy')));

						var headingsPanel = document.createElement('div');
						headingsPanel.setAttribute('role', 'tabpanel');
						headingsPanel.setAttribute('aria-labelledby', headings.getAttribute('id'));
						headingsPanel.setAttribute('id', 'headingsPanel');
						headingsPanel.setAttribute('aria-hidden', 'true');

						headings.setAttribute('aria-controls', headingsPanel.getAttribute('id'));
						ul.insertBefore(headings, ul.querySelector('#alltests'));

						var headingsTemplate = document.querySelector('#headingsTab');
						var headingsPanelContent = document.importNode(headingsTemplate.content, true);
						headingsPanel.appendChild(headingsPanelContent);
						headingsPanel.querySelector('h2').textContent = chrome.i18n.getMessage('msgHeadingsHierarchy');
						headingsPanel.querySelector('.headings-message').textContent = chrome.i18n.getMessage('panelAllHeadingsDesc');
						headingsPanel.querySelector('.headings-legend').textContent = chrome.i18n.getMessage('resultsLegend');
						headingsPanel.querySelector('.headings-error-desc').textContent = chrome.i18n.getMessage('panelErrorHeading');

						var container = headingsPanel.querySelector('.headings-container');

						let hideBtn = document.createElement('button');
						hideBtn.className = 'small-btn headings-showhideAll';
						hideBtn.textContent = chrome.i18n.getMessage('msgCollapseBtn');
						hideBtn.addEventListener('click', () => {
							container.querySelectorAll('button[data-action="showhide-action"][aria-expanded="true"]').forEach(btn => {
								btn.click();
							});
						});

						let showBtn = document.createElement('button');
						showBtn.className = 'small-btn headings-showhideAll';
						showBtn.textContent = chrome.i18n.getMessage('msgExpandBtn');
						headingsPanel.insertBefore(hideBtn, container);
						headingsPanel.insertBefore(showBtn, container);
						showBtn.addEventListener('click', () => {
							container.querySelectorAll('button[data-action="showhide-action"][aria-expanded="false"]').forEach(btn => {
								btn.click();
							});
						});

						var herror = 0;

						function arrayToList(ar, currentList) {
							ar.forEach(heading => {
								if(Array.isArray(heading)) {
									let headingsList = document.createElement('ul');
									headingsList.id = 'heading_n'+(heading[0].index - 1);
									if(!currentList.classList.contains('blue-item-list')) headingsList.classList.add('blue-item-list');
									arrayToList(heading, headingsList);
									currentList.lastElementChild.appendChild(headingsList);

									let disclosure = document.createElement('button');
									disclosure.setAttribute('aria-expanded', 'true');
									disclosure.setAttribute('aria-controls', 'heading_n'+(heading[0].index - 1));
									disclosure.setAttribute('data-action', 'showhide-action');
									disclosure.classList.add('dropdownButton', 'dropdownButton--active', 'headingDropdownButton');

									let iconButton = document.createElement('img');
									iconButton.className = "headingDisclosureIcon";
									iconButton.alt = "Affichier les titres enfants";
									iconButton.src = "./images/arrow.png";
									disclosure.appendChild(iconButton);
									currentList.lastElementChild.firstElementChild.prepend(disclosure);
								}
								else {
									let headingItem = document.createElement('li');
									let headingSpan = document.createElement('span');
									headingSpan.textContent = heading.level+" - "+heading.an;
									if(heading.error) {
										headingSpan.className = "heading-error";
										headingSpan.setAttribute('aria-describedby', 'heading_error');
										herror++;
									}
									else headingSpan.className = "item-actions-highlight";

									let buttonShowContainer = document.createElement('span');
									buttonShowContainer.className = "item-actions-highlight";
									let buttonShow = document.createElement('button');
									buttonShow.className = "visible";
									let buttonShowLabel = document.createElement('span');
									buttonShowLabel.className = "visually-hidden";
									buttonShowLabel.textContent = chrome.i18n.getMessage('panelHighlightHeading');

									buttonShow.addEventListener('click', function(evt) {
										let element = evt.target.closest('button');
										chrome.runtime.sendMessage({
											tabId: chrome.devtools.inspectedWindow.tabId,
											command: 'highlight',
											element: cssify(heading.xpath)
										}, (response) => {
											if(response.response[0] === "off") {
												element.classList.remove('highlightON');
												element.setAttribute('aria-selected', "true");
											} else {
												let previousHighlight = main.children[1].querySelector('.highlightON');
												if(previousHighlight) {
													previousHighlight.classList.remove('highlightON');
													previousHighlight.removeAttribute('aria-selected');
												}
												element.classList.add('highlightON');
											}
										});
									}, true);

									buttonShow.appendChild(buttonShowLabel);
									buttonShowContainer.appendChild(buttonShow);
									headingSpan.appendChild(buttonShowContainer);

									let buttonInspectContainer = document.createElement('span');
									buttonInspectContainer.className = "item-actions-inspect"
									let buttonInspect = document.createElement('button');
									buttonInspect.className = "visible";
									let buttonInspectLabel = document.createElement('span');
									buttonInspectLabel.className = "visually-hidden";
									buttonInspectLabel.textContent = chrome.i18n.getMessage('panelInspectHeading');
									
									buttonInspect.addEventListener('click', function() {
										chrome.devtools.inspectedWindow.eval(`inspect(document.querySelector('[sdata-tng-hindex="${heading.index}"]'))`);
									});																
																										
									buttonInspect.appendChild(buttonInspectLabel);
									buttonInspectContainer.appendChild(buttonInspect);
									headingSpan.appendChild(buttonInspectContainer);

									headingItem.appendChild(headingSpan);
									currentList.appendChild(headingItem);
								}
							});
						}
						if(response && response.result && response.result.headings && Array.isArray(response.result.headings)) {
							response.result.headings.forEach(ar => arrayToList(ar, container));
						}

						if(herror > 0) {
							let hstrong = document.createElement('strong');
							hstrong.appendChild(document.createTextNode(herror));
							headings.appendChild(hstrong);
						}
						rightcolumn.appendChild(headingsPanel);
					}
					/**
					 * ? display tests results
					 */
					if (response && response.result && Array.isArray(response.result.tests)) {
					response.result.tests.forEach(test => {
						// UI. Dashboard.
						// manage message on dashboard panel
						if (!updatedashboardp && test.type == 'failed') {
							dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultFailed');
							updatedashboardp = true;
						}

						if(isRGAAVersion) test.tags = test.tags.filter(y => {return y != 'a11y'});
						
						var testelement = document.createElement('div');
						testelement.setAttribute('hidden', 'hidden');
						testelement.setAttribute('class', 'testparent ' + test.tags.join(' '));
		
						// create test button
						var testButtonTemplate = document.querySelector('#test-button');
						var testButtonFragment = document.importNode(testButtonTemplate.content, true);
						var tabpanelsection = testButtonFragment.querySelector('.test-title');
						tabpanelsection.classList.add(test.type);
						
						// display test status on the button
						tabpanelsection.querySelector('.test-button-status').textContent = chrome.i18n.getMessage('earl' + test.type.charAt(0).toUpperCase() + test.type.slice(1));
						
						// display the number of elements on test button
						let dataLength = test.data.length;
						if (!((test.type == 'failed' && dataLength == 0) || test.type == 'untested')) {
							let count = tabpanelsection.querySelector('.test-button-count');
							let strongcount = test.hasOwnProperty('failedincollection') ? test.failedincollection : dataLength;
							count.firstElementChild.textContent = strongcount + (test.hasOwnProperty('counter') ? ' / ' +  test.counter : '');
							count.lastElementChild.textContent = strongcount > 1 ? chrome.i18n.getMessage('word_results') : chrome.i18n.getMessage('word_result');
						}

						if(!test.warning || dataLength === 0) {
							tabpanelsection.querySelector('.test-button-warning').remove();
						} else {
							tabpanelsection.querySelector('.test-button-warning .visually-hidden').textContent = chrome.i18n.getMessage('warningLabel');
						}
		
						// display the test name on the button
						tabpanelsection.querySelector('.test-button-name').textContent = test.name.charAt(0).toUpperCase() + test.name.slice(1);
		
						// create results container
						var tabpanelsectiondiv = document.createElement('div');
						tabpanelsectiondiv.setAttribute('id', 'testsection' + t);
						tabpanelsectiondiv.setAttribute('hidden', 'hidden');

						tabpanelsection.querySelector('.test-button').setAttribute('aria-controls', tabpanelsectiondiv.getAttribute('id'));
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

						if(isRGAAVersion) test.tags = test.tags.filter(tag => {return tag != category});
						if(test.tags.length > 0) {
							tagssection.addEventListener('click', function(event) {
								var element = event.target;
								if (element.tagName.toLowerCase() == 'button') {
									if(isRGAAVersion) var tab = document.getElementById('sub-'+element.getAttribute('data-tagid'));
									else var tab = document.getElementById(element.getAttribute('data-tagid'));
									tab.click();
									tab.focus();
								}
							}, false);
			
							var tabpanelsectionp = document.createElement('p');
							tabpanelsectionp.appendChild(document.createTextNode(chrome.i18n.getMessage('word_label_plural')+' : '));
							
			
							if (test.tags.length == 1) {
								var tagid = 'tag' + test.tags[0].charAt(0).toUpperCase() + test.tags[0].slice(1);
								var tagbutton = document.createElement('button');
								tagbutton.setAttribute('type', 'button');
								tagbutton.setAttribute('data-tagid', test.tags[0]);
								tagbutton.className = 'small-btn';
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
									tagbutton.className = 'small-btn';
									tagbutton.setAttribute('title', chrome.i18n.getMessage('uiTagButton').replace(new RegExp('{tagName}'), chrome.i18n.getMessage(tagid)));
									tagbutton.appendChild(document.createTextNode(chrome.i18n.getMessage(tagid)));
									tagli.appendChild(tagbutton);
									tagsul.appendChild(tagli);
								}
								tagssection.appendChild(tagsul);
							}
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
									{ name: 'N°', abbr: 'Numéro', export: 'required' },
									{ name: 'Statut', export: 'required' },
									{ name: 'Item', export: 'required' },
									{ name: 'Nom accessible calculé', export: 'required' },
									{ name: 'Atteignable au clavier ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAABGdBTUEAALGPC/xhBQAAAjBJREFUOBGt1M1LVUEYgPF7ND/KLG4qRVibIgJvoIsgcOGuEFdRRC10I5LQP6ArbRUu3dqudkG4cCEGlktNSElF6YPioqGVRmEp+XF6njoH5F69XawXfsw0vTPzzsy5JhL/IcIwrEAvgszlCjIH9vnvc8xLBkEQ7nP+3tOoOokBXN4t68Bug38bYzErdsFq1KGf6p/QZkXWnWVlZAyweDNDLRjCezxn8TTtvweLpzCEZL6r/b4iJlQw4Wgek26TM2JuHpt85WTLAYn1TOjGBxhuuhG127QqisaO0K7j544xv0RtRmO2xkl0u8EEnXtwURPncBHT8GRVGMclvIHvdgajMO8TlpGCeecRF9WZYIM0WrEJ49GfJhymXYj6D6N2klZGPGaOuUY817VcM+11+OP4iDsoxAtMYgwn4FGfYRaeyrBaP8uX8GoXMYynGMEWlhB6JUYxatCANnhN7TiEVXTADRsj9h3z/8pg7gxa4RoXcBChJ/C+fLxbqMQP+FDXYQElaIIL3IDhia+hFD74VTh2E4fxBd7Cto+cpmPVa7Diz1iH3/oKrPA4XuMUjHmcxRK+4xjMtWqLdC37fZ7A+zqNTpjsL9QNH6AWHtdTmht/gnHfE07BaltwH1dgUX6ZWyb6jXuXb+HO83iFBZTDa8gVzjPXOc59B6t3zSKvqIeOCw3CsEofPf5d+GXlCm/AE1qo72HRRiO+uYGPeBc+molGiPgPof1csTMv7nt1j9H1C4W7DIhH/jVRAAAAAElFTkSuQmCC', export: 'required' },
									{ name: 'Restitué ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABGdBTUEAALGPC/xhBQAAAlBJREFUOBGV00tIVUEcx/F7xAfaQ0vCUtQitCgQqoWohI9N0MNFYVKgEiRo9JAgIqhFunAjggs3UYvoIqK0cGFqFPlEoVwYoeIjDHqYgWiu6/r9HWbiei5XOgOfO/+Z+c+cO3PmOAEfJRQKHSW9BJWYRh+GHMfZoPZXWGw/gviJD+hGP75gAdW+VmTCIcyiF3nhk2nvwA2soil8LGpMooPXCNok4rN4hHqkq5+6ABu4bPMiagb3ItZMKCROQiZGoC2/go7hG86ZvNvEc0iMWNAkPGew0Q4Sx2MMnUg1OdrFLeicM6Cj+IoyO09bSIGS4lAKJdvtlRP/QNq/CSagTw+7Yx40QHw/hp8EaKt/cRc1XJF31Iu4CJUcJGOQ3AvqCCvzxFmmvUadHMNPHV6w0G/qFlyDyhsUu1Eg0EFdhDa0sHCS+qk1/xQ+qk05gO8aOIxlHEQePiMWVRh1U80P7WLo3PTiEtGOaeyG7rKO7ISe9MfMcahDnlh9erDOuYGwC63Q2Q4hH5fMLh8Qz2BKExrwkobiOoyb+DGx3nY2JjCD88jCEvQvE0zudeJ1nFRbC2kbelm7sAidsfpHUY8jeAi9KPUP46mJte0nWIH3BbrJexi4Bz3gNJSYqcm20K6EznQn9uE9BnHM5kStSQqi2ZtA3xXUQldRn28P3CPw5ka0SUyDviJ9KbpKWwp9WnwJKVsG/qfBpAp88ubS9xZ62/4LE/VPdfeu2tnEZ7CKXNvnu9aC+IU+6AwV39xuIfdyb5egMRY5TlWLeDzjsk9SRy2bAMhld532BdwAAAAASUVORK5CYII=', export: 'required' },
									{ name: 'Actions', export: 'no' }
								];
							} else {
								var tableheadings = [
									{ name: 'N°', abbr: 'Numéro', export: 'required' },
									{ name: 'Balise', export: 'required' },
									{ name: 'Passage de texte', export: 'required' },
									{ name: 'Taille', export: 'required' },
									{ name: 'Graisse', export: 'required' },
									{ name: 'CT', abbr: 'Couleur de texte', export: 'required' },
									{ name: 'CF', abbr: 'Couleur de fond', export: 'required' },
									{ name: 'Ratio estimé', export: 'required' },
									{ name: 'Atteignable au clavier ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAABGdBTUEAALGPC/xhBQAAAjBJREFUOBGt1M1LVUEYgPF7ND/KLG4qRVibIgJvoIsgcOGuEFdRRC10I5LQP6ArbRUu3dqudkG4cCEGlktNSElF6YPioqGVRmEp+XF6njoH5F69XawXfsw0vTPzzsy5JhL/IcIwrEAvgszlCjIH9vnvc8xLBkEQ7nP+3tOoOokBXN4t68Bug38bYzErdsFq1KGf6p/QZkXWnWVlZAyweDNDLRjCezxn8TTtvweLpzCEZL6r/b4iJlQw4Wgek26TM2JuHpt85WTLAYn1TOjGBxhuuhG127QqisaO0K7j544xv0RtRmO2xkl0u8EEnXtwURPncBHT8GRVGMclvIHvdgajMO8TlpGCeecRF9WZYIM0WrEJ49GfJhymXYj6D6N2klZGPGaOuUY817VcM+11+OP4iDsoxAtMYgwn4FGfYRaeyrBaP8uX8GoXMYynGMEWlhB6JUYxatCANnhN7TiEVXTADRsj9h3z/8pg7gxa4RoXcBChJ/C+fLxbqMQP+FDXYQElaIIL3IDhia+hFD74VTh2E4fxBd7Cto+cpmPVa7Diz1iH3/oKrPA4XuMUjHmcxRK+4xjMtWqLdC37fZ7A+zqNTpjsL9QNH6AWHtdTmht/gnHfE07BaltwH1dgUX6ZWyb6jXuXb+HO83iFBZTDa8gVzjPXOc59B6t3zSKvqIeOCw3CsEofPf5d+GXlCm/AE1qo72HRRiO+uYGPeBc+molGiPgPof1csTMv7nt1j9H1C4W7DIhH/jVRAAAAAElFTkSuQmCC', export: 'required' },
									{ name: 'Restitué ?', img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAABGdBTUEAALGPC/xhBQAAAlBJREFUOBGV00tIVUEcx/F7xAfaQ0vCUtQitCgQqoWohI9N0MNFYVKgEiRo9JAgIqhFunAjggs3UYvoIqK0cGFqFPlEoVwYoeIjDHqYgWiu6/r9HWbiei5XOgOfO/+Z+c+cO3PmOAEfJRQKHSW9BJWYRh+GHMfZoPZXWGw/gviJD+hGP75gAdW+VmTCIcyiF3nhk2nvwA2soil8LGpMooPXCNok4rN4hHqkq5+6ABu4bPMiagb3ItZMKCROQiZGoC2/go7hG86ZvNvEc0iMWNAkPGew0Q4Sx2MMnUg1OdrFLeicM6Cj+IoyO09bSIGS4lAKJdvtlRP/QNq/CSagTw+7Yx40QHw/hp8EaKt/cRc1XJF31Iu4CJUcJGOQ3AvqCCvzxFmmvUadHMNPHV6w0G/qFlyDyhsUu1Eg0EFdhDa0sHCS+qk1/xQ+qk05gO8aOIxlHEQePiMWVRh1U80P7WLo3PTiEtGOaeyG7rKO7ISe9MfMcahDnlh9erDOuYGwC63Q2Q4hH5fMLh8Qz2BKExrwkobiOoyb+DGx3nY2JjCD88jCEvQvE0zudeJ1nFRbC2kbelm7sAidsfpHUY8jeAi9KPUP46mJte0nWIH3BbrJexi4Bz3gNJSYqcm20K6EznQn9uE9BnHM5kStSQqi2ZtA3xXUQldRn28P3CPw5ka0SUyDviJ9KbpKWwp9WnwJKVsG/qfBpAp88ubS9xZ62/4LE/VPdfeu2tnEZ7CKXNvnu9aC+IU+6AwV39xuIfdyb5egMRY5TlWLeDzjsk9SRy2bAMhld532BdwAAAAASUVORK5CYII=', export: 'required' },
									{ name: 'Actions', export: 'no' }
								];
							}

							if(!test.tags.includes('contrast') && !test.tags.includes('accessiblename')) tableheadings.splice(3, 1);
		
							var tr = document.createElement('tr');
							tr.setAttribute('class', 'theadings');
							for (var k = 0; k < tableheadings.length; k++) {
								var th = document.createElement('th');
								th.setAttribute('scope', 'col');
								
								if (tableheadings[k].hasOwnProperty('export')) {
									th.classList.add(tableheadings[k].export + '-export');
								}

								if (tableheadings[k].hasOwnProperty('img')) {
									var img = document.createElement('img');
									img.setAttribute('src', tableheadings[k].img);
									img.setAttribute('alt', tableheadings[k].name);
									img.setAttribute('title', img.getAttribute('alt'));
									th.appendChild(img);
								} else if(tableheadings[k].hasOwnProperty('abbr')) {
									let abbrEl = document.createElement('abbr');
									abbrEl.setAttribute('title', tableheadings[k].abbr);
									abbrEl.appendChild(document.createTextNode(tableheadings[k].name));
									th.appendChild(abbrEl);
								} else {
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
									var itemRatio = test.data[h].ratio ? test.data[h].ratio + ':1' : '';
		
									let template = document.querySelector('#item-row-contrast');
									var newRow = document.importNode(template.content, true);

									if(test.type === "failed") {
										let contrastFinderLink = document.createElement('a');
										contrastFinderLink.textContent = "Contrast-Finder";
										contrastFinderLink.setAttribute('title', chrome.i18n.getMessage('contrastFinder'));
										contrastFinderLink.setAttribute('target', '_blank');

										let fg = "https://contrast-finder.tanaguru.com/result.html?foreground=%23"+translateRGBToHex(itemCT[0]);
										let bg = "&background=%23"+translateRGBToHex(itemCF[0]);
										let ratio = "&ratio="+(test.data[h].valid.target);
										let lang = (chrome.i18n.getMessage('extensionLang') === "en") ? "&lang=en" : "&lang=fr";
										let contrastFinder = fg+bg+ratio+lang;

										contrastFinderLink.setAttribute('href', contrastFinder);
										newRow.querySelector('.item-actions').appendChild(contrastFinderLink);
									}

									newRow.querySelector('.item-number').textContent = itemNumber;
									newRow.querySelector('.item-tag').textContent = itemTag;
									newRow.querySelector('.item-text').textContent = itemText;
									newRow.querySelector('.item-size').textContent = itemSize;
									newRow.querySelector('.item-weight').textContent = itemWeight;
									newRow.querySelector('.item-ct .item-ct-content').style.background = itemCT[0];
									if(itemCT.length > 1) {
										let itemCTbg = "linear-gradient(90deg, " + itemCT[0].match(/rgba?\([^)]+\)/)[0] + ' 0%, ';
										for(let n = 1; n < itemCT.length; n++) {
											itemCTbg += itemCT[n].match(/rgba?\([^)]+\)/)[0] + ' ' + n * (100 / (itemCT.length - 1)) + '%, ';
										}

										newRow.querySelector('.item-ct .item-ct-content').style.background = itemCTbg.trim().slice(0, -1) + ')';
									}
									newRow.querySelector('.item-ct .visually-hidden').textContent = itemCT;
									newRow.querySelector('.item-ct').setAttribute('title', itemCT);
									newRow.querySelector('.item-cf').setAttribute('title', itemCF);
									if(itemCF && itemCF !== 'image') {
										newRow.querySelector('.item-cf .item-cf-content').style.background = itemCF[0];

										if(itemCF.length > 1) {
											let itemCFbg = "linear-gradient(90deg, " + itemCT[0].match(/rgba?\([^)]+\)/)[0] + ' 0%, ';
											for(let n = 0; n < itemCF.length; n++) {
												itemCFbg += itemCF[n].match(/rgba?\([^)]+\)/)[0] + ' ' + n * (100 / (itemCF.length - 1)) + '%, ';
											}

											newRow.querySelector('.item-cf .item-cf-content').style.background = itemCFbg.trim().slice(0, -1) + ')';
										}
									} else if(itemCF && itemCF === 'image') {
										newRow.querySelector('.item-cf .item-cf-content').setAttribute('aria-describedby', 'contrast-bgImage');
										newRow.querySelector('.item-cf .item-cf-content').classList.add('contrast-bgImage');
									} else {
										newRow.querySelector('.item-cf .item-cf-content').setAttribute('aria-describedby', 'contrast-bgNull');
										newRow.querySelector('.item-cf .item-cf-content').classList.add('contrast-bgNull');
										newRow.querySelector('.item-cf').setAttribute('title', chrome.i18n.getMessage('contrastLegend2'));
										newRow.querySelector('.item-cf .item-cf-icon').textContent = "x";
									}
									newRow.querySelector('.item-cf .visually-hidden').textContent = itemCF ? itemCF : chrome.i18n.getMessage('contrastLegend2');
									newRow.querySelector('.item-ratio').textContent = itemRatio;
								} else {
									var itemStatus = test.data[h].status;
									let template = document.querySelector('#item-row');
									var newRow = document.importNode(template.content, true);
									newRow.querySelector('.item-number').textContent = itemNumber;
									newRow.querySelector('.item-status').textContent = chrome.i18n.getMessage("earl"+itemStatus);

									formattingCode(test.data[h].outer, newRow.querySelector('.item-code code'), codehighlight, test.data[h].outerRelated);

									/**
									 * ? Display the detail of accessible name
									 */
									if(test.tags.includes('accessiblename')) {
										newRow.querySelector('.item-code').classList.add("item-code--small");

										var an = test.data[h].anDetails;
										newRow.querySelector('.item-accessiblename .an-full').appendChild(document.createTextNode(an[0]));
										an.shift();

										function addLIcontent(item, itemAN) {
											if(typeof itemAN === "string") {
												let itemStrong = document.createElement('strong');
												itemStrong.textContent = item.textContent;
												item.textContent = "";
												item.appendChild(itemStrong);
												item.appendChild(document.createTextNode(': '+itemAN));
											}
											else {
												itemAN.shift();
												var indexAN = 0;
												itemAN.forEach(el => {
													let empty = false;
													for(var y in el) {
														if(typeof el[y] === "string") el[y] = el[y].trim();
														if(!el[y] || el[y].length === 0) empty = true;
													}
													if(empty) itemAN.splice(indexAN, 1);
													indexAN++;
												});

												if(itemAN.length > 0) {
													let ul = document.createElement('ul');
													itemAN.forEach(n => {
														for(var subPart in n) {
															let partName = typeof n[subPart] === "object" ? (n[subPart][0] ? n[subPart][0].trim() : "") : n[subPart].trim();
															partName = partName.replace(/\s{2,}/g, " ");

															if(!(subPart != 'alt' && partName.length === 0)) {
																let subli = document.createElement('li');
																subli.textContent = subPart === "textual-contents" ? chrome.i18n.getMessage('panelTextualContents') : subPart;
	
																if(typeof n[subPart] === "string") {
																	let subStrong = document.createElement('strong');
																	subStrong.textContent = subli.textContent;
																	subli.textContent = "";
																	subli.appendChild(subStrong);
																	subli.appendChild(document.createTextNode(': '+n[subPart]));
																}
																else {
																	for(let i = 0; i < n[subPart].length; i++) {
																		let empty = false;
																		for(var y in n[subPart][i]) {
																			if(n[subPart][i][y].length === 0) empty = true;
																		}
																		if(empty) n[subPart].splice(i, 1);
																	}
	
																	if(n[subPart].length === 1 && n[subPart][0].hasOwnProperty("textual-contents")) {
																		subli.textContent += ': '+n[subPart][0]["textual-contents"];
																	} else {
																		addLIcontent(subli, n[subPart]);
																	}
																}
																ul.appendChild(subli);
															}
														}
													});
													
													item.appendChild(ul);
												}
											}
										}

										if(an.length > 0 && newRow.querySelector('.item-accessiblename .an-full').textContent.trim().length > 0) {
											let anList = newRow.querySelector('.item-accessiblename .an-list');
											anList.id = itemNumber+'-'+t;
											an.forEach(n => {
												for(var part in n) {
													let partName = Array.isArray(n[part]) ? n[part][0].trim() : n[part].trim();
													partName = partName.replace(/\s{2,}/g, " ");
													if(part != 'alt' && partName.length === 0) continue;
													let li = document.createElement('li');
													li.textContent = part === "textual-contents" ? chrome.i18n.getMessage('panelTextualContents') : part;
													addLIcontent(li, n[part]);
													anList.appendChild(li);
												};
											});
											newRow.querySelector('.item-accessiblename .an-button').setAttribute('aria-expanded', 'false');
											newRow.querySelector('.item-accessiblename .an-button').setAttribute('aria-controls', anList.id);
											newRow.querySelector('.item-accessiblename .an-button').textContent = chrome.i18n.getMessage('panelShowAnDetails');
											newRow.querySelector('.item-accessiblename .an-button').addEventListener('click', (e) => {
												var isOpen = e.target.getAttribute('aria-expanded') === "true";
												if(isOpen) {
													e.target.setAttribute('aria-expanded', 'false');
													document.getElementById(e.target.getAttribute('aria-controls')).style.display = "none";
													e.target.textContent = chrome.i18n.getMessage('panelShowAnDetails');
												} else {
													e.target.setAttribute('aria-expanded', 'true');
													document.getElementById(e.target.getAttribute('aria-controls')).style.display = "block";
													e.target.textContent = chrome.i18n.getMessage('panelHideAnDetails');
												}
											});
										} else {
											newRow.querySelector('.item-accessiblename .an-button').remove();
											newRow.querySelector('.item-accessiblename .an-list').remove();
										}
									} else {
										newRow.querySelector('.item-accessiblename').remove();
									}
								}
		
								if(itemKeyboard.length > 0) {
									countkeyboardyes += 1;
									newRow.querySelector('.item-keyboard .keyboardyes').setAttribute('title', chrome.i18n.getMessage('word_yes')+' ('+ itemKeyboard + ')');
									newRow.querySelector('.item-keyboard .visually-hidden').textContent = chrome.i18n.getMessage('word_yes')+' ('+ itemKeyboard + ')';
								} else {
									countkeyboardno += 1;
									newRow.querySelector('.item-keyboard .keyboardyes').setAttribute('title', chrome.i18n.getMessage('word_no'));
									newRow.querySelector('.item-keyboard .keyboardyes').className = 'keyboardno';
									newRow.querySelector('.item-keyboard .visually-hidden').textContent = chrome.i18n.getMessage('word_no');
								}
		
								if(itemReader.length === 0) {
									countreaderyes += 1;
									newRow.querySelector('.item-reader .readeryes').setAttribute('title', chrome.i18n.getMessage('word_yes'));
									newRow.querySelector('.item-reader .visually-hidden').textContent = chrome.i18n.getMessage('word_yes');
								} else {
									countreaderno += 1;
									newRow.querySelector('.item-reader .readeryes').setAttribute('title', chrome.i18n.getMessage('word_no')+' (' + itemReader + ')');
									newRow.querySelector('.item-reader .readeryes').className = 'readerno';
									newRow.querySelector('.item-reader .visually-hidden').textContent = chrome.i18n.getMessage('word_no')+' (' + itemReader + ')';
								}
		
								if(test.data[h].isVisible) {
									countvisible += 1;
		
									newRow.querySelector('.item-actions .item-actions-highlight button').setAttribute('title', chrome.i18n.getMessage('panelActionHighlight')+' (' + test.name + ', item ' + (h + 1) + ')');
									newRow.querySelector('.item-actions .item-actions-highlight .visually-hidden').textContent = chrome.i18n.getMessage('panelActionHighlight')+' (' + test.name + ', item ' + (h + 1) + ')';
								} else {
									countinvisible += 1;
		
									newRow.querySelector('.item-actions .item-actions-highlight button').className = 'hidden';
									newRow.querySelector('.item-actions .item-actions-highlight button').disabled = true;
									newRow.querySelector('.item-actions .item-actions-highlight button').setAttribute('title', chrome.i18n.getMessage('panelHiddenElement'));
									newRow.querySelector('.item-actions .item-actions-highlight .visually-hidden').textContent = chrome.i18n.getMessage('panelHiddenElement');
								}
		
								newRow.querySelector('.item-actions .item-actions-inspect button').setAttribute('title', chrome.i18n.getMessage('panelActionInspect')+' (' + test.name + ', item ' + (h + 1) + ')');
								newRow.querySelector('.item-actions .item-actions-inspect button').className = "visible";
								newRow.querySelector('.item-actions .item-actions-inspect .visually-hidden').textContent = chrome.i18n.getMessage('panelActionInspect')+' (' + test.name + ', item ' + (h + 1) + ')';
		
								newRow.querySelector('.item-actions .item-actions-about button').setAttribute('title', chrome.i18n.getMessage('panelAboutElement')+' (' + test.name + ', item ' + (h + 1) + ')');
								newRow.querySelector('.item-actions .item-actions-about button').setAttribute('data-xpath', itemXPath);
								newRow.querySelector('.item-actions .item-actions-about .visually-hidden').textContent = chrome.i18n.getMessage('panelAboutElement')+' (' + test.name + ', item ' + (h + 1) + ')';
								
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
								var selectlabeltext = tabpanelsection.querySelector('.test-button-name').textContent;
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
											{ name: chrome.i18n.getMessage('msgKeyboardyes')+' (' + countkeyboardyes + ')', value: 'keyboardyes' },
											{ name: chrome.i18n.getMessage('msgKeyboardno')+' (' + countkeyboardno + ')', value: 'keyboardno' }
										]
									});
								}
								if (countreaderyes > 0 && countreaderno > 0) {
									options.push({
										name: 'Restitution',
										options: [
											{ name: chrome.i18n.getMessage('msgReaderyes')+' (' + countreaderyes + ')', value: 'readeryes' },
											{ name: chrome.i18n.getMessage('msgReaderno')+' (' + countreaderno + ')', value: 'readerno' }
										]
									});
								}
								if (countvisible > 0 && countinvisible > 0) {
									options.push({
										name: 'Visibilité',
										options: [
											{ name: chrome.i18n.getMessage('msgVisible')+' (' + countvisible + ')', value: 'visible' },
											{ name: chrome.i18n.getMessage('msgHidden')+' (' + countinvisible + ')', value: 'hidden' }
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
							exportbutton.setAttribute('title', chrome.i18n.getMessage('optionExportTestData')+' - ' + test.name.charAt(0).toUpperCase() + test.name.slice(1));
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
								closebutton.appendChild(document.createTextNode(chrome.i18n.getMessage('optionBackresults')));
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
								filelabel.appendChild(document.createTextNode(chrome.i18n.getMessage('optionExportFileName')));
								fileh2.appendChild(filelabel);
								file.appendChild(fileh2);
								var filep = document.createElement('p');
								filep.setAttribute('class', 'input');
								var fileinput = document.createElement('input');
								fileinput.setAttribute('type', 'text');
								fileinput.setAttribute('id', filelabel.getAttribute('for'));
								fileinput.setAttribute('value', 'tng_webext_export_' + this.closest('.testparent').querySelector('h3 .test-button').getAttribute("aria-controls") + '.csv');
								filep.appendChild(fileinput);
								file.appendChild(filep);
								tanagurupopin.appendChild(file);
								
								var exportitems = document.createElement('div');
								exportitems.setAttribute('id', 'export-items');
								var toignorediv = document.createElement('div');
								var toignoreh2 = document.createElement('h2');
								var toignorelabel = document.createElement('label');
								toignorelabel.setAttribute('for', 'toignore');
								toignorelabel.appendChild(document.createTextNode(chrome.i18n.getMessage('optionNoExportData')));
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
								toignoredesc.appendChild(document.createTextNode(chrome.i18n.getMessage('optionNoExportData')));
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
								toexportlabel.appendChild(document.createTextNode(chrome.i18n.getMessage('optionExportData')));
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
								toexportdesc.appendChild(document.createTextNode(chrome.i18n.getMessage('optionNoExportDesc')));
								toexportp.appendChild(toexportdesc);
								toexportdiv.appendChild(toexportp);
								exportitems.appendChild(toexportdiv);
								var exportorder = document.createElement('ul');
								var exportorderbuttons = [
									{
										id: 'moveup', accessiblename: chrome.i18n.getMessage('optionExportMoveup'), name: '\u2B06', exec: function(event) {
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
										id: 'movedown', accessiblename: chrome.i18n.getMessage('optionExportMovedown'), name: '\u2B07', exec: function(event) {
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
												var celltoexport = data[i].querySelector(toexport.options[j].value);
												var texttoexport = celltoexport.hasAttribute("title") ? celltoexport.getAttribute("title") : celltoexport.textContent;
												datatextitem.push('"' + texttoexport.replace(/"/g, '""') + '"');
											}
										}
										datatext.push(datatextitem.join(';'));
									}
									var csv_text = "\uFEFF"+datatext.join('\n');
									var csvFile = new Blob([csv_text], { type: 'text/csv; charset=utf-8' });
									chrome.runtime.sendMessage({
										tabId: chrome.devtools.inspectedWindow.tabId,
										command: 'downloadTestCsvFile',
										data: { url: window.URL.createObjectURL(csvFile), filename: document.getElementById('export-filename').value }
									});
								}, false);
								exportbutton.appendChild(document.createTextNode(chrome.i18n.getMessage('optionExportCsv')));
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
						let parentTestElement = alltagspanel.querySelector('#earl' + test.type.charAt(0).toUpperCase() + test.type.slice(1));
						if(test.warning) {
							parentTestElement.insertBefore(testelement, parentTestElement.firstChild);
						} else {
							parentTestElement.appendChild(testelement);
						}
						
						t++;
					});
				} else {
					console.error("Erreur lors de l'envoi de la réponse.");
				}
				let currentTag = null;
				let currentTab = null;
				// We check if 'result' and 'tags' are defined inside our 'response' object and if 'tags' is an array
				if (response && response.result && Array.isArray(response.result.tags)) {
					currentTag = response.result.tags.filter(tag => tag.id === category)[0];
					currentTab = document.getElementById(category);
				} else {
					console.error("Aucun tag trouvé avec l'id correspondant : ", category);
				}

				if (response && response.result && Array.isArray(response.result.tests)) {
					if(response.result.tests.length === 0) {
						currentTab.remove();
					} else {
						document.getElementById(currentTag.status+'cat-separator').insertAdjacentElement('afterend', document.getElementById(currentTab.id));
						currentTab.querySelector('p.loading').remove();
						currentTab.classList.remove('cat-loading');

						if(currentTag.nbfailures > 0 && allFailures === 0) {
							tab.classList.add('cat-failed');
							tab.appendChild(document.createTextNode(' '));
							var strong = document.createElement('strong');
							tab.appendChild(strong);
						}

						if(currentTag.nbfailures > 0) {
							let allerrors = tab.querySelector('strong');
							allFailures += currentTag.nbfailures;
							currentTab.classList.add('cat-failed');
							currentTab.appendChild(document.createTextNode(' '));
							var strong = document.createElement('strong');
							strong.appendChild(document.createTextNode(currentTag.nbfailures));
							allerrors.textContent = allFailures;
							currentTab.appendChild(strong);
						}

						if(currentTag.isNA) {
							currentTab.classList.add('cat-inapplicable');
							currentTab.appendChild(document.createTextNode(' '));
							var span = document.createElement('span');
							span.appendChild(document.createTextNode('NA'));
							span.setAttribute('aria-label', 'NA: non applicable');
							currentTab.appendChild(span);
						}
					}
				}
				}	
					
			)
			.then(
				() => {
					let testPanel = document.getElementById('tests');
					let cTab = ul.querySelector('li#'+testPanel.getAttribute('aria-labelledby'));

					if(testPanel.getAttribute('aria-hidden') === "false" && testPanel.querySelector('p.loading')) {
						if(!cTab.className.match(/cat-loading/)) {
							filterDisplayedTests(cTab);
						}
					}

					catCount++;

					if(filters.categories[catCount]) responseProcess(filters);
					else {
						if(testsCount === 0) ul.querySelector('li[id="alltests"]').remove();
						var ptimer = document.createElement('p');
						ptimer.classList.add('analyzeTimer');
						ptimer.setAttribute('style', 'font-size: 0.8em; margin: 0 0 0.5em 0; padding: 0 0.5em;');
						var tte = new Date().getTime();
						var teststimer = (tte - startTimer) / 1000;
						var ptimersmall = document.createElement('small');
						ptimersmall.appendChild(document.createTextNode(chrome.i18n.getMessage('msgDashboardAnalyzeTimer')+' ' + teststimer + ' '+chrome.i18n.getMessage('word_second') + (teststimer > 1 ? 's' : '') + '.'));
						ptimer.appendChild(ptimersmall);
						nav.firstChild.insertAdjacentElement('afterend', ptimer);
						ul.querySelectorAll('li[hidden]').forEach(li => li.remove());

						if (!updatedashboardp) {
							if(testsCount === 0) dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultNone');
							else dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultPassed');
						}

						dashboardpanel.querySelector('#listenDOM').disabled = false;
						dashboardpanel.querySelector('#taborder').disabled = false;
						dashboardpanel.querySelector('.taborder-label').textContent = chrome.i18n.getMessage('dashboard_ordertab_label');
						dashboardpanel.querySelector('.taborder-desc-legend').textContent = chrome.i18n.getMessage('resultsLegend');
						dashboardpanel.querySelector('.taborder-desc-error').lastElementChild.textContent = chrome.i18n.getMessage('dashboard_ordertab_legend_error');
						dashboardpanel.querySelector('.taborder-desc-invisible').lastElementChild.textContent = chrome.i18n.getMessage('dashboard_ordertab_legend_invisible');
						dashboardpanel.querySelector('label[for="taborder"] .slider').textContent = chrome.i18n.getMessage('word_no');
						dashboardpanel.querySelector('label[for="listenDOM"]').removeAttribute('style');
						dashboardpanel.querySelector('label[for="taborder"]').removeAttribute('style');
						dashboardpanel.querySelector('#taborder-desc').removeAttribute('style');
						document.getElementById('reloadTests').removeAttribute('hidden');

						if(listenDomModif) {
							chrome.runtime.sendMessage({
								tabId: chrome.devtools.inspectedWindow.tabId,
								command: 'obsDOM',
								obs: 'ON',
							}, (response) => {
								addObsInterface();
								if(!dashboardpanel.querySelector('#listenDOM').checked) {
									dashboardpanel.querySelector('#listenDOM').checked = true;
									dashboardpanel.querySelector('label[for="listenDOM"] .slider').textContent = chrome.i18n.getMessage('word_yes');
								}
							});
						}
					}
				}
			)
		}

		if(filters.categories[0]) responseProcess();
		else {
			ul.querySelector('li[id="alltests"]').remove();
			var ptimer = document.createElement('p');
			ptimer.classList.add('analyzeTimer');
			ptimer.setAttribute('style', 'font-size: 0.8em; margin: 0 0 0.5em 0; padding: 0 0.5em;');
			var tte = new Date().getTime();
			var teststimer = (tte - startTimer) / 1000;
			var ptimersmall = document.createElement('small');
			ptimersmall.appendChild(document.createTextNode(chrome.i18n.getMessage('msgDashboardAnalyzeTimer')+' ' + teststimer + ' '+chrome.i18n.getMessage('word_second') + (teststimer > 1 ? 's' : '') + '.'));
			ptimer.appendChild(ptimersmall);
			nav.firstChild.insertAdjacentElement('afterend', ptimer);
			ul.querySelectorAll('li[hidden]').forEach(li => li.remove());

			if (!updatedashboardp) {
				if(testsCount === 0) dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultNone');
				else dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultPassed');
			}
		}

		if(testsCount === 0 && catCount === filters.categories.length) tab.remove();
		main.children[1].appendChild(alltagspanel);
	}

	displayResults();

	function restartAnalyze() {
		let hlElement = main.children[1].querySelector('.highlightON');
		if(hlElement) hlElement.click();
		if(listenDomModif) dashboardpanel.querySelector('#listenDOM').click();
		if(dashboardpanel.querySelector('#taborder').checked) dashboardpanel.querySelector('#taborder').click();
		ul.querySelectorAll('li:not([id="tab0"])').forEach(li => {li.remove()});
		if(ul.querySelector('#tab0 strong')) ul.querySelector('#tab0 strong').remove();
		document.getElementById('headingsPanel').remove();
		document.getElementById('tests').remove();
		document.querySelector('.analyzeTimer').remove();
		dashboardpanelp.textContent = chrome.i18n.getMessage('msgDashboardResultLoad');
		dashboardpanel.querySelector('#listenDOM').disabled = true;
		dashboardpanel.querySelector('#taborder').disabled = true;
		dashboardpanel.querySelector('label[for="listenDOM"]').style.display = "none";
		dashboardpanel.querySelector('label[for="taborder"]').style.display = "none";
		dashboardpanel.querySelector('#taborder-desc').style.display = "none";
		dashboardpanel.querySelector('#taborder-error').textContent = "";
		document.getElementById('reloadTests').setAttribute('hidden', "true");
		displayResults();
	}

	var obsInterface = false;
	var obsCount = 0;
	var domChangeTime = null;

	function addObsInterface() {
		// add new button on left panel
		var DOMtab = document.createElement('li');
		DOMtab.setAttribute('role', 'tab');
		DOMtab.setAttribute('aria-selected', 'false');
		DOMtab.setAttribute('id', "DOMobserver");
		DOMtab.setAttribute('tabindex', '-1');

		var span = document.createElement('span');
		span.appendChild(document.createTextNode(chrome.i18n.getMessage("DOMchanges")));
		DOMtab.appendChild(span);
		ul.insertBefore(DOMtab, ul.querySelector('#alltests'));

		// create DOM migrations panel right
		var domPanel = document.createElement('div');
		domPanel.setAttribute('role', 'tabpanel');
		domPanel.setAttribute('aria-labelledby', DOMtab.getAttribute('id'));
		domPanel.setAttribute('id', 'tabpanel1');
		domPanel.setAttribute('aria-hidden', 'true');

		DOMtab.setAttribute('aria-controls', domPanel.getAttribute('id'));

		var DOMobservertemplate = document.querySelector('#DOMobserverPanel');
		var domPanelContent = document.importNode(DOMobservertemplate.content, true);
		domPanel.appendChild(domPanelContent);
		domPanel.querySelector('h2').textContent = chrome.i18n.getMessage('DOMchanges');
		var domPanelp = domPanel.querySelector('.DOMobserver-message');
		domPanelp.textContent = chrome.i18n.getMessage('DOMpanelNoChange');
		domPanel.classList.add('domObserver');

		main.children[1].appendChild(domPanel);
		obsInterface = true;
	}

	function delObsInterface() {
		if(document.getElementById("DOMobserver").getAttribute('aria-selected') === "true") document.getElementById("tab0").click();
		if(document.getElementById("DOMobserver")) document.getElementById("DOMobserver").remove();
		document.getElementById("tabpanel1").remove();
		let domMessageEvent = document.getElementById("DOMdashboardMessage");
		if (domMessageEvent) {
			domMessageEvent.remove();
		} else {
			console.log("L'élément avec l'id DOMdashboardMessage n'existe pas dans le DOM");
		}
		obsInterface = false;
		obsCount = 0;
		domChangeTime = null;
	}

	obsMessage = function (request) {
		if (request.command == 'DOMedit') {
			let migObj = JSON.parse(request.migList);
			var migSize = Object.keys(migObj).length;
			
			if(migSize > 0) {
				// obsCount += migSize;
				if(!obsInterface) addObsInterface(migObj);

				let now = new Date();
				let midID = now.getFullYear()+'.'+now.getMonth()+'.'+now.getDate()+'.'+now.getHours()+'.'+now.getMinutes();

				if(domChangeTime != midID) {
					domChangeTime = midID;
					let newtitle = document.createElement('h3');
					let newBtn = document.createElement('button');

					let btnStatus = document.createElement('span');
					btnStatus.className = "status";
					let hour = now.getHours() < 10 ? '0'+now.getHours() : now.getHours();
					let minutes = now.getMinutes() < 10 ? '0'+now.getMinutes() : now.getMinutes();
					btnStatus.textContent = "Modifications du DOM relevées à "+hour+"H"+minutes+", ";
					newBtn.appendChild(btnStatus);

					let strong = document.createElement('strong');
					strong.textContent = migSize;
					newBtn.appendChild(strong);

					let span = document.createElement('span');
					span.textContent = migSize > 1 ? chrome.i18n.getMessage('panelUpdatedElementPlural') : chrome.i18n.getMessage('panelUpdatedElement');
					newBtn.appendChild(span);

					newBtn.setAttribute('aria-expanded', 'false');
					newBtn.setAttribute('aria-controls', midID);
					newBtn.setAttribute('data-action', 'showhide-action');
					newtitle.appendChild(newBtn);
					document.getElementById('tabpanel1').appendChild(newtitle);
	
					var domChangeList = document.createElement('ol');
					domChangeList.id = midID;
					domChangeList.className = 'domChangeList';
					domChangeList.setAttribute('hidden', 'hidden');
				} else {
					var domChangeList = document.getElementById(midID);
				}

				for( var prop in migObj) {
					if(migObj[prop].length === 0) continue;
					obsCount++;
					let newElMigrations;
					if(domChangeList.querySelector('.'+prop)) {
						newElMigrations = domChangeList.querySelector('.'+prop+' div ol');
					}
					else {
						var newEl = document.createElement('li');
						newEl.classList.add(prop);
						newEl.classList.add('item-code');

						let liButton = document.createElement('button');
						liButton.setAttribute('aria-expanded', 'false');
						liButton.setAttribute('data-action', 'showhide-action');
						liButton.classList.add('code', 'dropdownButton', 'domDropdownButton');

						let iconButton = document.createElement('img');
						iconButton.className = "domDisclosureIcon";
						iconButton.alt = "";
						iconButton.src = "./images/arrow.png";
						liButton.appendChild(iconButton);

						let liButtonCode = document.createElement('code');
						let elName = migObj[prop][0] ? migObj[prop][0].el : prop;

						if(migObj[prop][0]) {
							let closeTag = /<\/[^>]+>/g;
							let atts = [/[" ]style="[^"]*"/g, /[" ]on[^=]+="[^"]*"/g, /[" ]rel="[^"]*"/g];
							elName = elName.match(closeTag) ? elName.split(closeTag)[0] : elName;

							atts.forEach(att => {
								if(elName.match(att)) {
									elName = elName.split(att);
									elName = elName.filter(part => !part.match(att));
									elName = elName.join("");
								}
							});

							elName.replace(/"[^"]*"/g, (match, offset, string) => {
								if(match.length > 30) {
									match = match.slice(0, 29)+'…"';
								}
								return match;
							});

							let rgxatt = /[^= ]+="[^"]*"/g;
							let rgxtag = /<[^ ]+/;
							let startTag = elName.match(rgxtag)[0];
							elName = elName.match(rgxatt);

							if(elName.length > 4) {
								let shortElName = [];
								shortElName.push(elName[0], elName[1], elName[2], elName[elName.length-1]);
								elName = shortElName;
							}

							elName = startTag+" "+elName.join(" ")+">";
							formattingCode(elName, liButtonCode);
						}
						else liButtonCode.textContent = elName;
						liButton.appendChild(liButtonCode);

						var newElContainer = document.createElement('div');
						newElContainer.id = prop+'-'+(document.querySelectorAll('#tabpanel1 li').length + 1);
						newElContainer.setAttribute('hidden', 'hidden');

						liButton.setAttribute('aria-controls', newElContainer.id);
						newEl.appendChild(liButton);

						const domNb = prop;
	
						let inspectParagraph = document.createElement('p');
						inspectParagraph.className = "item-actions-inspect";
						inspectParagraph.textContent = chrome.i18n.getMessage('panelActionInspect')+" : ";

						let inspectObj = document.createElement('button');
						inspectObj.className = "visible obsDOM";
						let inspectLabel = document.createElement('span');
						inspectLabel.className = "visually-hidden";
						inspectLabel.textContent = chrome.i18n.getMessage('word_inspect');
						inspectObj.appendChild(inspectLabel);
						const currentSelector = '[data-tng-dom="'+domNb+'"]';

						inspectObj.addEventListener('click', function() {
							chrome.devtools.inspectedWindow.eval("inspect(document.querySelector('"+currentSelector+"'))");
						});
						inspectParagraph.appendChild(inspectObj);
						newElContainer.appendChild(inspectParagraph);

						newElMigrations = document.createElement('ol');
					}

					migObj[prop].forEach(obj => {
						let li = document.createElement('li');
						li.textContent = obj.desc;
	
						if(obj.type > 3) {
							let before = obj.before ? " - "+chrome.i18n.getMessage('word_before')+" : "+obj.before : null;
							let after = obj.after ? " - "+chrome.i18n.getMessage('word_after')+" : "+obj.after : null;

							if(before) {
								li.appendChild(document.createElement('br'));
								li.appendChild(document.createTextNode(before));
							}
							if(after) {
								li.appendChild(document.createElement('br'));
								li.appendChild(document.createTextNode(after));
							}

						} else {
							li.classList.add('item-code');
							if(obj.type == 1) {
								let br = document.createElement('br');
								li.appendChild(br);

								let container = document.createElement('div');
								container.className = "code";

								let codeContainer = document.createElement('code');
								formattingCode(obj.after, codeContainer);
								container.appendChild(codeContainer);

								li.appendChild(container);
							}
							else if(obj.type == 2) {
								let br = document.createElement('br');
								li.appendChild(br);

								let container = document.createElement('div');
								container.className = "code";

								let codeContainer = document.createElement('code');
								formattingCode(obj.before, codeContainer);
								container.appendChild(codeContainer);

								li.appendChild(container);
							}
							else {
								//* Before element
								let beforeParagraph = document.createElement('p');
								beforeParagraph.textContent = chrome.i18n.getMessage('word_before')+":";
								li.appendChild(beforeParagraph);

								let beforeContainer = document.createElement('div');
								beforeContainer.className = "code";

								let codeBeforeContainer = document.createElement('code');
								formattingCode(obj.before, codeBeforeContainer);
								beforeContainer.appendChild(codeBeforeContainer);
								li.appendChild(beforeContainer);

								//* After element
								let afterParagraph = document.createElement('p');
								afterParagraph.textContent = chrome.i18n.getMessage('word_before')+":";
								li.appendChild(afterParagraph);

								let afterContainer = document.createElement('div');
								afterContainer.className = "code";

								let codeAfterContainer = document.createElement('code');
								formattingCode(obj.after, codeAfterContainer);
								afterContainer.appendChild(codeAfterContainer);
								li.appendChild(afterContainer);
							}
						}

						newElMigrations.appendChild(li);
					});

					if(!domChangeList.querySelector('.'+prop)) {
						newElContainer.appendChild(newElMigrations);
						newEl.appendChild(newElContainer);
						domChangeList.appendChild(newEl);
					}
				}
				
				document.getElementById('tabpanel1').appendChild(domChangeList);

				let counterList = document.querySelector('button[aria-controls="'+midID+'"] strong');
				let elCount = domChangeList.querySelectorAll(':scope>li').length;
				counterList.textContent = elCount;
				document.querySelector('button[aria-controls="'+midID+'"] strong+span').textContent = elCount > 1 ? " " + chrome.i18n.getMessage('panelUpdatedElementPlural') : " " + chrome.i18n.getMessage('panelUpdatedElement');
				
				document.querySelector("#tabpanel1 .DOMobserver-message").textContent = chrome.i18n.getMessage('DOMpanelMessage');

				let obsTab = document.getElementById("DOMobserver");
				if(obsTab.querySelector('strong')) {
					let counter = obsTab.querySelector('strong');
					counter.textContent = obsCount;
				} else {
					obsTab.appendChild(document.createTextNode(' '));
					var strong = document.createElement('strong');
					strong.textContent = obsCount;
					obsTab.appendChild(strong);
				}

				if(!document.getElementById("DOMdashboardMessage")) {
					let domMessageDashboard = document.createElement('p');
					domMessageDashboard.textContent = chrome.i18n.getMessage('DOMdashboardMessage');
					domMessageDashboard.id = "DOMdashboardMessage";
					let domButtonDashboard = document.createElement('button');
					domButtonDashboard.textContent = chrome.i18n.getMessage('DOMdashboardButton');
					domButtonDashboard.classList.add('dashboard-dom-button');
					domButtonDashboard.addEventListener('click', function(e) {
						obsTab.click();
						obsTab.focus();
					});
					domMessageDashboard.appendChild(domButtonDashboard);
	
					dashboardpanel.querySelector('.dashboard-content').appendChild(domMessageDashboard);
				}
			}
		}

		if(request.command == "pageChanged") {
			if(dashboardpanel.querySelector('#listenDOM').checked) dashboardpanel.querySelector('#listenDOM').click();
			if(dashboardpanel.querySelector('#taborder').checked) dashboardpanel.querySelector('#taborder').click();
			dashboardpanel.querySelector('#listenDOM').disabled = true;
			dashboardpanel.querySelector('#taborder').disabled = true;

			if(! ul.querySelector('#tab0 strong')) {
				let dashboardStrong = document.createElement('strong');
				dashboardStrong.textContent = "1";
				ul.querySelector('#tab0').appendChild(dashboardStrong);
			}

			let allButtonDomAction = document.querySelectorAll('button[data-action]');
			allButtonDomAction.forEach(btn => {
				if(btn.getAttribute('data-action') === "highlight-action" || btn.getAttribute('data-action') === "inspect-action") {
					btn.disabled = true;
					btn.className = "hidden";
				}
			});

			dashboardpanel.querySelector('.dashboard-message').textContent = chrome.i18n.getMessage('msgDashboardWarning');
		}

		if(request.command == 'resetHighlight') {
			let hlElement = main.children[1].querySelector('.highlightON');
			if(hlElement) hlElement.click();
		}
	}

	/**
	 ** Manage listen DOM switcher
	 */
	function listenDOMchange(e) {
		if(e.target.disabled) return;
		if(e.target.checked) {
			document.querySelector('label[for="listenDOM"] .slider').textContent = chrome.i18n.getMessage('word_yes');

			chrome.runtime.sendMessage({
				tabId: chrome.devtools.inspectedWindow.tabId,
				command: 'obsDOM',
				obs: 'ON',
			}, addObsInterface);
		}
		else {
			document.querySelector('label[for="listenDOM"] .slider').textContent = chrome.i18n.getMessage('word_no');
			
			chrome.runtime.sendMessage({
				tabId: chrome.devtools.inspectedWindow.tabId,
				command: 'obsDOM',
				obs: 'OFF',
			}, delObsInterface);
		}
	}

	/**
	 ** Manage tab order switcher
	 */
	function toggleTabOrder(evt) {
		let element = evt.currentTarget;
		if(element.disabled) return;
		else if(element.checked) {
			chrome.runtime.sendMessage({
				tabId: chrome.devtools.inspectedWindow.tabId,
				command: 'taborder',
				state: 'on'
			}, (response) => {
				if(response.response === "on") {
					document.querySelector('label[for="taborder"] .slider').textContent = chrome.i18n.getMessage('word_yes');
				} else {
					document.querySelector('#taborder-error').textContent = chrome.i18n.getMessage('dashboard_taborder_warning');
					element.checked = false;
					element.disabled = true;
				}
			});
		} else {
			chrome.runtime.sendMessage({
				tabId: chrome.devtools.inspectedWindow.tabId,
				command: 'taborder',
				state: 'off'
			});
			document.querySelector('label[for="taborder"] .slider').textContent = chrome.i18n.getMessage('word_no');
		}
	}
	
	var dashboardpanelbuttonreload = dashboardpanel.querySelector('#reloadTests');
	var dashboardpanelbuttonrestart = dashboardpanel.querySelector('#restartTests');

	dashboardpanelbuttonreload.addEventListener('click', restartAnalyze);
	dashboardpanelbuttonrestart.addEventListener('click', () => {
		if(dashboardpanel.querySelector('#listenDOM').checked) dashboardpanel.querySelector('#listenDOM').click();
		if(dashboardpanel.querySelector('#taborder').checked) dashboardpanel.querySelector('#taborder').click();
		let hlElement = main.children[1].querySelector('.highlightON');
		if(hlElement) hlElement.click();
		window.location.reload();
	});
	/**save */
	dashboardpanel.querySelector('#listenDOM').addEventListener('change', listenDOMchange);
	dashboardpanel.querySelector('#taborder').addEventListener('change', toggleTabOrder);
	dashboardpanelbuttonreload.textContent = chrome.i18n.getMessage('dashboardButtonReload');
	dashboardpanelbuttonrestart.textContent = chrome.i18n.getMessage('dashboardButtonRestart');

	dashboardpanel.querySelector('.listenDOM-label').textContent = chrome.i18n.getMessage('dashboardListenDOMlegend');
	if(listenDomModif) {
		dashboardpanel.querySelector('#listenDOM').checked = true;
		dashboardpanel.querySelector('label[for="listenDOM"] .slider').textContent = chrome.i18n.getMessage('word_yes');
	} else {
		dashboardpanel.querySelector('label[for="listenDOM"] .slider').textContent = chrome.i18n.getMessage('word_no');
	}

	dashboardpanel.querySelector('#listenDOM').disabled = true;
}, false);