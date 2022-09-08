require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "host": "localhost",
    "port": 5432,
    "database": "ecomics",
    "dialect": "postgres",
<<<<<<< HEAD
    "password": "123456789",
    "logging": false
=======
    "password" : "alejo10913" 
>>>>>>> 7742ba4e6de27aaa0dd6646e607b3da2d1bfe247
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