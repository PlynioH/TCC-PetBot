const Sequelize = require('sequelize');
const database = require('../data/database');

const User = database.define('Tutor', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codDiscord: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    }
});

module.exports = User;