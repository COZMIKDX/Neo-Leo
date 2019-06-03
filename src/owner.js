const Discord = require("discord.js");

//Figure out what to do with this. A starter maybe?
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
