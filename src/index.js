// Require the necessary discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents, SelectMenuInteraction } = require('discord.js');
const database = require('./data/database');
const Animal = require('./models/animal');
const User = require('./models/user');
const Agendar = require('./models/agendar');
const { GoogleCalendar } = require('./utils/googleCalendar');
const { Data } = require('./utils/data');
const moment = require('moment')
require('dotenv').config()


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands');//.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	User.hasMany(Animal);
	Animal.belongsTo(User);
	Animal.hasMany(Agendar);
	Agendar.belongsTo(Animal);
	
	await database.sync();
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()){
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	else if (interaction.isAutocomplete()) {
		const command = client.commands.get(interaction.commandName)
		if(interaction.commandName == 'agendar-consulta'){
			const focusedOption = interaction.options.getFocused(true)
			if(focusedOption.name === 'pet'){
				const user = await User.findByPk(interaction.user.id, { include: {association: 'Pets'}});
				const pets = await user.Pets.map((pet) => {
					return {
						name: pet.nome,
						value: `${pet.codPet}`
					}
				})
				interaction.respond(pets)
			} 
			if(focusedOption.name === 'data'){
				const calendario = new GoogleCalendar()
				const data = new Data()
				const eventos = await calendario.pegarEventos()
				const disp = await data.devolverDiasHorariosLivres(eventos.data.items)
				const e = disp.map((a) => {
					const data = moment(a).format('DD/MM/YYYY HH:mm')
					return {
						name: data,
						value: a
					}
				})
				interaction.respond(e.slice(0, 25))
			}
		}
	}
});

// Login to Discord with your client's token
client.login(process.env.token);
