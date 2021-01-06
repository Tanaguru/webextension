function handleMessage(request, sender, sendResponse) {
	if (request.command === 'initPopup') {
		
	}
	else if (request.command === 'resetPopup') {
		
	}
	else if (request.command === 'copyClipboard') {
		chrome.notifications.create(
			'', 
			{
				iconUrl: '/ressources/images/tanaguru.png',
				type: 'basic',
				title: request.what,
				message: 'La copie dans le presse-papier a bien été réalisée.'
			}
		);
	}
	else if (request.command === 'executeTests') {
		chrome.tabs.executeScript(request.tabId, { file: '/ressources/scripts/tests/tests.js' }, function (result) {
			sendResponse({ command: 'executeTestsResults', response: result, timer: request.timer });
		});
	}
	else if (request.command == 'downloadTestCsvFile') {
		chrome.downloads.download({
			url: request.data.url,
			filename: request.data.filename,
			saveAs: true
		});
	}
	else if (request.command === 'notify') {
		chrome.browserAction.enable();
		var manifest = chrome.runtime.getManifest();
		if (request.count > 0) {
			var counttext = request.count > 99 ? '+99' : request.count.toString();
			chrome.browserAction.setBadgeText({ text: counttext });
			chrome.browserAction.setTitle({ title: manifest.browser_action.default_title + ' (' + request.count + ' erreurs)' });
		}
		else {
			chrome.browserAction.setBadgeText({ text: '' });
			chrome.browserAction.setTitle({ title: manifest.browser_action.default_title });
		}
	}
	else if (request.command == 'highlight') {
		chrome.tabs.insertCSS(request.tabId, {
			file: '/ressources/styles/highlight.css'
		});
		chrome.tabs.executeScript(request.tabId, {
		    code: 'var element = "' + request.element + '";'
		}, function() {
		    chrome.tabs.executeScript(request.tabId, {file: '/ressources/scripts/highlight.js'});
		});
	}
	return true;
}

chrome.runtime.onMessage.addListener(handleMessage);






/* Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to tabs.onUpdated events to be notified when a URL is set. */
function handleActivated(activeInfo) {
	console.log("Tab " + activeInfo.tabId + " was activated.");
	var manifest = chrome.runtime.getManifest();
	chrome.browserAction.setBadgeText({ text: '' });
	chrome.browserAction.setTitle({ title: manifest.browser_action.default_title });
	
	// détecter si le panneau devtools est affiché...
	
}
chrome.tabs.onActivated.addListener(handleActivated);

/* Fired when a tab is updated. */
function handleUpdated(tabId, changeInfo, tabInfo) {
  
  //var gettingCurrent = chrome.tabs.getCurrent();
  //gettingCurrent.then(onGot, onError);
  
  console.log("Tab " + tabId + " was updated.");
  console.log("Updated tab: " + tabId);
  console.log("Changed attributes: " + changeInfo);
  console.log("New tab Info: " + tabInfo);
  
  //chrome.devtools.reload();
  
}
chrome.tabs.onUpdated.addListener(handleUpdated);
