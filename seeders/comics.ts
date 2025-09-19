import { getComics } from "../src/controller/episodesController";

const seedComics = async () => {
  await getComics();
};

export { seedComics };