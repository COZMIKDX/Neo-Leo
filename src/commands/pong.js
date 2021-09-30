const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = { // Make stuff in a file available for use in other files. require() it in the other files.
    data: new SlashCommandBuilder()
        .setName('pong')
        .setDescription('Replies with Ping!'),
    async execute(interaction) {
        await interaction.reply('Ping!'); // it seems this is overridden if you also put on in bot.js
    }, //no clue why we keep putting commas at the end here.
}