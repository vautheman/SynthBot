const {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js");
const { createAudioResource, joinVoiceChannel, createAudioPlayer } = require('@discordjs/voice');
const fs = require('fs')
const path = require('path')

/* const effectTab = [];

const soundsPath = path.join(__dirname, "../sounds");
const soundsFiles = fs.readdirSync(soundsPath).filter((file) => file.endsWith(".mp3"));


for (const file of soundsFiles) {
    //effectTab.push(path.parse(file).name);
    //soundListing.addFields({name: `${path.parse(file).name}`, value: null})
    effectTab.push({name: `${path.parse(file).name}`, value: `${file}`})
    // const filePath = path.join(soundsPath, file);
    // const sound = require(filePath);
    // commands.push(effectTab.data.toJSON());
} */

        
module.exports = {
    data: new SlashCommandBuilder()
    .setName("soundboard")
    .setDescription("Affiche tout les sounds effects"),

    async execute(interaction) {
        interaction.reply("caca")
    }
}