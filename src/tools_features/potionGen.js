const path = require('path');
const generator = require('./ItemGenerator.js');


exports.potionGen = function()
{
  // I think the path is relative to the directory you launched the bot from.
  // I'll make it absolute in case I move the ItemGenerator file later.
  let absolutePath = path.resolve("./tools_features/potionGen.json");
  let potionGenerator = new generator(absolutePath);
  return potionGenerator.generate();
}

