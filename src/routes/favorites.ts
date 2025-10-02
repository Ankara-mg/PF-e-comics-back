import { Request, Response, Router } from 'express';
import { addNewFavorite, getFavoriteList, removeFavorite } from '../controller/favoriteListController';

const favoriteRoutes = Router();

favoriteRoutes.get('/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const favoriteList = await getFavoriteList(user_id);
    res.status(200).send(favoriteList);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  };
});

favoriteRoutes.post('/:user_id', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { issue_id } = req.body;

  try {
    const newIssue = await addNewFavorite(user_id, issue_id);
    res.status(200).send(newIssue);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  };
});

favoriteRoutes.delete('/', async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { issue_id } = req.body;

  try {
    await removeFavorite(user_id, issue_id);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  };
});

export default favoriteRoutes;