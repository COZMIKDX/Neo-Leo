const fs = require("fs");
const myUtils = require('../myUtils.js');

// Right now, a new generator will be created each time the user calls a generation command.
// This means the json file will be read and parsed each time.
// Later I'll look into doing something like keeping parsed file object for a little while after the generation
//  is completed since we like to spam it.
//  If keep that in a static variable, it'll always be taking up memory.
class ItemGenerator {
    constructor(filepath) {
        let data = fs.readFileSync(filepath);
        let parsedOb = JSON.parse(data);

        let numberOfFields = parsedOb.length;
        let output = "";
        for (field in parsedOb) {
            // TODO: figure out how to tell if a field is the modifier field.
            output = output + " " + field[myUtils.getRandomInt(0, numberOfFields - 1)];
        }

        return output;
    }
}