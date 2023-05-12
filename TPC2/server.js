var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    console.log('URL: ' + req.url)
    if(req.url == "/"){
        fs.readFile('index.html', function(err,data) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        })
    }
    else if(req.url == "/favicon.ico"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end()
    }else {
        var numPag = url.parse(req.url,true).pathname.slice(1)
        console.log('Nº arq.: ' + numPag)
        fs.readFile('arqs/arq_' + numPag + '.html', function(err,data) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            if(err) 
                res.write(err)
            else 
                res.write(data)
            res.end()
        })
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...')
