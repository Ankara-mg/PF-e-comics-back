const { Router } = require('express');
import { getpublishersDB } from "../controller/controller.publishers";


const router = Router();

//router.get('/', getPublishers )

router.get('/', getpublishersDB )





// router.get('/', async(req: Request, res: Response) =>{
    //     try {
        //     const data = await getPublishers()
        //         res.send(data)
        //     } catch (error) {
            
            //     }
            
            // } )
            
            
            
            
 export default router;