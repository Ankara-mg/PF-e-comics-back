import { Router } from 'express';
import { Request, Response } from 'express';
import {getComics} from '../controllers/episodesController';


const router = Router()


router.get('/',  async (req: Request, res: Response)=>{

    try {
        let allcomics = await getComics()
        allcomics?
        res.status(200).send(allcomics):
        res.status(400).send("No nay datos para mostrar")
    } catch (error) {
        return error
    }
})

export default router;