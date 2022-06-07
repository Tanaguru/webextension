const fs = require('fs');
const path = require('path');
const replace = require("replace");

const SRC_DIR = path.join(__dirname, 'src')
const REFERENCES_DIR = path.join(SRC_DIR, 'references')
const LOCALES_DIR = path.join(SRC_DIR, '_locales')

var rgaa_dir = fs.readdirSync(path.join(REFERENCES_DIR, 'rgaa4'));
var wcag_dir = fs.readdirSync(path.join(REFERENCES_DIR, 'wcag'));

var rgx_test = /(name|['"]?passed['"]?|['"]?failed['"]?|description)\s?:\s?[`"'].+[`"'],?/g;
var strings = [];

rgaa_dir.forEach(test_file => {
    if(test_file != 'rgaa4-init.js') {
        normalizeString(test_file);

        let theme = test_file.substring(0, test_file.length - 3);
        let script = fs.readFileSync(path.join(REFERENCES_DIR, 'rgaa4', test_file));
        let ref = {};

        let matchedStrings = script.toString().match(rgx_test);
        matchedStrings = matchedStrings.filter(x => !x.match(/locale__/));
        matchedStrings = matchedStrings.map(extractString);
        
        matchedStrings.forEach(match => {
            match = match.split("___tng___");

            let locales = new RegExp("locale__"+theme+"_"+match[0], 'g');
            if(match[0] in ref) ref[match[0]] = ref[match[0]] + 1;
            else ref[match[0]] = script.toString().match(locales).length+1;
            
            strings.push({[theme+"_"+match[0]+"_"+ref[match[0]]]: match[1].replace("\'", "'")});
        });
    }
});

fs.readFile(path.join(LOCALES_DIR, 'fr', 'messages.json'), (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);

    strings.forEach(string => {
        let key = Object.keys(string)[0];
        let value = Object.values(string)[0];
        let messages = Object.values(data).map(el => Object.values(el)[0]);
        var dataKey;
        
        if (messages.includes(value)) {
            dataKey = Object.keys(data).find(k => data[k].message === value);
        }
        else {
            data[key] = {"message": value}
            dataKey = key;
        }

        let stringFile = dataKey.split('_')[0]+".js";
        let stringProp = dataKey.split('_')[1];
        let reprgx = "[\"']?"+stringProp+"[\"']?\\s?:\\s?[\"`']"+escRegex(value)+"[\"`']";

        replace({
            regex: new RegExp(reprgx, "g"),
            replacement: stringProp+": 'locale__"+dataKey+"'",
            paths: [path.join(REFERENCES_DIR, 'rgaa4', stringFile)],
            recursive: true,
            silent: true,
        });
    });

    console.log("Tests file rewrited !");

    let dataStringified = JSON.stringify(data, null, 2);

    fs.writeFile(path.join(LOCALES_DIR, 'fr', 'messages.json'), dataStringified, (err) => {
        if (err) throw err;
        console.log('Locales keys updated !');
    });
});

function extractString(str) {
    let property = str.match(/[^\s]+\s?:/)[0];
    property = property.substring(0, property.length - 1).trim();
    property = (property.startsWith("'") || property.startsWith('"')) ? property.substring(1, property.length -1) : property;

    let rgx = new RegExp(`'?"?${property}'?"?\s?:\s?`);
    str = str.split(rgx)[1].trim();
    str = str.endsWith(",") ? str.substring(1, str.length - 2) : str.substring(1, str.length - 1)

    return property+"___tng___"+str;
}

function escRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeString(test_file) {
    let rgxstr = /((?:name|description|(?:'|")passed(?:'|")|(?:'|")failed(?:'|"))\s?:\s?)(')((?:[^\\']+(?:\\')?)*)(')/g;
    replace({
        regex: rgxstr,
        replacement: '$1"$3"',
        paths: [path.join(REFERENCES_DIR, 'rgaa4', test_file)],
        silent: true
    });

    var matched = true;
    var data;

    function updateData() {
        data = fs.readFileSync(path.join(REFERENCES_DIR, 'rgaa4', test_file)).toString();
    }

    var rgxquote = /((?:name|description|(?:'|")passed(?:'|")|(?:'|")failed(?:'|"))\s?:\s?)([`"][^\\]+)(\\')([^`]+[`"])/g;
    var rgxdbquote = /(\s*)((?:name|description|(?:'|")passed(?:'|")|(?:'|")failed(?:'|"))\s?:\s?)("[^\n]+)(")([^"\n]*")(,?\n)/g
    
    while(matched) {
        updateData();

        if(data.match(rgxquote) || data.match(rgxdbquote)) {
            if(data.match(rgxquote)) {
                replace({
                    regex: rgxquote,
                    replacement: "$1$2'$4",
                    paths: [path.join(REFERENCES_DIR, 'rgaa4', test_file)],
                    silent: true
                });
            }

            if(data.match(rgxdbquote)) {
                replace({
                    regex: rgxdbquote,
                    replacement: '$1$2$3\\"$5$6',
                    paths: [path.join(REFERENCES_DIR, 'rgaa4', test_file)],
                    silent: true
                });
            }
        } else matched = false;
    }
}