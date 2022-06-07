const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-pet')
        .setDescription('Mostra os pets cadastrados em seu usuário.'),
        async execute(interaction) {
            const user = await User.findByPk(interaction.user.id, { include: {association: 'Pets'}});
            user.Pets.map(async (pet) => {
                await interaction.channel.send(`**Pet:** ${pet.codPet} \n**Nome:** ${pet.nome} \n**Especie:** ${pet.especie} \n**Raça:** ${pet.raca} \n**Sexo:** ${pet.sexo} \n**Idade:** ${pet.idade} \n\n`)
            })
            return await interaction.reply({
                content: `Pets mostrados com sucesso`,
                ephemeral: true
              })
        }
}