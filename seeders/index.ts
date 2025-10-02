import db from '../models';

import { seedPublishers } from './publishers';
import { seedComics } from './comics';
import { seedConcepts } from './concepts';
import { seedCharacters } from './characters';
import { seedRoles } from './roles';

async function populateDatabase() {
  try {
    await db.sequelize.sync({ force: false });

    await Promise.all([
      seedPublishers(),
      seedComics(),
      seedConcepts(),
      seedCharacters(),
      seedRoles(),
    ]);

    await db.sequelize.close();
    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Failed to populate the database: ', error);
    process.exit(1);
  };
};


populateDatabase();