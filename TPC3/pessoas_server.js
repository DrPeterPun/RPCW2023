// pessoas_server.js
// RPCW2023 : 2023-02-27

var http = require('http')
var url = require('url')
var axios = require('axios')
var mypages = require('./mypages.js')
var fs = require('fs')

http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    var dic_url = url.parse(req.url,true)
    if (dic_url.pathname == "/"){
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.indexPage())
    }else if (dic_url.pathname == "/pessoas"){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas))
            })
            .catch( erro => {
                console.log("Erro: " + erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
            })
    }else if (dic_url.pathname == "/distribuicao_sexo"){
      let feminino_req = axios.get(
        "http://localhost:3000/pessoas?sexo=feminino"
      );
      let masculino_req = axios.get(
        "http://localhost:3000/pessoas?sexo=masculino"
      );
      let outro_req = axios.get("http://localhost:3000/pessoas?sexo=outro");

      Promise.all([feminino_req, masculino_req, outro_req])
        .then((resp) => {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(
            mypages.distribuicaoSexo(resp[0].data, resp[1].data, resp[2].data)
          );
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`Error: ${err}`);
        });
    }else if (dic_url.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err,data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err) {
                console.log("Erro na leitura da stylesheet!")
                res.write("Erro: " + err)
            }
            else 
                res.write(data)
            res.end()
        })
    }else{
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                if(pessoas.map(p => p.id).includes(dic_url.pathname.slice(1))){
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.end(mypages.pessoaPage(pessoas.filter(p => p.id == dic_url.pathname.slice(1))[0]))
                }else{
                    res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
                    res.end('Erro: Operação não suportada!')
                }
            })
            .catch( erro => {
                console.log("Erro: " + erro)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                res.end('Erro: ' + erro)
            })
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")
