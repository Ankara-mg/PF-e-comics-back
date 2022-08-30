import { Router } from 'express';
import charactersRoutes from './charactersRoutes';


const router = Router();


router.use('/characters', charactersRoutes);

export default router;