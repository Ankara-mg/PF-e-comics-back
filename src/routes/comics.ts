import { Request, Response, Router } from 'express';

import { ComicAttributes } from '@custom-types/comics';
import { IssueAttributes } from '@custom-types/issues';

import ratingRoutes from './ratings';
import { addComicToDb, createComic, getComics, getIssues, searchComic, getDetails } from '../controller/comicController';

const comicsRoutes = Router();

comicsRoutes.use('/:comic_id/issues/:issue_id/ratings', ratingRoutes);

comicsRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const comics: ComicAttributes[] = await getComics();
    res.status(200).send(comics);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

comicsRoutes.post('/', async (req: Request<{ comicData: ComicAttributes}>, res: Response) => {
  const { comicData } = req.body ;

  try {
    const newComic: ComicAttributes = await createComic(comicData);
    res.status(200).send(newComic);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

comicsRoutes.get('/:comic_id', async (req: Request<{ comic_id: string }>, res: Response) => {
  const { comic_id } = req.params;
  try {
    const comicDetails: ComicAttributes = await getDetails(Number(comic_id));
    res.status(200).send(comicDetails);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  };
});

comicsRoutes.get('/:comic_id/issues', async (req: Request<{ comic_id: string }>, res: Response) => {
  const { comic_id } = req.params;
  
  try {
    const issues: IssueAttributes[] = await getIssues(Number(comic_id));
    res.status(200).send(issues);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

comicsRoutes.get('/search', async (req: Request, res: Response) => {
  const { name } = req.query as {name: string};

  try {
    const foundComic: ComicAttributes[] = await searchComic(name);
    res.status(200).send(foundComic);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

comicsRoutes.post('/import/:comic_id', async (req: Request, res: Response) => {
  const { comic_id } = req.params;

  try {
    const newComic: ComicAttributes = await addComicToDb(Number(comic_id));
    res.status(200).send(newComic);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  };
});

export default comicsRoutes;