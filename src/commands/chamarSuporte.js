const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chamar-suporte')
        .setDescription('Chama um membro com o cargo de suporte.'),
        async execute(interaction) {
            await interaction.deferReply();
            interaction.editReply(`<@&983519290915422268>`);
        }
}