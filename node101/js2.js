var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  var parts = url.parse(req.url, true);
  var query = parts.query;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`Greetings ${query.name} from NodeJS!`);
}).listen(8080);
console.log("Server is up and running. Try http://localhost:8080?name=Boris%20Johnson")
