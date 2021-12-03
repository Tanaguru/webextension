const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const {zip} = require('zip-a-folder')

const VERSION_FILE = path.join(__dirname, 'VERSION.txt')

const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

const REFERENCES_DIR = path.join(SRC_DIR,'references')

const SCRIPT_DIR = path.join(SRC_DIR, 'ressources', 'scripts')
const TEST_DIR = path.join(SCRIPT_DIR, 'tests')

function clean(){
    if (fs.existsSync(DIST_DIR)) {
        console.log('Clean dist directory : ' + DIST_DIR)
        fs.rmdirSync(DIST_DIR, {recursive: true})
    }
    fs.mkdirSync(DIST_DIR)
}

function buildManifest(manifest, version, reference){
    console.log('Build manifest')
    manifest.version = version
    manifest.short_name = "Tanaguru webext " + reference.toUpperCase()
    return JSON.stringify(manifest)
}

function copySources(dir){
    console.log('Copy sources in ' + dir)
    fse.copySync(
        SRC_DIR,
        dir,
        {
            recursive: true,
            filter: (src, dest) => {
                return !src.includes(REFERENCES_DIR) && !src.includes(TEST_DIR) && !src.includes("manifest.js");
            }
        }
    )
}

function buildScripts(refName){
    let testFolder = fs.readdirSync(path.join(REFERENCES_DIR, refName));
    let script = ""
    if(fs.existsSync(path.join(REFERENCES_DIR, refName))){
        script = fs.readFileSync(path.join(TEST_DIR, 'contrasts.js'));
        script += '\n';
        script += fs.readFileSync(path.join(TEST_DIR, 'content.js'));
        script += '\n';
        script+= fs.readFileSync(path.join(REFERENCES_DIR, refName, refName+'-init.js'));
        script += '\n';
        testFolder.forEach(testFile => {
            if(testFile != refName+'-init.js') {
                script+= fs.readFileSync(path.join(REFERENCES_DIR, refName, testFile));
                script += '\n';
            }
        });
        script += fs.readFileSync(path.join(TEST_DIR, 'init-tests.js'))
    }else{
        console.error("Test file ", refName, ' does not exist')
    }
    return script
}


console.log('Start build')
clean();
// build manifests
let version = fs.readFileSync(VERSION_FILE).toString().trim();
let manifest = Object.assign({}, require(path.join(SRC_DIR, 'manifest.json')));
let references = fs.readdirSync(REFERENCES_DIR);

let test_contents = {}
for(const reference of references){
    console.log("Create script for reference " + reference)
    test_contents[reference] = buildScripts(reference);
}

for(const reference of references){
    let manifestContent = buildManifest(manifest, version, reference);
    let dir = path.join(DIST_DIR, 'tanaguru-' + reference + '-' + version)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
        path.join(dir, 'manifest.json'),
        manifestContent);
    copySources(dir);

    fs.mkdirSync(path.join(dir, 'ressources', 'scripts', 'tests'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'ressources', 'scripts', 'tests', 'tests.js'), test_contents[reference]);
    zip(dir, dir + ".zip");
}

console.log('Build finished')
