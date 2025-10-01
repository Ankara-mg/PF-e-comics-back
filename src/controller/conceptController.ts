import db from '../../models';
import { ConceptAttributes } from '../types/concepts';

export const getConcepts = async () => {
  try {
    const concepts: ConceptAttributes[] = await db.Concept.findAll();
    return concepts;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || 'Database error.');
  };
};
