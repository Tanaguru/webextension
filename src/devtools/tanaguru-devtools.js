/* Tanaguru in DevTools */
var manifest = chrome.runtime.getManifest();

function initTab(newPanel, tabId) {
	var _window;
	var data = {};
	var port = chrome.runtime.connect({name: 'devtools'});

	function tmp(panelWindow) {
		newPanel.onShown.removeListener(tmp);
		_window = panelWindow;
		var msg;
		if(data[tabId]) {
			while(msg = data[tabId].shift()) _window.obsMessage(msg);
		}
	}
	newPanel.onShown.addListener(tmp);

	function sendStoreMsg(msg) {
		if (_window && tabId == msg['tabId']) {
			_window.obsMessage(msg);
		} else if(msg['command'] == 'DOMedit') {
			if(!data[tabId]) data[tabId] = [];
			data[tabId].push(msg);
		}
	}
	port.onMessage.addListener(sendStoreMsg);
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

var sending = sendMessage({
	command: 'tabInfos',
	tabId: chrome.devtools.inspectedWindow.tabId
});
sending.then(response => {
	console.log(response.response);
	if(response.response.url) {
		chrome.devtools.panels.create(
			manifest.short_name,
			'/ressources/images/icons/tanaguru-32-dark.png',
			'/devtools/panel/tanaguru-devtools-panel.html',
			newPanel => initTab(newPanel, response.response.tabId)
		);
	}
});
  