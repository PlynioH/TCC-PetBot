const { SlashCommandBuilder } = require('@discordjs/builders');
const Animal = require('../models/animal');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agendar-consulta')
        .setDescription('Realiza o agendamento de uma consulta'),
        async execute(interaction) {
            //Analizar uma possibilidade de cadastrar a partir de um padrão de datas e horas
        }
}