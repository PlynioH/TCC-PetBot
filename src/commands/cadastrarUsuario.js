const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cadastrar-usuario')
        .setDescription('Realiza o Cadastro de Usuario.')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Digite seu Nome')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('cpf')
                .setDescription('Digite seu CPF')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('telefone')
                .setDescription('Digite seu Telefone com DDD')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('data_nascimento')
                .setDescription('Digite sua Data de Nascimento(AAAA-MM-DD)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('endereco')
                .setDescription('Digite seu endereço completo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nome_usuario')
                .setDescription('Digite seu Nome de usuário')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('senha')
                .setDescription('Digite sua senha')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const nome = await interaction.options.getString('nome');
        const cpf = await interaction.options.getString('cpf');
        let pattern = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g;
        if (!pattern.test(cpf)) {
            await interaction.editReply('cpf invalido')
            return 0
        }
        const telefone = await interaction.options.getString('telefone');
        pattern = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/g;
        if (!pattern.test(telefone)) {
            await interaction.editReply('telefone invalido')
            return 0
        }
        const dataNascimento = await interaction.options.getString('data_nascimento')
        const endereco = await interaction.options.getString('endereco');
        const nomeUsuario = await interaction.options.getString('nome_usuario');
        const senha = await interaction.options.getString('senha');
        await User.create({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            dataNascimento: new Date(dataNascimento),
            endereco: endereco,
            usuario: nomeUsuario,
            senha: senha,
            codDiscord: interaction.user.id
        });
        await interaction.editReply(`${interaction.user.username} seu cadastro foi realizado com sucesso.`)
    },
};
