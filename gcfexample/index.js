// For debugging support
const debug = require ('@google-cloud/debug-agent').start({allowExpressions:true});
// End

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
  json= initjson(json)
  console.log("Hello "+ json.name)
  if (res && res.send)
    res.status(200).send("Hello "+ json.name);
}
  
// Modules
var storageModule = require('@google-cloud/storage')
var visionModule = require('@google-cloud/vision');
var speechModule = require('@google-cloud/speech');
var translateModule = require('@google-cloud/translate');
var ttsModule = require('@google-cloud/text-to-speech');
   
// Client side APIs
var storage = new storageModule.Storage();
var vision = new visionModule.ImageAnnotatorClient();
var speech = new speechModule.SpeechClient();
var translate = new translateModule.Translate()
var textToSpeech = new ttsModule.TextToSpeechClient();
   
// In-built util module
var util = require("util")
  
// A useful logging function
track = (ID, input, step) => {
    console.log(  `ID ${ID} Step ${step} : ${JSON.stringify(input)}` )
}
   
exports.gcfs = (json, res) => {
    json = initjson(json)    
    var sourceFile = "gs://" + json.bucket + "/" + json.name 
    console.log(`Function gcfs: ${sourceFile}`)
    var ID = new Date().getTime();
    var step = 1
   
    // Deal with files whose name starts with "input", otherwise return nicely.
    if(!json.name.startsWith("input") && !json.name.contains("/input")){
        if (res && res.status) // When called via functions called, we have a res.
                res.status(200).send("SUCCESS");
            else if (res) // when called via event, we should call the callback
                res();
            return;
    }
  
    storage.bucket(json.bucket).file(json.name).download(). // 0
        then((input) => { // 1 
            // Speech Recognition 1a
            if (json.name.endsWith(".wav")){
                track( ID, input[0].length, step++ )
                return speech.recognize( {config: { languageCode: 'en-US' },audio: { uri: sourceFile }})
            }
            // Optical Character Recognition 1b
            if (json.name.endsWith(".jpeg")){
                track( ID, input[0].length, step++ )
                return vision.textDetection(sourceFile)
            }
            track( ID, input, step++ )
            return input
        }).
        then((input) => { // 2
            // Pull the recognized text from the json
            track( ID, input, step++ )
            if (input[0].fullTextAnnotation)
                return input[0].fullTextAnnotation.text.replace(/\n/g, " ").trim();
            else if ( input[0].results)
                return input[0].results[0].alternatives[0].transcript;
            else // txt file
                return input[0]
        }).
        then((input) => { // 3   
            // Modify the text (add some manners)
            track( ID, input, step++ )         
            var tips =["Sorry to bother.",
                "Would you mind.",
                "Forgive the intrusion.",
                "Thank you so much.",
                "You are too kind.",
                "One is most grateful."]        
            var tip = tips[Math.floor(Math.random() * tips.length)]       
            return tip+" "+input;
        }).
        then((input) => { // 4  
            // Translate to another language         
            track( ID, input, step++ )
            const options = {
                from: "en",
                to: json.targetLocale  ? json.targetLocale  : "de"
            };
            return translate.translate(input, options);
        }).
        then((input) => { // 5     
            // Text to speech to synthesize WAV file      
            track( ID, input, step++ )
            const ttsParams = {
                input: {
                    text: input[0]
                },
                voice: {
                    languageCode: json.targetLocale  ? json.targetLocale  : "de",
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {
                    audioEncoding: 'LINEAR16'
                }
            }
            return textToSpeech.synthesizeSpeech(ttsParams);
        }).
        then((input) => { // 6
            // Save to the bucket
            track( ID, input[0].audioContent.length, step++ ) 
            return storage.bucket(json.bucket).file("AUDIO_"+json.name+".wav").save(input[0].audioContent);
        }).
        then((input) => { // 7
            // Return cleanly
            track( ID, input, step++ )
            if (res && res.status) // When called via functions called, we have a res.
                res.status(200).send("SUCCESS");
            else if (res)
                res(); // when called via event, we should call the callback
            return;
        })
}

// For debugging support (see https://medium.com/google-cloud/stackdriver-debugger-on-google-cloud-functions-d49a6ee5f12c)
