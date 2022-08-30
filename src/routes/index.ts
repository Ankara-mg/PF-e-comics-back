import {Router} from 'express';
const router = Router();

import { getCharacters } from '../controllers/index.controller';
router.get('/characters', getCharacters);

export default router;