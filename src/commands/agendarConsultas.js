const { SlashCommandBuilder } = require('@discordjs/builders');
const Animal = require('../models/animal');
const { GoogleCalendar } = require('../utils/googleCalendar');
const Agendar = require('../models/agendar');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agendar-consulta')
        .setDescription('Realiza o agendamento de uma consulta')
        .addStringOption(option =>
            option.setName('pet')
                .setDescription('Selecione o pet')
                .setRequired(true)
                .setAutocomplete(true))
        .addStringOption(option =>
            option.setName('data')
                .setDescription('Selecione a data')
                .setRequired(true)
                .setAutocomplete(true))
        .addStringOption(option =>
            option.setName('descricao')
                .setDescription('descreva o problema')
                .setRequired(true)),
        async execute(interaction) {
            const calendario = new GoogleCalendar()
            const pet = interaction.options.getString('pet');
            const data = interaction.options.getString('data');
            const descricao = interaction.options.getString('descricao');
            const animal = await Animal.findByPk(pet);
            const da = new Date(data)
            da.setMinutes(da.getMinutes() + 59)
            console.log(new Date(data))
            calendario.cadastrarEventos(new Date(data), da, animal.nome, descricao)
            await Agendar.create({
                codConsulta: uuidv4(),
                data: da,
                descricao: descricao,
                PetCodPet: pet
            });
		    interaction.reply({ content: 'Consulta cadastrada com sucesso', ephemeral: true});
        }
}
