import db from '../models';

const seedRoles = async () => {
  try {
    await Promise.all([
      db.Role.create({ name: 'user' }),
      db.Role.create({ name: 'admin' }),
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  };
};

export { seedRoles };