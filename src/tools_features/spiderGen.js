const path = require('path');
const generator = require('./ItemGenerator.js');


exports.spiderNameGen = function()
{
  // I think the path is relative to the directory you launched the bot from.
  // I'll make it absolute in case I move the ItemGenerator file later.
  let absolutePath = path.resolve("./tools_features/spodeGen.json");
  let spodeGenerator = new generator(absolutePath);
  return spodeGenerator.generate();
}

