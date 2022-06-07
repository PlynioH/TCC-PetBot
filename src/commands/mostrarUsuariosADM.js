const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const { Permissions } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-todos-usuarios')
        .setDescription('Mostra todos os usuários cadastrados no banco de dados.'),
        async execute(interaction) {
            if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){     
                const users = await User.findAll({ raw: true });
                var usuarios = ''
                users.map(async (user) => {
                    usuarios += `\nNome de usuário: ${user.usuario} \nNome: ${user.nome} \nEspecie: ${user.cpf} \nRaça: ${user.telefone} \nSexo: ${user.dataNascimento} \nIdade: ${user.endereco}\n`
                })
                await fs.writeFile('usuarios.txt', usuarios, (err) => {
                    if (err) throw err;
                });
                await interaction.channel.send({files:[{attachment: 'usuarios.txt'}]})
                await fs.unlink('usuarios.txt', function (err){
                    if (err) throw err;
                })
                await interaction.channel.send(`<@${interaction.member.id}> Utilizou o comando mostrar todos os usuarios`)
                return await interaction.reply({
                    content: `Usuários mostrados com sucesso`,
                    ephemeral: true
                  })
            }
            else{
                return await interaction.reply({
                    content: `Você não pode utilizar este comando`,
                    ephemeral: true
                  })
            }
        }
}        