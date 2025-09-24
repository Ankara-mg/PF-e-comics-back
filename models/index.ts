import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();
const basename = path.basename(__filename);
const { PGUSER, PGPASSWORD, PGDATABASE, PGHOST, PGPORT } = process.env;

const db: any = {};

export const sequelize = new Sequelize(PGDATABASE!, PGUSER!, PGPASSWORD!, {
  host: PGHOST,
  port: Number(PGPORT),
  dialect: 'postgres',
  logging: console.log,
});

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const imported = require(path.join(__dirname, file));
    const model = imported.default || Object.values(imported)[0];
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
