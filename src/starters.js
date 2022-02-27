const Discord = require("discord.js");
const myUtils = require('./myUtils.js');

const passaggro = ["Hilarious", "Oh, sweetie...", "Aren't you just the greatest?", "you would say that", "I hope the rest of your day is just as lovely as you are.", "You're so smart, you must be at the top of the bell curve. "];

exports.starters = function(incomingMessage, message, isDisabled)
{
  if (!isDisabled)
  {
    if ((incomingMessage.includes("a random") || incomingMessage.includes("planted")))
    {
      message.channel.send(".pick");
    }

    //////--------------------- Jeremy's Gentle Bullying --------------------//////
    if (incomingMessage.includes("~~"))
    {
      let replyAggro = myUtils.getRandomInt(0,5);
      message.reply(passaggro[replyAggro]);
    }
    //////-------------------------------------------------------------------//////

       // If someone says ree.
    if (incomingMessage.startsWith("ree") && !message.author.bot)  //incomingMessage.toLowerCase()
    {
        message.reply("REEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        return;
    }

    //----------------------- if someone says oof. -------------------------
    if (incomingMessage.startsWith("oof"))
    {
        let embed = new Discord.MessageEmbed()
          .setTitle("oof")
          //.setAuthor()
          .setColor(0xf1f442)
          .setDescription("oof")
          //.setFooter()
          .setImage("https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2Foof.png?1556328981580")
          //.setThumbnail()
          .setTimestamp()
          //.setURL()
          //.addField("")
          //.addBlankField(true)

          message.channel.send({embeds: [embed]});
        return;
    }

    if (incomingMessage.includes("kek") && !message.author.bot)
    {
      let chance = myUtils.getRandomInt(1, 100);
      if (chance > 75) {
        message.channel.send("lel");
      }
      return;
    }

    if (incomingMessage.includes("lel") && !message.author.bot)
    {
      let chance = myUtils.getRandomInt(1, 100);
      if (chance > 75) {
        message.channel.send("kek");
      }
      return;
    }
  }


// A reference to that one trip with my friends to eureka springs and some pissed off dude at mcdonalds that got kicked out, yelled "BITCHES",
// and repeatedly slammed his hands against someone else's car.
  if (incomingMessage.startsWith("bitches"))
  {
      message.reply("WHACK WHACK WHACK WHACK");
      return;
  }


  //Disabled for no bulli
  /*if (incomingMessage.includes("marsh you have a message"))//marsh you have a message
  {

    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    return;
  }*/


  if (incomingMessage.includes("vote2kick"))
  {
    message.channel.send("no.");
    return;
  }


  /*if(incomingMessage.includes("thinking"))
  {
    message.channel.send("NO, YOU'RE ON DRUGS!!!");
    return;
  }
  */
}
