import { Router, Request, Response } from 'express';
import { RatingAttributes } from '@custom-types/rating';
import { addRating, getAllRatings, getIssueRatings, getRatingAvg } from '../controller/ratingController';

const ratingRoutes = Router();

ratingRoutes.get('/', async (_req: Request, res: Response) => {
  try {
    const allRatings: RatingAttributes[] = await getAllRatings();
    res.status(200).send(allRatings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

ratingRoutes.post('/:comic_id/issues/:issue_id', async (req: Request, res: Response) => {
  const { rating, description, user_id } = req.body;
  const { comic_id, issue_id } = req.params;

  try {
    const newRating: RatingAttributes = await addRating(rating, description, user_id, Number(comic_id), Number(issue_id));
    res.status(200).send(newRating);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

ratingRoutes.get('/:comic_id/issues/:issue_id', async (req: Request, res: Response) => {
  const { comic_id, issue_id } = req.params;

  try {
    const ratings: RatingAttributes[] = await getIssueRatings(Number(comic_id), Number(issue_id));
    res.status(200).send(ratings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

ratingRoutes.get('/:volume_id/average', async (req: Request, res: Response) => {
  const { volume_id } = req.body
  try {
    const averageRatings: RatingAttributes[] = await getRatingAvg(Number(volume_id));
    res.status(200).send(averageRatings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

export default ratingRoutes;