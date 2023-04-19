const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const fs = require('fs')
const path = require('path')


module.exports = {
    data: new SlashCommandBuilder().setName("list").setDescription("Lister tout les effets sonores"),

    async execute(interaction) {

        //const effectTab = [];

        const soundsPath = path.join(__dirname, "../sounds");
        const soundsFiles = fs.readdirSync(soundsPath).filter((file) => file.endsWith(".mp3"));

        const soundListing = new EmbedBuilder()
        .setTitle(`**Liste des sons présents dans la soundboard**`)

        for (const file of soundsFiles) {
            //effectTab.push(path.parse(file).name);
            //soundListing.addFields({name: `${path.parse(file).name}`, value: null})
            soundListing.addFields({name: `${path.parse(file).name}`, value: `${file}`})
            // const filePath = path.join(soundsPath, file);
            // const sound = require(filePath);
            // commands.push(effectTab.data.toJSON());
        }

        await interaction.reply({embeds: [soundListing]})
    }
}
