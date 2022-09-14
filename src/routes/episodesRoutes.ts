import { Router } from 'express';
import { getDetails } from '../controller/controller.details';
import { getComicsDB, postComics, getAllInfo, SearchName, getIssues } from '../controller/episodesController';
import { verifyToken} from '../middleware/middleware';
import { Request, Response } from "express";
const router = Router()

router.get('/', getComicsDB)

router.get('/issues/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let controller_result = await getIssues(id)
    res.json(controller_result)

  } catch (error) {
    res.status(404).json({ error })
  }
})


router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    let controller_result = await SearchName(name)
    res.json(controller_result)
  } catch (error) {
    res.status(404).json(error)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let controller_result = await getDetails(id)
    res.json(controller_result)
  } catch (error) {
    res.status(404).json(error)
  }
})

router.post('/', postComics)

// router.get('/sign-up', loggin)


export default router;