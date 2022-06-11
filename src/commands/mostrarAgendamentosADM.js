const { SlashCommandBuilder } = require('@discordjs/builders');
const Agendar = require('../models/agendar');
const { Permissions } = require('discord.js');
const fs = require('fs');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-todos-agendamentos')
        .setDescription('Mostra todos os agendamentos cadastrados no banco de dados.'),
        async execute(interaction) {
            if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
                const animals = await Agendar.findAll({ raw: true });
                var pets = ''
                animals.map(async (agendar) => {
                    const dataConsulta = moment(agendar.data).format('DD/MM/YYYY HH:mm')
                    pets += `\nCodConsulta: ${agendar.codConsulta} \nData: ${dataConsulta} \nDescrição: ${agendar.descricao} \nCodPet: ${agendar.PetCodPet}\n`
                })
                await fs.writeFile('agendamentos.txt', pets, (err) => {
                    if (err) throw err;
                });
                await interaction.channel.send({files:[{attachment: 'agendamentos.txt'}]})
                await fs.unlink('agendamentos.txt', function (err){
                    if (err) throw err;
                })
                await interaction.channel.send(`<@${interaction.member.id}> Utilizou o comando mostrar todos os agendamentos`)
                return await interaction.reply({
                    content: `Agendamentos mostrados com sucesso`,
                    ephemeral: true
                  })
            }
        }
}
