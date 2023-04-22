const { joinVoiceChannel } = require("@discordjs/voice");
const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require("discord.js");
const fetch = require("node-fetch");
const { DiscordTogether } = require('discord-together');

module.exports = {
    data: new SlashCommandBuilder()
      .setName("watch")
      .setDescription("Démarre une activité youtube"),

    async execute(interaction) {
        try {

            interaction.client.discordTogether = new DiscordTogether(interaction.client);
            
            const channel = interaction.member.voice.channel;

            /* await interaction.deferReply(); */

            if(!channel) return interaction.reply("Vous devez être dans un même salon vocal");
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            if(channel) {
                interaction.client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {

                    const embedYt = new EmbedBuilder()
                        .setColor(0xff0000)
                        .setTitle("Invitation à YouTube")
                        .setDescription("Participe à l'activité en cliquant sur le bouton ci-dessous.")
                        .setFooter({text: `Envoyé par : ${interaction.user.username}`})
                        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/1024px-YouTube_social_white_squircle.svg.png")

                    const watchConfirm = new ButtonBuilder()
                        .setLabel("📺 Rejoindre l'activité")
                        .setURL(invite.code)
                        .setStyle(ButtonStyle.Link);

                    
                    const row = new ActionRowBuilder()
                        .addComponents(watchConfirm);

                    await interaction.reply({ embeds: [embedYt], components: [row]});
                });
            };

            /* fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 0,
                    max_uses: 0,
                    target_application_id: "755600276941176913",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${interaction.client.token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(invite => {
                if(!invite.code) return interaction.reply("Impossible de démarrer une activité YouTube")

                interaction.reply(`https://discord.com/invite/${invite.code}`)

            }) */



        } catch (e) {
            console.error(e)
        }
    }
};
