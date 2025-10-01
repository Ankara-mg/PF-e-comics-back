import axios from 'axios';
import db from '../../models';
import { ConceptApiAttributes, ConceptAttributes } from '../types/concepts';

const { API_KEY, API_URL } = process.env;

const fetchConceptsApi = async () => {
  const apiURL = `${API_URL}/concepts/?api_key=${API_KEY}&format=json&limit=100`;

  try {
    const res = await axios.get(apiURL);

    const concepts: ConceptAttributes[] = res?.data?.results?.map((concept: ConceptApiAttributes) => ({
      name: concept.name,
      description: concept.deck,
    }));

    await db.Concept.bulkCreate(concepts, { ignoreDuplicates: true });
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Could not save concepts.');
  };
};

export { fetchConceptsApi };