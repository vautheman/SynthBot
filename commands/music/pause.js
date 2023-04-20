const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("pause")
      .setDescription("Met en pause la musique"),

    async execute(interaction) {
        try {
            const queue = interaction.client.distube.getQueue(interaction);
            if (!queue) return interaction.editReply(`Il n'y a rien dans la file d'attente pour le moment !`);

            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

            if (queue.paused) { 
                await interaction.client.distube.resume(interaction);
    
                const embed = new EmbedBuilder()
                    .setDescription(`\`⏯\` | **La musique à été :** \`reprise\``);
    
                interaction.reply({ embeds: [embed] });
                /* await interaction.client.UpdateQueueMsg(queue); */
            } else {
                await interaction.client.distube.pause(interaction);
    
                const embed = new EmbedBuilder()
                    .setDescription(`\`⏯\` | **La musique à été :** \`mise en pause\``);
    
                interaction.reply({ embeds: [embed] });
                /* await interaction.client.UpdateQueueMsg(queue); */
            }

        } catch (e) {
            console.error(e)
        }
    }
};
