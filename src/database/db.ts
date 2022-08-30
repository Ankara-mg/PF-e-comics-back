// //@ts-nocheck

require('dotenv').config({ path: '../../.env' })
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, API_KEY } = process.env;
// console.log(DB_USER, DB_PASSWORD, API_KEY)

const sequelize = new Sequelize('ecomics', DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
})

sequelize.authenticate()

module.exports = sequelize
