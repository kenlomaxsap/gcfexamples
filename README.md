# Material for a Google Cloud Functions Workshop


## Pre-requisites

Install Node and NPM

Create a new Google Cloud Project at cloud.google.com

Once created, make sure it is selected, and select "Activate Cloud Shell", and "Launch Code Editor"

(https://cloud.google.com/shell/docs/features, 

https://cloud.google.com/shell/docs/starting-cloud-shell)

googleshell> git clone https://github.com/kenlomaxhybris/gcfexamples.git  

## node101

googleshell>  cd gcfexamples/node101

note that your cloud shell has Node pre installed

googleshell> node -v

Hello World: googleshell> node js0

Node functions: googleshell> node js1

Node modules: googleshell> node js2

Node's Express: googleshell>  node js3

Exporting Modules: googleshell> node js4

googleshell> node js5

Event Loop: googleshell> node eventloopexample

Promises: googleshell> node promise1

googleshell> node promise2

debugging helloWorld locally:

terminal>  git clone https://github.com/kenlomaxhybris/gcfexamples.git ;  cd gcfexamples/node101

terminal>  node --inspect index.js

chrome>  chrome://inspect

terminal> curl "http://localhost:8080?name=TheresaMay"
  
## Google Cloud Functions example

terminal> cd ../gcfexample

### Download the node modules using npm
terminal> npm install express @google-cloud/debug-agent @google-cloud/storage @google-cloud/vision @google-cloud/speech @google-cloud/translate @google-cloud/text-to-speech

### Enabled the google APIs:

Chrome> https://console.developers.google.com/apis/api/translate.googleapis.com

Chrome> https://console.developers.google.com/apis/api/texttospeech.googleapis.com

Chrome> https://console.developers.google.com/apis/api/vision.googleapis.com

Chrome> https://console.developers.google.com/apis/api/speech.googleapis.com

## Authorize your local command line
To execute google APIs you need to have "permission", which means a serviceaccount key.

Chrome> https://console.cloud.google.com/iam-admin/serviceaccounts

Download the json file and set your GOOGLE_APPLICATION_CREDENTIALS to it:

terminal> export GOOGLE_APPLICATION_CREDENTIALS=pathToJSONAPIKey 

You can now run google api from your laptop:

terminal> node debugging.js

or

terminal> node --inspect debugging.js

Use chrome://inspect to debug

curl "http://localhost:8080/helloWorld?file=TheresaMay"

curl "http://localhost:8080/gcfs?bucketin=gcfinput&bucketout=gcfoutput&targetLocale=fr&file=input.txt&gender=MALE&sourceLocale=en-US"

To test in GC: 

Create Google Function with the index.js and package.json

{"bucketin":"gcfinput", "bucketout":"gcfoutput","targetLocale":"fr", "file":"input.txt"}

Tiggered function by file upload

StackDriver

  Uncommemnt debug agent line and redeploy function

  Checkin code

  Set snapshot points

  Invoke from Testing tab and see snapshots
  
