const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
const Agendar = require('../models/agendar');
const Animal = require('../models/animal');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mostrar-agendamentos')
        .setDescription('Mostra os agendamentos cadastrados para os pets de seu usuário.'),
        async execute(interaction) {
            const user = await User.findByPk(interaction.user.id, { include: {association: 'Pets'}});
            await user.Pets.map(async (pet) => {
                const animal = await Animal.findByPk(pet.codPet, { include: {association: 'Consultas'}});
                animal.Consultas.map(async (consulta)=>{
                    const dataConsulta = moment(consulta.data).format('DD/MM/YYYY HH:mm')
                    await interaction.channel.send(`\n**Código de Consulta**: ${consulta.codConsulta}\n**Nome do Pet**: ${pet.nome} \n**Data**: ${dataConsulta}\n**Descrição**: ${consulta.descricao}`)
                })
            })
            return await interaction.reply({
                content: `Consultas agendadas mostradas com sucesso`,
                ephemeral: true
            })
        }
}