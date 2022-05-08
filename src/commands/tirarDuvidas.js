const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tirar-duvidas')
        .setDescription('Tira duvidas sobre o software.')
        .addStringOption(option =>
            option.setName('duvida')
                .setDescription('Descreva sua duvida')
                .setRequired(true)),
        async execute(interaction) {
            await interaction.deferReply();
            const texto = await interaction.options.getString('duvida');
            //Melhorar a lógica para poder analizar palavras dentro de uma String
            if(texto === 'O que o bot faz'){
                interaction.editReply(`O bot realiza cadastro de usuarios, pets e agenda consultas`);
            }
            else{
                interaction.editReply(`Não entendi, poderia repetir...`);
            }
        }
}