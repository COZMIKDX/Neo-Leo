/* Messy code below */
///////////////// Glitch SERVER stuff ////////////////////////////////////////////////
//The first file to be loaded is specified in packages.json. In this case, it is bot.js.
const http = require('http');
const express = require('express');
const app = express();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTTP = new XMLHttpRequest();

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
var util = require('util') //for printing objects with circulars.
console.log("bot.js ACCESSED");
const fs = require("fs"); 
const Discord = require("discord.js");
const client = new Discord.Client();
console.log("UWU");
const config = require("./config.json")

          //This module is required for R/W to JSON files.



const jsmegahal = require('jsmegahal');
var megahal = new jsmegahal(1);  //1 is the minimum number of words in a post for it to be saved



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
    if( message.guild != null)
    {
      if ((message.guild.id == disabledChannels[i]))
      {
        isDisabled = true;
      }
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
    if (!message.author.bot && !message.content.includes(">") && !message.content.startsWith(".") && !message.content.includes("http") && !isDisabled)
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

const friendURLs = ["https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2Fchallenger_leo.png?1544592269001", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FFightersPassDLC.png?1544592242890", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FcaidenAlpha.png?1544592259586", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FnewCaiden.jpg?1543260895298", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FN_O_T_O_W_L_C_I_T_Y.PNG?1544592244642"];

var aiActive = true;

var disabledChannels = [];

var isDisabled = false;
var disabledChannelsLoaded = false;

var conversate = false;
var newMessage = false;

var quotes = [];

var secretSanta = false;
var secretSantaGuildList = [];
var tempSS = 0;


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
  
  if (secretSanta == true)
  { tempSS++; console.log("number of messages: " + tempSS); console.log("Message contains: " + message.content)}
  
  
  
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
      
    case "guilddisable" :
      disabledChannels.push(message.guild.id);
      writeToDisabledChannels(disabledChannels);
      message.channel.send("received");
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
      var index = getRandomInt(2,3);
      var url = friendURLs[index];
      embed = new Discord.RichEmbed()
      .setTitle("He is still hungry")
        //.setAuthor()
        .setColor(0x1db207)
        //.setDescription("You dirty old man.")
        //.setFooter()
        .setImage(url)
        //https://media.discordapp.net/attachments/320339084172066823/397275316894040064/caidenAlpha.png
      //
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
      var index = getRandomInt(0,1);
      var url = friendURLs[index];
      
      embed = new Discord.RichEmbed()
      .setTitle("The eater of worlds has entered the field!!!")
        //.setAuthor()
        .setColor(0x1db207)
        .setDescription("Lock your refrigerator")
        //.setFooter()
        .setImage(url)
        //.setThumbnail()
        .setTimestamp()
        //.setURL()
        //.addField("")
        //.addBlankField(true)

        message.channel.send({embed});
    }
    break;
      
    case "marsh":
    {
      var index = getRandomInt(4,4);
      var url = friendURLs[index];
      
      embed = new Discord.RichEmbed()
      .setTitle("What is Marsh? We just don't know.")
        //.setAuthor()
        .setColor(0x1db207)
        .setDescription("Hide your rope!")
        //.setFooter()
        .setImage(url)
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
    
    case "reset":
    {
      megahal = new jsmegahal(1);
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
      
    case "lightoff":
    {
      HTTP.open("POST", 'https://maker.ifttt.com/trigger/turn_light_off/with/key/de9DCw59UDehjDwuK8LwA6');
      HTTP.send();
    }
    break;
      
    case "lighton":
    {
      HTTP.open("POST", 'https://maker.ifttt.com/trigger/turn_light_on/with/key/de9DCw59UDehjDwuK8LwA6');
      HTTP.send();
    }
    break;
      
    case "autismparty":
    { 
      HTTP.open("POST", 'https://maker.ifttt.com/trigger/turn_light_rainbow/with/key/de9DCw59UDehjDwuK8LwA6');
      HTTP.send();
    }
    break;
    
    case "lightnormal":
    {
      HTTP.open("POST", 'https://maker.ifttt.com/trigger/turn_light_normal/with/key/de9DCw59UDehjDwuK8LwA6');
      HTTP.send();
    }
    break;
      
    case "secretsanta":
    {
      let channel = false;
      let player = false;
      
      if (args[0] == "join")
      {
        if (secretSanta == true)
        {       
          for (let i = 0; (i < secretSantaGuildList.length) && (channel == false); i++)
          {
            //Check if this channel is already enrolled.
            //If it is, check if the message's author is enrolled. If not, then enroll them.
            //If the channel isn't enrolled, then enroll it and enroll the message author too.
            if (secretSantaGuildList[i].channelid == message.channel.id)
            {
              channel = true;
              
              console.log("JOIN PrePush Players: " + util.inspect(secretSantaGuildList[i].players));

              //check if this player is already enrolled.
              for (let j = 0; (j < secretSantaGuildList[i].players.length) && (player == false); j++)
              {
                if (secretSantaGuildList[i].players[j].id == message.author.id)
                {
                  player = true;
                  message.reply("You are already participating in this secret santa.");
                }
              }

              //add the message author if they aren't already enrolled.
              if (player == false)
              {
                secretSantaGuildList[i].players.push(message.author);

                message.reply("You're now participating in this secret santa");
                console.log("JOIN PostPush Players: " + util.inspect(secretSantaGuildList.players));
              }
            }
          }

          //add the channel if it wasn't found and add the message author too.
          if (channel == false)
          {
            console.log("adding channel");
            secretSantaGuildList.push({channelid: message.channel.id, players: []});
            secretSantaGuildList[secretSantaGuildList.length - 1].players.push(message.author);
            message.reply("You're now participating in this secret santa");
          }

        }
        else
        {
          secretSanta = true;
          secretSantaGuildList = [];
          secretSantaGuildList.push({channelid: message.channel.id, players: []});
          secretSantaGuildList[0].players.push(message.author);
          message.channel.send("Secret santa session created.");
          message.reply("You're now participating in this secret santa.");

          //console.log("SS 1\n" + util.inspect(secretSantaGuildList));
        }
      }
      
      else if (args[0] == "start")
      {
        let channel = false;

        console.log("Starting secret santa decision process."); //////////////////////////////////////////////////
        if (secretSanta == true)
        {
          console.log
          
          //check if channel is ready.
          let i; //for use in the selection process.
          
          for (i = 0; (i < secretSantaGuildList.length) && (channel == false); i++)
          {
            if (secretSantaGuildList[i].channelid == message.channel.id)
            {
              channel = true;
              break;
            }
          }
          
          //where the decision and message sends.
          if (channel == true)
          { 
            let tempArray = secretSantaGuildList[i].players.slice(0);
            let p1 = 0;
            
            //console.log("START: Channel is true\n" + "tempArray length: " + tempArray.length + "\ntempArray User: " + tempArray[0].username + "\nlist User: " + secretSantaGuildList[i].players[0].username);      
            
            for (let j = 0; j < secretSantaGuildList[i].players.length; j++)
            {
              if((tempArray.length == 1) && (secretSantaGuildList[i].players[j].id == tempArray[0].id))
              { 
                console.log("Final person has no match!");
                secretSantaGuildList[i].players[j].send("Error: You don't have a match. Tell the others and try again."); 
                //no break needed. This only happens for the final entry in the players array.
              }
              
              else
              {
                //do-while
                do 
                {
                  p1 = getRandomInt(0, tempArray.length - 1);
                }
                while ((secretSantaGuildList[i].players[j].id == tempArray[p1].id));
              
                  
                console.log(secretSantaGuildList[i].players[j].username + " is assigned to " + tempArray[p1].username + " index: " + p1);
                secretSantaGuildList[i].players[j].send("You are secret santa for " + tempArray[p1].username);
                
                //console.log("players before splice: " + util.inspect(tempArray));
                tempArray.splice(p1,1);
                //console.log("players left: " + util.inspect(tempArray));
              }
            }
          }
          
          else if (channel == false)
            message.channel.send("You need to create a session first.");
        }
        
        else if (secretSanta == false)
          message.channel.send("You need to create a session first.");
      }
      
      else if (args[0] == "exit")
      {
        for (let i = 0; i < secretSantaGuildList.length; i++)
        {
          if (secretSantaGuildList[i].channelid == message.channel.id)
          {
            secretSantaGuildList.splice(i,1);
          }
        }
      }
    }
    break;
      
    case "numgen":
    {
      let num = 0;
      let count = 0;
      
      while (count < 10)
      { //decrease upper range of randoint func to simulate the secret santa 
        //do
        //{
          num = getRandomInt(0, 3);
        //} while (num == 1);
        console.log(num);
        //num = 0;
        count++;
      }
    }
    break;
  }
});

client.login(process.env.TOKEN);
