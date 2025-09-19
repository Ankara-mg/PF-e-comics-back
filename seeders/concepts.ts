import { getConcepts } from "../src/controller/controller.concepts";

const seedConcepts = async () => {
  await getConcepts();
};

export { seedConcepts };