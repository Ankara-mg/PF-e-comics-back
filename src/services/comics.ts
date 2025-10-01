import axios from 'axios';
import db from 'models';
import { ComicApiAttributes, ComicAttributes } from '@custom-types/comics';

const { API_KEY, API_URL } = process.env;

const fetchComicsApi = async () => {
  const apiURL = `${API_URL}/volumes/?api_key=${API_KEY}&format=json&limit=100`;
  try {
    const res = await axios.get(apiURL);

    const comics: ComicAttributes[] = res.data.results.map((comic: ComicApiAttributes) => ({
      id: comic.id,
      name: comic.name,
      image: comic.image.original_url,
      description: comic.description,
      deck: comic.deck,
      release: comic.date_added.slice(0, 10),
      episodes: comic.count_of_issues,
      created_in_db: false,
      start_year: comic.start_year,
    }));

    await db.Comic.bulkCreate(comics, { ignoreDuplicates: true });
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Could not save characters.');
  };
};

const fetchComicDetail = async (comic_id: number) => {
  const apiURL = `${API_URL}/volume/4050-${comic_id}/?api_key=${API_KEY}&format=json`;

  try {
    const comicApi: ComicApiAttributes = (await axios.get(apiURL))?.data?.results;

    const comicDetail: ComicAttributes = {
      id: comicApi.id,
      name: comicApi.name,
      image: comicApi.image?.original_url,
      description: comicApi.description,
      deck: comicApi.deck,
      release: comicApi.start_year,
      episodes: comicApi.issues?.length,
      created_in_db: false,
      start_year: comicApi.start_year,
    };

    return comicDetail;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Could not fetch comic details.');
  }
};

const searchComicApi = async (name: string) => {
  const apiURL = `${API_URL}/search/?api_key=${API_KEY}&format=json&query=${name}&resources=volume&limit=100`;
  try {
    const res = await axios.get(apiURL);

    const comics: ComicAttributes[] = res.data.results.map((comic: ComicApiAttributes) => ({
      id: comic.id,
      name: comic.name,
      image: comic.image.original_url,
      description: comic.description,
      deck: comic.deck,
      release: comic.date_added.slice(0, 10),
      episodes: comic.count_of_issues,
      created_in_db: false,
      start_year: comic.start_year,
    }));

    return comics;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message || 'Could not fetch comics.');
  };
};

export { fetchComicsApi, fetchComicDetail, searchComicApi };