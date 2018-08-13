/* Messy code below */
///////////////// Glitch SERVER stuff ////////////////////////////////////////////////
//The first file to be loaded is specified in packages.json. In this case, it is bot.js.
const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));


// Send the html file
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile(__dirname + '/views/index.html');
  //response.sendStatus(200); // This, for some reason, prevents the above sent html file from loading (or maybe even being sent) on the client's browser
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
////////////////////////////////////////////////////////////////////////////////////


///////////////// Bot stuff from here on //////////////////////////////////////////

console.log("bot.js ACCESSED");
const fs = require("fs"); 
const Discord = require("discord.js");
const client = new Discord.Client();
console.log("UWU");
const config = require("./config.json")

          //This module is required for R/W to JSON files.



const jsmegahal = require('jsmegahal');
var megahal = new jsmegahal(1);



////////////////////////////////////////////////////////////////////////////////////
/////////////////////// Functions //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
function getRandomInt(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    let finalNum = Math.floor(Math.random() * (max - min + 1)) + min; //random returns a decimal between 0 and 1. Multiply to scale.
    
    if (finalNum > max)
      finalNum = max;
  
    return finalNum;
}

function loadQuote()
{
  let data = fs.readFileSync("./quotes.json"); 
  let quotesOb = JSON.parse(data);
  return quotesOb;
}

function addQuote(newQuote)
{
  let quotesOb = loadQuote();
  //first add the new quote to the object's array. Then stringify the object and write to the file (it'll overwrite).
  quotesOb.quotes.push(newQuote);
  console.log("ADD2: " + quotesOb.quotes);

  fs.writeFile('quotes.json', JSON.stringify(quotesOb), (err) => {
    if (err)
    {
      console.error(err);
      return;
    };
  }
  );
}

function requestQuote(random, quoteNumber)
{
  let quotesOb = loadQuote();
  
  /*if (random == true)
  {
     //return a random quote.
  }*/
  
  //Make sure the requested number is in the array of quotes.
  if (quoteNumber > (quotesOb.quotes.length - 1))
    return "There's no quote here...";

  return quotesOb.quotes[quoteNumber];
}

//Checks if a channel is disabled (normie mode)
function channelIsDisabled(disabledChannels, message)
{  
  var length = disabledChannels.length;
  /*if (message.channel.id == 390737035792482314 && message.author.id == 157899020054822912)
  {
    message.channel.send("array length: " + length);  
  }*/
  
  for (var i = 0; i < length; i++)
  {    
    if (message.channel.id == disabledChannels[i])
    {
      isDisabled = true;
    }
  }
}

//adds a channel to the disabled list
function writeToDisabledChannels(disabledChannels)
{
  fs.writeFile('./disabledChannels.json', JSON.stringify(disabledChannels), (err) => {
    if (err)
    {
        console.error(err);
        return;
    };
    console.log('file written!');
  }
  );
}


function megaHalAI(incomingMessage, message, aiActive, megahal)
{
  if (aiActive)
  {   
    if (!message.author.bot && !message.content.includes(">") && !message.content.startsWith(".") && !message.content.includes("http"))
    {
      if (message.content.includes('.'))
        megahal.addMass(message.content);
      else
        megahal.add(message.content);
    }
  }
}

function conversation(message, newMessage)
{ 
  if (message.channel.id == 163520806729678849 && conversate == true && !message.author.bot && !message.content.includes(">"))
  {
    message.channel.send(megahal.getReplyFromSentence(message.content));
  }
}


