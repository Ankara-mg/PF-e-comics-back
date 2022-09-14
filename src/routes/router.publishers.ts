const { Router } = require('express');
import { getpublishersDB } from "../controller/controller.publishers";


const router = Router();

router.get('/', getpublishersDB )
router.post('/', (req: any, res: any)=>{

    console.log(req.body)
})
            
            
export default router;