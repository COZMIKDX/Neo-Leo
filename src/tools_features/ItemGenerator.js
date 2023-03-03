const fs = require("fs");
const myUtils = require('../myUtils.js');
let parsedOb;

// Right now, a new generator will be created each time the user calls a generation command.
// This means the json file will be read and parsed each time.
// Later I'll look into doing something like keeping parsed file object for a little while after the generation
//  is completed since we like to spam it.
//  If keep that in a static variable, it'll always be taking up memory.
class ItemGenerator {
    constructor(filepath) {
        let data = fs.readFileSync(filepath);
        parsedOb = JSON.parse(data);
    }

    generate() {
        // console.log(parsedOb);
        let numberOfFields = parsedOb.length;
        let output = "";
        for (let field in parsedOb) {
            // console.log(parsedOb[field][0]);
            // TODO: figure out how to tell if a field is the modifier field.
            if (field == "Modifier") {
                let rand = Math.random();
                if (rand < .2) {
                    let modifier = parsedOb[field][myUtils.getRandomInt(0,parsedOb)]
                }
            }
            output = output + " " + parsedOb[field][myUtils.getRandomInt(0, parsedOb[field].length - 1)];

            let item = parsedOb[field][myUtils.getRandomInt(0, parsedOb[field].length - 1)];
            if (field == "Modifier") {
                let rand = Math.random();
                if (rand < .2) {
                    if (item.startsWith(',')) {
                        output = output + item;
                    }
                    else {
                        output = output + " " + item;
                    }
                }
            }
            else {
                output = output + " " + item;
            }
        }

        return output;
    }
}

module.exports = ItemGenerator;