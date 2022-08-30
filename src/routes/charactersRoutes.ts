import { Router } from 'express';
import { Request, Response } from 'express';
import { getCharacters } from '../controllers/characterController';



const router = Router()


router.get('/',  async(req: Request, res: Response)=>{

    try {
        let allCharacters = await getCharacters()
        allCharacters?
        res.status(200).send(allCharacters):
        res.status(400).send("No nay datos para mostrar")
    } catch (error) {
        return error
    }
})

export default router;

