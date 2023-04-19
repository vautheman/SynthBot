const {SlashCommandBuilder} = require("discord.js");
const download = require('download')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Ajouter un son")
    .addAttachmentOption( option => 
        option
            .setName("fichier")
            .setDescription("Lien du fichier")
            .setRequired(true)),
    
    async execute(interaction) {
        let attachmentFile = await interaction.options.getAttachment("fichier") || 'none';
        console.log(attachmentFile.url)
        
        await download(attachmentFile.url, './sounds/')
        .then(() => {
            console.log('Download Completed');
            interaction.reply("Download completed")
        })
    }
}
