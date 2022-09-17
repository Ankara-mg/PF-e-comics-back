require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "host": "localhost",
    "port": 5432,
    "database": "ecomics",
    "dialect": "postgres",
    "password": "4397",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "ecomics",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}