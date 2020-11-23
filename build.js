const fs = require('fs')
const fse = require('fs-extra')
const { exit } = require('process')

const SRC_DIR = './src/'
const DIST_DIR = './dist/'

const POLYFILL_PATH = './node_modules/webextension-polyfill/dist/browser-polyfill.js' 
const POLYFILL_MAP_PATH = './node_modules/webextension-polyfill/dist/browser-polyfill.js.map' 

const MANIFESTS_DIR = SRC_DIR + 'manifests/'
const COMMON_MANIFEST_FILE_NAME = 'common_manifest.json'

const COMMON_MANIFEST = require(MANIFESTS_DIR+COMMON_MANIFEST_FILE_NAME)

function clean(){
    if (fs.existsSync(DIST_DIR)) {
        console.log('Clean dist directory : ' + DIST_DIR)
        fs.rmdirSync(DIST_DIR, {recursive: true})
    }
    fs.mkdirSync(DIST_DIR)
}

function buildManifest(vendor){
    console.log('Build ', vendor, ' manifest')
    fs.mkdirSync(DIST_DIR + vendor)
    var vendorManifest = require(MANIFESTS_DIR + vendor + '_manifest.json')
    var manifest = Object.assign({}, COMMON_MANIFEST, vendorManifest)
    fs.writeFileSync(DIST_DIR + vendor + '/manifest.json', JSON.stringify(manifest))
}

function copySources(){
    console.log('Copy source files')
    var files = fs.readdirSync(DIST_DIR);
    for(var file of files){
        fse.copySync(
            POLYFILL_PATH,
            DIST_DIR + file + '/browser-polyfill.js'
        )

        fse.copySync(
            POLYFILL_MAP_PATH,
            DIST_DIR + file + '/browser-polyfill.js.map'
        )

        fse.copySync(
            SRC_DIR,
            DIST_DIR + file,
            {
                recursive: true,
                filter: (src, dest) => {
                    return !src.includes(MANIFESTS_DIR);
                }
            }
        )
    }
}

console.log('Start build')
clean();
// build manifests
var files = fs.readdirSync(MANIFESTS_DIR);
for(var file of files){
    if(file != COMMON_MANIFEST_FILE_NAME){
        var vendor = file.split('_manifest.json')[0]
        buildManifest(vendor)
    }
}

copySources();

console.log('Build finished')