import { fetchPublishersApi } from '../src/services/publishers';

const seedPublishers = async () => {
  await fetchPublishersApi();
};

export { seedPublishers };