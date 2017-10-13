/* need to fix prompt responses to be event emitters or promises, see: https://stackoverflow.com/questions/30485756/how-to-store-the-response-of-a-get-request-in-a-local-variable-in-node-js
"use strict";

const https = require("https");
const prompt = require('prompt');
const diff = require('deep-diff');
const util = require('util');
const fs = require('fs');
let YAML = require('json2yaml'), ymlText;

// Start the prompt
prompt.start();

// get slack domain and token
prompt.get(['old_slack_domain', 'old_token', 'new_slack_domain', 'new_token'], function (err, result) {

// Log the results.
const old_domain = prompt.history('old_slack_domain').value;
const old_token = prompt.history('old_token').value;
const new_domain = prompt.history('new_slack_domain').value;
const new_token = prompt.history('new_token').value;

let url = "https://" + old_domain + ".slack.com/api/emoji.list?token=" + old_token;

https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    const old = body;
  });
});

let url_new = "https://" + new_domain + ".slack.com/api/emoji.list?token=" + new_token;

https.get(url_new, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    const new1 = body;
  });
});

let differences = diff(old, new1);
let diffCheck = JSON.stringify(differences, null, 4);

fs.writeFile("output.json", diffCheck, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("These are your missing emojis");
});

let dedup = fs.readFileSync('output.json');
let output = JSON.parse(dedup);

ymlText = YAML.stringify(output);

fs.writeFile("output.yaml", ymlText, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("in yaml output");
});


//end prompt
  });

/*

let olddata = fs.readFileSync('old.json');
let old = JSON.parse(olddata);

let newdata = fs.readFileSync('new.json');
let new1 = JSON.parse(newdata);

let differences = diff(old, new1);
let diffCheck = JSON.stringify(differences, null, 4);

fs.writeFile("output.json", diffCheck, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("These are your missing emojis");
});

let dedup = fs.readFileSync('old.json');
let output = JSON.parse(dedup);

ymlText = YAML.stringify(output);

fs.writeFile("output.yaml", ymlText, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("in yaml output");
});
*/