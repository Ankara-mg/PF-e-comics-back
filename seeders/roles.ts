import { createRoles } from "../src/roles/initialRoles";

const seedRoles = async () => {
  await createRoles();
};

export { seedRoles };