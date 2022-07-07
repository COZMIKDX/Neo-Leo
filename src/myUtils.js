exports.getRandomInt = function(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    let finalNum = Math.floor(Math.random() * (max - min + 1)) + min; //random returns a decimal between 0 and 1. Multiply to scale.
    
    if (finalNum > max)
      finalNum = max;
  
    return finalNum;
}

// Pass in the percent chance you want for something to happen.
// ex)
exports.percentChanceCheck = function(desiredChance) {
  return Math.random() < desiredChance;
}