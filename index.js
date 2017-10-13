const diff = require('deep-diff');
const util = require('util');
const fs = require('fs');

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