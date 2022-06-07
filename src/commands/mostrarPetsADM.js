const { SlashCommandBuilder } = require('@discordjs/builders');
const Animal = require('../models/animal');
const { Permissions } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-todos-pets')
        .setDescription('Mostra todos os pets cadastrados no banco de dados.'),
        async execute(interaction) {
            if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
                const animals = await Animal.findAll({ raw: true });
                var pets = ''
                animals.map(async (pet) => {
                    pets += `\nPet: ${pet.codPet} \nNome: ${pet.nome} \nEspecie: ${pet.especie} \nRaça: ${pet.raca} \nSexo: ${pet.sexo} \nIdade: ${pet.idade} \nCor: ${pet.cor} \nPorte: ${pet.porte} \nPeso: ${pet.peso} \nObservação: ${pet.observacao}\n`
                })
                await fs.writeFile('pets.txt', pets, (err) => {
                    if (err) throw err;
                });
                await interaction.channel.send({files:[{attachment: 'pets.txt'}]})
                await fs.unlink('pets.txt', function (err){
                    if (err) throw err;
                })
                await interaction.channel.send(`<@${interaction.member.id}> Utilizou o comando mostrar todos os pets`)
                return await interaction.reply({
                    content: `Pets mostrados com sucesso`,
                    ephemeral: true
                  })
            }
        }
}
