const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tirar-duvidas')
        .setDescription('Canais para se tirar duvidas sobre o software.'),
        async execute(interaction) {
            await interaction.deferReply();
            interaction.editReply(`O Petbot ainda está em desenvolvimento e não possuí uma alta capacidade para tirar dúvidas, para tirar suas dúvidas entre em contato conosco através do nosso telefone (99)9999-9999 ou entre em contato através do chat com o usuário administrador`);
        }
}