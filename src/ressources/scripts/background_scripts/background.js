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
	chrome.action.setBadgeText({ text: '' });
	chrome.action.setTitle({ title: manifest.action.default_title });
}
chrome.tabs.onActivated.addListener(handleActivated);

/* Fired when a tab is updated. */
function handleUpdated(tabId, changeInfo, tabInfo) {
	if(changeInfo.hasOwnProperty('url')) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			func: () => {
				window.obs = "OFF";
			}
		  })
		  .then(() => {
			return chrome.scripting.executeScript({
			  target: { tabId: tabId },
			  files: ['/ressources/scripts/obsDOM.js']
			});
		  })
		  .catch((error) => {
			console.error("Erreur lors de l'injection du script obsDOM : ", error);
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
		chrome.scripting.executeScript({
			target: { tabId: request.tabId },
			func: (cat, statusUser, first, last) => {
				window.cat = cat;
				window.statusUser = statusUser;
				window.first = first;
				window.last = last;
			},
			args: [request.cat, request.statusUser, request.first, request.last]
		})
		.then(() => {
			return chrome.scripting.executeScript({
				target: { tabId: request.tabId },
				files: ['/ressources/scripts/tests/tests.js']
			});
		})
		.then((result) => {
			sendResponse({ command: 'executeTestsResults', response: result });
		})
		.catch((error) => {
			console.error("Erreur lors de l'injection du script de tests : ", error);
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
		chrome.action.enable();
		var manifest = chrome.runtime.getManifest();
		if (request.count > 0) {
			var counttext = request.count > 99 ? '+99' : request.count.toString();
			chrome.action.setBadgeText({ text: counttext });
			chrome.action.setTitle({ title: manifest.action.default_title + ' (' + request.count + ' erreurs)' });
		}
		else {
			chrome.action.setBadgeText({ text: '' });
			chrome.action.setTitle({ title: manifest.action.default_title });
		}
	}
	else if (request.command == 'highlight') {
		chrome.scripting.insertCSS({
			files: ['/ressources/styles/highlight.css'],
			target: { tabId: request.tabId }
		});
		chrome.scripting.executeScript({
			target: { tabId: request.tabId },
			func: (element) => {
				window.element = element;
			},
			args: [request.element]
		})
		.then(() => {
			return chrome.scripting.executeScript({
				target: { tabId: request.tabId },
				files: ['/ressources/scripts/highlight.js']
			});
		})
		.then((hlResponse) => {
			sendResponse({ command: 'executeHighlight', response: hlResponse });
		})
		.catch((error) => {
			console.error("Erreur lors de l'injection des scripts Highlight :", error);
		});
	}
	else if (request.command === 'taborder') {
		chrome.scripting.executeScript({
			target: { tabId: request.tabId },
			func: (state) => {
				window.state = state;
			},
			args: [request.state]
		})
		.then(() => {
			return chrome.scripting.executeScript({
				target: { tabId: request.tabId },
				files: ['/ressources/scripts/tabOrder.js']
			});
		})
		.then((tabResponse) => {
			sendResponse({ command: 'executeTabOrder', response: tabResponse[0].result });
		})
		.catch((error) => {
			console.error("Erreur lors de l'injection des scripts de tabOrder :", error);
		});
	}
	else if (request.command == 'obsDOM') {
		chrome.scripting.executeScript({
			target: { tabId: request.tabId },
			func: (obs, requestTabId) => {
				window.obs = obs;
				window.requestTabId = requestTabId;
			},
			args: [request.obs, request.tabId]
		})
		.then(() => {
			return chrome.scripting.executeScript({
				target: { tabId: request.tabId },
				files: ['/ressources/scripts/obsDOM.js']
			});
		})
		.then((results) => {
			const result = results && results[0] && results[0].result ? results[0].result : null;
			sendResponse({ command: 'executeDOMobserver', response: result, obs: request.obs });
		})
		.catch((error) => {
			console.error("Erreur lors de l'injection des scripts d\'observation du DOM : ", error);
		});
		return true; 
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
		var tabInfo = {
			tabId: request.tabId,
			lang: null,
			url: null
		};

		chrome.tabs.detectLanguage(tabInfo.tabId, (lg) => {
			tabInfo.lang = lg;
		});

		chrome.tabs.get(tabInfo.tabId, tab => {
			tabInfo.url = tab.url;
			sendResponse({ command: 'executeTabInfos', response: tabInfo });
		});

		// zoom 200%
		// chrome.tabs.setZoom(request.tabId, 2);
	}

	if(request.command != 'newMigration') return true;
}
chrome.runtime.onMessage.addListener(handleMessage);
