import { Router } from 'express';
import charactersRoutes from './charactersRoutes';
import episodesRoutes from './episodesRoutes'


const router = Router();


router.use('/characters', charactersRoutes);
router.use('/comics', episodesRoutes);



export default router;