const Sequelize = require('sequelize');
const database = require('../data/database');
const Animal = require('./animal')

const Agendar = database.define('Consultas', {

    codConsulta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    hora: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        defaultValue: 'Nenhuma Observação Informada'
    }
});
Agendar.belongsTo(Animal, {
    contraint: true,
    foreignKey: 'codPet'
});

module.exports = Agendar;