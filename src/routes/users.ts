import { Router } from 'express';
import favoriteRoutes from './favorites';

const userRoutes = Router();

userRoutes.use('/:user_id/favorite-list', favoriteRoutes);

export default userRoutes;