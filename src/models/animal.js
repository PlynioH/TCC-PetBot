const Sequelize = require('sequelize');
const database = require('../data/database');
const User = require('./user')

const Animal = database.define('Pet', {

    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    especie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    raca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    porte: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    peso: {
        type: Sequelize.DOUBLE,
        defaultValue: 'Não Informado'
    },
    observacao: {
        type: Sequelize.STRING,
        defaultValue: 'Nenhuma'
    },
    codPet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});
Animal.belongsTo(User, {
    contraint: true,
    foreignKey: 'codDiscord'
});

module.exports = Animal;