// You only need to run this once. Run it again if you make any edits.
// run using $ node deploy-commands.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const pickleId = "163520281707544576";

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
    .map(command => command.toJSON());



const rest = new REST({ version: '9' }).setToken(token);

//use Routes.applicationGuildCommands(clientId, guildId).then(() => console.log('Successfully registered application commands.'))
//    .catch (console.error); //for guild specific commands.
// the {body: commands} is selecting the list of commands made above.
rest.put(Routes.applicationCommands(clientId), { body: commands },);
    
rest.put(Routes.applicationGuildCommands(clientId, pickleId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);