const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("volume")
      .setDescription("Gérer le volume de la musique")
      .addIntegerOption(option => 
        option
            .setName("pourcentage")   
            .setDescription("Pourcentage du volume")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
    ),

    async execute(interaction) {
        try {
            /* interaction.deferReply() */

            const volume = interaction.options.getInteger("pourcentage");
            const queue = interaction.client.distube.getQueue(interaction);
        
            if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);

            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.reply("Vous devez être dans un même salon vocal");

            if (!volume) {
                const embed = new EmbedBuilder()
                    .setDescription(`**volume** actuel : \`${queue.volume}\`%`)
    
                return interaction.reply({ embeds: [embed] });
            }

            if (volume < 1 || volume > 100) return interaction.reply(`Veuillez indiquer un chiffre entre 1 et 100`)

            await interaction.client.distube.setVolume(interaction, volume);

            const embed = new EmbedBuilder()
                .setDescription(`\`🔊\` | **Volume modifier à :** \`${volume}\`%`)
    
            interaction.reply({ embeds: [embed] });

        } catch (e) {
            console.error(e)
        }
    }
};
