var statuses = ['failed', 'cantTell', 'passed'];
for (var i = 0; i < tanaguruTestsList.length; i++) {
	/*
		Schéma des clefs :
		testIdName
		testIdExplanationsPassed
		testIdExplanationsFailed
		testIdExplanationsCantTell
		---
		name: '',
		explanations: { 'passed': '', 'failed': '' }
	*/
	var test = tanaguruTestsList[i];
	if (!test.hasOwnProperty('name')) {
		test.name = browser.i18n.getMessage('test' + test.id + 'Name');
	}
	if (!test.hasOwnProperty('explanations')) {
		var explanations = [];
		for (var j = 0; j < statuses.length; j++) {
			var statusname = statuses[j];
			statusname = statusname[0].toUpperCase() + statusname.substring(1);
			var message = browser.i18n.getMessage('test' + test.id + 'Explanations' + statusname);
			if (message) {
				explanations.push({ id: statuses[j], text: message });
			}
		}
		if (explanations.length > 0) {
			test.explanations = {};
			for (var j = 0; j < explanations.length; j++) {
				test.explanations[explanations[j].id] = explanations[j].text;
			}
		}
	}
	createTanaguruTest(test);
}