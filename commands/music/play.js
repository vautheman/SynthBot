const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("play")
      .setDescription("Joue de la musique")
      .addStringOption(option => 
        option
          .setName("rechercher")
          .setDescription("Rechercher à partir d'un titre ou d'un URL")
          .setRequired(true)
        ),

    async execute(interaction) {
        try {
            if (interaction.options.getString("rechercher")) {
                await interaction.reply(`⏳ Je recherche ta merde...`);
                
                const { channel } = interaction.member.voice;
                
                try {
                  const string = interaction.options.getString("rechercher");
                  
                  const options = {
                    member: interaction.member,
                    textChannel: interaction.channel,
                    interaction,
                  }

                  await interaction.client.distube.play(interaction.member.voice.channel, string, options);

                  await interaction.deleteReply();
                } catch (e) {
                  console.error(e)
                }
            }
        } catch (e) {
          console.error(e)
        }
    }
};
