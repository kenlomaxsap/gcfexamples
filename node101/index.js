const debug = require ('@google-cloud/debug-agent').start({allowExpressions:true});
initjson = (json) => {
  // when called via "functions call", we need json.body
  if (json && json.body)
    json = json.body
  // When called via events we need json.data
  if (json && json.data)
    json = json.data;
  return json
}
  
  
exports.helloWorld = (json, res) => {
  json= initjson(json)
  console.log("Hello "+ json.name)
  if (res && res.send)
    res.status(200).send("Hello "+ json.name);
}