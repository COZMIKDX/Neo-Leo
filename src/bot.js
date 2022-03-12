/* My first node project. I am occasionally coming back to 
   Clean things up because I made this before knew much about
   node and javascript. Also, the it was too easy to run into both ES5 and ES6 tutorials
   online at the time, as a newcomer to JS.
   I'm still working on learning more.
 */

//The first file to be loaded is specified in packages.json. In this case, it is bot.js.

// HTTP server stuff
require('dotenv').config(); // Loads the .env contents.
const http = require('http');
const express = require('express'); 
const app = express();
const util = require('util'); //for printing objects with circulars.
const fs = require("fs");

// Used for ifft requests.
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

// Listen for requests. Not Discord stuff.
app.listen(process.env.PORT);

////////////////////////////////////////////////////////////////////////////////////


///////////////// Discord Bot stuff //////////////////////////////////////////
const { Client, Collection, Intents } = require("discord.js");
// client is the main discord bot app.
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// New way to do commands in discord.js. I'm sticking with prefix commands for now, though.
client.commands = new Collection();
// Prepare a list of files in the commands directory.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Add the commands. This is command handling.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const config = require("./config.json")
const prefixCommands = require('./prefixCommands.js');
const disabledChannels = require('./disabledChannels.js');
const quote = require('./quote.js');
const spiderGen = require('./spiderGen.js');
const starters = require('./starters.js');
const forFun = require('./forFun.js');
const money = require('./money.js');
const owner = require('./owner.js');

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

// Command handling stuff.
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


////////////////////////////////////// Message input and reply ///////////////////////////////////////////
client.on('messageCreate', (message) =>
{
	//console.log("MESSAGED")
  var incomingMessage = message.content.toLowerCase();

  //isDisabled = channelDisabledCheck(var obj = {disabledChannelsList, disabledChannels.length}, message);
  //conversation(message, newMessage);
  starters.starters(incomingMessage, message, isDisabled);
  myMegaHal.megaHalAI(message);
  //forFun.randoPosts(message, postCountObj, client);
  forFun.randoSpeak(message, postCountObj, client);
  forFun.NNDM(incomingMessage, message);
  owner.bomber(incomingMessage, message);

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
		message.reply(message.author.avatarURL());
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

	case "lightparty":
		HTTP.open("POST", process.env.lightparty);
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
		message.reply(postCountObj.postCount.toString());
		break;

	case "printcount": 
		message.reply(postCountObj.postCount.toString());
		break;

	case "channel" :
		idString = message.channel.id;
		client.channels.get('390737035792482314').send(idString);
		break;
		
	case "guilds" :
		client.guilds.forEach(element => console.log(element.name));
	}
});

client.login(config.token); //process.env.TOKEN);
