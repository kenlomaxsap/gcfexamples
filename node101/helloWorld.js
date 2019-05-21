require('@google-cloud/debug-agent').start();

// node -e 'require("./helloWorld").helloWorld( {"name" : "Jakob Rees-Mogg" } )
initjson = (json) => {
  // when called via "functions call", the json.daa is found in body..
  if (json && json.body)
    json = json.body
  // When called via events (see later), json is in json.data..
  if (json && json.data)
    json = json.data;
  return json
} 
  
exports.helloWorld = (json, res) => {
    console.log("Hello ")
  json= initjson(json)
  console.log("Hello "+ json.name)
  if (res && res.send)
    res.status(200).send("Hello "+ json.name);
}