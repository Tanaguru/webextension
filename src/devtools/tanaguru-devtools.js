function handleShown() {
	// browser.runtime.sendMessage({
	// 	tabId: browser.devtools.inspectedWindow.tabId,
	// 	command: 'initPopup'
	// });
}

function handleHidden() {
	browser.runtime.sendMessage({
		tabId: browser.devtools.inspectedWindow.tabId,
		command: 'resetPanel'
	});
}

/* Tanaguru in DevTools */
var manifest = browser.runtime.getManifest();
browser.devtools.panels.create(
	manifest.short_name,
	'/ressources/images/icons/tanaguru-32-dark.png',
	'/devtools/panel/tanaguru-devtools-panel.html',
	(newPanel) => {
		// newPanel.onShown.addListener(handleShown);
		newPanel.onHidden.addListener(handleHidden);
	}
);
