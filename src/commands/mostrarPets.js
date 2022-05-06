const { SlashCommandBuilder } = require('@discordjs/builders');
const Animal = require('../models/animal');
const User = require('../models/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-pet')
        .setDescription('Mostra os pets cadastrados em seu usuário.'),

        //Verificar uma forma de ser buscado os dados no banco para ser replicado no chat
        async execute(interaction) {
            await interaction.deferReply();
            const fkTutorId = await interaction.user.id
            const nome = Animal.getAttributes(nome);
            const sexo = Animal.getAttributes(sexo);
            const idade = Animal.getAttributes(idade);
            const especie = Animal.getAttributes(especie);
            const raca = Animal.getAttributes(raca);
            const codPet = Animal.getAttributes(codPet);
            Animal.findByPk(fkTutorId, ({
                nome: nome,
                especie: especie,
                raca:raca,
                sexo:sexo,
                idade:idade,
                codPet:codPet
            }));
            await interaction.editReply(`Pet: ${Animal.codPet} \nNome: ${Animal.nome} \nEspecie: ${Animal.especie} \nRaça: ${Animal.raca} \nSexo: ${Animal.sexo} \nIdade: ${Animal.idade} \n\n`);
    
        }
}