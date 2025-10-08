import { Router, Request, Response } from 'express';

import { UserAttributes } from '@custom-types/user';
import { RatingAttributes } from '@custom-types/rating';

import { getAllUsers, setActiveUser, setUserRole } from '../controller/adminController';
import { getAllRatings, removeRating } from '../controller/ratingController';
import { sendEmail } from '../controller/mailingController';

const adminRoutes = Router();

adminRoutes.get('/user-list', async (_req: Request, res: Response) => {
  try {
    const users: UserAttributes[] = await getAllUsers();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

adminRoutes.put('/user-list/:user_id/role', async (req: Request, res: Response) => {
  const { user_role } = req.body;
  const { user_id } = req.params;

  try {
    let updatedUser: UserAttributes = await setUserRole(user_id, user_role);
    res.status(200).send(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

adminRoutes.put('/user-list/:user_id/active', async (req: Request, res: Response) => {
  const { active_status } = req.body;
  const { user_id } = req.params;

  try {
    const updatedUser: UserAttributes = await setActiveUser(user_id, active_status);
    res.status(200).send(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

adminRoutes.get('/ratings', async (_req: Request, res: Response) => {
  try {
    const allRatings: RatingAttributes[] = await getAllRatings();
    res.status(200).send(allRatings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

adminRoutes.delete('/ratings/:rating_id', async (req: Request, res: Response) => {
  const { rating_id } = req.params;

  try {
    const deletedMsg = await removeRating(rating_id);
    res.status(200).send({ msg: deletedMsg });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

adminRoutes.post('/send-email', async (req: Request, res: Response) => {
  const { email_address } = req.body;

  try {
    const mailInfo = await sendEmail(email_address);
    res.status(200).send(mailInfo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
});

export default adminRoutes;