const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pg::memory:');

const User = sequelize.define('Tutor', {
    // Model attributes are defined here
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tutorId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codDiscord: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Animal = sequelize.define('Pet', {
    // Model attributes are defined here
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    porte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso: {
        type: DataTypes.STRING,
    },
    observacao: {
        type: DataTypes.STRING,
    },
    codPet: {
        type: DataTypes.STRING,
        allowNull: false
        //necessario fazer uma autoincrementação
    },
    fkTutorId: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

const Agendar = sequelize.define('Consultas', {
    // Model attributes are defined here
    codConsulta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        //necessario fazer uma autoincrementação
    },
    fkCodPet: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
console.log(Animal === sequelize.models.Animal);
console.log(Agendar === sequelize.models.Agendar);