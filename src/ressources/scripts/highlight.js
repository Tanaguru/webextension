var el = document.querySelector(element);
if(el) {
	if(el.offsetHeight < 2 || el.offsetWidth < 2) el = el.parentNode;
	if(el.hasAttribute('data-tanaguruhighlight')) cleanHighlight();
	else runHighlight();
} else {
	let previousHighlight = document.querySelector('[data-tanaguruhighlight]');
	if(previousHighlight) previousHighlight.removeAttribute('data-tanaguruhighlight');
	document.querySelectorAll('[data-tng-nohl]').forEach(nohl => {
		nohl.removeAttribute('data-tng-nohl');
	});
}

function runHighlight() {
	let previousHighlight = document.querySelector('[data-tanaguruhighlight]');
	if(previousHighlight) previousHighlight.removeAttribute('data-tanaguruhighlight');
	document.querySelectorAll('[data-tng-nohl]').forEach(nohl => {
		nohl.removeAttribute('data-tng-nohl');
	});
	
	el.setAttribute('data-tanaguruhighlight', 'true');
	var rect = el.getBoundingClientRect();
	window.scrollTo(0, rect.top);
	if(el == document.body) return;
	var elements = document.body.children;
	filterParents(elements);
}

function filterParents(collectionHTML) {
	var eureka = false;
	for(let i = 0; i < collectionHTML.length; i++) {
		if(['noscript', 'script', 'style'].indexOf(collectionHTML[i].tagName.toLowerCase()) == -1) {
			if(collectionHTML[i] == el) {
				eureka = true;
				continue;
			}
			else if(collectionHTML[i].querySelector('[data-tanaguruhighlight]')) {
				if(!eureka) {
					var subElements = collectionHTML[i].children;
					filterParents(subElements);
				}
			}
			else {
				collectionHTML[i].setAttribute('data-tng-nohl', 'true');
			}
		}
	}
}

function cleanHighlight() {
	el.removeAttribute('data-tanaguruhighlight');
	document.querySelectorAll('[data-tng-nohl]').forEach(nohl => {
		nohl.removeAttribute('data-tng-nohl');
	});
}
