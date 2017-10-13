"use strict";
const diff = require('deep-diff');
const util = require('util');
const fs = require('fs');
let YAML = require('json2yaml'), ymlText;


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