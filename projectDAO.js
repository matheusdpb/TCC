//Neste Arquivo será efetuado a inserção e busca no 
//banco de dados

var loki = require('lokijs');
var db = new loki('database.db');

function databaseInitialize(){
    
    var projetos = db.getCollection('projetos');

    if ( projetos === null ){
        projetos = db.addCollection('projetos', {autoupdate: true });
    }    
}    

window.saveProject = function() {
    
    // try {
    //     var dbJson = require('C:\\Users\\mathe\\Desktop\\projects\\tccGit\\db.json');
    //     db.loadJSONObject(dbJson);
    // } catch (error) {
    //     console.log(error);
    // }         
    var projeto = require('C:\\Users\\mathe\\Desktop\\project.json');
    var nomeProjeto = document.querySelector('#nome-projeto').value;
    var nomeAluno = document.querySelector('#nome-aluno').value;
    var nomeTurma = document.querySelector('#turma-projeto').value;
    var projetoConcluido = document.querySelector('#projeto-concluido').checked;
    var seila = db.getCollection('projetos');
    let data = {
        nomeProjeto,
        nomeAluno,
        nomeTurma,
        projetoConcluido,
        projeto
    }
    seila.insert(data);
    db.save(function(err) {
        if(err){
            console.log(err);
        } else {
            console.log("salvo com sucesso");
        }
    });

}

db.loadDatabase({}, function(err) {
    databaseInitialize();
    console.log("db initialized");
})