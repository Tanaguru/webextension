const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const {zip} = require('zip-a-folder')

const VERSION_FILE = path.join(__dirname, 'VERSION.txt')

const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

const REFERENCES_DIR = path.join(SRC_DIR,'references')
const MANIFESTS_DIR = path.join(SRC_DIR,'manifests')
const COMMON_MANIFEST_FILE_NAME = 'common_manifest.json'

const SCRIPT_DIR = path.join(SRC_DIR, 'ressources', 'scripts')
const TEST_DIR = path.join(SCRIPT_DIR, 'tests')

const COMMON_MANIFEST = require(path.join(MANIFESTS_DIR,COMMON_MANIFEST_FILE_NAME))

function clean(){
    if (fs.existsSync(DIST_DIR)) {
        console.log('Clean dist directory : ' + DIST_DIR)
        fs.rmdirSync(DIST_DIR, {recursive: true})
    }
    fs.mkdirSync(DIST_DIR)
}

function buildManifest(vendor, version, reference){
    console.log('Build ', vendor, ' manifest')
    let vendorManifest = require(path.join(MANIFESTS_DIR,vendor + '_manifest.json'))
    let manifest = Object.assign({}, COMMON_MANIFEST, vendorManifest)
    manifest.version = version
    manifest.short_name = "Tanaguru " + reference.toUpperCase() + " " +vendor
    return JSON.stringify(manifest)
}

function copySources(vendor, dir){
    console.log('Copy sources in ' + dir)
    fse.copySync(
        SRC_DIR,
        dir,
        {
            recursive: true,
            filter: (src, dest) => {
                return !src.includes(MANIFESTS_DIR) && !src.includes(REFERENCES_DIR) ;
            }
        }
    )
}

function buildScripts(testFile){
    let script = ""
    if(fs.existsSync(path.join(REFERENCES_DIR, testFile))){
        script = fs.readFileSync(path.join(TEST_DIR, 'content.js'));
        script += '\n';
        script+= fs.readFileSync(path.join(REFERENCES_DIR, testFile));
        script += '\n';
        script += fs.readFileSync(path.join(TEST_DIR, 'init-tests.js'))
    }else{
        console.error("Test file ", testFile, ' does not exist')
    }
    return script
}


console.log('Start build')
clean();
// build manifests
let version = fs.readFileSync(VERSION_FILE).toString();
let manifests = fs.readdirSync(MANIFESTS_DIR);
let references = fs.readdirSync(REFERENCES_DIR).map(value => value.split('.')[0]);

let test_contents = {}
for(const reference of references){
    console.log("Create script for reference " + reference)
    test_contents[reference] = buildScripts(reference + '.js');
}

for(const manifest of manifests){
    if(manifest !== COMMON_MANIFEST_FILE_NAME){
        let vendor = manifest.split('_manifest.json')[0]
        for(const reference of references){
            let manifestContent = buildManifest(vendor, version, reference);
            let dir = path.join(DIST_DIR, vendor, version, 'tanaguru-' + reference + '-' + vendor + '-' + version)
            fs.mkdirSync(dir, { recursive: true })
            fs.writeFileSync(
                path.join(dir, 'manifest.json'),
                manifestContent);
            copySources(vendor, dir);

            fs.mkdirSync(path.join(dir, 'ressources', 'scripts', 'tests'), { recursive: true });
            fs.writeFileSync(path.join(dir, 'ressources', 'scripts', 'tests', 'tests.js'), test_contents[reference]);
            zip(dir, dir + ".zip");
        }
    }
}

console.log('Build finished')