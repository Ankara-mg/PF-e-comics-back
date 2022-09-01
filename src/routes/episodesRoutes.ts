import { Router } from 'express';
import { getDetails } from '../controller/controller.details';
import {getComics, postComics, SearchName} from '../controller/episodesController';

const router = Router()

router.get('/', getComics)
router.get('/:id', async (req, res) => {getDetails(req, res)})
router.post('/', postComics)
router.get('/:name', SearchName)

export default router;