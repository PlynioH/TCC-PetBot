const Sequelize = require('sequelize');
const database = require('../data/database');
const Animal = require('./animal')

//Criação da Tabela
const Agendar = database.define('Consultas', {

    //Criação de campos da tabela
    codConsulta: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        defaultValue: 'Nenhuma Observação Informada'
    }
});

module.exports = Agendar;