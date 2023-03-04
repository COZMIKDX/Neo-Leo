const fs = require("fs");
const myUtils = require('../myUtils.js');
// let parsedOb;
// let sentenceConst = {};

// Right now, a new generator will be created each time the user calls a generation command.
// This means the json file will be read and parsed each time.
// Later I'll look into doing something like keeping parsed file object for a little while after the generation
//  is completed since we like to spam it.
//  If keep that in a static variable, it'll always be taking up memory.
class ItemGenerator {
    constructor(filepath, sentenceInfo = {}) {
        let data = fs.readFileSync(filepath);
        this.parsedOb = JSON.parse(data);
        this.sentenceInfo = sentenceInfo;
    }

    generate() {
        let output = "";
        for (let field in this.parsedOb) {
            let item = this.parsedOb[field][myUtils.getRandomInt(0, this.parsedOb[field].length - 1)];
            if (field == "modifier") {
                let rand = Math.random();
                if (rand < .2) { // add the modifier if we hit the 20% chance
                    if (item.startsWith(',')) {
                        output = output + item;
                    }
                    else {
                        output = output + " " + item;
                    }
                }
            }
            else { // add any non-modifier item to the string.
                output = output + " " + item;
            }

            // Add in boiler plate text such as "potion of", if it exists.
            if (field == this.sentenceInfo["field"]) {
                output = output + " " + this.sentenceInfo["text"];
            }
        }

        return output;
    }
}

module.exports = ItemGenerator;