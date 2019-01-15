function handleMessage(request, sender, sendResponse) {
	if (request.command === 'initPopup') {
		
	}
	else if (request.command === 'resetPopup') {
		
	}
	else if (request.command === 'executeTests') {
		return browser.tabs.executeScript(request.tabId, { file: '/ressources/scripts/tests.js' });
	}
	else if (request.command == 'downloadTestCsvFile') {
		browser.downloads.download({
			url: request.data.url,
			filename: request.data.filename,
			saveAs: true
		});
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
			file: '/ressources/styles/highlight.css'
		});
		browser.tabs.executeScript(request.tabId, {
		    code: 'var element = "' + request.element + '";'
		}, function() {
		    browser.tabs.executeScript(request.tabId, {file: '/ressources/scripts/highlight.js'});
		});
	}
}

browser.runtime.onMessage.addListener(handleMessage);






/* Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to tabs.onUpdated events to be notified when a URL is set. */
function handleActivated(activeInfo) {
	console.log("Tab " + activeInfo.tabId + " was activated.");
	var manifest = browser.runtime.getManifest();
	browser.browserAction.setBadgeText({ text: '' });
	browser.browserAction.setTitle({ title: manifest.browser_action.default_title });
	
	// détecter si le panneau devtools est affiché...
	
}
browser.tabs.onActivated.addListener(handleActivated);

/* Fired when a tab is updated. */
function handleUpdated(tabId, changeInfo, tabInfo) {
  
  //var gettingCurrent = browser.tabs.getCurrent();
  //gettingCurrent.then(onGot, onError);
  
  console.log("Tab " + tabId + " was updated.");
  console.log("Updated tab: " + tabId);
  console.log("Changed attributes: " + changeInfo);
  console.log("New tab Info: " + tabInfo);
  
  browser.devtools.reload();
  
}
browser.tabs.onUpdated.addListener(handleUpdated);