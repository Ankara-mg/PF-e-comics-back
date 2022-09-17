//@ts-nocheck
const { Router } = require('express');
import { Request, Response } from "express";
import db from "../../models";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const {
    rating,
    ComicId,
    description,
    UserId,
    IssueId
  } = req.body
  try {
    const ratingDb = await db.Ratings.create({
      rating: Number(rating),
      ComicId,
      description,
      UserId,
      IssueId: Number(IssueId)
    })
    res.status(200).send(ratingDb)
  } catch (error) {
    return error
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const getRating = await db.Ratings.findAll()
    res.status(200).send(getRating)
  } catch (error) {
    res.status(505).send("Server internal error")
  }
})

export default router