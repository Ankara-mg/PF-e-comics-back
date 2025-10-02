import { Op } from 'sequelize';

import db from '../../models';
import { ComicAttributes } from '@custom-types/comics';
import { fetchComicDetail } from '../services/comics';

export const getComics = async () => {
  try {
    const comics: ComicAttributes[] = await db.Comic.findAll();

    return comics;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

export const getDetails = async (comic_id: number) => {
  try {
    const comic: ComicAttributes | null = await db.Comic.findOne({ where: { id: comic_id } });

    return comic || {} as ComicAttributes;
  } catch (error: any) {
    console.error('Database error.');
    throw new Error(error.message || 'Database error.');
  };
};

export const addComicToDb = async (comic_id: number) => {
  try {
    const newComic = await fetchComicDetail(comic_id);
    await db.Comic.create(newComic);

    return newComic;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

export const getIssues = async (comic_id: number) => {
  try {
    const issuesList = await db.Issue.findAll({
      where: {
        volume_id: comic_id,
        created_in_db: true,
      },
      include: {
        model: db.Rating,
        attributes: ['rating', 'user_id', 'description'],
      },
      order: [
        ['issue_number', 'ASC'],
      ]
    });

    return issuesList;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

export const createComic = async (comicData: ComicAttributes) => {
  try {
    const newComic = await db.Comic.create({
      name: comicData.name,
      description: comicData.description,
      release: comicData.release,
      episodes: comicData.episodes,
      start_year: comicData.start_year,
      created_in_db: true,
    });

    return newComic;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};

export const searchComic = async (name: string) => {
  try {
    const foundComics = await db.Comic.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    return foundComics;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  };
};
