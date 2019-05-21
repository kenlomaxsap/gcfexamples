var expressModule = require('express')
var expressWebServer = expressModule();
 
expressWebServer.get('/cpulight', function(req, res){
  res.send('That was fast');
});
 
expressWebServer.get('/cpuheavy', function(req, res){
  for (i = 0; i <= 1000; i++)
    for (j = 0; j <= 1000; j++)
      console.log( i*j );
  res.send('Greetings ');
});
console.log("Express server started. Try http://localhost:8080/cpuheavy and http://localhost:8080/cpulight")
expressWebServer.listen(8080);