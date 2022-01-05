/* Tanaguru in DevTools */
var manifest = chrome.runtime.getManifest();

function initTab(newPanel) {
	var _window;
	var data = [];
	var port = chrome.runtime.connect({name: 'devtools'});
	port.onMessage.addListener(function(msg) {
		if (_window) {
			_window.obsMessage(msg);
		} else {
			data.push(msg);
		}
	});

	function tmp(panelWindow) {
		newPanel.onShown.removeListener(tmp);
		_window = panelWindow;
		var msg;
		while (msg = data.shift()) _window.obsMessage(msg);
	}

	newPanel.onShown.addListener(tmp);
}

chrome.devtools.panels.create(
	manifest.short_name,
	'/ressources/images/icons/tanaguru-32-dark.png',
	'/devtools/panel/tanaguru-devtools-panel.html',
	(newPanel) => {initTab(newPanel);}
);