function starters(incomingMessage, message, embed, isDisabled)
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
      replyAggro = getRandomInt(0,5);
      message.reply(passaggro[replyAggro]);
    }
    //////-------------------------------------------------------------------//////

       // If someone says ree.
    if (incomingMessage.startsWith("ree"))  //incomingMessage.toLowerCase()
    {
        message.reply("REEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        return;
    }
    
    //----------------------- if someone says oof. -------------------------
    if (incomingMessage.startsWith("oof"))
    {
        embed = new Discord.RichEmbed()
          .setTitle("oof")
          //.setAuthor()
          .setColor(0xf1f442)
          .setDescription("oof")
          //.setFooter()
          .setImage("https://t6.rbxcdn.com/b62b3d9a491833f233d41f3cd4afe205")
          //.setThumbnail()
          .setTimestamp()
          //.setURL()
          //.addField("")
          //.addBlankField(true)

          message.channel.send({embed});
        return;
    }
    
    if (incomingMessage.includes("kek") && !message.author.bot)
    {
      message.channel.send("lel");
      return;
    }

    if (incomingMessage.includes("lel") && !message.author.bot)
    {
      message.channel.send("kek");
      return;
    }
  }



  if (incomingMessage.startsWith("bitches"))
  {
      message.reply("WHACK WHACK WHACK WHACK");
      return;
  }


  
  if (incomingMessage.includes("marsh you have a message"))//marsh you have a message
  {
    
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    message.channel.send({reply: message.channel.members.get('163719681503526912')});
    return;
  }


  if (incomingMessage.includes("vote2kick"))
  {
    client.channels.get('163520281707544576').send("no.");
    return;
  }
  
  
  if(incomingMessage.includes("thinking"))
  {
    message.channel.send("NO, YOU'RE ON DRUGS!!!");
    return;
  }
}


  //////----------------------------------- Neural Network Deterence Module (NNDM) ------------------------------//////
