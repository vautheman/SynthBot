const {Client, GatewayIntentBits, Collection, Events} = require("discord.js");
const {Player} = require("discord-player");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions]
});

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnEmpty: true,
    initialVolume: 200,
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

/* require('./loaders/loadSlashCommands'); */


/*  COMMANDS  */

client.commands = new Collection()
client.sounds = new Collection()

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const soundsPath = path.join(__dirname, "sounds");
const soundsFiles = fs.readdirSync(soundsPath).filter((file) => file.endsWith(".mp3"));

for (const file of soundsFiles) {
    client.sounds.set(path.parse(file).name, file)
}

/*  EVENTS  */

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Connexion du bot
client.login(process.env.TOKEN)
