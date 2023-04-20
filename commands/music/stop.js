const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Arrête la musique"),

    async execute(interaction) {
        try {
            /* interaction.deferReply() */

            const queue = interaction.client.distube.getQueue(interaction);
            if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);

            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

            queue.stop()

            const embed = new EmbedBuilder()
                    .setDescription(`\`⏹️\` | **La musique à été stoppé par : ** ${interaction.user}`);
    
            interaction.reply({ embeds: [embed] });

        } catch (e) {
            console.error(e)
        }
    }
};
