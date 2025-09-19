import { getCharacters } from "../src/controller/controller.characters";

const seedCharacters = async () => {
  await getCharacters();
};

export { seedCharacters };