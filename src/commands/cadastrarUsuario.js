const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cadastrar_usuario')
        .setDescription('Realiza o Cadastro de Animais.')
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
                .setDescription('Digite sua Data de Nascimento(DD-MM-AAAA)')
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
        const nome = interaction.options.getString('nome');
        const cpf = interaction.options.getString('cpf');
        let pattern = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g;
        if (!pattern.test(cpf)) {
            await interaction.editReply('cpf invalido')
            return 0
        }
        const telefone = interaction.options.getString('telefone');
        pattern = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/g;
        if (!pattern.test(telefone)) {
            await interaction.editReply('telefone invalido')
            return 0
        }
        const dataNascimento = interaction.options.getString('datanascimento')
        const endereco = interaction.options.getString('endereco');
        const nomeUsuario = interaction.options.getString('nomeusuario');
        const senha = interaction.options.getString('senha');
        await interaction.editReply(`${interaction.user.username} seu cadastro foi realizado com sucesso.`)
    },
};
