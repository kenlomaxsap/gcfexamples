Node 101:
=========
cd node101
node js0
node js1
node js2
node js3
node js4
node js5
node eventloopexample
node promise1

debugging locally:
  node --inspect index.js
  chrome://inspect

Debugging with StackDriver
  Deploy function to cloud
    gcloud beta functions deploy helloWorld --entry-point=helloWorld --memory=128MB --region=us-central1 --source=. --trigger-http --runtime=nodejs10
  Call via curl: 
    curl -i -H "Content-Type: application/json" -X POST -d '{"name":"Freddie Mercury" }' https://xxxx
    Test and examine in Cloud GUI
 
  To Debug:
    npm install --save @google-cloud/debug-agent
    const debug = require ('@google-cloud/debug-agent').start({allowExpressions:true});
    gcloud beta functions deploy helloWorld --entry-point=helloWorld --memory=128MB --region=us-central1 --source=. --trigger-http --runtime=nodejs10
  StackDriver
    Checkin code: gcloud beta debug source upload --project=gcfcomplete --branch=xxxxxx .
    Set snapshot points
    Call from curl:  
      curl -i -H "Content-Type: application/json" -X POST -d '{"name":"Freddie Mercury" }' https://us-central1-gcf20190516.cloudfunctions.net/helloWorld 

GCF EXAMPLE
===========gcloud beta debug source upload --project=cloudlab6map --branch=7FFA1614FE262FD22CFB .
cd ../gcfexample
gsutil mb gs://gcfexample
Chrome> https://console.cloud.google.com/storage/browser
gsutil cp ./material/* gs://gcfexample
npm install @google-cloud/debug-agent @google-cloud/storage @google-cloud/vision @google-cloud/speech @google-cloud/translate @google-cloud/text-to-speech

node -e 'require("./index").gcfs( { "bucket": "gcfexample", "name": "input.txt" } )' .    
  -> PERMISSION DENIED

To fix this from google shell:
  create service account: https://cloud.google.com/docs/authentication/getting-started
  export GOOGLE_APPLICATION_CREDENTIALS="PATH/TO/YOUR.json"
  node -e 'require("./index").gcfs( { "bucket": "gcfexample", "name": "input.wav" } )'

To Debug:
npm install --save @google-cloud/debug-agent
const debug = require ('@google-cloud/debug-agent').start({allowExpressions:true});
  
gcloud beta functions deploy gcfexample --entry-point=gcfs --memory=256MB --region=us-central1 --source=. --trigger-http --runtime=nodejs10

See function @ https://console.cloud.google.com/functions/list?project=gcfcomplete
Test in GUI with { "bucket": "gcfexample", "name": "input.wav" } 

StackDriver
  Checkin code: gcloud beta debug source upload --project=gcfcomplete --branch=xxxxxx .
  Set snashot points

  Test via command line: curl -i -H "Content-Type: application/json" -X POST -d '{"bucket":"gcfexample","name":"input.txt" }' https://us-central1-gcfcomplete.cloudfunctions.net/gcfexample  

