const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile)
var ret = readFile("./bod.txt").
// When the readFile promise completes, it passes the result to the next "then" block..
then((arg) => {
    console.log("===== Then Block A output: "+arg)
    return "Done"
}).  
// When the above "then" block completes (be that plain code, or also a promise), it passes the result to the next "then" block..
then((arg) => { 
    console.log("===== Then Block B: "+arg)
}).
// When the above "then" block completes (be that plain code, or also a promise), it passes the result to the next "then" block..
then((arg) => {
    console.log("===== Then Block C: "+arg)
})
console.log("===== Ret :" + ret)
