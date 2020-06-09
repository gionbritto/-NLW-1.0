//importart a dependencia do squile
const sqlite3 = require("sqlite3").verbose();

//criar o objeto do de banco de dados que irá fazer as operações

const db = new sqlite3.Database("./src/database/database.db");

//exportando os dados
module.exports = db;
//para inicializar é necessario rodar o arquivo atual: node src/database/db.js

//utilizar o obj de banco de dados para as operacoes
function errorHandler(err) {
    if (err) {
        return console.log(err)
    }
    console.log("Erro ao executar");
    console.log(this);
}


db.serialize(() => {
    //criar uma tabela
    //dps inserir dados na tabela
    //consultar
    //deletar dados
    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `);

    const query = `
        INSERT INTO places (image, name, address, address2, state, city, items)
        values (?,?,?,?,?,?,?);
    `;


    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        " N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ];

    const values2 = [
        "https://images.unsplash.com/photo-1550496923-a0e3ef948e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        "GNBSysCollect",
        "Cristina C, Ercília Rocha",
        " N° 108",
        "Minas Gerais",
        "Santa Luzia",
        "Pilhas e Baterias"
    ];
    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
    }
    // db.run(query, values2, afterInsertData); //essa linha insere os dados na tabela

    //consulta
    // db.all("SELECT * FROM places", function(err, rows){
    //     if(err){

    //     }

    //     console.log("Resultados");
    //     console.log(rows);
    // });

    // consulta
    // const idPlace = 1;
    // db.all(`SELECT * FROM places where id = ${idPlace}`, function (err, rows) {
    //     if (err) {
    //         console.log(err);
    //     }

    //     console.log("Resultados");
    //     console.log(rows);
    // });

    //deletar valor
    // db.run(`DELETE FROM places where id = ?`, [6], function(err){
    //          if (err) {
    //         console.log(err);
    //     }

    //     console.log("Dados deletados com sucesso!");
    // });

}, errorHandler);
