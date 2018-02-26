function handleMessage(request, sender, sendResponse) {
	if (request.command === 'disablePopup') {
		browser.browserAction.disable();
	}
	else if (request.command === 'enablePopup') {
		browser.browserAction.enable();
	}
	else if (request.command === 'analyze') {
		return browser.tabs.executeScript(request.tabId, { file: '/common/scripts/analyze.js' });
	}
	else if (request.command === 'notify') {
		browser.browserAction.enable();
		var manifest = browser.runtime.getManifest();
		if (request.count > 0) {
			var counttext = request.count > 99 ? '+99' : request.count.toString();
			browser.browserAction.setBadgeText({ text: counttext });
			browser.browserAction.setTitle({ title: manifest.browser_action.default_title + ' (' + request.count + ' erreurs)' });
		}
		else {
			browser.browserAction.setBadgeText({ text: '' });
			browser.browserAction.setTitle({ title: manifest.browser_action.default_title });
		}
	}
	else if (request.command == 'highlight') {
		browser.tabs.insertCSS(request.tabId, {
			file: '/common/styles/highlight.css'
		});
		browser.tabs.executeScript(request.tabId, {
		    code: 'var element = "' + request.element + '";'
		}, function() {
		    browser.tabs.executeScript(request.tabId, {file: '/common/scripts/highlight.js'});
		});
	}
}

browser.runtime.onMessage.addListener(handleMessage);