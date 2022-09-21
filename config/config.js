require('dotenv').config();  

module.exports ={
  "development": {
    "username": "postgres",
    "host": "containers-us-west-52.railway.app",
    "port": 6658,
    "database": "railway",
    "dialect": "postgres",
    "password" : "OKRXjHvsA608KEbTlMw8" 
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