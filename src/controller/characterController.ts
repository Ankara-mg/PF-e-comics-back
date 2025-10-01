import db from '../../models';
import { CharacterAttributes } from '../types/character';

export const getCharacters = async () => {
  try {
    const characters: CharacterAttributes[] = await db.Character.findAll();
    return characters;
  } catch (error: any) {
    console.error(error.message || 'Database error.');
    throw new Error(error.message || 'Database error.');
  };
};
