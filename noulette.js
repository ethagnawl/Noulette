var http = require('http')
    ,   fs = require('fs')
;
    
http.createServer(function (req, res) {
    if (req.url === '/' || req.url == '/index.html') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fs.readFileSync('index.html')); 
    } else if (req.url == "/noulette.css") {
console.log(req);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(fs.readFileSync('noulette.css')); 
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("Page Could Not Be Found"); 
    }
}).listen(5073, "127.0.0.1");
