var expressModule = require('express')
var expressWebServer = expressModule();

expressWebServer.get('/', function(req, res){ 
  helloWorld(req,res);
});

helloWorld = (json, res) => {
  console.log("Hello "+ json.query.name)
  if (res && res.send)
    res.status(200).send("Hello "+ json.query.name);
}
expressWebServer.listen(8080);

console.log("Server is up and running.");
console.log('curl "http://localhost:8080?name=TheresaMay"');