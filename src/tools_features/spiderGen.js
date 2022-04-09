const fs = require("fs");
const myUtils = require('../myUtils.js');

exports.spiderNameGen = function()
{
  let data = fs.readFileSync("./tools_features/spodeGen.json"); //load the spode file
  let spodeGenOb = JSON.parse(data); //put the data in the spode file into an object after parsing it.
  
  let location    = spodeGenOb.Locations[myUtils.getRandomInt(0,spodeGenOb.Locations.length - 1)];
  let bodyPart    = spodeGenOb.BodyPart[myUtils.getRandomInt(0, spodeGenOb.BodyPart.length - 1)];
  let destruction = spodeGenOb.Destruction[myUtils.getRandomInt(0, spodeGenOb.Destruction.length - 1)];
  let modifier = "";
  let rand = Math.random();
  if (rand < .2)
    modifier = spodeGenOb.Modifiers[myUtils.getRandomInt(0, spodeGenOb.Modifiers.length - 1)];
 
  let spodeName = location + " " + bodyPart + " " + destruction;
  if (modifier.startsWith(',')) {
    spodeName = spodeName.concat(modifier);
  }
  else {
    spodeName = spodeName.concat(' ', modifier);
  }
  return spodeName
}

