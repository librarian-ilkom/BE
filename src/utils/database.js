const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize(`${process.env.POSTGRES_DATABASE}`, `${process.env.POSTGRES_USER}`, `${process.env.POSTGRES_PASSWORD}`, {
    host: `${process.env.POSTGRES_HOST}`,
    dialect: `${process.env.POSTGRES_CONNECTION}`
});

export default db;