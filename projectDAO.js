//Neste Arquivo será efetuado a inserção e busca no 
//banco de dados

var loki = require('lokijs');
var db = new loki('db.json');
var projetos = db.addCollection('projetos');

window.saveProject = function() {
    var projeto = require('C:\\Users\\mathe\\Desktop\\project.json');
    var nomeProjeto = document.querySelector('#nome-projeto').value;
    let data = {
        nomeProjeto,
        projeto
    }
    projetos.insert(data);
    db.save();
}
