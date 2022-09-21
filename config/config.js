require('dotenv').config();

module.exports ={
  "development": {
    "username": "postgres",
    "host": "containers-us-west-29.railway.app",
    "port": 7152,
    "database": "railway",
    "dialect": "postgres",
    "logging": false
    "password" : "x1t4CW54M7AEv3zK2WAC" 
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

