const Discord = require("discord.js");


//Figure out what to do with this. A starter maybe?
exports.bomber = function(text, message) {
  if (text.includes("i caught the bomber"))
  {
    let embed = new Discord.MessageEmbed()
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

    message.channel.send({ embeds: [embed] });
  }
}
