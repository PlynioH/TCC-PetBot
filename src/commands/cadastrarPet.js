const { SlashCommandBuilder } = require('@discordjs/builders');
const Animal = require('../models/animal');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cadastrar-pet')
        .setDescription('Realiza o Cadastro de Animais.')
        .addStringOption(option =>
            option.setName('nome_pet')
                .setDescription('Digite o Nome do seu Pet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('sexo')
                .setDescription('Sexo do seu Pet')
                .setRequired(true)
                .addChoice('Macho', 'M')
                .addChoice('Femea', 'F'))
        .addIntegerOption(option =>
            option.setName('idade')
                .setDescription('Digite a idade do seu Pet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('especie')
                .setDescription('Digite a espécie do seu Pet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raca')
                .setDescription('Digite a raça do seu Pet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('coloracao')
                .setDescription('Digite a(s) cor(es) do seu Pet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('porte')
                .setDescription('Porte do Pet')
                .setRequired(true)
                .addChoice('Pequeno', 'P')
                .addChoice('Médio', 'M')
                .addChoice('Grande', 'G'))
        .addStringOption(option =>
            option.setName('peso')
                .setDescription('Digite o peso do seu Pet')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('observacao')
                .setDescription('Alguma observação sobre o Pet')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();
        const nomePet = interaction.options.getString('nome_pet');
        const sexo = interaction.options.getString('sexo');
        const idade = interaction.options.getInteger('idade');
        const especie = interaction.options.getString('especie');
        const raca = interaction.options.getString('raca');
        const coloracao = interaction.options.getString('coloracao');
        const porte = interaction.options.getString('porte');
        const peso = interaction.options.getString('peso');
        const observacao = interaction.options.getString('observacao');
        const fkTutorId = await interaction.user.id
        await Animal.create({
            nome: nomePet,
            especie: especie,
            raca: raca,
            cor: coloracao,
            sexo: sexo,
            porte: porte,
            idade: idade,
            peso: peso,
            observacao: observacao,
            codPet: uuidv4(),
            TutorCodDiscord: fkTutorId
        });
        await interaction.editReply(`${interaction.user.username} seu Pet foi cadastrado com sucesso.`)
    },
};
