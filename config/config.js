require('dotenv').config();

module.exports ={
  "development": {
    "username": "postgres",
    "host": "containers-us-west-34.railway.app",
    "port": 6533,
    "database": "railway",
    "dialect": "postgres",
    "password" : "InkJ2AcR3c2CwKTBKLgy" 
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