import { getPublishers } from '../src/controller/controller.publishers';

const seedPublishers = async () => {
  await getPublishers();
};

export { seedPublishers };