//@ts-nocheck
const { Router } = require('express');
import { getPublishers_db } from "../controller/controller.publishers";


const router = Router();

router.get('/', async (req, res) => {
  try {
    let controller = await getPublishers_db()
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', (req: any, res: any) => {

  console.log(req.body)
})


export default router;