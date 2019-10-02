//Not complete. I still need to make 

const Discord = require("discord.js");
const myUtils = require('./myUtils.js');


exports.loli = function(message)
{
	let embed = new Discord.RichEmbed()
		.setTitle("Loli")
		//.setAuthor()
		.setColor(0xfc7fff)
		.setDescription("You dirty old man.")
		//.setFooter()
		.setImage("https://i.imgur.com/JrYGP25.png")
		//.setThumbnail()
		.setTimestamp()
		//.setURL()
		//.addField("")
		//.addBlankField(true)

		message.channel.send({embed});
}

exports.bday = function(message)
{
	let embed = new Discord.RichEmbed()
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
}


const friendURLs = ["https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2Fchallenger_leo.png?1544592269001", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FFightersPassDLC.png?1544592242890", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FcaidenAlpha.png?1544592259586", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FnewCaiden.jpg?1543260895298", "https://cdn.glitch.com/843b538e-c8b4-4e06-9e17-0de07a61c029%2FN_O_T_O_W_L_C_I_T_Y.PNG?1544592244642"];

exports.caiden = function(message)
{
	var index = myUtils.getRandomInt(2,3);
	var url = friendURLs[index];
	let embed = new Discord.RichEmbed()
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

exports.leo = function(message)
{
	var index = myUtils.getRandomInt(0,1);
	var url = friendURLs[index];

	let embed = new Discord.RichEmbed()
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

exports.marsh = function(message)
{
	var index = myUtils.getRandomInt(4,4);
	var url = friendURLs[index];

	let embed = new Discord.RichEmbed()
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

exports.money = function(message)
{
  
}

