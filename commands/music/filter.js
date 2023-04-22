const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("filter")
      .setDescription("Ignorer la chanson en cours de lecture.")
      .addStringOption(option => 
        option
            .setName("effet")
            .setDescription("Nom de l'effet du filtre")
            .setRequired(true)
            .setAutocomplete(true)
        ),


    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        /* const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview']; */
        const choices = ["earrape", "bassboost", "reset"];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        await interaction.respond(
            filtered.map(choice => ({name: choice, value: choice})),
        );
    },

    async execute(interaction) {
        try {
            const effect = interaction.options.getString('effet');
            await interaction.deferReply({ ephemeral: false });
            const queue = interaction.client.distube.getQueue(interaction);
            const channel = interaction.member.voice.channel;
            const embed = new EmbedBuilder();

            switch(effect) {
                case "earrape" :
                    
                    if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);
                    if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

                    queue.setVolume(1000)

                    embed
                        .setAuthor({ name: 'Filtre: Earrape', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
                        .setColor(0x06d6a0);
        
                    interaction.editReply({ content: ' ', embeds: [embed] })
                    break;

                case "bassboost" :
                    if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);
                    if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

                    queue.filters.add("bassboost")

                    embed
                        .setAuthor({ name: 'Filtre: Bassboost', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
                        .setColor(0x06d6a0);
        
                    interaction.editReply({ content: ' ', embeds: [embed] })
                    break;
                
                case "reset" :
                    if (!queue) return interaction.reply(`Il n'y a rien dans la file d'attente pour le moment !`);
                    if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("Vous devez être dans un même salon vocal");

                    queue.filters.clear();
                    queue.setVolume(50)

                    embed
                        .setAuthor({ name: 'Filtre : désactivé', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
                        .setColor(0x06d6a0);
        
                    interaction.editReply({ content: ' ', embeds: [embed] })
                    break;
                default : interaction.editReply(`Veuillez sélectionner un filtre`)
            }
        } catch (e) {
            console.error(e)
        }
    }
};
