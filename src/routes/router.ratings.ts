//@ts-nocheck
const { Router } = require('express');
import { Request, Response } from "express";
import { getAllRatings, addRating, getRatingsIssue, getRatingAvg } from "../controller/controller.raiting"

const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const controller = await getAllRatings()
    res.status(200).json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  
  try {
    const controller = await addRating(req.body)
    res.status(200).json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/avg/:volumeId', async (req: Request, res: Response) => {
  const { volumeId } = req.params
  try {
    const controller = await getRatingAvg(volumeId)
    res.status(200).json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/byIssue', async (req: Request, res: Response) => {
  const { volumeId, IssueId } = req.body
  try {
    const controller = await getRatingsIssue(volumeId, IssueId)
    res.status(200).json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



export default router