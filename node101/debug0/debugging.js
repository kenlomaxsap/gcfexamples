/*
Create Key: https://console.cloud.google.com/iam-admin/serviceaccounts
export GOOGLE_APPLICATION_CREDENTIALS=pathToJSONAPIKey 

node debugging.js
or
node --inspect debugging.js
chrome://inspect

curl "http://localhost:8080/helloWorld?file=TheresaMay"
curl "http://localhost:8080/gcfs?bucketin=gcfinput&bucketout=gcfoutput&targetLocale=fr&file=input.txt&gender=MALE&sourceLocale=en-US"
*/
var expressModule = require('express')
var expressWebServer = expressModule();
var gcfs = require("./index.js")  

expressWebServer.get('/helloWorld', function(req, res){ 
  gcfs.helloWorld(req,res);
});

expressWebServer.get('/gcfs', function(req, res){ 
  gcfs.gcfs(req,res);
});

expressWebServer.listen(8080);

console.log("Server is up and running.");
console.log('curl "http://localhost:8080/helloWorld?name=TheresaMay"');
console.log('curl "http://localhost:8080/gcfs?bucketin=gcfinput&bucketout=gcfoutput&targetLocale=fr&name=input.txt"');
