import { fetchConceptsApi } from '../src/services/concepts';

const seedConcepts = async () => {
  await fetchConceptsApi();
};

export { seedConcepts };