const express = require("express")
const servidor = express()
//chamar o banco de dados

const db = require("./database/db")

//configurar pasta pública
servidor.use(express.static("public"))
//habilitar o uso do req.body
servidor.use(express.urlencoded({extended: true}))

// configurar template engine

const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: servidor,
    noCache: true
})

//configurar caminhos da aplicação
//página inicial
//req : Requisição
//res: Resposta
servidor.get("/", function(req, res){
    return res.render("index.html", {
        title: "Um título",
    })
})
servidor.get("/create-point", function(req, res){
    
    //req.query = URL em objeto
    //console.log(req.query)

    return res.render("create-point.html")
})

servidor.post("/savepoint", function(req, res){

    //console.log(req.body)
    //inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        name,
        image,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function depoisdosDados(err){
        if(err){
             console.log(err)
             return res.send("ERRO NO CADASTRO")
        }
        console.log('Cadastrado com sucesso')
        console.log(this)
        return res.render("create-point.html", {saved: true})
    }
    db.run(query, values, depoisdosDados)
    
    
})


servidor.get("/search", function(req, res){
    const search = req.query.search
    if (search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    } 
    
    //pegar os dados do banco de dados
    // o % significa qualquer palavra antes ou depois do search
    // que funciona com o LIKE ou seja parecido
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows){
        if(err){
            return console.log(err)
             
        }
        const total = rows.length        

        return res.render("search-results.html", {places: rows, total: total})
    })
    
    
})

//ligar o servidor
servidor.listen(3000)