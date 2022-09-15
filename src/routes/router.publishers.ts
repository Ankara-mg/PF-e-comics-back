const { Router } = require('express');
import { getpublishersDB } from "../controller/controller.publishers";
import { verifyToken } from "../middleware/middleware";


const router = Router();

router.get('/', getpublishersDB )
router.post('/', (req: any, res: any)=>{

    console.log(req.body)
})
            
            
export default router;