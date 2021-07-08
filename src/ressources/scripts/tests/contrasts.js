var tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
var textNodeList = [];
while (tw.nextNode()) {
	var cn = tw.currentNode;
	var element = cn.parentNode;
	var o = { tag: element.tagName.toLowerCase(), xpath: getXPath(element), text: cn.nodeValue, foreground: window.getComputedStyle(element, null).getPropertyValue('color'), background: window.getComputedStyle(element, null).getPropertyValue('background-color') };
	if (['noscript', 'script', 'style'].indexOf(o.tag) == -1 && o.foreground.match(/^rgb\(/) && o.background.match(/^rgb\(/) && o.text.trim().length > 0) {
		textNodeList.push(o);
	}
}
textNodeList;