// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var loki = require('lokijs');
var db = new loki('db.json');
var projetos = db.addCollection('projetos');
const ipc = require('electron').ipcRenderer;
const buttonCreated = document.getElementById('upload');

buttonCreated.addEventListener('click', function (event) {
    ipc.send('open-file-dialog-for-file')
});
ipc.on('selected-file', function (event, pathFile) {
    
    const fs = require("fs");
    const unzipper = require("unzipper");
    var strg = pathFile.toString();

    fs.createReadStream(strg)
    .pipe(unzipper.Parse())
    .on('entry', function (entry) {
        const fileName = entry.path;
        const type = entry.type; // 'Directory' or 'File'
        const size = entry.vars.uncompressedSize; // There is also compressedSize;
        if (fileName === "project.json") {
            entry.pipe(fs.createWriteStream("C:\\Users\\mathe\\Desktop\\project.json"));
        } else {
            entry.autodrain();
        }
    });
});

var modal = document.getElementById('myModal');
var modalBtn = document.getElementById('importBtn');
var closeBtn = document.getElementById('closeBtn');
var saveBtn = document.getElementById('saveBtn');

modalBtn.addEventListener('click', openModal);
function openModal(){
    modal.style.display = 'block';
}

closeBtn.addEventListener('click', closeModal);
function closeModal(){
    modal.style.display = 'none';
    showPackageJsonVersion();
}

saveBtn.addEventListener('click', saveProject);
function saveProject(){
    var projeto = require('C:\\Users\\mathe\\Desktop\\project.json');
    var nomeProjeto = document.querySelector('#nome-projeto').value;
    let data = {
        nomeProjeto,
        projeto
    }
    projetos.insert(data);
    db.save();
    modal.style.display = 'none';
}

var read = require('read-file-utf8');

async function showPackageJsonVersion() {
    var dbJson = await read('C:\\Users\\mathe\\Desktop\\projects\\tcc\\db.json').then(JSON.parse);
    db.loadJSONObject(dbJson);
    console.log(db);
    var seila = db.getCollection('projetos');
    console.log(seila.data);
    var naosei = seila.data;
    
    var nomes = [];
    for(var i = 0; i < naosei.length; i++){
        nomes.push(naosei[i].nomeProjeto); 
    }
    console.log(nomes);
}




