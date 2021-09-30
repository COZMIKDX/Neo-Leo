const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = { // Make stuff in a file available for use in other files. require() it in the other files.
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) { // I screwed up and typed execture. This caused client.execute is not a function problems
        await interaction.reply('Pong!'); // it seems this is overridden if you also put on in bot.js
    }, //no clue why we keep putting commas at the end here.
}