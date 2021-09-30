/* Messy code below */
///////////////// Glitch SERVER stuff ////////////////////////////////////////////////
//The first file to be loaded is specified in packages.json. In this case, it is bot.js.
const http = require('http');
const express = require('express'); 
const app = express();

//Used for ifft requests.
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const HTTP = new XMLHttpRequest();

app.use(express.static('public'));

// Send the html file
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile('/app/views/index.html');
  //response.sendStatus(200); // This, for some reason, prevents the above sent html file from loading (or maybe even being sent) on the client's browser
});


app.get("/atoc", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendFile('/app/views/alexistochristian.html');
  //response.sendStaftus(200); // This, for some reason, prevents the above sent html file from loading (or maybe even being sent) on the client's browser
});

app.post("/funpost", (req, res) => {
  res.send("swooce\n");
  //client.channels.get('390737035792482314').send("testtextttt");
});



/*
app.get("/alexistochristian", (request, response) => {
  console.log(Date.now() + ": Sending amount of money Alexis owes Christian.")
});
*/

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
////////////////////////////////////////////////////////////////////////////////////


///////////////// Bot stuff from here on //////////////////////////////////////////
var util = require('util'); //for printing objects with circulars.
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json")
const prefixCommands = require('./prefixCommands.js');
const disabledChannels = require('./disabledChannels.js');
const quote = require('./quote.js');
const spiderGen = require('./spiderGen');
const starters = require('./starters.js');
const forFun = require('./forFun.js');
const money = require('./money.js');

var myMegaHal = require('./myMegaHal.js');


/////////////////////// Functions //////////////////////////////////////////////////
/*function conversation(message, newMessage)
{
  if (message.channel.id == 163520806729678849 && conversate == true && !message.author.bot && !message.content.includes(">"))
  {
    message.channel.send(megahal.getReplyFromSentence(message.content));
  }
}*/

///////////////////////////////////// variables ///////////////////////////////////////////
var disabledChannelsList = [];
var isDisabled = false;
//var conversate = false;
var newMessage = false;
var postCountObj = {postCount: 0};


/////////////////////////////////////// start  ////////////////////////////////////////////
client.on("ready", () => {
  console.log("This is Pequod! Coming in hot!");

});



////////////////////////////////////// Message input and reply ///////////////////////////////////////////
client.on("message", (message) =>
{
  var incomingMessage = message.content.toLowerCase();

  //isDisabled = channelDisabledCheck(var obj = {disabledChannelsList, disabledChannels.length}, message);
  //conversation(message, newMessage);
  starters.starters(incomingMessage, message, isDisabled);
  myMegaHal.megaHalAI(message);
  forFun.randoPosts(message, postCountObj, client);
  forFun.NNDM(incomingMessage, message);

  //--- JeremyGate ---//
  /*var jeremy = false;
  if (message.author.id == 310914799154233345 || jeremy == true)
  {
     jeremy = true;
     message.channel.send("WHACK WHACK WHACK WHACK                                   wwwwwwwwwwweeeeeeeeeeeeeeeeeeeeeeeeeRRRRRRRRRRRRREEEEEE");
  }
  */

/////////////////////////////////////// Prefix messages ///////////////////////////////////////
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
		prefixCommands.loli(message);
		break;

	case "bday":
		prefixCommands.bday(message);
		break;

	case "look":
		message.channel.send("DON'T LOOK AT ME!");
		break;

	case "pepsi":
		message.channel.send("No, you're on drugs!");
		break;


// etc features//
	case "avatar" :
		message.reply(message.author.avatarURL);
		break;


//bot channel settings//
	case "normiemode" :
		disabledChannels.push(message.channel.id);
		disabledChannels.writeToDisabledChannels(disabledChannels);
		message.channel.send("normies ree");
		break;

	case "guilddisable" :
		disabledChannels.push(message.guild);
		disabledChannels.writeToDisabledChannels(disabledChannels);
		message.channel.send("received");
		break;

//Friends//
	case "caiden":{ prefixCommands.caiden(message); }
	break;

	case "leo":{ prefixCommands.leo(message); }
	break;

	case "marsh":{ prefixCommands.marsh(message); }
	break;

//Megahal//
	case "megahal":{ myMegaHal.powerToggle(); }
	break;

	case "speak":
		/*if (Object.keys(megahal.quads).length == 0) //Check if object is empty.
		message.channel.send("```\nError: [No words available]\n```");
		else*/
		message.channel.send(myMegaHal.speak(args[0])); // send(megahal.getReply(),{tts: true});
		break;

    case "mtojson":{ myMegaHal.saveMegaHal(); }
    break;

    /*case "converse" :
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
    break;*/



	case "spode":{ message.channel.send(spiderGen.spiderNameGen()); }
	break;

	case "quote":
		// format is >quote [new quote]  or  >quote get [number of quote to get]
		if (args[0] == "get")
			message.channel.send(quote.requestQuote(false, args[1]));

		else
			quote.addQuote(args);
		break;

//Smart light//
	case "lightoff":
    // Getting an HTTP object ready and then sending it.
		HTTP.open("POST", 'https://maker.ifttt.com/trigger/turn_light_off/with/key/de9DCw59UDehjDwuK8LwA6');
		HTTP.send()
	break;

	case "lighton":
		HTTP.open("POST", 'https://maker.ifttt.com/trigger/turn_light_on/with/key/de9DCw59UDehjDwuK8LwA6');
		HTTP.send();
		break;

	case "autismparty":
		HTTP.open("POST", process.env.lightautism);
		HTTP.send();
		break;

	case "lightnormal":
		HTTP.open("POST", process.env.lightnormal);
		HTTP.send();
		break;

//Bot testing//
	case "countedit" :
		let number = args[0];
		postCountObj.postCount = Number(number);
		message.reply(postCountObj.postCount);
		break;

	case "printcount":{ message.reply(postCountObj.postCount); }
	break;

	case "channel" :
		idString = message.channel.id;
		client.channels.get('390737035792482314').send(idString);
		break;
    
  case "money" :
    money.addDebt(args[0], message.author.id, message.channel);
    break;
    
  case "debt" : 
    money.debtQuery(message.channel);
    
  case "guilds" :
    client.guilds.forEach(element => console.log(element.name));
  }
});

client.login(process.env.TOKEN);
