import { fetchCharactersApi } from '../src/services/characters';

const seedCharacters = async () => {
  await fetchCharactersApi();
};

export { seedCharacters };