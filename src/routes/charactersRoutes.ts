import { Router } from 'express';
import { Request, Response } from 'express';
import { getCharacters } from '../controller/controller.characters';
import { getComics } from '../controller/episodesController';



const router = Router()


router.get('/',  async(req: Request, res: Response)=>{

    try {
        let allCharacters = await getCharacters(req, res)
        // allCharacters?
        res.status(200).json(allCharacters)//:
        // res.status(400).send("No nay datos para mostrar")
    } catch (error) {
        // return error
        return res.status(400).send(error)

    }
})

router.post('/', )

export default router;

