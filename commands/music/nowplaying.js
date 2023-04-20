const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("nowplaying")
      .setDescription("Affiche la musique en cours de lecture"),

    async execute(interaction) {
        try {
            /* interaction.deferReply() */

            const queue = interaction.client.distube.getQueue(interaction);
            if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);

            const song = queue.songs[0];
            const uni = `${song.playing ? '⏸️ |' : '🔴 |'}`;
            const part = Math.floor((queue.currentTime / song.duration) * 30);

            const embed = new EmbedBuilder()
                .setAuthor({ name: song.playing ? 'En pause...' : 'En cours de lecture...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
                .setColor(0x118ab2)
                .setDescription(`**[${song.name}](${song.url})**`)
                .setImage(`${song.thumbnail}`)
                .addFields({ name: 'Uploader:', value: `[${song.uploader.name}](${song.uploader.url})`, inline: true })
                .addFields({ name: 'Requester:', value: `${song.user}`, inline: true })
                .addFields({ name: 'Volume:', value: `${queue.volume}%`, inline: true })
                .addFields({ name: 'Views', value: `${song.views}`, inline: true })
                .addFields({ name: 'Likes:', value: `${song.likes}`, inline: true })
                .addFields({ name: 'Filters:', value: `${queue.filters.names.join(', ') || "Normal"}`, inline: true })
                .addFields({ name: `Current Duration: \`[${queue.formattedCurrentTime} / ${song.formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``, inline: false })
                .setTimestamp()

            interaction.reply({ embeds: [embed] });

        } catch (e) {
            console.error(e)
        }
    }
};
