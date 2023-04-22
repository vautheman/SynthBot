const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("skip")
      .setDescription("Ignorer la chanson en cours de lecture."),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: false });

            const queue = interaction.client.distube.getQueue(interaction);

            if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);

            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

            if (queue.songs.length === 1 && queue.autoplay === false) {
                const embed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setDescription("\`🚨\` | **Il n'y a pas de** `Songs` **dans la liste d'attente**")
    
                interaction.editReply({ embeds: [embed] });
            } else { 
                await interaction.client.distube.skip(interaction);
                
                const embed = new EmbedBuilder()
                    .setColor(0x06d6a0)
                    .setDescription("\`⏭\` | **Le son à été ** `skippé`")
    
                interaction.editReply({ embeds: [embed] });
            }

        } catch (e) {
            console.error(e)
        }
    }
};
