import axios from 'axios';
import db from '../../models';
import { CharacterApiAttributes, CharacterAttributes } from '../types/character';

const { API_KEY, API_URL } = process.env;

const fetchCharactersApi = async () => {
  const apiURL = `${API_URL}/characters/?api_key=${API_KEY}&format=json&limit=100`;

  try {
    const res = await axios.get(apiURL);

    const mappedCharacters: CharacterAttributes[] = res?.data?.results?.map((char: CharacterApiAttributes) => ({
      id: char.id,
      name: char.name,
      description: char.deck,
      image: char.image?.original_url,
      gender: char.gender,
    }));

    await db.Character.bulkCreate(mappedCharacters, { ignoreDuplicates: true });
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Could not save characters.');
  };
};

export { fetchCharactersApi };