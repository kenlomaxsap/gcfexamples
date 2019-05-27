// For stackdriver support
//const debug = require ('@google-cloud/debug-agent').start({allowExpressions:true});
// End

exports.helloWorld = (json, res) => {
  json= findJson(json)
  if (res && res.send)
    res.status(200).send("Hello "+ json.name);
}
  
// Modules
var storageModule = require('@google-cloud/storage')
var visionModule = require('@google-cloud/vision');
var speechModule = require('@google-cloud/speech');
var translateModule = require('@google-cloud/translate');
var ttsModule = require('@google-cloud/text-to-speech');
   
// Clients
var storage = new storageModule.Storage();
var vision = new visionModule.ImageAnnotatorClient();
var speech = new speechModule.SpeechClient();
var translate = new translateModule.Translate()
var textToSpeech = new ttsModule.TextToSpeechClient();

var id = 0 ;

exports.gcfs = (json, res) => {
    
    id++;
    var step = 0

    json = findJson(json)    
    storage.bucket(json.bucketin).file(json.file).download(). 
    then((input) => { 
        logging( id, input, step++ )
        var sourceFile = "gs://" + json.bucketin + "/" + json.file 
        // Speech recognition
        if (json.file.endsWith(".wav"))
            return speech.recognize( {config: { languageCode: json.sourceLocale  ? json.sourceLocale  : "en-US" }, audio: {content:  input[0] } }  );   
        // Text Recognition     
        if (json.file.endsWith(".jpeg"))
            return vision.textDetection( sourceFile );   
        // Text file    
        return input;
    }).
    then((input) => { 
        // Pull the recognized text from the json
        logging( id, input, step++ );
        if ( input[0].fullTextAnnotation )
            return input[0].fullTextAnnotation.text.replace(/\n/g, " ").trim();
        else if ( input[0].results )
            return input[0].results[0].alternatives[0].transcript;
        else // txt file
            return input[0];
    }).
    then((input) => {  
        // Modify the text (add some manners)
        logging( id, input, step++ )         
        var tips =[
            "Sorry to bother.",
            "Would you mind.",
            "Forgive the intrusion.",
            "Thank you so much.",
            "You are too kind.",
            "One is most grateful."
        ];        
        var tip = tips[Math.floor(Math.random() * tips.length)]       
        return tip+" "+input;
    }).
    then((input) => {  
        // Translate to another language         
        logging( id, input, step++ )
        const options = {
            from: "en",
            to: json.targetLocale  ? json.targetLocale  : "de"
        };
        return translate.translate(input, options);
    }).
    then((input) => {    
        // Text to speech to synthesize WAV file      
        logging( id, input, step++ )
        const ttsParams = {
            input: {
                text: input[0]
            },
            voice: {
                languageCode: json.targetLocale  ? json.targetLocale  : "de",
                ssmlGender: json.gender  ? json.gender  : 'FEMALE'
            },
            audioConfig: {
                audioEncoding: 'LINEAR16'
            }
        }
        return textToSpeech.synthesizeSpeech(ttsParams);
    }).
    then((input) => { 
        // Save to the bucket
        logging( id, input[0].audioContent.length, step++ ) 
        return storage.bucket(json.bucketout).file("AUDIO_"+json.file+".wav").save(input[0].audioContent);
    }).
    then((input) => { 
        // Return cleanly
        logging( id, input, step++ )
        if (res && res.status) // if http call, we should return 200
            res.status(200).send("SUCCESS");
        return;
    })
}


findJson = (json) => {
 if (json && json.body) // when called via google Testing tab
    json = json.body  
  else if (json && json.query) // when called via curl, json is in query
    json = json.query  
  else  {
    // When called via events, we need to juggle the json
    json.bucketin=json.bucket;
    json.file=json.name;
    json.bucketout="gcfoutput"
  }
  
  console.log("findJson: "+ JSON.stringify(json))

  return json
}
  
logging = (id, input, step) => {
    console.log(  `id ${id} Step ${step} : ${JSON.stringify(input)}` )
}
