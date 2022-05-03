const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    port: process.env.DB_PORT
});

module.exports = sequelize;