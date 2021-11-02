var hlResponse;
if(!element) {
	let previousHighlight = document.querySelector('[data-tanaguruhighlight]');
	if(previousHighlight) previousHighlight.removeAttribute('data-tanaguruhighlight');
	document.querySelectorAll('[data-tng-nohl]').forEach(nohl => {
		nohl.removeAttribute('data-tng-nohl');
	});
	hlResponse = "off";
}

else {
	var element = document.querySelector(element);
	if(element.offsetHeight < 2 || element.offsetWidth < 2) element = element.parentNode;
	if(element.hasAttribute('data-tanaguruhighlight')) cleanHighlight();
	else runHighlight();
}

function runHighlight() {
	let previousHighlight = document.querySelector('[data-tanaguruhighlight]');
	if(previousHighlight) previousHighlight.removeAttribute('data-tanaguruhighlight');
	document.querySelectorAll('[data-tng-nohl]').forEach(nohl => {
		nohl.removeAttribute('data-tng-nohl');
	});
	
	element.setAttribute('data-tanaguruhighlight', 'true');
	var rect = element.getBoundingClientRect();
	window.scrollTo(0, rect.top);
	if(element == document.body) return;
	var elements = document.body.children;
	filterParents(elements);
}

function filterParents(collectionHTML) {
	var eureka = false;
	for(let i = 0; i < collectionHTML.length; i++) {
		if(['noscript', 'script', 'style'].indexOf(collectionHTML[i].tagName.toLowerCase()) == -1) {
			if(collectionHTML[i] == element) {
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
	hlResponse = "on";
}

function cleanHighlight() {
	element.removeAttribute('data-tanaguruhighlight');
	document.querySelectorAll('[data-tng-nohl]').forEach(nohl => {
		nohl.removeAttribute('data-tng-nohl');
	});
	hlResponse = "off";
}

hlResponse;