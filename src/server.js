//inicializando o servidor
//dependencias instaladas:
//express(para geral e server)
//nodemon(para restart rapido no server) => npm nodemon -D
//para permitir que eu receba post preciso fazer: server.use(express.urlencoded({extended: true}))

//instalar o numjucks para tornar o html dinamico npm install nunjucks
//isso é um template engine


const express = require("express");
const server = express();
server.use(express.urlencoded({ extended: true })); //habilitando post

//pegar o banco de dados
const db = require("./database/db.js");

// nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurara pasta publica
server.use(express.static("public"))

//configurar caminhos da aplicacao
server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    //pegando os dados da requisição:
    //req.query = querystring
    console.log(req.query)
    return res.render("create-point.html");
});

server.get("/search-results", (req, res) => {
    const search = req.query.search;

    if (search == "") {
        return res.render("search-results.html", { total: 0 });
    }


    //pegar os dados no banco de dados
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function (err, rows) {
        if (err) {
            return res.send("Erro ao buscar dados. Volte ao início clicando <a href='/'>aqui</a>");
        }

        const total = rows.length;
        //mostrando a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total });
    });
});

server.post("/savepoint", (req, res) => {

    const query = `
        INSERT INTO places (image, name, address, address2, state, city, items)
        values (?,?,?,?,?,?,?);
    `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            return res.send("Erro no Cadastro!")
        }
        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData); //essa linha insere os dados na tabela

    console.log(req.body);

});

server.listen(3001); //ativando o objeto servidor