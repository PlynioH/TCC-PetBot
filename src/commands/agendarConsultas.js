const { SlashCommandBuilder } = require('@discordjs/builders');
const Animal = require('../models/animal');
const User = require('../models/user');
const Agendar = require('../models/agendar');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agendar-consulta')
        .setDescription('Realiza o agendamento da consulta.')
        .addStringOption(option =>
            option.setName('cod_pet')
                .setDescription('Digite o código do seu pet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('data')
                .setDescription('Digite a data da consulta')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('horario')
                .setDescription('Digite o horario da consulta')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('observacao')
                .setDescription('Possui alguma obsevação ?')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const codPet = await interaction.options.getString('cod_pet');
        const data = await interaction.options.getString('data');
        const hora = await interaction.options.getString('horario');
        const observ = await interaction.options.getString('observacao')
        await Agendar.create({
            codConsulta: uuidv4(),
            data: data,
            hora: hora,
            descricao: observ,
            PetCodPet: codPet
        });
        await interaction.editReply(`${interaction.user.username} a consulta do seu pet foi agendada com sucesso.`)
    },
};
