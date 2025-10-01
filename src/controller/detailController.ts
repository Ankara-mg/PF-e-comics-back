import { ComicAttributes } from '@custom-types/comics';
import db from '../../models';

export const getDetails = async (comic_id: string) => {
  try {
    const comic: ComicAttributes | null = await db.Comic.findOne({ where: { id: comic_id } });

    return comic || {};
  } catch (error: any) {
    console.error('Database error.');
    throw new Error(error.message || 'Database error.');
  };
};