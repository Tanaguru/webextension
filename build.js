const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const SRC_DIR = path.join(__dirname, 'src')
const DIST_DIR = path.join(__dirname, 'dist')

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

function buildManifest(vendor){
    console.log('Build ', vendor, ' manifest')
    let vendorManifest = require(path.join(MANIFESTS_DIR,vendor + '_manifest.json'))
    let manifest = Object.assign({}, COMMON_MANIFEST, vendorManifest)
    fs.writeFileSync(
        path.join(DIST_DIR, vendor, 'manifest.json'),
        JSON.stringify(manifest))
}

function copySources(vendor){
    console.log('Copy ', vendor, ' sources')
    fse.copySync(
        SRC_DIR,
        path.join(DIST_DIR, vendor),
        {
            recursive: true,
            filter: (src, dest) => {
                return !src.includes(MANIFESTS_DIR) && !src.includes(TEST_DIR);
            }
        }
    )
}

function buildScripts(testFile){
    let script = ""
    if(fs.existsSync(path.join(TEST_DIR, testFile))){
        script = fs.readFileSync(path.join(TEST_DIR, 'content.js'));
        script += '\n';
        script+= fs.readFileSync(path.join(TEST_DIR, testFile));
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
let files = fs.readdirSync(MANIFESTS_DIR);
let script = buildScripts('tests.js');
for(const file of files){
    if(file !== COMMON_MANIFEST_FILE_NAME){
        let vendor = file.split('_manifest.json')[0]
        fs.mkdirSync(path.join(DIST_DIR, vendor))
        buildManifest(vendor);
        copySources(vendor);
        fs.mkdirSync(path.join(DIST_DIR, vendor, 'ressources', 'scripts', 'tests'));
        fs.writeFileSync(path.join(DIST_DIR, vendor, 'ressources', 'scripts', 'tests', 'tests.js'), script);
    }
}

console.log('Build finished')