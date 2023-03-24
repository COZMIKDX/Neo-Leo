const path = require('path');
const generator = require('./ItemGenerator.js');


exports.spiderNameGen = function()
{
  let absolutePath = path.resolve("./tools_features/spodeGen.json");
  let spodeGenerator = new generator(absolutePath);
  return spodeGenerator.generate();
}

