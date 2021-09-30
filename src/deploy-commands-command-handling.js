// This is the deploy-commands file but using command handling
// instead. This way the commands are in their own files.

// You only need to run this once. Run it again if you make any edits.
// run using $ node deploy-commands-command-handling.js

// Seems to only run successfully if the bot is not running...

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const pickleId = "163520281707544576";

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

//use Routes.applicationGuildCommands(clientId, guildId).then(() => console.log('Successfully registered application commands.'))
//    .catch (console.error); //for guild specific commands.
// the {body: commands} is selecting the list of commands made above.
rest.put(Routes.applicationCommands(clientId), { body: commands },);

rest.put(Routes.applicationGuildCommands(clientId, pickleId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);