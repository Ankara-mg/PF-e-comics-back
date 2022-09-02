import { Router } from 'express';
import { getDetails } from '../controller/controller.details';
import {getComicsDB, postComics, getAllInfo} from '../controller/episodesController';

const router = Router()

//router.get('/', getComics)
router.get('/', getComicsDB)
router.get('/name', getAllInfo)
router.get('/:id', async (req, res) => {getDetails(req, res)})
router.post('/', postComics)

export default router;