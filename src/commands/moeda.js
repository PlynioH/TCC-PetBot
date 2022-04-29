const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moeda')
        .setDescription('devolve a cotação entre moedas')
        .addStringOption(option =>
            option.setName('de')
                .setDescription('Moeda de origem')
                .setRequired(true)
                .addChoice('Dolar', 'USD')
                .addChoice('Euro', 'EUR')
                .addChoice('Libra', 'GBP')
                .addChoice('Ethereum', 'ETH')
                .addChoice('Bolivar Venezuelano', 'VEF')
                .addChoice('Peso Uruguaio', 'UYU')
                .addChoice('Peso Argentino', 'ARS')
                .addChoice('Real', 'BRL'))
        .addStringOption(option =>
            option.setName('para')
                .setDescription('Moeda de destino')
                .setRequired(true)
                .addChoice('Dolar', 'USD')
                .addChoice('Euro', 'EUR')
                .addChoice('Libra', 'GBP')
                .addChoice('Ethereum', 'ETH')
                .addChoice('Bolivar Venezuelano', 'VEF')
                .addChoice('Peso Uruguaio', 'UYU')
                .addChoice('Peso Argentino', 'ARS')
                .addChoice('Real', 'BRL')),
    async execute(interaction) {
        const de = interaction.options.getString('de');
        const para = interaction.options.getString('para');
        await interaction.deferReply();
        const retorno = await axios.get(`https://economia.awesomeapi.com.br/last/${de}-${para}`);
        await interaction.editReply(`Parabéns Você Encontrou um Easter Egg\n1 ${de} = ${retorno.data[de + para]['ask']} ${para}`);
    },
};
