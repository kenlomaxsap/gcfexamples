const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile)
var ret = readFile("./bod.txt")
console.log("Ret :"+ret)