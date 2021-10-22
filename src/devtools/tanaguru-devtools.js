function handleShown() {
	// browser.runtime.sendMessage({
	// 	tabId: browser.devtools.inspectedWindow.tabId,
	// 	command: 'initPopup'
	// });
}

function handleHidden() {
	chrome.runtime.sendMessage({
		tabId: browser.devtools.inspectedWindow.tabId,
		command: 'resetPanel'
	});
}

/* Tanaguru in DevTools */
var manifest = chrome.runtime.getManifest();
chrome.devtools.panels.create(
	manifest.short_name,
	'/ressources/images/icons/tanaguru-32-dark.png',
	'/devtools/panel/tanaguru-devtools-panel.html',
	(newPanel) => {
		// newPanel.onShown.addListener(handleShown);
		newPanel.onHidden.addListener(handleHidden);
	}
);
