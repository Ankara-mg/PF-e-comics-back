import { Router } from 'express';
import { getDetails } from '../controller/controller.details';
import {getComics} from '../controller/episodesController';

const router = Router()

router.get('/', getComics)
router.get('/:id', async (req, res) => {getDetails(req, res)})

export default router;