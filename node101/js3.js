var expressModule = require('express')
var expressWebServer = expressModule();

expressWebServer.get('/', function(req, res){ 
  res.send(`Greetings ${req.query.name} from NodeJS!`); 
});
expressWebServer.listen(8080);
console.log("Server is up and running. Try http://localhost:8080?name=David%20Cameron")
