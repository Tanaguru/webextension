var element = document.querySelector(element);
if (!element.hasAttribute('data-tanaguruhighlight')) {
	var rect = element.getBoundingClientRect();
	element.setAttribute('data-tanaguruhighlight', 'true');
	window.scrollTo(0, rect.top);
}
else {
	element.removeAttribute('data-tanaguruhighlight');
	window.scrollTo(0, 0);
}