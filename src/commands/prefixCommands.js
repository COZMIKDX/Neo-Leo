//const Discord = require("discord.js");
const {MessageEmbed} = require('discord.js');
const myUtils = require('../myUtils.js');

// Node.js uses CommonJS format. So, it uses module.exports and require() rather than export and import.
exports.bday = (message) =>
{
	let embed = new MessageEmbed()
		.setTitle("HAPPY BIRTHDAY!!!")
		.setColor(0xf3f72a)
		.setImage("https://thumb1.shutterstock.com/display_pic_with_logo/522235/104525213/stock-photo-man-playing-with-party-blowers-104525213.jpg")
		.setTimestamp();

	message.channel.send({ embeds: [embed] });
};


const caidenImages = [
	"https://i.imgur.com/Asta7mE.png",
	"https://i.imgur.com/t6l4Vtw.jpg"
];
exports.caiden = (message) =>
{
	var index = myUtils.getRandomInt(0, caidenImages.length);
	var url = caidenImages[index];
	let embed = new MessageEmbed()
		.setTitle("He is still hungry")
		.setColor(0x1db207)
		.setImage(url)
		.setTimestamp();

	message.channel.send({ embeds: [embed] });
};

const leoImages = [
	"https://i.imgur.com/HpFkiYt.png",
	"https://i.imgur.com/qbLXdfb.png",
	"https://i.imgur.com/mRWnbAA.png"
];
exports.leo = (message) =>
{
	var index = myUtils.getRandomInt(0, leoImages.length);
	var url = leoImages[index];

	let embed = new MessageEmbed()
		.setTitle("The eater of worlds has entered the field!!!")
		.setColor(0x1db207)
		.setDescription("Lock your refrigerator")
		.setImage(url)
		.setTimestamp();

	message.channel.send({ embeds: [embed] });
}

const marshImages = [
	"https://i.imgur.com/QUelW1I.png",
	"https://i.imgur.com/3bS0v6U.png",
	"https://i.imgur.com/8Qnjs9Y.png"
];
exports.marsh = (message) =>
{
	var index = myUtils.getRandomInt(0, marshImages.length);
	var url = marshImages[index];

	let embed = new MessageEmbed()
	.setTitle("What is Marsh? We just don't know.")
	.setColor(0x1db207)
	.setDescription("Hide your rope!")
	.setImage(url)
	.setTimestamp();

	message.channel.send({ embeds: [embed] });
}

exports.money = (message) => {}

