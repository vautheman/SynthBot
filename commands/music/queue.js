const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("queue")
      .setDescription("Liste les prochains titres de la liste d'attente"),

    async execute(interaction) {
        try {

            await interaction.deferReply({ ephemeral: false });

            const queue = interaction.client.distube.getQueue(interaction);
            if (!queue) return interaction.editReply(`Il n'y a rien dans la file d'attente pour le moment !`);

            const { channel } = interaction.member.voice;
            if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

            const pagesNum = Math.ceil(queue.songs.length / 10);
		    if(pagesNum === 0) pagesNum = 1;

            const songStrings = [];
            for (let i = 1; i < queue.songs.length; i++) {
                const song = queue.songs[i];
                songStrings.push(
                    `**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}`
                );
            }

            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = songStrings.slice(i * 10, i * 10 + 10).join('');
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `Queue - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
                    .setThumbnail(queue.songs[0].thumbnail)
                    .setDescription(`**Currently Playing:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue**${str == '' ? '  Nothing' : '\n' + str }`)
                    .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${queue.songs.length} • Songs | ${queue.formattedDuration} • Total duration`});
                pages.push(embed);
            }
            
            await interaction.editReply({ embeds: [pages[0]] })
			/* await interaction.editReply({ embeds: [pages[0]] }).then(msg => {
                msg.react('👈');
                msg.react('👉');

                function handleReaction(reaction, user) {
                    if (reaction.message.id !== msg.id && user.id === message.author.id) {return;}
                
                    const name = reaction.emoji.name;
                    if (name === "👈") {
                      console.log('précédent')
                    } else if (name === "👉") {
                        interaction.editReply({ embeds: [pages[1]] })
                      // move page another way
                    }
                }

                interaction.client.on("messageReactionAdd", handleReaction);
            }) */


        } catch (e) {
            console.error(e)
        }
    }
};
