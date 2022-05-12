const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Animal = require('../models/animal');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agendar-consulta')
        .setDescription('Realiza o agendamento de uma consulta'),
        async execute(interaction) {
            const conbanco = [{dia: 1, horario: 1},{dia: 5, horario: 10},{dia: 20, horario: 9},{dia: 31, horario: 20}]
            const conx = []
            conbanco.map((a)=>{
                conx.push({
                    label: a.dia + " " + a.horario,
                    value: `${a.dia}`
                })
            })
            console.log(conx)
            const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select_day')
					.setPlaceholder('selecionar dia')
					.addOptions(conx),
			);

		    await interaction.reply({ content: 'Selecione o dia desejado', components: [row] });
        }
}