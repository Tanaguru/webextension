const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src')
const REFERENCES_DIR = path.join(SRC_DIR, 'references')
var rgaa_dir = fs.readdirSync(path.join(REFERENCES_DIR, 'rgaa4'));

var script = {
    tested: {
        failed: [],
        passed: [],
        both: []
    }, 
    cantTell: [], 
    untested: []
};

rgaa_dir.forEach(testFile => {
    if(testFile !='rgaa4-init.js') {
        script[testFile] = fs.readFileSync(path.join(REFERENCES_DIR, 'rgaa4', testFile)).toString();
    }
});

var rgxStatus = /(?!tanaguruTestsList\.push\()((?:testStatus|status)(?:\s?:\s?)(?:['"].+['"]))|(?:(?:expectedNbElements\s?:\s?{?\D*\d}?)|(?:analyzeElements\s?:\s?function))/g;
var rgxTest = /(?!tanaguruTestsList\.push\()(?:ressources\s?:\s?{\s*['"]rgaa['"]\s?:\s?\[)([^\]]+)/g;

for(var theme in script) {
    if(theme.match(/(tested)|(cantTell)|(untested)/)) continue;
    var datas = script[theme].replace(/\/\/.*/g, "");
    var result = {};
    var statuses = datas.match(rgxStatus);
    var tests = datas.match(rgxTest).map(source => source.match(/(\d+\.\d+\.\d+)+/g));

    for(let i = 0; i < tests.length; i++) {
        tests[i].forEach(t => {
            if(!result[t]) result[t] = statuses[i]
            else result[t] += "__"+statuses[i];
        });
    }

    for(var i in result) {
        if(result[i].match('analyzeElements') || result[i].match('expectedNbElements')) script.tested.both.push(i)
        else if(result[i].match('failed')) script.tested.failed.push(i)
        else if(result[i].match('passed')) script.tested.passed.push(i)
        else if(result[i].match('cantTell')) script.cantTell.push(i)
        else script.untested.push(i)
    }

    delete script[theme];
}

script["total"] = "Testés -> "+script.tested.length+" / Indéterminés -> "+script.cantTell.length+" / Non testées -> "+script.untested.length

var stats = JSON.stringify(script, null, 2);

fs.writeFile('stats.json', stats, (err) => {
    if (err) throw err;
    console.log('Stats updated !');
});
