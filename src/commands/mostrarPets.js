const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-pet')
        .setDescription('Mostra os pets cadastrados em seu usuário.'),
        //Verificar uma forma de ser buscado os dados no banco para ser replicado no chat
        async execute(interaction) {
            const user = await User.findByPk(interaction.user.id, { include: {association: 'Pets'}});
            user.Pets.map(async (pet) => {
                await interaction.channel.send(`Pet: ${pet.codPet} \nNome: ${pet.nome} \nEspecie: ${pet.especie} \nRaça: ${pet.raca} \nSexo: ${pet.sexo} \nIdade: ${pet.idade} \n\n`)
            })
            return await interaction.reply({
                content: `Pets mostrados com sucesso`,
                ephemeral: true
              })
        }
}