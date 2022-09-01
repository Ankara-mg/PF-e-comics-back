import { Router } from 'express';
import {getComics, postComics, SearchName} from '../controller/episodesController';

const router = Router()

router.get('/', getComics)
router.post('/', postComics)
router.get('/:name', SearchName)

export default router;