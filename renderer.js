// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var loki = require('lokijs');
var db = new loki('db.json');
var clientes = db.addCollection('clientes')
clientes.insert({
    nome: 'leonardo',
    email:'teste@gmail.com'
});
db.save()

const ipc = require('electron').ipcRenderer;
const buttonCreated = document.getElementById('upload');

buttonCreated.addEventListener('click', function (event) {
    ipc.send('open-file-dialog-for-file')
});
ipc.on('selected-file', function (event, path) {
    console.log('Full path: ', path);
});
