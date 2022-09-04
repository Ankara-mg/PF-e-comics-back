require('dotenv').config();  

/*
 - DATABASE_URL=postgresql://${{ PGUSER }}:${{ PGPASSWORD }}@${{ PGHOST }}:${{ PGPORT }}/${{ PGDATABASE }}
 - PGDATABASE=railway
 - PGHOST=containers-us-west-34.railway.app
 - PGPASSWORD=InkJ2AcR3c2CwKTBKLgy
 - PGPORT=6533
 - PGUSER=postgres
*/
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