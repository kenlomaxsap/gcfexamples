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

## Debugging

You can debug locally:

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

## Create buckets bucketin and bucketout and upload some test files to bucketin

googleshell> gsutil mb gs://gcfinput

googleshell> gsutil mb gs://gcfoutput

googleshell> gsutil cp material/* gs://gcfinput

## Authorize your local command line

To execute google APIs you need to have "permission", which means a serviceaccount key.

Chrome> https://console.cloud.google.com/iam-admin/serviceaccounts

Download the json file and set your GOOGLE_APPLICATION_CREDENTIALS to it:

terminal> export GOOGLE_APPLICATION_CREDENTIALS=pathToJSONAPIKey 

## Run locally 

You can now run google api from your laptop:

terminal> node debugging.js

curl "http://localhost:8080/helloWorld?file=TheresaMay"

curl "http://localhost:8080/gcfs?bucketin=gcfinput&bucketout=gcfoutput&targetLocale=fr&file=input.txt&gender=MALE&sourceLocale=en-US"

## Debug locally 

terminal> node --inspect debugging.js

Use chrome://inspect to debug

## Upload to Google Cloud and run there 

Create Google Function with the index.js and package.json

Test it in the testing tab with:
{"bucketin":"gcfinput", "bucketout":"gcfoutput","targetLocale":"fr", "file":"input.txt"}


## Upload the same function but this time to be Triggered by file upload

Confirm it runs when you upload files to the bucket

## Debug a running Cloud Function with StackDriver

Uncomment the debug-agent line at the top of index.js and redeploy function

Go to Stack Driver Console (https://console.cloud.google.com/debug)

Select the code under "Upload a source code capture to Google servers!" and checkin your code

googleshell>gcloud beta debug source upload --project=xxxxx --branch=xxxxxx .

Return to  "Upload a source code capture to Google servers!" in the Stack Driver Console and select "Select Source" 

Set snapshot points

Invoke the function and notice how your Snapshots have been captured, without stopping your "productino code" :)
  
Find out more @ https://cloud.google.com/functions/docs/

