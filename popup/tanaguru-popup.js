document.addEventListener('DOMContentLoaded', function(event) {
	/*
	var gettingBadgeText = browser.browserAction.getBadgeText({});
	gettingBadgeText.then(function (text) {
		var span = document.querySelectorAll('span');
		if (text.length > 0) {
			span[0].replaceChild(document.createTextNode("consulter les résultats d'analyse de cette page"), span[0].firstChild);
			span[2].replaceChild(document.createTextNode("expertisez"), span[2].firstChild);
		}
	});
	*/
	
	
	
	
	
	// Ce navigateur supporte template.
	if ('content' in document.createElement('template')) {
		var html = document.querySelector('html');
		html.setAttribute('lang', browser.i18n.getMessage('extensionLang'));
		var template = document.getElementById('popup');
		template = template.content;
		var manifest = browser.runtime.getManifest();
		var span = template.querySelectorAll('span');
		for (var i = 0; i < span.length; i++) {
			var data = span[i].firstChild.nodeValue.split('.');
			var content = (data[0] == 'manifest' ? manifest[data[1]] : browser.i18n.getMessage(data[1]));
			
			span[i].innerHTML = content;
		}
		document.body.appendChild(document.importNode(template, true));
		
		
		
		/*
		// On insère le nom, la version et la description de la webextension.
		var name = template.querySelector('header h1');
		name.replaceChild(document.createTextNode(manifest.name + ' '), name.firstChild)
		var version = name.querySelector('small');
		version.textContent = manifest.version;
		var description = template.querySelector('header p');
		description.textContent = manifest.description;
		// On insère les instructions et l'accès au site web.
		var instructions = template.querySelector('main p');
		instructions.textContent = browser.i18n.getMessage('msgInstructions');
		var website = template.querySelector('main p:last-child');
		website.textContent = browser.i18n.getMessage('msgWebsite')
		
		*/
		
		
		
		/*
			var main = document.querySelector('main');
			var p = document.createElement('p');
			p.appendChild(document.createTextNode(browser.i18n.getMessage("extensionMore")));
			var a = document.createElement('a');
			a.setAttribute('href', manifest.homepage_url);
			a.setAttribute('target', '_blank');
			a.appendChild(document.createTextNode(manifest.homepage_url.replace(/^http:\/\/www\.|^http:\/\//, '').replace(/\/$/, '')));
			a.setAttribute('title', a.firstChild.nodeValue + browser.i18n.getMessage("extensionNewWindow"));
			p.appendChild(a);
			p.appendChild(document.createTextNode('.'));
			main.appendChild(p);
		*/
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}, false);