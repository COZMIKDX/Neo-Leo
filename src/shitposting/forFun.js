const myUtils = require('../myUtils.js');
var myMegaHal = require('../tools_features/myMegaHal.js');

const cringeWords = ["neural network", "neural net", "attack it"];
//exports.cringeWords = cringeWords;
const replies = ["oh?", "you know, that's real cool man.", "it sure is", "that's kinda gay", "lel yeah", "do it you won't", "DON'T LOOK AT ME", "bitch"];
//exports.replies = replies;

exports.NNDM = function(incomingMessage, message)
{
  var replyElem = 0;
  for (var i = 0; i < cringeWords.length; i++)
  {
    if (incomingMessage.includes(cringeWords[i])) //TODO: the some() function is undefined?
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
      
      break;
    }
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
      if (postCountObj.postCount >= 100)
      {
        postCountObj.postCount = 0;
        phraseElem = myUtils.getRandomInt(0,8);
        // This had to be updated. Now you must get the cache first.
        client.channels.cache.get('163520281707544576').send(phrases[phraseElem]);
        //console.log(test1);
      }
    }
}

// Random post using MegaHAL.
exports.randoSpeak = function (message, postCountObj, client) {
  if (!message.author.bot) {
    postCountObj.postCount = postCountObj.postCount + 1;

    // posts in pickle parade general channel when post count reaches a specified number from across all servers.
    if (postCountObj.postCount >= 100) {
      postCountObj.postCount = 0;
      // This had to be updated. It seems that you must now you must get the cache first if you want to post in a server without it being a reply.
      let text = myMegaHal.speak();
      client.channels.cache.get('163520281707544576').send(text);
      console.log(text);
    }
  }
}