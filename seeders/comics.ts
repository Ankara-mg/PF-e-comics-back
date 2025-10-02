import { fetchComicsApi } from '../src/services/comics';

const seedComics = async () => {
  await fetchComicsApi();
};

export { seedComics };