const fs = require("fs");
const myUtils = require('../myUtils.js');
const generator = require('./ItemGenerator.js');

exports.spiderNameGen = function()
{
  let spodeGenerator = new generator("./spodeGen.json");
  return spodeGenerator.generate();
}

