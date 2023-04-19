const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Joue de la musique"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
