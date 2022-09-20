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
=======
>>>>>>> a215c21339a9aab05fe80858c53b6a27a7028cd6
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "railway",
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