function NNDM(incomingMessage, message, cringeWords, replies)
{
  var replyElem = 0;
  if (cringeWords.some(word => incomingMessage.includes(word)))
  {
    replyElem = getRandomInt(0,7);
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


function randoPosts(message)
{
   var phraseElem;
    // counts posts
    if (!message.author.bot)
    {
      postCount = postCount + 1;
      
      // posts in pickle parade general channel when post count reaches 150.
      if (postCount >= 150)
      {
          postCount = 0;
          phraseElem = getRandomInt(0,8);
          client.channels.get('163520281707544576').send(phrases[phraseElem]);
      } 
    }
}

function spiderNameGen()
{
  let data = fs.readFileSync("./spodeGen.json"); //load the spode file
  let spodeGenOb = JSON.parse(data); //put the data in the spode file into an object after parsing it.
  
  let location    = spodeGenOb.Locations[getRandomInt(0,spodeGenOb.Locations.length - 1)];
  let bodyPart    = spodeGenOb.BodyPart[getRandomInt(0, spodeGenOb.BodyPart.length - 1)];
  let destruction = spodeGenOb.Destruction[getRandomInt(0, spodeGenOb.Destruction.length - 1)];
  let modifier = "";
  let rand = Math.random();
  if (rand < .2)
    modifier = spodeGenOb.Modifiers[getRandomInt(0, spodeGenOb.Modifiers.length - 1)];
 
  return location + " " + bodyPart + " " + destruction + " " + modifier;
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// variables ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
var embed = new Discord.RichEmbed();
const cringeWords = ["neural network", "neural net", "attack it"];
const replies = ["oh?", "you know, that's real cool man.", "it sure is", "that's kinda gay", "lel yeah", "do it you won't", "DON'T LOOK AT ME", "bitch"];

var replyAggro = 0;
const passaggro = ["Hilarious", "Oh, sweetie...", "Aren't you just the greatest?", "you would say that", "I hope the rest of your day is just as lovely as you are.", "You're so smart, you must be at the top of the bell curve. "];

var postCount = 0;
const phrases = ["you come here often?", "adadadadadada", "BITCHEEES!! WHACK WHACK WHACK WHACK", "Yo, you got some black?", "can you not?", "huh?", "CHOMBO", "sus", "that's kinda gay"];

var aiActive = true;

var disabledChannels = [];

var isDisabled = false;
var disabledChannelsLoaded = false;

var conversate = false;
var newMessage = false;

var quotes = [];


/////////////////////////////////////// start  ////////////////////////////////////////////
client.on("ready", () => {
  console.log("This is Pequod! Coming in hot!");

});





///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Message input and reply ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
client.on("message", (message) =>
{
  var incomingMessage = message.content.toLowerCase();
  isDisabled = false;
  
  //PROBLEM: This loads a null element into the array when the json is empty. Causing the array length to be 2 when only one channel has been added.
  //Temp Solution: Comment this if the JSON is empty. Uncomment if the JSON is filled.
  if (disabledChannelsLoaded == false)
  {
    //message.channel.send("loading");
    disabledChannelsLoaded = true;
    fs.readFile('./disabledChannels.json', 'utf-8', function(err, data) 
    {
	    if (err){ console.error(err); return;};
      
      var parsed = JSON.parse(data);
      
      for (var x in parsed)
      {
	      disabledChannels.push(parsed[x]);
      }
    });
  }
  
  
  
  
  
  channelIsDisabled(disabledChannels, message);
  conversation(message, newMessage);
  starters(incomingMessage, message, embed, isDisabled);
  megaHalAI(incomingMessage, message, aiActive, megahal);
  //randoPosts(message);
  NNDM(incomingMessage, message, cringeWords, replies);
  
  //--- JeremyGate ---//
  /*var jeremy = false;
  if (message.author.id == 310914799154233345 || jeremy == true)
  {
     jeremy = true;
     message.channel.send("WHACK WHACK WHACK WHACK                                   wwwwwwwwwwweeeeeeeeeeeeeeeeeeeeeeeeeRRRRRRRRRRRRREEEEEE");
  }
  */

///////-------------------- Owner only --------------------///////
if (incomingMessage.includes("i caught the bomber"))
{
  embed = new Discord.RichEmbed()
        //.setTitle("You X Beat X Greed X Island!")
        //.setAuthor()
        .setColor(0xffffff)
        //.setDescription("You dirty old man. Here you go anyways")
        //.setFooter()
        .setImage("http://i.imgur.com/nIau2PV.jpg")
        //.setThumbnail()
        //.setTimestamp()
        //.setURL()
        //.addField("")
        //.addBlankField(true)

        message.channel.send({embed});
}


///////////////////////////////////////////////////////////////////////////////////////////////
//                                  Prefix messages                                          //
///////////////////////////////////////////////////////////////////////////////////////////////


  var idString;
  const channels = ['365995102499373059', '163520281707544576']

  // if the message doesn't start with the prefix or the bot sent it, ignore it.
  if (!incomingMessage.startsWith(config.prefix) || message.author.bot) return; 

  const sentenceInput = incomingMessage; //Not used.
  const args = incomingMessage.slice(config.prefix.length).trim().split(/ +/g);    // slice(config.prefix.length) truncates the length of the prefix from the message.
                                                                                   // trim() removes unneeded spaces on both sides of the message.
                                                                                   // split() I think tokenizes the message.
  const command = args.shift().toLowerCase();                 //shift() pops the first element in the args array and returns it. The popped element is stored in the command var.
                                                              //The next element in args is probably an argument.
  switch (command)
  {
    case "loli":
      embed = new Discord.RichEmbed()
        .setTitle("Loli")
        //.setAuthor()
        .setColor(0xfc7fff)
        .setDescription("You dirty old man. Here you go anyways")
        //.setFooter()
        .setImage("https://i.imgur.com/JrYGP25.png")
        //.setThumbnail()
        .setTimestamp()
        //.setURL()
        //.addField("")
        //.addBlankField(true)

        message.channel.send({embed});
      break;

    case "bday":
      embed = new Discord.RichEmbed()
        .setTitle("HAPPY BIRTHDAY!!!")
        //.setAuthor()
        .setColor(0xf3f72a)
        //.setDescription("You dirty old man.")
        //.setFooter()
        .setImage("https://thumb1.shutterstock.com/display_pic_with_logo/522235/104525213/stock-photo-man-playing-with-party-blowers-104525213.jpg")
        //.setThumbnail()
        .setTimestamp()
        //.setURL()
        //.addField("")
        //.addBlankField(true)

        message.channel.send({embed});
      break;

    case "look":
      message.channel.send("DON'T LOOK AT ME!");
      break;
      
    case "pepsi":
      message.channel.send("No, you're on drugs!");
      break;

    case "countedit" :
      let number = args[0];
      postCount = Number(number);
      message.reply(postCount);
      break;

    case "avatar" :
        message.reply(message.author.avatarURL);
      break;

    case "channel" :
      idString = message.channel.id;
      client.channels.get('390737035792482314').send(idString);
      break;
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case "normiemode" :
      disabledChannels.push(message.channel.id);
      writeToDisabledChannels(disabledChannels);
      message.channel.send("normies ree");
      break;

    case "send" :
      let text = args[0];
      let chan = args[1];
      if (message.author.id == 157899020054822912)
      {
        switch(chan)
        {
          case "pickle" :
            chan = channels[1];
            break;
          
          case "manual":
            chan = '413914551025664020';
            break;
        }
        client.channels.get(chan).send(text); //
      }
      break;

    case "caiden":
    {
      embed = new Discord.RichEmbed()
      .setTitle("He is still hungry")
        //.setAuthor()
        .setColor(0x1db207)
        //.setDescription("You dirty old man.")
        //.setFooter()
        .setImage("https://media.discordapp.net/attachments/320339084172066823/397275316894040064/caidenAlpha.png")
        //.setThumbnail()
        .setTimestamp()
        //.setURL()
        //.addField("")
        //.addBlankField(true)

        message.channel.send({embed});
    }
    break;

    case "leo":
    {
      embed = new Discord.RichEmbed()
      .setTitle("The eater of worlds has entered the field!!!")
        //.setAuthor()
        .setColor(0x1db207)
        .setDescription("Lock your refrigerator")
        //.setFooter()
        .setImage("https://media.discordapp.net/attachments/390737035792482314/409560012076351489/challenger_leo.png?width=545&height=663")
        //.setThumbnail()
        .setTimestamp()
        //.setURL()
        //.addField("")
        //.addBlankField(true)

        message.channel.send({embed});
    }
    break;

    case "printcount":
    {
      message.reply(postCount);
    }
    break;
      
    case "megahal":
    {
      if (aiActive)
      {
        aiActive = false;
        message.channel.send("```\nMegaHal AI is now disabled\n```");
      }
      else if (!aiActive)
      {
        aiActive = true;
        message.channel.send("```\nMegaHal AI is now enabled\n```");
      }
    }
    break;
      
    case "converse" :
    {
      if (conversate == false)
      {
        conversate = true; 
        message.channel.send("conversation mode on: " + conversate);
      }
      
      else if (conversate == true)
      {
        conversate = false; 
        message.channel.send("conversation mode off: " + conversate);
      }
    }
    break;
      
    case "speak":
    {
      if (Object.keys(megahal.quads).length == 0) //Check if object is empty.
        message.channel.send("```\nError: [No words available]\n```");
      else
        message.channel.send(megahal.getReply()) // send(megahal.getReply(),{tts: true});
    }
    break;
      
    case "spode":
    {
      let spiderName = spiderNameGen();
      message.channel.send(spiderName);
    }
    break;
      
    case "quote":
    {
      // format is >quote [new quote]  or  >quote get [number of quote to get]
            
      if (args[0] != "get") //if we have an argument. (meaning we wanna add a quote, in this case.)
      {
        //incomingMessage.slice(config.prefix.length).trim().split();   //take incoming message and cut prefix, and command. Keep the rest and as a full string.
        let newQuote = args[0] + " ";
        for (let i = 1; i < args.length; i++)
        {
          newQuote = newQuote + args[i];
          if (i != args.length - 1) newQuote = newQuote + " ";  
        }
        
        addQuote(newQuote);
      }
          
      else if (args[0] == "get") 
      {
        message.channel.send(requestQuote(false, args[1]));
      }
    }
    break;
  }
});

client.login(process.env.TOKEN);
