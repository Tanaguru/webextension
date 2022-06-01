var ports = [];
function handleConnect(port) {
	if (port.name !== "devtools") return;
	ports.push(port);
	port.onDisconnect.addListener(() => {
		var i = ports.indexOf(port);
		if (i !== -1) ports.splice(i, 1);
	});
}
chrome.runtime.onConnect.addListener(handleConnect);

/**
 * ? Send message to devtools_page
 */
function notifyDevtools(msg) {
    ports.forEach(function(port) {
        port.postMessage(msg);
    });
}

/* Fires when the active tab in a window changes. */
function handleActivated(activeInfo) {
	chrome.tabs.query({active: true, currentWindow: true}, tabInfo => {
		if(tabInfo[0].url) {
			notifyDevtools({
				command: 'resetHighlight',
				tabId: activeInfo.tabId
			});
		}
	});
	
	var manifest = chrome.runtime.getManifest();
	chrome.browserAction.setBadgeText({ text: '' });
	chrome.browserAction.setTitle({ title: manifest.browser_action.default_title });
}
chrome.tabs.onActivated.addListener(handleActivated);

/* Fired when a tab is updated. */
function handleUpdated(tabId, changeInfo, tabInfo) {
	if(changeInfo.hasOwnProperty('url')) {
		chrome.tabs.executeScript(tabId, {
		    code: 'var obs = "OFF";'
		}, function() {
			chrome.tabs.executeScript(tabId, { file: '/ressources/scripts/obsDOM.js' });
		});

		notifyDevtools({
			command: 'pageChanged',
			tabId: tabId
		});

		notifyDevtools({
			command: 'resetHighlight',
			tabId: tabId
		});
	}
}
chrome.tabs.onUpdated.addListener(handleUpdated);

function handleMessage(request, sender, sendResponse) {
	if (request.command === 'copyClipboard') {
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
		chrome.tabs.executeScript(request.tabId, {
		    code: 'var cat = "' + request.cat + '"; var statusUser = "' + request.statusUser + '"; var first = "' + request.first + '"; var last = "' + request.last + '";'
		}, function() {
			chrome.tabs.executeScript(request.tabId, { file: '/ressources/scripts/tests/tests.js' }, function (result) {
				sendResponse({ command: 'executeTestsResults', response: result });
			});
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
		    chrome.tabs.executeScript(request.tabId, {file: '/ressources/scripts/highlight.js'}, (hlResponse)=> {
				sendResponse({ command: 'executeHighlight', response: hlResponse });
			});
		});
	}
	else if (request.command == 'taborder') {
		chrome.tabs.executeScript(request.tabId, {file: '/ressources/scripts/tabOrder.js'}, (tabResponse)=> {
			sendResponse({ command: 'executeTabOrder', response: tabResponse });
		});
	}
	else if (request.command == 'obsDOM') {
		chrome.tabs.executeScript(request.tabId, {
		    code: 'var obs = "' + request.obs + '"; var requestTabId = "' + request.tabId + '";',
		}, function() {
			chrome.tabs.executeScript(request.tabId, { file: '/ressources/scripts/obsDOM.js' }, function (result) {
				sendResponse({ command: 'executeDOMobserver', response: result });
			});
		});
	}
	else if (request.command == 'newMigration') {
		notifyDevtools({
			command: 'DOMedit',
			tabId: request.tabId,
			migList: request.migList
		});
	}
	else if (request.command == 'resetPanel') {
		notifyDevtools({
			command: 'resetHighlight',
			tabId: request.tabId
		});
	}
	else if (request.command == 'tabInfos') {
		var tabInfo = [{tabId: request.tabId}];

		chrome.tabs.detectLanguage(request.tabId, (lg) => {
			tabInfo.push({lang: lg});
			chrome.tabs.get(request.tabId, tab => {
				tabInfo.push({url: tab.url});
				sendResponse({ command: 'executeTabInfos', response: tabInfo });
			});
		});

		// zoom 200%
		// chrome.tabs.setZoom(request.tabId, 2);
	}

	if(request.command != 'newMigration') return true;
}
chrome.runtime.onMessage.addListener(handleMessage);
