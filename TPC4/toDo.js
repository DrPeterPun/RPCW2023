
// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
const { parse } = require('querystring');

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    
    axios.all([
        axios.get("http://localhost:3000/toDo"),
        axios.get("http://localhost:3000/completed")
    ]).then(axios.spread(function(res1, res2) {
            var toDo = res1.data
            var completed = res2.data
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.end(templates.toDoListPage(toDo, completed, d))
        }))
        .catch(function(erro){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Erro no axios req " + erro)
            res.end()
        })
    
    
})

var toDoServer = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    
    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if((req.url == "/")){
                    pagHTML(res)
                }
                break
            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            if(!result._method){
                                axios.post('http://localhost:3000/toDo', {
                                    dateDued: result.dateDued,
                                    who: result.who,
                                    what: result.what
                                  })
                                  .then(function (response) {
                                    console.log(response);
                                  })
                                  .catch(function (error) {
                                    console.log(error);
                                  });
                                pagHTML(res)
                            }
                            else{
                                if(result._method == "DELETE"){
                                    axios.delete('http://localhost:3000/' + result.db + '/'+ result.id)
                                        .then(function (response) {
                                            console.log(response);
                                            })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    pagHTML(res)
                                }
                                else if(result._method == "CHECK"){
                                    axios.delete('http://localhost:3000/toDo/'+ result.id)
                                        .then(function (response) {
                                            console.log(response);
                                            })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    axios.post('http://localhost:3000/completed', {
                                        dateDued: result.dateDued,
                                        who: result.who,
                                        what: result.what
                                    })
                                        .then(function (response) {
                                            console.log(response);
                                            })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    pagHTML(res)
                                }
                                
                                else{
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write('<p>nao existe o metudo:' + result._method + '</p>')
                                    res.write('<p><a href="/">Return</a></p>')
                                    res.end()
                                }
                            }
                        }
                    });
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " nao existe</p>")
                res.end()
                break
        }
    }
})


alunosServer.listen(7777, ()=>{
    console.log("Servidor Ã  escuta na porta 7777...")
})



