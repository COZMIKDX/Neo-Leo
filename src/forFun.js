const myUtils = require('./myUtils.js');

const cringeWords = ["neural network", "neural net", "attack it"];
const replies = ["oh?", "you know, that's real cool man.", "it sure is", "that's kinda gay", "lel yeah", "do it you won't", "DON'T LOOK AT ME", "bitch"];

exports.NNDM = function(incomingMessage, message, cringeWords, replies)
{
  var replyElem = 0;
  if (cringeWords.some(word => incomingMessage.includes(word))) //TODO: the some() function is undefined?
  {
    let replyElem = myUtils.getRandomInt(0,7);
    if (incomingMessage.includes("attack it"))
    {
        if (message.author.id == 135363197166288897)
        {
            message.reply(replies[replyElem]);
        }
    }
    else
    {
      message.reply(replies[replyElem]);
    }
    // Or just do message.delete();
  }
}


const phrases = ["you come here often?", "adadadadadada", "BITCHEEES!! WHACK WHACK WHACK WHACK", "Yo, you got some black?", "can you not?", "huh?", "CHOMBO", "sus", "that's kinda gay"];
exports.randoPosts = function(message, postCountObj, client)
{
   var phraseElem = 0;
    // counts posts
    if (!message.author.bot)
    {
      postCountObj.postCount = postCountObj.postCount + 1;

      // posts in pickle parade general channel when post count reaches 150.
      if (postCountObj.postCount >= 500)
      {
          postCountObj.postCount = 0;
          phraseElem = myUtils.getRandomInt(0,8);
          client.channels.get('163520281707544576').send(phrases[phraseElem]);
      }
    }
}
