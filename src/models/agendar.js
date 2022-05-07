const Sequelize = require('sequelize');
const database = require('../data/database');
const Animal = require('./animal')

//Criação da Tabela
const Agendar = database.define('Consultas', {

    //Criação de campos da tabela
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

module.exports = Agendar;